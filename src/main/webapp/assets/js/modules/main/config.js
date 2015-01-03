/// <reference path="../../../typings/requirejs/requirejs.d.ts"/>
console.log("in local config");
require.config({
    paths: {
        angular_route: 'vendor/angular-route/angular-route'
    },
    shim: {
        'angular_route': {
            deps: ['angular']
        }
    }
});
require(['modules/main/main']);
//# sourceMappingURL=config.js.map