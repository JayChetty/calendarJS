var Cycle = require('./cycle')

var EarthCycles = function(){
  //Constants for Setup
  this.DAY_IN_MILLISECONDS = 24 * 60 * 60 *1000;
  this.AN_AXIS_MAX_N = new Date(2012,12,21,11,12);
  this.YEAR_IN_DAYS = 365.24219;
  this.YEAR_IN_MILLISECONDS = this.YEAR_IN_DAYS * this.DAY_IN_MILLISECONDS;

  this.A_NEW_MOON = new Date(2012,11,13,22,8);
  this.MOONTH_IN_DAYS = 29.53059;
  this.MOONTH_IN_MILLISECONDS = this.MOONTH_IN_DAYS * this.DAY_IN_MILLISECONDS;

  this.YEAR_IN_MOONTHS = (this.YEAR_IN_SECONDS/this.MOONTH_IN_SECONDS);

  this.year = new Cycle(this.AN_AXIS_MAX_N,this.YEAR_IN_MILLISECONDS);
  this.moonth = new Cycle(this.A_NEW_MOON, this.MOONTH_IN_MILLISECONDS);

  this.yearsPassed = function(pointInTime){
    return (this.year.cyclesSinceAnchor(pointInTime))
  }
}

module.exports = EarthCycles