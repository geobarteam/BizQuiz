var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="tsUnit.ts" />
/// <reference path="../bizzQuiz.ts" />
var UnitTests = (function (_super) {
    __extends(UnitTests, _super);
    function UnitTests() {
        _super.apply(this, arguments);

        this.target = new BizzQuiz.News();
    }
    UnitTests.prototype.canSetDate = function () {
        var result = this.target.date = new Date(2013, 12, 1);
        this.areIdentical(new Date(2013, 12, 1), result);
    };
    UnitTests.run = function run() {
        // new instance of tsUnit
        var test = new tsUnit.Test();
        test.addTestClass(new UnitTests());
        // Use the built in results display
        test.showResults(document.getElementById('results'), test.run());
    };
    return UnitTests;
})(tsUnit.TestClass);
//@ sourceMappingURL=unitTests.js.map
