define(["require", "exports"], function (require, exports) {
    /// <reference path="../../../shared/interfaces.ts"/>
    var SearchProvider = (function () {
        function SearchProvider() {
            this.setPagePath = function (path) {
                this.pagePathUrl = path;
            };
            this.$get = ["$http", "SEARCH_OPTIONS", "$location", function ($http, SEARCH_OPTIONS, $location) {
                return new SearchImpl($http, SEARCH_OPTIONS, this.pagePathUrl, $location);
            }];
        }
        return SearchProvider;
    })();
    var SearchImpl = (function () {
        function SearchImpl($http, SEARCH_OPTIONS, pagePathUrl, $location) {
            var _this = this;
            this.$http = $http;
            this.SEARCH_OPTIONS = SEARCH_OPTIONS;
            this.pagePathUrl = pagePathUrl;
            this.$location = $location;
            this.autoCompletePubsHandler = function (text) {
                _this.destinationPath = SearchImpl.DESTINATION_PUBS_PATH;
                var _thiss = _this;
                return _this.$http({
                    method: 'POST',
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
                    method: 'POST',
                    url: SearchImpl.SEARCH_STUDENTS_PATH,
                    data: $.param({
                        action: SearchImpl.AUTOCOMPLETE_ACTION,
                        text: text
                    }),
                    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
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
            this.searchPubsHandler = function (text, page) {
                var thiss = _this;
                return _this.$http({
                    method: 'POST',
                    url: SearchImpl.SEARCH_PUBS_PATH,
                    data: $.param({
                        action: SearchImpl.SEARCH_ACTION,
                        text: text,
                        page: page
                    }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                }).success(function (data) {
                    var resItems = { items: [] };
                    if (data.results != undefined) {
                        resItems.items = data.results.items.map(function (item) {
                            item.name = thiss.prepareSearchResult(item.name);
                            return item;
                        });
                    }
                    return resItems;
                });
            };
            this.searchStudentsHandler = function (text, page) {
                var thiss = _this;
                return _this.$http({
                    method: 'POST',
                    url: SearchImpl.SEARCH_STUDENTS_PATH,
                    data: $.param({
                        action: SearchImpl.SEARCH_ACTION,
                        text: text,
                        page: page
                    }),
                    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
                }).success(function (data) {
                    var resItems = { items: [] };
                    if (data.results != undefined) {
                        resItems.items = data.results.items.map(function (item) {
                            item.name = thiss.prepareSearchResult(item.name);
                            return item;
                        });
                    }
                    return resItems;
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
        SearchImpl.prototype.getSearchResults = function (searchArea, queryString, page) {
            var _this = this;
            page = page || 1;
            if (searchArea == this.SEARCH_OPTIONS.STUDENT) {
                return this.searchStudentsHandler(queryString, page).success(function (data) {
                    data.resultPath = _this.getStudentsPath();
                });
            }
            else if (searchArea == this.SEARCH_OPTIONS.PUBS) {
                return this.searchPubsHandler(queryString, page).success(function (data) {
                    data.resultPath = _this.getPubsResultsPath();
                });
            }
        };
        SearchImpl.prototype.getResultsPath = function () {
            return SearchImpl.PAGE_RESULTS;
        };
        SearchImpl.prototype.getSearchConfiguration = function (areaActivation, defaultValue) {
            areaActivation = areaActivation || this.SEARCH_OPTIONS.STUDENT;
            defaultValue = defaultValue || "";
            var thizz = this;
            return {
                defaultValue: defaultValue,
                default: this.SEARCH_OPTIONS.PUBS,
                searchPage: SearchImpl.PAGE_RESULTS,
                params: [{
                    value: this.SEARCH_OPTIONS.STUDENT,
                    name: "Студенти",
                    isActive: areaActivation == this.SEARCH_OPTIONS.STUDENT,
                    autocompleteHandler: this.autoCompleteStudentsHandler,
                    resultNavPath: this.getStudentsPath(),
                    enterHandler: function (searchText) {
                        thizz.$location.url(SearchImpl.SEARCH_STUDENTS_PAGE + searchText + "/1");
                    }
                }, {
                    value: this.SEARCH_OPTIONS.PUBS,
                    name: "Дисципліни",
                    isActive: areaActivation == this.SEARCH_OPTIONS.PUBS,
                    autocompleteHandler: this.autoCompletePubsHandler,
                    resultNavPath: this.getPubsResultsPath(),
                    enterHandler: function (searchText) {
                        console.log(SearchImpl.SEARCH_PUBS_PAGE + "/" + searchText + "/1");
                        thizz.$location.url(SearchImpl.SEARCH_PUBS_PAGE + searchText + "/1");
                    }
                }]
            };
        };
        SearchImpl.SEARCH_PUBS_PATH = "/monitor/pubs";
        SearchImpl.SEARCH_STUDENTS_PATH = "/monitor/students";
        SearchImpl.SEARCH_ACTION = "search";
        SearchImpl.AUTOCOMPLETE_ACTION = "autocomplete";
        SearchImpl.PAGE_RESULTS = "/monitor/search";
        SearchImpl.DESTINATION_STUDENTS_PATH = "/monitor/student/pubs";
        SearchImpl.DESTINATION_PUBS_PATH = "/monitor/general/pub";
        SearchImpl.SEARCH_STUDENTS_PAGE = '/monitor/search/students/';
        SearchImpl.SEARCH_PUBS_PAGE = '/monitor/search/pubs/';
        return SearchImpl;
    })();
    return SearchProvider;
});
//# sourceMappingURL=searchProvider.js.map