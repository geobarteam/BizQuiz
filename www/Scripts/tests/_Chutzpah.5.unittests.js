var Unit;
(function (Unit) {
    QUnit.module("BizzQuiz.ts tests");
    test("canSetLines", function () {
        var test = new newsTests();
        test.canSetLines();
        equal(2, this.target.lines.length);
    });
    var newsTests = (function () {
        function newsTests() {
            this.target = new BizzQuiz.News();
        }
        newsTests.prototype.canSetLines = function () {
            this.target.lines.push("This is the first line.");
            this.target.lines.push("This is the second line that is longer as the first.");
        };
        newsTests.prototype.canSetDate = function () {
            var result = this.target.date = new Date(2013, 12 - 1, 1);
        };
        return newsTests;
    })();
    Unit.newsTests = newsTests;    
})(Unit || (Unit = {}));
