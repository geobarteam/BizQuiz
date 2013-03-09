var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="tsUnit.ts" />
/// <reference path="../bizzQuiz.ts" />
var Unit;
(function (Unit) {
    var Tests = (function (_super) {
        __extends(Tests, _super);
        function Tests() {
            _super.apply(this, arguments);

            this.target = new BizzQuiz.News();
        }
        Tests.prototype.canSetLines = function () {
            this.target.lines = new Array();
            this.target.lines.push("This is the first line.");
            this.target.lines.push("This is the second line that is longer as the first.");
            this.areIdentical(2, this.target.lines.length);
        };
        Tests.prototype.canSetDate = function () {
            var result = this.target.date = new Date(2013, 12 - 1, 1);
            this.areIdentical("1/12/2013", result.toLocaleDateString());
        };
        Tests.run = function run() {
            // new instance of tsUnit
            var test = new tsUnit.Test();
            test.addTestClass(new Unit.Tests());
            // Use the built in results display
            test.showResults(document.getElementById('results'), test.run());
        };
        return Tests;
    })(tsUnit.TestClass);
    Unit.Tests = Tests;    
})(Unit || (Unit = {}));
//@ sourceMappingURL=unitTests.js.map
