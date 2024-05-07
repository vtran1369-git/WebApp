"use strict";(self.webpackChunkclients=self.webpackChunkclients||[]).push([[36],{21609:function(e,s,t){var l=t(80184);s.Z=function(e){return(0,l.jsx)("div",{className:"form-header",style:{textAlign:"center"},children:(0,l.jsx)("h1",{children:e.name})})}},15036:function(e,s,t){t.r(s),t.d(s,{default:function(){return x}});t(36222);var l=t(18489),n=t(50678),a=t(72791),r=t(87705),i=(t(68639),t(90675),t(21609)),c=t(1288),o=t(80184);function x(){var e=(0,r.cI)(),s=e.register,t=e.handleSubmit,x=e.formState.errors,m=(0,a.useState)([]),u=(0,n.Z)(m,2),d=(u[0],u[1],(0,a.useState)("")),h=(0,n.Z)(d,2),j=h[0],g=h[1],p=(0,a.useState)(""),f=(0,n.Z)(p,2),Z=f[0],F=f[1],v=(0,a.useState)(""),N=(0,n.Z)(v,2),S=(N[0],N[1],(0,a.useState)("")),y=(0,n.Z)(S,2),H=(y[0],y[1],(0,a.useState)("")),b=(0,n.Z)(H,2),T=(b[0],b[1],(0,a.useState)("")),C=(0,n.Z)(T,2),L=(C[0],C[1],(0,a.useState)("")),I=(0,n.Z)(L,2),w=(I[0],I[1],(0,a.useState)("")),D=(0,n.Z)(w,2),M=(D[0],D[1],(0,a.useState)("")),q=(0,n.Z)(M,2),A=(q[0],q[1],(0,a.useState)("")),_=(0,n.Z)(A,2),E=(_[0],_[1],(0,a.useState)("")),V=(0,n.Z)(E,2),k=(V[0],V[1],(0,a.useState)("")),G=(0,n.Z)(k,2),O=(G[0],G[1],(0,a.useState)({material:"",vhf:"",mfcIN:"",mfcOUT:"",controlType:"",mfc1:"",mfc2:"",mfc3:"",mfc4:"",mfc5:"",mfc6:""})),R=(0,n.Z)(O,2);R[0],R[1];console.log(x);return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("div",{className:"form-container truflow",children:[(0,o.jsx)(i.Z,{name:"TruFLOW Configurator"}),(0,o.jsx)("form",{onSubmit:t((function(e){console.log("submit data: ",e);var s="None"===e.vhf_selected?"":"-VHF",t=(""===s||e.controlType,""!==e.gas4&&"000"!==e.gas4?"-"+e.gas4:"-000"),l=""!==e.gas5&&"000"!==e.gas5?"-"+e.gas5:"-000",n=""!==e.gas6&&"000"!==e.gas6?"-"+e.gas6:"-000",a=parseInt(e.gas1.slice(1)),r=parseInt(e.gas2.slice(1)),i=parseInt(e.gas3.slice(1)),c=parseInt(e.gas4.slice(1)),o=parseInt(e.gas5.slice(1)),x=parseInt(e.gas6.slice(1)),m=e.material,u=m.slice(-2);if(console.log("gas : ",a+"-"+r+", "+i+", ",c+", "+o+","+x+", "+m),(a>=50||r>=50||i>=50||c>=50||o>=50||x>=50)!==("HF"==u))alert("HF wrong value selected!");else{var d="";alert("HF SELECT RIGHT!"),"HF"===u?(d=m.slice(0,-3),console.log("trim: "+m.slice(0,-3))):(d=m,console.log("trimHF-MATERIAL: "+m),console.log("trimHF: "+d));var h=d+s+"-B"+e.mfc_inputs+e.mfc_outputs+"-"+e.gas1+"-"+e.gas2+"-"+e.gas3+t+l+n;console.log("cfgPN: ",h),F(h)}})),children:(0,o.jsxs)(c.Z,{container:!0,xs:12,direction:"row",justify:"flex-start",children:[(0,o.jsxs)(c.Z,{container:!0,xs:12,spacing:"1",children:[(0,o.jsx)(c.Z,{item:!0,xs:4,className:"form-control",children:(0,o.jsx)("label",{children:"Material"})}),(0,o.jsx)(c.Z,{item:!0,xs:2,className:"form-control",children:(0,o.jsx)("label",{children:"VHF"})}),(0,o.jsx)(c.Z,{item:!0,xs:2,className:"form-control",children:(0,o.jsx)("label",{children:"MFC Inputs"})}),(0,o.jsx)(c.Z,{item:!0,xs:2,className:"form-control",children:(0,o.jsx)("label",{children:"MFC Outputs"})}),(0,o.jsx)(c.Z,{item:!0,xs:2,className:"form-control",children:(0,o.jsx)("label",{children:"Control Type"})}),(0,o.jsx)(c.Z,{item:!0,xs:4,className:"form-control",children:(0,o.jsxs)("select",(0,l.Z)((0,l.Z)({},s("material")),{},{children:[(0,o.jsx)("option",{value:"FTFA",children:"Analog"}),(0,o.jsx)("option",{value:"FTFAS",children:"Analog Stainless Steel"}),(0,o.jsx)("option",{value:"FTFD",children:"Digital"}),(0,o.jsx)("option",{value:"FTFDS",children:"Digital Stainless Steel"}),(0,o.jsx)("option",{value:"FTFD-HF",children:"Digital High Flow"}),(0,o.jsx)("option",{value:"FTFDS-HF",children:"Digital High Flow Stainless Steel"}),(0,o.jsx)("option",{value:"FTFDH-HF",children:"Expanded Capacity High Flow"})]}))}),(0,o.jsx)(c.Z,{item:!0,xs:2,className:"form-control",children:(0,o.jsxs)("select",(0,l.Z)((0,l.Z)({},s("vhf_selected")),{},{default:"None",onChange:function(e){var s=e.target.value;g(s)},children:[(0,o.jsx)("option",{value:"None",children:"None"}),(0,o.jsx)("option",{value:"VHF",children:"VHF"})]}))}),(0,o.jsx)(c.Z,{item:!0,xs:2,className:"form-control custom-input",children:(0,o.jsx)("input",(0,l.Z)({type:"text"},s("mfc_inputs",{required:!0,maxLength:1})))}),(0,o.jsx)(c.Z,{item:!0,xs:2,className:"form-control",children:(0,o.jsx)("input",(0,l.Z)({type:"text",value:3},s("mfc_outputs",{required:!0,maxLength:1})))}),(0,o.jsx)(c.Z,{item:!0,xs:2,className:"form-control",children:(0,o.jsxs)("select",(0,l.Z)((0,l.Z)({className:"VHF"===j?"truflow-control-type-visible":"truflow-control-type-hidden"},s("controlType",{requrired:!1})),{},{children:[(0,o.jsx)("option",{value:"A",children:"G3Pro"}),(0,o.jsx)("option",{value:"B",children:"G3Lite"}),(0,o.jsx)("option",{value:"C",children:"G3Lab"}),(0,o.jsx)("option",{value:"D",children:"OTHER"})]}))})]}),(0,o.jsxs)(c.Z,{container:!0,xs:12,spacing:"1",children:[(0,o.jsxs)(c.Z,{item:!0,xs:2,className:"form-control",children:[(0,o.jsx)("label",{children:"MFC1"}),(0,o.jsx)("input",(0,l.Z)({type:"text"},s("gas1",{required:!0,maxLength:6})))]}),(0,o.jsxs)(c.Z,{item:!0,xs:2,className:"form-control",children:[(0,o.jsx)("label",{children:"MFC2"}),(0,o.jsx)("input",(0,l.Z)({type:"text"},s("gas2",{required:!0,maxLength:6})))]}),(0,o.jsxs)(c.Z,{item:!0,xs:2,className:"form-control",children:[(0,o.jsx)("label",{children:"MFC3"}),(0,o.jsx)("input",(0,l.Z)({type:"text"},s("gas3",{required:!0,maxLength:6})))]}),(0,o.jsxs)(c.Z,{item:!0,xs:2,className:"form-control",children:[(0,o.jsx)("label",{children:"MFC4"}),(0,o.jsx)("input",(0,l.Z)({type:"text"},s("gas4",{required:!1,maxLength:6})))]}),(0,o.jsxs)(c.Z,{item:!0,xs:2,className:"form-control",children:[(0,o.jsx)("label",{children:"MFC5"}),(0,o.jsx)("input",(0,l.Z)({type:"text"},s("gas5",{required:!1,maxLength:6})))]}),(0,o.jsxs)(c.Z,{item:!0,xs:2,className:"form-control",children:[(0,o.jsx)("label",{children:"MFC6"}),(0,o.jsx)("input",(0,l.Z)({type:"text"},s("gas6",{required:!1,maxLength:6})))]})]}),(0,o.jsxs)(c.Z,{container:!0,xs:12,children:[(0,o.jsx)(c.Z,{item:!0,xs:3,className:"form-control",children:(0,o.jsx)("input",{type:"submit"})}),(0,o.jsx)(c.Z,{item:!0,xs:9,className:"form-control",children:(0,o.jsx)("input",{type:"textarea",style:{marginLeft:20},value:Z})})]})]})})]})})}},68639:function(){}}]);
//# sourceMappingURL=36.e879ecbc.chunk.js.map