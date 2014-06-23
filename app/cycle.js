var Cycle = function(anchor, lengthInSeconds){
  this.anchor = anchor;
  this.lengthInSeconds = lengthInSeconds;
  this.secondsIntoCycle = function(pointInTime){
    return ((pointInTime - this.anchor) % this.lengthInSeconds );
  }
  this.fractionOfCycle = function(pointInTime){
    return( this.secondsIntoCycle(pointInTime)/this.lengthInSeconds );
  }
  this.cyclesSinceAnchor = function(pointInTime){
    return( Math.floor((pointInTime - this.anchor)/this.lengthInSeconds));
  }
  this.startOfCurrentCycle = function(pointInTime){
    return (this.anchor + (this.cyclesSinceAnchor(pointInTime)*this.lengthInSeconds));
  }
}

module.exports = Cycle;