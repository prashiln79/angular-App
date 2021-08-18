(self.webpackChunkExpenses=self.webpackChunkExpenses||[]).push([[286],{77125:function($t,Et,E){$t.exports=function(Y){"use strict";function ot(s){return s&&"object"==typeof s&&"default"in s?s:{default:s}}var F=ot(Y),r=F.default.helpers,dt=function(){if("undefined"!=typeof window){if(window.devicePixelRatio)return window.devicePixelRatio;var s=window.screen;if(s)return(s.deviceXDPI||1)/(s.logicalXDPI||1)}return 1}(),j={toTextLines:function(t){var e,n=[];for(t=[].concat(t);t.length;)"string"==typeof(e=t.pop())?n.unshift.apply(n,e.split("\n")):Array.isArray(e)?t.push.apply(t,e):r.isNullOrUndef(t)||n.unshift(""+e);return n},toFontString:function(t){return!t||r.isNullOrUndef(t.size)||r.isNullOrUndef(t.family)?null:(t.style?t.style+" ":"")+(t.weight?t.weight+" ":"")+t.size+"px "+t.family},textSize:function(t,n,e){var v,a=[].concat(n),o=a.length,l=t.font,d=0;for(t.font=e.string,v=0;v<o;++v)d=Math.max(t.measureText(a[v]).width,d);return t.font=l,{height:o*e.lineHeight,width:d}},parseFont:function(t){var n=F.default.defaults.global,e=r.valueOrDefault(t.size,n.defaultFontSize),a={family:r.valueOrDefault(t.family,n.defaultFontFamily),lineHeight:r.options.toLineHeight(t.lineHeight,e),size:e,style:r.valueOrDefault(t.style,n.defaultFontStyle),weight:r.valueOrDefault(t.weight,null),string:""};return a.string=j.toFontString(a),a},bound:function(t,n,e){return Math.max(t,Math.min(n,e))},arrayDiff:function(t,n){var o,l,d,v,e=t.slice(),a=[];for(o=0,d=n.length;o<d;++o)-1===(l=e.indexOf(v=n[o]))?a.push([v,1]):e.splice(l,1);for(o=0,d=e.length;o<d;++o)a.push([e[o],-1]);return a},rasterize:function(t){return Math.round(t*dt)/dt}};function st(s,t){var n=t.x,e=t.y;if(null===n)return{x:0,y:-1};if(null===e)return{x:1,y:0};var a=s.x-n,o=s.y-e,l=Math.sqrt(a*a+o*o);return{x:l?a/l:0,y:l?o/l:-1}}function P(s,t,n){var e=0;return s<n.left?e|=1:s>n.right&&(e|=2),t<n.top?e|=8:t>n.bottom&&(e|=4),e}function V(s,t){var a,o,n=t.anchor,e=s;return t.clamp&&(e=function(s,t){for(var v,C,S,n=s.x0,e=s.y0,a=s.x1,o=s.y1,l=P(n,e,t),d=P(a,o,t);l|d&&!(l&d);)8&(v=l||d)?(C=n+(a-n)*(t.top-e)/(o-e),S=t.top):4&v?(C=n+(a-n)*(t.bottom-e)/(o-e),S=t.bottom):2&v?(S=e+(o-e)*(t.right-n)/(a-n),C=t.right):1&v&&(S=e+(o-e)*(t.left-n)/(a-n),C=t.left),v===l?l=P(n=C,e=S,t):d=P(a=C,o=S,t);return{x0:n,x1:a,y0:e,y1:o}}(e,t.area)),"start"===n?(a=e.x0,o=e.y0):"end"===n?(a=e.x1,o=e.y1):(a=(e.x0+e.x1)/2,o=(e.y0+e.y1)/2),function(s,t,n,e,a){switch(a){case"center":n=e=0;break;case"bottom":n=0,e=1;break;case"right":n=1,e=0;break;case"left":n=-1,e=0;break;case"top":n=0,e=-1;break;case"start":n=-n,e=-e;break;case"end":break;default:a*=Math.PI/180,n=Math.cos(a),e=Math.sin(a)}return{x:s,y:t,vx:n,vy:e}}(a,o,s.vx,s.vy,t.align)}var tt={arc:function(t,n){var e=(t.startAngle+t.endAngle)/2,a=Math.cos(e),o=Math.sin(e),l=t.innerRadius,d=t.outerRadius;return V({x0:t.x+a*l,y0:t.y+o*l,x1:t.x+a*d,y1:t.y+o*d,vx:a,vy:o},n)},point:function(t,n){var e=st(t,n.origin),a=e.x*t.radius,o=e.y*t.radius;return V({x0:t.x-a,y0:t.y-o,x1:t.x+a,y1:t.y+o,vx:e.x,vy:e.y},n)},rect:function(t,n){var e=st(t,n.origin),a=t.x,o=t.y,l=0,d=0;return t.horizontal?(a=Math.min(t.x,t.base),l=Math.abs(t.base-t.x)):(o=Math.min(t.y,t.base),d=Math.abs(t.base-t.y)),V({x0:a,y0:o+d,x1:a+l,y1:o,vx:e.x,vy:e.y},n)},fallback:function(t,n){var e=st(t,n.origin);return V({x0:t.x,y0:t.y,x1:t.x,y1:t.y,vx:e.x,vy:e.y},n)}},$=F.default.helpers,R=j.rasterize;function Nt(s){var t=s._model.horizontal,n=s._scale||t&&s._xScale||s._yScale;if(!n)return null;if(void 0!==n.xCenter&&void 0!==n.yCenter)return{x:n.xCenter,y:n.yCenter};var e=n.getBasePixel();return t?{x:e,y:null}:{x:null,y:e}}function Bt(s,t,n){var e=s.shadowBlur,a=n.stroked,o=R(n.x),l=R(n.y),d=R(n.w);a&&s.strokeText(t,o,l,d),n.filled&&(e&&a&&(s.shadowBlur=0),s.fillText(t,o,l,d),e&&a&&(s.shadowBlur=e))}var ht=function(t,n,e,a){var o=this;o._config=t,o._index=a,o._model=null,o._rects=null,o._ctx=n,o._el=e};$.extend(ht.prototype,{_modelize:function(t,n,e,a){var s,o=this,l=o._index,d=$.options.resolve,v=j.parseFont(d([e.font,{}],a,l)),C=d([e.color,F.default.defaults.global.defaultFontColor],a,l);return{align:d([e.align,"center"],a,l),anchor:d([e.anchor,"center"],a,l),area:a.chart.chartArea,backgroundColor:d([e.backgroundColor,null],a,l),borderColor:d([e.borderColor,null],a,l),borderRadius:d([e.borderRadius,0],a,l),borderWidth:d([e.borderWidth,0],a,l),clamp:d([e.clamp,!1],a,l),clip:d([e.clip,!1],a,l),color:C,display:t,font:v,lines:n,offset:d([e.offset,0],a,l),opacity:d([e.opacity,1],a,l),origin:Nt(o._el),padding:$.options.toPadding(d([e.padding,0],a,l)),positioner:(s=o._el,s instanceof F.default.elements.Arc?tt.arc:s instanceof F.default.elements.Point?tt.point:s instanceof F.default.elements.Rectangle?tt.rect:tt.fallback),rotation:d([e.rotation,0],a,l)*(Math.PI/180),size:j.textSize(o._ctx,n,v),textAlign:d([e.textAlign,"start"],a,l),textShadowBlur:d([e.textShadowBlur,0],a,l),textShadowColor:d([e.textShadowColor,C],a,l),textStrokeColor:d([e.textStrokeColor,C],a,l),textStrokeWidth:d([e.textStrokeWidth,0],a,l)}},update:function(t){var d,v,C,n=this,e=null,a=null,o=n._index,l=n._config,S=$.options.resolve([l.display,!0],t,o);S&&(v=$.valueOrDefault($.callback(l.formatter,[d=t.dataset.data[o],t]),d),(C=$.isNullOrUndef(v)?[]:j.toTextLines(v)).length&&(a=function(s){var t=s.borderWidth||0,n=s.padding,e=s.size.height,a=s.size.width,o=-a/2,l=-e/2;return{frame:{x:o-n.left-t,y:l-n.top-t,w:a+n.width+2*t,h:e+n.height+2*t},text:{x:o,y:l,w:a,h:e}}}(e=n._modelize(S,C,l,t)))),n._model=e,n._rects=a},geometry:function(){return this._rects?this._rects.frame:{}},rotation:function(){return this._model?this._model.rotation:0},visible:function(){return this._model&&this._model.opacity},model:function(){return this._model},draw:function(t,n){var d,a=t.ctx,o=this._model,l=this._rects;!this.visible()||(a.save(),o.clip&&(d=o.area,a.beginPath(),a.rect(d.left,d.top,d.right-d.left,d.bottom-d.top),a.clip()),a.globalAlpha=j.bound(0,o.opacity,1),a.translate(R(n.x),R(n.y)),a.rotate(o.rotation),function(s,t,n){var e=n.backgroundColor,a=n.borderColor,o=n.borderWidth;!e&&(!a||!o)||(s.beginPath(),$.canvas.roundedRect(s,R(t.x)+o/2,R(t.y)+o/2,R(t.w)-o,R(t.h)-o,n.borderRadius),s.closePath(),e&&(s.fillStyle=e,s.fill()),a&&o&&(s.strokeStyle=a,s.lineWidth=o,s.lineJoin="miter",s.stroke()))}(a,l.frame,o),function(s,t,n,e){var N,a=e.textAlign,o=e.color,l=!!o,d=e.font,v=t.length,C=e.textStrokeColor,S=e.textStrokeWidth,k=C&&S;if(v&&(l||k))for(n=function(s,t,n){var e=n.lineHeight,a=s.w,o=s.x;return"center"===t?o+=a/2:("end"===t||"right"===t)&&(o+=a),{h:e,w:a,x:o,y:s.y+e/2}}(n,a,d),s.font=d.string,s.textAlign=a,s.textBaseline="middle",s.shadowBlur=e.textShadowBlur,s.shadowColor=e.textShadowColor,l&&(s.fillStyle=o),k&&(s.lineJoin="round",s.lineWidth=S,s.strokeStyle=C),N=0,v=t.length;N<v;++N)Bt(s,t[N],{stroked:k,filled:l,w:n.w,x:n.x,y:n.y+n.h*N})}(a,o.lines,l.text,o),a.restore())}});var Yt=Number.MIN_SAFE_INTEGER||-9007199254740991,q=Number.MAX_SAFE_INTEGER||9007199254740991;function K(s,t,n){var e=Math.cos(n),a=Math.sin(n),o=t.x,l=t.y;return{x:o+e*(s.x-o)-a*(s.y-l),y:l+a*(s.x-o)+e*(s.y-l)}}function yt(s,t){var o,l,C,n=q,e=Yt,a=t.origin;for(o=0;o<s.length;++o)C=t.vx*((l=s[o]).x-a.x)+t.vy*(l.y-a.y),n=Math.min(n,C),e=Math.max(e,C);return{min:n,max:e}}function et(s,t){var n=t.x-s.x,e=t.y-s.y,a=Math.sqrt(n*n+e*e);return{vx:(t.x-s.x)/a,vy:(t.y-s.y)/a,origin:s,ln:a}}var mt=function(){this._rotation=0,this._rect={x:0,y:0,w:0,h:0}};function gt(s,t,n){var e=t.positioner(s,t),a=e.vx,o=e.vy;if(!a&&!o)return{x:e.x,y:e.y};var l=n.w,d=n.h,v=t.rotation,C=Math.abs(l/2*Math.cos(v))+Math.abs(d/2*Math.sin(v)),S=Math.abs(l/2*Math.sin(v))+Math.abs(d/2*Math.cos(v)),k=1/Math.max(Math.abs(a),Math.abs(o));return C*=a*k,S*=o*k,{x:e.x+(C+=t.offset*a),y:e.y+(S+=t.offset*o)}}F.default.helpers.extend(mt.prototype,{center:function(){var t=this._rect;return{x:t.x+t.w/2,y:t.y+t.h/2}},update:function(t,n,e){this._rotation=e,this._rect={x:n.x+t.x,y:n.y+t.y,w:n.w,h:n.h}},contains:function(t){var n=this,a=n._rect;return!((t=K(t,n.center(),-n._rotation)).x<a.x-1||t.y<a.y-1||t.x>a.x+a.w+2||t.y>a.y+a.h+2)},intersects:function(t){var o,l,d,n=this._points(),e=t._points(),a=[et(n[0],n[1]),et(n[0],n[3])];for(this._rotation!==t._rotation&&a.push(et(e[0],e[1]),et(e[0],e[3])),o=0;o<a.length;++o)if(l=yt(n,a[o]),d=yt(e,a[o]),l.max<d.min||d.max<l.min)return!1;return!0},_points:function(){var t=this,n=t._rect,e=t._rotation,a=t.center();return[K({x:n.x,y:n.y},a,e),K({x:n.x+n.w,y:n.y},a,e),K({x:n.x+n.w,y:n.y+n.h},a,e),K({x:n.x,y:n.y+n.h},a,e)]}});var W={prepare:function(t){var e,a,o,l,d,n=[];for(e=0,o=t.length;e<o;++e)for(a=0,l=t[e].length;a<l;++a)n.push(d=t[e][a]),d.$layout={_box:new mt,_hidable:!1,_visible:!0,_set:e,_idx:a};return n.sort(function(v,C){var S=v.$layout,k=C.$layout;return S._idx===k._idx?k._set-S._set:k._idx-S._idx}),this.update(n),n},update:function(t){var e,a,o,l,d,n=!1;for(e=0,a=t.length;e<a;++e)l=(o=t[e]).model(),(d=o.$layout)._hidable=l&&"auto"===l.display,d._visible=o.visible(),n|=d._hidable;n&&function(s){var t,n,e,a,o,l;for(t=0,n=s.length;t<n;++t)(a=(e=s[t]).$layout)._visible&&(o=e.geometry(),l=gt(e._el._model,e.model(),o),a._box.update(l,o,e.rotation()));(function(s,t){var n,e,a,o;for(n=s.length-1;n>=0;--n)for(a=s[n].$layout,e=n-1;e>=0&&a._visible;--e)(o=s[e].$layout)._visible&&a._box.intersects(o._box)&&t(a,o)})(s,function(d,v){var C=d._hidable,S=v._hidable;C&&S||S?v._visible=!1:C&&(d._visible=!1)})}(t)},lookup:function(t,n){var e,a;for(e=t.length-1;e>=0;--e)if((a=t[e].$layout)&&a._visible&&a._box.contains(n))return t[e];return null},draw:function(t,n){var e,a,o,l,d,v;for(e=0,a=n.length;e<a;++e)(l=(o=n[e]).$layout)._visible&&(d=o.geometry(),v=gt(o._el._view,o.model(),d),l._box.update(v,d,o.rotation()),o.draw(t,v))}},z=F.default.helpers,J=F.default.helpers,I="$datalabels",ct="$default";function nt(s,t,n){if(t){var o,e=n.$context,a=n.$groups;!t[a._set]||(o=t[a._set][a._key])&&!0===J.callback(o,[e])&&(s[I]._dirty=!0,n.update(e))}}function G(s,t){var a,o,n=s[I],e=n._listeners;if(e.enter||e.leave){if("mousemove"===t.type)o=W.lookup(n._labels,t);else if("mouseout"!==t.type)return;a=n._hovered,n._hovered=o,function(s,t,n,e){var a,o;!n&&!e||(n?e?n!==e&&(o=a=!0):o=!0:a=!0,o&&nt(s,t.leave,n),a&&nt(s,t.enter,e))}(s,e,a,o)}}return F.default.defaults.global.plugins.datalabels={align:"center",anchor:"center",backgroundColor:null,borderColor:null,borderRadius:0,borderWidth:0,clamp:!1,clip:!1,color:void 0,display:!0,font:{family:void 0,lineHeight:1.2,size:void 0,style:void 0,weight:null},formatter:function(t){if(z.isNullOrUndef(t))return null;var e,a,o,n=t;if(z.isObject(t))if(z.isNullOrUndef(t.label))if(z.isNullOrUndef(t.r))for(n="",o=0,a=(e=Object.keys(t)).length;o<a;++o)n+=(0!==o?", ":"")+e[o]+": "+t[e[o]];else n=t.r;else n=t.label;return""+n},labels:void 0,listeners:{},offset:4,opacity:1,padding:{top:4,right:4,bottom:4,left:4},rotation:0,textAlign:"start",textStrokeColor:void 0,textStrokeWidth:0,textShadowBlur:0,textShadowColor:void 0},{id:"datalabels",beforeInit:function(t){t[I]={_actives:[]}},beforeUpdate:function(t){var n=t[I];n._listened=!1,n._listeners={},n._datasets=[],n._labels=[]},afterDatasetUpdate:function(t,n,e){var N,at,Ot,Mt,ut,i,c,u,a=n.index,o=t[I],l=o._datasets[a]=[],d=t.isDatasetVisible(a),v=t.data.datasets[a],C=function(s,t){var o,l,n=s.datalabels,e={},a=[];return!1===n?null:(!0===n&&(n={}),t=J.merge({},[t,n]),o=t.labels||{},l=Object.keys(o),delete t.labels,l.length?l.forEach(function(d){o[d]&&a.push(J.merge({},[t,o[d],{_key:d}]))}):a.push(t),e=a.reduce(function(d,v){return J.each(v.listeners||{},function(C,S){d[S]=d[S]||{},d[S][v._key||ct]=C}),delete v.listeners,d},{}),{labels:a,listeners:e})}(v,e),S=n.meta.data||[],k=t.ctx;for(k.save(),N=0,Ot=S.length;N<Ot;++N)if((c=S[N])[I]=[],d&&c&&!c.hidden&&!c._model.skip)for(at=0,Mt=C.labels.length;at<Mt;++at)i=(ut=C.labels[at])._key,(u=new ht(ut,k,c,N)).$groups={_set:a,_key:i||ct},u.$context={active:!1,chart:t,dataIndex:N,dataset:v,datasetIndex:a},u.update(u.$context),c[I].push(u),l.push(u);k.restore(),J.merge(o._listeners,C.listeners,{merger:function(M,O,T){O[M]=O[M]||{},O[M][n.index]=T[M],o._listened=!0}})},afterUpdate:function(t,n){t[I]._labels=W.prepare(t[I]._datasets,n)},afterDatasetsDraw:function(t){W.draw(t,t[I]._labels)},beforeEvent:function(t,n){if(t[I]._listened)switch(n.type){case"mousemove":case"mouseout":G(t,n);break;case"click":!function(s,t){var n=s[I],e=n._listeners.click,a=e&&W.lookup(n._labels,t);a&&nt(s,e,a)}(t,n)}},afterEvent:function(t){var l,d,v,C,S,k,N,n=t[I],e=n._actives,a=n._actives=t.lastActive||[],o=j.arrayDiff(e,a);for(l=0,d=o.length;l<d;++l)if((S=o[l])[1])for(v=0,C=(N=S[0][I]||[]).length;v<C;++v)(k=N[v]).$context.active=1===S[1],k.update(k.$context);(n._dirty||o.length)&&(W.update(n._labels),function(s){if(!s.animating){for(var t=F.default.animationService.animations,n=0,e=t.length;n<e;++n)if(t[n].chart===s)return;s.render({duration:1,lazy:!0})}}(t)),delete n._dirty}}}(E(72075))},21286:function($t,Et,E){"use strict";E.r(Et),E.d(Et,{ContactsModule:function(){return ut}});var Y=E(61116),ot=E(84932),F=E(70992),r=E(60091),dt=function(){function i(){}return i.\u0275fac=function(u){return new(u||i)},i.\u0275cmp=r.Xpm({type:i,selectors:[["app-contacts"]],decls:1,vars:0,template:function(u,h){1&u&&r._UZ(0,"router-outlet")},directives:[F.lC],encapsulation:2,changeDetection:0}),i}(),j=E(96054),st=E(51558),b=E(51671);function ft(){return{getInitialState:function(){var c=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign({ids:[],entities:{}},c)}}}function pt(){return{getSelectors:function(c){var u=function(B){return B.ids},h=function(B){return B.entities},M=(0,b.P1)(u,h,function(T,B){return T.map(function(X){return B[X]})}),O=(0,b.P1)(u,function(T){return T.length});return c?{selectIds:(0,b.P1)(c,u),selectEntities:(0,b.P1)(c,h),selectAll:(0,b.P1)(c,M),selectTotal:(0,b.P1)(c,O)}:{selectIds:u,selectEntities:h,selectAll:M,selectTotal:O}}}}var g=function(i){return i[i.EntitiesOnly=0]="EntitiesOnly",i[i.Both=1]="Both",i[i.None=2]="None",i}({});function A(i){return function(u,h){var M={ids:(0,st.Z)(h.ids),entities:Object.assign({},h.entities)},O=i(u,M);return O===g.Both?Object.assign({},h,M):O===g.EntitiesOnly?Object.assign(Object.assign({},h),{entities:M.entities}):h}}function P(i,c){var u=c(i);return(0,r.X6Q)()&&void 0===u&&console.warn("@ngrx/entity: The entity passed to the `selectId` implementation returned undefined.","You should probably provide your own `selectId` implementation.","The entity that was passed:",i,"The `selectId` implementation:",c.toString()),u}function vt(i){function c(x,y){var w=P(x,i);return w in y.entities?g.None:(y.ids.push(w),y.entities[w]=x,g.Both)}function u(x,y){var f,w=!1,p=(0,j.Z)(x);try{for(p.s();!(f=p.n()).done;)w=c(f.value,y)!==g.None||w}catch(_){p.e(_)}finally{p.f()}return w?g.Both:g.None}function M(x,y){var w=P(x,i);return w in y.entities?(y.entities[w]=x,g.EntitiesOnly):(y.ids.push(w),y.entities[w]=x,g.Both)}function B(x,y){var p=(x instanceof Array?x:y.ids.filter(function(f){return x(y.entities[f])})).filter(function(f){return f in y.entities}).map(function(f){return delete y.entities[f]}).length>0;return p&&(y.ids=y.ids.filter(function(f){return f in y.entities})),p?g.Both:g.None}function At(x,y){return Q([x],y)}function Q(x,y){var w={};return(x=x.filter(function(m){return m.id in y.entities})).length>0?x.filter(function(m){return function(x,y,w){var f=Object.assign({},w.entities[y.id],y.changes),m=P(f,i),_=m!==y.id;return _&&(x[y.id]=m,delete w.entities[y.id]),w.entities[m]=f,_}(w,m,y)}).length>0?(y.ids=y.ids.map(function(m){return w[m]||m}),g.Both):g.EntitiesOnly:g.None}function Tt(x,y){var m,w=[],p=[],f=(0,j.Z)(x);try{for(f.s();!(m=f.n()).done;){var _=m.value,Z=P(_,i);Z in y.entities?p.push({id:Z,changes:_}):w.push(_)}}catch(H){f.e(H)}finally{f.f()}var D=Q(p,y),U=u(w,y);switch(!0){case U===g.None&&D===g.None:return g.None;case U===g.Both||D===g.Both:return g.Both;default:return g.EntitiesOnly}}return{removeAll:function(x){return Object.assign({},x,{ids:[],entities:{}})},addOne:A(c),addMany:A(u),setAll:A(function(x,y){return y.ids=[],y.entities={},u(x,y),g.Both}),setOne:A(M),setMany:A(function(x,y){var w=x.map(function(p){return M(p,y)});switch(!0){case w.some(function(p){return p===g.Both}):return g.Both;case w.some(function(p){return p===g.EntitiesOnly}):return g.EntitiesOnly;default:return g.None}}),updateOne:A(At),updateMany:A(Q),upsertOne:A(function(x,y){return Tt([x],y)}),upsertMany:A(Tt),removeOne:A(function(x,y){return B([x],y)}),removeMany:A(B),map:A(function(x,y){return Q(y.ids.reduce(function(f,m){var _=x(y.entities[m]);return _!==y.entities[m]&&f.push({id:m,changes:_}),f},[]).filter(function(f){return f.id in y.entities}),y)}),mapOne:A(function(x,y){var p=x.id,f=y.entities[p];return f?At({id:p,changes:(0,x.map)(f)},y):g.None})}}function V(i,c){var u=vt(i);function T(p,f){return B([p],f)}function B(p,f){var m=p.filter(function(_){return!(P(_,i)in f.entities)});return 0===m.length?g.None:(w(m,f),g.Both)}function wt(p,f){var m=P(p,i);return m in f.entities?(f.ids=f.ids.filter(function(_){return _!==m}),w([p],f),g.Both):T(p,f)}function Q(p,f){return it([p],f)}function it(p,f){var m=[],_=p.filter(function(U){return function(p,f,m){if(!(f.id in m.entities))return!1;var Z=Object.assign({},m.entities[f.id],f.changes),D=P(Z,i);return delete m.entities[f.id],p.push(Z),D!==f.id}(m,U,f)}).length>0;if(0===m.length)return g.None;var Z=f.ids,D=[];return f.ids=f.ids.filter(function(U,H){return U in f.entities||(D.push(H),!1)}),w(m,f),!_&&D.every(function(U){return f.ids[U]===Z[U]})?g.EntitiesOnly:g.Both}function y(p,f){var D,m=[],_=[],Z=(0,j.Z)(p);try{for(Z.s();!(D=Z.n()).done;){var U=D.value,H=P(U,i);H in f.entities?_.push({id:H,changes:U}):m.push(U)}}catch(qt){Z.e(qt)}finally{Z.f()}var Zt=it(_,f),lt=B(m,f);switch(!0){case lt===g.None&&Zt===g.None:return g.None;case lt===g.Both||Zt===g.Both:return g.Both;default:return g.EntitiesOnly}}function w(p,f){p.sort(c);for(var m=[],_=0,Z=0;_<p.length&&Z<f.ids.length;){var D=p[_],U=P(D,i),H=f.ids[Z];c(D,f.entities[H])<=0?(m.push(U),_++):(m.push(H),Z++)}f.ids=m.concat(_<p.length?p.slice(_).map(i):f.ids.slice(Z)),p.forEach(function(lt,qt){f.entities[i(lt)]=lt})}return{removeOne:u.removeOne,removeMany:u.removeMany,removeAll:u.removeAll,addOne:A(T),updateOne:A(Q),upsertOne:A(function(p,f){return y([p],f)}),setAll:A(function(p,f){return f.entities={},f.ids=[],B(p,f),g.Both}),setOne:A(wt),setMany:A(function(p,f){var m=p.map(function(_){return wt(_,f)});switch(!0){case m.some(function(_){return _===g.Both}):return g.Both;case m.some(function(_){return _===g.EntitiesOnly}):return g.EntitiesOnly;default:return g.None}}),addMany:A(B),updateMany:A(it),upsertMany:A(y),map:A(function(p,f){return it(f.ids.reduce(function(_,Z){var D=p(f.entities[Z]);return D!==f.entities[Z]&&_.push({id:Z,changes:D}),_},[]),f)}),mapOne:A(function(p,f){var _=p.id,Z=f.entities[_];return Z?Q({id:_,changes:(0,p.map)(Z)},f):g.None})}}(0,b.PH)("[Contacts] Load SpreadSheet");var kt=(0,b.PH)("[Contacts] Load",(0,b.Ky)()),Nt=(0,b.PH)("[Contacts] Create",(0,b.Ky)()),Dt=(0,b.PH)("[Contacts] Update",(0,b.Ky)()),It=(0,b.PH)("[Contacts] Remove",(0,b.Ky)()),Bt=((0,b.PH)("[Contacts] Load all success",(0,b.Ky)()),(0,b.PH)("[Contacts] Load success",(0,b.Ky)())),Ut=(0,b.PH)("[Contacts] Create success",(0,b.Ky)()),ht=(0,b.PH)("[Contacts] Update success",(0,b.Ky)()),Pt=(0,b.PH)("[Contacts] Remove success",(0,b.Ky)()),q=((0,b.PH)("[Contacts] Failure",(0,b.Ky)()),function(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},c=Object.assign({sortComparer:!1,selectId:function(X){return X.id}},i),u=c.selectId,h=c.sortComparer,M=ft(),O=pt(),T=h?V(u,h):vt(u);return Object.assign(Object.assign(Object.assign({selectId:u,sortComparer:h},M),O),T)}({selectId:function(i){return i.id},sortComparer:!1})),K=q.getInitialState({}),yt=(0,b.Lq)(K,(0,b.on)(Bt,function(i,c){return q.upsertOne(c.contact,i)}),(0,b.on)(Ut,function(i,c){return q.addOne(c.contact,i)}),(0,b.on)(ht,function(i,c){var u=c.contact;return q.updateOne({id:u.id,changes:u},i)}),(0,b.on)(Pt,function(i,c){return q.removeOne(c.id,i)}));function mt(i,c){return(0,b.UY)({contacts:yt})(i,c)}var gt=(0,b.ZF)("contacts"),bt=(0,b.P1)(gt,function(i){return i.contacts}),jt=q.getSelectors(bt).selectAll,z=function(){function i(c){this.store=c,this.contacts$=this.store.pipe((0,b.Ys)(jt))}return i.prototype.loadContact=function(c){this.store.dispatch(kt({id:c}))},i.prototype.createContact=function(c){this.store.dispatch(Nt({contact:c}))},i.prototype.updateContact=function(c){this.store.dispatch(Dt({contact:c}))},i.prototype.deleteContact=function(c){this.store.dispatch(It({id:c}))},i.prototype.getContactById=function(c){return this.store.pipe((0,b.Ys)(function(i){return(0,b.P1)(bt,function(i){return function(c){return c.entities[i]}}(i))}(c)))},i.\u0275fac=function(u){return new(u||i)(r.LFG(b.yh))},i.\u0275prov=r.Yz7({token:i,factory:i.\u0275fac}),i}(),Ct=E(64762),L=E(31041),J=function(){function i(c){this.formBuilder=c,this.contact={id:void 0,name:"",email:"",phone:""},this.save=new r.vpe,this.form=this.formBuilder.group({id:[this.contact.id],name:[this.contact.name,L.kI.required],email:[this.contact.email,L.kI.required],phone:[this.contact.phone]})}return i.prototype.ngOnInit=function(){},i.prototype.ngOnChanges=function(){this.contact&&this.form.patchValue((0,Ct.pi)({},this.contact))},i.prototype.submit=function(){this.form.valid&&this.save.emit(this.form.value)},i.\u0275fac=function(u){return new(u||i)(r.Y36(L.qu))},i.\u0275cmp=r.Xpm({type:i,selectors:[["app-contact-form"]],inputs:{contact:"contact"},outputs:{save:"save"},features:[r.TTD],decls:16,vars:2,consts:[[1,"form",3,"formGroup","submit"],[1,"form-group"],["for","name-input"],["id","name-input","type","text","formControlName","name",1,"form-control"],["for","email-input"],["id","email-input","type","email","formControlName","email",1,"form-control"],["for","phone-input"],["id","phone-input","type","tel","formControlName","phone",1,"form-control"],["type","submit",1,"btn","btn-success","float-right",3,"disabled"]],template:function(u,h){1&u&&(r.TgZ(0,"form",0),r.NdJ("submit",function(){return h.submit()}),r.TgZ(1,"div",1),r.TgZ(2,"label",2),r._uU(3,"Name:"),r.qZA(),r._UZ(4,"input",3),r.qZA(),r.TgZ(5,"div",1),r.TgZ(6,"label",4),r._uU(7,"Email:"),r.qZA(),r._UZ(8,"input",5),r.qZA(),r.TgZ(9,"div",1),r.TgZ(10,"label",6),r._uU(11,"Phone:"),r.qZA(),r._UZ(12,"input",7),r.qZA(),r.TgZ(13,"div",1),r.TgZ(14,"button",8),r._uU(15," Submit "),r.qZA(),r.qZA(),r.qZA()),2&u&&(r.Q6J("formGroup",h.form),r.xp6(14),r.Q6J("disabled",!h.form.valid))},directives:[L._Y,L.JL,L.sg,L.Fj,L.JJ,L.u],styles:[".form[_ngcontent-%COMP%]{-webkit-animation:fadeIn .6s;animation:fadeIn .6s}"],changeDetection:0}),i}(),I=function(){function i(c,u){this.contactsFacade=c,this.router=u}return i.prototype.ngOnInit=function(){},i.prototype.ngOnDestroy=function(){},i.prototype.submitted=function(c){this.contactsFacade.createContact(c),this.router.navigate(["/contacts"])},i.\u0275fac=function(u){return new(u||i)(r.Y36(z),r.Y36(F.F0))},i.\u0275cmp=r.Xpm({type:i,selectors:[["app-contact-new"]],decls:5,vars:0,consts:[[1,"card"],[1,"card-header"],[1,"card-body"],[3,"save"]],template:function(u,h){1&u&&(r.TgZ(0,"div",0),r.TgZ(1,"div",1),r._uU(2," New Contact "),r.qZA(),r.TgZ(3,"div",2),r.TgZ(4,"app-contact-form",3),r.NdJ("save",function(O){return h.submitted(O)}),r.qZA(),r.qZA(),r.qZA())},directives:[J],styles:[""],changeDetection:0}),i}(),ct=E(79996),xt=E(44689),nt=E(23395),rt=E(42693),G=E(529),_t=function(){function i(c){this.http=c}return i.prototype.getSpreadsheet=function(){var c=new rt.LE;return c=c.append("ranges","Data!A2:A50"),this.http.get(G.N.appApi.baseUrl+G.N.spreadsheetId+"/values:batchGet",{params:c})},i.\u0275fac=function(u){return new(u||i)(r.LFG(rt.eN))},i.\u0275prov=r.Yz7({token:i,factory:i.\u0275fac}),i}(),St=function(i){function c(){return i.call(this,{url:G.N.socketConfig.url+"/contacts",options:G.N.socketConfig.opts})||this}return(0,Ct.ZT)(c,i),c.\u0275prov=r.Yz7({token:c,factory:c.\u0275fac=function(h){return new(h||c)}}),c}(E(36212).sk),s=function(){function i(c,u,h){this.actions$=c,this.contactsService=u,this.contactsSocket=h}return i.\u0275fac=function(u){return new(u||i)(r.LFG(nt.eX),r.LFG(_t),r.LFG(St))},i.\u0275prov=r.Yz7({token:i,factory:i.\u0275fac}),i}();function t(i,c){if(1&i){var u=r.EpF();r.TgZ(0,"div",1),r.TgZ(1,"div",2),r.TgZ(2,"div",3),r._uU(3," Contact "),r.qZA(),r.TgZ(4,"div",4),r.TgZ(5,"p"),r._uU(6,"Name: "),r.TgZ(7,"span",5),r._uU(8),r.qZA(),r.qZA(),r.TgZ(9,"p"),r._uU(10,"Email: "),r.TgZ(11,"span",5),r._uU(12),r.qZA(),r.qZA(),r.TgZ(13,"p"),r._uU(14,"Phone: "),r.TgZ(15,"span",5),r._uU(16),r.qZA(),r.qZA(),r.qZA(),r.TgZ(17,"div",6),r.TgZ(18,"span",7),r.TgZ(19,"button",8),r.NdJ("click",function(){r.CHM(u);var O=r.oxw();return O.edit.emit(O.contact)}),r._uU(20," EDIT"),r.qZA(),r.TgZ(21,"button",9),r.NdJ("click",function(){r.CHM(u);var O=r.oxw();return O.remove.emit(O.contact)}),r._uU(22," DELETE"),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA()}if(2&i){var h=r.oxw();r.xp6(8),r.Oqu(h.contact.name),r.xp6(4),r.Oqu(h.contact.email),r.xp6(4),r.Oqu(h.contact.phone)}}var n=function(){function i(){this.edit=new r.vpe,this.remove=new r.vpe}return i.prototype.ngOnInit=function(){},i.\u0275fac=function(u){return new(u||i)},i.\u0275cmp=r.Xpm({type:i,selectors:[["app-contact-details-container"]],inputs:{contact:"contact"},outputs:{edit:"edit",remove:"remove"},decls:1,vars:1,consts:[["class","contact-details-container",4,"ngIf"],[1,"contact-details-container"],[1,"card"],[1,"card-header"],[1,"card-body"],[1,"badge","badge-primary"],[1,"card-footer","text-muted"],[1,"float-md-right"],[1,"btn","btn-sm","btn-outline-primary",3,"click"],[1,"btn","btn-sm","btn-outline-danger",3,"click"]],template:function(u,h){1&u&&r.YNc(0,t,23,3,"div",0),2&u&&r.Q6J("ngIf",h.contact)},directives:[Y.O5],styles:[".contact-details-container[_ngcontent-%COMP%]{-webkit-animation:fadeIn .6s;animation:fadeIn .6s}"],changeDetection:0}),i}(),e=function(){function i(c,u,h,M){var O=this;this.activatedRoute=c,this.router=u,this.contactsFacade=h,this.contactsEffects=M,this.contact$=this.activatedRoute.params.pipe((0,ct.U)(function(T){return T.contactId}),(0,xt.w)(function(T){return O.contactsFacade.getContactById(T)}))}return i.prototype.ngOnInit=function(){var c=this;this.activatedRoute.params.subscribe(function(u){c.contactsFacade.loadContact(+u.contactId)})},i.prototype.editContact=function(c){this.router.navigate(["/contacts",c.id,"edit"])},i.prototype.deleteContact=function(c){confirm("Are you sure?")&&this.contactsFacade.deleteContact(c.id)},i.prototype.ngOnDestroy=function(){this.redirectSub.unsubscribe()},i.\u0275fac=function(u){return new(u||i)(r.Y36(F.gz),r.Y36(F.F0),r.Y36(z),r.Y36(s))},i.\u0275cmp=r.Xpm({type:i,selectors:[["app-contact-details"]],decls:2,vars:3,consts:[[3,"contact","edit","remove"]],template:function(u,h){1&u&&(r.TgZ(0,"app-contact-details-container",0),r.NdJ("edit",function(O){return h.editContact(O)})("remove",function(O){return h.deleteContact(O)}),r.ALo(1,"async"),r.qZA()),2&u&&r.Q6J("contact",r.lcZ(1,1,h.contact$))},directives:[n],pipes:[Y.Ov],styles:[""],changeDetection:0}),i}(),a=function(){function i(c,u,h,M){var O=this;this.activatedRoute=c,this.router=u,this.contactsFacade=h,this.contactsEffects=M,this.contact$=this.activatedRoute.params.pipe((0,ct.U)(function(T){return T.contactId}),(0,xt.w)(function(T){return O.contactsFacade.getContactById(T)}))}return i.prototype.ngOnInit=function(){var c=this;this.activatedRoute.params.subscribe(function(u){c.contactsFacade.loadContact(+u.contactId)})},i.prototype.ngOnDestroy=function(){this.redirectSub.unsubscribe()},i.prototype.submitted=function(c){this.contactsFacade.updateContact(c)},i.\u0275fac=function(u){return new(u||i)(r.Y36(F.gz),r.Y36(F.F0),r.Y36(z),r.Y36(s))},i.\u0275cmp=r.Xpm({type:i,selectors:[["app-contact-edit"]],decls:6,vars:3,consts:[[1,"card"],[1,"card-header"],[1,"card-body"],[3,"contact","save"]],template:function(u,h){1&u&&(r.TgZ(0,"div",0),r.TgZ(1,"div",1),r._uU(2," Edit Contact "),r.qZA(),r.TgZ(3,"div",2),r.TgZ(4,"app-contact-form",3),r.NdJ("save",function(O){return h.submitted(O)}),r.ALo(5,"async"),r.qZA(),r.qZA(),r.qZA()),2&u&&(r.xp6(4),r.Q6J("contact",r.lcZ(5,1,h.contact$)))},directives:[J],pipes:[Y.Ov],styles:[""],changeDetection:0}),i}(),o=E(40878),l=E(10534),d=function(){function i(c){this.store=c}return i.prototype.resolve=function(c,u){return this.store.dispatch((0,l.u)({payload:c.data.title})),(0,o.of)(c.data.title)},i.\u0275fac=function(u){return new(u||i)(r.LFG(b.yh))},i.\u0275prov=r.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i}(),v=E(77125),C=function(){function i(c){this.http=c}return i.prototype.getSpreadsheet=function(c){var u=new rt.LE;return c.forEach(function(h){u=u.append("ranges",h)}),this.http.get(G.N.appApi.baseUrl+G.N.spreadsheetId+"/values:batchGet",{params:u})},i.\u0275fac=function(u){return new(u||i)(r.LFG(rt.eN))},i.\u0275prov=r.Yz7({token:i,factory:i.\u0275fac}),i}(),S=E(50111);function k(i,c){if(1&i&&(r.TgZ(0,"div",6),r._UZ(1,"canvas",7),r.qZA()),2&i){var u=r.oxw(2);r.xp6(1),r.Q6J("data",u.pieChartData)("labels",u.pieChartLabels)("chartType",u.pieChartType)("options",u.pieChartOptions)("plugins",u.pieChartPlugins)("colors",u.pieChartColors)("legend",u.pieChartLegend)}}function N(i,c){if(1&i&&(r.TgZ(0,"div",1),r.TgZ(1,"div",2),r.TgZ(2,"h6",3),r._uU(3,"This month you spent:"),r.qZA(),r.TgZ(4,"h5",4),r._uU(5),r.qZA(),r.TgZ(6,"div"),r.TgZ(7,"div"),r.YNc(8,k,2,7,"div",5),r.qZA(),r.qZA(),r.qZA(),r.qZA()),2&i){var u=r.oxw();r.xp6(5),r.Oqu(u.spreadSheetDataObj.currentMonthTotalSpending),r.xp6(3),r.Q6J("ngIf",u.pieChartData&&u.pieChartData.length>0)}}var Ot=[{path:"",component:dt,children:[{path:"",component:function(){function i(c,u,h,M){this.contactsFacade=c,this.router=u,this.spreadSheetService=h,this.changeDetection=M,this.barChartOptions={responsive:!0,scales:{xAxes:[{}],yAxes:[{}]},plugins:{datalabels:{anchor:"end",align:"end"}}},this.barChartLabels=["2006","2007","2008","2009","2010","2011","2012"],this.barChartType="bar",this.barChartLegend=!0,this.barChartPlugins=[v],this.barChartData=[{data:[65,59,80,81,56,55,40],label:"Series A"},{data:[28,48,40,19,86,27,90],label:"Series B"}],this.polarAreaChartLabels=["Download Sales","In-Store Sales","Mail Sales","Telesales","Corporate Sales"],this.polarAreaChartData=[300,500,100,40,120],this.polarAreaLegend=!1,this.polarAreaChartType="polarArea",this.pieChartOptions={responsive:!0,legend:{position:"top"},plugins:{datalabels:{formatter:function(O,T){return T.chart.data.labels[T.dataIndex]}}}},this.pieChartLabels=[],this.pieChartData=[],this.pieChartType="pie",this.pieChartLegend=!0,this.pieChartPlugins=[v],this.pieChartColors=[{backgroundColor:["rgba(255,0,0,0.3)","rgba(0,255,0,0.3)","rgba(0,0,255,0.3)"]}],this.contacts$=this.contactsFacade.contacts$,this.spreadSheetDataObj={}}return i.prototype.ngOnInit=function(){var c=this;this.spreadSheetService.getSpreadsheet(["Current!H1","Current!A2:E"]).subscribe(function(h){c.spreadSheetDataObj.currentMonthTotalSpending=h.valueRanges[0].values[0][0],c.spreadSheetDataObj.currentMonthSpendingList=h.valueRanges[1].values,c.formPieChartData(c.spreadSheetDataObj.currentMonthSpendingList)})},i.prototype.formPieChartData=function(c){var u={};c.forEach(function(h){var M=h[3],O=parseFloat(h[4].replace("\u20b9","").replace(/,/g,""));u[M]=u[M]?u[M]+O:O}),this.pieChartLabels=Object.keys(u),this.pieChartData=Object.values(u),this.changeDetection.detectChanges()},i.prototype.editContact=function(c){this.router.navigate(["/contacts",c.id,"edit"])},i.prototype.showContact=function(c){this.router.navigate(["/contacts",c.id])},i.prototype.deleteContact=function(c){confirm("Are you sure?")&&this.contactsFacade.deleteContact(c.id)},i.\u0275fac=function(u){return new(u||i)(r.Y36(z),r.Y36(F.F0),r.Y36(C),r.Y36(r.sBO))},i.\u0275cmp=r.Xpm({type:i,selectors:[["app-home"]],decls:1,vars:1,consts:[["class","card text-center",4,"ngIf"],[1,"card","text-center"],[1,"card-body"],[1,"card-subtitle","mb-2","text-muted"],[1,"card-title"],["class","chart",4,"ngIf"],[1,"chart"],["baseChart","",3,"data","labels","chartType","options","plugins","colors","legend"]],template:function(u,h){1&u&&r.YNc(0,N,9,2,"div",0),2&u&&r.Q6J("ngIf",h.spreadSheetDataObj.currentMonthTotalSpending)},directives:[Y.O5,S.jh],styles:[".card-title[_ngcontent-%COMP%]{margin:.5em 0;font-size:200%;color:#119fd6}.card-subtitle[_ngcontent-%COMP%], .card-text[_ngcontent-%COMP%]{text-align:left;text-align:initial;font-size:.875rem;font-weight:400;letter-spacing:.04em;line-height:1.25rem;color:#7a7a7a}.card[_ngcontent-%COMP%]{margin-bottom:30px}.example-button-container[_ngcontent-%COMP%]{right:30px;bottom:30px;position:absolute}"]}),i}(),data:{title:"Home"},resolve:{title:d}},{path:"new",component:I,data:{title:"New contact"},resolve:{title:d}},{path:":contactId",component:e,data:{title:"Contact details"},resolve:{title:d}},{path:":contactId/edit",component:a,data:{title:"Edit contact"},resolve:{title:d}}]}],Mt=function(){function i(){}return i.\u0275fac=function(u){return new(u||i)},i.\u0275mod=r.oAB({type:i}),i.\u0275inj=r.cJS({imports:[[F.Bz.forChild(Ot)],F.Bz]}),i}(),ut=function(){function i(){}return i.\u0275fac=function(u){return new(u||i)},i.\u0275mod=r.oAB({type:i}),i.\u0275inj=r.cJS({providers:[_t,St,z,C],imports:[[Y.ez,ot.m,Mt,b.Aw.forFeature("contacts",mt),nt.sQ.forFeature([s]),S.m9]]}),i}()}}]);