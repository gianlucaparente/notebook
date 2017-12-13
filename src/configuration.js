let configuration = {

    application: {

        /**
         * Root module name.
         */
        rootModuleName: "NoteBook",

        /**
         * Root module dependencies.
         */
        rootModuleDependencies: [],

        /**
         * name or path of core module, if not declare fallback to default.
         */
        coreModule: "NBCoreModule",

        /**
         * Define modules to load.
         */
        modules: [
            {
                name: "FirstModule",
                dependencies: []
            },
            {
                name: "SecondModule",
                dependencies: []
            }
        ]
        
    }
    
    // navigation: {
    //     navigationService: "NavigationService"
    // }

};

define([], function () {
    return configuration;
});