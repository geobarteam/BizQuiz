/// <reference path="qunit.d.ts" />
/// <reference path="../bizzQuiz.ts" />
module Unit {
    QUnit.module("BizzQuiz.ts tests");

    test("canSetLines", function () {
        var test = new newsTests();
        test.canSetLines();
        test.canSetDate();
    });

    export class newsTests {

        public target = new BizzQuiz.News();

        canSetLines() {
            this.target.lines.push("This is the first line.");
            this.target.lines.push("This is the second line that is longer as the first.");
            equal(2, this.target.lines.length);

        }

        canSetDate() {
            var result = this.target.date = new Date(2013, 12 - 1, 1);
            equal("Sun Dec 1 2013", result.toDateString());
        }
    }

    //export class newsViewModelTests extends tsUnit.TestClass {

    //    private target: BizzQuiz.NewsViewModel;

    //    OnInitNewslistIsNotEmpty() {
    //        this.target = new BizzQuiz.NewsViewModel(() => {
    //            var news1 = new BizzQuiz.News();
    //            news1.title = "First News";
    //            news1.lines = ["line1", "line2", "line3"];
    //            news1.count = 1;
    //            var news2 = new BizzQuiz.News();
    //            news2.title = "Second News";
    //            news2.lines = ["line1", "line2", "line3"];
    //            news2.count = 2;

    //            return [news1, news2];
    //        });
    //        this.target.Init();

    //        this.isTrue(this.target.newsList().length > 0);
    //    }
    //}

    //export class azureDataServiceTest extends tsUnit.TestClass {

    //    private target: BizzQuiz.AzureDataService;

    //    constructor() {
    //        super();
    //        var client = new WindowsAzure.MobileServiceClient('https://bizzquiz.azure-mobile.net/', 'LaQnzkTDXkDPzuOSnqmkNZnkvotZQi34');
    //        var newsTable = client.getTable('News');
    //        var result;
    //        newsTable.where({ title: 'testTitle' }).read().done(
    //            function (items) {
    //                if (items.length() == 0) {
    //                    newsTable.insert({ title: "testTitle", count: 1 });
    //                }
    //            });

    //        this.target = new BizzQuiz.AzureDataService();
    //    }

    //    GetNewsListReturnNotEmptyList() {
    //        this.target.Init();
    //        var result = false;
    //        var that = this;

    //        this.WaitUntil(this.target.NewsList().length > 0, function () { result = true }, 100, 1000);

    //        this.isTrue(result);
    //    }

    //    /// $waitUntil
    //    ///      waits until a certain function returns true and then executes a code. checks the function periodically
    //    /// parameters
    //    ///      check - a function that should return false or true
    //    ///      onComplete - a function to execute when the check function returns true
    //    ///      delay - time in milliseconds, specifies the time period between each check. default value is 100
    //    ///      timeout - time in milliseconds, specifies how long to wait and check the check function before giving up
    //        private WaitUntil(check, onComplete, delay, timeout) {
    //        // if the check returns true, execute onComplete immediately
    //        if (check()) {
    //            onComplete();
    //            return;
    //        }

    //        if (!delay) delay = 100;

    //        var timeoutPointer;
    //        var intervalPointer = setInterval(function () {
    //            if (!check()) return; // if check didn't return true, means we need another check in the next interval

    //            // if the check returned true, means we're done here. clear the interval and the timeout and execute onComplete
    //            clearInterval(intervalPointer);
    //            if (timeoutPointer) clearTimeout(timeoutPointer);
    //            onComplete();
    //        }, delay);
    //        // if after timeout milliseconds function doesn't return true, abort
    //        if (timeout) timeoutPointer = setTimeout(function () {
    //            clearInterval(intervalPointer);
    //        }, timeout);
    //    }

    //}


}
