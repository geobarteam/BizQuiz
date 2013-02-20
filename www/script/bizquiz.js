var App = (function () {
    function App() { }
    App.deviceReadyId = "";
    App.frontController = null;
    App.initialize = function initialize(deviceReadyId) {
        console.log("Initialize");
        App.deviceReadyId = deviceReadyId;
        this.bindEvents();
        App.frontController = new FrontController();
    }
    App.bindEvents = function bindEvents() {
        console.log("bindEvents");
        document.addEventListener("deviceready", this.onDeviceReady, false);
    }
    App.onDeviceReady = function onDeviceReady() {
        console.log("onDeviceReady!!!");
        try  {
            this.frontController.initialize();
        } catch (e) {
            console.log(e);
        }
    }
    return App;
})();
var FrontController = (function () {
    function FrontController() {
        this.user = new User();
    }
    FrontController.prototype.initialize = function () {
        if(!this.user.isAuthenticated) {
            $.mobile.changePage("login.html", {
                transition: "slideup"
            });
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
