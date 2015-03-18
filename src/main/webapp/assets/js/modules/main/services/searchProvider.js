define(["require", "exports"], function (require, exports) {
    /// <reference path="../../../shared/interfaces.ts"/>
    var SearchProvider = (function () {
        function SearchProvider() {
            this.setPagePath = function (path) {
                this.pagePathUrl = path;
            };
            this.$get = ["$http", function ($http) {
                return new SearchImpl($http, this.pagePathUrl);
            }];
        }
        return SearchProvider;
    })();
    var SearchImpl = (function () {
        function SearchImpl($http, pagePathUrl) {
            var _this = this;
            this.$http = $http;
            this.pagePathUrl = pagePathUrl;
            this.autoCompletePubsHandler = function (text) {
                _this.destinationPath = SearchImpl.DESTINATION_PUBS_PATH;
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
                    resItems.items = data.items.map(function (item) {
                        item.name = item.name.replace(/<=-b/g, "").replace(/b-=>/g, "").replace(/^\s+/, "").toLowerCase();
                        return item;
                    });
                    return resItems;
                });
            };
            this.autoCompleteStudentsHandler = function (text) {
                _this.destinationPath = SearchImpl.DESTINATION_STUDENTS_PATH;
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
                    resItems.items = data.items.map(function (item) {
                        item.name = item.name.replace(/<=-b/g, "").replace(/b-=>/g, "").replace(/^\s+/, "").toLowerCase();
                        return item;
                    });
                    return resItems;
                });
            };
            this.searchPubsHandler = function (text) {
                _this.$http({
                    method: 'POST',
                    url: SearchImpl.SEARCH_PUBS_PATH,
                    data: $.param({
                        action: SearchImpl.SEARCH_ACTION,
                        text: text
                    }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                }).then(function (data) {
                    this.searchResults = data.data;
                    this.destinationPath = SearchImpl.DESTINATION_PUBS_PATH;
                }, function () {
                    console.log("search failed!");
                });
            };
            this.searchStudentsHandler = function (text) {
                _this.$http({
                    method: 'POST',
                    url: SearchImpl.SEARCH_STUDENTS_PATH,
                    data: $.param({
                        action: SearchImpl.SEARCH_ACTION,
                        text: text
                    }),
                    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
                }).then(function (data) {
                    this.searchResults = data.data;
                    this.destinationPath = SearchImpl.DESTINATION_STUDENTS_PATH;
                }, function () {
                    console.log("search failed");
                });
            };
            this.getActiveDestinationPath = function () {
                return _this.destinationPath;
            };
            this.searchResults = [];
        }
        SearchImpl.prototype.getPubsResultsPath = function () {
            return SearchImpl.DESTINATION_PUBS_PATH;
        };
        SearchImpl.prototype.getStudentsPath = function () {
            return SearchImpl.DESTINATION_STUDENTS_PATH;
        };
        SearchImpl.SEARCH_PUBS_PATH = "/monitor/pubs";
        SearchImpl.SEARCH_STUDENTS_PATH = "/monitor/students";
        SearchImpl.SEARCH_ACTION = "search";
        SearchImpl.AUTOCOMPLETE_ACTION = "autocomplete";
        SearchImpl.PAGE_RESULTS = "/monitor/search";
        SearchImpl.DESTINATION_STUDENTS_PATH = "/monitor/student/pubs/";
        SearchImpl.DESTINATION_PUBS_PATH = "/monitor/general/pub/";
        return SearchImpl;
    })();
    return SearchProvider;
});
//# sourceMappingURL=searchProvider.js.map