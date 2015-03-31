define(["require", "exports"], function (require, exports) {
    /// <reference path="../../../shared/interfaces.ts"/>
    var SearchProvider = (function () {
        function SearchProvider() {
            this.setPagePath = function (path) {
                this.pagePathUrl = path;
            };
            this.$get = ["$http", "SEARCH_OPTIONS", function ($http, SEARCH_OPTIONS) {
                return new SearchImpl($http, SEARCH_OPTIONS, this.pagePathUrl);
            }];
        }
        return SearchProvider;
    })();
    var SearchImpl = (function () {
        function SearchImpl($http, SEARCH_OPTIONS, pagePathUrl) {
            var _this = this;
            this.$http = $http;
            this.SEARCH_OPTIONS = SEARCH_OPTIONS;
            this.pagePathUrl = pagePathUrl;
            this.autoCompletePubsHandler = function (text) {
                _this.destinationPath = SearchImpl.DESTINATION_PUBS_PATH;
                var _thiss = _this;
                return _this.$http({
                    method: 'GET',
                    url: SearchImpl.SEARCH_PUBS_PATH,
                    data: $.param({
                        action: SearchImpl.AUTOCOMPLETE_ACTION,
                        text: text
                    }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                }).success(function (data) {
                    var resItems = { items: [] };
                    if (data.items != undefined) {
                        resItems.items = data.items.map(function (item) {
                            item.name = _thiss.prepareSearchResult(item.name);
                            return item;
                        });
                    }
                    return resItems;
                });
            };
            this.autoCompleteStudentsHandler = function (text) {
                _this.destinationPath = SearchImpl.DESTINATION_STUDENTS_PATH;
                var _thiss = _this;
                return _this.$http({
                    method: 'GET',
                    url: SearchImpl.SEARCH_STUDENTS_PATH,
                    data: $.param({
                        action: SearchImpl.AUTOCOMPLETE_ACTION,
                        text: text
                    }),
                    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
                }).success(function (data) {
                    var resItems = { items: [] };
                    resItems.items = data.items.map(function (item) {
                        item.name = _thiss.prepareSearchResult(item.name);
                        return item;
                    });
                    return resItems;
                });
            };
            this.searchPubsHandler = function (text) {
                return _this.$http({
                    method: 'POST',
                    url: SearchImpl.SEARCH_PUBS_PATH,
                    data: $.param({
                        action: SearchImpl.SEARCH_ACTION,
                        text: text
                    }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                });
            };
            this.searchStudentsHandler = function (text) {
                return _this.$http({
                    method: 'POST',
                    url: SearchImpl.SEARCH_STUDENTS_PATH,
                    data: $.param({
                        action: SearchImpl.SEARCH_ACTION,
                        text: text
                    }),
                    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
                });
            };
            this.getActiveDestinationPath = function () {
                return _this.destinationPath;
            };
        }
        SearchImpl.prototype.prepareSearchResult = function (input) {
            return input.replace(/<=-b/g, "").replace(/b-=>/g, "").replace(/^\s+/, "").toLowerCase();
        };
        SearchImpl.prototype.getPubsResultsPath = function () {
            return SearchImpl.DESTINATION_PUBS_PATH;
        };
        SearchImpl.prototype.getStudentsPath = function () {
            return SearchImpl.DESTINATION_STUDENTS_PATH;
        };
        SearchImpl.prototype.getSearchResults = function (searchArea, queryString) {
            var _this = this;
            if (searchArea == this.SEARCH_OPTIONS.STUDENT) {
                return this.searchStudentsHandler(queryString).success(function (data) {
                    data.resultPath = _this.getStudentsPath();
                });
            }
            else if (searchArea == this.SEARCH_OPTIONS.PUBS) {
                return this.searchPubsHandler(queryString).success(function (data) {
                    data.resultPath = _this.getPubsResultsPath();
                });
            }
        };
        SearchImpl.prototype.getResultsPath = function () {
            return SearchImpl.PAGE_RESULTS;
        };
        SearchImpl.prototype.getSearchConfiguration = function (areaActivation) {
            return {
                default: this.SEARCH_OPTIONS.PUBS,
                searchPage: SearchImpl.PAGE_RESULTS,
                params: [{
                    value: this.SEARCH_OPTIONS.STUDENT,
                    name: "Студенти",
                    isActive: areaActivation.students,
                    autocompleteHandler: this.autoCompleteStudentsHandler,
                    resultNavPath: this.getStudentsPath()
                }, {
                    value: this.SEARCH_OPTIONS.PUBS,
                    name: "Дисципліни",
                    isActive: areaActivation.pubs,
                    autocompleteHandler: this.autoCompletePubsHandler,
                    resultNavPath: this.getPubsResultsPath()
                }]
            };
        };
        SearchImpl.SEARCH_PUBS_PATH = "/monitor/pubs";
        SearchImpl.SEARCH_STUDENTS_PATH = "/monitor/students";
        SearchImpl.SEARCH_ACTION = "search";
        SearchImpl.AUTOCOMPLETE_ACTION = "autocomplete";
        SearchImpl.PAGE_RESULTS = "/monitor/search";
        SearchImpl.DESTINATION_STUDENTS_PATH = "/monitor/student/pubs/";
        SearchImpl.DESTINATION_PUBS_PATH = "/monitor/general/sudents/";
        return SearchImpl;
    })();
    return SearchProvider;
});
//# sourceMappingURL=searchProvider.js.map