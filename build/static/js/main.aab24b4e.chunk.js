(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){},102:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(15),l=a.n(o),s=(a(52),a(54),a(56),a(4)),c=a(5),i=a(7),u=a(6),m=a(8),p=a(40),d=a(12),f=a(41),h=a(39),g=(a(58),function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement("header",null,this.props.children)}}]),t}(r.Component)),v=a(2),k=(a(80),function(){return n.a.createElement(v.MDBContainer,{fluid:!0,className:"about-container"},n.a.createElement(v.Row,{style:{height:"100vh",alignItems:"center"},center:!0},n.a.createElement(v.Card,null,n.a.createElement(v.CardBody,null,n.a.createElement(v.CardTitle,{className:"display-4 text-align-center"},"My React first application"),n.a.createElement("p",{className:"h2-responsive"},"This small application was built in a week."),n.a.createElement("p",{className:"h3-responsive"},"Started on"),n.a.createElement("p",{className:"h4-responsive"},"19/11/2018"),n.a.createElement("p",{className:"h5-responsive"},"Ended on"),n.a.createElement("p",{className:"h4-responsive"},"26/11/2018"),n.a.createElement("p",{className:"h5-responsive"},"Updated on 07/12/2018"),n.a.createElement("p",{className:"h5-responsive"},"Second update on 30/12/2018 (small one)"),n.a.createElement("p",{className:"h5-responsive"},"P.S: This is my first App ( \u0361\xb0 \u035c\u0296 \u0361\xb0)")))))}),b=(a(82),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onClick=function(){a.setState({collapse:!a.state.collapse})},a.toggle=function(){a.setState({modal:!a.state.modal})},a.state={collapse:!1,isWideEnough:!1,modal:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement(v.Navbar,{color:"black",dark:!0,expand:"lg"},n.a.createElement(v.Container,null,n.a.createElement(v.Modal,{className:"text-black",size:"lg",side:!0,position:"top",backdrop:!0,isOpen:this.state.modal,toggle:this.toggle},n.a.createElement(v.ModalHeader,{className:"text-center",titleClass:"w-100",tag:"p",toggle:this.toggle},"Are you sure?"),n.a.createElement(v.ModalFooter,{className:"justify-content-center"},n.a.createElement(v.NavLink,{className:"btn btn-elegant",to:"/",onClick:this.toggle},"Close"),n.a.createElement(v.NavLink,{className:"btn btn-outline-danger waves-effect",to:"/logout"},"Log out"))),n.a.createElement(v.NavbarBrand,null,n.a.createElement("strong",{className:"white-text"},"Map Application")),n.a.createElement(v.NavbarToggler,{onClick:this.onClick}),n.a.createElement(v.Collapse,{isOpen:this.state.collapse,navbar:!0},n.a.createElement(v.NavbarNav,{left:!0},n.a.createElement(v.NavItem,null,n.a.createElement(v.NavLink,{exact:!0,to:"/"},"Map itself")),n.a.createElement(v.NavItem,null,n.a.createElement(v.NavLink,{to:"/about"},"About"))),n.a.createElement(v.NavbarNav,{right:!0},n.a.createElement(v.NavItem,null,n.a.createElement(v.NavLink,{to:"#!",onClick:this.toggle},"Logout"))))))}}]),t}(n.a.Component)),y=a(13);var M=function(e){var t=e.type||"text";return n.a.createElement("div",null,n.a.createElement(v.MDBInput,{label:e.label,type:t,value:e.value,onChange:e.onChange}),function(e){var t=e.valid,a=e.touched,r=e.shouldValidate;return e.value.length<=0?void 0:!t&&r&&a}(e)?n.a.createElement("span",null,e.errorMessage):null)},E=a(43),O=a.n(E),C=a(14),I=a(23),w=a.n(I),S=a(33),N="AUTH_SUCCESS",j="AUTH_LOGOUT",D="MAP_ZOOMIN",B="MAP_ZOOMOUT",x="TOGGLE_MARKERS",T="SET_CENTER",A="CURRENT_MARKERS",L="LOADED_STATUS",z="DATABASE",P="GOOGLE";function _(e){return function(t){setTimeout(function(){t(U())},1e3*e)}}function U(){return localStorage.removeItem("token"),localStorage.removeItem("userId"),localStorage.removeItem("expirationDate"),{type:j}}function R(e){return{type:N,token:e}}var G=function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(n)))).state={isFormValid:!1,formControls:{email:{value:"",type:"email",label:"Enter your e-mail",errorMessage:"Enter correct e-mail adress (example@mail.com)",valid:!1,touched:!1,validation:{required:!0,email:!0}},password:{value:"",type:"password",label:"Enter your password",errorMessage:"Enter at least 6 characters",valid:!1,touched:!1,validation:{required:!0,minLength:6}}}},a.submitHandler=function(e){e.preventDefault()},a.loginBtn=function(){a.state.formControls.password.valid&&a.state.formControls.email.valid&&a.props.auth(a.state.formControls.email.value,a.state.formControls.password.value,!0)},a.registerBtn=function(){a.state.formControls.password.valid&&a.state.formControls.email.valid&&a.props.auth(a.state.formControls.email.value,a.state.formControls.password.value,!1)},a.onChangeHandler=function(e,t){var r=Object(y.a)({},a.state.formControls),n=Object(y.a)({},r[t]);n.value=e.target.value,n.touched=!0,n.valid=a.validateControl(n.value,n.validation),r[t]=n;var o=!0;Object.keys(r).forEach(function(e){o=r[e].valid&&o}),a.setState({formControls:r,isFormValid:o})},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"validateControl",value:function(e,t){if(!t)return!0;var a=!0;return t.required&&(a=""!==e.trim()&&a),t.email&&(a=O.a.email(e)&&a),t.minLength&&(a=e.length>=t.minLength&&a),a}},{key:"renderInputs",value:function(){var e=this;return Object.keys(this.state.formControls).map(function(t,a){var r=e.state.formControls[t];return n.a.createElement(M,{key:t+a,type:r.type,value:r.value,valid:r.valid,touched:r.touched,label:r.label,shouldValidate:!!r.validation,errorMessage:r.errorMessage,onChange:function(a){return e.onChangeHandler(a,t)}})})}},{key:"render",value:function(){return n.a.createElement(v.Animation,{type:"fadeIn",count:1},n.a.createElement(v.MDBContainer,{style:{padding:"20px"}},n.a.createElement(v.MDBRow,null,n.a.createElement(v.MDBCol,{className:"mt-5",xl:"12"},n.a.createElement(v.MDBCard,null,n.a.createElement(v.MDBCardBody,{className:"mx-4"},n.a.createElement("p",{className:"h1-responsive text-center mb-4"},"Authorization"),n.a.createElement("form",{onSubmit:this.submitHandler},this.renderInputs(),n.a.createElement(v.MDBRow,{center:!0},n.a.createElement(v.MDBBtn,{onClick:this.loginBtn,color:"dark-green",size:"md"},"Sign In"),n.a.createElement(v.MDBBtn,{onClick:this.registerBtn,color:"mdb-color",size:"md"},"Sign up")))))))))}}]),t}(r.Component);var V=Object(C.b)(null,function(e){return{auth:function(t,a,r){return e(function(e,t,a){return function(){var r=Object(S.a)(w.a.mark(function r(n){var o,l;return w.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:o={email:e,password:t,returnSecureToken:!0},l="https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBMLU3d72yGqRdNb3GOmqW53m3yjCHBJ7k",a&&(l="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBMLU3d72yGqRdNb3GOmqW53m3yjCHBJ7k"),Object(S.a)(w.a.mark(function e(){var t,a,r;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(l,{method:"POST",body:JSON.stringify(o)});case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,r=new Date((new Date).getTime()+1e3*a.expiresIn),localStorage.setItem("token",a.idToken),localStorage.setItem("userId",a.localId),localStorage.setItem("expirationDate",r),n(R(a.idToken)),n(_(a.expiresIn));case 12:case"end":return e.stop()}},e,this)}))();case 4:case"end":return r.stop()}},r,this)}));return function(e){return r.apply(this,arguments)}}()}(t,a,r))}}})(G),H=a(20);function W(e){return{type:z,data:e}}function q(e){return{type:x,toggle:e}}function J(e){return{type:A,markers:e}}function Z(e){return{type:L,status:e}}function F(e){return function(t){t(!0===e?{type:D}:{type:B})}}var X=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement(v.MDBRow,null,n.a.createElement(v.MDBCol,{xl:"12",style:{height:"100vh",padding:"0px"}},this.props.children))}}]),t}(r.Component),K=Object(H.GoogleApiWrapper)({apiKey:"AIzaSyDfXMtNQ9WiZVSmJx8FI0EwzFKhyzwM6vg&libraries=places",language:"ru"})(X),Q=function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(n)))).state={currentUserId:localStorage.getItem("userId"),saveStatus:"Save Markers"},a.turnOffOn=function(){!1===a.props.toggle?a.props.toggleMarkers(!0):a.props.toggleMarkers(!1)},a.loadMarkers=function(){if(!1===a.props.loaded){var e=!0,t=!1,r=void 0;try{for(var n,o=a.props.dataBase[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var l=n.value;if(l.userId===a.state.currentUserId&&l.geo!==a.props.markers){var s=l.geo.concat(a.props.markers);a.props.currentMarkers(s),a.props.toggleMarkers(!1)}}}catch(c){t=!0,r=c}finally{try{e||null==o.return||o.return()}finally{if(t)throw r}}}a.props.loadedStatus(!0)},a.saveMarkers=function(){var e=a.props.dataBase;if(e.length<=0)return e.push({userId:a.state.currentUserId,geo:a.props.markers,userName:"UserName"}),a.props.setDatabase(e),void a.update();if(e.length>0){var t=!0,r=!1,n=void 0;try{for(var o,l=e[Symbol.iterator]();!(t=(o=l.next()).done);t=!0){var s=o.value;if(s.userId===a.state.currentUserId)return s.geo=a.props.markers,void a.update()}}catch(d){r=!0,n=d}finally{try{t||null==l.return||l.return()}finally{if(r)throw n}}var c=!0,i=!1,u=void 0;try{for(var m,p=e[Symbol.iterator]();!(c=(m=p.next()).done);c=!0){if(m.value.userId!==a.state.currentUserId)return e.push({userId:a.state.currentUserId,geo:a.props.markers}),a.props.setDatabase(e),void a.update()}}catch(d){i=!0,u=d}finally{try{c||null==p.return||p.return()}finally{if(i)throw u}}}},a.onChooseHandler=function(e){var t=[];if("None"===e.target.value||void 0===e.target.value){var r=!0,n=!1,o=void 0;try{for(var l,s=a.props.markers[Symbol.iterator]();!(r=(l=s.next()).done);r=!0){var c=l.value;c.type&&t.push(c)}}catch(f){n=!0,o=f}finally{try{r||null==s.return||s.return()}finally{if(n)throw o}}a.props.currentMarkers(t)}else if(""!==e.target.value){var i=a.props.google,u=a.props.currentCenter,m=new i.maps.Map("",{center:u}),p={location:u,radius:"1000",type:e.target.value},d=[];new i.maps.places.PlacesService(m).nearbySearch(p,a.results=function(e){var r=!0,n=!1,o=void 0;try{for(var l,s=e[Symbol.iterator]();!(r=(l=s.next()).done);r=!0){var c=l.value;d.push({lat:c.geometry.location.lat(),lng:c.geometry.location.lng(),name:c.name,rating:c.rating,icon:"https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png"})}}catch(f){n=!0,o=f}finally{try{r||null==s.return||s.return()}finally{if(n)throw o}}var i=!0,u=!1,m=void 0;try{for(var p,h=a.props.markers[Symbol.iterator]();!(i=(p=h.next()).done);i=!0){var g=p.value;g.type&&t.push(g)}}catch(f){u=!0,m=f}finally{try{i||null==h.return||h.return()}finally{if(u)throw m}}t=t.concat(d),a.props.currentMarkers(t)})}},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"update",value:function(){var e=this;fetch("https://api.jsonbin.io/b/5c2957343f8bd92e4cc5fed1",{method:"PUT",body:JSON.stringify(this.props.dataBase),headers:{"Content-type":"application/json"}}).then(function(t){t.status>200?e.setState({saveStatus:"Saving..."}):200===t.status&&(e.setState({saveStatus:"Markers Saved"}),setTimeout(function(){e.setState({saveStatus:"Save Markers"})},1e3))}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this;return n.a.createElement(v.MDBContainer,{fluid:!0,style:{position:"absolute",zIndex:"100",padding:"0px"}},n.a.createElement(v.MDBRow,{center:!0,className:"w-100"},n.a.createElement(v.MDBBtn,{color:"mdb-color",onClick:function(){return e.props.zoomMap(!0)}},"ZoomIn"),n.a.createElement(v.MDBBtn,{color:"mdb-color",onClick:function(){return e.props.zoomMap(!1)}},"ZoomOut"),n.a.createElement(v.MDBBtn,{color:"mdb-color",onClick:this.turnOffOn},!1===this.props.toggle?"Turn Off Markers":"Turn On Markers"),n.a.createElement(v.MDBBtn,{color:"mdb-color",onClick:this.loadMarkers},!1===this.props.loaded?"Load Markers":"Loaded"),n.a.createElement(v.MDBBtn,{color:"mdb-color",onClick:this.saveMarkers},this.state.saveStatus,n.a.createElement(v.MDBBadge,{color:"info",pill:!0,style:{marginLeft:"5px",marginBottom:"5px"}},this.props.markers.length)),n.a.createElement(v.MDBDropdown,{style:{display:"inline-flex"},onClick:this.onChooseHandler},n.a.createElement(v.MDBDropdownToggle,{caret:!0,color:"mdb-color"},"Select type"),n.a.createElement(v.MDBDropdownMenu,null,n.a.createElement(v.MDBDropdownItem,{value:"None"},"None"),n.a.createElement(v.MDBDropdownItem,{value:"gas_station"},"Gas stations"),n.a.createElement(v.MDBDropdownItem,{value:"pharmacy"},"Pharmacies"),n.a.createElement(v.MDBDropdownItem,{value:"school"},"Schools"),n.a.createElement(v.MDBDropdownItem,{value:"restaurant"},"Restaurants")))))}}]),t}(r.Component);var Y=Object(C.b)(function(e){return{toggle:e.map.toggleMarkers,currentCenter:e.map.center,markers:e.map.markers,loaded:e.map.loaded,dataBase:e.map.dataBase,google:e.map.google}},function(e){return{zoomMap:function(t){return e(F(t))},toggleMarkers:function(t){return e(q(t))},currentMarkers:function(t){return e(J(t))},loadedStatus:function(t){return e(Z(t))},setDatabase:function(t){return e(W(t))}}})(Q),$=function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={toggle:!1,update:!1,renamePlace:"",disableInput:!0,renameMarkerIndex:0,nameValue:"",nameChange:!1,currentMarker:{},error:!1},a.toggleInfo=function(){a.setState({toggle:!a.state.toggle})},a.toggleRenameMarker=function(e){a.setState({disableInput:!1,renamePlace:a.props.markers[e].name,renameMarkerIndex:e})},a.handleInput=function(e){a.setState({renamePlace:e.target.value})},a.renameMarker=function(e){var t=a.props.markers;Object.assign(t[a.state.renameMarkerIndex],{name:a.state.renamePlace}),a.props.currentMarkers(t.map(function(e){return e})),a.setState({disableInput:!0,renamePlace:"",renameMarkerIndex:0})},a.deleteMarker=function(e){var t=a.props.markers,r=t.splice(e,1);a.props.currentMarkers(t.filter(function(e){return e!==r}))},a.lightMarker=function(e,t){var r=!0,n=!1,o=void 0;try{for(var l,s=a.props.markers[Symbol.iterator]();!(r=(l=s.next()).done);r=!0){var c=l.value;c.icon&&c.type&&delete c.icon,c.type||(c.icon="https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png")}}catch(u){n=!0,o=u}finally{try{r||null==s.return||s.return()}finally{if(n)throw o}}var i=a.props.markers;if(i[t]===a.state.currentMarker)return a.setState({currentMarker:{}}),i[t].type?delete i[t].icon:i[t].icon="https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png",a.props.currentMarkers(i.map(function(e){return e}));Object.assign(i[t],{icon:"https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/64/Map-Marker-Marker-Outside-Pink.png"}),a.setState({currentMarker:i[t]}),a.props.currentMarkers(i.map(function(e){return e}))},a.renderMarkers=function(){var e=a.props.markers;return Object.keys(e).map(function(t,r){var o=e[t];if(e.length>0)return n.a.createElement(v.MDBListGroupItem,{className:a.state.currentMarker===o?"list-item chosen-item":"list-item",key:r},n.a.createElement("p",{onClick:function(){return a.lightMarker(o,r)}},o.name),n.a.createElement("div",null,!!o.type&&n.a.createElement(v.MDBIcon,{className:"icon",onClick:function(){return a.toggleRenameMarker(r)},icon:"edit"}),n.a.createElement(v.MDBIcon,{className:"icon",onClick:function(){return a.deleteMarker(r)},icon:"trash"})))})},a.userName=function(){var e=!0,t=!1,r=void 0;try{for(var n,o=a.props.dataBase[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var l=n.value;if(l.userId===localStorage.getItem("userId"))return l.userName}}catch(s){t=!0,r=s}finally{try{e||null==o.return||o.return()}finally{if(t)throw r}}return"UserName"},a.inputName=function(e){a.setState({nameValue:e.target.value})},a.changeName=function(){var e=!0,t=!1,r=void 0;try{for(var n,o=a.props.dataBase[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var l=n.value;l.userId===localStorage.getItem("userId")&&(l.userName=a.state.nameValue,a.setState({nameValue:"",nameChange:!1}))}}catch(s){t=!0,r=s}finally{try{e||null==o.return||o.return()}finally{if(t)throw r}}},a.toggleInputName=function(){var e=!0,t=!1,r=void 0;try{for(var n,o=a.props.dataBase[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var l=n.value;if(l.userId===localStorage.getItem("userId"))return a.setState({nameChange:!0,nameValue:l.userName,error:!1})}}catch(s){t=!0,r=s}finally{try{e||null==o.return||o.return()}finally{if(t)throw r}}return a.setState({error:!0})},a.burnThemAll=function(){a.props.currentMarkers([]),a.props.loadedStatus(!1)},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:this.state.toggle?"user-info":"user-info closed"},n.a.createElement(v.MDBBtn,{size:"sm",gradient:"blue",className:"open-close-info",onClick:this.toggleInfo},this.state.toggle?"Close Info":"Open Info"),n.a.createElement("div",{className:"user-info-wrapper"},n.a.createElement("div",null,n.a.createElement("div",{className:"account-name"},"Account Name: ",this.userName()," ",n.a.createElement(v.MDBIcon,{onClick:this.toggleInputName,icon:"edit"})),!!this.state.error&&n.a.createElement("p",null,"You must save markers first"),!!this.state.nameChange&&n.a.createElement("div",{className:"input-block"},n.a.createElement(v.MDBInput,{label:"Account Name",value:this.state.nameValue,onInput:this.inputName}),n.a.createElement("button",{className:"icon-btn"},n.a.createElement(v.MDBIcon,{onClick:this.changeName,icon:"check"}))),!this.state.disableInput&&n.a.createElement("div",{className:"input-block"},n.a.createElement(v.MDBInput,{label:"Marker Name",value:this.state.renamePlace,onInput:this.handleInput}),n.a.createElement("button",{className:"icon-btn"},n.a.createElement(v.MDBIcon,{onClick:this.renameMarker,icon:"check"})))),n.a.createElement("div",{className:"user-items-block"},this.props.markers.length>0?n.a.createElement("div",null,n.a.createElement(v.MDBListGroup,{className:"user-list scrollbar scrollbar-black bordered-black square"},this.renderMarkers()),n.a.createElement(v.MDBBtn,{className:"delete-btn",onClick:this.burnThemAll,color:"danger",size:"sm"},"Delete all markers")):n.a.createElement("p",{className:"user-list"},"There's no markers yet"))))}}]),t}(r.Component);var ee=Object(C.b)(function(e){return{zoom:e.map.zoom,toggle:e.map.toggleMarkers,currentCenter:e.map.center,markers:e.map.markers,copyMarkers:e.map.copyMarkers,dataBase:e.map.dataBase}},function(e){return{currentMarkers:function(t){return e(J(t))},loadedStatus:function(t){return e(Z(t))}}})($),te=(a(100),function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(n))))._isMounted=!1,a.state={scrollwheel:!1,dataBaseLoaded:!1,disableDefaultUI:!0,markersPosition:[],showingInfoWindow:!1,activeMarker:{},selectedPlace:{}},a.onMapChange=function(e,t,r){a.state.showingInfoWindow&&a.setState({showingInfoWindow:!1,activeMarker:null});var n={lat:r.latLng.lat(),lng:r.latLng.lng(),type:"custom",name:"Marker"},o=a.state.markersPosition;o.push(n),a.setState({markersPosition:o});var l=a.props.markers.concat(n);a.props.currentMarkers(l),a.props.toggle&&a.props.toggleMarkers(!1)},a.onMarkerClick=function(e,t){a.setState({selectedPlace:e,activeMarker:t,showingInfoWindow:!0})},a.centerMoved=function(e,t){var r={lat:t.center.lat(),lng:t.center.lng()};a.props.setCenter(r)},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"setMarker",value:function(){var e=this,t=this.props.toggle?[]:this.props.markers;return Object.keys(t).map(function(a,r){var o=t[a];return n.a.createElement(H.Marker,{onClick:e.onMarkerClick,title:o.name,position:o,name:o.name,key:r,icon:o.icon})})}},{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0,fetch("https://api.jsonbin.io/b/5c2957343f8bd92e4cc5fed1/latest",{method:"GET",headers:{"Content-type":"application/json"}}).then(function(e){return e.json()}).then(function(t){if(e._isMounted){console.log(t);var a=t,r=!0,n=!1,o=void 0;try{for(var l,s=a[Symbol.iterator]();!(r=(l=s.next()).done);r=!0){var c=l.value;c.userName||(c.userName="UserName")}}catch(i){n=!0,o=i}finally{try{r||null==s.return||s.return()}finally{if(n)throw o}}e.setState({dataBaseLoaded:!0}),e.props.setDatabase(a)}}).catch(function(e){console.log(e)}),this.setMarker()}},{key:"componentWillUnmount",value:function(){this.props.currentMarkers(this.props.copyMarkers),this._isMounted=!1}},{key:"render",value:function(){var e=this;return n.a.createElement(v.MDBContainer,{fluid:!0,style:{padding:"0px"}},n.a.createElement(Y,null),n.a.createElement(K,null,n.a.createElement(H.Map,{onDragend:this.centerMoved,disableDoubleClickZoom:!0,scrollwheel:!1,zoomControl:!1,scaleControl:!1,gestureHandling:"greedy",onReady:function(t){return e.props.setGoogleObject(t.google)},google:window.google,zoom:this.props.zoom,className:"map",initialCenter:this.props.currentCenter,disableDefaultUI:!0,onClick:this.onMapChange},this.setMarker(this.props.markers),n.a.createElement(H.InfoWindow,{marker:this.state.activeMarker,visible:this.state.showingInfoWindow},n.a.createElement("div",null,n.a.createElement("h1",null,this.state.selectedPlace.name)))),n.a.createElement(ee,null)))}}]),t}(r.Component));var ae=Object(C.b)(function(e){return{zoom:e.map.zoom,toggle:e.map.toggleMarkers,currentCenter:e.map.center,markers:e.map.markers,loaded:e.map.loaded,copyMarkers:e.map.copyMarkers,dataBase:e.map.dataBase}},function(e){return{setCenter:function(t){return e(function(e){return{type:T,center:e}}(t))},currentMarkers:function(t){return e(J(t))},setDatabase:function(t){return e(W(t))},toggleMarkers:function(t){return e(q(t))},setGoogleObject:function(t){return e(function(e){return{type:P,data:e}}(t))}}})(te),re=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.logout(),this.props.currentMarkers([]),this.props.setDatabase([]),this.props.loadedStatus(!1)}},{key:"render",value:function(){return n.a.createElement(f.a,{to:"/"})}}]),t}(r.Component);var ne=Object(C.b)(null,function(e){return{setDatabase:function(){return e(W([]))},loadedStatus:function(){return e(Z(!1))},logout:function(){return e(U())},currentMarkers:function(){return e(J([]))}}})(re),oe=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.autoLogin()}},{key:"render",value:function(){var e,t=n.a.createElement(p.a,null,n.a.createElement(d.a,{path:"/auth",component:V}),n.a.createElement(f.a,{to:"/auth"}));return this.props.isAuthenticated&&(t=n.a.createElement(p.a,null,n.a.createElement(d.a,{path:"/",exact:!0,component:ae}),n.a.createElement(d.a,{path:"/about",component:k}),n.a.createElement(d.a,{path:"/logout",component:ne}),n.a.createElement(f.a,{to:"/"})),e=n.a.createElement(b,null)),n.a.createElement(g,null,e,t)}}]),t}(r.Component);var le=Object(h.a)(Object(C.b)(function(e){return{isAuthenticated:!!e.auth.token}},function(e){return{autoLogin:function(){return e(function(e){var t=localStorage.getItem("token");if(t){var a=new Date(localStorage.getItem("expirationDate"));a<=new Date?e(U()):(e(R(t)),e(_((a.getTime()-(new Date).getTime())/1e3)))}else e(U())})}}})(oe)),se=a(26),ce=a(16),ie={token:null};var ue={center:{lat:46.482753,lng:30.735552},loaded:!1,loadStatus:"Load Markers",markers:[],dataBase:[],google:"",copyMarkers:[],toggleMarkers:!1,zoom:15};var me=Object(ce.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case N:return Object(y.a)({},e,{token:t.token});case j:return Object(y.a)({},e,{token:null});default:return e}},map:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case P:return Object(y.a)({},e,{google:t.data});case z:return Object(y.a)({},e,{dataBase:t.data});case T:return Object(y.a)({},e,{center:t.center});case L:return Object(y.a)({},e,{loaded:t.status});case A:return Object(y.a)({},e,{markers:t.markers,copyMarkers:t.markers});case x:return Object(y.a)({},e,{toggleMarkers:t.toggle});case D:return Object(y.a)({},e,{zoom:e.zoom+1});case B:return Object(y.a)({},e,{zoom:e.zoom-1});default:return e}}}),pe=a(46),de="object"===typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):ce.d,fe=Object(ce.e)(me,de(Object(ce.a)(pe.a))),he=n.a.createElement(C.a,{store:fe},n.a.createElement(se.a,null,n.a.createElement(le,null)));l.a.render(he,document.getElementById("root"))},47:function(e,t,a){e.exports=a(102)},58:function(e,t,a){},80:function(e,t,a){},82:function(e,t,a){}},[[47,2,1]]]);
//# sourceMappingURL=main.aab24b4e.chunk.js.map