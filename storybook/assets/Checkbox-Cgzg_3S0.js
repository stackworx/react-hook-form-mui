import{j as c,b as P,g as y,s as B,r as g,i as l,n as M,d as _,_ as S,e as R,h as H}from"./Form-9h973bRF.js";import{_ as s}from"./isNativeReflectConstruct-CJAgTEKr.js";import{r as m}from"./index-CTjT7uj6.js";import{S as E}from"./SwitchBase-BMF-JSb_.js";import{c as h}from"./createSvgIcon-CnjQR2ig.js";const O=h(c.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),U=h(c.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),V=h(c.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function L(o){return y("MuiCheckbox",o)}const u=P("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),N=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],F=o=>{const{classes:e,indeterminate:t,color:a,size:r}=o,n={root:["root",t&&"indeterminate",`color${l(a)}`,`size${l(r)}`]},d=H(n,L,e);return s({},e,d)},D=B(E,{shouldForwardProp:o=>g(o)||o==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.root,t.indeterminate&&e.indeterminate,e[`size${l(t.size)}`],t.color!=="default"&&e[`color${l(t.color)}`]]}})(({theme:o,ownerState:e})=>s({color:(o.vars||o).palette.text.secondary},!e.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${e.color==="default"?o.vars.palette.action.activeChannel:o.vars.palette[e.color].mainChannel} / ${o.vars.palette.action.hoverOpacity})`:M(e.color==="default"?o.palette.action.active:o.palette[e.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},e.color!=="default"&&{[`&.${u.checked}, &.${u.indeterminate}`]:{color:(o.vars||o).palette[e.color].main},[`&.${u.disabled}`]:{color:(o.vars||o).palette.action.disabled}})),W=c.jsx(U,{}),q=c.jsx(O,{}),w=c.jsx(V,{}),T=m.forwardRef(function(e,t){var a,r;const n=_({props:e,name:"MuiCheckbox"}),{checkedIcon:d=W,color:b="primary",icon:z=q,indeterminate:i=!1,indeterminateIcon:x=w,inputProps:I,size:p="medium",className:$}=n,j=S(n,N),C=i?x:z,k=i?x:d,f=s({},n,{color:b,indeterminate:i,size:p}),v=F(f);return c.jsx(D,s({type:"checkbox",inputProps:s({"data-indeterminate":i},I),icon:m.cloneElement(C,{fontSize:(a=C.props.fontSize)!=null?a:p}),checkedIcon:m.cloneElement(k,{fontSize:(r=k.props.fontSize)!=null?r:p}),ownerState:f,ref:t,className:R(v.root,$)},j,{classes:v}))});export{T as C};
