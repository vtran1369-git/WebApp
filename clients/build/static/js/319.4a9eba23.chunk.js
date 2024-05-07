"use strict";(self.webpackChunkclients=self.webpackChunkclients||[]).push([[319],{58534:function(e,t,n){var r=n(84791),a=n(35493);t.Z={getAll:function(e){return r.Z.post("/workorder/all",{data:e,headers:(0,a.Z)()})},getWO_NUMs:function(){return r.Z.get("/workorder/wo_nums")},getWOBySN:function(e){return r.Z.get("/workorder/onebysn/".concat(e))}}},35493:function(e,t,n){function r(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{"x-access-token":e.accessToken}:{}}n.d(t,{Z:function(){return r}})},84791:function(e,t,n){var r=n(13123);t.Z=r.Z.create({baseURL:"http://localhost:3000/api"}),console.log("env: ","http://localhost:3000/api")},21609:function(e,t,n){var r=n(80184);t.Z=function(e){return(0,r.jsx)("div",{className:"form-header",style:{textAlign:"center"},children:(0,r.jsx)("h1",{children:e.name})})}},28319:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var r=n(72791),a=n(21609),s=n(50678),o=n(18489),c=(n(83738),n(71358)),l=n(58534),u=n(80184);function i(e){var t=e.columns,n=e.data,a=e.fetchData,s=e.loading,l=e.pageCount,i=r.useMemo((function(){return{Filter:d}}),[]);function d(e){var t=e.column,n=t.filterValue,r=t.preFilteredRows,a=t.setFilter,s=r.length;return(0,u.jsx)("input",{value:n||"",onChange:function(e){a(e.target.value||void 0)},placeholder:"Search ".concat(s," records...")})}var g=(0,c.useTable)({columns:t,data:n,defaultColumn:i,initialState:{pageIndex:0,pageSize:15},manualPagination:!0,pageCount:l,autoResetFilter:!1,autoResetPage:!1},c.useFilters,c.useSortBy,c.usePagination,c.useRowSelect),p=g.getTableProps,h=g.getTableBodyProps,f=g.headerGroups,x=g.prepareRow,m=g.page,j=g.canPreviousPage,v=g.canNextPage,S=g.pageOptions,Z=g.pageCount,b=g.gotoPage,C=g.nextPage,k=g.previousPage,P=g.setPageSize,N=g.state,w=N.pageIndex,y=N.pageSize;return(0,r.useEffect)((function(){a({pageIndex:w,pageSize:y})}),[a,w,y]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("table",(0,o.Z)((0,o.Z)({},p()),{},{children:[(0,u.jsx)("thead",{children:f.map((function(e){return(0,u.jsx)("tr",(0,o.Z)((0,o.Z)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return(0,u.jsxs)("th",(0,o.Z)((0,o.Z)({},e.getHeaderProps(e.getSortByToggleProps())),{},{className:e.isSorted?e.isSortedDesc?"sort-desc":"sort-asc":"",children:[e.render("Header"),(0,u.jsx)("div",{className:"filter",children:e.canFilter?e.render("Filter"):null})]}))}))}))}))}),(0,u.jsxs)("tbody",(0,o.Z)((0,o.Z)({},h()),{},{children:[m.map((function(e,t){return x(e),(0,u.jsx)("tr",(0,o.Z)((0,o.Z)({},e.getRowProps()),{},{className:"tr ".concat(e.isSelected?"selected":""),children:e.cells.map((function(e,t){return(0,u.jsx)("td",(0,o.Z)((0,o.Z)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))})),(0,u.jsx)("tr",{children:s?(0,u.jsx)("td",{colSpan:"10000",children:"Loading..."}):(0,u.jsxs)("td",{colSpan:"10000",children:["Showing ",m.length," of ~",l*y," ","results"]})})]}))]})),(0,u.jsxs)("div",{className:"pagination",children:[(0,u.jsx)("button",{onClick:function(){return b(0)},disabled:!j,children:"<<"})," ",(0,u.jsx)("button",{onClick:function(){return k()},disabled:!j,children:"<"})," ",(0,u.jsx)("button",{onClick:function(){return C()},disabled:!v,children:">"})," ",(0,u.jsx)("button",{onClick:function(){return b(Z-1)},disabled:!v,children:">>"})," ",(0,u.jsxs)("span",{children:["Page"," ",(0,u.jsxs)("strong",{children:[w+1," of ",S.length]})," "]}),(0,u.jsxs)("span",{children:["| Go to page:"," ",(0,u.jsx)("input",{type:"number",defaultValue:w+1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;b(t)},style:{width:"100px"}})]})," ",(0,u.jsx)("select",{value:y,onChange:function(e){P(Number(e.target.value))},children:[15,20,30,40,50].map((function(e){return(0,u.jsxs)("option",{value:e,children:["Show ",e]},e)}))})]})]})}function d(){var e=r.useState([]),t=(0,s.Z)(e,2),n=t[0],a=t[1],o=r.useState(!1),c=(0,s.Z)(o,2),d=c[0],g=c[1],p=r.useState(0),h=(0,s.Z)(p,2),f=h[0],x=h[1],m=r.useRef(0),j=(0,r.useState)(!1),v=(0,s.Z)(j,2),S=v[0],Z=v[1],b=(0,r.useState)(null),C=(0,s.Z)(b,2),k=C[0],P=C[1],N=r.useMemo((function(){return[{Header:"WO Number",accessor:"WO Number"},{Header:"Quantity",accessor:"Quantity"},{Header:"Created Date",accessor:"Created Date"},{Header:"Full Name",accessor:"Full_Name"},{Header:"Required Date",accessor:"Required Date"},{Header:"Instruction",accessor:"Instruction"},{Header:"Status",accessor:"Status"}]})),w=r.useCallback((function(e){var t=e.pageSize,n=e.pageIndex,r=++m.current;g(!0),setTimeout((function(){r===m.current&&(console.log("fetchdata: ",n,"-",t),l.Z.getAll({pageIndex:n,pageSize:t}).then((function(e){console.log("data: ",e.data.work_orders);var t=e.data.work_orders;a(t),x(parseInt(e.data.pages))}),(function(e){console.log("error: ",e);var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();console.log("_content: ",t),Z(!0),P(t)})),g(!1))}),1e3)}),[]);return(0,u.jsx)("div",{children:S?(0,u.jsx)("div",{children:k}):(0,u.jsx)("div",{children:(0,u.jsx)(i,{columns:N,data:n,fetchData:w,loading:d,pageCount:f})})})}var g=function(){return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(a.Z,{name:"Work Order"}),(0,u.jsx)("div",{className:"App-tbl",children:(0,u.jsx)(d,{})})]})}}}]);
//# sourceMappingURL=319.4a9eba23.chunk.js.map