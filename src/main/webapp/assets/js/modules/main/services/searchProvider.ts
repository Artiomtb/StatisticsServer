/// <reference path="../../../shared/interfaces.ts"/>

class SearchProvider  {
    setPagePath = function (path: string) {
        this.pagePathUrl = path;
    }

    $get = ["$http", "$location", function ($http, $location) {
       return new SearchImpl($http, $location, this.pagePathUrl);
    }];
}

class SearchImpl implements ISearchService {

    static $inject = ["$http", "$location"];

    static SEARCH_PUBS_PATH = "/monitor/pubs";
    static SEARCH_STUDENTS_PATH = "/monitor/students";
    static SEARCH_ACTION = "search";
    static AUTOCOMPLETE_ACTION = "autocomplete";
    static PAGE_RESULTS = "/monitor/search";
    static DESTINATION_STUDENTS_PATH = "/monitor/students/";
    static DESTINATION_PUBS_PATH = "/monitor/pubs/";
    destinationPath: string;

    constructor(private $http, private $location, private pagePathUrl){
    }

    autoCompletePubsHandler =(text: string)=> {
        return this.$http.post(SearchImpl.SEARCH_PUBS_PATH,null ,{
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            params: {action: SearchImpl.AUTOCOMPLETE_ACTION,
            text: text
            }})
    }

    autoCompleteStudentsHandler =  (text: string) => {
        return this.$http.post(SearchImpl.SEARCH_STUDENTS_PATH, null,{
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            params: {action: SearchImpl.AUTOCOMPLETE_ACTION,
            text: text}})
    }

    searchPubsHandler =  (text: string)=> {
        this.$http.post(SearchImpl.SEARCH_PUBS_PATH,null, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            params: {action: SearchImpl.SEARCH_ACTION, text: text}}).then(function(data) {
            this.searchResults = data.data;
            this.destinationPath = SearchImpl.DESTINATION_PUBS_PATH;
        }, function () {
            console.log("search failed!");
        });
    }

    searchStudentsHandler =  (text: string)=> {
        this.$http.post(SearchImpl.SEARCH_STUDENTS_PATH, null, {
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
            params: {action: SearchImpl.SEARCH_ACTION, text: text}}).then(function (data) {
            this.searchResults = data.data;
            this.destinationPath = SearchImpl.DESTINATION_STUDENTS_PATH;
        }, function () {
            console.log("search failed");
        })
    }

    getActiveDestinationPath =()=> {
        return this.destinationPath;
    }

    resultNavHandlerStudents = (student_id)=> {
        this.$location.path(SearchImpl.DESTINATION_STUDENTS_PATH + "/" + student_id);
    }

    resultNavHandlerPubs = (pub_id)=> {
        this.$location.path(SearchImpl.DESTINATION_PUBS_PATH + pub_id);
    }

    searchResults = [];
}

export = SearchProvider;