/// <reference path="tsUnit.ts" />
/// <reference path="../bizzQuiz.ts" />
module Unit {
    export class Tests {
        public static run() {
                // new instance of tsUnit
                var test = new tsUnit.Test();

                test.addTestClass(new Unit.newsTests());
                test.addTestClass(new newsViewModelTests());
                // Use the built in results display
                test.showResults(document.getElementById('results'), test.run());
            }
    }
    

    export class newsTests extends tsUnit.TestClass {
             
        private target = new BizzQuiz.News();

        canSetLines() {
            this.target.lines.push("This is the first line.");
            this.target.lines.push("This is the second line that is longer as the first.");

            this.areIdentical(2, this.target.lines.length);
        }

        canSetDate() {
            var result = this.target.date = new Date(2013, 12-1, 1);
            this.areIdentical("1/12/2013", result.toLocaleDateString());
        }
    }

    export class newsViewModelTests extends tsUnit.TestClass {
        private frontController = new BizzQuiz.FrontController(null);

        private target : BizzQuiz.NewsViewModel;
        
        OnInitNewslistIsNotEmpty(){
         this.target = new BizzQuiz.NewsViewModel(this.frontController);
            this.target.Init(() => {
                var news1 = new BizzQuiz.News();
                news1.title = "First News";
                news1.lines = ["line1", "line2", "line3"];
                news1.time = new Date(Date.now());
                news1.count = 1;
                var news2 = new BizzQuiz.News();
                news2.title = "Second News";
                news2.lines = ["line1", "line2", "line3"];
                news2.time = new Date(Date.now() - 1);
                news2.count = 2;

                return [news1, news2];
            });

            this.isTrue(this.target.newList().length > 0);
        }
    }
}



