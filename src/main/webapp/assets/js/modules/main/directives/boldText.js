define(["require", "exports"], function (require, exports) {
    function boldText($interpolate) {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                var boldTextReg = new RegExp(attrs.boldText, 'gi');
                var resHtml = attrs.text.replace(boldTextReg, "<b class='boldClass'>" + attrs.boldText + "</b>");
                var fun = $interpolate(resHtml);
                element.html(fun({ boldClass: attrs.boldClass }));
            }
        };
    }
    return boldText;
});
//# sourceMappingURL=boldText.js.map