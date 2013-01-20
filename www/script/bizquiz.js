var App = (function () {
    function App() { }
    App.initialize = function initialize() {
        console.log("initialize");
        App.bindEvents();
    }
    App.onDeviceReady = function onDeviceReady() {
        console.log("onDeviceReady!!!");
        App.blinkDeviceReady("deviceready");
    }
    App.bindEvents = function bindEvents() {
        console.log("bindEvents");
        document.addEventListener("deviceready", App.onDeviceReady, false);
    }
    App.blinkDeviceReady = function blinkDeviceReady(devicereadyId) {
        console.log("blinkDeviceReady " + devicereadyId);
        var parentElement = document.getElementById(devicereadyId);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }
    return App;
})();
