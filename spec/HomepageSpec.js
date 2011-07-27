var page = new WebPage();
page.onConsoleMessage = function(msg) { console.log(msg); };


page.open(encodeURI("http://www.microsoft.com/sqlserver/en/us/default.aspx"), function (status) {
  if (status !== "success") {
    console.log("Unable to access network");
  } else {
    
    var tests = [];

    var TestGroup = function TestGroup(title) { 
      tests.push({ title: title, cases: [] });
      return this;
    };
    TestGroup.prototype.it = function it(message, fn) {
      var testCase = { title: message, callback: fn };
      tests[tests.length - 1].cases.push(testCase);
      return this; 
    };
    TestGroup.prototype.run = function run() {
      console.log("--------- STARTING SPEC RUNNER ---------");
      tests.forEach(function(group, index) {
        var num = index + 1;
        console.log(num + ") when " + group.title);
        group.cases.forEach(function(testCase, i) {
          var result = testCase.callback.call(this);
          if (result) {
            console.log('✓ \t' + testCase.title);
          } else {
            console.log('✗ \t' + testCase.title);        
          }
        }); 
      });
    };
    var when = function(title) {
      return new TestGroup(title);
    };

    var expect = function expect(actual, expected) {
      if (actual == expected) { return true; } else { return false; }
    };
    
    when("a user lands on the page")
      .it("should always have the correct title", function() {
        return expect(page.evaluate(function() { return document.title; }), 'Database Management | Data Mining & Warehousing | Microsoft SQL Server');
      })
      .it("should always have ten items in the Top 10 Benchmarks carousel", function() {
        return expect('lets see', 'lets see');
      })
      .it("should always have three tabs in the hero carousel", function() {

      })
      .it("should always have at least four Tech Docs items", function() {

      })
      .it("should always have at least four Evidence items", function() {

      })
    .run();
    
    

    
    
  }
  phantom.exit();
});