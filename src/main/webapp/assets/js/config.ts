/// <reference path="../typings/requirejs/requirejs.d.ts" />

var loc = "main";
require.config({
        baseURL: "/assets/js",
        paths: {
            'angular': 'vendor/angular/angular',
            'chartjs': 'vendor/chartjs/Chart',
            'chart_js': 'vendor/Chart.js/Chart',
            'angular-bootstrap': 'vendor/angular-bootstrap/ui-bootstrap',
            'module': 'js/modules',
            'controllers': 'modules/' + loc +'/controllers',
            'services': 'modules/' + loc +'/services',
            'directives': 'modules/' + loc +'/directives',
            'd3_chart': 'vendor/d3chart'
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'chartjs': {
                deps: ['chart_js','angular']
            },
            'chart.js': {
            },
            'angular-bootstrap': {
                deps: ['angular']
            },
            'd3_chart': {
            }
        }
    }
);

require(["modules/main/config"]);
