readable-timestamp
==================

Generates a human readable timestamp that tells how many time has elapsed since
a given date until now. If more than 30 days have elapsed, generates a short date
string: day + abbreviated month + year (last one only if the given date it's not
in the current year).

Elapsed time | Output example
------------ | --------------
Less than a minute | Just now
One minute | A minute ago
Between 1 - 60 minutes | 7 minutes ago
One hour | An hour ago
Between 1 - 24 hours | 13 hours ago
One day | A day ago
Between 1 - 30 days | 4 days ago
More than a month, but in the current year | 23 Feb
More than a month, but in another year | 9 Dec 2015


Usage
-----

Works both required as CommonsJS module in node or in the browser.

As a CommonsJS module it exports a function, and in a browser environment
declares 'readableTime()' function in the global scope.

```javascript

var readableTime = require('readable-timestamp');

var now = new Date();

// It will log 'Just now'.
console.log(readableTime(now));

```

You can also generate absolute timestamps providing an options.format as the
second parameter. Accepts 'absolute', 'absolute-full' and 'absolute-short'.

```javascript

var readableTime = require('readable-timestamp');

// At time of writing this, it was 15 April 2016.
var now = new Date();

// It will log '15 Apr', but if 'now' contained a date from 15 April 2015,
// it would log '15 Apr 2015', because it's form the past year. Using the
// 'absolute-full' format will always add the year and with 'absolute-short'
// it won't never do it.
console.log(readableTime(now, { format: 'absolute' }));

```