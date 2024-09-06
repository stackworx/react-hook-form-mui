import{u as H,j as e,a as N,F as B,S as O}from"./Form-Ara3Fi4-.js";import{T as V}from"./TextField-D4-f1ZX5.js";import{M as t}from"./MenuItem-COJF79DQ.js";import"./index-CTjT7uj6.js";import"./isNativeReflectConstruct-CJAgTEKr.js";import"./FormControl-BLakwohg.js";import"./formControlState-Dq1zat_P.js";import"./useFormControl-B9FSkLKA.js";import"./isMuiElement-rO2Aaa3t.js";import"./react-is.production.min-Fw4xaesh.js";import"./index-CYM-y3Gt.js";import"./createSvgIcon-B1c9eDhW.js";function h({control:a,name:n,rules:s,...g}){const{field:{onChange:w,onBlur:D,value:P,ref:$},fieldState:{error:l}}=H({name:n,control:a,rules:s});return e.jsx(V,{...g,inputRef:$,onChange:w,onBlur:D,value:P,name:n,error:!!l,helperText:(l==null?void 0:l.message)??g.helperText??" "})}h.displayName="MuiReactHookFormTextField";h.__docgenInfo={description:"",methods:[],displayName:"MuiReactHookFormTextField"};const ae={title:"Core/TextField",component:h,parameters:{layout:"fullscreen"},argTypes:{onSubmit:{action:"submit"}}},r=a=>{var s;const n=N({defaultValues:{text:(s=a.SelectProps)!=null&&s.multiple?[]:""}});return e.jsx(B,{...n,onSubmit:a.onSubmit,children:e.jsx(O,{children:e.jsx(h,{name:"text",label:"Text",control:n.control,errors:n.formState.errors,...a})})})},o={render:r,args:{label:"Default"}},u={render:r,args:{label:"RegexCheck",helperText:"Some text",rules:{pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,message:"Enter a valid Email Address"}}}},i={render:r,args:{label:"MinLength",helperText:"Should be overriden by error",rules:{minLength:{value:10,message:"Minimum length is 10 characters"}}}},m={render:r,args:{label:"MaxLength",helperText:"Should be overriden by error",rules:{maxLength:{value:5,message:"Max length is 5 characters"}}}},c={render:r,args:{label:"Required",rules:{required:!0,maxLength:5}}},d={render:r,args:{label:"Single Select",rules:{required:"Required"},select:!0,children:[e.jsx(t,{value:10,children:"Ten"},10),e.jsx(t,{value:20,children:"Twenty"},20),e.jsx(t,{value:30,children:"Thirty"},30)]}},p={render:r,args:{label:"Multiple Select",rules:{required:"Required"},select:!0,SelectProps:{multiple:!0},children:[e.jsx(t,{value:10,children:"Ten"},10),e.jsx(t,{value:20,children:"Twenty"},20),e.jsx(t,{value:30,children:"Thirty"},30)]}};var x,T,S;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Default'
  }
}`,...(S=(T=o.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};var M,b,v;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'RegexCheck',
    helperText: 'Some text',
    rules: {
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$/,
        message: 'Enter a valid Email Address'
      }
    }
  }
}`,...(v=(b=u.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var y,f,R;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'MinLength',
    helperText: 'Should be overriden by error',
    rules: {
      minLength: {
        value: 10,
        message: 'Minimum length is 10 characters'
      }
    }
  }
}`,...(R=(f=i.parameters)==null?void 0:f.docs)==null?void 0:R.source}}};var q,I,L;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'MaxLength',
    helperText: 'Should be overriden by error',
    rules: {
      maxLength: {
        value: 5,
        message: 'Max length is 5 characters'
      }
    }
  }
}`,...(L=(I=m.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var k,j,F;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Required',
    rules: {
      required: true,
      maxLength: 5
    }
  }
}`,...(F=(j=c.parameters)==null?void 0:j.docs)==null?void 0:F.source}}};var A,C,_;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Single Select',
    rules: {
      required: 'Required'
    },
    select: true,
    children: [<MenuItem key={10} value={10}>
        Ten
      </MenuItem>, <MenuItem key={20} value={20}>
        Twenty
      </MenuItem>, <MenuItem key={30} value={30}>
        Thirty
      </MenuItem>]
  }
}`,...(_=(C=d.parameters)==null?void 0:C.docs)==null?void 0:_.source}}};var z,E,Z;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: Template,
  args: {
    label: 'Multiple Select',
    rules: {
      required: 'Required'
    },
    select: true,
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
}`,...(Z=(E=p.parameters)==null?void 0:E.docs)==null?void 0:Z.source}}};const se=["Default","RegexCheck","MinLength","MaxLength","Required","SingleSelect","MultipleSelect"];export{o as Default,m as MaxLength,i as MinLength,p as MultipleSelect,u as RegexCheck,c as Required,d as SingleSelect,se as __namedExportsOrder,ae as default};
