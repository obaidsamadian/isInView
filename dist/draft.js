(function ($) {

    $.fn.isInView = function (options) {

        /* Default options: Fully or Partially, OffsetTop. */
        let settings = $.extend({
            // These are the defaults.
            fully: false,// should fully placed in view
            offsetTop:0, // if we have fixed navigation bar
        }, options);

        /* Document Specs: Top, Bottom, Height */
        let docViewTop = $(window).scrollTop() + settings.offsetTop;
        let docHeight = $(window).height() - settings.offsetTop;
        let docViewBottom = docViewTop + docHeight;

        /* Element Specs: Top, Bottom, Height */
        let elemTop = $(this).offset().top;
        let elemHeight =  $(this)[0].offsetHeight;
        let elemBottom = elemTop + elemHeight;
        // var elemBottom = elemTop + $(this).height();

        /* The distance has been passed by the element in the viewport*/
        let passed = (docViewTop - elemTop + docHeight);

        /* The distance element should pass when it will cross the whole viewport */
        let distanceToPass= (docHeight + elemHeight);

        /* Details Object */
        let details = {
            'passed':passed,
            'distanceToPass': distanceToPass,
            'docHeight':docHeight,
            'docViewTop':docViewTop,
            'docViewBottom':docViewBottom,
            'elemTop':elemTop,
            'elemHeight':elemHeight,
            'elemBottom':elemBottom
        };


        if (!settings.fully) {
            /* should be partially or fully in the viewport  */

            if (elemTop <= docViewBottom && elemTop > docViewTop && elemBottom > docViewBottom) {
                /* Entering to the viewport */
                return {'inside':true , 'status':'partially','details':details};

            } else if ((elemTop >= docViewTop && elemBottom <= docViewBottom) || (elemTop <= docViewTop && elemBottom >= docViewBottom)) {
                /* Fully placed in the viewport */
                return {'inside':true , 'status':'fully','details':details};

            } else if (elemTop < docViewTop && elemBottom >= docViewTop && elemBottom < docViewBottom) {
                /* Exiting the viewport */
                return {'inside':true , 'status':'partially','details':details};

            } else {
                /* Not in the viewport */
                return {'inside':false , 'status':'non','details':details};
            }
        }else{
            /* should be Fully in viewport */
            if ((elemTop >= docViewTop && elemBottom <= docViewBottom) || (elemTop <= docViewTop && elemBottom >= docViewBottom)) {// Fully in the viewport
                return {'inside':true,'details':details};
            }else{
                return {'inside':false,'details':details};
            }
        }

    };

}(jQuery));
