/// <reference path="jquery.d.ts" />
/// <reference path="phonegap.d.ts" />

class App {
	initialize () {
		console.log("initialize");
		this.bindEvents();
	}
	
	private onDeviceReady () {
		console.log("onDeviceReady!!!");
		
			console.log("receivedEvent");
			var parentElement = document.getElementById('deviceready');
	        var listeningElement = parentElement.querySelector('.listening');
	        var receivedElement = parentElement.querySelector('.received');
		try
		{
			console.log(parentElement);
	        listeningElement.setAttribute('style', 'display:none;');
	        receivedElement.setAttribute('style', 'display:block;');

	        console.log('Received Event');
		}
		catch(ex)
		{
			console.log(ex);
		}
		
	}

	private bindEvents () {
		console.log("bindEvents");
		document.addEventListener('deviceready', this.onDeviceReady, false);
	}

	
}