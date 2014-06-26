var assert = require("assert");
var EarthCycles = require('../app/earth_cycles');

describe('Cycle', function(){

  it('should set up constants', function(){
    var earthCycles = new EarthCycles()
    assert.equal(earthCycles.DAY_IN_MILLISECONDS, 86400000)  
  })

  it('should show years passed since 2013', function(){ 
    var earthCycles = new EarthCycles()
    var oneYearAfter = new Date(2014,3,3,15,50,00,00).valueOf()
    var twoYearsAfter = new Date(2015,3,3,15,50,00,00).valueOf()
    assert.equal(earthCycles.yearsPassed(oneYearAfter), 1) 
    assert.equal(earthCycles.yearsPassed(twoYearsAfter), 2)  
  })

})