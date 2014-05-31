// (function() {
//     var headroom = new Headroom(document.querySelector("#header"), {
//         tolerance: 5,
//         offset : 500,
//         classes: {
//           initial: "animated",
//           pinned: "slideDown",
//           unpinned: "slideUp"
//         }
//     });
//     headroom.init();

//     // var bttHeadroom = new Headroom(document.getElementById("btt"), {
//     //     tolerance : 0,
//     //     offset : 500,
//     //     classes : {
//     //         initial : "slide",
//     //         pinned : "slide--reset",
//     //         unpinned : "slide--down"
//     //     }
//     // });
//     bttHeadroom.init();
// }());

jQuery(document).ready(function($) {

    $(".site-header").headroom({
        // scroll tolerance in px before state changes
        "tolerance": 5,

        // vertical offset in px before element is first unpinned
        "offset": 250, /* set this to height of your header */

        "classes": {
            // when element is initialised
            "initial": "animated",

            // when scrolling up
            "pinned": "slideDown",

            // when scrolling down
            "unpinned": "slideUp",

            // when above offset
            "top": "headroom--top",

            // when below offset
            "notTop": "headroom--not-top"
        }
    });

});