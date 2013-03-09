/// <reference path="tsUnit.ts" />
/// <reference path="../bizzQuiz.ts" />

class NewsTests extends tsUnit.TestClass {

    private target = new BizzQuiz.News();

    canSetDate() {
        var result = this.target.date = new Date(2013, 12, 1);

        this.areIdentical(new Date(2013, 12, 1), result);
    }
}

// new instance of tsUnit
var test = new tsUnit.Test();

test.addTestClass(new NewsTests());

// Use the built in results display
test.showResults(document.getElementById('results'), test.run());