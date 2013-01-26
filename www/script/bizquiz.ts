/// <reference path="jquery.d.ts" />
/// <reference path="phonegap.d.ts" />
/// <reference path="jquerymobile.d.ts" />

class App {
	static deviceReadyId : string;

	static initialize(deviceReadyId: string){
		console.log("Initialize");
		App.deviceReadyId = deviceReadyId;
		this.bindEvents();
	}
	
	private static bindEvents () {
		console.log("bindEvents");
		document.addEventListener("deviceready", this.onDeviceReady, false);
	}

    private static onDeviceReady () {
    	console.log("onDeviceReady!!!");
		try
		{
			 $.mobile.changePage( "login.html", { transition: "slideup"} );
		}
    	catch(e)
    	{
    		console.log(e);
    	}
	}
}