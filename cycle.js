var Cycle = function(anchor, lengthInMilliseconds, pointInTime, adjust){
  this.pointInTime = pointInTime
  this.anchor = anchor;
  this.lengthInMilliseconds = lengthInMilliseconds;
  if (this.dayOfCycle() === 0 && adjust) {
    this.pointInTime = this.pointInTime - (60*60*24*1000)
  }
}

Cycle.prototype = {
    millisecondsIntoCycle: function(){
      return ((this.pointInTime - this.anchor) % this.lengthInMilliseconds );
    },
    fractionOfCycle: function(){
      return( this.millisecondsIntoCycle()/this.lengthInMilliseconds );
    },
    cyclesSinceAnchor: function(){
      return( Math.floor((this.pointInTime - this.anchor)/this.lengthInMilliseconds));
    },
    startOfCurrentCycle: function(){
      return (this.anchor + (this.cyclesSinceAnchor()*this.lengthInMilliseconds));
      var start =  new Date(this.startOfCurrentCycle());
      start.setDate(start.getDate()+1);
      start.setHours(0,0,0,0);
      return (start.valueOf());
    },
    endOfCurrentCycle: function(){
      return (this.anchor + ((this.cyclesSinceAnchor()+1)*this.lengthInMilliseconds));
    },
    startOfNextCycle: function(){
      return (this.startOfCurrentCycle() + this.lengthInMilliseconds);
    },
    firstDayStartOfCurrentCycle: function(){
      var start =  new Date(this.startOfCurrentCycle());
      start.setDate(start.getDate()+1);
      start.setHours(0,0,0,0);
      return (start.valueOf());
    },

    lastDayEndOfCurrentCycle: function(){
      var end =  new Date(this.endOfCurrentCycle());
      end.setDate(end.getDate()+1);
      end.setHours(0,0,0,0);
      return (end.valueOf());
    },
    dayOfCycle: function(){
      var adjustedTime = this.pointInTime - this.firstDayStartOfCurrentCycle();
      return (Math.ceil(adjustedTime/(60*60*24*1000)));
    },

    length: function(){
      return (this.lastDayEndOfCurrentCycle() - this.firstDayStartOfCurrentCycle())
    },

    daysInCycle: function(){
      return(Math.round(this.length() / (60*60*24*1000)))
    }
}

module.exports = Cycle;