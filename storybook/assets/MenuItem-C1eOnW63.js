import{r as l}from"./index-CTjT7uj6.js";import{g as c,b as w,s as T,B as j,r as D,m as F,j as d,c as P,n as U,o as E,d as C,e as G}from"./Form-kNuFjqSm.js";import{L as x}from"./TextField-9tLr_AQu.js";import{j as I}from"./isNativeReflectConstruct-DM8RWmQY.js";function Q(e){return w("MuiDivider",e)}const $=c("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]),M=c("MuiListItemIcon",["root","alignItemsFlexStart"]),O=c("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);function N(e){return w("MuiMenuItem",e)}const r=c("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),H=(e,t)=>{const{ownerState:s}=e;return[t.root,s.dense&&t.dense,s.divider&&t.divider,!s.disableGutters&&t.gutters]},z=e=>{const{disabled:t,dense:s,divider:a,disableGutters:n,selected:p,classes:o}=e,i=G({root:["root",s&&"dense",t&&"disabled",!n&&"gutters",a&&"divider",p&&"selected"]},N,o);return{...o,...i}},A=T(j,{shouldForwardProp:e=>D(e)||e==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:H})(F(({theme:e})=>({...e.typography.body1,display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap","&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${r.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:d(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${r.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:d(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${r.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:d(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:d(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${r.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${r.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${$.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${$.inset}`]:{marginLeft:52},[`& .${O.root}`]:{marginTop:0,marginBottom:0},[`& .${O.inset}`]:{paddingLeft:36},[`& .${M.root}`]:{minWidth:36},variants:[{props:({ownerState:t})=>!t.disableGutters,style:{paddingLeft:16,paddingRight:16}},{props:({ownerState:t})=>t.divider,style:{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"}},{props:({ownerState:t})=>!t.dense,style:{[e.breakpoints.up("sm")]:{minHeight:"auto"}}},{props:({ownerState:t})=>t.dense,style:{minHeight:32,paddingTop:4,paddingBottom:4,...e.typography.body2,[`& .${M.root} svg`]:{fontSize:"1.25rem"}}}]}))),X=l.forwardRef(function(t,s){const a=P({props:t,name:"MuiMenuItem"}),{autoFocus:n=!1,component:p="li",dense:o=!1,divider:v=!1,disableGutters:i=!1,focusVisibleClassName:R,role:k="menuitem",tabIndex:f,className:B,...L}=a,m=l.useContext(x),b=l.useMemo(()=>({dense:o||m.dense||!1,disableGutters:i}),[m.dense,o,i]),u=l.useRef(null);U(()=>{n&&u.current&&u.current.focus()},[n]);const V={...a,dense:b.dense,divider:v,disableGutters:i},g=z(a),S=E(u,s);let y;return a.disabled||(y=f!==void 0?f:-1),I.jsx(x.Provider,{value:b,children:I.jsx(A,{ref:S,role:k,tabIndex:y,component:p,focusVisibleClassName:C(g.focusVisible,R),className:C(g.root,B),...L,ownerState:V,classes:g})})});export{X as M,Q as g};