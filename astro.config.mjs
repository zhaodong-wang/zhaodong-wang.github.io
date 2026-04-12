import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.zhaodongwang.net',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
