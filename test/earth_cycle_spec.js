var assert = require("assert");
var EarthCycles = require('../app/earth_cycles');

describe('EarthCycles', function(){

  it('should set up constants', function(){
    var earthCycles = new EarthCycles();
    assert.equal(earthCycles.DAY_IN_MILLISECONDS, 86400000); 
  })

  it('should show years passed since 2013', function(){ 
    var earthCycles = new EarthCycles();
    var oneYearAfter = new Date(2014,3,3,15,50,00,00).valueOf();
    var twoYearsAfter = new Date(2015,3,3,15,50,00,00).valueOf();
    assert.equal(earthCycles.yearsPassed(oneYearAfter), 1); 
    assert.equal(earthCycles.yearsPassed(twoYearsAfter), 2);  
  })

  it('should show the days since last year(axis change)', function(){
    var earthCycles = new EarthCycles();
    var daysAfter = new Date(2013,3,3,15,50,00,00).valueOf();
    assert.equal(earthCycles.dayOfYear(daysAfter), 104);
  })

  it('should show the days since last moonth', function(){
    var earthCycles = new EarthCycles();
    var tenDaysAfter = new Date(2012,10,22,22,8).valueOf();
    assert.equal(earthCycles.dayOfMoonth(tenDaysAfter), 10); 
  })

  it('should show the first new moonth of year', function(){
    var earthCycles = new EarthCycles();
    var time = new Date(2013,5,22,22,8).valueOf();
    // var firstNewMoon = new Date(2013,1,10,23,36,05,952).valueOf();
    assert.equal(earthCycles.firstNewMoonOfYear(time), 1357947365952); 
  })


  it('should show the moonth of year', function(){
    var earthCycles = new EarthCycles();
    var time = new Date(2013,6,12,12,00).valueOf();
    assert.equal(earthCycles.moonthOfYear(time), 8); 
  })

  it('should show the number of moonths in year', function(){
    var earthCycles = new EarthCycles();
    var time = new Date(2014,6,12,12,00).valueOf();
    assert.equal(earthCycles.moonthsInYear(time), 13) ;
  })

  it('should show the number of days in moonth', function(){
    var earthCycles = new EarthCycles();
    var time = new Date(2013,6,12,12,00).valueOf();
    assert.equal(earthCycles.daysInMoonth(time), 29);
  })

  it('should display the string', function(){
    var earthCycles = new EarthCycles();
    var time = new Date().valueOf(); 
    console.log(earthCycles.displayString(time));
  })

})