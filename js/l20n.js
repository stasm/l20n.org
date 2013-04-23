'use strict';(function(){function e(a,c){function g(a){if(a)return r.source?(a=new l.Promise,a.fulfill(),a):l.IO.loadAsync(r.id).then(function(a){r.source=a});r.source||(r.source=l.IO.loadSync(r.id))}function k(){r.ast=c.parse(r.source)}function m(a,b){r.ast.body.filter(function(a,b){return"ImportStatement"==a.type?(p.push(b),!0):!1}).forEach(function(a){a=a.uri.content;if(!(null===r.id||"/"==a[0])){var b=r.id.split("/").slice(0,-1).join("/");b?("/"==b[b.length-1]&&(b=b.slice(0,b.length-1)),a=b+"/"+
a):a="./"+a}a=new e(a,c);r.resources.push(a)});var g=[];r.resources.forEach(function(c){g.push(c.build(a,b))});if(b)return l.Promise.all(g)}function E(){for(var a=r.resources.length-1;0<=a;a--)Array.prototype.splice.apply(r.ast.body,[p[a]||0,1].concat(r.resources[a].ast.body));r.isReady=!0}var r=this;this.id=a;this.resources=[];this.source=null;this.isReady=!1;this.ast={type:"LOL",body:[]};this.build=function(a,c){if(7<=a)throw new b("Too many nested imports.");if(c)return g(c).then(k).then(m.bind(this,
a+1,c)).then(E);g(c);k();m(a+1,c);E()};var p=[]}function c(a,b,c){function g(a){var b=[];r.resources.forEach(function(c){b.push(c.build(0,a))});if(a)return l.Promise.all(b)}function e(){r.ast.body=r.resources.reduce(function(a,b){return a.concat(b.ast.body)},r.ast.body)}function k(){r.entries=c.compile(r.ast);r.isReady=!0}this.id=a;this.resources=[];this.entries=null;this.ast={type:"LOL",body:[]};this.isReady=!1;this.build=function(a){return!a?(g(a),e(),k(),this):g(a).then(e).then(k)};this.getEntry=
function(a){if(this.entries.hasOwnProperty(a))return this.entries[a]};var r=this}function g(a){function g(a,f,n){if(!G){if(!n)throw new b("Context not ready");return this.addEventListener("ready",g.bind(this,a,f,n))}var c=A(0,a,f);n&&(n(c.value),d.registerGet({id:n,callback:g.bind(this,a,f,n),globals:c.globals}));return c.value}function s(a,f,n){if(!G){if(!n)throw new b("Context not ready");return this.addEventListener("ready",s.bind(this,a,f,n))}var c=A(0,a,f);n&&(n(c),d.registerGet({id:n,callback:s.bind(this,
a,f,n),globals:c.globals}));return c}function z(a,f){for(var n={},b=0,c;c=a[b];b++)Array.isArray(c)?n[c[0]]=s(c[0],c[1]):n[c]=s(c);var g={};Object.keys(n).forEach(function(a){Object.keys(n[a].globals).forEach(function(a){g[a]=!0})});b={entities:n,globals:Object.keys(g)};f&&(f(b),d.registerGet({id:f,callback:z.bind(this,a,f),globals:b.globals}));return b}function A(a,f,d,b){var c;c=0==q.length-a?t:D[q[a]];if(!c)return a=new k("Entity couldn't be retrieved",f,q),w.emit("error",a),{value:b?b:f,attributes:{},
globals:{}};c.isReady||c.build(!1);var g=c.getEntry(f);if(void 0===g)return w.emit("error",new m("Not found",f,c.id)),A(a+1,f,d,b);try{return g.get(E.bind(this,d))}catch(e){if(e instanceof l.Compiler.RuntimeError)return w.emit("error",new m(e.message,f,c.id)),A(a+1,f,d,b||e.source);throw e;}}function E(a){if(!a)return this.data;var f={},d;for(d in this.data)this.data.hasOwnProperty(d)&&(f[d]=this.data[d]);if(a)for(d in a)a.hasOwnProperty(d)&&(f[d]=a[d]);return f}function r(){G=!0;w.emit("ready")}
function p(a){w.emit("error",a)}this.id=a;this.data={};this.addResource=function(a){if(0===q.length)t=new c(null,y,F);else throw new b("Can't use addResource with registered languages");var f=new e(null,y);f.source=a;t.resources.push(f)};this.linkResource=function(a){if("function"===typeof a){if(0===q.length)throw new b("No registered languages");for(var f in D){var d=new e(a(f),y);D[f].resources.push(d)}return!0}a=new e(a,y);if(0!==q.length)for(d in D)D[d].resources.push(a);else void 0===t&&(t=new c(null,
y,F)),t.resources.push(a);return!0};this.registerLocales=function(){for(var a in arguments){var d=arguments[a];q.push(d);D[d]=new c(d,y,F)}};this.freeze=function(){return(0<q.length?D[q[0]]:t).build(!0).then(r)};this.get=g;this.getEntity=s;this.localize=function(a,d){if(!G)throw new b("Context not ready");return z(a,d)};this.addEventListener=function(a,d){w.addEventListener(a,d)};this.removeEventListener=function(a,d){w.removeEventListener(a,d)};var q=[],D={},t,G=!1,w=new l.EventEmitter,y=new l.Parser(l.EventEmitter),
F=new l.Compiler(l.EventEmitter,l.Parser),d=new l.GlobalsManager;y.addEventListener("error",p);F.addEventListener("error",p);F.setGlobals(d.globals)}function b(a){this.name="ContextError";this.message=a}function m(a,c,g){b.call(this,a);this.name="EntityError";this.id=c;this.lang=g;this.message="["+g+"] "+c+": "+a}function k(a,c,g){b.call(this,a);this.name="GetError";this.id=c;this.tried=g;this.message=g.length?c+": "+a+"; tried "+g.join(", "):c+": "+a}var l={Context:g,getContext:function(a){return new g(a)}};
g.Error=b;g.EntityError=m;b.prototype=Object.create(Error.prototype);b.prototype.constructor=b;m.prototype=Object.create(b.prototype);m.prototype.constructor=m;k.prototype=Object.create(b.prototype);k.prototype.constructor=k;this.L20n=l}).call(this);
(function(){var e=function(){this._state=0;this._value=null;this._cb={fulfilled:[],rejected:[]};this._thenPromises=[]};e.all=function(c){function g(){m--;0==m&&b.fulfill()}var b=new e,m=c.length;if(0==m)return b.fulfill(),b;for(var k in c)c[k].then(g,g);return b};e.prototype.then=function(c,g){this._cb.fulfilled.push(c);this._cb.rejected.push(g);var b=new e;this._thenPromises.push(b);0<this._state&&setTimeout(this._processQueue.bind(this),0);return b};e.prototype.fulfill=function(c){if(0!=this._state)return this;
this._state=1;this._value=c;this._processQueue();return this};e.prototype.reject=function(c){if(0!=this._state)return this;this._state=2;this._value=c;this._processQueue();return this};e.prototype._processQueue=function(){for(;this._thenPromises.length;){var c=this._cb.fulfilled.shift(),g=this._cb.rejected.shift();this._executeCallback(1==this._state?c:g)}};e.prototype._executeCallback=function(c){var g=this._thenPromises.shift();if("function"!=typeof c)1==this._state?g.fulfill(this._value):g.reject(this._value);
else try{var b=c(this._value);b&&"function"==typeof b.then?b.then(function(b){g.fulfill(b)},function(b){g.reject(b)}):g.fulfill(b)}catch(e){g.reject(e)}};this.L20n.Promise=e}).call(this);
(function(){this.L20n.IO={load:function(e,c){return c?this.loadAsync(e):this.loadSync(e)},loadAsync:function(e){var c=new L20n.Promise,g=new XMLHttpRequest;g.overrideMimeType("text/plain");g.addEventListener("load",function(){200==g.status?c.fulfill(g.responseText):c.reject()});g.addEventListener("abort",function(b){return c.reject(b)});g.open("GET",e,!0);g.send("");return c},loadSync:function(e){new L20n.Promise;var c=new XMLHttpRequest;c.overrideMimeType("text/plain");c.open("GET",e,!1);c.send("");
return 200==c.status?c.responseText:""}}}).call(this);
(function(){function e(g){function b(){for(var d=[],f,b;;){f=s();b=[];"["===j.charAt(h)&&(++h,a(),b=x(p,"]"));a();if(":"!==j.charAt(h))throw u('Expected ":"');++h;a();f={type:void 0,key:f,value:k(),index:b};f.local="_"===f.key.name.charAt(0);d.push(f);f=l();b=j.charAt(h);if(">"===b)break;else if(!f)throw u('Expected ">"');}return d}function e(a){for(var d=a.length,f=h+d,b=j.indexOf(a,f);-1!==b&&92===j.charCodeAt(b-1)&&92!==j.charCodeAt(b-2);)b=j.indexOf(a,b+d);if(-1===b)throw u("Unclosed string literal");
a=j.slice(f,b);h=b+d;return{type:"String",content:a}}function k(d,f){void 0===f&&(f=j.charAt(h));if("'"===f||'"'===f)return f===j.charAt(h+1)&&f===j.charAt(h+2)?e(f+f+f):e(f);if("{"===f){var b;++h;a();if("}"===j.charAt(h))++h,b={type:"Hash",content:[]};else{var c,v;for(b=[];;){c=!1;if("*"===j.charAt(h)){++h;if(c)throw u("Default item redefinition forbidden");c=!0}v=s();a();if(":"!==j.charAt(h))throw u('Expected ":"');++h;a();v={type:"HashItem",key:v,value:k()};v["default"]=c;b.push(v);a();if(c=","===
j.charAt(h))++h,a();if("}"===j.charAt(h)){++h;break}if(!c)throw u('Expected "}"');}b={type:"Hash",content:b}}return b}if(!d)throw u("Unknown value type");return null}function l(){for(var a=h,d=j.charCodeAt(a);32===d||10===d||9===d||13===d;)d=j.charCodeAt(++h);return h!==a}function a(){for(var a=j.charCodeAt(h);32===a||10===a||9===a||13===a;)a=j.charCodeAt(++h)}function C(){++h;return{type:"VariableExpression",id:s()}}function s(){var a=h,d=a,f=j,b=f.charCodeAt(d);if((97>b||122<b)&&(65>b||90<b)&&95!==
b)throw u("Identifier has to start with [a-zA-Z]");for(b=f.charCodeAt(++a);95<=b&&122>=b||65<=b&&90>=b||48<=b&&57>=b||95===b;)b=f.charCodeAt(++a);h+=a-d;return{type:"Identifier",name:f.slice(d,a)}}function z(d,f){if(!l())throw u("Expected white space");var c=j.charAt(h),v=k(!0,c),n=[];if(null===v)if(">"!==c)n=b();else throw u('Expected ">"');else if(c=l(),">"!==j.charAt(h)){if(!c)throw u('Expected ">"');n=b()}a();++h;return{type:"Entity",id:d,value:v,index:f,attrs:n,local:95===d.name.charCodeAt(0)}}
function A(){var d=j.charCodeAt(h);if(60===d){++h;var f=s(),d=j.charCodeAt(h);if(40===d){if("_"===f.name.charAt(0))throw u('Macro ID cannot start with "_"');++h;d=x(C,")");l();if("{"!==j.charAt(h))throw u('Expected "{"');++h;a();var b=t();a();if("}"!==j.charAt(h))throw u('Expected "}"');++h;a();if(62!==j.charCodeAt(h))throw u('Expected ">"');++h;return{type:"Macro",id:f,args:d,expression:b}}return 91===d?(++h,z(f,x(p,"]"))):z(f,[])}if(47===j.charCodeAt(h)&&42===j.charCodeAt(h+1)){f=h+=2;d=j.indexOf("*/",
f);if(-1===d)throw u("Comment without closing tag");h=d+2;return{type:"Comment",content:j.slice(f,d)}}if("import"===j.slice(h,h+6)){h+=6;if("("!==j.charAt(h))throw u('Expected "("');++h;a();f=e(j.charAt(h));a();if(")"!==j.charAt(h))throw u('Expected ")"');++h;return{type:"ImportStatement",uri:f}}throw u("Invalid entry");}function E(){var d=[];for(a();h<H;){try{d.push(A())}catch(f){if(f instanceof c)I.emit("error",f),d.push(M());else throw f;}h<H&&a()}return{type:"LOL",body:d}}function r(){var d=[];
for(a();h<H;)d.push(A()),h<H&&a();return{type:"LOL",body:d}}function p(){return t()}function q(d,f,b,c){for(var v=c(),n,g;;){n="";a();g=j.charAt(h);if(-1===d[0].indexOf(g))break;n+=g;++h;if(1<d.length)if(g=j.charAt(h),d[1]==g)++h,n+=g;else if(d[2]){--h;break}a();v={type:f,operator:{type:b,token:n},left:v,right:c()}}return v}function D(d,f,b,c){var v=j.charCodeAt(h);if(-1===d.indexOf(v))return c();++h;a();return{type:f,operator:{type:b,token:String.fromCharCode(v)},argument:D(d,f,b,c)}}function t(){var d=
q([["|"],"|",!0],"LogicalExpression","LogicalOperator",G);a();if(63!==j.charCodeAt(h))return d;++h;a();var f=t();a();if(58!==j.charCodeAt(h))throw u('Expected ":"');++h;a();return{type:"ConditionalExpression",test:d,consequent:f,alternate:t()}}function G(){return q([["&"],"&",!0],"LogicalExpression","Logicalperator",w)}function w(){return q([["="],"=",!0],"BinaryExpression","BinaryOperator",y)}function y(){return q([["<",">"],"=",!1],"BinaryExpression","BinaryOperator",F)}function F(){return q([["+",
"-"]],"BinaryExpression","BinaryOperator",d)}function d(){return q([["%"]],"BinaryExpression","BinaryOperator",v)}function v(){return q([["*"]],"BinaryExpression","BinaryOperator",f)}function f(){return q([["/"]],"BinaryExpression","BinaryOperator",n)}function n(){return D([43,45,33],"UnaryExpression","UnaryOperator",L)}function K(d,f){if("ParenthesisExpression"!==d.type&&"CallExpression"!==d.type&&"Identifier"!==d.type&&"ThisExpression"!==d.type)throw u("AttributeExpression must have Identifier, This, Call or Parenthesis as left node");
var b;if(f){a();b=t();a();if("]"!==j.charAt(h))throw u('Expected "]"');++h;return{type:"AttributeExpression",expression:d,attribute:b,computed:!0}}b=s();return{type:"AttributeExpression",expression:d,attribute:b,computed:!1}}function L(){var d;if(40===j.charCodeAt(h)){++h;a();var f={type:"ParenthesisExpression",expression:t()};a();if(41!==j.charCodeAt(h))throw u('Expected ")"');++h;d=f}else d=B();for(;;)if(f=j.charCodeAt(h),46===f||91===f){++h;var b=void 0;if(91===f){a();b=t();a();if("]"!==j.charAt(h))throw u('Expected "]"');
++h;d={type:"PropertyExpression",expression:d,property:b,computed:!0}}else b=s(),d={type:"PropertyExpression",expression:d,property:b,computed:!1}}else if(58===f&&58===j.charCodeAt(h+1))h+=2,91===j.charCodeAt(h)?(++h,d=K(d,!0)):d=K(d,!1);else if(40===f)++h,f=d,a(),d={type:"CallExpression",callee:f,arguments:x(p,")")};else break;return d}function B(){for(var d=h,a=j.charCodeAt(d);47<a&&58>a;)a=j.charCodeAt(++d);if(d>h)return a=h,h=d,{type:"Number",value:parseInt(j.slice(a,d),10)};switch(a){case 39:case 34:case 123:case 91:return k();
case 36:return C();case 64:return++h,{type:"GlobalsExpression",id:s()};case 126:return++h,{type:"ThisExpression"};default:return s()}}function x(d,f){var b;a();if(j.charAt(h)===f)return++h,[];for(var c=[];;)if(c.push(d()),a(),b=j.charAt(h),","===b)++h,a();else if(b===f){++h;break}else throw u('Expected "," or "'+f+'"');return c}function u(d,a){void 0===a&&(a=h);var f=j.lastIndexOf("<",a-1),b=j.lastIndexOf(">",a-1),f=j.slice(b>f?b+1:f,a+10);return new c(d+" at pos "+a+': "'+f+'"',a,f)}function M(){var d=
j.indexOf("<",h),a;if(-1===d)return a={type:"JunkEntry",content:j.slice(h)},h=H,a;a={type:"JunkEntry",content:j.slice(h,d)};h=d;return a}this.parse=function(d){j=d;h=0;H=j.length;return J()};this.parseString=function(d){j=d;h=0;H=j.length;try{var f;var b,v;d=h;for(var n=!1,e=j.indexOf("\\");-1!==e;){b=j.charAt(e+1);if('"'==b||"'"==b||"\\"==b)j=j.substr(0,e)+j.substr(e+1);e=j.indexOf("\\",e+1)}for(e=j.indexOf("{{");-1!==e;)if(92===j.charCodeAt(e-1))j=j.substr(0,e-1)+j.substr(e),e=j.indexOf("{{",e+
2);else{n||(v=[],n=!0);d<e&&v.push({type:"String",content:j.slice(d,e)});h=e+2;a();v.push(t());a();if(125!==j.charCodeAt(h)||125!==j.charCodeAt(h+1))throw u('Expected "}}"');d=e=h+2;e=j.indexOf("{{",e)}n?(d<H&&v.push({type:"String",content:j.slice(d)}),f={type:"ComplexString",content:v}):f={type:"String",content:j};return f}catch(l){throw g&&l instanceof c&&I.emit("error",l),l;}};this.addEventListener=function(d,a){if(!I)throw Error("Emitter not available");return I.addEventListener(d,a)};this.removeEventListener=
function(d,a){if(!I)throw Error("Emitter not available");return I.removeEventListener(d,a)};var j,h,H,I,J;g?(I=new g,J=E):J=r}function c(c,b,e){this.name="ParserError";this.message=c;this.pos=b;this.context=e}e.Error=c;c.prototype=Object.create(Error.prototype);c.prototype.constructor=c;"undefined"!==typeof exports?exports.Parser=e:this.L20n?this.L20n.Parser=e:this.L20nParser=e}).call(this);
(function(){var e=function(){function b(e){e=new e;c[e.id]=e;g[e.id]=0;e.addEventListener("change",function(b){for(var c=0;c<a.length;c++)-1!==a[c].globals.indexOf(b)&&a[c].callback()})}var c={},a=[],g={};this.registerGlobal=b;this.registerGet=function(b){for(var e=null,k=0;k<a.length;k++)if(a[k].id===b.id){e=a[k];break}e?0==b.globals.length?delete a[k]:(b.globals.filter(function(a){return-1===e.globals.indexOf(a)}).forEach(function(a){g[a]++;c[a].activate()}),e.globals.filter(function(a){return-1===
b.globals.indexOf(a)}).forEach(function(a){g[a]--;0==g[a]&&c[a].deactivate()}),e.globals=b.globals):0!=b.globals.length&&(a.push(b),b.globals.forEach(function(a){g[a]++;c[a].activate()}))};this.globals=c;for(var s in e._constructors)b(e._constructors[s])};e._constructors=[];e.registerGlobal=function(b){e._constructors.push(b)};var c=function(){this.id=null;this._emitter=new L20n.EventEmitter};c.prototype.addEventListener=function(b,c){if("change"!==b)throw"Unknown event type";this._emitter.addEventListener(b,
c)};c.prototype.activate=function(){};c.prototype.deactivate=function(){};e.Global=c;L20n.GlobalsManager=e;var g=function(){function b(){e=document.body.clientWidth;a._emitter.emit("change",a.id)}c.call(this);this.id="screen";this.get=function(){e||(e=document.body.clientWidth);return{width:e}};this.activate=function(){this.isActive||(window.addEventListener("resize",b),this.isActive=!0)};this.isActive=!1;var e=null,a=this};g.prototype=Object.create(c.prototype);g.prototype.constructor=g;var b=function(){c.call(this);
this.id="os";this.get=function(){return/^MacIntel/.test(navigator.platform)?"mac":/^Linux/.test(navigator.platform)?"linux":/^Win/.test(navigatgor.platform)?"win":"unknown"}};b.prototype=Object.create(c.prototype);b.prototype.constructor=b;var m=function(){function b(){var c=new Date;c.getHours()!==a&&(a=c.getHours(),e._emitter.emit("change",e.id))}c.call(this);this.id="hour";this.get=function(){a||(a=(new Date).getHours());return a};this.activate=function(){this.isActive||(s=setTimeout(function(){b();
s=setInterval(b,g)},g-(new Date).getTime()%g),this.isActive=!0)};this.deactivate=function(){a=null;clearInterval(s);this.isActive=!1};this.isActive=!1;var e=this,a=null,g=36E5,s=null};m.prototype=Object.create(c.prototype);m.prototype.constructor=m;e.registerGlobal(g);e.registerGlobal(b);e.registerGlobal(m)}).call(this);
(function(){function e(){this._listeners={}}e.prototype.emit=function(){var c=Array.prototype.slice.call(arguments),e=c.shift(),e=this._listeners[e];if(!e||!e.length)return!1;e.forEach(function(b){b.apply(this,c)},this);return!0};e.prototype.addEventListener=function(c,e){this._listeners[c]||(this._listeners[c]=[]);this._listeners[c].push(e);return this};e.prototype.removeEventListener=function(c,e){var b=this._listeners[c].indexOf(e);if(-1===b)return this;listeners.splice(b,1);return this};"undefined"!==
typeof exports?exports.EventEmitter=e:this.L20n?this.L20n.EventEmitter=e:this.L20nEventEmitter=e}).call(this);
(function(){function e(a,c){var e;function z(a,b,f,c){a=new a(b,f,c);t&&t.emit("error",a);return a}function A(a){this.id=a.id.name;this.local=a.local||!1;this.index=[];this.attributes={};this.publicAttributes=[];var b;for(b=0;b<a.index.length;b++)this.index.push(p(a.index[b],this));for(b=0;b<a.attrs.length;b++){var f=a.attrs[b];this.attributes[f.key.name]=new E(f,this);f.local||this.publicAttributes.push(f.key.name)}this.value=p(a.value,this,this.index)}function E(a,b){this.key=a.key.name;this.local=
a.local||!1;this.index=[];for(var f=0;f<a.index.length;f++)this.index.push(p(a.index[f],this));this.value=p(a.value,b,this.index);this.entity=b}function r(a){this.id=a.id.name;this.local=a.local||!1;this.expression=p(a.expression,this);this.args=a.args}function p(a,b,f){if(!a)return null;if(!F[a.type])throw z("CompilationError","Unknown expression type"+a.type);f&&(f=f.slice());return F[a.type](a,b,f)}function q(a,b,f){if(!a||"string"===typeof a||"boolean"===typeof a||"number"===typeof a)return a;
if(a._resolve)return a._resolve(f);a=a(b,f);b=a[0];a=a[1];return q(a,b,f)}function D(a,c){if("=="==a)return function(a,d){if(("number"!==typeof a||"number"!==typeof d)&&("string"!==typeof a||"string"!==typeof d))throw new b("The == operator takes two numbers or two strings",c);return a==d};if("!="==a)return function(a,d){if(("number"!==typeof a||"number"!==typeof d)&&("string"!==typeof a||"string"!==typeof d))throw new b("The != operator takes two numbers or two strings",c);return a!=d};if("<"==a)return function(a,
d){if("number"!==typeof a||"number"!==typeof d)throw new b("The < operator takes two numbers",c);return a<d};if("<="==a)return function(a,d){if("number"!==typeof a||"number"!==typeof d)throw new b("The <= operator takes two numbers",c);return a<=d};if(">"==a)return function(a,d){if("number"!==typeof a||"number"!==typeof d)throw new b("The > operator takes two numbers",c);return a>d};if(">="==a)return function(a,d){if("number"!==typeof a||"number"!==typeof d)throw new b("The >= operator takes two numbers",
c);return a>=d};if("+"==a)return function(a,d){if(("number"!==typeof a||"number"!==typeof d)&&("string"!==typeof a||"string"!==typeof d))throw new b("The + operator takes two numbers or two strings",c);return a+d};if("-"==a)return function(a,d){if("number"!==typeof a||"number"!==typeof d)throw new b("The - operator takes numbers",c);return a-d};if("*"==a)return function(a,d){if("number"!==typeof a||"number"!==typeof d)throw new b("The * operator takes numbers",c);return a*d};if("/"==a)return function(a,
d){if("number"!==typeof a||"number"!==typeof d)throw new b("The / operator takes two numbers",c);if(0==d)throw new b("Division by zero not allowed.",c);return a/d};if("%"==a)return function(a,d){if("number"!==typeof a||"number"!==typeof d)throw new b("The % operator takes two numbers",c);return a%d};throw z(g,"Unknown token: "+a,c);}this.compile=function(a){w={};for(var b={Entity:A,Macro:r},f=0,c;c=a.body[f];f++){var e=b[c.type];if(e)try{w[c.id.name]=new e(c)}catch(g){l(g)}}return w};this.setGlobals=
function(a){y=a;return!0};this.addEventListener=function(a,b){if(!t)throw Error("Emitter not available");return t.addEventListener(a,b)};this.removeEventListener=function(a,b){if(!t)throw Error("Emitter not available");return t.removeEventListener(a,b)};this.reset=function(){w={};y={};e={};return this};var t=a?new a:null,G=c?new c:null,w={},y={};e={};A.prototype._yield=function(a,b){return this.value({__this__:this},a,b)};A.prototype._resolve=function(a){return q(this.value,{__this__:this},a)};A.prototype.getString=
function(a){try{return this._resolve(a)}catch(b){throw l(b),b instanceof m&&t&&t.emit("error",b),b;}};A.prototype.get=function(a){e={};for(var b={value:this.getString(a),attributes:{}},c=0,g;g=this.publicAttributes[c];c++)b.attributes[g]=this.attributes[g].getString(a);b.globals=e;return b};E.prototype._yield=function(a,b){return this.value({__this__:this.entity},a,b)};E.prototype._resolve=function(a){return q(this.value,{__this__:this.entity},a)};E.prototype.getString=function(a){try{return this._resolve(a)}catch(b){throw l(b),
b instanceof m&&t&&t.emit("error",b),b;}};r.prototype._call=function(a,b){for(var c={__this__:this},e=0;e<this.args.length;e++)c[this.args[e].id.name]=b[e];return this.expression(c,a)};var F={Identifier:function(a,c){var f=a.name;return function(a){if(!w.hasOwnProperty(f))throw new b("Reference to an unknown entry: "+f,c);a.__this__=w[f];return[a,w[f]]}},ThisExpression:function(){return function(a){return[a,a.__this__]}},VariableExpression:function(a,c){var f=a.id.name;return function(a,d){if(a.hasOwnProperty(f))return a[f];
if(!d||!d.hasOwnProperty(f))throw new b("Reference to an unknown variable: "+f,c);return[a,d[f]]}},GlobalsExpression:function(a,c){var f=a.id.name;return function(a){if(!y)throw new b("Globals missing (tried @"+f+").",c);if(!y.hasOwnProperty(f))throw new b("Reference to an unknown global: "+f,c);e[f]=!0;return[a,y[f].get()]}},Number:function(a){return function(b){return[b,a.value]}},String:function(a,b){var c,e;return function(g,k){if(!e){try{c=G.parseString(a.content)}catch(B){throw new m("Malformed string. "+
B.message,b,a.content);}if("String"==c.type)return[g,c.content];e=p(c,b)}try{return[g,q(e,g,k)]}catch(x){throw l(x),new m(x.message,b,a.content);}}},Hash:function(a,b,c){for(var e=[],g,m=c.length?c.shift():void 0,B=0;B<a.content.length;B++){var x=a.content[B];e[x.key.name]=p(x.value,b,c);x.default&&(g=x.key.name)}return function(a,c,d){d=[d,m,g];for(var f=[],x=0;x<d.length;x++){try{var B=d[x]=q(d[x],a,c)}catch(s){throw l(s),z(k,s.message,b);}if(void 0!==B){if("string"!==typeof B)throw z(k,"Index must be a string",
b);f.push(B);if(e.hasOwnProperty(B))return[a,e[B]]}}throw z(k,f.length?'Hash key lookup failed (tried "'+f.join('", "')+'").':"Hash key lookup failed.",b);}},HashItem:p,ComplexString:function(a,c){for(var f=[],e=0;e<a.content.length;e++)f.push(p(a.content[e],c));var g=!1;return function(a,d){if(g)throw new b("Cyclic reference detected",c);g=!0;var e=[];try{for(var n=0;n<f.length;n++){var k=q(f[n],a,d);if("string"!==typeof k&&"number"!==typeof k)throw new b("Placeables must be strings or numbers",
c);e.push(k)}}finally{g=!1}return[a,e.join("")]}},UnaryExpression:function(a,c){var f;var e=a.operator.token;if("-"==e)f=function(a){if("number"!==typeof a)throw new b("The unary - operator takes a number",c);return-a};else if("+"==e)f=function(a){if("number"!==typeof a)throw new b("The unary + operator takes a number",c);return+a};else if("!"==e)f=function(a){if("boolean"!==typeof a)throw new b("The ! operator takes a boolean",c);return!a};else throw z(g,"Unknown token: "+e,c);var k=p(a.argument,
c);return function(a,b){return[a,f(q(k,a,b))]}},BinaryExpression:function(a,b){var c=p(a.left,b),e=D(a.operator.token,b),g=p(a.right,b);return function(a,b){return[a,e(q(c,a,b),q(g,a,b))]}},LogicalExpression:function(a,c){var f=p(a.left,c),e;var k=a.operator.token;if("&&"==k)e=function(a,d){if("boolean"!==typeof a||"boolean"!==typeof d)throw new b("The && operator takes two booleans",c);return a&&d};else if("||"==k)e=function(a,d){if("boolean"!==typeof a||"boolean"!==typeof d)throw new b("The || operator takes two booleans",
c);return a||d};else throw z(g,"Unknown token: "+k,c);var l=p(a.right,c);return function(a,b){return[a,e(q(f,a,b),q(l,a,b))]}},ConditionalExpression:function(a,c){var f=p(a.test,c),e=p(a.consequent,c),g=p(a.alternate,c);return function(a,d){var k=q(f,a,d);if("boolean"!==typeof k)throw new b("Conditional expressions must test a boolean",c);return!0===k?e(a,d):g(a,d)}},CallExpression:function(a,c){for(var f=p(a.callee,c),e=[],g=0;g<a.arguments.length;g++)e.push(p(a.arguments[g],c));return function(a,
d){for(var g=[],k=0;k<e.length;k++)g.push(e[k](a,d));k=f(a,d);k=k[1];if(!k._call)throw new b("Expected a macro, got a non-callable.",c);return k._call(d,g)}},PropertyExpression:function(a,c){var e=p(a.expression,c),g=a.computed?p(a.property,c):a.property.name;return function(a,d){var k=q(g,a,d),l=e(a,d);a=l[0];l=l[1];if(l._yield)return l._yield(d,k);if("function"!==typeof l){if(!l.hasOwnProperty(k))throw new b(k+" is not defined in the context data",c);return[null,l[k]]}return l(a,d,k)}},AttributeExpression:function(a,
b){var c=p(a.expression,b),e=a.computed?p(a.attribute,b):a.attribute.name;return function(a,b){var d=q(e,a,b),g=c(a,b);a=g[0];g=g[1];return[a,g.attributes[d]]}},ParenthesisExpression:function(a,b){return p(a.expression,b)}}}function c(a,b){this.name="CompilerError";this.message=a;this.entry=b.id}function g(a,b){c.call(this,a,b);this.name="CompilationError"}function b(a,b){c.call(this,a,b);this.name="RuntimeError"}function m(a,c,e){b.call(this,a,c);this.name="ValueError";this.source=e}function k(a,
c){b.call(this,a,c);this.name="IndexError"}function l(a){if(!(a instanceof c))throw a;}e.Error=c;e.CompilationError=g;e.RuntimeError=b;e.ValueError=m;e.IndexError=k;c.prototype=Object.create(Error.prototype);c.prototype.constructor=c;g.prototype=Object.create(c.prototype);g.prototype.constructor=g;b.prototype=Object.create(c.prototype);b.prototype.constructor=b;m.prototype=Object.create(b.prototype);m.prototype.constructor=m;k.prototype=Object.create(b.prototype);k.prototype.constructor=k;"undefined"!==
typeof exports?exports.Compiler=e:this.L20n?this.L20n.Compiler=e:this.L20nCompiler=e}).call(this);
(function(){this.L20n.Intl={prioritizeLocales:function(e){for(var c={localeMatcher:"lookup"},g=[navigator.language||navigator.userLanguage],b=0,m=g.length,k=void 0;b<m&&void 0===k;){var l=g[b],a=l;a:{for(var k=e,C=a;;){if(-1!==k.indexOf(C)){k=C;break a}var s=C.lastIndexOf("-");if(-1===s){k=void 0;break a}2<=s&&"-"==C[s-2]&&(s-=2);C=C.substr(0,s)}k=void 0}b+=1}g={};if(void 0!==k){if(g.locale=k,l!==a)throw"NotImplemented";}else g.locale="en-US";l=g.locale;if(g.hasOwnProperty("extension"))throw"NotImplemented";
a="-u";for(g=0;0>g;){b=(void 0)(l)[l];m=b[0];k="";if(void 0!==extensionSubtags)throw"NotImplemented";c.hasOwnProperty("key")&&(C=c.key,-1!==b.indexOf(C)&&C!==m&&(k=""),a+=k,g+=1)}2<a.length&&(c=l.substr(0,extensionIndex),l=l.substr(extensionIndex+1),l=c+a+l);c=l;l=e.indexOf(c);if(-1===l)return e;e.splice(l,1);e.unshift(c);return e}}}).call(this);
(function(){function e(){b.addEventListener("ready",function(){var a=document.createEvent("Event");a.initEvent("LocalizationReady",!1,!1);document.dispatchEvent(a);document.body?c():document.addEventListener("readystatechange",function(){"interactive"===document.readyState&&c()})});b.addEventListener("error",function(a){a.code&L20n.NOVALIDLOCALE_ERROR&&(a=document.createEvent("Event"),a.initEvent("LocalizationFailed",!1,!1),document.dispatchEvent(a))});b.freeze();HTMLElement.prototype.retranslate=
function(){if(this.hasAttribute("data-l10n-id"))return g(this),!0;throw Exception("Node not localizable");}}function c(){g(document);HTMLDocument.prototype.__defineGetter__("l10n",function(){return b});document.body.style.visibility="visible";var a=document.createEvent("Event");a.initEvent("DocumentLocalized",!1,!1);document.dispatchEvent(a)}function g(a){var c=a.querySelectorAll("[data-l10n-id]");a=[];for(var e=0;e<c.length;e++)c[e].hasAttribute("data-l10n-args")?a.push([c[e].getAttribute("data-l10n-id"),
JSON.parse(c[e].getAttribute("data-l10n-args"))]):a.push(c[e].getAttribute("data-l10n-id"));b.localize(a,function(a){for(var b=0;b<c.length;b++){var e=c[b].getAttribute("data-l10n-id");a.entities[e].value&&(c[b].textContent=a.entities[e].value);for(var g in a.entities[e].attributes)c[b].setAttribute(g,a.entities[e].attributes[g])}})}var b=this.L20n.getContext(document.location.host),m;document.body&&(document.body.style.visibility="hidden");m=document.head;var k=m.querySelector('script[type="application/l10n-data+json"]');
k&&(b.data=JSON.parse(k.textContent));if(k=m.querySelector('script[type="application/l20n"]'))k.hasAttribute("src")?b.linkResource(k.getAttribute("src")):b.addResource(k.textContent),e();else if(m=m.querySelector('link[rel="localization"]')){m=m.getAttribute("href");var l=new L20n.Promise;L20n.IO.load(m,!0).then(function(a){var c=JSON.parse(a);a=L20n.Intl.prioritizeLocales(c.languages);b.registerLocales.apply(this,a);b.linkResource(function(a){return c.resources[0].replace("{{lang}}",a)});l.fulfill()});
l.then(e)}}).call(this);