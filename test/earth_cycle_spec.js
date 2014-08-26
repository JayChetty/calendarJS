var assert = require("assert");
var EarthCycles = require('../earth_cycles');

describe('EarthCycles', function(){

  it('should set up constants', function(){
    var earthCycles = new EarthCycles();
    assert.equal(earthCycles.DAY_IN_MILLISECONDS, 86400000); 
  })

  it('should show years passed since 2013', function(){ 
   
    var oneYearAfter = new Date(2014,3,3,15,50,00,00).valueOf();
    var twoYearsAfter = new Date(2015,3,3,15,50,00,00).valueOf();
    var earthCycles1 = new EarthCycles(oneYearAfter);
    assert.equal(earthCycles1.yearsPassed(), 1);
    var earthCycles2 = new EarthCycles(twoYearsAfter);
    assert.equal(earthCycles2.yearsPassed(), 2);  
  })

  it('should show the days since last year(axis change)', function(){
    var daysAfter = new Date(2013,3,3,15,50,00,00).valueOf();
    var earthCycles = new EarthCycles(daysAfter); 
    assert.equal(earthCycles.dayOfYear(), 103);
  })

  it('should show the days since last moonth', function(){
    var tenDaysAfter = new Date(2012,10,22,22,8).valueOf();
    var earthCycles = new EarthCycles(tenDaysAfter);
    assert.equal(earthCycles.dayOfMoonth(), 9); 
  })

  it('should show the first new moonth of year', function(){
    var time = new Date(2013,5,22,22,8).valueOf();
    var earthCycles = new EarthCycles(time);
    
    // var firstNewMoon = new Date(2013,1,10,23,36,05,952).valueOf();
    assert.equal(earthCycles.firstNewMoonOfYear(), 1357948800000); 
  })


  it('should show the moonth of year', function(){
    
    var time = new Date(2013,6,12,12,00).valueOf();
    var earthCycles = new EarthCycles(time);
    assert.equal(earthCycles.moonthOfYear(), 8); 
  })

  // it('should show the number of moonths in year', function(){
  //   var earthCycles = new EarthCycles();
  //   var time = new Date(2014,6,12,12,00).valueOf();
  //   assert.equal(earthCycles.moonthsInYear(time), 13) ;
  // })

  it('should show the number of days in moonth', function(){
    var time = new Date(2013,6,12,12,00).valueOf();
    var earthCycles = new EarthCycles(time);
    assert.equal(earthCycles.daysInMoonth(), 29);
  })

  it('should have months that add up to total days', function(){
    var time = new Date(2017,6,12,12,00).valueOf();
    var earthCycles = new EarthCycles(time);
    moonths = earthCycles.moonths;
    sum = 0;
    for (i = 0; i<moonths.length; i++){
      sum = sum + moonths[i];
    }
    assert.equal(sum, earthCycles.daysInYear());
  })

  // it('should display the string', function(){
  //   var earthCycles = new EarthCycles();
  //   var time = new Date().valueOf(); 
  //   console.log(earthCycles.displayString(time));
  // })

})