define([
    'angular',
    'configuration'
], function (angular, configuration) {

    console.log("BOOTSTRAP :: Start bootstrap..");

    if (configuration.application.coreModule) {

        console.log("BOOTSTRAP :: Use core module: '" + configuration.application.coreModule + "'");

        requirejs([configuration.application.coreModule], function(coreModule) {
            bootstrap(configuration, coreModule);
        });

    } else {

        console.log("BOOTSTRAP :: Use default core module.");

        let defaultCore = {
            name: 'core',
            provider: coreProvider
        };

        bootstrap(configuration, defaultCore);

    }

    console.log("BOOTSTRAP :: End bootstrap.");

    class Core {

        constructor($q, configuration) {
            this.$q = $q;
            this.configuration = configuration;
            this.initialize();
        }

        initialize() {

            console.log("CORE :: Start load modules..");

            this.loadModules(this.configuration.application.modules)
                .then(() => {

                    console.log("CORE :: End load modules.");

                    console.log("CORE :: Start register modules..");
                    let modules = this.registerModules(this.configuration.application.modules);
                    console.log("CORE :: End register modules.");

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

                console.log("CORE :: Register modules: " + modulesRegistered.join());

                return modulesRegistered;

            } else {
                console.log("CORE :: No modules found to register.");
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
                    console.log("CORE :: Load modules: " + modulesName.join());
                    q.resolve();
                });

            } else {
                console.log("CORE :: No modules found to load.");
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

    function bootstrap(configuration, coreModule) {

        console.log("BOOTSTRAP :: Core module loaded: '" + configuration.application.coreModule + "'");

        let app = angular.module(configuration.application.rootModuleName, configuration.application.rootModuleDependencies);
        console.log("BOOTSTRAP :: Create root module '" + configuration.application.rootModuleName + "' with dependencies: " + configuration.application.rootModuleDependencies);

        app.provider(coreModule.name, coreModule.provider);
        console.log("BOOTSTRAP :: Register core provider.");

        app.config([coreModule.name + 'Provider', function(coreProvider) {
            console.log("BOOTSTRAP :: Start config phase..");
            coreProvider.configureProvider(configuration);
            console.log("BOOTSTRAP :: Set configuration to core provider.");
            console.log("BOOTSTRAP :: End config phase.");
        }]);

        app.run([coreModule.name, function(core) {
            console.log("BOOTSTRAP :: Start run phase..");
            console.log("BOOTSTRAP :: End run phase.");
        }]);

        console.log("BOOTSTRAP :: Start bootstrap AngularJS..");
        angular.element(document).ready(function () {
            angular.bootstrap(document, [configuration.application.rootModuleName]);
            console.log("BOOTSTRAP :: AngularJS bootstrapped successfully on document element.");
        });

    }
    
});



