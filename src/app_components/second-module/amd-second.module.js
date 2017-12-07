"use strict";

class SecondClass {

    constructor() {
        this.name = 'SecondClass';
    }

    hello() {
        return 'hello ' + this.name + '!';
    };

}

define([], function() {

    return {
        SecondClass: SecondClass
    };

});