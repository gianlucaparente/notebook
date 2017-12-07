function registerModules(modules) {

    console.log("Start register modules..");

    if (!angular) {
        console.error("Angular not defined.");
    }

    if (modules && modules.length > 0) {

        let modulesRegistered = [];

        modules.forEach((module) => {
            angular.module(module.name, module.dependencies);
            modulesRegistered.push(module.name);
        });

        console.log("Register modules: " + modulesRegistered.join());

    } else {
        console.log("No modules found to register.");
    }

    console.log("End register modules.");

}

define([
    'angular',
    'configuration'
], function(angular, configuration) {

    console.log("Start bootstrap AngularJS..");

    registerModules(configuration.application.coreModules);

    angular.element(document).ready(function() {
        angular.bootstrap(document, []);
        console.log("Angular bootstrapped successfully on document.");
    });
    
});

