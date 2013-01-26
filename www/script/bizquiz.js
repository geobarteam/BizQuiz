var App = (function () {
    function App() { }
    App.deviceReadyId = "";
    App.initialize = function initialize(deviceReadyId) {
        console.log("Initialize");
        App.deviceReadyId = deviceReadyId;
        this.bindEvents();
    }
    App.bindEvents = function bindEvents() {
        console.log("bindEvents");
        document.addEventListener("deviceready", this.onDeviceReady, false);
    }
    App.onDeviceReady = function onDeviceReady() {
        console.log("onDeviceReady!!!");
        try  {
            $.mobile.changePage("login.html", {
                transition: "slideup"
            });
        } catch (e) {
            console.log(e);
        }
    }
    return App;
})();
