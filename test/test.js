var assert = require("assert");
var Cycle = require('../app/cycle');


describe('Cycle', function(){
  it('should set up', function(){
    cycle = new Cycle(3, 10);
    assert.equal(cycle.anchor, 3);
    assert.equal(cycle.lengthInSeconds, 10);
  })

  it('should count seconds into cycle', function(){
    cycle = new Cycle(3, 10);
    assert.equal(cycle.secondsIntoCycle(5),2)
    assert.equal(cycle.secondsIntoCycle(13),0)
  })

  it('should show fraction into cycle', function(){
    cycle = new Cycle(3, 10);
    assert.equal(cycle.fractionOfCycle(8),0.5)
    assert.equal(cycle.fractionOfCycle(13),0)
    assert.equal(cycle.fractionOfCycle(18),0.5)
  })

  it('should show cycles since anchor', function(){
    cycle = new Cycle(3, 10);
    assert.equal(cycle.cyclesSinceAnchor(8), 0)
    assert.equal(cycle.cyclesSinceAnchor(13), 1)
    assert.equal(cycle.cyclesSinceAnchor(15), 1)
  })

  it('should show start of current cycle', function(){
    cycle = new Cycle(3, 10);
    assert.equal(cycle.startOfCurrentCycle(15), 13)
    assert.equal(cycle.startOfCurrentCycle(7), 3)
  })

})