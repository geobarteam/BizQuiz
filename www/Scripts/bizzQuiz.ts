/// <reference path="jquery.d.ts" />
/// <reference path="phonegap.d.ts" />
/// <reference path="jquerymobile.d.ts" />
/// <reference path="knockout.d.ts" />
/// <reference path="jquery.validate.d.ts" />

module BizzQuiz {

    //--------------App---------------------
    export class App {
        static fc: FrontController;

        static initialize() {
            console.log("Initialize");
            App.addGeneralErrorHandler();
            fc = new FrontController(new SecurityService());
            this.bindEvents();
            //App.onDeviceReady();
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

        public logonViewModel: LogonViewModel;
        public homeViewModel: HomeViewModel;

        constructor(public securityService: ISecurityService) {
            this.user = new User();
            this.logonViewModel = new LogonViewModel(this);
            this.homeViewModel = new HomeViewModel(this);
            ko.applyBindings(this.logonViewModel, document.getElementById(LogonViewModel.viewName));
            ko.applyBindings(this.homeViewModel, document.getElementById(HomeViewModel.viewName));
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
        getNewsList(): News[];
    }

    export class SecurityService implements ISecurityService {
        public authenticate(username: string, password: string): bool {
            return username == "geobarteam" && password == "starwars";
        }
    }

    export class DataService implements IDataService {
        public getNewsList(): News[]{
            throw "Notimplented";
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

        constructor(private fc: FrontController) {
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

        public newList = ko.observable(new News[]);

        constructor(private fc: FrontController) {
        }

        public Init() {
           
        }
    }


    //-----------------Models--------------------
    export class News {
        public date : Date;
        public count : number;
        public title : string;
        public lines: string[];
        public time: Date;
    }
}
