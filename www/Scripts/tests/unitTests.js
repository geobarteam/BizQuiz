var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="qunit.d.ts" />
/// <reference path="helpers.ts" />
/// <reference path="../bizzQuiz.ts" />
var Unit;
(function (Unit) {
    QUnit.module("BizzQuiz.ts tests");
    var Tests = (function () {
        function Tests() { }
        Tests.run = function run() {
            test("Given Dummy News object then can get lines", function () {
                new givenDummyNewsObject().ThenCanGetLines();
            });
            test("Given dummy News object then can get date", function () {
                new givenDummyNewsObject().ThenCanGetDate();
            });
            test("When news init then newsViewModel.NewsList is not empty", function () {
                new whenNewsInit().thenNewsViewModelNewsListIsNotEmpty();
            });
            asyncTest("Given aa non empty NewsTable when AzureDataService.Init then after a while newsList is not empty", function () {
                var test = new GivenANewsTableWithNewsWhenAzureDataServiceInit();
                test.target.GetNewsList(function (result) {
                    ok(result.length > 0);
                    start();
                });
            });
        };
        return Tests;
    })();
    Unit.Tests = Tests;    
    var givenDummyNewsObject = (function (_super) {
        __extends(givenDummyNewsObject, _super);
        function givenDummyNewsObject() {
            _super.apply(this, arguments);

        }
        givenDummyNewsObject.prototype.given = function () {
            this.target = new BizzQuiz.News();
            this.target.lines.push("This is the first line.");
            this.target.lines.push("This is the second line that is longer as the first.");
            this.target.date = new Date(2013, 12 - 1, 1);
        };
        givenDummyNewsObject.prototype.ThenCanGetLines = function () {
            equal(2, this.target.lines.length);
        };
        givenDummyNewsObject.prototype.ThenCanGetDate = function () {
            equal("Sun Dec 1 2013", this.target.date.toDateString());
        };
        return givenDummyNewsObject;
    })(Helpers.GivenWhenThen);
    Unit.givenDummyNewsObject = givenDummyNewsObject;    
    var DataServiceMock = (function () {
        function DataServiceMock() { }
        DataServiceMock.prototype.GetNewsList = function (callBack) {
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
            callBack([
                news1, 
                news2
            ]);
        };
        return DataServiceMock;
    })();
    Unit.DataServiceMock = DataServiceMock;    
    var whenNewsInit = (function (_super) {
        __extends(whenNewsInit, _super);
        function whenNewsInit() {
            _super.apply(this, arguments);

        }
        whenNewsInit.prototype.given = function () {
            this.target = new BizzQuiz.NewsViewModel(new DataServiceMock());
        };
        whenNewsInit.prototype.when = function () {
            this.target.Init();
        };
        whenNewsInit.prototype.thenNewsViewModelNewsListIsNotEmpty = function () {
            ok(this.target.NewsList().length > 0);
        };
        return whenNewsInit;
    })(Helpers.GivenWhenThen);
    Unit.whenNewsInit = whenNewsInit;    
    var GivenANewsTableWithNewsWhenAzureDataServiceInit = (function (_super) {
        __extends(GivenANewsTableWithNewsWhenAzureDataServiceInit, _super);
        function GivenANewsTableWithNewsWhenAzureDataServiceInit() {
            _super.apply(this, arguments);

        }
        GivenANewsTableWithNewsWhenAzureDataServiceInit.prototype.given = function () {
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
        };
        return GivenANewsTableWithNewsWhenAzureDataServiceInit;
    })(Helpers.GivenWhenThen);
    Unit.GivenANewsTableWithNewsWhenAzureDataServiceInit = GivenANewsTableWithNewsWhenAzureDataServiceInit;    
})(Unit || (Unit = {}));
//@ sourceMappingURL=unitTests.js.map
