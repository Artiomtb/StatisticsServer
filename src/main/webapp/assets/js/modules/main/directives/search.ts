function search() {
    return {
        restrict: "E",
        scope: {
            options: "=",
            searchHandler: "&"
        },
        templateUrl: "/templates/main/search.html",
        link: function () {

        }
    }
}

export=search;