/// <reference path="libs/jquery.d.ts" />
/// <reference path="libs/phonegap.d.ts" />
/// <reference path="libs/jquerymobile.d.ts" />
/// <reference path="libs/knockout.d.ts" />
/// <reference path="libs/jquery.validate.d.ts" />
/// <reference path="libs/AzureMobileServicesClient.d.ts" />
var BizzQuiz;
(function (BizzQuiz) {
    //--------------App---------------------
    var App = (function () {
        function App() { }
        App.initialize = function initialize() {
            console.log("Initialize");
            App.addGeneralErrorHandler();
            App.fc = new FrontController(new SecurityService(), new AzureDataService());
            this.bindEvents();
            App.onDeviceReady();
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
        App.addGeneralErrorHandler = function addGeneralErrorHandler() {
            window.onerror = function (msg, url, line) {
                // You can view the information in an alert to see things working
                // like so:
                console.log("Error: " + msg + "\nurl: " + url + "\nline #: " + line);
                // TODO: Report this error via ajax so you can keep track
                //       of what pages have JS issues
                var suppressErrorAlert = false;
                // If you return true, then error alerts (like in older versions of
                // Internet Explorer) will be suppressed.
                return suppressErrorAlert;
            };
        };
        return App;
    })();
    BizzQuiz.App = App;    
    //-----------FrontController------------------
    var FrontController = (function () {
        function FrontController(securityService, dataService) {
            this.securityService = securityService;
            this.dataService = dataService;
            this.user = new User();
            this.logonViewModel = new LogonViewModel(this);
            this.homeViewModel = new HomeViewModel(this);
            this.newsViewModel = new NewsViewModel(dataService);
            ko.applyBindings(this.logonViewModel, document.getElementById(LogonViewModel.viewName));
            ko.applyBindings(this.homeViewModel, document.getElementById(HomeViewModel.viewName));
            ko.applyBindings(this.newsViewModel, document.getElementById(NewsViewModel.viewName));
        }
        FrontController.prototype.init = function () {
            this.configureCrossDomainRequests();
            var userStringified = window.localStorage.getItem("user");
            if(userStringified != undefined) {
                this.user = JSON.parse(userStringified);
            }
            if(!this.user.isAuthenticated) {
                this.logonViewModel.init();
                $.mobile.changePage("#" + LogonViewModel.viewName, {
                    transition: "slideup"
                });
            }
            this.homeViewModel.Init();
            this.newsViewModel.Init();
            console.log("newsViewModel Init");
        };
        FrontController.prototype.configureCrossDomainRequests = function () {
            $.mobile.allowCrossDomainPages = true;
            $.support.cors = true;
        };
        return FrontController;
    })();
    BizzQuiz.FrontController = FrontController;    
    //---------------------Models----------------
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
    var AzureDataService = (function () {
        function AzureDataService() {
            this.NewsList = ko.observable(new Array());
            this.client = new WindowsAzure.MobileServiceClient('https://bizzquiz.azure-mobile.net/', 'LaQnzkTDXkDPzuOSnqmkNZnkvotZQi34');
            this.newsTable = this.client.getTable('News');
        }
        AzureDataService.prototype.GetNewsList = function (ready) {
            var newsList = new Array();
            this.newsTable.read().then(function (newsItems) {
                newsList = $.map(newsItems, function (item) {
                    var news = new BizzQuiz.News();
                    news.title = item.title;
                    return news;
                });
                ready(newsList);
            });
        };
        return AzureDataService;
    })();
    BizzQuiz.AzureDataService = AzureDataService;    
    //--------------------ViewModels-------------------
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
            $.mobile.changePage("#" + NewsViewModel.viewName, {
                transition: "slideup"
            });
        };
        return HomeViewModel;
    })();
    BizzQuiz.HomeViewModel = HomeViewModel;    
    var NewsViewModel = (function () {
        function NewsViewModel(dataService) {
            this.dataService = dataService;
            this.NewsList = ko.observableArray(new Array());
        }
        NewsViewModel.viewName = "newsView";
        NewsViewModel.prototype.Init = function () {
            var that = this;
            this.dataService.GetNewsList(function (result) {
                result.forEach(function (news) {
                    that.NewsList.push(news);
                });
            });
        };
        return NewsViewModel;
    })();
    BizzQuiz.NewsViewModel = NewsViewModel;    
    //-----------------Models--------------------
    var News = (function () {
        function News() {
            this.date = new Date();
            this.count = 0;
            this.title = "";
            this.lines = new Array();
        }
        News.prototype.formatedDate = function () {
            return this.date.toLocaleDateString();
        };
        News.prototype.time = function () {
            return this.date.toTimeString();
        };
        return News;
    })();
    BizzQuiz.News = News;    
})(BizzQuiz || (BizzQuiz = {}));
//@ sourceMappingURL=bizzQuiz.js.map
