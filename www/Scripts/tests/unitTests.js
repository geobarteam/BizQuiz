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
            test.addTestClass(new azureDataServiceTest());
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
                news1.count = 1;
                var news2 = new BizzQuiz.News();
                news2.title = "Second News";
                news2.lines = [
                    "line1", 
                    "line2", 
                    "line3"
                ];
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
    var azureDataServiceTest = (function (_super) {
        __extends(azureDataServiceTest, _super);
        function azureDataServiceTest() {
                _super.call(this);
            var client = new WindowsAzure.MobileServiceClient('https://bizzquiz.azure-mobile.net/', 'LaQnzkTDXkDPzuOSnqmkNZnkvotZQi34');
            var newsTable = client.getTable('News');
            var result;
            newsTable.where({
                title: 'testTitle'
            }).read().done(function (items) {
                if(items.length() == 0) {
                    newsTable.insert({
                        title: "testTitle",
                        count: 1
                    });
                }
            });
            this.target = new BizzQuiz.AzureDataService();
        }
        azureDataServiceTest.prototype.GetNewsListReturnNotEmptyList = function () {
            this.target.Init();
            var result = false;
            var that = this;
            this.WaitUntil(this.target.NewsList().length > 0, function () {
                result = true;
            }, 100, 1000);
            this.isTrue(result);
        };
        azureDataServiceTest.prototype.WaitUntil = /// $waitUntil
        ///      waits until a certain function returns true and then executes a code. checks the function periodically
        /// parameters
        ///      check - a function that should return false or true
        ///      onComplete - a function to execute when the check function returns true
        ///      delay - time in milliseconds, specifies the time period between each check. default value is 100
        ///      timeout - time in milliseconds, specifies how long to wait and check the check function before giving up
        function (check, onComplete, delay, timeout) {
            // if the check returns true, execute onComplete immediately
            if(check()) {
                onComplete();
                return;
            }
            if(!delay) {
                delay = 100;
            }
            var timeoutPointer;
            var intervalPointer = setInterval(function () {
                if(!check()) {
                    return;
                }// if check didn't return true, means we need another check in the next interval
                
                // if the check returned true, means we're done here. clear the interval and the timeout and execute onComplete
                clearInterval(intervalPointer);
                if(timeoutPointer) {
                    clearTimeout(timeoutPointer);
                }
                onComplete();
            }, delay);
            // if after timeout milliseconds function doesn't return true, abort
            if(timeout) {
                timeoutPointer = setTimeout(function () {
                    clearInterval(intervalPointer);
                }, timeout);
            }
        };
        return azureDataServiceTest;
    })(tsUnit.TestClass);
    Unit.azureDataServiceTest = azureDataServiceTest;    
})(Unit || (Unit = {}));
//@ sourceMappingURL=unitTests.js.map
