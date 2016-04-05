/*!
 * Copyright © 2016 Eneko Sanz <contact@eneko.me>
 * File distributed under the MIT license.
 *
 * Description:
 * Generates a human readable timestamp that tells how many time
 * has elapsed since a given date until now.
 */

(function() {

  'use strict';

  /**
   * Generates a human readable timestamp that tells how many time
   * has elapsed since 'date' until now. If more than 30 days have
   * elapsed, generates a short date string. Some output examples:
   * '2 minutes ago', 'An hour ago', '3 days ago', '23 Feb'...
   * 
   * @param  {Date}    date  Date object.
   * 
   * @return {String}        A string with the elapsed time.
   */
  function readableTime(date) {

    // Time constants.
    var SECS_IN_A_MINUTE = 60,
        SECS_IN_AN_HOUR = SECS_IN_A_MINUTE * 60,
        SECS_IN_A_DAY = SECS_IN_AN_HOUR * 24,
        SECS_IN_A_MONTH = SECS_IN_A_DAY * 30;

    // Date and time now.
    var currentDate = new Date();
    
    // Time elapsed since 'date' in seconds.
    var elapsed = (currentDate.getTime() / 1000)
                  - (date.getTime() / 1000);

    if (elapsed < SECS_IN_A_DAY) {

      // Only a few seconds have elapsed; that's virtually now.
      if (elapsed < SECS_IN_A_MINUTE) {
        return 'Just now';
      } else {

        // Less than an hour has elapsed, so we return elapsed
        // time in minutes.
        if (elapsed < SECS_IN_AN_HOUR) {
          var mins = Math.round(elapsed / SECS_IN_A_MINUTE);
          if (mins === 1) {
            return 'A minute ago';
          } else {
            return  mins + ' minutes ago';
          }
        } else {

          // Less than a day but more than an hour has elapsed,
          // so we return elapsed time in hours.
          var hours = Math.round(elapsed / SECS_IN_AN_HOUR);
          if (hours === 1) {
            return 'An hour ago';
          } else {
            return  hours + ' hours ago';
          }
        }
      }
    } else {
      if (elapsed < SECS_IN_A_MONTH) {

        // Less than a month but more than a day has elapsed,
        // so we return elapsed time in days.
        var days = Math.round(elapsed / SECS_IN_A_DAY);
        if (days === 1) {
          return 'A day ago';
        } else {
          return  days + ' days ago';
        }
      } else {

        // More than 30 days have elapsed, so we erite a short
        // date representation (day + abbreviated month).
        var shortDate = date.getDate() + ' '
                        + getShortMonth(date.getMonth());

        // If date is not from the current year, include it in
        // the date also (day + abbreviated month + year).
        if (currentDate.getFullYear() !== date.getFullYear()) {
          shortDate += ' ' + date.getFullYear();
        }
        return shortDate;
      }
    }

    /**
     * Returns the abbreviated name of the month corresponding to
     * the month index passed as parameter (0-January, 1-February,
     * and so forth).
     * 
     * @param  {Number}  month  Zero-based month index.
     * 
     * @return {String}         Abbreviated name of the month.
     */
    function getShortMonth(month) {
      var months = ['Jan','Feb','Mar','Apr','May','Jun',
                    'Jul','Aug','Sep','Oct','Nov', 'Dec'];
      return months[month];
    }
  }

  // Check if we are in a browser or node.js environment.
  if (typeof module !== 'undefined' && module.exports) {

    // Export as CommonJS module.
    module.exports = readableTime;
  } else {

    // Export it as 'readableTime' global variable.
    this.readableTime = readableTime;
  }

}).call(this);
