import{u as y,j as o,m as W,a as C,F}from"./Form-9h973bRF.js";import{C as _}from"./Checkbox-Cgzg_3S0.js";import{F as M}from"./FormControlLabel-BXzOq-Gu.js";import"./index-CTjT7uj6.js";import"./isNativeReflectConstruct-CJAgTEKr.js";import"./SwitchBase-BMF-JSb_.js";import"./useFormControl-B9FSkLKA.js";import"./createSvgIcon-CnjQR2ig.js";import"./formControlState-Dq1zat_P.js";import"./Typography-C7tPPUg0.js";function t({control:r,name:e,rules:c,...S}){const{fieldState:{error:q},field:{onChange:g,onBlur:j,value:m,ref:L}}=y({name:e,control:r,rules:c});return o.jsx(_,{sx:{...q&&{color:"error.main","&.Mui-checked":{color:"error.main"}}},...S,checked:!!m,inputRef:L,onChange:g,onBlur:j,value:m,name:e})}t.displayName="MuiReactHookFormCheckbox";t.__docgenInfo={description:"",methods:[],displayName:"MuiReactHookFormCheckbox"};function i({label:r,...e}){const{errors:c}=W({control:e.control});return o.jsx(M,{sx:{...c[e.name]&&{color:"error.main"}},control:o.jsx(t,{...e}),label:r})}i.displayName="MuiReactHookFormCheckboxWithLabel";i.__docgenInfo={description:"",methods:[],displayName:"MuiReactHookFormCheckboxWithLabel",props:{label:{required:!0,tsType:{name:"string"},description:""}}};const $={title:"Core/Checkbox",component:t,parameters:{layout:"fullscreen"},argTypes:{onSubmit:{action:"submit"}}},T=r=>{const e=C({defaultValues:{checkbox:!1}});return o.jsx(F,{...e,onSubmit:r.onSubmit,children:o.jsx(i,{name:"checkbox",label:"checkbox",control:e.control,errors:e.formState.errors,...r})})},R=r=>{const e=C({defaultValues:{checkbox:!1}});return o.jsx(F,{...e,onSubmit:r.onSubmit,children:o.jsx(t,{name:"checkbox",control:e.control,errors:e.formState.errors,...r})})},s={render:R},a={render:R,args:{rules:{required:"Required"}}},n={render:T,args:{rules:{required:"Required"}}};var l,u,d;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: Template
}`,...(d=(u=s.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var p,b,h;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: Template,
  args: {
    rules: {
      required: 'Required'
    }
  }
}`,...(h=(b=a.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var x,f,k;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: WithFormControlLabel,
  args: {
    rules: {
      required: 'Required'
    }
  }
}`,...(k=(f=n.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};const w=["Default","Required","WithFormLabel"];export{s as Default,a as Required,n as WithFormLabel,w as __namedExportsOrder,$ as default};
