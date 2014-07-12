var assert = require("assert");
var Cycle = require('../cycle');


describe('Cycle', function(){
  it('should set up', function(){
    var cycle = new Cycle(3, 10, 2);
    assert.equal(cycle.anchor, 3);
    assert.equal(cycle.lengthInMilliseconds, 10);
  })

  it('should count milliseconds into cycle', function(){
    var cycle1 = new Cycle(3, 10, 5);
    assert.equal(cycle1.millisecondsIntoCycle(),2);
    var cycle2 = new Cycle(3, 10, 13);
    assert.equal(cycle2.millisecondsIntoCycle(),0);
  })

  it('should show fraction into cycle', function(){
    var cycle1 = new Cycle(3, 10 ,8);
    assert.equal(cycle1.fractionOfCycle(),0.5);
    var cycle2 = new Cycle(3, 10 ,13);
    assert.equal(cycle2.fractionOfCycle(),0);
    var cycle3 = new Cycle(3, 10 ,18);
    assert.equal(cycle3.fractionOfCycle(),0.5);
  })

  it('should show cycles since anchor', function(){
    var cycle1 = new Cycle(3, 10,8);
    assert.equal(cycle1.cyclesSinceAnchor(), 0);
    var cycle2 = new Cycle(3, 10,13);
    assert.equal(cycle2.cyclesSinceAnchor(), 1);
    var cycle3 = new Cycle(3, 10,15);
    assert.equal(cycle3.cyclesSinceAnchor(), 1);
  })

  it('should show start of current cycle', function(){
    var cycle1 = new Cycle(3, 10,15);
    assert.equal(cycle1.startOfCurrentCycle(), 13);
    var cycle2 = new Cycle(3, 10,7);
    assert.equal(cycle2.startOfCurrentCycle(), 3);
  })

  it('should show start of next cycle', function(){
    var cycle1 = new Cycle(3, 10,15);
    assert.equal(cycle1.startOfNextCycle(), 23);
    var cycle2 = new Cycle(3, 10,7);
    assert.equal(cycle2.startOfNextCycle(), 13);
  })

  it('should show the first day of cycle', function(){
    var anchor = new Date(2013,3,1,12,50,59,99);
    var length = 60*60*24*10*1000; //ten days
    var pointInTime = new Date(2013,3,3,15,50,59,99);
    var nextDay = new Date(2013,3,2,0,0,0,0);
    var cycle = new Cycle(anchor.valueOf(), length, pointInTime.valueOf());
    assert.equal(cycle.firstDayStartOfCurrentCycle(), nextDay.valueOf());
  })

  it('should show day of cycle', function(){
    var anchor = new Date(2013,3,1,12,50,59,99);
    var length = 60*60*24*10*1000; //ten days
    var oneHourAfterAnchor = new Date(2013,3,1,13,50,59,99);
    var oneDayAfterAnchor= new Date(2013,3,2,12,50,59,99);

    var cycle1 = new Cycle(anchor.valueOf(), length,oneHourAfterAnchor.valueOf());
    assert.equal(cycle1.dayOfCycle(), 0);
    var cycle2= new Cycle(anchor.valueOf(), length,oneDayAfterAnchor.valueOf());
    assert.equal(cycle2.dayOfCycle(), 1);
  })

  it('should adjust to goes back to previous when zero day', function(){
    var anchor = new Date(2013,3,1,12,50,59,99);
    var length = 60*60*24*10*1000; //ten days
    var oneHourAfterAnchor = new Date(2013,3,1,13,50,59,99);
    var oneDayAfterAnchor= new Date(2013,3,2,12,50,59,99);

    var cycle1 = new Cycle(anchor.valueOf(), length, oneHourAfterAnchor.valueOf(), true);
    assert.equal(cycle1.dayOfCycle(), 9);
  })



})