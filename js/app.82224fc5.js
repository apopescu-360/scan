(function(e){function t(t){for(var a,r,s=t[0],c=t[1],l=t[2],u=0,h=[];u<s.length;u++)r=s[u],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&h.push(i[r][0]),i[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);d&&d(t);while(h.length)h.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(a=!1)}a&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},i={app:0},o=[];function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/scan/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"16d1":function(e,t,n){},"24ee":function(e,t,n){"use strict";n("16d1")},3869:function(e,t,n){"use strict";n("a093")},"56d7":function(e,t,n){"use strict";n.r(t);var a=n("2b0e"),i=function(){var e=this,t=e._self._c;return t("v-app",[t("Search"),t("AppUpdateComponent")],1)},o=[],r=function(){var e=this,t=e._self._c;return t("v-container",{staticClass:"search-container"},[t("v-form",{ref:"form",staticClass:"search__form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t("v-text-field",{ref:"inputText",staticClass:"search__text-field",attrs:{required:"",solo:"",dense:"",type:"text",height:42},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.Cauta.apply(null,arguments)}},model:{value:e.searchText,callback:function(t){e.searchText=t},expression:"searchText"}}),t("v-btn",{staticClass:"ml-3",attrs:{color:"primary",elevation:"2",height:"42",disabled:!e.valid},on:{click:e.search}},[e._v("Cauta")])],1),t("div",{staticStyle:{height:"1em"}},[t("span",{ref:"searchSpan"})]),e.isMobile()?t("ScannerPanel",{on:{scan:e.scan}}):e._e()],1)},s=[],c=function(){var e=this,t=e._self._c;return t("div",{staticClass:"scanner-panel-container"},[e.openScanner?t("VideoDeviceSelector",{on:{selectionChange:e.onSelectedDeviceChange,unavailable:e.onCameraUnavailable,denied:e.onCameraDenied}}):e._e(),t("ErrorDialog",{ref:"errorDialog"}),e.openScanner?t("Scanner",{ref:"scanner",staticClass:"pt-4",attrs:{deviceId:e.selectedDeviceId},on:{scan:e.onScan}}):e._e(),e.openScanner?t("v-btn",{staticClass:"scanner-button",attrs:{id:"closeScannerButton",icon:""},on:{click:e.onScannerButtonClick}},[t("CloseScannerIcon",{staticClass:"scanner-button-icon"}),t("div",{staticClass:"scanner-button-text"},[e._v("Inchide Camera")])],1):t("v-btn",{staticClass:"scanner-button",attrs:{id:"openScannerButton",icon:""},on:{click:e.onScannerButtonClick}},[t("OpenScannerIcon",{staticClass:"scanner-button-icon"}),t("div",{staticClass:"scanner-button-text"},[t("span",[e._v("Scaneaza cu Camera")])])],1)],1)},l=[],d=function(){var e=this,t=e._self._c;return t("div",[t("div",{directives:[{name:"show",rawName:"v-show",value:e.loaded,expression:"loaded"}],staticClass:"scanner-container"},[t("video",{ref:"scanner"})])])},u=[],h=n("224f"),v=n("9ae0"),p=n.n(v);const f=new Audio(p.a);var m={name:"Scanner",props:{deviceId:null},data(){return{loaded:!1,codeScanner:null,scannedVal:null}},async created(){const e=new Map;e.set(h["DecodeHintType"].POSSIBLE_FORMATS,[h["BarcodeFormat"].CODE_128,h["BarcodeFormat"].DATA_MATRIX,h["BarcodeFormat"].QR_CODE]),e.set(h["DecodeHintType"].TRY_HARDER,[]),this.codeScanner=new h["BrowserMultiFormatReader"](e),alert(this.scannedVal)},mounted(){setTimeout(()=>this.start(),100)},beforeDestroy(){this.close()},methods:{start(){this.codeScanner.decodeFromVideoDevice(this.deviceId,this.$refs.scanner,this.scan)},close(){this.loaded=!1,this.codeScanner.reset()},restart(){this.close(),this.start()},scan(e){this.loaded||(this.loaded=!0),e&&e.text!==this.scannedVal&&(f.play(),this.scannedVal=e.text,this.$emit("scan",e.text))}},watch:{deviceId(){this.restart()}}},b=m,g=(n("ba7a"),n("2877")),w=Object(g["a"])(b,d,u,!1,null,"56c29476",null),C=w.exports,S=function(){var e=this,t=e._self._c;return t("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"}},[t("path",{attrs:{fill:"currentColor",d:"M170.666667 256h85.333333v512H170.666667V256m128 0h42.666666v512H298.666667V256m85.333333 0h128v512H384V256m170.666667 0h42.666666v512h-42.666666V256m128 0h85.333333v512h-85.333333V256m128 0h42.666666v512h-42.666666V256M85.333333 170.666667v170.666666H0V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334h170.666667v85.333334H85.333333m853.333334-85.333334a85.333333 85.333333 0 0 1 85.333333 85.333334v170.666666h-85.333333V170.666667h-170.666667V85.333333h170.666667M85.333333 682.666667v170.666666h170.666667v85.333334H85.333333a85.333333 85.333333 0 0 1-85.333333-85.333334v-170.666666h85.333333m853.333334 170.666666v-170.666666h85.333333v170.666666a85.333333 85.333333 0 0 1-85.333333 85.333334h-170.666667v-85.333334h170.666667z"}})])},x=[],D={},y=Object(g["a"])(D,S,x,!1,null,null,null),_=y.exports,k=function(){var e=this,t=e._self._c;return t("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"}},[t("path",{attrs:{fill:"currentColor",d:"M170.666667 256h85.333333v512H170.666667V256m128 0h42.666666v512H298.666667V256m85.333333 0h128v512H384V256m170.666667 0h42.666666v512h-42.666666V256m128 0h85.333333v512h-85.333333V256m128 0h42.666666v512h-42.666666V256M85.333333 170.666667v170.666666H0V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334h170.666667v85.333334H85.333333m853.333334-85.333334a85.333333 85.333333 0 0 1 85.333333 85.333334v170.666666h-85.333333V170.666667h-170.666667V85.333333h170.666667M85.333333 682.666667v170.666666h170.666667v85.333334H85.333333a85.333333 85.333333 0 0 1-85.333333-85.333334v-170.666666h85.333333m853.333334 170.666666v-170.666666h85.333333v170.666666a85.333333 85.333333 0 0 1-85.333333 85.333334h-170.666667v-85.333334h170.666667z"}}),t("path",{attrs:{d:"M 10,10 L 1010,1010",stroke:"red","stroke-width":"150"}})])},V=[],O={},T=Object(g["a"])(O,k,V,!1,null,null,null),A=T.exports,I=function(){var e=this,t=e._self._c;return t("div",[t("v-select",{directives:[{name:"show",rawName:"v-show",value:e.isMoreThanOneCamera,expression:"isMoreThanOneCamera"}],attrs:{items:e.videoDevices,"item-text":"label","item-value":"deviceId",label:"Default camera","single-line":""},model:{value:e.selectedVideoDevice,callback:function(t){e.selectedVideoDevice=t},expression:"selectedVideoDevice"}})],1)},E=[],M={name:"VideoDeviceSelector",data(){return{videoDevices:[],selectedVideoDevice:null}},computed:{isCameraAvailable(){return 0!==this.videoDevices.length},isMoreThanOneCamera(){return this.videoDevices.length>1}},async created(){this.loadCameraChoice(),await this.loadVideoDevices(),this.isCameraAvailable?await this.isCameraEnabled()||this.$emit("denied"):this.$emit("unavailable")},methods:{async loadVideoDevices(){try{var e,t;const n=await(null===(e=navigator)||void 0===e||null===(t=e.mediaDevices)||void 0===t?void 0:t.enumerateDevices());if(n){const e=n.filter(e=>"videoinput"===e.kind).map((e,t)=>({deviceId:e.deviceId,groupId:e.groupId,label:e.label||"Camera "+t})),t=e.filter(e=>e.label&&e.label.toLowerCase().includes("back"));this.videoDevices=t.length?t:e}}catch(n){console.error(n)}},async isCameraEnabled(){try{var e;const t=await(null===(e=navigator.permissions)||void 0===e?void 0:e.query({name:"camera"}));return!t||"denied"!==t.state}catch(t){return console.error(t),!0}},loadCameraChoice(){const e=localStorage.getItem("preferredCameraId");e&&(this.selectedVideoDevice=e)},storeCameraChoice(){localStorage.setItem("preferredCameraId",this.selectedVideoDevice)}},watch:{selectedVideoDevice(){this.storeCameraChoice(),this.$emit("selectionChange",this.selectedVideoDevice)}}},B=M,j=Object(g["a"])(B,I,E,!1,null,"52e2b17a",null),$=j.exports,H=function(){var e=this,t=e._self._c;return t("v-dialog",{attrs:{persistent:"","max-width":e.dialogWidth},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[t("v-card",{attrs:{raised:""}},[t("v-card-title",[e._v(e._s(e.details.title)+" ")]),t("v-card-text",[e._v(e._s(e.details.description)+" ")]),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{text:"",id:"error-dialog__close-btn"},on:{click:e.closeDialog}},[e._v(e._s(e.details.buttonText))])],1)],1)],1)},P=[],L={name:"ErrorDialog",data(){return{details:{},visible:!1}},computed:{dialogWidth(){return this.isMobileView?"75%":"25%"},isMobileView(){return"xs"===this.$vuetify.breakpoint.name}},methods:{closeDialog(){this.visible=!1,this.details&&this.details.triggerButtonAction()},showDialog(e){this.details=e,this.visible=!0}}},U=L,F=Object(g["a"])(U,H,P,!1,null,null,null),R=F.exports;class N{constructor(e,t,n,a){this.title=e,this.description=t,this.buttonAction=a,this.buttonText=n}triggerButtonAction(){this.buttonAction&&"function"===typeof this.buttonAction&&this.buttonAction()}}var W={name:"ScannerPanel",components:{OpenScannerIcon:_,CloseScannerIcon:A,Scanner:C,VideoDeviceSelector:$,ErrorDialog:R},data(){return{openScanner:!1,selectedDeviceId:null}},methods:{onCameraUnavailable(){const e=new N("Eroare","Nu exista Camera","Inchide",()=>{this.onScannerButtonClick()});this.$refs.errorDialog.showDialog(e)},onCameraDenied(){const e=new N("Eroare","Accesul la camera este interzis","Inchide",()=>{this.onScannerButtonClick()});this.$refs.errorDialog.showDialog(e)},onScan(e){this.$emit("scan",e)},onScannerButtonClick(){this.openScanner=!this.openScanner},onSelectedDeviceChange(e){this.selectedDeviceId=e}}},G=W,K=(n("24ee"),Object(g["a"])(G,c,l,!1,null,"7f53d348",null)),z=K.exports,q={name:"Search",components:{ScannerPanel:z},data(){return{valid:!0,searchText:"",savedOnKeyDown:null}},mounted(){this.savedOnKeyDown=document.onkeydown,document.onkeydown=this.focusOnKeyDown},beforeRouteLeave(e,t,n){document.onkeydown=this.savedOnKeyDown,n()},methods:{isMobile(){return!0},search(){this.$refs.searchSpan.innerHTML="CAUT: "+this.searchText,this.searchText=""},scan(e){e&&(this.searchText=e)},focusOnKeyDown(){this.$refs.inputText&&this.$refs.inputText.focus()}}},J=q,Q=(n("70d0"),Object(g["a"])(J,r,s,!1,null,"7ff0812f",null)),X=Q.exports,Y=function(){var e=this,t=e._self._c;return t("div",[t("v-overlay",{attrs:{value:e.updateExists}}),t("v-snackbar",{attrs:{value:e.updateExists,"multi-line":!0,timeout:-1,id:"update_snackbar",color:"#FDD835"},scopedSlots:e._u([{key:"action",fn:function({attrs:n}){return[t("v-btn",e._b({attrs:{color:"black",text:""},on:{click:e.refreshApp}},"v-btn",n,!1),[e._v(" Update ")])]}}])},[e._v(" An update is available ")])],1)},Z=[],ee={name:"AppUpdateComponent",data(){return{refreshing:!1,registration:null,updateExists:!1}},created(){document.addEventListener("swUpdated",this.updateAvailable),navigator.serviceWorker.addEventListener("controllerchange",()=>{this.refreshing||(this.refreshing=!0,window.location.reload())})},methods:{updateAvailable(e){this.registration=e.detail,this.updateExists=!0},refreshApp(){this.updateExists=!1,this.registration&&this.registration.waiting&&this.registration.waiting.postMessage({type:"SKIP_WAITING"})}}},te=ee,ne=(n("3869"),Object(g["a"])(te,Y,Z,!1,null,"5506616e",null)),ae=ne.exports,ie={name:"App",components:{Search:X,AppUpdateComponent:ae}},oe=ie,re=(n("ecd2"),Object(g["a"])(oe,i,o,!1,null,null,null)),se=re.exports,ce=n("ce5b"),le=n.n(ce);n("bf40");a["default"].use(le.a);var de=new le.a({theme:{themes:{light:{primary:"#298dff",accent:"#298dff"}}}}),ue=(n("5363"),n("9483"));Object(ue["a"])("/scan/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(e){console.log(`[${(new Date).toLocaleTimeString("en-GB")}]: Service worker has been registered.`),setInterval(()=>{console.log("Checking app for updates..."),e.update().then(e=>{var t,n;console.log(`[${(new Date).toLocaleTimeString("en-GB")}]: Service Worker updated to latest version.`);const a=null!==(t=e.installing)&&void 0!==t?t:e.waiting;null!==(n=e.waiting)&&void 0!==n&&n.state&&console.log(`[${(new Date).toLocaleTimeString("en-GB")}]: Waiting service worker state: ${e.waiting.state}`),"installed"===(null===a||void 0===a?void 0:a.state)?(console.log(`[${(new Date).toLocaleTimeString("en-GB")}]: Pending update found... Refresh the app to update`),document.dispatchEvent(new CustomEvent("swUpdated",{detail:e}))):console.log(`[${(new Date).toLocaleTimeString("en-GB")}]: No new service worker available`)}).catch(e=>console.log("Service Worker update failed!",e))},6e4)},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(e){console.log("New content is available; please refresh."),document.dispatchEvent(new CustomEvent("swUpdated",{detail:e}))},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),a["default"].config.productionTip=!1,new a["default"]({vuetify:de,render:e=>e(se)}).$mount("#app")},"57c0":function(e,t,n){},"70d0":function(e,t,n){"use strict";n("e089")},"7a8b":function(e,t,n){},"9ae0":function(e,t,n){e.exports=n.p+"media/beep.6bb58878.wav"},a093:function(e,t,n){},ba7a:function(e,t,n){"use strict";n("7a8b")},e089:function(e,t,n){},ecd2:function(e,t,n){"use strict";n("57c0")}});
//# sourceMappingURL=app.82224fc5.js.map