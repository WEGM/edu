(function($) {
    H.index = {
        init: function() {
            this.event();
            this.swiper();
        },
        event: function() {
            var me = this;
            $(".btn-submit").click(function(e) {
                e.preventDefault();
                if (me.checkInfo()) {
                    $('#page').removeClass().addClass('step2');
                    $('input, select').attr('disabled', 'disabled');
                }
            });
            $(".swiper-slide, .btn-join").click(function(e) {
                e.preventDefault();
                toUrl($('.swiper-slide-active').attr('data-url'));
            });
        },
        swiper: function() {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                slidesPerView: 1,
                paginationClickable: true,
                keyboardControl: true,
                spaceBetween: 35,
                speed: 600,
                effect: 'coverflow',
                coverflow: {
                    stretch: 0,
                    depth: 90,
                    modifier: 1,
                    rotate: 30,
                    slideShadows: false
                },
                loop: true,
                iOSEdgeSwipeDetection: true,
                preloadImages: true,
                lazyLoading: true,
                lazyLoadingInPrevNext: true,
                onInit: function(swiper) {
                    var index = parseInt(swiper.activeIndex);
                },
                onSlideChangeEnd: function(swiper) {
                    var index = parseInt(swiper.activeIndex);
                }
            });
        }
    };
})(Zepto);

$(function() {
    H.index.init();
    H.jssdk.init();
});