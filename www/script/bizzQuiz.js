/// <reference path="jquery.d.ts" />
/// <reference path="phonegap.d.ts" />
/// <reference path="jquerymobile.d.ts" />
/// <reference path="knockout.d.ts" />
var BizzQuiz;
(function (BizzQuiz) {
    var App = (function () {
        function App() { }
        App.initialize = function initialize() {
            console.log("Initialize");
            App.fc = new FrontController(new SecurityService());
            this.bindEvents();
            //App.onDeviceReady();
        };
        App.bindEvents = function bindEvents() {
            console.log("bindEvents");
            document.addEventListener("deviceready", this.onDeviceReady, false);
        };
        App.onDeviceReady = function onDeviceReady() {
            console.log("onDeviceReady!!!");
            try  {
                App.fc.init();
            } catch (e) {
                console.log(e);
            }
        };
        return App;
    })();
    BizzQuiz.App = App;    
    var FrontController = (function () {
        function FrontController(securityService) {
            this.securityService = securityService;
            this.user = new User();
            this.logonViewModel = new LogonViewModel(this);
            this.homeViewModel = new HomeViewModel(this);
            ko.applyBindings(this.logonViewModel, document.getElementById(LogonViewModel.viewName));
            ko.applyBindings(this.homeViewModel, document.getElementById(HomeViewModel.viewName));
        }
        FrontController.prototype.init = function () {
            var userStringified = window.localStorage.getItem("user");
            if(userStringified != undefined) {
                this.user = JSON.parse(userStringified);
            }
            if(!this.user.isAuthenticated) {
                try  {
                    this.logonViewModel.init();
                    $.mobile.changePage("#" + LogonViewModel.viewName, {
                        transition: "slideup"
                    });
                } catch (e) {
                    alert(e);
                }
            }
        };
        return FrontController;
    })();
    BizzQuiz.FrontController = FrontController;    
    var User = (function () {
        function User() { }
        return User;
    })();
    BizzQuiz.User = User;    
    var SecurityService = (function () {
        function SecurityService() { }
        SecurityService.prototype.authenticate = function (username, password) {
            return username == "geobarteam" && password == "starwars";
        };
        return SecurityService;
    })();
    BizzQuiz.SecurityService = SecurityService;    
    var LogonViewModel = (function () {
        function LogonViewModel(fc) {
            this.fc = fc;
            this.userName = ko.observable("");
            this.password = ko.observable("");
        }
        LogonViewModel.viewName = "logonView";
        LogonViewModel.prototype.init = function () {
        };
        LogonViewModel.prototype.logon = function () {
            if(this.fc.securityService.authenticate(this.userName(), this.password())) {
                this.fc.user.isAuthenticated = true;
                this.fc.user.name = this.userName();
                var userStingified = JSON.stringify(this.fc.user);
                window.localStorage.setItem("user", userStingified);
                this.fc.homeViewModel.Init();
                $.mobile.changePage("#" + HomeViewModel.viewName, {
                    transition: "slideup"
                });
            }
        };
        return LogonViewModel;
    })();
    BizzQuiz.LogonViewModel = LogonViewModel;    
    var HomeViewModel = (function () {
        function HomeViewModel(fc) {
            this.fc = fc;
            this.name = ko.observable("");
        }
        HomeViewModel.viewName = "homeView";
        HomeViewModel.prototype.Init = function () {
            this.name(this.fc.user.name);
        };
        return HomeViewModel;
    })();
    BizzQuiz.HomeViewModel = HomeViewModel;    
})(BizzQuiz || (BizzQuiz = {}));
//@ sourceMappingURL=bizzQuiz.js.map
