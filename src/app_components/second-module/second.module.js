"use strict";

var secondModule = (function(){

    class SecondClass {

        constructor() {
            this.name = 'SecondClass';
        }
        
        hello() {
            return 'hello ' + this.name + '!';
        };

    }

    return {
        SecondClass: SecondClass
    };

})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = secondModule;
}