(function($) {
    H.index = {
        cuid: getUrlParam('uid'),
        init: function() {
            this.event();
            if (this.cuid == '')
                toUrl('exercises-index.html');
            else
                this.userGettypePort();
        },
        event: function() {
            var me = this;
            $('body').delegate('.subject a', 'click', function(e) {
                e.preventDefault();
                var uid = $(this).attr('data-uid');
                if ($(this).attr('data-uid'))
                    toUrl('exercises-item.html?uid=' + uid);
                else
                    showTips('题目还在准备中，请稍等');
            });
        },
        questionCourseDeatilPort: function(data) {
            showLoading(null, '查询习题中...');
            getResult('question/courseDeatil', {
                openid: openid,
                cuuid: this.cuid
            }, 'callBackQuestionCourseDetailHandler');
        },
        fillUserInfo: function(data) {
            $('.header .username').text(data.sname ? data.sname : '乐宁学员');
            $('.header .avatar').attr('src', data.simg ? data.simg : '../../images/avatar.jpg');
            if (data.cname) $('.header .class').removeClass('none').find('label').text(data.cname);
        },
        fillItemsInfo: function(data) {
            var me = this,
                items = data;
            for (var i = 0; i < items.length; i++) {
                $('.subject').append('<p><a href="#" data-uid="' + items[i].kuuid + '">第' + me.numberToChinese(items[i].knum) + '节</a></p>')
            };
        },
        numberToChinese: function(number) {
            var pos = 0,
                idxs = ['', '十', '百'],
                num = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

            if (number * 1 <= 100) {
                number = number + '';
                var len = number.length - 1,
                    result = number.replace(/([1-9]|0+)/g, function($, $1, idx, full) {
                        if ($1[0] != '0') {
                            pos = len - idx;
                            if (idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') return idxs[len - idx];
                            return num[$1[0]];
                        } else {
                            var left = len - idx,
                                right = len - idx + $1.length;
                            if (Math.floor(right / 4) - Math.floor(left / 4) > 0) pos = left - left % 4;
                            if (pos) {
                                return idxs[pos] + num[$1[0]];
                            } else if (idx + $1.length >= len) {
                                return '';
                            } else {
                                return num[$1[0]];
                            }
                        }
                    });
                return result.replace('十十', '十');
            } else {
                return number;
            }
        },
        userGettypePort: function() {
            getResultEdu("user/gettype", {
                openid: openid,
                eduid: eduData[getQueryString('kfrom')].uid
            }, "callBackMobileGetTypekHandler");
        }
    };

    W.callBackQuestionCourseDetailHandler = function(data) {
        var me = H.index;
        if (data.result) {
            me.fillUserInfo(data);
            if (data.items) me.fillItemsInfo(data.items);
        }
        hideLoading();
    };

    W.callBackMobileGetTypekHandler = function(data) {
        var me = H.index;
        if (data.result) {
            me.questionCourseDeatilPort();
            bindOpendid(data);
        } else {
            toUrl("../../infor/register.html?ref=exercises");
        }
    };
})(Zepto);

$(function() {
    H.jssdk.init('off');
    H.index.init();
});