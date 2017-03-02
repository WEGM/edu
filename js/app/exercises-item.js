(function($) {
    H.item = {
        count: 0,
        kuid: getUrlParam('uid'),
        fixShowAnswerBug: false,
        audio: null,
        init: function() {
            video = null;
            this.event();
            if (this.kuid == '')
                toUrl('exercises-index.html');
            else
                this.userGettypePort();
        },
        event: function() {
            var me = this;
            $("body").delegate('.videoBox', 'click', function(e) {
                e.preventDefault();
                videoDom = $(this).find('video').attr('id');
                video = document.getElementById(videoDom);
                if (video.paused) {
                    video.play();
                    $(".icon-play").animate({
                        opacity: 0
                    }, 1e3);
                } else {
                    video.pause();
                    $(".icon-play").animate({
                        opacity: 1
                    }, 1e3);
                }

                video.addEventListener('ended', function() {
                    $(".icon-play").animate({
                        opacity: 1
                    }, 1e3);
                });
            }).delegate('.option a', 'click', function(e) {
                e.preventDefault();
                // data-type    1-单选，2-多选
                var type = $('.active .option').attr('data-type') * 1;
                if (type == 2) {
                    if ($(this).hasClass('checked')) {
                        $(this).removeClass('checked');
                    } else {
                        $(this).addClass('checked');
                    }
                } else {
                    if ($(this).hasClass('checked')) {
                        $(this).removeClass('checked');
                    } else {
                        $(this).closest('.option').find('a').removeClass('checked');
                        $(this).addClass('checked');
                    }
                }
                // document.getElementById('tab').setAttribute('data-item', '2');
            }).delegate('.btn-next', 'click', function(e) {
                e.preventDefault();
                if (me.checkChoose()) {
                    var auuid = '';
                    $('.active .checked').each(function(i) {
                        if (i == $('.active .checked').length - 1)
                            auuid += $(this).attr('data-uuid');
                        else
                            auuid += $(this).attr('data-uuid') + ',';
                    });
                    me.questionAnswerPort($('.active').attr('data-uuid'), auuid);
                    $nextDom = $('.active').next();
                    if (video && !video.paused) {
                        video.pause();
                        $(".icon-play").animate({
                            opacity: 1
                        }, 1e3);
                    }
                    if (H.item.audio) {
                        $('.playBox').removeClass('play');
                        H.item.audio.pause();
                    }
                } else {
                    showTips('请选择合适的答案');
                }
            }).delegate('.btn-prev', 'click', function(e) {
                e.preventDefault();
                var $prevDom = $('.active').prev();
                $('.item').removeClass('active');
                $prevDom.addClass('active');
                me.switchTab();
                if (video && !video.paused) {
                    video.pause();
                    $(".icon-play").animate({
                        opacity: 1
                    }, 1e3);
                }
                if (H.item.audio) {
                    $('.playBox').removeClass('play');
                    H.item.audio.pause();
                }
            }).delegate('.btn-submit', 'click', function(e) {
                e.preventDefault();
                if (me.checkChoose()) {
                    var auuid = '';
                    $('.active .checked').each(function(i) {
                        if (i == $('.active .checked').length - 1)
                            auuid += $(this).attr('data-uuid');
                        else
                            auuid += $(this).attr('data-uuid') + ',';
                    });
                    me.questionAnswerPort($('.active').attr('data-uuid'), auuid);
                    if (video && !video.paused) {
                        video.pause();
                        $(".icon-play").animate({
                            opacity: 1
                        }, 1e3);
                    }
                    if (H.item.audio) {
                        $('.playBox').removeClass('play');
                        H.item.audio.pause();
                    }
                }
            }).delegate('.btn-again', 'click', function(e) {
                e.preventDefault();
                location.href = location.href;
            }).delegate('.playBox', 'tap', function(e) {
                e.preventDefault();
                var that = this;
                if (video && !video.paused) {
                    video.pause();
                    $(".icon-play").animate({
                        opacity: 1
                    }, 1e3);
                }
                if ($(this).hasClass('play')) {
                    if (me.audio) me.audio.pause();
                    $(this).removeClass('play');
                } else {
                    if (me.audio) me.audio.pause();
                    $('.playBox').removeClass('play');
                    $(this).addClass('play');
                    me.audio = document.getElementById('a-' + $(that).attr('data-audio'));
                    me.audio.play();
                    me.audio.addEventListener('ended', function() {
                        me.audio.pause();
                        $(that).removeClass('play');
                    }, false);
                }
            });
        },
        questionListPort: function(data) {
            showLoading(null, '查询题目中...');
            getResult('question/list', {
                openid: openid,
                kuuid: this.kuid
            }, 'callBackQuestionListHandler');
        },
        questionAnswerPort: function(quuid, auuid) {
            if (!quuid && !auuid) {
                showTips('很抱歉，出现一个问题<br>请重试或刷新下页面');
                return;
            }
            showLoading(null, '提交中，请稍等');
            getResult('question/answer', {
                openid: openid,
                quuid: quuid,
                auuid: auuid,
                count: this.count
            }, 'callBackQuestionAnswerHandler');
        },
        switchTab: function() {
            $('#tab').attr({
                'data-item': $('.active').attr('data-item') * 1,
                'data-items': $('.item').length
            }).css('display', 'block');
            var itemsNum = $('#tab').attr('data-items') * 1,
                itemNum = $('#tab').attr('data-item') * 1;
            if (itemsNum <= 1) {
                $('#tab').removeClass().addClass('tab first submit');
            } else {
                if (itemNum == 1) {
                    $('#tab').removeClass().addClass('tab first');
                } else if (itemsNum == itemNum) {
                    $('#tab').removeClass().addClass('tab last submit');
                } else if (itemsNum > itemNum && itemNum > 1) {
                    $('#tab').removeClass().addClass('tab');
                } else {
                    $('#tab').removeClass().addClass('tab first submit');
                }
            }
        },
        addDomListen: function() {
            var me = this,
                tab = document.getElementById('tab');
            if (tab.addEventListener) {
                tab.addEventListener('DOMAttrModified', me.switchTab);
            } else if (tab.attachEvent) {
                tab.attachEvent('onpropertychange', me.switchTab);
            }
        },
        checkChoose: function() {
            var chooseNum = $('.active .checked').length,
                type = $('.active .option').attr('data-type') * 1;
            // data-type    1-单选，2-多选
            if (type == 2) {
                if (chooseNum <= 0) {
                    showTips('多选题，最少选择一项');
                    return false;
                } else {
                    return true;
                }
            } else {
                if (chooseNum <= 0) {
                    showTips('单选题，最多选择一项');
                    return false;
                } else {
                    return true;
                }
            }
        },
        statisticsResults: function() {
            var finalScore = 0;
            $('.item').each(function(i) {
                var score = $(this).attr('data-score'),
                    collect = $(this).find('.checked'),
                    correct = $(this).attr('correct-uuid'),
                    collectNum = collect.length,
                    correctNum = correct.split(',').length,
                    collectUUID = '',
                    correctUUID = correctNum == 0 ? false : correct.split(','),
                    total = 0;
                collect.each(function(index) {
                    if (correct.indexOf($(this).attr('data-uuid')) >= 0) total++;
                    if (index == collectNum - 1)
                        collectUUID += $(this).attr('data-uuid');
                    else
                        collectUUID += $(this).attr('data-uuid') + ',';
                });

                if (total == correctUUID.length) {
                    finalScore += score * 1;
                    $('.result-list').append('<a href="#">' + $(this).find('.subject p').html() + '</a>')
                } else {
                    $('.result-list').append('<a href="#" class="error">' + $(this).find('.subject p').html() + '</a>')
                }

                if ($('.item').length - 1 == i) {
                    $('.score label').text(finalScore);
                    $('.content').addClass('none');
                    $('.result').removeClass('none');
                }
            });
            if (this.count >= 1) $('.btn-again').addClass('none');
        },
        fillItemInfo: function(data, index, showScore) {
            var me = this,
                t = simpleTpl(),
                items = data,
                first = '',
                type = '',
                number = 0,
                row = 2;
            for (var i = 0; i < items.length; i++) {
                number = i * 1 + 1;
                if (i == 0)
                    first = ' active';
                else
                    first = '';
                // if (i != index) {
                //     first = '';
                // } else {
                //     first = ' active';
                // }
                if (items[i].type == 1) {
                    type = '';
                } else {
                    type = ' multiselect';
                }
                t._('<section class="item' + first + type + '" id="item_' + number + '" data-item="' + number + '" item-uid="' + number + '" correct-uuid="' + items[i].rightuuid + '" data-score="' + items[i].asc + '" data-uuid="' + items[i].uuid + '">')
                    ._('<h1>' + number + '</h1>')
                    ._('<section class="subject">')
                if (items[i].title) t._('<p>' + items[i].title + '</p>')
                if (items[i].img) t._('<img src="' + items[i].img + '">')
                if (items[i].audio) {
                    t._('<div class="playBox" data-audio="' + items[i].uuid + '"></div><audio class="preload" id="a-' + items[i].uuid + '" src="' + items[i].audio + '"  preload="auto">您的浏览器不支持播放音频</audio>')
                }
                if (items[i].video) {
                    t._('<section class="videoBox">')
                        ._('<video x-webkit-airplay="true" webkit-playsinline="yes" id="video' + number + '" preload="auto">')
                        ._('<source src="' + items[i].video + '" type="video/mp4" />')
                        ._('您的浏览器不支持播放视频')
                        ._('</video>')
                        ._('<img class="icon-play" src="../../images/icon-play.png">')
                        ._('</section>')
                }
                t._('</section>')
                    ._('<section class="option" data-type="' + items[i].type + '">')
                for (var j = 0; j < items[i].aitems.length; j++) {
                    var checkStatus = '';
                    if (me.fixShowAnswerBug) {
                        if (items[i].aflag) {
                            if (items[i].auuid.indexOf(items[i].aitems[j].au) >= 0)
                                checkStatus = 'checked';
                            else
                                checkStatus = '';
                            // var auuid = items[i].auuid.split(',');
                            // for (var k = 0; k < auuid.length; k++) {
                            //     if (auuid[k] == items[i].aitems[j].au)
                            //         checkStatus = 'checked';
                            //     else
                            //         checkStatus = '';
                            // };
                        }
                    }
                    if (j % row == 0) t._('<section class="item-row">');
                    t._('<section class="item-wrapper">')
                        ._('<a href="#" data-uuid="' + items[i].aitems[j].au + '" class="' + checkStatus + '"></a>')
                        ._('<section class="item-content">')
                    if (items[i].aitems[j].av) t._('<p>' + items[i].aitems[j].av + '</p>');
                    if (items[i].aitems[j].ai) t._('<img src="' + items[i].aitems[j].ai + '">');
                    if (items[i].aitems[j].aa) t._('<div class="playBox" data-audio="' + items[i].aitems[j].au + '"></div><audio class="preload" id="a-' + items[i].aitems[j].au + '" src="' + items[i].aitems[j].aa + '"  preload="auto">您的浏览器不支持播放音频</audio>');
                    t._('</section>')
                        ._('</section>')
                    if (j % row == 1) t._('</section>');
                };
                t._('</section>')
                    ._('</section>')
            };
            t._('<section class="tab" id="tab">')
                ._('<a href="#" class="btn-prev">上一题</a>')
                ._('<a href="#" class="btn-next">下一题</a>')
                ._('<a href="#" class="btn-submit">提交</a>')
                ._('</section>')
            $('.content').html(t.toString());
            this.switchTab();
            if (showScore && showScore == '1') {
                if (me.checkChoose()) {
                    if (video && !video.paused) {
                        video.pause();
                        $(".icon-play").animate({
                            opacity: 1
                        }, 1e3);
                    }
                    if (H.item.audio) {
                        $('.playBox').removeClass('play');
                        H.item.audio.pause();
                    }
                    me.statisticsResults();
                }
            }
        },
        checkItemStatus: function(data) {
            var me = this;
            me.count = data.count;
            if (data.count == 0) {
                me.fillItemInfo(data.items, data.num);
            } else if (data.count == 1) {
                me.fillItemInfo(data.items, data.num);
                $('.btn-again').addClass('none');
            } else {
                me.fillItemInfo(data.items, data.num, '1');
                $('.btn-again').addClass('none');
            }
        },
        userGettypePort: function() {
            getResultEdu("user/gettype", {
                openid: openid,
                eduid: eduData[getQueryString('kfrom')].uid
            }, "callBackMobileGetTypekHandler");
        }
    };

    W.callBackQuestionListHandler = function(data) {
        var me = H.item;
        if (data.result) {
            if (data.count == 2 && data.num == 0)
                me.fixShowAnswerBug = true;
            else
                me.fixShowAnswerBug = false;
            me.checkItemStatus(data);
        } else {
            showTips(data.message);
        }
        hideLoading();
    };

    W.callBackQuestionAnswerHandler = function(data) {
        var me = H.item;
        if (data.result) {
            if (data.islast) {
                me.statisticsResults();
            } else {
                $('.item').removeClass('active');
                $nextDom.addClass('active');
                me.switchTab();
            }
        }
        hideLoading();
    };

    W.callBackMobileGetTypekHandler = function(data) {
        var me = H.item;
        if (data.result) {
            me.questionListPort();
            bindOpendid(data);
        } else {
            toUrl("../../infor/register.html?ref=exercises");
        }
    };
})(Zepto);

$(function() {
    H.jssdk.init('off');
    H.item.init();
});