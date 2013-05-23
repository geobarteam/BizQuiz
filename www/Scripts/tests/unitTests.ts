/// <reference path="qunit.d.ts" />
/// <reference path="helpers.ts" />
/// <reference path="../bizzQuiz.ts" />
module Unit {

    QUnit.module("BizzQuiz.ts tests");
    
    export class Tests {
        public static run() {
            
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
                test.target.GetNewsList(function (result: BizzQuiz.News[]) {
                    ok(result.length > 0);
                    start();
                });
            });
        }
    }

    export class givenDummyNewsObject extends Helpers.GivenWhenThen {

        private target : BizzQuiz.News;

        given() {
            this.target = new BizzQuiz.News();
            this.target.lines.push("This is the first line.");
            this.target.lines.push("This is the second line that is longer as the first.");
            this.target.date = new Date(2013, 12 - 1, 1);
        }

        public ThenCanGetLines() {
            equal(2, this.target.lines.length);
        }

        public ThenCanGetDate() {
            equal("Sun Dec 1 2013", this.target.date.toDateString());
        }
    }

    export class DataServiceMock implements BizzQuiz.IDataService
    {
        public GetNewsList(callBack: (news: BizzQuiz.News[]) => void ){
            var news1 = new BizzQuiz.News();
            news1.title = "First News";
            news1.lines = ["line1", "line2", "line3"];
            news1.count = 1;
            var news2 = new BizzQuiz.News();
            news2.title = "Second News";
            news2.lines = ["line1", "line2", "line3"];
            news2.count = 2;

            callBack([news1, news2]);
        }
    }
    export class whenNewsInit extends Helpers.GivenWhenThen{

        private target: BizzQuiz.NewsViewModel;

        private given() {
            this.target = new BizzQuiz.NewsViewModel(new DataServiceMock());
            }

        private when() {

            this.target.Init();
            }

        public thenNewsViewModelNewsListIsNotEmpty() {
            ok(this.target.NewsList().length > 0);
        }
    }

    export class GivenANewsTableWithNewsWhenAzureDataServiceInit extends Helpers.GivenWhenThen {

        public target: BizzQuiz.AzureDataService;

        given() {
            var client = new WindowsAzure.MobileServiceClient('https://bizzquiz.azure-mobile.net/', 'LaQnzkTDXkDPzuOSnqmkNZnkvotZQi34');
            var newsTable = client.getTable('News');
            var result;
            newsTable.where({ title: 'testTitle' }).read().done(
                function (items) {
                    if (items.length() == 0) {
                        newsTable.insert({ title: "testTitle", count: 1 });
                    }
                });

            this.target = new BizzQuiz.AzureDataService();
        }
    }
}
