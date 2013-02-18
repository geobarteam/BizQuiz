/// <reference path="jquery.d.ts" />
/// <reference path="phonegap.d.ts" />
/// <reference path="jquerymobile.d.ts" />

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

    constructor(securityService:ISecurityService)
    {
        this.user = new User();
        this.securityService = securityService;
    }

    public initialize()
    {
        if (!this.user.isAuthenticated)
        {
            $.mobile.changePage("login.html", { transition: "slideup" });
        }
    }

    public logon(username: string, password: string)
    {
        if (this.securityService.authenticate(username, password))
        {
            this.user.isAuthenticated = true;
            this.user.name = username;
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