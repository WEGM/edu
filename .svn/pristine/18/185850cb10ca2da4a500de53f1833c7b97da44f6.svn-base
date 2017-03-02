(function($) {
    H.teacherResource = {
        $videoBox: $('.video-box'),
        $swiperWrapper: $('.scroll-box').find('.swiper-wrapper'),
        poster: {
            '5c7b5b7a6d46442798be5d9418f7503a': 'post1.jpg',
            '72c20318678642c6912dec0c9e5ef321': 'post2.jpg'
        },
        init: function() {
            this.loadData();
            $('.play').css("top", $(".video-box").height() / 2 - 10);
            $('.mvp-wrapper').css('height', $(window).height() - 210);

        },
        loadData: function() {
            getResult("introduce/teachers/list", {
                eduUuid: eduUuid
            }, "callBackIntroduceTeachersListHandler");
        },
        fillDom: function(items) {
            var me = this;
            var data = {};
            var t = simpleTpl();
            $.each(items, function(i, el) {
                t._('<div class="swiper-slide">')
                    ._('<div class="teacher-infor">')
                    ._('<div class="teacher-headimg ' + (el.img ? "hava-img" : "none") + '">')
                    ._('<img src="' + el.img + '" alt="" height="80px"></div>')
                    ._('<p class="teacher-name">' + el.na + '</p>')
                    ._('<div class="course-infor font14">')
                    ._('<p>' + el.de + '</p>')
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
                spaceBetween: -110,
                initialSlide: 0,
                onInit: function(swiper) {
                    var url = data[swiper.activeIndex].ve.split('/');
                    var result = me.poster[url[url.length - 1].replace(/.mp4/gi, '')]
                    if (result)
                        poster = ' poster="../../images/' + result + '" ';
                    else
                        poster = '';
                    me.$videoBox.empty().append('<video x-webkit-airplay="true" ' + poster + '  webkit-playsinline="yes" class="video" id="myvideo" preload="auto" data-collect="true" data-collect-flag="vedio-play-btn" data-collect-desc="视频播放按钮"><source src="' + data[swiper.activeIndex].ve + '" type="video/mp4">您的浏览器不支持视频</video><a href="#" class="play" data-collect="true" data-collect-flag="vedio-play-btn" data-collect-desc="视频播放按钮"><img src="../../images/icon-play.png" /></a>');
                    $('.play').css("top", $(".video-box").height() / 2 - 14);
                },
                onSlideChangeStart: function(swiper) {
                    // if (me.myVedio.paused) {
                    //     $(".play").animate({ opacity: 1 }, 500);
                    // } else {
                    //     me.myVedio.pause();
                    //     $(".play").animate({ opacity: 1 }, 500);
                    // }
                },
                onSlideChangeEnd: function(swiper) {
                    var url = data[swiper.activeIndex].ve.split('/');
                    var result = me.poster[url[url.length - 1].replace(/.mp4/gi, '')]
                    if (result)
                        poster = ' poster="../../images/' + result + '" ';
                    else
                        poster = '';
                    me.$videoBox.empty().append('<video x-webkit-airplay="true" ' + poster + '  webkit-playsinline="yes" class="video" id="myvideo" preload="auto" data-collect="true" data-collect-flag="vedio-play-btn" data-collect-desc="视频播放按钮"><source src="' + data[swiper.activeIndex].ve + '" type="video/mp4">您的浏览器不支持视频</video><a href="#" class="play" data-collect="true" data-collect-flag="vedio-play-btn" data-collect-desc="视频播放按钮"><img src="../../images/icon-play.png" /></a>');
                    $('.play').css("top", $(".video-box").height() / 2 - 14);
                    // me.myVedio.play();
                    // $(".play").css("opacity", "0");
                    // me.videoEvent("ended");
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
        }
    }
    W.callBackIntroduceTeachersListHandler = function(data) {
        if (data.result) {
            H.teacherResource.fillDom(data.items)
        } else {
            showTips(data.message);
        }
    }
    H.teacherResource.init();
    H.jssdk.init();
})(Zepto)