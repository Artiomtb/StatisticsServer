/// <reference path="../../../shared/interfaces.ts"/>

class SearchProvider  {
    pagePath = function (path: string) {
        this.pagePathUrl = path;
    }

    $get = ["$http","$location", function ($http, $location) {
        new SearchImpl($http, $location, this.pagePathUrl);
    }];
}

class SearchImpl implements ISearchService {

    static $inject = ["$http", "$location"];

    static SEARCH_PUBS_PATH = "/monitor/pubs";
    static SEARCH_STUDENTS_PATH = "/monitor/students";
    static SEARCH_ACTION = "search";
    static AUTOCOMPLETE_ACTION = "autocomplete";
    static PAGE_RESULTS = "/monitor/search"

    constructor(private $http, private $location, private pagePathUrl){

    }

    autoCompletePubsHandler = function () {
        return this.$http.post(SearchImpl.SEARCH_PUBS_PATH, {params: {action: SearchImpl.AUTOCOMPLETE_ACTION}})
    }

    autoCompleteStudentsHandler = function () {
        return this.$http.post(SearchImpl.SEARCH_STUDENTS_PATH,{params: {action: SearchImpl.AUTOCOMPLETE_ACTION}})
    }

    searchPubsHandler = function () {
        this.$http.post(SearchImpl.SEARCH_PUBS_PATH, {params: {action: SearchImpl.SEARCH_ACTION}}).then(function(data) {
            this.searchResults = data.data;
            this.$loaction.path  = this.pagePathUrl;
        }, function () {
            console.log("search failed!");
        });
    }

    searchStudentsHandler = function () {
        this.$http.post(SearchImpl.SEARCH_ACTION, {params: {action: SearchImpl.SEARCH_ACTION}}).then(function (data) {
            this.searchResults = data.data;
            this.$loaction.path  = this.pagePathUrl;
        }, function () {
            console.log("search failed");
        })
    }

    searchResults = [];
}

export = SearchProvider;