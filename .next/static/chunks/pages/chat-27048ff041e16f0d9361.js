_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[18],{"20a2":function(e,t,c){e.exports=c("nOHt")},"2pGg":function(e,t,c){"use strict";c.r(t);var l=c("nKUr"),n=c("DPf8");c("q1tI");t.default=function(){return Object(l.jsx)(n.a,{className:"",title:"\u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0627\u062a",chat:!0,children:Object(l.jsx)("div",{className:"flex w-full h-full",children:Object(l.jsx)("iframe",{src:"https://dashboard.tawk.to/#/chat",className:"w-full h-full"})})})}},"9uAC":function(e,t,c){"use strict";var l=c("nKUr"),n=(c("q1tI"),c("YFqc")),s=c.n(n),a=c("20a2");t.a=function(e){var t=e.href,c=e.children,n=e.activeClassName,i=e.className,r=e.style,o=Object(a.useRouter)();return Object(l.jsx)(s.a,{href:t,children:Object(l.jsx)("a",{style:r,className:"".concat(i," ").concat(o.pathname===t?n:""),children:c})})}},DPf8:function(e,t,c){"use strict";var l=c("nKUr"),n=c("q1tI"),s=c("9uAC"),a=function(e){var t=e.title,c=e.link,a=e.items,i=Object(n.useState)(!1),r=i[0],o=i[1];return Object(l.jsxs)("div",{className:"w-full text-white",children:[Object(l.jsxs)("div",{className:"flex justify-between items-center",children:[Object(l.jsx)(s.a,{href:c,className:"capitalize text-xl font-semibold",activeClassName:"text-primary",children:t}),a&&a.length>=1&&Object(l.jsx)("button",{className:"material-icons px-2 bg-primary rounded-md",onClick:function(e){return o((function(e){return!e}))},children:"keyboard_arrow_down"})]}),a&&a.length>=1&&Object(l.jsx)("div",{className:"w-full text-white pl-3 space-y-3 overflow-hidden ".concat(r?"h-auto my-3":"h-0"),children:a.map((function(e,t){return Object(l.jsx)("div",{className:"flex justify-between items-center",children:Object(l.jsx)(s.a,{href:e.link,className:"capitalize text-xl font-semibold",activeClassName:"text-primary",children:e.title})},t)}))})]})},i=function(e){var t=e.className,c=e.isSidemenuOpen,n=e.setIsSidemenuOpen;return Object(l.jsx)("div",{className:"h-full bg-accent py-6 space-y-10 overflow-x-hidden ".concat(t),children:c&&Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("button",{className:"material-icons text-white bg-primary p-2 rounded-lg flex md:hidden",onClick:function(e){return n(!1)},children:"table_rows"}),Object(l.jsxs)("div",{className:"flex flex-col justify-center items-center",children:[Object(l.jsx)("div",{className:"material-icons text-white text-8xl",children:"account_circle"}),Object(l.jsx)("span",{className:"capitalize text-white font-semibold text-2xl",children:"Beko"})]}),Object(l.jsxs)("div",{className:"flex flex-col w-full space-y-3",children:[Object(l.jsx)(a,{title:"\u0627\u0644\u0641\u0626\u0627\u062a \u0627\u0644\u0627\u0633\u0627\u0633\u064a\u0629",link:"/categories"}),Object(l.jsx)(a,{title:"\u0627\u0644\u0641\u0626\u0627\u062a \u0627\u0644\u0641\u0631\u0639\u064a\u0629",link:"/sub-categories"}),Object(l.jsx)(a,{title:"\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a",link:"/products"}),Object(l.jsx)(a,{title:"\u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646",link:"/users"}),Object(l.jsx)(a,{title:"\u0627\u0644\u0645\u0639\u0631\u0636",link:"/gallery"}),Object(l.jsx)(a,{title:"\u0627\u0644\u0627\u0634\u0639\u0627\u0631\u0627\u062a",link:"/notifications"}),Object(l.jsx)(a,{title:"\u0627\u0644\u0639\u0631\u0648\u0636",link:"/offers"}),Object(l.jsx)(a,{title:"\u0627\u0644\u062a\u0635\u0645\u064a\u0645",link:"/design"}),Object(l.jsx)(a,{title:"\u0627\u0644\u0637\u0644\u0628\u0627\u062a",link:"/orders"}),Object(l.jsx)(a,{title:"\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0647",link:"/legals"}),Object(l.jsx)(a,{title:"\u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0627\u062a",link:"/chat"})]})]})})},r=c("YFqc"),o=c.n(r),f=c("d42J");t.a=function(e){var t=e.className,c=e.children,s=e.addLink,a=e.title,r=e.chat,u=Object(n.useState)(!1),d=u[0],x=u[1],j=Object(n.useContext)(f.b).mainLoader;return Object(l.jsxs)("div",{className:"w-screen h-screen flex overflow-hidden",children:[Object(l.jsx)(i,{setIsSidemenuOpen:x,isSidemenuOpen:d,className:"".concat(d?"w-full flex-shrink-0 md:w-3/6 lg:w-2/5 xl:w-1/5 px-5":"w-0")}),Object(l.jsxs)("div",{className:"h-full ".concat(d?"w-0 md:w-full":"w-full"," ").concat(t),children:[Object(l.jsxs)("div",{className:"w-full bg-accent flex justify-between items-center py-6 px-5 lg:px-10",style:{height:"8%"},children:[Object(l.jsxs)("div",{className:"flex items-center space-x-3 space-x-reverse",children:[Object(l.jsx)("button",{className:"material-icons text-white",onClick:function(e){return x((function(e){return!e}))},children:"table_rows"}),Object(l.jsx)("span",{className:"capitalize text-white",children:a})]}),Object(l.jsx)("div",{className:"flex items-center space-x-3 space-x-reverse",children:s&&Object(l.jsx)(o.a,{href:s,children:Object(l.jsx)("a",{className:"bg-primary hover:bg-secondary py-1 px-2 rounded-lg text-white flex space-x-1 space-x-reverse items-center",children:"\u0627\u0636\u0627\u0641\u0647"})})})]}),Object(l.jsx)("div",{className:"bg-gray-300 w-full p-5 overflow-y-auto",style:{height:"92%"},children:r?c:Object(l.jsx)("div",{className:"mx-auto flex flex-col space-y-5 my-20 ".concat(d?"lg:w-9/12 xl:w-7/12":"md:w-9/12 lg:w-8/12 xl:w-7/12"),children:j?Object(l.jsx)("div",{className:"flex justify-center items-center",children:Object(l.jsx)("div",{className:"material-icons text-6xl text-primary animate-spin",children:"track_changes"})}):c})})]})]})}},YFqc:function(e,t,c){e.exports=c("cTJO")},cTJO:function(e,t,c){"use strict";var l=c("J4zp"),n=c("284h");t.__esModule=!0,t.default=void 0;var s=n(c("q1tI")),a=c("elyg"),i=c("nOHt"),r=c("vNVm"),o={};function f(e,t,c,l){if(e&&(0,a.isLocalURL)(t)){e.prefetch(t,c,l).catch((function(e){0}));var n=l&&"undefined"!==typeof l.locale?l.locale:e&&e.locale;o[t+"%"+c+(n?"%"+n:"")]=!0}}var u=function(e){var t=!1!==e.prefetch,c=(0,i.useRouter)(),n=c&&c.pathname||"/",u=s.default.useMemo((function(){var t=(0,a.resolveHref)(n,e.href,!0),c=l(t,2),s=c[0],i=c[1];return{href:s,as:e.as?(0,a.resolveHref)(n,e.as):i||s}}),[n,e.href,e.as]),d=u.href,x=u.as,j=e.children,h=e.replace,m=e.shallow,p=e.scroll,b=e.locale;"string"===typeof j&&(j=s.default.createElement("a",null,j));var v=s.Children.only(j),O=v&&"object"===typeof v&&v.ref,w=(0,r.useIntersection)({rootMargin:"200px"}),y=l(w,2),N=y[0],g=y[1],k=s.default.useCallback((function(e){N(e),O&&("function"===typeof O?O(e):"object"===typeof O&&(O.current=e))}),[O,N]);(0,s.useEffect)((function(){var e=g&&t&&(0,a.isLocalURL)(d),l="undefined"!==typeof b?b:c&&c.locale,n=o[d+"%"+x+(l?"%"+l:"")];e&&!n&&f(c,d,x,{locale:l})}),[x,d,g,b,t,c]);var _={ref:k,onClick:function(e){v.props&&"function"===typeof v.props.onClick&&v.props.onClick(e),e.defaultPrevented||function(e,t,c,l,n,s,i,r){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,a.isLocalURL)(c))&&(e.preventDefault(),null==i&&(i=l.indexOf("#")<0),t[n?"replace":"push"](c,l,{shallow:s,locale:r,scroll:i}).then((function(e){e&&i&&document.body.focus()})))}(e,c,d,x,h,m,p,b)},onMouseEnter:function(e){(0,a.isLocalURL)(d)&&(v.props&&"function"===typeof v.props.onMouseEnter&&v.props.onMouseEnter(e),f(c,d,x,{priority:!0}))}};if(e.passHref||"a"===v.type&&!("href"in v.props)){var L="undefined"!==typeof b?b:c&&c.locale,C=(0,a.getDomainLocale)(x,L,c&&c.locales,c&&c.domainLocales);_.href=C||(0,a.addBasePath)((0,a.addLocale)(x,L,c&&c.defaultLocale))}return s.default.cloneElement(v,_)};t.default=u},eYbL:function(e,t,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/chat",function(){return c("2pGg")}])}},[["eYbL",0,1,2,3]]]);