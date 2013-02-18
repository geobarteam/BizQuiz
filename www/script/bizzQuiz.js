/// <reference path="jquery.d.ts" />
/// <reference path="phonegap.d.ts" />
/// <reference path="jquerymobile.d.ts" />
var App = (function () {
    function App() { }
    App.initialize = function initialize(deviceReadyId) {
        console.log("Initialize");
        App.deviceReadyId = deviceReadyId;
        this.bindEvents();
        App.frontController = new FrontController(new SecurityService());
    };
    App.bindEvents = function bindEvents() {
        console.log("bindEvents");
        document.addEventListener("deviceready", this.onDeviceReady, false);
    };
    App.onDeviceReady = function onDeviceReady() {
        console.log("onDeviceReady!!!");
        try  {
            this.frontController.initialize();
        } catch (e) {
            console.log(e);
        }
    };
    return App;
})();
var FrontController = (function () {
    function FrontController(securityService) {
        this.user = new User();
        this.securityService = securityService;
    }
    FrontController.prototype.initialize = function () {
        if(!this.user.isAuthenticated) {
            $.mobile.changePage("login.html", {
                transition: "slideup"
            });
        }
    };
    FrontController.prototype.logon = function (username, password) {
        if(this.securityService.authenticate(username, password)) {
            this.user.isAuthenticated = true;
            this.user.name = username;
        }
    };
    return FrontController;
})();
var User = (function () {
    function User() { }
    return User;
})();
var SecurityService = (function () {
    function SecurityService() { }
    SecurityService.prototype.authenticate = function (username, password) {
        return username == "geobarteam" && password == "starwars";
    };
    return SecurityService;
})();
//@ sourceMappingURL=bizzQuiz.js.map