webpackJsonp([1],[,,,,function(t,e,n){"use strict";e.a={name:"app"}},function(t,e,n){"use strict";var o=n(17),i=n.n(o),s=new i.a;s.socketURL="/",s.socketURL="https://rtcmulticonnection.herokuapp.com:443/",s.socketMessageEvent="video-conference-demo",s.session={audio:!0,video:!0},s.sdpConstraints.mandatory={OfferToReceiveAudio:!0,OfferToReceiveVideo:!0},s.autoCreateMediaElement=!1,e.a={name:"hello",data:function(){return{videosList:[]}},mounted:function(){var t=this;s.onstream=function(e){t.videosList.push({id:e.streamid,srcObject:e.stream,muted:"local"===e.type})},s.onstreamended=function(e){var n=[];t.videosList.forEach(function(t){t.id!==e.streamid&&n.push(t)}),t.videosList=n},this.autoAddOrJoin()},methods:{openRoom:function(){s.open("room1",function(){console.log(s.sessionid)})},joinRoom:function(){s.join("room1")},autoAddOrJoin:function(){s.openOrJoin("room1",function(t,e){!1===t&&!0===s.isInitiator&&console.log(s.sessionid)})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(9),s=n(13);o.a.config.productionTip=!1,new o.a({el:"#app",router:s.a,template:"<App/>",components:{App:i.a}})},,,function(t,e,n){"use strict";function o(t){n(10)}var i=n(4),s=n(12),r=n(3),a=o,c=r(i.a,s.a,!1,a,null,null);e.a=c.exports},function(t,e){},,function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("main",[n("router-view")],1)])},i=[],s={render:o,staticRenderFns:i};e.a=s},function(t,e,n){"use strict";var o=n(1),i=n(14),s=n(15);o.a.use(i.a),e.a=new i.a({routes:[{path:"/",name:"Hello",component:s.a}]})},,function(t,e,n){"use strict";function o(t){n(16)}var i=n(5),s=n(18),r=n(3),a=o,c=r(i.a,s.a,!1,a,"data-v-37258a32",null);e.a=c.exports},function(t,e){},,function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("section",{staticClass:"make-center"},[n("ul",{attrs:{id:"vue-app"}},t._l(t.videosList,function(t){return n("li",{key:t.id},[n("video",{attrs:{controls:"",autoplay:"",playsinline:"",id:t.id},domProps:{srcObject:t.srcObject,muted:t.muted}})])}),0),t._v(" "),n("div",{staticStyle:{"text-align":"center",display:"none",background:"#F1EDED",margin:"15px -10px",border:"1px solid rgb(189, 189, 189)","border-left":"0","border-right":"0"},attrs:{id:"room-urls"}})])])},i=[],s={render:o,staticRenderFns:i};e.a=s}],[6]);
//# sourceMappingURL=app.b80b9d6dd02926779386.js.map