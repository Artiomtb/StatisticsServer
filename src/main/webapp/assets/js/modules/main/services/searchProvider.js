/// <reference path="../../../shared/interfaces.ts"/>
define(["require", "exports"], function (require, exports) {
    var SearchProvider = (function () {
        function SearchProvider() {
            this.setPagePath = function (path) {
                this.pagePathUrl = path;
            };
            this.$get = ["$http", "$location", function ($http, $location) {
                return new SearchImpl($http, $location, this.pagePathUrl);
            }];
        }
        return SearchProvider;
    })();
    var SearchImpl = (function () {
        function SearchImpl($http, $location, pagePathUrl) {
            var _this = this;
            this.$http = $http;
            this.$location = $location;
            this.pagePathUrl = pagePathUrl;
            this.autoCompletePubsHandler = function (text) {
                return _this.$http.post(SearchImpl.SEARCH_PUBS_PATH, null, {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    params: { action: SearchImpl.AUTOCOMPLETE_ACTION, text: text }
                });
            };
            this.autoCompleteStudentsHandler = function (text) {
                return _this.$http.post(SearchImpl.SEARCH_STUDENTS_PATH, null, {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    params: { action: SearchImpl.AUTOCOMPLETE_ACTION, text: text }
                });
            };
            this.searchPubsHandler = function (text) {
                _this.$http.post(SearchImpl.SEARCH_PUBS_PATH, null, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    params: { action: SearchImpl.SEARCH_ACTION, text: text }
                }).then(function (data) {
                    this.searchResults = data.data;
                    this.destinationPath = SearchImpl.DESTINATION_PUBS_PATH;
                }, function () {
                    console.log("search failed!");
                });
            };
            this.searchStudentsHandler = function (text) {
                _this.$http.post(SearchImpl.SEARCH_STUDENTS_PATH, null, {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    params: { action: SearchImpl.SEARCH_ACTION, text: text }
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
            this.resultNavHandlerStudents = function (student_id) {
                _this.$location.path(SearchImpl.DESTINATION_STUDENTS_PATH + "/" + student_id);
            };
            this.resultNavHandlerPubs = function (pub_id) {
                _this.$location.path(SearchImpl.DESTINATION_PUBS_PATH + pub_id);
            };
            this.searchResults = [];
        }
        SearchImpl.$inject = ["$http", "$location"];
        SearchImpl.SEARCH_PUBS_PATH = "/monitor/pubs";
        SearchImpl.SEARCH_STUDENTS_PATH = "/monitor/students";
        SearchImpl.SEARCH_ACTION = "search";
        SearchImpl.AUTOCOMPLETE_ACTION = "autocomplete";
        SearchImpl.PAGE_RESULTS = "/monitor/search";
        SearchImpl.DESTINATION_STUDENTS_PATH = "/monitor/students/";
        SearchImpl.DESTINATION_PUBS_PATH = "/monitor/pubs/";
        return SearchImpl;
    })();
    return SearchProvider;
});
//# sourceMappingURL=searchProvider.js.map