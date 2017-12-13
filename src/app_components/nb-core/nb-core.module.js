class Core {

    constructor($q, configuration) {
        this.$q = $q;
        this.configuration = configuration;
        this.initialize();
    }

    initialize() {

        console.log("NB-CORE: Start load modules..");

        this.loadModules(this.configuration.application.modules)
            .then(() => {

                console.log("NB-CORE: End load modules.");

                console.log("NB-CORE: Start register modules..");
                let modules = this.registerModules(this.configuration.application.modules);
                console.log("NB-CORE: End register modules.");

            })
            .catch((error) => {
                console.error("Error while loading modules.", error);
            });

    }

    registerModules(modules) {

        if (modules && modules.length > 0) {

            let modulesRegistered = [];

            modules.forEach((module) => {
                angular.module(module.name, module.dependencies);
                modulesRegistered.push(module.name);
            });

            console.log("NB-CORE: Register modules: " + modulesRegistered.join());

            return modulesRegistered;

        } else {
            console.log("NB-CORE: No modules found to register.");
            return [];
        }


    }

    loadModules(modules) {

        let q = this.$q.defer();

        if (modules && modules.length > 0) {

            let modulesName = [];

            modules.forEach((module) => {
                modulesName.push(module.name);
            });

            // define(modulesName, function() {
            requirejs(modulesName, function (first, second) {
                console.log("NB-CORE: Load modules: " + modulesName.join());
                q.resolve();
            });

        } else {
            console.log("NB-CORE: No modules found to load.");
            q.resolve();
        }

        return q.promise;

    }

}

function coreProvider() {

    var _configuration = undefined;

    this.configureProvider = function(configuration) {
        _configuration = configuration;
    };

    this.$get = ["$q", function($q) {
        return new Core($q, _configuration);
    }];

}

define([], function() {

    return {
        name: "nbCore",
        provider: coreProvider
    };

});