var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="tsUnit.ts" />
/// <reference path="../bizzQuiz.ts" />
var NewsTests = (function (_super) {
    __extends(NewsTests, _super);
    function NewsTests() {
        _super.apply(this, arguments);

        this.target = new BizzQuiz.News();
    }
    NewsTests.prototype.canSetDate = function () {
        var result = this.target.date = new Date(2013, 12, 1);
        this.areIdentical(new Date(2013, 12, 1), result);
    };
    return NewsTests;
})(tsUnit.TestClass);
// new instance of tsUnit
var test = new tsUnit.Test();
test.addTestClass(new NewsTests());
// Use the built in results display
test.showResults(document.getElementById('results'), test.run());
//@ sourceMappingURL=unitTests.js.map
