/// <reference path="jquery.d.ts" />
/// <reference path="phonegap.d.ts" />
/// <reference path="jquerymobile.d.ts" />
/// <reference path="knockout.d.ts" />
/// <reference path="jquery.validate.d.ts" />

module BizzQuiz {

    export class App {
        static fc: FrontController;

        static initialize() {
            console.log("Initialize");
            fc = new FrontController(new SecurityService());
            // this.bindEvents();
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
    }

    export class FrontController {
        public user: User;

        public logonViewModel : LogonViewModel;
        public homeViewModel: HomeViewModel;

        constructor(public securityService: ISecurityService)
        {
            this.user = new User();
            this.logonViewModel = new LogonViewModel(this);
            this.homeViewModel = new HomeViewModel(this);
            ko.applyBindings(this.logonViewModel, document.getElementById(LogonViewModel.viewName));
            ko.applyBindings(this.homeViewModel, document.getElementById(HomeViewModel.viewName));
        }

        public init()
        {
            var userStringified = window.localStorage.getItem("user");
            if (userStringified != undefined) {
                this.user = JSON.parse(userStringified);
            }

            if (!this.user.isAuthenticated)
            {
                try
                {
                    this.logonViewModel.init();
                    $.mobile.changePage("#" + LogonViewModel.viewName, { transition: "slideup" });            
                }
                catch (e) {
                    alert(e);
                }
            }
        }
    }

    export class User {
        public isAuthenticated: bool;
        public name: string;
    }

    export interface ISecurityService {
        authenticate(username: string, password: string): bool;
    }

    export class SecurityService implements ISecurityService {
        public authenticate(username: string, password: string): bool {
            return username == "geobarteam" && password == "starwars";
        }
    }

    export class LogonViewModel
    {
        static viewName = "logonView";

        constructor(private fc: FrontController)
        {
        }

        public userName = ko.observable("");
        public password = ko.observable("");

        public init()
        {
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
                },
                rules: () => {
                    rules:()=> {
                        password: () => { required: true; minlength: 5 };
                        userName: () => { required: true; minlength: 5 };
                    }
                }
        } );
            
            
        }
    }

    export class HomeViewModel
    {
        static viewName = "homeView";

        constructor(private fc: FrontController)
        {
        }

        public name = ko.observable("");

        public Init()
        {
            this.name(this.fc.user.name);
        }
    }

}
