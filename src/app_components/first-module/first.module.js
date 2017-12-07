"use strict";

var firstModule = (function(){

    class FirstClass {

        constructor() {
            this.name = 'FirstClass';
        }
        
        hello() {
            return 'hello ' + this.name + '!';
        };

    }

    return {
        FirstClass: FirstClass
    };

})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = firstModule;
}