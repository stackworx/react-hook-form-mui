import{j as e}from"./isNativeReflectConstruct-DM8RWmQY.js";import{u as w,a as F,F as _,S as D}from"./Form-CUaV9iJl.js";import{T as P}from"./TextField-B98YGdkq.js";import{M as r}from"./MenuItem-D6QbdJAW.js";import"./index-CTjT7uj6.js";import"./useSlot-CI45-O9K.js";import"./FormControl-BGZtnNoS.js";import"./useFormControl-BgzZIPyh.js";import"./index-vZN_Bsf0.js";import"./createSvgIcon-CNaMbZrL.js";function c({control:t,name:n,rules:l,...d}){const{field:{onChange:k,onBlur:b,value:R,ref:q},fieldState:{error:a}}=w({name:n,control:t,rules:l});return e.jsx(P,{...d,inputRef:q,onChange:k,onBlur:b,value:R,name:n,error:!!a,helperText:(a==null?void 0:a.message)??d.helperText??" ",select:!0})}c.displayName="MuiReactHookFormSelect";c.__docgenInfo={description:"",methods:[],displayName:"MuiReactHookFormSelect"};const J={title:"Core/Select",component:c,parameters:{layout:"fullscreen"},argTypes:{onSubmit:{action:"submit"}}},m=t=>{var l;const n=F({defaultValues:{text:(l=t.SelectProps)!=null&&l.multiple?[]:""}});return e.jsx(_,{...n,onSubmit:t.onSubmit,children:e.jsx(D,{children:e.jsx(c,{name:"text",label:"Text",control:n.control,errors:n.formState.errors,...t})})})},u={render:m,args:{label:"Default",children:[e.jsx(r,{value:10,children:"Ten"},10),e.jsx(r,{value:20,children:"Twenty"},20),e.jsx(r,{value:30,children:"Thirty"},30)]}},s={render:m,args:{label:"Required",rules:{required:"Required"},children:[e.jsx(r,{value:10,children:"Ten"},10),e.jsx(r,{value:20,children:"Twenty"},20),e.jsx(r,{value:30,children:"Thirty"},30)]}},o={render:m,args:{label:"Single Select",children:[e.jsx(r,{value:10,children:"Ten"},10),e.jsx(r,{value:20,children:"Twenty"},20),e.jsx(r,{value:30,children:"Thirty"},30)]}},i={render:m,args:{label:"Multiple Select",SelectProps:{multiple:!0},children:[e.jsx(r,{value:10,children:"Ten"},10),e.jsx(r,{value:20,children:"Twenty"},20),e.jsx(r,{value:30,children:"Thirty"},30)]}};var p,T,h;u.parameters={...u.parameters,docs:{...(p=u.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Default',
    children: [<MenuItem key={10} value={10}>
        Ten
      </MenuItem>, <MenuItem key={20} value={20}>
        Twenty
      </MenuItem>, <MenuItem key={30} value={30}>
        Thirty
      </MenuItem>]
  }
}`,...(h=(T=u.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};var y,M,S;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Required',
    rules: {
      required: 'Required'
    },
    children: [<MenuItem key={10} value={10}>
        Ten
      </MenuItem>, <MenuItem key={20} value={20}>
        Twenty
      </MenuItem>, <MenuItem key={30} value={30}>
        Thirty
      </MenuItem>]
  }
}`,...(S=(M=s.parameters)==null?void 0:M.docs)==null?void 0:S.source}}};var x,I,v;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Single Select',
    children: [<MenuItem key={10} value={10}>
        Ten
      </MenuItem>, <MenuItem key={20} value={20}>
        Twenty
      </MenuItem>, <MenuItem key={30} value={30}>
        Thirty
      </MenuItem>]
  }
}`,...(v=(I=o.parameters)==null?void 0:I.docs)==null?void 0:v.source}}};var f,g,j;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Multiple Select',
    SelectProps: {
      multiple: true
    },
    children: [<MenuItem key={10} value={10}>
        Ten
      </MenuItem>, <MenuItem key={20} value={20}>
        Twenty
      </MenuItem>, <MenuItem key={30} value={30}>
        Thirty
      </MenuItem>]
  }
}`,...(j=(g=i.parameters)==null?void 0:g.docs)==null?void 0:j.source}}};const K=["Default","Required","SingleSelect","MultipleSelect"];export{u as Default,i as MultipleSelect,s as Required,o as SingleSelect,K as __namedExportsOrder,J as default};
