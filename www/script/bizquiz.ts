/// <reference path="jquery.d.ts" />
/// <reference path="phonegap.d.ts" />

class App {
	static initialize () {
		console.log("initialize");
		App.bindEvents();
	}
	
    static onDeviceReady () {
		console.log("onDeviceReady!!!");
		App.blinkDeviceReady("deviceready");
	}

	private static bindEvents () {
		console.log("bindEvents");
		document.addEventListener("deviceready", App.onDeviceReady, false);
	}

	private static blinkDeviceReady(devicereadyId: string)
	{
		console.log("blinkDeviceReady "+ devicereadyId);
		var parentElement = document.getElementById(devicereadyId);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
	}
}