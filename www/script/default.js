/// <reference path="knockout.d.ts" />
// Module
var APP;
(function (APP) {
    // Class
    var ViewModel = (function () {
        // Constructor
        function ViewModel() {
            this.firstname = ko.observable("Geoffrey");
            this.lastname = ko.observable("Vandiest");
        }
        return ViewModel;
    })();
    APP.ViewModel = ViewModel;    
    var FrontController = (function () {
        function FrontController() { }
        FrontController.Start = function Start() {
            ko.applyBindings(new APP.ViewModel());
        };
        return FrontController;
    })();
    APP.FrontController = FrontController;    
})(APP || (APP = {}));
//@ sourceMappingURL=default.js.map
