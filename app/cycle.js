var Cycle = function(anchor, lengthInMilliseconds){
  this.anchor = anchor;
  this.lengthInMilliseconds = lengthInMilliseconds;
  this.millisecondsIntoCycle = function(pointInTime){
    return ((pointInTime - this.anchor) % this.lengthInMilliseconds );
  }
  this.fractionOfCycle = function(pointInTime){
    return( this.millisecondsIntoCycle(pointInTime)/this.lengthInMilliseconds );
  }
  this.cyclesSinceAnchor = function(pointInTime){
    return( Math.floor((pointInTime - this.anchor)/this.lengthInMilliseconds));
  }
  this.startOfCurrentCycle = function(pointInTime){
    return (this.anchor + (this.cyclesSinceAnchor(pointInTime)*this.lengthInMilliseconds));
  }
  this.startOfNextCycle = function(pointInTime){
    return (this.startOfCurrentCycle(pointInTime) + this.lengthInMilliseconds);
  }
  this.firstDayStartOfCurrentCycle = function(pointInTime){
    var start =  new Date(this.startOfCurrentCycle(pointInTime));
    start.setDate(start.getDate()+1);
    start.setHours(0,0,0,0);
    return (start.valueOf());
  }
  this.dayOfCycle = function(pointInTime){
    var adjustedTime = pointInTime - this.firstDayStartOfCurrentCycle(pointInTime);
    return (Math.ceil(adjustedTime/(60*60*24*1000)) + 1);
  }


}

module.exports = Cycle;