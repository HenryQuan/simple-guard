const mydata = {
  hello: {
    yes: '1',
    no: '2',
    hello: {
      yes: '3',
      no: '4',
      hello: {
        yes: '5',
        no: '6',
        hello: {
          yes: '7',
          no: '8'
        }
      }
    }
  },
  list: [
    { 1: { num: 1 } },
    { 2: { num: 2 } },
    { 3: { num: 3 } },
    { 4: { num: 4 } },
    { 5: { num: 5 } },
  ]
};

/**
 * Reference: https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a
 */
// take object, path and the default value
var guard = function (obj, path, dval) {
  if (obj == null) return dval;
  // check if object is valid and path does not start with or end with '.'
  if (!path.startsWith('.') && !path.endsWith('.')) {
    // get path as an array and it must have at least 2 elements
    var p = path.split('.');
    if (p && p.length > 0) {
      // o is the object (accumulator), and n is from path (current value)
      // o && o[n] -> to go further or just return default value
      // only asking for the object
      return p.reduce(function (o, n) { return (o && o[n]) ? o[n] : dval; }, obj);
    }
  }
  return dval;
};

// Some basic tests
var assert = require('assert');
assert(guard(mydata, 'hello.hello.hello.hello.yes', 0) == 7);
assert(guard(mydata, 'hello.hello.hello.hello.hello', false) == false);
assert(guard(mydata, 'hello.hello.dsadas', 0) == 0);
