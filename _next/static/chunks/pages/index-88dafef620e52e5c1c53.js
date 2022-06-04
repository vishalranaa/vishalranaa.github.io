(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8771:function(e,t,n){"use strict";var r=n(1682);function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}t.default=function(e,t){var n=i.default,r={loading:function(e){e.error,e.isLoading;return e.pastDelay,null}};e instanceof Promise?r.loader=function(){return e}:"function"===typeof e?r.loader=e:"object"===typeof e&&(r=a(a({},r),e));var o=r=a(a({},r),t);if(o.suspense)throw new Error("Invalid suspense option usage in next/dynamic. Read more: https://nextjs.org/docs/messages/invalid-dynamic-suspense");if(o.suspense)return n(o);r.loadableGenerated&&delete(r=a(a({},r),r.loadableGenerated)).loadableGenerated;if("boolean"===typeof r.ssr){if(!r.ssr)return delete r.ssr,s(n,r);delete r.ssr}return n(r)};u(n(7294));var i=u(n(4860));function u(e){return e&&e.__esModule?e:{default:e}}function s(e,t){return delete t.webpack,delete t.modules,e(t)}},1083:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.LoadableContext=void 0;var o=((r=n(7294))&&r.__esModule?r:{default:r}).default.createContext(null);t.LoadableContext=o},4860:function(e,t,n){"use strict";var r=n(2553),o=n(2012),a=n(1682);function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"===typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){u=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(u)throw a}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c,d=(c=n(7294))&&c.__esModule?c:{default:c},f=n(7161),p=n(1083);var m=[],b=[],y=!1;function h(e){var t=e(),n={loading:!0,loaded:null,error:null};return n.promise=t.then((function(e){return n.loading=!1,n.loaded=e,e})).catch((function(e){throw n.loading=!1,n.error=e,e})),n}var j=function(){function e(t,n){r(this,e),this._loadFn=t,this._opts=n,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}return o(e,[{key:"promise",value:function(){return this._res.promise}},{key:"retry",value:function(){var e=this;this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};var t=this._res,n=this._opts;t.loading&&("number"===typeof n.delay&&(0===n.delay?this._state.pastDelay=!0:this._delay=setTimeout((function(){e._update({pastDelay:!0})}),n.delay)),"number"===typeof n.timeout&&(this._timeout=setTimeout((function(){e._update({timedOut:!0})}),n.timeout))),this._res.promise.then((function(){e._update({}),e._clearTimeouts()})).catch((function(t){e._update({}),e._clearTimeouts()})),this._update({})}},{key:"_update",value:function(e){this._state=u(u({},this._state),{},{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},e),this._callbacks.forEach((function(e){return e()}))}},{key:"_clearTimeouts",value:function(){clearTimeout(this._delay),clearTimeout(this._timeout)}},{key:"getCurrentValue",value:function(){return this._state}},{key:"subscribe",value:function(e){var t=this;return this._callbacks.add(e),function(){t._callbacks.delete(e)}}}]),e}();function v(e){return function(e,t){var n=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null,suspense:!1},t);n.suspense&&(n.lazy=d.default.lazy(n.loader));var r=null;function o(){if(!r){var t=new j(e,n);r={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return r.promise()}if(!y&&"function"===typeof n.webpack&&!n.suspense){var a=n.webpack();b.push((function(e){var t,n=s(a);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(-1!==e.indexOf(r))return o()}}catch(i){n.e(i)}finally{n.f()}}))}var i=n.suspense?function(e,t){return d.default.createElement(n.lazy,u(u({},e),{},{ref:t}))}:function(e,t){o();var a=d.default.useContext(p.LoadableContext),i=f.useSubscription(r);return d.default.useImperativeHandle(t,(function(){return{retry:r.retry}}),[]),a&&Array.isArray(n.modules)&&n.modules.forEach((function(e){a(e)})),d.default.useMemo((function(){return i.loading||i.error?d.default.createElement(n.loading,{isLoading:i.loading,pastDelay:i.pastDelay,timedOut:i.timedOut,error:i.error,retry:r.retry}):i.loaded?d.default.createElement(function(e){return e&&e.__esModule?e.default:e}(i.loaded),e):null}),[e,i])};return i.preload=function(){return!n.suspense&&o()},i.displayName="LoadableComponent",d.default.forwardRef(i)}(h,e)}function g(e,t){for(var n=[];e.length;){var r=e.pop();n.push(r(t))}return Promise.all(n).then((function(){if(e.length)return g(e,t)}))}v.preloadAll=function(){return new Promise((function(e,t){g(m).then(e,t)}))},v.preloadReady=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise((function(t){var n=function(){return y=!0,t()};g(b,e).then(n,n)}))},window.__NEXT_PRELOADREADY=v.preloadReady;var _=v;t.default=_},4918:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return v},default:function(){return g}});var r=n(5152),o=n(5697),a=n.n(o),i=(n(7294),n(9008)),u=n(5893);function s(e){var t=e.data;return(0,u.jsxs)(i.default,{children:[(0,u.jsx)("title",{children:t.title}),(0,u.jsx)("meta",{name:"title",content:t.title}),(0,u.jsx)("meta",{name:"author",content:"Vishal Rana"}),(0,u.jsx)("meta",{name:"description",content:t.description}),(0,u.jsx)("meta",{name:"keywords",content:t.keywords.join(", ")}),(0,u.jsx)("link",{rel:"canonical",href:t.url}),(0,u.jsx)("meta",{property:"og:type",content:"website"}),(0,u.jsx)("meta",{property:"og:url",content:t.url}),(0,u.jsx)("meta",{property:"og:title",content:t.title}),(0,u.jsx)("meta",{property:"og:description",content:t.description}),(0,u.jsx)("meta",{property:"og:image",content:t.image}),(0,u.jsx)("meta",{property:"og:site_name",content:t.title}),(0,u.jsx)("meta",{property:"twitter:card",content:"summary_large_image"}),(0,u.jsx)("meta",{property:"twitter:url",content:t.url}),(0,u.jsx)("meta",{property:"twitter:title",content:t.title}),(0,u.jsx)("meta",{property:"twitter:description",content:t.description}),(0,u.jsx)("meta",{property:"twitter:image",content:t.image}),(0,u.jsx)("meta",{name:"robots",content:"Index"}),(0,u.jsx)("link",{rel:"manifest",href:"/manifest.json"}),(0,u.jsx)("link",{rel:"apple-touch-icon",sizes:"120x120",href:"./favicon.png"}),(0,u.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"./favicon.png"}),(0,u.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"./favicon.png"})]})}s.prototype={data:a().shape({title:a().string.isRequired,description:a().string,image:a().string,url:a().string,keywords:a().arrayOf(a().string)}).isRequired};var l=s,c=(0,r.default)((function(){return Promise.all([n.e(351),n.e(317),n.e(590)]).then(n.bind(n,1590))}),{loadableGenerated:{webpack:function(){return[1590]},modules:["index.js -> ../components/Navigation"]}}),d=(0,r.default)((function(){return Promise.all([n.e(296),n.e(351),n.e(185)]).then(n.bind(n,3185))}),{loadableGenerated:{webpack:function(){return[3185]},modules:["index.js -> ../containers/Greetings"]}}),f=(0,r.default)((function(){return Promise.all([n.e(296),n.e(351),n.e(317),n.e(746),n.e(688)]).then(n.bind(n,5688))}),{loadableGenerated:{webpack:function(){return[5688]},modules:["index.js -> ../containers/Skills"]}}),p=(0,r.default)((function(){return Promise.all([n.e(296),n.e(351),n.e(338)]).then(n.bind(n,7338))}),{loadableGenerated:{webpack:function(){return[7338]},modules:["index.js -> ../containers/Proficiency"]}}),m=(0,r.default)((function(){return Promise.all([n.e(351),n.e(871)]).then(n.bind(n,2893))}),{loadableGenerated:{webpack:function(){return[2893]},modules:["index.js -> ../containers/Education"]}}),b=(0,r.default)((function(){return Promise.all([n.e(351),n.e(675),n.e(39),n.e(974)]).then(n.bind(n,3974))}),{loadableGenerated:{webpack:function(){return[3974]},modules:["index.js -> ../containers/Experience"]}}),y=(0,r.default)((function(){return Promise.all([n.e(351),n.e(829)]).then(n.bind(n,4829))}),{loadableGenerated:{webpack:function(){return[4829]},modules:["index.js -> ../containers/Projects"]}}),h=(0,r.default)((function(){return Promise.all([n.e(351),n.e(519)]).then(n.bind(n,3519))}),{loadableGenerated:{webpack:function(){return[3519]},modules:["index.js -> ../containers/Feedbacks"]}}),j=(0,r.default)((function(){return Promise.all([n.e(351),n.e(675),n.e(551)]).then(n.bind(n,9551))}),{loadableGenerated:{webpack:function(){return[9551]},modules:["index.js -> ../components/GithubProfileCard"]}}),v=!0;function g(e){var t=e.githubProfileData;return(0,u.jsxs)("div",{children:[(0,u.jsx)(l,{data:{title:"Vishal Rana",description:"A passionate Full Stack Web Developer and Mobile App Developer.",image:"https://avatars3.githubusercontent.com/u/59178380?v=4",url:"https://developer-portfolio-1Vishal100.vercel.app",keywords:["Vishal","Vishal Rana","@1Vishal100","1Vishal100","Portfolio","Vishal Portfolio ","Vishal Rana Portfolio","web developer","full stack","full stack web developer","mobile app developer","android developer","django","flask","django rest framework","nodejs ","expressjs","reactjs ","contextapi","redux","flutter"]}}),(0,u.jsx)(c,{}),(0,u.jsx)(d,{}),(0,u.jsx)(f,{}),(0,u.jsx)(p,{}),(0,u.jsx)(m,{}),(0,u.jsx)(b,{}),(0,u.jsx)(h,{}),(0,u.jsx)(y,{}),(0,u.jsx)(j,{prof:t})]})}g.prototype={githubProfileData:a().object.isRequired}},8581:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(4918)}])},5152:function(e,t,n){e.exports=n(8771)},9008:function(e,t,n){e.exports=n(639)}},function(e){e.O(0,[774,888,179],(function(){return t=8581,e(e.s=t);var t}));var t=e.O();_N_E=t}]);