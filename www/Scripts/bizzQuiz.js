var BizzQuiz;
(function (BizzQuiz) {
    var App = (function () {
        function App() { }
        App.initialize = function initialize() {
            console.log("Initialize");
            App.fc = new FrontController(new SecurityService());
            this.bindEvents();
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
            this.configureCrossDomainRequests();
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
            this.homeViewModel.Init();
        };
        FrontController.prototype.configureCrossDomainRequests = function () {
            $.mobile.allowCrossDomainPages = true;
            $.support.cors = true;
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
            this.showWrongPassword = ko.observable(false);
        }
        LogonViewModel.viewName = "logonView";
        LogonViewModel.prototype.init = function () {
        };
        LogonViewModel.prototype.logon = function () {
            var _this = this;
            $("#logonForm").validate({
                submitHandler: function () {
                    if(_this.fc.securityService.authenticate(_this.userName(), _this.password())) {
                        _this.fc.user.isAuthenticated = true;
                        _this.fc.user.name = _this.userName();
                        var userStingified = JSON.stringify(_this.fc.user);
                        window.localStorage.setItem("user", userStingified);
                        _this.fc.homeViewModel.Init();
                        $.mobile.changePage("#" + HomeViewModel.viewName, {
                            transition: "slideup"
                        });
                    } else {
                        _this.showWrongPassword(true);
                    }
                },
                rules: function () {
                    password:
(function () {
                        required:
true
                        minlength:
5
                    });

                    userName:
(function () {
                        required:
true
                        minlength:
5
                    });

                }
            });
        };
        return LogonViewModel;
    })();
    BizzQuiz.LogonViewModel = LogonViewModel;    
    var HomeViewModel = (function () {
        function HomeViewModel(fc) {
            this.fc = fc;
        }
        HomeViewModel.viewName = "homeView";
        HomeViewModel.prototype.Init = function () {
        };
        HomeViewModel.prototype.NewsClick = function () {
            console.log("NewsClick");
            try  {
                $.mobile.changePage("#" + NewsViewModel.viewName, {
                    transition: "slideup"
                });
            } catch (e) {
                console.log(e);
            }
        };
        return HomeViewModel;
    })();
    BizzQuiz.HomeViewModel = HomeViewModel;    
    var NewsViewModel = (function () {
        function NewsViewModel(fc) {
            this.fc = fc;
        }
        NewsViewModel.viewName = "newsView";
        NewsViewModel.prototype.Init = function () {
        };
        return NewsViewModel;
    })();
    BizzQuiz.NewsViewModel = NewsViewModel;    
})(BizzQuiz || (BizzQuiz = {}));
