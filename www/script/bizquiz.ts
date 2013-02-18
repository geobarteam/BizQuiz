/// <reference path="jquery.d.ts" />
/// <reference path="phonegap.d.ts" />
/// <reference path="jquerymobile.d.ts" />

class App 
{
	static deviceReadyId : string;
	static frontController : FrontController;

	static initialize(deviceReadyId: string)
	{
		console.log("Initialize");
		App.deviceReadyId = deviceReadyId;
		this.bindEvents();
		frontController = new FrontController();
	}
	
	private static bindEvents () 
	{
		console.log("bindEvents");
		document.addEventListener("deviceready", this.onDeviceReady, false);
	}

    private static onDeviceReady () 
    {
    	console.log("onDeviceReady!!!");
		try
		{
			 this.frontController.initialize();
		}
    	catch(e)
    	{
    		console.log(e);
    	}
	}
}

class FrontController 
{
	public user : User;

	constructor()
	{
		this.user = new User();
	}

	public initialize()
	{
		if (!this.user.isAuthenticated)
		{
			$.mobile.changePage( "login.html", { transition: "slideup"} );
		}
	}
}

class User 
{
	public isAuthenticated : bool;
	public name : string;
}

interface ISecurityService
{
	authenticate(username:string, password:string):bool;
}

class SecurityService implements ISecurityService
{
	public authenticate(username:string, password:string):bool
	{
		return username == "geobarteam" && password == "starwars";
	}
}