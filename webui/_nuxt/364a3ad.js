(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{299:function(e,n,t){"use strict";t.r(n);var r=t(4),o=(t(48),{props:{config:{type:Object,default:null},stopRec:{type:Function,default:null}},data:function(){return{notify:this.config.notify.notifyOn,record:this.config.record,danmu:this.config.danmu}},watch:{config:function(e,n){this.notify=this.config.notify.notifyOn,this.record=this.config.record,this.danmu=this.config.danmu}},methods:{changeNotify:function(e){var n=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r="",!e){t.next=7;break}return t.next=4,fetch("http://localhost:51880/addnotifyon/"+n.config.uid).then((function(e){return e.json()})).catch((function(e){return console.error(e)}));case 4:r=t.sent,t.next=10;break;case 7:return t.next=9,fetch("http://localhost:51880/delnotifyon/"+n.config.uid).then((function(e){return e.json()})).catch((function(e){return console.error(e)}));case 9:r=t.sent;case 10:!0!==r&&console.error("changeNotify返回错误：".concat(r));case 11:case"end":return t.stop()}}),t)})))()},changeRecord:function(e){var n=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r="",!e){t.next=7;break}return t.next=4,fetch("http://localhost:51880/addrecord/"+n.config.uid).then((function(e){return e.json()})).catch((function(e){return console.error(e)}));case 4:r=t.sent,t.next=10;break;case 7:return t.next=9,fetch("http://localhost:51880/delrecord/"+n.config.uid).then((function(e){return e.json()})).catch((function(e){return console.error(e)}));case 9:r=t.sent;case 10:!0!==r&&console.error("changeRecord返回错误：".concat(r));case 11:case"end":return t.stop()}}),t)})))()},changeDanmu:function(e){var n=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r="",!e){t.next=7;break}return t.next=4,fetch("http://localhost:51880/adddanmu/"+n.config.uid).then((function(e){return e.json()})).catch((function(e){return console.error(e)}));case 4:r=t.sent,t.next=10;break;case 7:return t.next=9,fetch("http://localhost:51880/deldanmu/"+n.config.uid).then((function(e){return e.json()})).catch((function(e){return console.error(e)}));case 9:r=t.sent;case 10:!0!==r&&console.error("changeDanmu返回错误：".concat(r));case 11:case"end":return t.stop()}}),t)})))()},deleteLive:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.config.isRecord&&e.stopRec(e.config.uid),n.next=3,fetch("http://localhost:51880/delconfig/"+e.config.uid).then((function(e){return e.json()})).catch((function(e){return console.error(e)}));case 3:!0!==(t=n.sent)&&console.error("deleteLive返回错误：".concat(t));case 5:case"end":return n.stop()}}),n)})))()}}}),c=t(37),component=Object(c.a)(o,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticStyle:{position:"relative",top:"8px"}},[t("el-checkbox",{attrs:{label:"开播提醒"},on:{change:e.changeNotify},model:{value:e.notify,callback:function(n){e.notify=n},expression:"notify"}}),e._v(" "),t("el-checkbox",{attrs:{label:"自动录播"},on:{change:e.changeRecord},model:{value:e.record,callback:function(n){e.record=n},expression:"record"}}),e._v(" "),t("el-checkbox",{attrs:{label:"自动下载弹幕"},on:{change:e.changeDanmu},model:{value:e.danmu,callback:function(n){e.danmu=n},expression:"danmu"}}),e._v(" "),t("el-popconfirm",{attrs:{icon:"el-icon-info","icon-color":"red",title:"确定删除 "+e.config.name+"（"+e.config.uid+"） 的设置？"},on:{confirm:e.deleteLive}},[t("el-button",{staticStyle:{position:"absolute",right:"30px"},attrs:{slot:"reference",size:"small"},slot:"reference"},[e._v("\n      删除主播\n    ")])],1)],1)}),[],!1,null,null,null);n.default=component.exports}}]);