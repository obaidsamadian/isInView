(($) => {
    $.fn.isInView = function (options) {
        let settings = $.extend(Object.assign({ fully: false, offsetTop: 0 }, options));
        let docViewTop = $(window).scrollTop() + settings.offsetTop;
        let docHeight = $(window).height() - settings.offsetTop;
        let docViewBottom = docViewTop + docHeight;
        let elemTop = $(this).offset().top;
        let elemHeight = $(this)[0].offsetHeight;
        let elemBottom = elemTop + elemHeight;
        let passed = (docViewTop - elemTop + docHeight);
        let distanceToPass = (docHeight + elemHeight);
        let details = {
            'passed': passed,
            'distanceToPass': distanceToPass,
            'docHeight': docHeight,
            'docViewTop': docViewTop,
            'docViewBottom': docViewBottom,
            'elemTop': elemTop,
            'elemHeight': elemHeight,
            'elemBottom': elemBottom
        };
        if (!settings.fully) {
            if (elemTop <= docViewBottom && elemTop > docViewTop && elemBottom > docViewBottom) {
                return { 'inside': true, 'status': 'partially', 'details': details };
            }
            else if ((elemTop >= docViewTop && elemBottom <= docViewBottom) || (elemTop <= docViewTop && elemBottom >= docViewBottom)) {
                return { 'inside': true, 'status': 'fully', 'details': details };
            }
            else if (elemTop < docViewTop && elemBottom >= docViewTop && elemBottom < docViewBottom) {
                return { 'inside': true, 'status': 'partially', 'details': details };
            }
            else {
                return { 'inside': false, 'status': 'non', 'details': details };
            }
        }
        else {
            if ((elemTop >= docViewTop && elemBottom <= docViewBottom) || (elemTop <= docViewTop && elemBottom >= docViewBottom)) {
                return { 'inside': true, 'details': details };
            }
            else {
                return { 'inside': false, 'details': details };
            }
        }
    };
})(jQuery);
