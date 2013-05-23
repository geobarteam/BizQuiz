/// <reference path="libs/jquery.d.ts" />
/// <reference path="libs/phonegap.d.ts" />
/// <reference path="libs/jquerymobile.d.ts" />
/// <reference path="libs/knockout.d.ts" />
/// <reference path="libs/jquery.validate.d.ts" />
/// <reference path="libs/AzureMobileServicesClient.d.ts" />



module BizzQuiz {

    //--------------App---------------------
    export class App {
        static fc: FrontController;

        static initialize() {
            console.log("Initialize");
            App.addGeneralErrorHandler();
            fc = new FrontController(
                        new SecurityService(),
                        new AzureDataService());
            this.bindEvents();
            App.onDeviceReady();
        }

        private static bindEvents() {
            console.log("bindEvents");
            document.addEventListener("deviceready", this.onDeviceReady, false);
        }

        private static onDeviceReady() {
            console.log("onDeviceReady!!!");
            try {
                fc.init();
            }
            catch (e) {
                console.log(e);
            }
        }

        private static addGeneralErrorHandler()
        {
            window.onerror = function(msg, url, line) {
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
        }
    }

    //-----------FrontController------------------
    export class FrontController {
        public user: User;

        public logonViewModel : LogonViewModel;
        public homeViewModel : HomeViewModel;
        public newsViewModel: NewsViewModel;

        constructor(public securityService: ISecurityService, public dataService : IDataService) {
            this.user = new User();
            this.logonViewModel = new LogonViewModel(this);
            this.homeViewModel = new HomeViewModel(this);
            this.newsViewModel = new NewsViewModel(dataService);

            ko.applyBindings(this.logonViewModel, document.getElementById(LogonViewModel.viewName));
            ko.applyBindings(this.homeViewModel, document.getElementById(HomeViewModel.viewName));
            ko.applyBindings(this.newsViewModel, document.getElementById(NewsViewModel.viewName));
        }

        public init() {
            this.configureCrossDomainRequests();
            var userStringified = window.localStorage.getItem("user");
            if (userStringified != undefined) {
                this.user = JSON.parse(userStringified);
            }

            if (!this.user.isAuthenticated) {
                this.logonViewModel.init();
                $.mobile.changePage("#" + LogonViewModel.viewName, { transition: "slideup" });
            }

            this.homeViewModel.Init();
            this.newsViewModel.Init();
            console.log("newsViewModel Init");
        }

        private configureCrossDomainRequests(){
            $.mobile.allowCrossDomainPages = true;
            $.support.cors = true;
        }
    }

    //---------------------Models----------------
    export class User {
        public isAuthenticated: bool;
        public name: string;
    }

    //---------------------Services---------------
    export interface ISecurityService {
        authenticate(username: string, password: string) : bool;
    }

    export interface IDataService {
        GetNewsList(callBack: (news: News[]) => void);
    }

    export class SecurityService implements ISecurityService {
        public authenticate(username: string, password: string): bool {
            return username == "geobarteam" && password == "starwars";
        }
    }

    export class AzureDataService implements IDataService {

        private client: Microsoft.WindowsAzure.MobileServiceClient;
        private newsTable: Microsoft.WindowsAzure.MobileServiceTable;

        public NewsList = ko.observable(new News[]);

        constructor() {
             this.client = new WindowsAzure.MobileServiceClient('https://bizzquiz.azure-mobile.net/', 'LaQnzkTDXkDPzuOSnqmkNZnkvotZQi34');
             this.newsTable = this.client.getTable('News');
        }

        public GetNewsList(ready:(news :News[])=>void){
            var newsList = new News[];
            this.newsTable.read().then(function (newsItems) {
                newsList = $.map(newsItems, function (item) {
                    var news = new BizzQuiz.News();
                    news.title = item.title;
                    return news;
                });
                ready(newsList);
            });
        }
    }

    //--------------------ViewModels-------------------
    export class LogonViewModel {
        static viewName = "logonView";

        constructor(private fc: FrontController) {
        }

        public userName = ko.observable("");
        public password = ko.observable("");
        public showWrongPassword = ko.observable(false);

        public init() {
        }

        public logon() {
            $("#logonForm").validate({
                submitHandler: () => {
                    if (this.fc.securityService.authenticate(this.userName(), this.password())) {
                        this.fc.user.isAuthenticated = true;
                        this.fc.user.name = this.userName();

                        var userStingified = JSON.stringify(this.fc.user);
                        window.localStorage.setItem("user", userStingified);

                        this.fc.homeViewModel.Init();
                        $.mobile.changePage("#" + HomeViewModel.viewName, { transition: "slideup" });
                    }
                    else
                    {
                        this.showWrongPassword(true);
                    }
                },
                rules: () => {
                    password: () => { required: true; minlength: 5 };
                    userName: () => { required: true; minlength: 5 };
                }

            });
        }
    }

    export class HomeViewModel {
        static viewName = "homeView";

        constructor(private fc : FrontController) {
        }

        public Init() {
        }

        public NewsClick() {
            console.log("NewsClick");
            $.mobile.changePage("#" + NewsViewModel.viewName, { transition: "slideup" });   
        }
    }

    export class NewsViewModel {

        static viewName = "newsView";

        public NewsList = ko.observableArray(new News[]);

        constructor(private dataService: IDataService) {
        }

        public Init() {
            var that = this;
            this.dataService.GetNewsList(function (result: News[]) {
                result.forEach(function (news) {
                    that.NewsList.push(news);
                });
            });
        }
    }

    //-----------------Models--------------------
    export class News {
        public date = new Date();

        public formatedDate(): string {
            return this.date.toLocaleDateString();
        };

        public time(): string {
            return this.date.toTimeString();
        };

        public count = 0;

        public title = "";

        public lines = new string[];
    }
}
