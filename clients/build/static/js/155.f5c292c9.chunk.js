"use strict";(self.webpackChunkclients=self.webpackChunkclients||[]).push([[155],{74541:function(e,t,n){var a=n(27166),c=n(33032),r=n(84791),l=n(35493);function s(){return(s=(0,c.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",r.Z.get("/mfccal/cert/getcert/".concat(t)));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function o(){return(o=(0,c.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",r.Z.get("/mfccal/cert/getreport/".concat(t)));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t.Z={getAll:function(e){return r.Z.get("/mfccal/all/".concat(e))},getLimitAll:function(e){return r.Z.post("/mfccal/limitall",{data:e,headers:(0,l.Z)()})},getById:function(e){return r.Z.get("/mfccal/onebyid/".concat(e))},create:function(e){return r.Z.post("/mfccal",e)},update:function(e,t){return r.Z.put("/mfccal/update/".concat(e),t)},remove:function(e){return r.Z.delete("/mfccal/".concat(e))},removeAll:function(){return r.Z.delete("/mfccal")},findByName:function(e){return r.Z.get("/mfccal?name=".concat(e))},getCertByID:function(e){return s.apply(this,arguments)},getDataReportByID:function(e){return o.apply(this,arguments)},getAllEquipCal:function(){return r.Z.get("mfccal/cert/equipment/all")},updateEquipCal:function(e,t){return r.Z.put("/mfccal/cert/equipment/update/".concat(e),t)},loadCert:function(e){return r.Z.get("/mfccal/cert/equipment/download/".concat(e),{responseType:"arraybuffer",headers:{"Content-Type":"application/json",Accept:"application/pdf"}})},getByWO:function(e){return r.Z.post("/mfccal/getByWO",{data:e})},getBySN:function(e){return console.log("data from getBySN IS ".concat(e)),r.Z.post("/mfccal/getBySN",{data:e})}}},35493:function(e,t,n){function a(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{"x-access-token":e.accessToken}:{}}n.d(t,{Z:function(){return a}})},84791:function(e,t,n){var a=n(13123);t.Z=a.Z.create({baseURL:"http://localhost:3000/api"}),console.log("env: ","http://localhost:3000/api")},29155:function(e,t,n){n.r(t),n.d(t,{default:function(){return y}});var a=n(18489),c=n(50678),r=n(72791),l=n(71358),s=n(80184);var o=n(31303),u=n(83738),i=["indeterminate"];function d(e){var t=e.columns,n=e.data,c=e.onclick,d=r.useMemo((function(){return{Filter:P}}),[]),p=r.forwardRef((function(e,t){var n=e.indeterminate,c=(0,u.Z)(e,i),l=r.useRef(),o=t||l;return r.useEffect((function(){o.current.indeterminate=n}),[o,n]),(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("input",(0,a.Z)({type:"radio",ref:o},c))})})),f=(0,l.useTable)({columns:t,data:n,initialState:{pageIndex:0,pageSize:10},defaultColumn:d,autoResetHiddenColumns:!1,autoResetSelectedRows:!1},l.useFilters,l.useSortBy,l.usePagination,l.useRowSelect,(function(e){e.visibleColumns.push((function(e){return[{id:"selection",Header:(0,s.jsx)("div",{children:"Cert. Detail"}),Cell:function(e){var t=e.row,n=e.toggleAllRowsSelected,r=e.toggleRowSelected,l=t.getToggleRowSelectedProps();return(0,s.jsx)(p,(0,a.Z)((0,a.Z)({},l),{},{onClick:function(){n(!1),r(t.id,!l.checked),c(t)}}))}}].concat((0,o.Z)(e))}))})),m=f.getTableProps,g=f.getTableBodyProps,h=f.headerGroups,x=(f.rows,f.prepareRow),Z=f.setHiddenColumns,w=f.page,C=f.canPreviousPage,j=f.canNextPage,v=f.pageOptions,D=f.pageCount,y=f.gotoPage,S=f.nextPage,b=f.previousPage,N=f.setPageSize,k=f.state,I=k.pageIndex,q=k.pageSize;f.selectedFlatRows,f.state.selectedRowIds;function P(e){var t=e.column,n=t.filterValue,a=t.preFilteredRows,c=t.setFilter,r=a.length;return(0,s.jsx)("input",{value:n||"",onChange:function(e){c(e.target.value||void 0)},placeholder:"Search ".concat(r," records...")})}(0,r.useEffect)((function(){Z(["IDcalEquip","CertID"])}),[]);var R=function(e){return new Date(e.value)<new Date};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("table",(0,a.Z)((0,a.Z)({},m()),{},{className:"equip-table",size:"small",children:[(0,s.jsx)("thead",{children:h.map((function(e){return(0,s.jsx)("tr",(0,a.Z)((0,a.Z)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return(0,s.jsxs)("th",(0,a.Z)((0,a.Z)({},e.getHeaderProps(e.getSortByToggleProps())),{},{className:e.isSorted?e.isSortedDesc?"sort-desc":"sort-asc":"",children:[e.render("Header"),(0,s.jsx)("div",{className:"filter",children:e.canFilter?e.render("Filter"):null})]}))}))}))}))}),(0,s.jsx)("tbody",(0,a.Z)((0,a.Z)({},g()),{},{children:w.map((function(e){return x(e),(0,s.jsx)("tr",(0,a.Z)((0,a.Z)({},e.getRowProps()),{},{className:"tr ".concat(e.isSelected?"selected":""),children:e.cells.map((function(e,t){return(0,s.jsx)("td",(0,a.Z)((0,a.Z)({},e.getCellProps()),{},{className:" ".concat(9===t&&R(e)?"blinking":"non-blinking"),children:e.render("Cell")}))}))}))}))}))]})),(0,s.jsxs)("div",{className:"pagination",children:[(0,s.jsx)("button",{onClick:function(){return y(0)},disabled:!C,children:"<<"})," ",(0,s.jsx)("button",{onClick:function(){return b()},disabled:!C,children:"<"})," ",(0,s.jsx)("button",{onClick:function(){return S()},disabled:!j,children:">"})," ",(0,s.jsx)("button",{onClick:function(){return y(D-1)},disabled:!j,children:">>"})," ",(0,s.jsxs)("span",{children:["Page"," ",(0,s.jsxs)("strong",{children:[I+1," of ",v.length]})," "]}),(0,s.jsxs)("span",{children:["| Go to page:"," ",(0,s.jsx)("input",{type:"number",defaultValue:I+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;y(t)},style:{width:"100px",padding:"2px"}})]})," ",(0,s.jsx)("select",{style:{width:"120px"},value:q,onChange:function(e){N(Number(e.target.value))},children:[10,20,30,40,50].map((function(e){return(0,s.jsxs)("option",{value:e,children:["Show ",e]},e)}))})]})]})}n(90675);var p=n(21609),f=n(84791),m=n(33545),g=n.n(m),h=n(87705),x=n(59513),Z=n.n(x),w=(n(68639),n(1288)),C=function(e){var t=(0,r.useState)(null),n=(0,c.Z)(t,2),a=n[0],l=n[1],o=e.certData;console.log("calDue: ",o.calDue);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(w.Z,{item:!0,xs:6,children:["Cert. File",(0,s.jsx)("input",{type:"file",onChange:function(e){l(e.target.files[0])}})]}),(0,s.jsx)(w.Z,{item:!0,xs:2,children:(0,s.jsx)("input",{type:"submit",className:"upload",value:"Upload!",onClick:function(){var e=new FormData;e.append("file",a),e.append("CEIDin",o.calEqID),e.append("CertNumIn",o.newCertNum),e.append("CalDateIn",o.lastCal),e.append("CalDueIn",o.calDue),console.log("formData: ",e),f.Z.post("/mfccal/cert/equipment/upload",e).then((function(e){console.log(e.statusText)}))}})})]})},j=n(74541),v=function(e){var t=(0,h.cI)(),n=t.register,l=(t.handleSubmit,t.formState.errors,t.reset),o=e.rowValues;console.log("data passing: ",o);var u=(0,r.useState)({calDue:null,lastCal:null,calDescr:null,newCertNum:null,updateShown:!1,calEqID:null,certNum:null,certID:null,newCalDate:null,newCalDueDate:null}),i=(0,c.Z)(u,2),d=i[0],p=i[1],f=(0,r.useState)(!1),m=(0,c.Z)(f,2),g=m[0],x=(m[1],["(",o.Descr,")"].join(""));(0,r.useEffect)((function(){p((0,a.Z)((0,a.Z)({},d),{},{calDue:o.CalDue,lastCal:o.LastCal,calDescr:x,calEqID:o.IDcalEquip,certNum:o.CertNumber,certID:o.CertID,newCalDate:new Date})),l(o),console.log("data in Effect: ",d)}),[o]);return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(w.Z,{container:!0,xs:12,className:"equip button",children:[(0,s.jsxs)(w.Z,{container:!0,xs:12,className:"equip description",spacing:"3",direction:"row",justify:"flex-start",children:[(0,s.jsxs)(w.Z,{item:!0,xs:2,children:["Cert Number",(0,s.jsx)("input",{type:"text",value:d.certNum})]}),(0,s.jsxs)(w.Z,{item:!0,xs:2,className:"equip lastcal",children:["Last Cal Date",(0,s.jsx)("input",{type:"text",value:d.lastCal})]}),(0,s.jsxs)(w.Z,{item:!0,xs:2,children:["Cal Due Date",(0,s.jsx)("input",{type:"text",value:d.calDue})]}),(0,s.jsxs)(w.Z,{item:!0,xs:2,children:["***Select to Update***",(0,s.jsx)("input",{type:"checkbox",checked:d.updateShown,onChange:function(){var e=!d.updateShown;console.log("checked? ",e),p(e?(0,a.Z)((0,a.Z)({},d),{},{updateShown:!d.updateShown,newCalDate:new Date}):(0,a.Z)((0,a.Z)({},d),{},{updateShown:!d.updateShown,newCalDate:null,newCalDueDate:null}))}})]})]}),(0,s.jsxs)(w.Z,{container:!0,xs:12,spacing:3,direction:"row",className:d.updateShown?"certnum":"certnum-hidden",children:[(0,s.jsxs)(w.Z,{item:!0,xs:2,children:["New Cert Number",(0,s.jsx)("input",(0,a.Z)((0,a.Z)({type:"text",defaultValue:d.newCertNum},n("certnum",{required:"true"})),{},{onChange:function(e){p((0,a.Z)((0,a.Z)({},d),{},{newCertNum:e.target.value}))}}))]}),(0,s.jsxs)(w.Z,{item:!0,xs:2,children:["New Cal Date",(0,s.jsx)(Z(),{selected:new Date(d.newCalDate),dateFormat:"MM/dd/yyyy",onChange:function(e){var t=e,n=new Date(e);n.setFullYear(n.getFullYear()+1),n.setDate(n.getDate());var c=n.toLocaleDateString();p((0,a.Z)((0,a.Z)({},d),{},{newCalDate:t,newCalDueDate:c}))}})]}),(0,s.jsxs)(w.Z,{item:!0,xs:2,children:["New Cal Due Date",(0,s.jsx)("input",{type:"text",defaultValue:d.newCalDueDate})]}),(0,s.jsx)(w.Z,{container:!0,item:!0,xs:5,spacing:0,direction:"row",children:!g&&(0,s.jsx)(C,{certData:d})}),g&&(0,s.jsx)(w.Z,{item:!0,xs:1,className:"update-success",children:(0,s.jsx)("p",{children:"Updated Certification Successsful!"})})]}),(0,s.jsxs)(w.Z,{container:!0,xs:12,spacing:"1",direction:"row",justify:"flex-start",children:[(0,s.jsx)(w.Z,{item:!0,xs:2,children:(0,s.jsx)("input",{type:"submit",onClick:function(){var e=d.certID;console.log("id: ",e),j.Z.loadCert(e).then((function(e){var t=e.data;console.log("data: ",t);var n=window.URL.createObjectURL(new Blob([t],{type:"application/pdf"})),a=document.createElement("a");a.href=n,a.setAttribute("download","file.pdf"),document.body.appendChild(a),a.click(),document.body.removeChild(a)})).catch((function(e){return console.log(e)}))},value:"DownLoad Cert"})}),(0,s.jsx)(w.Z,{item:!0,xs:2,children:(0,s.jsx)("input",{type:"submit",onClick:function(){window.location.reload()},value:"Back To Previous"})})]})]})})},D=new(g());var y=function(){var e=(0,r.useState)({columns:[],values:[]}),t=(0,c.Z)(e,2),n=t[0],l=t[1],o=(0,r.useState)([]),u=(0,c.Z)(o,2),i=(u[0],u[1],(0,r.useState)([])),f=(0,c.Z)(i,2),m=(f[0],f[1],(0,r.useState)({isSelected:!1,rowValues:{}})),g=(0,c.Z)(m,2),h=g[0],x=g[1];return(0,r.useEffect)((function(){console.log("running useEffect!!!"),j.Z.getAllEquipCal().then((function(e){var t=e.data.equipList.map((function(e){var t=D.guid();return(0,a.Z)({_id:t},e)})),n=function(e){var t=[],n=e[0];return Object.keys(n).forEach((function(e){"_id"!==e&&t.push({accessor:e,Header:e})})),t}(t);l({columns:n,values:t})}))}),[]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(p.Z,{name:"Calibration Equipment Listing"}),(0,s.jsx)("div",{className:"table-equipment",children:(0,s.jsx)(d,{minRows:4,columns:n.columns,data:n.values,onclick:function(e){var t=!e.isSelected;t?console.log("selected!"):console.log(">>NOT selected!");var n={isSelected:t,rowValues:e.values};x(n)}})}),(0,s.jsxs)("div",{className:"equip-info",children:[console.log(">>rowProps.clicked: ",h),h.isSelected&&(0,s.jsx)(v,{rowValues:h.rowValues})]})]})}},21609:function(e,t,n){var a=n(80184);t.Z=function(e){return(0,a.jsx)("div",{className:"form-header",style:{textAlign:"center"},children:(0,a.jsx)("h1",{children:e.name})})}}}]);
//# sourceMappingURL=155.f5c292c9.chunk.js.map