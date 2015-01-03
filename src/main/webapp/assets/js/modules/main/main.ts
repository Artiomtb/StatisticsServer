/// <reference path="../../../typings/dt-angular/angular.d.ts"/>
/// <reference path="../../../typings/requirejs/requirejs.d.ts"/>
/// <amd-dependency path='angular'/>
/// <amd-dependency path='angular_route'/>
/// <amd-dependency path="shared/directives/pagination" />
/// <amd-dependency path="shared/directives/trend" />
/// <amd-dependency path="chartjs" />
/// <amd-dependency path="directives/students_bar_chart" />
/// <amd-dependency path="directives/materials_trend" />
/// <amd-dependency path="directives/materials_bar_chart" />
/// <amd-dependency path="angular-bootstrap" />

import MainCotroller = require("controllers/MainController");
import NodesController = require("controllers/NodesController");
import StudentsController = require("controllers/StudentsController");
import NodeStatistics = require("controllers/NodeStatistics");
import StudentStatistics = require("controllers/StudentStatistics");
import StudentNodeStatistics = require("controllers/StudentNodeStatistics");

import nodes = require("directives/nodes");
import materialsTrend = require("directives/materials_trend");
import students = require ("directives/students");
var pagination = require("shared/directives/pagination");
var trend = require("shared/directives/trend");
var barChart = require("directives/students_bar_chart");
var materialsBarChart = require("directives/materials_bar_chart");

angular.module('app',['ngRoute','tc.chartjs','ui.bootstrap']);

angular.module('app')
    .constant(
        "PATH_CONSTANTS",{
        "NODES_PATH": "/monitor/nodes",
        "GENERAL_NODE_PATH": "/monitor/general/node",
        "GENERAL_MATERIAL_PATH": "/monitor/general/material",
        "STUDENTS_PATH": "/monitor/students",
        "STUDENT": "/monitor/student/nodes",
        "STUDENT_NODE_MATERIALS": "/monitor/student/node",
        "STUDENT_MATERIAL": "/monitor/student/material"});

angular.module("app").config(($routeProvider, PATH_CONSTANTS)=>{
    $routeProvider
        .when(PATH_CONSTANTS.NODES_PATH + "/:page",{controller: "NodesController", templateUrl: "/partials/nodes.html"})
        .when(PATH_CONSTANTS.GENERAL_NODE_PATH + "/:node_id", {controller: "NodeStatistics", templateUrl: "/partials/node_statistics.html"})
        .when(PATH_CONSTANTS.GENERAL_MATERIAL_PATH + "/:material_id",{controller: "MaterialStatistics", templateUrl: "/partials/material_statistics.html"})

        .when(PATH_CONSTANTS.STUDENTS_PATH + "/:page",{controller: "StudentsController",templateUrl:"/partials/students.html"})
        .when(PATH_CONSTANTS.STUDENT + "/:party_id", {controller: "StudentStatistics", templateUrl: "/partials/student_statistics.html"})
        .when(PATH_CONSTANTS.STUDENT_NODE_MATERIALS + "/:party_id/:node_id", {controller: "StudentNodeStatistics", templateUrl: "/partials/student_node_statistics.html"})
        .when(PATH_CONSTANTS.STUDENT_MATERIAL + "/:party_id/:material_id", {controller: "StudentMaterial", templateUrl: "/partials/student_material.html" })
        .otherwise({redirectTo: PATH_CONSTANTS.NODES_PATH+"/1"});
});

angular.module("app").controller('NodesController', NodesController);
angular.module("app").controller("StudentsController", StudentsController);
angular.module("app").controller("MainContoller", MainCotroller);
angular.module("app").controller("NodeStatistics", NodeStatistics);
angular.module("app").controller("StudentStatistics", StudentStatistics);
angular.module("app").controller("StudentNodeStatistics", StudentNodeStatistics);

angular.module("app").directive("nodes", ["PATH_CONSTANTS", nodes]);
angular.module("app").directive("students",["PATH_CONSTANTS", students]);
angular.module("app").directive("pageNumbers", pagination);
angular.module("app").directive("trend", trend);
angular.module("app").directive("barChart", barChart);
angular.module("app").directive("materialsTrend", materialsTrend);
angular.module("app").directive("materialsBarChart", materialsBarChart);

angular.bootstrap(document,["app"]);

console.log("succesful loading");
