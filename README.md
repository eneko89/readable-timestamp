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
One day | One day ago
Between 1 - 30 days | 4 days ago
More than a month, but in the current year | 23 Feb
More than a month, but in another year | 9 Dec 2015


Usage
-----

Works both required as CommonsJS module in node or in the browser.


```javascript

var ago = require('readable-timestamp');

var now = new Date();

// It will log 'Just now'.
console.log(readableTime(now));

```

As a CommonsJS module it exports a function, and in a browser environment
declares 'readableTime()' function in the global scope.