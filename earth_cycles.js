var Cycle = require('./cycle')

var EarthCycles = function(pointInTime){
  //Constants for Setup
  this.DAY_IN_MILLISECONDS = 24 * 60 * 60 *1000;
  this.AN_AXIS_MAX_N = new Date(2012,11,21,11,12);
  this.YEAR_IN_DAYS = 365.24219;
  this.YEAR_IN_MILLISECONDS = this.YEAR_IN_DAYS * this.DAY_IN_MILLISECONDS;

  this.A_NEW_MOON = new Date(2012,10,13,22,8);
  this.MOONTH_IN_DAYS = 29.53059;
  this.MOONTH_IN_MILLISECONDS = this.MOONTH_IN_DAYS * this.DAY_IN_MILLISECONDS;

  this.YEAR_IN_MOONTHS = (this.YEAR_IN_SECONDS/this.MOONTH_IN_SECONDS);

  this.year = new Cycle(this.AN_AXIS_MAX_N.valueOf(),this.YEAR_IN_MILLISECONDS, pointInTime);
  this.moonth = new Cycle(this.A_NEW_MOON.valueOf(), this.MOONTH_IN_MILLISECONDS, pointInTime);



  this.yearsPassed = function(){
    return (this.year.cyclesSinceAnchor());
  }

  this.dayOfYear = function(){
    return (this.year.dayOfCycle());
  }



  this.firstNewDayOfYear = function(){
    return (this.year.firstDayStartOfCurrentCycle());
  }

  this.lastEndDayOfYear = function(){
    return (this.year.lastDayEndOfCurrentCycle());
  }

  // this.yearLength = function(){
  //   return this.lastEndDayOfYear() - this.firstNewDayOfYear()
  // }

  this.daysInYear = function(){
    return(this.year.daysInCycle())
  }

  this.msToDays = function(ms){
    return(ms/this.DAY_IN_MILLISECONDS)
  }

  // this.moonthsOfYear = function(){
  //   startDay = this.firstNewDayOfYear()
  //   firstMoonthDay = this.firstNewMoonOfYear()
  //   zeroMonthDays =  this.msToDays(firstMoonthDay - startDay)

  //   moonth.

  //   console.log('zeroMontdays', zeroMonthDays)

  // }


  this.dayOfMoonth = function(){
    return (this.moonth.dayOfCycle());
  }

  this.firstNewMoonOfYear = function(){
    var startOfYear = this.year.firstDayStartOfCurrentCycle();
    return (this.moonth.lastDayEndOfCurrentCycle(startOfYear));
  }

  this.firstNewDayOfMoonth = function(){
    return (this.moonth.firstDayStartOfCurrentCycle());
  }

  this.moonthOfYear = function(){
    var adjustedTime =  - this.firstNewMoonOfYear();
    return (Math.ceil(adjustedTime/this.MOONTH_IN_MILLISECONDS) + 1);
  }

  // this.moonthsInYear = function(){
  //   var firstMoonthLag = this.firstNewMoonOfYear() - this.year.startOfCurrentCycle();
  //   return Math.ceil((this.YEAR_IN_MILLISECONDS - firstMoonthLag)/this.MOONTH_IN_MILLISECONDS);
  // }

  this.daysInMoonth = function(){
    return(this.moonth.daysInCycle())
  }




  this.displayString = function(){
    return "The " + this.dayOfMoonth() + "/" +this.daysInMoonth() + " day of the " + this.moonthOfYear() + "/" + this.moonthsInYear() + " Moonth of Year "
  }


}

module.exports = EarthCycles;