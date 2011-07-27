var page = new WebPage();
page.onConsoleMessage = function(msg) { console.log(msg); };


page.open(encodeURI("http://www.microsoft.com/sqlserver/en/us/default.aspx"), function (status) {
  if (status !== "success") {
    console.log("Unable to access network");
  } else {
    
    var tests=[];var TestGroup=function a(a){tests.push({title:a,cases:[]});return this};TestGroup.prototype.it=function b(a,b){var c={title:a,callback:b};tests[tests.length-1].cases.push(c);return this};TestGroup.prototype.run=function c(){console.log("--------- STARTING SPEC RUNNER ---------");tests.forEach(function(a,b){var c=b+1;console.log(c+") when "+a.title);a.cases.forEach(function(a,b){var c=a.callback.call(this);if(c){console.log("✓ \t"+a.title)}else{console.log("✗ \t"+a.title)}})})};var when=function(a){return new TestGroup(a)};var expect=function d(a,b){if(a==b){return true}else{return false}}
    
    when("a user lands on the page")
      .it("should always have the correct title", function() {
        var title = page.evaluate(function() { return document.title; });
        return expect(title, 'Database Management | Data Mining & Warehousing | Microsoft SQL Server');
      })
      .it("should always have ten items in the Top 10 Benchmarks carousel", function() {
        var items = page.evaluate(function() {
          return document.querySelectorAll('.reasontoswitch li.jcarousel-item').length;
        });
        return expect(items, 10);
      })
      .it("should always have three tabs in the hero carousel", function() {
        var tabs = page.evaluate(function() {
          return document.querySelectorAll('.marquee ul.tabsnavigation > li').length;
        });
        return expect(tabs, 3);
      })
      .it("should always have at least four Tech Docs items", function() {
        return expect(page.evaluate(function() {
          return document.querySelectorAll('.docs ul.items li.item').length;
        }), 4);
      })
      .it("should always have at least four Evidence items", function() {
        return expect(page.evaluate(function() {
          return document.querySelectorAll('.evidence ul.items li.item').length;
        }), 4);      
      })
    .run();
  }
  phantom.exit();
});