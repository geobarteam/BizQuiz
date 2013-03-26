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
            test.addTestClass(new newsViewModelTests());
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
            this.areIdentical("Sun Dec 1 2013", result.toDateString());
        };
        return newsTests;
    })(tsUnit.TestClass);
    Unit.newsTests = newsTests;    
    var newsViewModelTests = (function (_super) {
        __extends(newsViewModelTests, _super);
        function newsViewModelTests() {
            _super.apply(this, arguments);

        }
        newsViewModelTests.prototype.OnInitNewslistIsNotEmpty = function () {
            this.target = new BizzQuiz.NewsViewModel(function () {
                var news1 = new BizzQuiz.News();
                news1.title = "First News";
                news1.lines = [
                    "line1", 
                    "line2", 
                    "line3"
                ];
                news1.time = new Date(Date.now());
                news1.count = 1;
                var news2 = new BizzQuiz.News();
                news2.title = "Second News";
                news2.lines = [
                    "line1", 
                    "line2", 
                    "line3"
                ];
                news2.time = new Date(Date.now() - 1);
                news2.count = 2;
                return [
                    news1, 
                    news2
                ];
            });
            this.target.Init();
            this.isTrue(this.target.newsList().length > 0);
        };
        return newsViewModelTests;
    })(tsUnit.TestClass);
    Unit.newsViewModelTests = newsViewModelTests;    
})(Unit || (Unit = {}));
//@ sourceMappingURL=unitTests.js.map
