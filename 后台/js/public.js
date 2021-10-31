var swiper = new Swiper('.swiper-container', {
    // loop: true,
    direction: 'vertical',
    autoHeight: true,
    mousewheel: true,
    hashNavigation: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        clickableClass: 'my-pagination-clickable',
        bulletActiveClass: 'paga',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    lazy: {
        //loadPrevNext: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        slideChange: function () {
            if (this.activeIndex == 1 || this.activeIndex == 2 || this.activeIndex == 3 || this.activeIndex == 4
                || this.activeIndex == 5 || this.activeIndex == 6) {
                $(".foot_left").css("color", "black");
                // alert(this.activeIndex)
            } else if (this.activeIndex == 0) {
                $(".foot_left").css("color", "white");
            };

        },
    }
});

