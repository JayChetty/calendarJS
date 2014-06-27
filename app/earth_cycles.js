var Cycle = require('./cycle')

var EarthCycles = function(){
  //Constants for Setup
  this.DAY_IN_MILLISECONDS = 24 * 60 * 60 *1000;
  this.AN_AXIS_MAX_N = new Date(2012,11,21,11,12);
  this.YEAR_IN_DAYS = 365.24219;
  this.YEAR_IN_MILLISECONDS = this.YEAR_IN_DAYS * this.DAY_IN_MILLISECONDS;

  this.A_NEW_MOON = new Date(2012,10,13,22,8);
  this.MOONTH_IN_DAYS = 29.53059;
  this.MOONTH_IN_MILLISECONDS = this.MOONTH_IN_DAYS * this.DAY_IN_MILLISECONDS;

  this.YEAR_IN_MOONTHS = (this.YEAR_IN_SECONDS/this.MOONTH_IN_SECONDS);

  this.year = new Cycle(this.AN_AXIS_MAX_N.valueOf(),this.YEAR_IN_MILLISECONDS);
  this.moonth = new Cycle(this.A_NEW_MOON.valueOf(), this.MOONTH_IN_MILLISECONDS);

  this.yearsPassed = function(pointInTime){
    return (this.year.cyclesSinceAnchor(pointInTime));
  }

  this.dayOfYear = function(pointInTime){
    return (this.year.dayOfCycle(pointInTime));
  }

  this.dayOfMoonth = function(pointInTime){
    return (this.moonth.dayOfCycle(pointInTime));
  }

  this.firstNewMoonOfYear = function(pointInTime){
    var startOfYear = this.year.startOfCurrentCycle(pointInTime);
    return (this.moonth.startOfNextCycle(startOfYear));
  }

  this.firstNewDayOfMoonth = function(pointInTime){
    return (this.moonth.firstDayStartOfCurrentCycle(pointInTime));
  }

  this.moonthOfYear = function(pointInTime){
    var adjustedTime = pointInTime - this.firstNewMoonOfYear(pointInTime);
    return (Math.ceil(adjustedTime/this.MOONTH_IN_MILLISECONDS) + 1);
  }


  this.moonthsInYear = function(pointInTime){
    var firstMoonthLag = this.firstNewMoonOfYear(pointInTime) - this.year.startOfCurrentCycle(pointInTime);
    return Math.ceil((this.YEAR_IN_MILLISECONDS - firstMoonthLag)/this.MOONTH_IN_MILLISECONDS);
  }

  this.daysInMoonth = function(pointInTime){
    var firstDayMoonthLag = this.firstNewDayOfMoonth(pointInTime) - this.moonth.startOfCurrentCycle(pointInTime);
    return Math.ceil((this.MOONTH_IN_MILLISECONDS - firstDayMoonthLag)/this.DAY_IN_MILLISECONDS);
  }

  this.displayString = function(pointInTime){
    return "The " + this.dayOfMoonth(pointInTime) + "/" +this.daysInMoonth(pointInTime) + " day of the " + this.moonthOfYear(pointInTime) + "/" + this.moonthsInYear(pointInTime) + " Moonth of Year "
  }


}

module.exports = EarthCycles;