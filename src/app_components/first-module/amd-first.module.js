"use strict";

class FirstClass {

    constructor() {
        this.name = 'FirstClass';
    }

    hello() {
        return 'hello ' + this.name + '!';
    };

}

define([], function() {

    return {
        FirstClass: FirstClass
    };

});