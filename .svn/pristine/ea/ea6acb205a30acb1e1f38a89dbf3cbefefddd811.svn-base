(function($) {
    H.videoActive = {
        $videoBox: $('.video-box'),
        $swiperWrapper: $('.scroll-box').find('.swiper-wrapper'),
        poster: {
            '5fa0a4750f944d2ba363772b830c4547': 'post3.jpg',
            '68f1ff0481d6492994229e0f216e8c7f': 'post4.jpg'
        },
        init: function() {
            // this.slideScorll();
            // this.eventhander();
            this.loadData();
            // this.touch();
            $('.mvp-wrapper').css('height', $(window).height() - 210);
        },
        loadData: function() {
            getResult("activity/info/list", {
                eduUuid: eduUuid
            }, "callBackActivityInfoListHandler");
        },
        fillDom: function(items) {
            var me = this;
            // var data = {};
            var t = simpleTpl();
            $.each(items, function(i, el) {
                t._('<div class="swiper-slide">')
                    ._('<div class="swiper-lazy video-infor">')
                    ._('<div class="video-headimg">')
                    ._('<img src="' + el.ai + '" alt="" onerror="$(this).remove()"></div>')
                    ._('<p class="video-name">' + el.an + '</p>')
                    ._('<div class="course-infor">')

                ._('<p class="font14">' + el.ad + '</p>')
                    ._('</div>')
                    ._('</div>')
                    ._('</div>')

            });
            me.$swiperWrapper.append(t.toString());
            me.slideScorll(items);
        },
        slideScorll: function(data) {
            var me = this,
                poster = '';
            var swiper = new Swiper('.swiper-container', {
                // pagination: '.swiper-pagination',
                paginationClickable: true,
                preloadImages: false,
                spaceBetween: -110,
                lazyLoading: true,
                initialSlide: 1,
                onInit: function(swiper) {
                    if (swiper.isEnd) {
                        var url = data[swiper.activeIndex].av.split('/');
                        var result = me.poster[url[url.length - 1].replace(/.mp4/gi, '')]
                        if (result)
                            poster = ' poster="../../images/' + result + '" ';
                        else
                            poster = '';
                        me.$videoBox.empty().append('<video x-webkit-airplay="true" ' + poster + ' webkit-playsinline="yes" id="video" class="video video-js vjs-default-skin" controls preload="auto" data-setup="{}"><source src="' + data[swiper.activeIndex].av + '" type="video/mp4" /></video>');
                    }
                },
                onSlideChangeEnd: function(swiper) {
                    var url = data[swiper.activeIndex].av.split('/');
                    var result = me.poster[url[url.length - 1].replace(/.mp4/gi, '')]
                    if (result)
                        poster = ' poster="../../images/' + result + '" ';
                    else
                        poster = '';
                    me.$videoBox.empty().append('<video x-webkit-airplay="true" ' + poster + ' webkit-playsinline="yes" id="video" class="video video-js vjs-default-skin" controls preload="auto" data-setup="{}"><source src="' + data[swiper.activeIndex].av + '" type="video/mp4" /></video>');
                }
            });
            me.eventhander();

        },
        eventhander: function() {
            var me = this;
            $('body').delegate('.play', 'click', function(e) {
                e.preventDefault();
                me.myVedio = document.getElementById("myvideo");
                if (me.myVedio.paused) {
                    me.myVedio.currentTime = 0;
                    me.myVedio.play();
                    $(".play").animate({
                        opacity: 0
                    }, 500);
                } else {
                    me.myVedio.pause();
                    $(".play").animate({
                        opacity: 1
                    }, 500);
                }
            });
        },
        videoEvent: function(e) {
            var me = this;
            me.myVedio.addEventListener(e, function() {
                if (e == "ended") {
                    $(".play").animate({
                        opacity: 1
                    }, 500);
                }
            });
        },
        touch: function() {
            var el = document.getElementById('page');
            Transform(el);
            new touch(el, {
                pressMove: function(evt) {
                    evt.preventDefault();
                    if (Math.abs(el.translateY) >= 0) el.translateY = evt.deltaY - Math.abs(el.translateY);
                    if (Math.abs(el.translateY) >= 60) toUrl('360V1.html');
                }
            });
        }
    }
    W.callBackActivityInfoListHandler = function(data) {
        if (data.result) {
            H.videoActive.fillDom(data.items);
        } else {
            showTips(data.message);
        }
    }
    H.videoActive.init();
    H.jssdk.init();
})(Zepto)