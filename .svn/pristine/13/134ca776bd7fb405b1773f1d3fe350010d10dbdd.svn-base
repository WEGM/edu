(function($) {
    H.index = {
        enrollData: null,
        init: function() {
            this.event();
            this.enrollDetailPort();
        },
        event: function() {
            var me = this;
            $(".btn-submit").click(function(e) {
                e.preventDefault();
                if (me.checkInfo()) me.enrollSavePort(me.enrollData);
            });

            $("#datetimepicker").on("click", function(e) {
                e.stopPropagation();
                $(this).lqdatetimepicker({
                    css: 'datetime-day',
                    dateType: 'D',
                    selectback: function() {}
                });
            });
        },
        checkInfo: function() {
            this.enrollData = ''
            var me = this,
                username = $.trim($('.username').val()),
                birthday = $('#datetimepicker').val(),
                tel = $.trim($('.tel').val());
            if (username.length === 0) {
                showTips('姓名没有填写~');
                return false;
            }
            if (!birthday) {
                showTips('生日没有选择~');
                return false;
            }
            if (!/^(13|14|15|17|18)[0-9]{8}[0-9]$/.test(tel)) {
                showTips('请输入正确的电话号码');
                return false;
            }
            me.enrollData = {
                'name': username,
                'birth': $('#datetimepicker').val().replace(/-/g, '') * 1,
                'phone': tel
            }
            return true;
        },
        enrollSavePort: function(data) {
            showLoading(null, '正在提交...');
            getResult('reservate/user/enroll/save', {
                eduUuid: eduData[getQueryString('kfrom')].uid,
                openid: openid+'_a1',
                name: data.name,
                birth: data.birth,
                phone: data.phone
            }, 'callBackEnrollUserSaveHandler');
        },
        enrollDetailPort: function() {
            showLoading(null, '报名查询中...');
            getResult('reservate/user/enroll/detail', {
                eduid: eduData[getQueryString('kfrom')].uid,
                openid: openid+'_a1'
            }, 'callBackEnrollUserDetailHandler');
        }
    };

    W.callBackEnrollUserSaveHandler = function(data) {
        if (data.result) {
            $('.page').addClass('none');
            $('.bm-tips').removeClass('none');
        } else {
            $('.page').addClass('none');
            $('.bm-tips').addClass('error').removeClass('none').find('p').html('(TOT)报名失败，刷新页面试试！');
        }
        hideLoading();
    };

    W.callBackEnrollUserDetailHandler = function(data) {
        if (data.result) {
            $('.page').addClass('none');
            if (data.name) {
                $('.bm-tips p').html(data.name + '同学，您已报名成功！<br>欢迎参加“趣”乐宁英语配音，稍后会有专人联系。');
            } else {
                $('.bm-tips p').html('您已报名成功！欢迎参加“趣”乐宁英语配音，稍后会有专人联系。');
            }
            $('.bm-tips').removeClass('none');
        } else {
            $('.page').addClass('none');
            $('#page').removeClass('none');
        }
        hideLoading();
    };
})(Zepto);