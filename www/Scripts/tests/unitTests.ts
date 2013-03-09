/// <reference path="tsUnit.ts" />
/// <reference path="../bizzQuiz.ts" />

class UnitTests extends tsUnit.TestClass {

    private target = new BizzQuiz.News();

    canSetDate() {
        var result = this.target.date = new Date(2013, 12, 1);

        this.areIdentical(new Date(2013, 12, 1), result);
    }

    public static run()
    {
        // new instance of tsUnit
        var test = new tsUnit.Test();

        test.addTestClass(new UnitTests());

        // Use the built in results display
        test.showResults(document.getElementById('results'), test.run());
    }
}


