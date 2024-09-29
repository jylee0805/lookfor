import { createGlobalStyle } from "styled-components";
import chfont from "./utils/ChenYuluoyan-Thin-Monospaced.ttf";
const GlobalStyle = createGlobalStyle`


@font-face {
  font-family: "chyu";
  src: url("${chfont}") format("TrueType");
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
img {
  max-width: 100%;
  height: 100%;
  object-fit: contain;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
    --primary-color: #F44336;
    --secondary-color: #fff;
}
html{
  font-size: 16px;
  
}
body {
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff3e7;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #929292;
  }
  line-height: 1.5;
  display: block;
 
  color: #fff;
  &::before {
    z-index: -1;

    content: "";
    position: fixed;
    top: 0%;
    right: -20vw;
    display: block;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    width: 60vw;
    background: #232222;

    box-shadow:
      -50vw 20vh 0 0 #1b1a1a,
      90vw 0vh 0 75vw #ffe600,
      -45vw -30vh 0 25vw #181818,
      -90vw 20vh 0 20vw #ff5213,
      -10vw -10vh 0 25vw #ff3714,20vw 80vh 0 100vw #000000;
    filter: blur(10rem);
  }
}
a {
  text-decoration: none;
}

`;
export default GlobalStyle;
