/// <reference path="../../../shared/interfaces.ts"/>
declare var $;

class SearchProvider  {
    setPagePath = function (path: string) {
        this.pagePathUrl = path;
    }

    $get = ["$http", function ($http) {
       return new SearchImpl($http, this.pagePathUrl);
    }];
}

class SearchImpl implements ISearchService {

    static SEARCH_PUBS_PATH = "/monitor/pubs";
    static SEARCH_STUDENTS_PATH = "/monitor/students";
    static SEARCH_ACTION = "search";
    static AUTOCOMPLETE_ACTION = "autocomplete";
    static PAGE_RESULTS = "/monitor/search";
    static DESTINATION_STUDENTS_PATH = "/monitor/students/";
    static DESTINATION_PUBS_PATH = "/monitor/pubs/";
    destinationPath: string;

    constructor(private $http, private pagePathUrl){
    }

    getPubsResultsPath() {
        return SearchImpl.DESTINATION_PUBS_PATH;
    }

    getStudentsPath(){
        return SearchImpl.DESTINATION_STUDENTS_PATH;
    }

    autoCompletePubsHandler =(text: string)=> {
        this.destinationPath = SearchImpl.DESTINATION_PUBS_PATH;
        return this.$http({
            method: 'POST',
            url: SearchImpl.SEARCH_PUBS_PATH,
            data: $.param({
                action: SearchImpl.AUTOCOMPLETE_ACTION,
                text: text
            }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }
         ).success(function (data) {
                var resItems = {items: []}
                resItems.items = data.items.map(function(item) {
                    item.name = item.name.replace("<=-b","").replace("b-=>", "").replace(/^\s+/,"");
                    return item;
                });
                return resItems;
            });
    }

    autoCompleteStudentsHandler =  (text: string) => {
        this.destinationPath = SearchImpl.DESTINATION_STUDENTS_PATH;
        return this.$http({
            method: 'POST',
            url: SearchImpl.SEARCH_STUDENTS_PATH,
            data: $.param({
                action: SearchImpl.AUTOCOMPLETE_ACTION,
                text: text}),
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        })
    }

    searchPubsHandler =  (text: string)=> {
        this.$http({
            method: 'POST',
            url: SearchImpl.SEARCH_PUBS_PATH,
            data: $.param({
                action: SearchImpl.SEARCH_ACTION,
                text: text
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function(data) {
                this.searchResults = data.data;
                this.destinationPath = SearchImpl.DESTINATION_PUBS_PATH;
        }, function () {
            console.log("search failed!");
        });
    }

    searchStudentsHandler =  (text: string)=> {
        this.$http({
                method: 'POST',
                url: SearchImpl.SEARCH_STUDENTS_PATH,
                data: $.param({
                action: SearchImpl.SEARCH_ACTION,
                text: text}),
                headers: {"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}
            }).then(function (data) {
                this.searchResults = data.data;
                this.destinationPath = SearchImpl.DESTINATION_STUDENTS_PATH;
        }, function () {
            console.log("search failed");
        })
    }

    getActiveDestinationPath =()=> {
        return this.destinationPath;
    }
    searchResults = [];
}

export = SearchProvider;