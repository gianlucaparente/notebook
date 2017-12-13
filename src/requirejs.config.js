var requireConfig = {
    "map": {},
    "paths": {
        "FirstModule": [
            "./app_components/first-module/amd-first.module"
        ],
        "SecondModule": [
            "./app_components/second-module/amd-second.module"
        ],
        "NBCoreModule": [
            "./app_components/nb-core/nb-core.module"
        ],
        "angular": [
            "../../node_modules/angular/angular"
        ]
    },
    "shim": {
        "angular": {
            "deps": [],
            "exports": "angular"
        }  
    },
    "deps": [
        "./bootstrap"
    ]
};

requirejs.config(requireConfig);
