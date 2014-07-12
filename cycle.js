var Cycle = function(anchor, lengthInMilliseconds, pointInTime, adjust){


  this.pointInTime = pointInTime
  this.anchor = anchor;
  this.lengthInMilliseconds = lengthInMilliseconds;


  this.millisecondsIntoCycle = function(){
    return ((this.pointInTime - this.anchor) % this.lengthInMilliseconds );
  }
  this.fractionOfCycle = function(){
    return( this.millisecondsIntoCycle()/this.lengthInMilliseconds );
  }
  this.cyclesSinceAnchor = function(){
    return( Math.floor((this.pointInTime - this.anchor)/this.lengthInMilliseconds));
  }
  this.startOfCurrentCycle = function(){
    return (this.anchor + (this.cyclesSinceAnchor()*this.lengthInMilliseconds));
    var start =  new Date(this.startOfCurrentCycle());
    start.setDate(start.getDate()+1);
    start.setHours(0,0,0,0);
    return (start.valueOf());
  }
  this.endOfCurrentCycle = function(){
    return (this.anchor + ((this.cyclesSinceAnchor()+1)*this.lengthInMilliseconds));
  }
  this.startOfNextCycle = function(){
    return (this.startOfCurrentCycle() + this.lengthInMilliseconds);
  }
  this.firstDayStartOfCurrentCycle = function(){
    var start =  new Date(this.startOfCurrentCycle());
    start.setDate(start.getDate()+1);
    start.setHours(0,0,0,0);
    return (start.valueOf());
  }

  this.lastDayEndOfCurrentCycle = function(){
    var end =  new Date(this.endOfCurrentCycle());
    end.setDate(end.getDate()+1);
    end.setHours(0,0,0,0);
    return (end.valueOf());
  }
  this.dayOfCycle = function(){
    var adjustedTime = this.pointInTime - this.firstDayStartOfCurrentCycle();
    return (Math.ceil(adjustedTime/(60*60*24*1000)));
  }

  this.length = function(){
    return (this.lastDayEndOfCurrentCycle() - this.firstDayStartOfCurrentCycle())
  }

  this.daysInCycle = function(){
    return(this.length() / (60*60*24*1000))
  }

  if (this.daysInCycle(this.pointInTime) === 0 && adjust) {
    this.this.pointInTime = this.this.pointInTime - (60*60*24*1000)
  }


}

module.exports = Cycle;