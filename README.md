# White List Object

[![Build Status](https://travis-ci.org/conorhastings/whitelist-object.svg?branch=master)](https://travis-ci.org/conorhastings/whitelist-object)

A small module that takes in an object and returns a new object only containing white listed keys.

### Args
* object - the object you want to reduce to only whitelisted keys.
* whitelist - an array containing the keys you want the new object to maintain
* shallow - optional true false value. if true, will only look for whitelisted keys in top level object. defaults to false.
 
### Install
``` npm i whitelist-object --save ```

### Example

```javascript
var whiteListObject = require("whitelist-object");

var myObject = {
	cool: "guy",
    conor: "hastings",
    wow: "so cool",
    but: {is: "he", no: "he isn't"}
};
var whiteListedObject = whiteListObject(myObject, ["cool", "but", "is"], false);
//returns {cool: "guy", but: {is: "he"}};
var shallowWhiteListObject = whiteListObject(myObject, ["cool", "but", "is"], true);
//returns {cool: "guy", but: {is: "he", no: "he isn't"}};
```
