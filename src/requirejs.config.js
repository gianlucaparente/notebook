var requireConfig = {
    "map": {},
    "paths": {
        "first-module": [
            "./app_components/first-module/amd-first.module"
        ],
        "second-module": [
            "./app_components/second-module/amd-second.module"
        ],
        "angular": [
            "./app_components/angular/angular"
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
