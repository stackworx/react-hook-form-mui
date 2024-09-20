import{j as o}from"./isNativeReflectConstruct-DM8RWmQY.js";import{g as B,b as M,s as b,f as c,m as w,j as k,h as T,l as q,k as D,c as F,d as N,e as O,u as I,a as _,F as E}from"./Form-CUaV9iJl.js";import{r as P}from"./index-CTjT7uj6.js";import{S as U}from"./SwitchBase-BE-kgkG_.js";import"./useFormControl-BgzZIPyh.js";function A(t){return M("MuiSwitch",t)}const a=B("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),H=t=>{const{classes:e,edge:r,size:s,color:n,checked:l,disabled:d}=t,i={root:["root",r&&`edge${c(r)}`,`size${c(s)}`],switchBase:["switchBase",`color${c(n)}`,l&&"checked",d&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},p=O(i,A,e);return{...e,...p}},V=b("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,r.edge&&e[`edge${c(r.edge)}`],e[`size${c(r.size)}`]]}})({display:"inline-flex",width:34+12*2,height:14+12*2,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,[`& .${a.thumb}`]:{width:16,height:16},[`& .${a.switchBase}`]:{padding:4,[`&.${a.checked}`]:{transform:"translateX(16px)"}}}}]}),X=b(U,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.switchBase,{[`& .${a.input}`]:e.input},r.color!=="default"&&e[`color${c(r.color)}`]]}})(w(({theme:t})=>({position:"absolute",top:0,left:0,zIndex:1,color:t.vars?t.vars.palette.Switch.defaultColor:`${t.palette.mode==="light"?t.palette.common.white:t.palette.grey[300]}`,transition:t.transitions.create(["left","transform"],{duration:t.transitions.duration.shortest}),[`&.${a.checked}`]:{transform:"translateX(20px)"},[`&.${a.disabled}`]:{color:t.vars?t.vars.palette.Switch.defaultDisabledColor:`${t.palette.mode==="light"?t.palette.grey[100]:t.palette.grey[600]}`},[`&.${a.checked} + .${a.track}`]:{opacity:.5},[`&.${a.disabled} + .${a.track}`]:{opacity:t.vars?t.vars.opacity.switchTrackDisabled:`${t.palette.mode==="light"?.12:.2}`},[`& .${a.input}`]:{left:"-100%",width:"300%"}})),w(({theme:t})=>({"&:hover":{backgroundColor:t.vars?`rgba(${t.vars.palette.action.activeChannel} / ${t.vars.palette.action.hoverOpacity})`:k(t.palette.action.active,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(t.palette).filter(T(["light"])).map(([e])=>({props:{color:e},style:{[`&.${a.checked}`]:{color:(t.vars||t).palette[e].main,"&:hover":{backgroundColor:t.vars?`rgba(${t.vars.palette[e].mainChannel} / ${t.vars.palette.action.hoverOpacity})`:k(t.palette[e].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${a.disabled}`]:{color:t.vars?t.vars.palette.Switch[`${e}DisabledColor`]:`${t.palette.mode==="light"?q(t.palette[e].main,.62):D(t.palette[e].main,.55)}`}},[`&.${a.checked} + .${a.track}`]:{backgroundColor:(t.vars||t).palette[e].main}}}))]}))),L=b("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(t,e)=>e.track})(w(({theme:t})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:t.transitions.create(["opacity","background-color"],{duration:t.transitions.duration.shortest}),backgroundColor:t.vars?t.vars.palette.common.onBackground:`${t.palette.mode==="light"?t.palette.common.black:t.palette.common.white}`,opacity:t.vars?t.vars.opacity.switchTrack:`${t.palette.mode==="light"?.38:.3}`}))),G=b("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(t,e)=>e.thumb})(w(({theme:t})=>({boxShadow:(t.vars||t).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),J=P.forwardRef(function(e,r){const s=F({props:e,name:"MuiSwitch"}),{className:n,color:l="primary",edge:d=!1,size:i="medium",sx:p,...j}=s,u={...s,color:l,edge:d,size:i},h=H(u),S=o.jsx(G,{className:h.thumb,ownerState:u});return o.jsxs(V,{className:N(h.root,n),sx:p,ownerState:u,children:[o.jsx(X,{type:"checkbox",icon:S,checkedIcon:S,ref:r,ownerState:u,...j,classes:{...h,root:h.switchBase}}),o.jsx(L,{className:h.track,ownerState:u})]})});function v({control:t,name:e,rules:r,...s}){const{fieldState:{error:n},field:{onChange:l,onBlur:d,value:i,ref:p}}=I({name:e,control:t,rules:r});return o.jsx(J,{sx:{...n&&{"& .MuiSwitch-thumb":{backgroundColor:"error.main"},"& .MuiSwitch-track":{backgroundColor:"error.main"}}},...s,checked:!!i,inputRef:p,onChange:l,onBlur:d,value:i,name:e})}v.displayName="MuiReactHookFormSwitch";v.__docgenInfo={description:"",methods:[],displayName:"MuiReactHookFormSwitch"};const tt={title:"Core/Switch",component:v,parameters:{layout:"fullscreen"},argTypes:{onSubmit:{action:"submit"}}},z=t=>{const e=_({defaultValues:{switch:!1}});return o.jsx(E,{...e,onSubmit:t.onSubmit,children:o.jsx(v,{name:"switch",label:"Text",control:e.control,errors:e.formState.errors,...t})})},m={render:z},g={render:z,args:{rules:{required:"Required"}}};var f,$,x;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: Template
}`,...(x=($=m.parameters)==null?void 0:$.docs)==null?void 0:x.source}}};var y,C,R;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: Template,
  args: {
    rules: {
      required: 'Required'
    }
  }
}`,...(R=(C=g.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};const et=["Default","Required"];export{m as Default,g as Required,et as __namedExportsOrder,tt as default};
