var assert = require("assert");
var Cycle = require('../app/cycle');


describe('Cycle', function(){
  it('should set up', function(){
    var cycle = new Cycle(3, 10);
    assert.equal(cycle.anchor, 3);
    assert.equal(cycle.lengthInMilliseconds, 10);
  })

  it('should count milliseconds into cycle', function(){
    var cycle = new Cycle(3, 10);
    assert.equal(cycle.millisecondsIntoCycle(5),2)
    assert.equal(cycle.millisecondsIntoCycle(13),0)
  })

  it('should show fraction into cycle', function(){
    var cycle = new Cycle(3, 10);
    assert.equal(cycle.fractionOfCycle(8),0.5)
    assert.equal(cycle.fractionOfCycle(13),0)
    assert.equal(cycle.fractionOfCycle(18),0.5)
  })

  it('should show cycles since anchor', function(){
    var cycle = new Cycle(3, 10);
    assert.equal(cycle.cyclesSinceAnchor(8), 0)
    assert.equal(cycle.cyclesSinceAnchor(13), 1)
    assert.equal(cycle.cyclesSinceAnchor(15), 1)
  })

  it('should show start of current cycle', function(){
    var cycle = new Cycle(3, 10);
    assert.equal(cycle.startOfCurrentCycle(15), 13)
    assert.equal(cycle.startOfCurrentCycle(7), 3)
  })

  it('should show start of next cycle', function(){
    var cycle = new Cycle(3, 10);
    assert.equal(cycle.startOfNextCycle(15), 23)
    assert.equal(cycle.startOfNextCycle(7), 13)
  })

  it('should show the first day of cycle', function(){
    var anchor = new Date(2013,3,1,12,50,59,99)
    var length = 60*60*24*10*1000 //ten days
    var pointInTime = new Date(2013,3,3,15,50,59,99)
    var nextDay = new Date(2013,3,2,0,0,0,0)
    var cycle = new Cycle(anchor.valueOf(), length);
    assert.equal(cycle.firstDayStartOfCurrentCycle(pointInTime.valueOf()), nextDay.valueOf())  
  })

  it('should show day of cycle', function(){
    var anchor = new Date(2013,3,1,12,50,59,99)
    var length = 60*60*24*10*1000 //ten days
    var oneHourAfterAnchor = new Date(2013,3,1,13,50,59,99)
    var oneDayAfterAnchor= new Date(2013,3,2,12,50,59,99)

    var cycle = new Cycle(anchor.valueOf(), length);
    assert.equal(cycle.dayOfCycle(oneHourAfterAnchor.valueOf()), 1)
    assert.equal(cycle.dayOfCycle(oneDayAfterAnchor.valueOf()), 2) 
  })



})