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
   * @param  {Date}    date           Date object.
   *
   * @param  {Object}  [opts]         Optional settings.
   * 
   * @param  {String}  [opts.format]  By default, readableTime()
   *                                  generates relative time-
   *                                  stamps for the first month.
   *                                  Providing 'absolute' here
   *                                  will always produce absolute
   *                                  timestamps without the year
   *                                  for current year and with
   *                                  the year for past years.
   *                                  Provide 'absolute-full' to
   *                                  always generate dates with
   *                                  year and 'absolute-short'
   *                                  to generate them without it.
   * 
   * @return {String}                 Human readable timestamp.
   */
  function readableTime(date, opts) {

    // Date and time now.
    var currentDate = new Date();

    // If an absolute, different from the default format has
    // been specified in 'opts.format', generate it and return.
    if (opts && opts.format) {
      if (opts.format === 'absolute') {
        return absoluteDate(date, currentDate.getFullYear()
                                    !== date.getFullYear());
      } else {
        if (opts.format === 'absolute-full') {
          return absoluteDate(date, true);
        } else {
          if (opts.format === 'absolute-short') {
            return absoluteDate(date, false);
          }
        }
      }
    }

    // Time constants.
    var SECS_IN_A_MINUTE = 60,
        SECS_IN_AN_HOUR = SECS_IN_A_MINUTE * 60,
        SECS_IN_A_DAY = SECS_IN_AN_HOUR * 24,
        SECS_IN_A_MONTH = SECS_IN_A_DAY * 30;

    // Time elapsed since 'date' in seconds.
    var elapsed = (currentDate.getTime() / 1000)
                  - (date.getTime() / 1000);

    // Generate the default readable timestamp format (if we
    // arrived here, no alternative valid 'opts.format' has
    // been provided).
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

        // More than 30 days have elapsed, so we return a readable
        // absolute date representation: day + abbreviated month +
        // year, (last one only if date isn't in the current year).
        return absoluteDate(date, currentDate.getFullYear()
                                    !== date.getFullYear());
      }
    }

    /**
     * Generates a readable absolute timestamp with day, abbreviated
     * month and optionally the year (e.g. '23 Feb' or '5 May 2015').
     * 
     * @param  {Date}     date         Date object.
     * 
     * @param  {Boolean}  includeYear  Wether to include the year
     *                                 in the timestamp or not.
     * 
     * @return {String}                Generated readable timestamp.
     */
    function absoluteDate(date, includeYear) {

      // Zero indexed abbreviated month names.
      var months = ['Jan','Feb','Mar','Apr','May','Jun',
                    'Jul','Aug','Sep','Oct','Nov', 'Dec'];

      // Short date without the year (e.g. '23 Feb').
      var result = date.getDate() + ' ' + months[date.getMonth()];

      if (includeYear) {
        result += ' ' + date.getFullYear();
      }
      return result;
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
