/// <reference path="../../../shared/interfaces.ts"/>
declare var $;
class SearchProvider  {
    setPagePath = function (path: string) {
        this.pagePathUrl = path;
    }

    $get = ["$http", "SEARCH_OPTIONS", function ($http, SEARCH_OPTIONS) {
       return new SearchImpl($http, SEARCH_OPTIONS,this.pagePathUrl);
    }];
}

class SearchImpl implements ISearchService {

    static SEARCH_PUBS_PATH = "/monitor/pubs";
    static SEARCH_STUDENTS_PATH = "/monitor/students";
    static SEARCH_ACTION = "search";
    static AUTOCOMPLETE_ACTION = "autocomplete";
    static PAGE_RESULTS = "/monitor/search";
    static DESTINATION_STUDENTS_PATH = "/monitor/student/pubs/";
    static DESTINATION_PUBS_PATH = "/monitor/general/pub/";
    destinationPath: string;

    private prepareSearchResult (input): string {
        return input.replace(/<=-b/g,"").replace(/b-=>/g, "").replace(/^\s+/,"").toLowerCase();
    }
    constructor(private $http, private SEARCH_OPTIONS, private pagePathUrl){
    }

    getPubsResultsPath() {
        return SearchImpl.DESTINATION_PUBS_PATH;
    }

    getStudentsPath(){
        return SearchImpl.DESTINATION_STUDENTS_PATH;
    }

    autoCompletePubsHandler =  (text: string)=> {
        this.destinationPath = SearchImpl.DESTINATION_PUBS_PATH;
        var _thiss = this;
        return this.$http({
            method: 'POST',
            url: SearchImpl.SEARCH_PUBS_PATH,
            data: $.param({
                action: SearchImpl.AUTOCOMPLETE_ACTION,
                text: text
            }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }
         ).success((data)=> {
                var resItems = {items: []}
                if(data.items != undefined) {
                    resItems.items = data.items.map(function(item) {
                        item.name = _thiss.prepareSearchResult(item.name);
                        return item;
                    });
                }
                return resItems;
            });
    }

    autoCompleteStudentsHandler =  (text: string)=> {
        this.destinationPath = SearchImpl.DESTINATION_STUDENTS_PATH;
        var _thiss = this;
        return this.$http({
            method: 'POST',
            url: SearchImpl.SEARCH_STUDENTS_PATH,
            data: $.param({
                action: SearchImpl.AUTOCOMPLETE_ACTION,
                text: text}),
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }).success((data)=> {
            var resItems = {items: []}
            if(data.items != undefined){
                resItems.items = data.items.map(function(item) {
                    item.name = _thiss.prepareSearchResult(item.name);
                    return item;
                });
            }
            return resItems;
        });
    }

    searchPubsHandler =  (text: string, page: number)=> {
        var thiss = this;
        return this.$http({
            method: 'POST',
            url: SearchImpl.SEARCH_PUBS_PATH,
            data: $.param({
                action: SearchImpl.SEARCH_ACTION,
                text: text,
                page: page
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).success(function(data) {
            var resItems = {items: []}
            if(data.results != undefined) {
                resItems.items = data.items.map(function(item) {
                    item.name = thiss.prepareSearchResult(item.name);
                    return item;
                });
            }
            return resItems;
        });
    }

    searchStudentsHandler =  (text: string, page: number)=> {
        var thiss = this;
        return this.$http({
                method: 'POST',
                url: SearchImpl.SEARCH_STUDENTS_PATH,
                data: $.param({
                action: SearchImpl.SEARCH_ACTION,
                text: text,
                page: page}),
                headers: {"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}
            }).success(function(data){
            var resItems = {items: []};
            if(data.results != undefined) {
                resItems.items = data.results.items.map(function(item) {
                    item.name = thiss.prepareSearchResult(item.name);
                    return item;
                });
            }
            return resItems;
        });
    }

    getSearchResults(searchArea: string, queryString: string, page: number): any {
        page = page || 1;
        if(searchArea == this.SEARCH_OPTIONS.STUDENT) {
            return this.searchStudentsHandler(queryString, page)
                       .success((data)=>{ data.resultPath = this.getStudentsPath()}) ;
        } else if(searchArea == this.SEARCH_OPTIONS.PUBS) {
            return this.searchPubsHandler(queryString, page)
                .success((data)=> {data.resultPath = this.getPubsResultsPath()});
        }
    }

    getActiveDestinationPath =()=> {
        return this.destinationPath;
    }

    getResultsPath () {
        return SearchImpl.PAGE_RESULTS;
    }

    getSearchConfiguration(areaActivation: string, defaultValue: string) {
        areaActivation = areaActivation || this.SEARCH_OPTIONS.STUDENT;
        defaultValue = defaultValue || "";
        return {
            defaultValue: defaultValue,
            default: this.SEARCH_OPTIONS.PUBS,
            searchPage: SearchImpl.PAGE_RESULTS,
            params: [{
                value: this.SEARCH_OPTIONS.STUDENT,
                name: "Студенти",
                isActive: areaActivation == this.SEARCH_OPTIONS.STUDENT,
                autocompleteHandler: this.autoCompleteStudentsHandler,
                resultNavPath: this.getStudentsPath()
            },{
                value: this.SEARCH_OPTIONS.PUBS,
                name: "Дисципліни",
                isActive: areaActivation == this.SEARCH_OPTIONS.PUBS,
                autocompleteHandler: this.autoCompletePubsHandler,
                resultNavPath: this.getPubsResultsPath()
            }]
        };
    }
}

export = SearchProvider;