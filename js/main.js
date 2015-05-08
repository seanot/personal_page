(function() {
    var header = new Headroom(document.querySelector("#header"), {
        tolerance: 5,
        offset : 65,
        classes: {
          initial: "headroom",
          pinned: "headroom--pinned",
          unpinned: "headroom--unpinned"
        }
    });
    header.init();

    var bttHeadroom = new Headroom(document.getElementById("btt"), {
        tolerance : 0,
        offset : 500,
        classes : {
            initial : "slide",
            pinned : "slide--reset",
            unpinned : "slide--down"
        }
    });
    bttHeadroom.init();
}());