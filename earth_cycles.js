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

  this.year = new Cycle(this.AN_AXIS_MAX_N.valueOf(),this.YEAR_IN_MILLISECONDS, pointInTime, true);
  this.moonth = new Cycle(this.A_NEW_MOON.valueOf(), this.MOONTH_IN_MILLISECONDS, pointInTime, true);

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

  this.daysInYear = function(){
    return(this.year.daysInCycle())
  }

  this.msToDays = function(ms){
    return(ms/this.DAY_IN_MILLISECONDS)
  }

  this.moonthsOfYear = function(){
    moonths = []
    point = this.firstNewDayOfYear()
    sum = 0

    while (point < this.lastEndDayOfYear()) {
      moonth = new Cycle(this.A_NEW_MOON.valueOf(), this.MOONTH_IN_MILLISECONDS, point, true);
      startDayMoonth = moonth.firstDayStartOfCurrentCycle()
      endDayMoonth = moonth.lastDayEndOfCurrentCycle()

      if (moonths.length === 0) {
        daysInMoonth =  this.msToDays(endDayMoonth - point)
      }
      else {
        if (endDayMoonth > this.lastEndDayOfYear()){
          daysInMoonth = this.msToDays(this.lastEndDayOfYear() - startDayMoonth)
        }
        else {
          daysInMoonth =  moonth.daysInCycle()
        }
      }

      moonths.push(daysInMoonth)
      sum = sum + daysInMoonth

      point = endDayMoonth + this.DAY_IN_MILLISECONDS
    }

    return(moonths)

  }


  this.dayOfMoonth = function(){
    return (this.moonth.dayOfCycle());
  }

  this.firstNewMoonOfYear = function(){
    var startOfYear = this.year.firstDayStartOfCurrentCycle();
    moonth = new Cycle(this.A_NEW_MOON.valueOf(), this.MOONTH_IN_MILLISECONDS, startOfYear , true);
    return (moonth.lastDayEndOfCurrentCycle(startOfYear));
  }

  this.moonthOfYear = function(){
    found = false
    index = 0
    sum = 0
    while (!found) {
      sum = sum + this.moonths[index]
      if ( this.dayOfYear() < sum) {
        found = true
      }
      else {
        index = index + 1
      }
    }

    return (index)
  }


  this.daysInMoonth = function(){
    return(this.moonth.daysInCycle())
  }


  this.displayString = function(){
    return "The " + this.dayOfMoonth() + "/" +this.daysInMoonth() + " day of the " + this.moonthOfYear() + "/" + this.moonthsInYear() + " Moonth of Year "
  };

  this.moonths = this.moonthsOfYear();


}

module.exports = EarthCycles;