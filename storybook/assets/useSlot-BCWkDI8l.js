import"./index-CTjT7uj6.js";import{j as h}from"./isNativeReflectConstruct-DM8RWmQY.js";import{d as T,G as j,v as p,w as G,T as R,x as w,o as x}from"./Form-kNuFjqSm.js";function W(e){return typeof e=="string"}function A(e,o,t){return e===void 0||W(e)?o:{...o,ownerState:{...o.ownerState,...t}}}function Z(e,o=[]){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!o.includes(n)).forEach(n=>{t[n]=e[n]}),t}function k(e){if(e===void 0)return{};const o={};return Object.keys(e).filter(t=>!(t.match(/^on[A-Z]/)&&typeof e[t]=="function")).forEach(t=>{o[t]=e[t]}),o}function _(e){const{getSlotProps:o,additionalProps:t,externalSlotProps:n,externalForwardedProps:s,className:a}=e;if(!o){const i=T(t==null?void 0:t.className,a,s==null?void 0:s.className,n==null?void 0:n.className),c={...t==null?void 0:t.style,...s==null?void 0:s.style,...n==null?void 0:n.style},l={...t,...s,...n};return i.length>0&&(l.className=i),Object.keys(c).length>0&&(l.style=c),{props:l,internalRef:void 0}}const y=Z({...s,...n}),m=k(n),S=k(s),f=o(y),u=T(f==null?void 0:f.className,t==null?void 0:t.className,a,s==null?void 0:s.className,n==null?void 0:n.className),g={...f==null?void 0:f.style,...t==null?void 0:t.style,...s==null?void 0:s.style,...n==null?void 0:n.style},r={...f,...t,...S,...m};return u.length>0&&(r.className=u),Object.keys(g).length>0&&(r.style=g),{props:r,internalRef:f.ref}}function $(e,o,t){return typeof e=="function"?e(o,t):e}function D(e){return e==null||Object.keys(e).length===0}function L(e){const{styles:o,defaultTheme:t={}}=e,n=typeof o=="function"?s=>o(D(s)?t:s):o;return h.jsx(j,{styles:n})}function M({styles:e,themeId:o,defaultTheme:t={}}){const n=p(t),s=typeof e=="function"?e(o&&n[o]||n):e;return h.jsx(L,{styles:s})}function q(e){return h.jsx(M,{...e,defaultTheme:G,themeId:R})}function J(e){return function(t){return h.jsx(q,{styles:typeof e=="function"?n=>e({theme:n,...t}):e})}}function K(){return w}function Q({props:e,states:o,muiFormControl:t}){return o.reduce((n,s)=>(n[s]=e[s],t&&typeof e[s]>"u"&&(n[s]=t[s]),n),{})}function U(e,o){const{className:t,elementType:n,ownerState:s,externalForwardedProps:a,getSlotOwnerState:y,internalForwardedProps:m,...S}=o,{component:f,slots:u={[e]:void 0},slotProps:g={[e]:void 0},...r}=a,i=u[e]||n,c=$(g[e],s),{props:{component:l,...d},internalRef:v}=_({className:t,...S,externalForwardedProps:e==="root"?r:void 0,externalSlotProps:c}),C=x(v,c==null?void 0:c.ref,o.ref),E=y?y(d):{},H={...s,...E},N=e==="root"?l||f:l,O=A(i,{...e==="root"&&!f&&!u[e]&&m,...e!=="root"&&!u[e]&&m,...d,...N&&{as:N},ref:C},H);return Object.keys(E).forEach(b=>{delete O[b]}),[i,O]}export{A as a,Z as e,Q as f,J as g,K as i,_ as m,$ as r,U as u};