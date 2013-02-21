/// <reference path="jquery.d.ts" />
/// <reference path="phonegap.d.ts" />
/// <reference path="jquerymobile.d.ts" />
/// <reference path="knockout.d.ts" />

class App {
    static deviceReadyId: string;
    static frontController: FrontController;

    static initialize(deviceReadyId: string) {
        console.log("Initialize");
        App.deviceReadyId = deviceReadyId;
        this.bindEvents();
        frontController = new FrontController(new SecurityService());
        frontController.initialize();
    }

    private static bindEvents() {
        console.log("bindEvents");
        document.addEventListener("deviceready", this.onDeviceReady, false);
    }

    private static onDeviceReady() {
        console.log("onDeviceReady!!!");
        try {
            this.frontController.initialize();
        }
    	catch (e) {
            console.log(e);
        }
    }
}

class FrontController {
    public user : User;
    public securityService: ISecurityService;

    public logonViewModel : LgonViewModel;
    

    constructor(securityService:ISecurityService)
    {
        this.user = new User();
        this.securityService = securityService;
    }

    public initialize()
    {
        if (!this.user.isAuthenticated)
        {
            try{
                this.logonViewModel = new LgonViewModel(this.securityService, this.user);
                $.mobile.changePage("login.html", { transition: "slideup" });
            }
            catch(e)
            {
                alert(e);
            }   
        }
    }

    
}

class User {
    public isAuthenticated: bool;
    public name: string;
}

interface ISecurityService {
    authenticate(username: string, password: string): bool;
}

class SecurityService implements ISecurityService {
    public authenticate(username: string, password: string): bool {
        return username == "geobarteam" && password == "starwars";
    }
}

class LgonViewModel 
{
    constructor(public securityService: ISecurityService, public user : User) {
    }

    public userName = ko.observable("");
    public firstName = ko.observable("");

    public logon(username: string, password: string) {
        if (this.securityService.authenticate(username, password)) {
            this.user.isAuthenticated = true;
            this.user.name = username;
            $.mobile.changePage("index.html", { transition: "slideup" });
        }
    }
}


