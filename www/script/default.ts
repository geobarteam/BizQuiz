/// <reference path="knockout.d.ts" />

// Module
module APP {

    // Class
    export class ViewModel{
        // Constructor
        constructor() {
            this.firstname = ko.observable("Geoffrey");
            this.lastname = ko.observable("Vandiest");
        }

        firstname: KnockoutObservableString;
        lastname: KnockoutObservableString;
    }
    
    export class FrontController {
        static Start() {
            ko.applyBindings(new APP.ViewModel());
        }
    }
}

