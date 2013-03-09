var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="tsUnit.ts" />
/// <reference path="../bizzQuiz.ts" />
var Unit;
(function (Unit) {
    var Tests = (function () {
        function Tests() { }
        Tests.run = function run() {
            // new instance of tsUnit
            var test = new tsUnit.Test();
            test.addTestClass(new Unit.newsTests());
            // Use the built in results display
            test.showResults(document.getElementById('results'), test.run());
        };
        return Tests;
    })();
    Unit.Tests = Tests;    
    var newsTests = (function (_super) {
        __extends(newsTests, _super);
        function newsTests() {
            _super.apply(this, arguments);

            this.target = new BizzQuiz.News();
        }
        newsTests.prototype.canSetLines = function () {
            this.target.lines.push("This is the first line.");
            this.target.lines.push("This is the second line that is longer as the first.");
            this.areIdentical(2, this.target.lines.length);
        };
        newsTests.prototype.canSetDate = function () {
            var result = this.target.date = new Date(2013, 12 - 1, 1);
            this.areIdentical("1/12/2013", result.toLocaleDateString());
        };
        return newsTests;
    })(tsUnit.TestClass);
    Unit.newsTests = newsTests;    
})(Unit || (Unit = {}));
//@ sourceMappingURL=unitTests.js.map
