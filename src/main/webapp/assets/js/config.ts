/// <reference path="../typings/requirejs/requirejs.d.ts" />

require.config({
        baseURL: "/assets/js",
        paths: {
            'angular': 'vendor/angular/angular',
            'chartjs': 'vendor/chartjs/Chart',
            'chart_js': 'vendor/Chart.js/Chart',
            'angular-bootstrap': 'vendor/angular-bootstrap/ui-bootstrap-tpls',
            'module': 'js/modules',
            'controllers': 'modules/main/controllers',
            'services': 'modules/main/services',
            'directives': 'modules/main/directives',
            'd3_chart': 'vendor/d3chart',
            'ng-slider' : 'vendor/ng-slider/dist/ng-slider.min',
            'angular-slick' : "vendor/angular-slick/dist/slick",
            'slick-carousel' : "vendor/slick-carousel/slick/slick.min",
            'jquery':  'vendor/jquery/dist/jquery.min',
            'moment': 'vendor/moment/min/moment-with-locales.min',
            'angular_route': 'vendor/angular-route/angular-route'
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
            },
            'ng-slider': {
                deps: ['angular']
            },
            'slick-carousel': {
                deps: ['jquery']
            },
            'angular-slick':{
                deps: ['angular','slick-carousel']
            },
            'jquery': {
                exports: 'jquery'
            },
            'angular_route': {
                deps: ['angular']
            }
        }
    }
);

require(["modules/main/main"]);
