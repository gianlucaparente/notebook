define([
    'first-module', 
    'second-module'
], function(firstModule, secondModule) {

    let firstClassInstance = new firstModule.FirstClass();
    let secondClassInstance = new secondModule.SecondClass();

    console.log(firstClassInstance.hello());
    console.log(secondClassInstance.hello());

});

