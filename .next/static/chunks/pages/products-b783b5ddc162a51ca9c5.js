_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[35],{Kpik:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/products",function(){return r("q2dU")}])},MjXB:function(e,t,r){"use strict";var n=r("ODXe"),a=r("U2AE");t.a=function(e){var t=a.b.filter((function(t){return t.value==e})),r=Object(n.a)(t,1)[0];return r?r.name:""}},ODXe:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r("BsWD");function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,c=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(o){a=!0,c=o}finally{try{n||null==s.return||s.return()}finally{if(a)throw c}}return r}}(e,t)||Object(n.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},q2dU:function(e,t,r){"use strict";r.r(t),r.d(t,"__N_SSP",(function(){return y}));var n=r("nKUr"),a=r("o0o1"),c=r.n(a),i=r("HaE+"),s=r("rePB"),o=r("KQm4"),u=r("q1tI"),l=r("DPf8"),d=r("U2AE"),b=r("ozCu"),p=r("vDqi"),f=r.n(p),j=r("d76Q"),O=r.n(j),m=(r("MjXB"),r("AdzQ")),h=r("YFqc"),x=r.n(h);function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function g(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(Object(r),!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y=!0;t.default=function(){var e=Object(u.useState)([]),t=e[0],r=e[1],a=Object(u.useState)("all"),p=a[0],j=(a[1],Object(u.useState)({edit:!1,delete:!1,page:!1})),h=j[0],v=j[1],y=Object(u.useState)([]),w=y[0],N=y[1],E=Object(u.useState)(""),_=E[0],P=E[1],S=Object(u.useRef)(null),k=function(e,t){v(g(g({},h),{},Object(s.a)({},e,t)))},D=function(){var e=Object(i.a)(c.a.mark((function e(){var t,n,a=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=a.length>0&&void 0!==a[0]?a[0]:[],k("page",!0),e.prev=2,!(t.length<=0)){e.next=8;break}return e.next=6,f()({baseURL:d.a,url:"/api/product/getAll",method:"GET"});case 6:n=e.sent,t=n.data.data;case 8:"all"===p?(N(Object(o.a)(t)),r(Object(o.a)(t))):(t=t.filter((function(e){return e.type===p})),N(Object(o.a)(t)),r(Object(o.a)(t))),k("page",!1),e.next=14;break;case 12:e.prev=12,e.t0=e.catch(2);case 14:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(){return e.apply(this,arguments)}}();Object(u.useEffect)((function(){D()}),[p]);var U=function(){var e=Object(i.a)(c.a.mark((function e(t){var r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k("delete",t),e.prev=1,e.next=4,f()({baseURL:d.a,url:"/api/product/delete",method:"DELETE",params:{id:t}});case 4:return r=e.sent,e.next=7,D(r.data.data);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),alert("\u0641\u0634\u0644 \u062d\u0630\u0641 ");case 12:k("delete",null);case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}(),A=[{name:"",selector:function(e){return Object(n.jsx)("img",{src:"".concat(d.a,"/").concat(e.image),className:"w-16 py-3"})}},{name:"\u0627\u0644\u0627\u0633\u0645",selector:function(e){return e.name},sortable:!0},{name:"\u0627\u0644\u0633\u0639\u0631",selector:function(e){return e.price},sortable:!0},{name:"",selector:function(e){return Object(n.jsxs)("div",{className:"gap-x-3 flex ",children:[Object(n.jsx)(x.a,{href:"/products/edit/".concat(e.id),children:Object(n.jsx)("a",{className:"bg-primary hover:bg-secondary p-2 rounded-lg text-white",children:Object(n.jsx)("span",{className:"material-icons text-lg",children:"edit"})})}),Object(n.jsx)(m.a,{loader:h.delete===e.id,color:"red-500",children:Object(n.jsx)("button",{className:"bg-red-500 hover:bg-red-400 p-2 rounded-lg text-white",onClick:function(t){return U(e.id)},children:Object(n.jsx)("span",{className:"material-icons text-lg",children:"delete"})})})]})},sortable:!0}];return Object(n.jsx)(l.a,{className:"",title:"\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a",addLink:"/products/add",children:h.page?Object(n.jsx)("div",{className:"flex justify-center items-center",children:Object(n.jsx)("div",{className:"material-icons text-6xl text-primary animate-spin",children:"track_changes"})}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("div",{className:"w-full p-3 bg-white rounded-lg",children:Object(n.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),_){var t=w.filter((function(e){return e.name.toLowerCase().includes(_.toLowerCase())}));r(Object(o.a)(t))}else r(Object(o.a)(w)),S.current.focus()},className:"flex space-x-3 space-x-reverse py-3 justify-between",children:[Object(n.jsx)("input",{value:_,type:"search",ref:S,onChange:function(e){return P(e.target.value)},placeholder:"\u0628\u062d\u062b...",className:"flex-grow"}),Object(n.jsx)("button",{className:"material-icons",type:"submit",children:"search"})]})}),t.length>=1?Object(n.jsx)("div",{className:"p-2 rounded-md bg-white",children:Object(n.jsx)(O.a,{columns:A,data:t,pagination:!0,paginationComponentOptions:{rowsPerPageText:"\u0627\u0644\u0646\u062a\u0627\u0626\u062c \u0641\u064a \u0627\u0644\u0635\u0641\u062d\u0629"}})}):Object(n.jsx)(b.a,{})]})})}}},[["Kpik",0,1,2,3,4,8]]]);