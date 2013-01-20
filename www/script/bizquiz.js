var App = (function () {
    function App() { }
    App.prototype.initialize = function () {
        console.log("initialize");
        this.bindEvents();
    };
    App.prototype.onDeviceReady = function () {
        console.log("onDeviceReady!!!");
        console.log("receivedEvent");
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        try  {
            console.log(parentElement);
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            console.log('Received Event');
        } catch (ex) {
            console.log(ex);
        }
    };
    App.prototype.bindEvents = function () {
        console.log("bindEvents");
        document.addEventListener('deviceready', this.onDeviceReady, false);
    };
    return App;
})();
