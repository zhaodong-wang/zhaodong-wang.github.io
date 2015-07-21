texpreamble("
\usepackage{fontspec}
\usepackage{unicode-math}
\setmainfont[
          ItalicFont=HelveticaNeueLTStd-LtIt.otf,
          BoldFont=HelveticaNeueLTStd-BdCn.otf,
          BoldItalicFont=HelveticaNeueLTStd-BdCnO.otf,Ligatures=TeX]{HelveticaNeueLTStd-Lt.otf}
\setsansfont[ItalicFont=HelveticaNeueLTStd-MdIt]{HelveticaNeueLTStd-Md.otf}
\setmonofont{Courier New}
%\setmainfont[Ligatures=TeX]{Adobe Caslon Pro}
\setmathfont{latinmodern-math.otf}
\setmathfont[range={\mathup/{greek,Greek},\mathcal,\mathbb}]{xits-math.otf}
\setmathfont[range={\mathup/{num,latin,Latin},\mathcal,\mathbb}]{Helvetica Neue Light}
\setmathfont[range=\mathit/{num,latin,Latin}]{Helvetica Neue Light}
\setmathfont[range=\mathbfup/{num,latin,Latin}]{Helvetica Neue Light}
\setmathfont[range=\mathbfit/{num,latin,Latin}]{Helvetica Neue Light}
\setmathfont[range=\mathsf/{num,latin,Latin}]{Helvetica Neue Light}
\setmathfont[range=\mathsfit/{num,latin,Latin}]{Helvetica Neue Light}
\setmathfont[range=\mathbfsf/{num,latin,Latin}]{Helvetica Neue Light}
\setmathfont[range=\mathbfsfit/{num,latin,Latin}]{Helvetica Neue Light}
\def\mathscriptup#1{{\ensuremath{\hbox{\scriptsize #1}}}}
\def\mathtextup#1{{\ensuremath{\hbox{#1}}}}");

import graph;
size(200,200,IgnoreAspect);
defaultpen(fontsize(9pt));

file in=input("amp.txt").line();
real[][] a=in.dimension(0,0);
a=transpose(a);

real[] x0=a[0];
real[] y1=a[1];
real[] y2=a[2];
real[] y3=a[3];
real[] y4=a[4];
real[] y5=a[5];

path p1=graph(x0,y1,operator --),
p2=graph(x0,y2,operator --),
p3=graph(x0,y3,operator --),
p4=graph(x0,y4,operator --),
p5=graph(x0,y5,operator --);
draw(p1,red+linewidth(1),"\color{black} $\omega=0.02$");
draw(p2,blue+linewidth(1),"\color{black}  $\omega=0.04$",marker(scale(0.8mm)*rotate(45)*cross(4),blue,above=true));
draw(p3,green+linewidth(1),"\color{black} $\omega=0.06$",marker(scale(0.8mm)*cross(6),green,above=true));
draw(p4,black+linewidth(1),"\color{black} $\omega=0.08$",marker(scale(0.5mm)*rotate(45)*unitcircle,black,above=true));
draw(p5,dashed+purple+linewidth(1),"\color{black} $\omega=0.10$");
int imax=9;
pair al_lgd=(-1,1);
label("$\omega=0.04$",align=al_lgd,(imax,y1[imax]));
label("$\omega=0.06$",align=al_lgd,(imax,y2[imax]));
label("$\omega=0.12$",align=al_lgd,(imax,y3[imax]));
label("$\omega=0.16$",align=al_lgd,(imax,y4[imax]));
label("$\omega=0.20$",align=al_lgd,(imax,y5[imax]));
//add(legend(white),(0,230),SE,NoFill);
xlimits(0,10);
ylimits(0,180);
xaxis(Label("Supplier $i$",align=(0,-3)),BottomTop,LeftTicks(Step=2,n=1));
yaxis(Label("Amplitude",align=(-1,0)),LeftRight,RightTicks);
