/// <reference path="tsUnit.ts" />
/// <reference path="../bizzQuiz.ts" />
module Unit {
    export class Tests extends tsUnit.TestClass {

        private target = new BizzQuiz.News();

        canSetLines() {
            this.target.lines = new string[];
            this.target.lines.push("This is the first line.");
            this.target.lines.push("This is the second line that is longer as the first.");

            this.areIdentical(2, this.target.lines.length);
        }

        canSetDate() {
            var result = this.target.date = new Date(2013, 12-1, 1);
            this.areIdentical("1/12/2013", result.toLocaleDateString());
        }

        public static run() {
            // new instance of tsUnit
            var test = new tsUnit.Test();

            test.addTestClass(new Unit.Tests());

            // Use the built in results display
            test.showResults(document.getElementById('results'), test.run());
        }
    }
}



