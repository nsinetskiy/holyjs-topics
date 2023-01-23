try{self["workbox:core:6.5.3"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:6.5.3"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=s(e)}}class r extends n{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class i{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let a=i&&i.handler;const o=e.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:e,event:t,params:r})}catch(e){c=Promise.reject(e)}const f=i&&i.catchHandler;return c instanceof Promise&&(this.o||f)&&(c=c.catch((async n=>{if(f)try{return await f.handle({url:s,request:e,event:t,params:r})}catch(e){e instanceof Error&&(n=e)}if(this.o)return this.o.handle({url:s,request:e,event:t});throw n}))),c}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const r=this.t.get(s.method)||[];for(const i of r){let r;const a=i.match({url:e,sameOrigin:t,request:s,event:n});if(a)return r=a,(Array.isArray(r)&&0===r.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(r=void 0),{route:i,params:r}}return{}}setDefaultHandler(e,t="GET"){this.i.set(t,s(e))}setCatchHandler(e){this.o=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let a;const o=()=>(a||(a=new i,a.addFetchListener(),a.addCacheListener()),a);function c(e,s,i){let a;if("string"==typeof e){const t=new URL(e,location.href);a=new n((({url:e})=>e.href===t.href),s,i)}else if(e instanceof RegExp)a=new r(e,s,i);else if("function"==typeof e)a=new n(e,s,i);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return o().registerRoute(a),a}try{self["workbox:strategies:6.5.3"]&&_()}catch(e){}const f={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null},l={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},h=e=>[l.prefix,e,l.suffix].filter((e=>e&&e.length>0)).join("-"),u=e=>{(e=>{for(const t of Object.keys(l))e(t)})((t=>{"string"==typeof e[t]&&(l[t]=e[t])}))},d=e=>e||h(l.precache),w=e=>e||h(l.runtime);function b(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const v=new Set;function g(e){return"string"==typeof e?new Request(e):e}class y{constructor(e,t){this.l={},Object.assign(this,t),this.event=t.event,this.h=e,this.u=new p,this.p=[],this.v=[...e.plugins],this.g=new Map;for(const e of this.v)this.g.set(e,{});this.event.waitUntil(this.u.promise)}async fetch(e){const{event:s}=this;let n=g(e);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this.h.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw r&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:r.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=g(e);let s;const{cacheName:n,matchOptions:r}=this.h,i=await this.getCacheKey(t,"read"),a=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(i,a);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:r,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const n=g(e);var r;await(r=0,new Promise((e=>setTimeout(e,r))));const i=await this.getCacheKey(n,"write");if(!s)throw new t("cache-put-with-no-response",{url:(a=i.url,new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var a;const o=await this.m(s);if(!o)return!1;const{cacheName:c,matchOptions:f}=this.h,l=await self.caches.open(c),h=this.hasCallback("cacheDidUpdate"),u=h?await async function(e,t,s,n){const r=b(t.url,s);if(t.url===r)return e.match(t,n);const i=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await e.keys(t,i);for(const t of a)if(r===b(t.url,s))return e.match(t,n)}(l,i.clone(),["__WB_REVISION__"],f):null;try{await l.put(i,h?o.clone():o)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of v)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:u,newResponse:o.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this.l[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=g(await e({mode:t,request:n,event:this.event,params:this.params}));this.l[s]=n}return this.l[s]}hasCallback(e){for(const t of this.h.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this.h.plugins)if("function"==typeof t[e]){const s=this.g.get(t),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return t[e](r)};yield n}}waitUntil(e){return this.p.push(e),e}async doneWaiting(){let e;for(;e=this.p.shift();)await e}destroy(){this.u.resolve(null)}async m(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class m{constructor(e={}){this.cacheName=w(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,r=new y(this,{event:t,request:s,params:n}),i=this.I(r,s,t);return[i,this.R(i,r,s,t)]}async I(e,s,n){let r;await e.runCallbacks("handlerWillStart",{event:n,request:s});try{if(r=await this.q(s,e),!r||"error"===r.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(r=await i({error:t,event:n,request:s}),r)break;if(!r)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))r=await t({event:n,request:s,response:r});return r}async R(e,t,s,n){let r,i;try{r=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:i}),t.destroy(),i)throw i}}function I(e,t){const s=t();return e.waitUntil(s),s}try{self["workbox:precaching:6.5.3"]&&_()}catch(e){}function R(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const r=new URL(n,location.href),i=new URL(n,location.href);return r.searchParams.set("__WB_REVISION__",s),{cacheKey:r.href,url:i.href}}class q{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class U{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this.U.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this.U=e}}let L,E;async function x(e,s){let n=null;if(e.url){n=new URL(e.url).origin}if(n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});const r=e.clone(),i={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},a=s?s(i):i,o=function(){if(void 0===L){const e=new Response("");if("body"in e)try{new Response(e.body),L=!0}catch(e){L=!1}L=!1}return L}()?r.body:await r.blob();return new Response(o,a)}class B extends m{constructor(e={}){e.cacheName=d(e.cacheName),super(e),this.L=!1!==e.fallbackToNetwork,this.plugins.push(B.copyRedirectedCacheableResponsesPlugin)}async q(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._(e,t):await this.B(e,t))}async B(e,s){let n;const r=s.params||{};if(!this.L)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const t=r.integrity,i=e.integrity,a=!i||i===t;n=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?i||t:void 0})),t&&a&&"no-cors"!==e.mode&&(this.C(),await s.cachePut(e,n.clone()))}return n}async _(e,s){this.C();const n=await s.fetch(e);if(!await s.cachePut(e,n.clone()))throw new t("bad-precaching-response",{url:e.url,status:n.status});return n}C(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==B.copyRedirectedCacheableResponsesPlugin&&(n===B.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(B.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}B.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},B.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await x(e):e};class C{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this.O=new Map,this.T=new Map,this.j=new Map,this.h=new B({cacheName:d(e),plugins:[...t,new U({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.h}precache(e){this.addToCacheList(e),this.k||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.k=!0)}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:r}=R(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this.O.has(r)&&this.O.get(r)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.O.get(r),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.j.has(e)&&this.j.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:r});this.j.set(e,n.integrity)}if(this.O.set(r,e),this.T.set(r,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return I(e,(async()=>{const t=new q;this.strategy.plugins.push(t);for(const[t,s]of this.O){const n=this.j.get(s),r=this.T.get(t),i=new Request(t,{integrity:n,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return I(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this.O.values()),n=[];for(const r of t)s.has(r.url)||(await e.delete(r),n.push(r.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.O}getCachedURLs(){return[...this.O.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.O.get(t.href)}getIntegrityForCacheKey(e){return this.j.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}const O=()=>(E||(E=new C),E);class T extends n{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const r of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:r}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const a=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(i,t);if(yield a.href,s&&a.pathname.endsWith("/")){const e=new URL(a.href);e.pathname+=s,yield e.href}if(n){const e=new URL(a.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:i});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(r);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}var j;u({prefix:"EleventyPluginWorkbox"}),self.skipWaiting(),self.addEventListener("activate",(()=>self.clients.claim())),j={directoryIndex:"index.html"},function(e){O().precache(e)}([{url:"/index.html",revision:"eaaf7547a10935ba7c1c540d7b80a9e2"},{url:"/assets/css/prism-okaidia.min.css",revision:"8f13447e86a47622c128ecc3269a022b"},{url:"/assets/css/style.css",revision:"ba50140569f16690216745f7f9d4cdcd"},{url:"/assets/css/tailwind.css",revision:"d9feaa3943969d3581802c4bda2d0bdf"},{url:"/assets/fonts/Inter-Black-subset.woff",revision:"828c16e7f9a1e31dd9b3b9a0fe496bfe"},{url:"/assets/fonts/Inter-Black.woff",revision:"d0b121f3a9d3d88afdfd6902d31ee9a0"},{url:"/assets/fonts/Inter-Black.woff2",revision:"661569afe57a38e1529a775a465da20b"},{url:"/assets/fonts/Inter-BlackItalic.woff",revision:"e3329b2b90e1f9bcafd4a36604215dc1"},{url:"/assets/fonts/Inter-BlackItalic.woff2",revision:"a3cc36c89047d530522fc999a22cce54"},{url:"/assets/fonts/Inter-Bold.woff",revision:"99a0d9a7e4c99c17bfdd94a22a5cf94e"},{url:"/assets/fonts/Inter-Bold.woff2",revision:"444a7284663a3bc886683eb81450b294"},{url:"/assets/fonts/Inter-BoldItalic.woff",revision:"3aa31f7356ea9db132b3b2bd8a65df44"},{url:"/assets/fonts/Inter-BoldItalic.woff2",revision:"96284e2a02af46d9ffa2d189eaad5483"},{url:"/assets/fonts/Inter-ExtraBold.woff",revision:"ab70688a1c9d6525584b123575f6c0a5"},{url:"/assets/fonts/Inter-ExtraBold.woff2",revision:"37da9eecf61ebced804b266b14eef98e"},{url:"/assets/fonts/Inter-ExtraBoldItalic.woff",revision:"728a4c7df3ed1b2bc077010063f9ef1c"},{url:"/assets/fonts/Inter-ExtraBoldItalic.woff2",revision:"fcc7d60ef790b43eb520fdc5c7348799"},{url:"/assets/fonts/Inter-ExtraLight.woff",revision:"dd19efda9c6e88ad83a5b052915899f7"},{url:"/assets/fonts/Inter-ExtraLight.woff2",revision:"b3b2ed6a20c538e9c809f4df5c04ac2a"},{url:"/assets/fonts/Inter-ExtraLightItalic.woff",revision:"a6566ae6fa3c58b48f888d7c9c234d52"},{url:"/assets/fonts/Inter-ExtraLightItalic.woff2",revision:"079cd1e71cd4f73bef86f72deced6d03"},{url:"/assets/fonts/Inter-italic.var.woff2",revision:"1f7ca6383ea7c74a7f5ddd76c3d3cef2"},{url:"/assets/fonts/Inter-Italic.woff",revision:"f137a90d649b6ab032563856df323f40"},{url:"/assets/fonts/Inter-Italic.woff2",revision:"fd26ff23f831db9ae85a805386529385"},{url:"/assets/fonts/Inter-Light.woff",revision:"5d3776eb78374b0ebbce639adadf73d1"},{url:"/assets/fonts/Inter-Light.woff2",revision:"780dd2adb71f18d7a357ab7f65e881d6"},{url:"/assets/fonts/Inter-LightItalic.woff",revision:"d0fa7cbcf9ca5edb6ebe41fd8d49e1fb"},{url:"/assets/fonts/Inter-LightItalic.woff2",revision:"df29c53403b2e13dc56df3e291c32f09"},{url:"/assets/fonts/Inter-Medium.woff",revision:"c0638bea87a05fdfa2bb3bba2efe54e4"},{url:"/assets/fonts/Inter-Medium.woff2",revision:"75db5319e7e87c587019a5df08d7272c"},{url:"/assets/fonts/Inter-MediumItalic.woff",revision:"a1b588627dd12c556a7e3cd81e400ecf"},{url:"/assets/fonts/Inter-MediumItalic.woff2",revision:"f1e11535e56c67698e263673f625103e"},{url:"/assets/fonts/Inter-Regular.woff",revision:"3ac83020fe53b617b79b5e2ad66764af"},{url:"/assets/fonts/Inter-Regular.woff2",revision:"dc131113894217b5031000575d9de002"},{url:"/assets/fonts/Inter-roman.var.woff2",revision:"66c6e40883646a7ad993108b2ce2da32"},{url:"/assets/fonts/Inter-SemiBold.woff",revision:"66a68ffab2bf40553e847e8f025f75be"},{url:"/assets/fonts/Inter-SemiBold.woff2",revision:"007ad31a53f4ab3f58ee74f2308482ce"},{url:"/assets/fonts/Inter-SemiBoldItalic.woff",revision:"6cd13dbd150ac0c7f337a2939a3d50a8"},{url:"/assets/fonts/Inter-SemiBoldItalic.woff2",revision:"3031b683bafcd9ded070c00d784f4626"},{url:"/assets/fonts/Inter-Thin.woff",revision:"b068b7189120a6626e3cfe2a8b917d0f"},{url:"/assets/fonts/Inter-Thin.woff2",revision:"d52e5e38715502616522eb3e9963b69b"},{url:"/assets/fonts/Inter-ThinItalic.woff",revision:"97bec98832c92f799aeebf670b83ff6c"},{url:"/assets/fonts/Inter-ThinItalic.woff2",revision:"a9780071b7f498c1523602910a5ef242"},{url:"/assets/fonts/inter.css",revision:"37a5513f0c676128e6dfc2e7e84a208d"},{url:"/assets/fonts/Inter.var.woff2",revision:"8dd26c3dd0125fb16ce19b8f5e8273fb"},{url:"/assets/img/header.svg",revision:"ab59e5f28d006ab3ac340aa4f52d14e9"},{url:"/assets/img/hero.png",revision:"5c2970d05a094bcb36beef08bde3bc5c"},{url:"/assets/img/holyjs_2023_spring_hero_logo.svg",revision:"c83aef9ed3407f6254115da8eded8a09"},{url:"/assets/img/JavaScript-logo.png",revision:"0cded3a3276425911d55a2552bf361bf"},{url:"/assets/img/posts/JavaScript-logo.png",revision:"0cded3a3276425911d55a2552bf361bf"},{url:"/assets/js/alpine.js",revision:"abb64a8baaae5976882416ce3c4563be"},{url:"/posts/state-of-js/index.html",revision:"45a3fc2861fa1716989701be1650e391"}]),function(e){const t=O();c(new T(t,e))}(j),self.addEventListener("activate",(e=>{const t=d();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e));return await Promise.all(s.map((e=>self.caches.delete(e)))),s})(t).then((e=>{})))})),c((({url:e})=>!new RegExp(`.+\\.(?:${["jpg","png","gif","ico","svg","jpeg","avif","webp","eot","ttf","otf","ttc","woff","woff2"].join("|")})`).test(e)),new class extends m{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(f),this.N=e.networkTimeoutSeconds||0}async q(e,s){const n=[],r=[];let i;if(this.N){const{id:t,promise:a}=this.P({request:e,logs:n,handler:s});i=t,r.push(a)}const a=this.S({timeoutId:i,request:e,logs:n,handler:s});r.push(a);const o=await s.waitUntil((async()=>await s.waitUntil(Promise.race(r))||await a)());if(!o)throw new t("no-response",{url:e.url});return o}P({request:e,logs:t,handler:s}){let n;return{promise:new Promise((t=>{n=setTimeout((async()=>{t(await s.cacheMatch(e))}),1e3*this.N)})),id:n}}async S({timeoutId:e,request:t,logs:s,handler:n}){let r,i;try{i=await n.fetchAndCachePut(t)}catch(e){e instanceof Error&&(r=e)}return e&&clearTimeout(e),!r&&i||(i=await n.cacheMatch(t)),i}},"GET"),c(/.+\.(?:eot|ttf|otf|ttc|woff|woff2|jpg|png|gif|ico|svg|jpeg|avif|webp)$/,new class extends m{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(f)}async q(e,s){const n=s.fetchAndCachePut(e).catch((()=>{}));s.waitUntil(n);let r,i=await s.cacheMatch(e);if(i);else try{i=await n}catch(e){e instanceof Error&&(r=e)}if(!i)throw new t("no-response",{url:e.url,error:r});return i}},"GET");
