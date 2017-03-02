(function($) {
    H.myStrength = {
        $text: $(".brand-infor").find("p"),
        $swiperWrapper: $(".swiper-wrapper"),
        $swiperContainer: $(".swiper-container"),
        $winH: $(window).height(),
        $color: ["#008FD0", "#F19900", "#D91217", "#00903D"],

        init: function() {
            $("body").height(this.$winH);
            this.loadData();
        },
        loadData: function() {
            getResult("advantage/info", {
                eduUuid: eduUuid
            }, "callBackAdvantageInfoHandler", true);
        },
        fillDom: function(items) {
            var me = this;
            var t = simpleTpl();
            for (var i = 0; i < items.length; i++) {
                if (i == items.length - 1)
                    var s = 'page';
                else
                    var s = '';

                t._('<div class="swiper-slide" id="' + s + '">')
                    ._('<div class="scorll-main">')
                    ._('<section>')
                    ._('<div class="good-edu" style="background:' + me.$color[i % 4] + '">')
                    ._('<p>乐宁优势</p>')
                    ._('</div>')
                    ._('<div class="logo-show">')
                    ._('<img src="" alt="" data-img=\'{"s":"img","u":"logo.png","t":"../../images/"}\'>')
                    ._('</div>')
                    ._('</section>')
                    ._('<section class="scroll-box">')
                if (items[i].detail)
                    t._('<div class="brand-infor"><p>' + items[i].detail + '</p></div>')
                t._('<img src="' + items[i].img + '">')
                    ._('</section>')
                    ._('</div>')
                    ._('<div class="swiper-button" style="border-color:' + me.$color[i % 4] + '"></div>')
                    ._('</div>')
            }

            me.$swiperWrapper.append(t.toString());
            me.scollingEvent();
            cuckooSeed();
        },
        scollingEvent: function(data) {
            var me = this;
            me.$swiperContainer.height(me.$winH - 15);
            $(".scroll-box").height(me.$winH - $(".logo-show").height() - 20);
            mySwiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                nextButton: '.swiper-button',
                onSlideChangeEnd: function(swiper) {
                    if (mySwiper.isEnd) {
                        $(".glob-swiper-next").removeClass("none");
                        $(".swiper-button").click(function() {
                            showTips("已经在最后一页了");
                        })
                    } else {
                        $(".glob-swiper-next").addClass("none");
                    }
                }
            })
        }
    }
    W.callBackAdvantageInfoHandler = function(data) {
        if (data.result) {
            H.myStrength.fillDom(data.item);
        }
    };

    H.myStrength.init();
    H.jssdk.init();
})(Zepto)