function g(e,o=166){let d;function S(...w){const v=()=>{e.apply(this,w)};clearTimeout(d),d=setTimeout(v,o)}return S.clear=()=>{clearTimeout(d)},S}function x(e){return e&&e.ownerDocument||document}function P(e){return x(e).defaultView||window}var t={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a=Symbol.for("react.element"),b=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),f=Symbol.for("react.provider"),i=Symbol.for("react.context"),C=Symbol.for("react.server_context"),s=Symbol.for("react.forward_ref"),l=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),y=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),M=Symbol.for("react.offscreen"),$;$=Symbol.for("react.module.reference");function r(e){if(typeof e=="object"&&e!==null){var o=e.$$typeof;switch(o){case a:switch(e=e.type,e){case n:case u:case c:case l:case m:return e;default:switch(e=e&&e.$$typeof,e){case C:case i:case s:case p:case y:case f:return e;default:return o}}case b:return o}}}t.ContextConsumer=i;t.ContextProvider=f;t.Element=a;t.ForwardRef=s;t.Fragment=n;t.Lazy=p;t.Memo=y;t.Portal=b;t.Profiler=u;t.StrictMode=c;t.Suspense=l;t.SuspenseList=m;t.isAsyncMode=function(){return!1};t.isConcurrentMode=function(){return!1};t.isContextConsumer=function(e){return r(e)===i};t.isContextProvider=function(e){return r(e)===f};t.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===a};t.isForwardRef=function(e){return r(e)===s};t.isFragment=function(e){return r(e)===n};t.isLazy=function(e){return r(e)===p};t.isMemo=function(e){return r(e)===y};t.isPortal=function(e){return r(e)===b};t.isProfiler=function(e){return r(e)===u};t.isStrictMode=function(e){return r(e)===c};t.isSuspense=function(e){return r(e)===l};t.isSuspenseList=function(e){return r(e)===m};t.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===n||e===u||e===c||e===l||e===m||e===M||typeof e=="object"&&e!==null&&(e.$$typeof===p||e.$$typeof===y||e.$$typeof===f||e.$$typeof===i||e.$$typeof===s||e.$$typeof===$||e.getModuleId!==void 0)};t.typeOf=r;export{P as a,g as d,x as o};