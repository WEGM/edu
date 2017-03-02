(function($) {
    H.courseSystem = {
        $scrollBox: $(".swiper-wrapper"),
        init: function() {
            this.loadData();
        },
        loadData: function() {
            getResult("courseSystem/info", {
                eduUuid: eduUuid
            }, "callBackCourseSystemInfoHandler", true);
        },
        fillDom: function(items) {
            var t = simpleTpl();
            var me = this;
            for (var i = 0; i < items.length; i++) {
                t._('<div class="swiper-slide">')
                    ._('<div class="swiper-lazy system-infor">')
                if (i == 0)
                    t._('<a href="#">')
                else
                    t._('<a href="./course-introduce.html?uuid=' + items[i].uuid + '">')
                t._('<img data-src="' + items[i].bigimg + '" alt="" class="swiper-lazy">')
                    ._('</a>')
                    ._('</div>')
                    ._('<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>')
                if (i != 0)
                    t._('<a class="class-name none" href="./course-introduce.html?uuid=' + items[i].uuid + '">' + items[i].name + '</a>')
                t._('</div>')
            };
            me.$scrollBox.append(t.toString());
            this.slideScorll();
        },
        slideScorll: function() {
            var swiper = new Swiper('.swiper-container', {
                preloadImages: true,
                spaceBetween: -70,
                initialSlide: 0,
                lazyLoading: true,
                lazyLoadingInPrevNext: true,
                speed: 600,
                effect: 'coverflow',
                coverflow: {
                    stretch: 0,
                    depth: 0,
                    modifier: 1,
                    rotate: 0,
                    slideShadows: false
                },
                iOSEdgeSwipeDetection: true,
                onSlideChangeStart: function(swiper) {

                },
                onSlideChangeEnd: function(swiper) {
                    $(".swiper-slide-active").siblings().find(".class-name").addClass("none");
                    $(".swiper-slide-active").find(".class-name").removeClass("none")
                }
            });
        }
    }
    W.callBackCourseSystemInfoHandler = function(data) {
        if (data.result) {
            H.courseSystem.fillDom(data.item);
        } else {
            showTips("网络繁忙");
        }
    };
    H.courseSystem.init();
    H.jssdk.init();
})(Zepto)