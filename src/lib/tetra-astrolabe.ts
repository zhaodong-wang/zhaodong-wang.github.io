import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

let registered = false;

function initGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp01((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

function makeRandom(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface ParticleSeed {
  scatter: THREE.Vector3;
  volume: THREE.Vector3;
  field: THREE.Vector3;
  logo: THREE.Vector3;
  rotation: THREE.Euler;
  phase: number;
  scale: number;
  depth: number;
  pull: number;
}

interface ParticleSet {
  mesh: THREE.InstancedMesh;
  seeds: ParticleSeed[];
  material: THREE.MeshBasicMaterial;
  baseOpacity: number;
  heroColor: THREE.Color;
  paperColor: THREE.Color;
}

interface PointerField {
  position: THREE.Vector2;
  strength: number;
  speed: number;
}

const gold = 0xbc8420;
const paleGold = 0xd6aa52;
const ash = 0xd9d6cd;
const paperGold = 0x8e5f11;
const paperPaleGold = 0x9d6814;
const paperAsh = 0x47443d;
const heroBackground = new THREE.Color(0x101010);
const paperBackground = new THREE.Color(0xf2f2ef);
const TAU = Math.PI * 2;
const SCROLL_POINTER_COOLDOWN = 420;
const LOGO_POSE_TILT_X = 0.26;
const LOGO_POSE_YAW_Y = -0.14;
const LOGO_POSE_ROLL_Z = 0.018;

const tetraVertices = [
  new THREE.Vector3(0, 0.82, 0),
  new THREE.Vector3(-0.72, -0.42, 0.52),
  new THREE.Vector3(0.72, -0.42, 0.52),
  new THREE.Vector3(0, -0.42, -0.82),
];

const tetraEdges = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [2, 3],
  [3, 1],
];

function rotateY(point: THREE.Vector3, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const x = point.x * cos - point.z * sin;
  const z = point.x * sin + point.z * cos;
  point.x = x;
  point.z = z;
  return point;
}

function pointOnSphere(rand: () => number, radius: number) {
  const theta = rand() * TAU;
  const z = rand() * 2 - 1;
  const r = Math.sqrt(Math.max(0, 1 - z * z)) * radius;
  return new THREE.Vector3(Math.cos(theta) * r, z * radius, Math.sin(theta) * r);
}

function pointInCrystalVolume(rand: () => number, index: number, count: number) {
  const theta = rand() * TAU;
  const yUnit = rand() * 2 - 1;
  const shell = index % 6 === 0 ? 0.9 + rand() * 0.13 : Math.cbrt(rand());
  const circle = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
  const facet = 0.92 + Math.sin(theta * 3 + yUnit * 2.8) * 0.08;

  const point = new THREE.Vector3(
    Math.cos(theta) * circle * shell * 1.5 * facet,
    yUnit * shell * 1.16,
    Math.sin(theta) * circle * shell * 0.98 * (1.02 - (facet - 0.92) * 0.42),
  );

  const twist = point.y * 0.42 + Math.sin(shell * Math.PI) * 0.18;
  rotateY(point, twist);

  if (index % 9 === 0) {
    const vertex = tetraVertices[index % tetraVertices.length].clone().multiplyScalar(1.3);
    point.lerp(vertex, 0.22 + rand() * 0.22);
  }

  if (index > count * 0.68) {
    point.x += 0.14;
    point.y *= 0.92;
  }

  return point;
}

function pointInSignalField(rand: () => number, index: number, count: number) {
  const t = index / Math.max(1, count - 1);
  const wave = Math.sin(t * TAU * 1.55);
  const counter = Math.cos(t * TAU * 2.1);
  return new THREE.Vector3(
    (rand() - 0.5) * 5.8 + wave * 0.5,
    (rand() - 0.5) * 2.9 + Math.sin(t * TAU * 4.2) * 0.34,
    (rand() - 0.5) * 2.15 + counter * 0.62,
  );
}

function pointOnLogoTetra(rand: () => number, index: number) {
  if (index % 5 === 0) {
    return pointOnSphere(rand, 0.36 + rand() * 0.42);
  }

  const edge = tetraEdges[index % tetraEdges.length];
  const a = tetraVertices[edge[0]];
  const b = tetraVertices[edge[1]];
  return a.clone().lerp(b, rand()).multiplyScalar(0.94);
}

function createTetraFrameGeometry(size: number, strokeRadius: number) {
  const positions: number[] = [];
  const sourceAxis = new THREE.Vector3(0, 1, 0);
  const direction = new THREE.Vector3();
  const midpoint = new THREE.Vector3();
  const vertex = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const matrix = new THREE.Matrix4();
  const scale = new THREE.Vector3(1, 1, 1);

  tetraEdges.forEach(([startIndex, endIndex]) => {
    const start = tetraVertices[startIndex].clone().multiplyScalar(size);
    const end = tetraVertices[endIndex].clone().multiplyScalar(size);
    direction.copy(end).sub(start);
    const length = direction.length();
    midpoint.copy(start).add(end).multiplyScalar(0.5);
    quaternion.setFromUnitVectors(sourceAxis, direction.normalize());
    matrix.compose(midpoint, quaternion, scale);

    const edge = new THREE.CylinderGeometry(strokeRadius, strokeRadius, length, 4, 1, false);
    const edgePositions = edge.getAttribute('position');
    const edgeIndex = edge.getIndex();

    if (edgeIndex) {
      for (let i = 0; i < edgeIndex.count; i += 1) {
        vertex.fromBufferAttribute(edgePositions, edgeIndex.getX(i));
        vertex.applyMatrix4(matrix);
        positions.push(vertex.x, vertex.y, vertex.z);
      }
    } else {
      for (let i = 0; i < edgePositions.count; i += 1) {
        vertex.fromBufferAttribute(edgePositions, i);
        vertex.applyMatrix4(matrix);
        positions.push(vertex.x, vertex.y, vertex.z);
      }
    }

    edge.dispose();
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeBoundingSphere();
  return geometry;
}

function makeParticleSeeds(count: number, rand: () => number) {
  const seeds: ParticleSeed[] = [];

  for (let i = 0; i < count; i += 1) {
    const volume = pointInCrystalVolume(rand, i, count);
    const scatter = pointOnSphere(rand, 2.7 + rand() * 2.1);
    scatter.x += (rand() - 0.5) * 1.1;
    scatter.y += (rand() - 0.5) * 0.62;

    seeds.push({
      scatter,
      volume,
      field: pointInSignalField(rand, i, count),
      logo: pointOnLogoTetra(rand, i),
      rotation: new THREE.Euler(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI),
      phase: rand() * TAU,
      scale: 0.62 + rand() * 1.1,
      depth: 0.35 + rand() * 0.95,
      pull: 0.52 + rand() * 0.72,
    });
  }

  return seeds;
}

function createParticleSet(
  count: number,
  rand: () => number,
  color: number,
  paperColor: number,
  opacity: number,
  size: number,
  strokeRadius: number,
) {
  const geometry = createTetraFrameGeometry(size, strokeRadius);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    toneMapped: false,
  });
  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;

  return {
    mesh,
    material,
    seeds: makeParticleSeeds(count, rand),
    baseOpacity: opacity,
    heroColor: new THREE.Color(color),
    paperColor: new THREE.Color(paperColor),
  };
}

function updateParticleSet(
  set: ParticleSet,
  time: number,
  intro: number,
  progress: number,
  pointer: THREE.Vector2,
  pointerField: PointerField,
  dummy: THREE.Object3D,
  reducedMotion: boolean,
) {
  const fieldMix = smoothstep(0.06, 0.38, progress);
  const logoMix = smoothstep(0.64, 0.9, progress);
  const paperMix = smoothstep(0.07, 0.2, progress);
  const driftScale = reducedMotion ? 0 : 1 - logoMix * 0.58;
  const target = new THREE.Vector3();
  const attractorX = pointerField.position.x;
  const attractorY = pointerField.position.y;
  const fieldStrength = reducedMotion ? 0 : pointerField.strength * (1 - logoMix * 0.36);
  const fieldRadius = 0.86 + pointerField.speed * 0.5 + fieldMix * 0.1;
  const fieldRadiusSq = fieldRadius * fieldRadius;

  for (let i = 0; i < set.seeds.length; i += 1) {
    const seed = set.seeds[i];
    target.copy(seed.volume).lerp(seed.field, fieldMix).lerp(seed.logo, logoMix);
    dummy.position.copy(seed.scatter).lerp(target, intro);

    const breath = Math.sin(time * 0.58 + seed.phase) * 0.032 * driftScale;
    dummy.position.x += breath + pointer.x * 0.16 * seed.depth * (1 - logoMix * 0.55);
    dummy.position.y += Math.cos(time * 0.43 + seed.phase) * 0.024 * driftScale;
    dummy.position.z += pointer.y * 0.14 * seed.depth;

    let localPresence = 0;

    if (fieldStrength > 0.002) {
      const dx = attractorX - dummy.position.x;
      const dy = attractorY - dummy.position.y;
      const dz = Math.sin(seed.phase + time * 0.72) * 0.42 - dummy.position.z;
      const distanceSq = dx * dx + dy * dy * 1.22 + dummy.position.z * dummy.position.z * 0.12;
      const distance = Math.sqrt(distanceSq);
      const core = Math.exp(-distanceSq / fieldRadiusSq) * fieldStrength * seed.pull;
      const halo =
        Math.exp(-distanceSq / (fieldRadiusSq * 3.2)) *
        (1 - smoothstep(fieldRadius * 0.92, fieldRadius * 1.95, distance)) *
        fieldStrength *
        0.08;
      const focus = core + halo;
      const swirl = Math.sin(time * 0.72 + seed.phase) * core * 0.07;
      localPresence = Math.min(1, core * 0.72 + halo * 0.92);

      dummy.position.x += dx * focus * 0.46 - dy * swirl;
      dummy.position.y += dy * focus * 0.4 + dx * swirl * 0.68;
      dummy.position.z += dz * focus * 0.2 + Math.sin(time + seed.phase) * core * 0.08;
    }

    dummy.rotation.set(
      seed.rotation.x + time * 0.045 * driftScale + progress * 0.7,
      seed.rotation.y + time * 0.058 * driftScale + seed.phase * 0.42,
      seed.rotation.z + time * 0.034 * driftScale,
    );
    dummy.scale.setScalar(
      seed.scale * (0.7 + intro * 0.34 + logoMix * 0.18) * (1 + localPresence * 0.055),
    );
    dummy.updateMatrix();
    set.mesh.setMatrixAt(i, dummy.matrix);
  }

  set.material.color.lerpColors(set.heroColor, set.paperColor, paperMix);

  const paperOpacity = 1 - paperMix * 0.24;
  const targetOpacity =
    set.baseOpacity * (0.52 + intro * 0.48 + fieldMix * 0.2 + logoMix * 0.12) * paperOpacity;
  set.material.opacity = set.material.opacity * 0.9 + targetOpacity * 0.1;
  set.mesh.instanceMatrix.needsUpdate = true;
}

export function setupTetraAstrolabe() {
  initGsap();

  const roots = Array.from(document.querySelectorAll<HTMLElement>('[data-tetra-astrolabe]'));
  roots.forEach((root) => {
    if (root.dataset.tetraBound === 'true') return;
    root.dataset.tetraBound = 'true';

    const canvas = root.querySelector<HTMLCanvasElement>('[data-tetra-canvas]');
    if (!canvas) return;

    const reducedMotion = prefersReducedMotion();
    const rand = makeRandom(20260624);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 18);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.55));

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const mobile = window.innerWidth < 760;
    const mainCount = mobile ? 380 : 1020;
    const skinParticles = createParticleSet(
      mainCount,
      rand,
      gold,
      paperGold,
      0.56,
      0.028,
      0.0025,
    );
    const edgeParticles = createParticleSet(
      Math.round(mainCount * 0.38),
      rand,
      ash,
      paperAsh,
      0.4,
      0.036,
      0.0028,
    );
    const emberParticles = createParticleSet(
      Math.round(mainCount * 0.3),
      rand,
      paleGold,
      paperPaleGold,
      0.42,
      0.022,
      0.0021,
    );
    rootGroup.add(skinParticles.mesh, edgeParticles.mesh, emberParticles.mesh);

    const dummy = new THREE.Object3D();
    const pointer = new THREE.Vector2(0, 0);
    const targetPointer = new THREE.Vector2(0, 0);
    const activePointer = new THREE.Vector2(0, 0);
    const neutralPointer = new THREE.Vector2(0, 0);
    const pointerPlanePoint = new THREE.Vector3();
    const pointerDirection = new THREE.Vector3();
    const pointerWorld = new THREE.Vector3();
    const pointerLocal = new THREE.Vector3();
    const pointerField = {
      position: new THREE.Vector2(0, 0),
      strength: 0,
      speed: 0,
    };
    const targetPointerField = {
      position: new THREE.Vector2(0, 0),
      strength: 0,
      speed: 0,
    };
    const state = { intro: reducedMotion ? 1 : 0, progress: 0 };
    let raf = 0;
    let destroyed = false;
    let lastScrollAt = Number.NEGATIVE_INFINITY;
    const setSize = () => {
      const rect = root.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(root);
    setSize();

    const markScrollMotion = () => {
      lastScrollAt = performance.now();
      targetPointerField.strength = 0;
      targetPointerField.speed = 0;
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        state.progress = self.progress;
        markScrollMotion();
      },
    });

    const introTween = gsap.to(state, {
      intro: 1,
      duration: reducedMotion ? 0 : 1.95,
      ease: 'power3.out',
    });

    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const now = performance.now();
      if (now - lastScrollAt < SCROLL_POINTER_COOLDOWN) {
        targetPointerField.strength = 0;
        targetPointerField.speed = 0;
        return;
      }

      const rect = root.getBoundingClientRect();
      const x = clamp01((event.clientX - rect.left) / rect.width);
      const y = clamp01((event.clientY - rect.top) / rect.height);
      const nextX = (x - 0.5) * 2;
      const nextY = -((y - 0.5) * 2);
      const pointerDelta = Math.hypot(nextX - targetPointer.x, nextY - targetPointer.y);

      targetPointer.x = nextX;
      targetPointer.y = nextY;

      pointerPlanePoint.set(nextX, nextY, 0.5).unproject(camera);
      pointerDirection.copy(pointerPlanePoint).sub(camera.position).normalize();
      pointerWorld.copy(camera.position).addScaledVector(pointerDirection, -camera.position.z / pointerDirection.z);
      rootGroup.updateMatrixWorld(true);
      pointerLocal.copy(pointerWorld);
      rootGroup.worldToLocal(pointerLocal);
      targetPointerField.position.set(
        THREE.MathUtils.clamp(pointerLocal.x, -1.56, 1.56),
        THREE.MathUtils.clamp(pointerLocal.y, -1.14, 1.14),
      );
      targetPointerField.strength = 1;
      targetPointerField.speed = Math.min(1, pointerDelta * 5.2);
    };

    const softenPointer = () => {
      targetPointerField.strength = 0;
      targetPointerField.speed = 0;
    };

    if (!reducedMotion) {
      window.addEventListener('pointermove', handlePointer, { passive: true });
      window.addEventListener('pointerleave', softenPointer, { passive: true });
      window.addEventListener('blur', softenPointer);
      window.addEventListener('scroll', markScrollMotion, { passive: true });
      window.addEventListener('wheel', markScrollMotion, { passive: true });
      window.addEventListener('touchmove', markScrollMotion, { passive: true });
    }

    const animate = () => {
      if (destroyed) return;
      const now = performance.now();
      const elapsed = reducedMotion ? 1 : now * 0.001;
      const pointerSuspended = !reducedMotion && now - lastScrollAt < SCROLL_POINTER_COOLDOWN;
      const pointerTargetStrength = pointerSuspended ? 0 : targetPointerField.strength;
      const pointerTargetSpeed = pointerSuspended ? 0 : targetPointerField.speed;
      const fieldTargetPosition = pointerSuspended ? neutralPointer : targetPointerField.position;

      pointer.lerp(targetPointer, reducedMotion ? 1 : 0.045);
      activePointer.lerp(pointerSuspended ? neutralPointer : pointer, reducedMotion ? 1 : 0.22);
      pointerField.position.lerp(fieldTargetPosition, reducedMotion ? 1 : pointerSuspended ? 0.16 : 0.2);
      pointerField.strength +=
        (pointerTargetStrength - pointerField.strength) * (pointerTargetStrength > 0 ? 0.075 : 0.28);
      pointerField.speed += (pointerTargetSpeed - pointerField.speed) * (pointerSuspended ? 0.32 : 0.12);
      targetPointerField.speed *= pointerSuspended ? 0.78 : 0.94;

      const fieldMix = smoothstep(0.06, 0.38, state.progress);
      const logoMix = smoothstep(0.64, 0.9, state.progress);
      const paperMix = smoothstep(0.07, 0.2, state.progress);
      const logoPose = smoothstep(0.72, 0.94, state.progress);

      const fieldBackground = heroBackground.clone().lerp(paperBackground, paperMix);
      const fieldShell = root.parentElement as HTMLElement | null;
      if (fieldShell) {
        fieldShell.style.backgroundColor = `#${fieldBackground.getHexString()}`;
      }

      rootGroup.rotation.x =
        activePointer.y * 0.11 +
        Math.sin(elapsed * 0.16) * 0.035 +
        logoPose * LOGO_POSE_TILT_X;
      rootGroup.rotation.y =
        activePointer.x * 0.13 +
        elapsed * (reducedMotion ? 0 : 0.034) * (1 - logoPose * 0.48) +
        logoPose * LOGO_POSE_YAW_Y;
      rootGroup.rotation.z = Math.sin(elapsed * 0.11) * 0.02 + logoPose * LOGO_POSE_ROLL_Z;
      rootGroup.position.x = 0.92 * (1 - fieldMix) - logoMix * 0.18;
      rootGroup.position.y = 0.06 * (1 - fieldMix) + logoMix * 0.08;
      rootGroup.scale.setScalar(1.08 - fieldMix * 0.18 + logoMix * 0.2);

      updateParticleSet(
        skinParticles,
        elapsed,
        state.intro,
        state.progress,
        activePointer,
        pointerField,
        dummy,
        reducedMotion,
      );
      updateParticleSet(
        edgeParticles,
        elapsed + 5,
        state.intro,
        clamp01(state.progress + 0.04),
        activePointer,
        pointerField,
        dummy,
        reducedMotion,
      );
      updateParticleSet(
        emberParticles,
        elapsed + 11,
        state.intro,
        clamp01(state.progress + 0.08),
        activePointer,
        pointerField,
        dummy,
        reducedMotion,
      );

      renderer.render(scene, camera);
      root.dataset.ready = 'true';

      if (reducedMotion) return;
      raf = window.requestAnimationFrame(animate);
    };

    raf = window.requestAnimationFrame(animate);
    ScrollTrigger.refresh();

    const dispose = () => {
      destroyed = true;
      window.cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('pointerleave', softenPointer);
      window.removeEventListener('blur', softenPointer);
      window.removeEventListener('scroll', markScrollMotion);
      window.removeEventListener('wheel', markScrollMotion);
      window.removeEventListener('touchmove', markScrollMotion);
      resizeObserver.disconnect();
      scrollTrigger.kill();
      introTween.kill();
      renderer.dispose();
      [
        skinParticles.mesh.geometry,
        skinParticles.material,
        edgeParticles.mesh.geometry,
        edgeParticles.material,
        emberParticles.mesh.geometry,
        emberParticles.material,
      ].forEach((item) => item.dispose());
    };

    document.addEventListener('astro:before-swap', dispose, { once: true });
  });
}
