var BizzQuiz;
(function (BizzQuiz) {
    var App = (function () {
        function App() { }
        App.initialize = function initialize() {
            console.log("Initialize");
            App.addGeneralErrorHandler();
            App.fc = new FrontController(new SecurityService(), new DataService());
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
                console.log("Error: " + msg + "\nurl: " + url + "\nline #: " + line);
                var suppressErrorAlert = false;
                return suppressErrorAlert;
            };
        };
        return App;
    })();
    BizzQuiz.App = App;    
    var FrontController = (function () {
        function FrontController(securityService, dataService) {
            this.securityService = securityService;
            this.dataService = dataService;
            this.user = new User();
            this.logonViewModel = new LogonViewModel(this);
            this.homeViewModel = new HomeViewModel(this);
            this.newsViewModel = new NewsViewModel(dataService.NewsList);
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
    var DataService = (function () {
        function DataService() {
            this.NewsList = ko.observable(new Array());
        }
        DataService.prototype.Init = function () {
            var news1 = new BizzQuiz.News();
            news1.title = "First News";
            news1.lines = [
                "line1 sdqd qsd qsdz zadzd dzzd dz ad ddz zdd.", 
                "line2 dds sqd dz dfdfd dds", 
                "line3 qsdqs dsq sdqssd qd"
            ];
            news1.count = 1;
            var news2 = new BizzQuiz.News();
            news2.title = "Second News";
            news2.lines = [
                "line1 sfdf fsd fdsdf fdzer rtetyh koui kjj jk uiyyiuy jgbds", 
                "qsdd sqd qsdssline2", 
                "line3"
            ];
            news2.count = 2;
            this.NewsList = ko.observable([
                news1, 
                news2
            ]);
        };
        return DataService;
    })();
    BizzQuiz.DataService = DataService;    
    var AzureDataService = (function () {
        function AzureDataService() {
            this.NewsList = ko.observable(new Array());
            this.client = new WindowsAzure.MobileServiceClient('https://bizzquiz.azure-mobile.net/', 'LaQnzkTDXkDPzuOSnqmkNZnkvotZQi34');
            this.newsTable = this.client.getTable('News');
        }
        AzureDataService.prototype.Init = function () {
            var newsList = new Array();
            this.newsTable.read().then(function (newsItems) {
                newsList = $.map(newsItems, function (item) {
                    var news = new BizzQuiz.News();
                    news.title = item.title;
                    return news;
                });
                this.NewsList = ko.observable(newsList);
            });
        };
        return AzureDataService;
    })();
    BizzQuiz.AzureDataService = AzureDataService;    
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
        function NewsViewModel(getNews) {
            this.getNews = getNews;
            this.newsList = ko.observable(getNews());
        }
        NewsViewModel.viewName = "newsView";
        NewsViewModel.prototype.Init = function () {
        };
        return NewsViewModel;
    })();
    BizzQuiz.NewsViewModel = NewsViewModel;    
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
