(function($) {
    H.index = {
        acid: '',
        grassData: null,
        init: function() {
            this.event();
            this.fillUserInfo();
            this.grassActivityPort();
        },
        event: function() {
            var me = this;
            $('.btn-submit').click(function(e) {
                e.preventDefault();
                if (me.checkInfo()) me.grassInvitePort(me.grassData);
            });

            $('.btn-ok').click(function(e) {
                e.preventDefault();
                $('.pop-register').addClass('none');
                toUrl('grass-share.html?shareUUID=' + openid);
            });

            $('.btn-share').click(function(e) {
                e.preventDefault();
                $('#pop-share').removeClass('none');
            });

            $('#pop-share').click(function(e) {
                e.preventDefault();
                toUrl('grass-share.html');
                $('#pop-share').addClass('none');
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
            this.grassData = ''
            var me = this,
                username = $.trim($('.username').val()),
                birthday = $('#datetimepicker').val(),
                tel = $.trim($('.tel').val());
            if (username.length === 0) {
                showTips('姓名没有填写');
                return false;
            }
            if (!$('.sex-wrapper label:nth-child(1) input').attr('checked') && !$('.sex-wrapper label:nth-child(2) input').attr('checked')) {
                showTips('性别没有选择');
                return false;
            }
            if (!birthday) {
                showTips('生日没有选择');
                return false;
            }
            if (!/^(13|14|15|17|18)[0-9]{8}[0-9]$/.test(tel)) {
                showTips('输入正确的手机号码');
                return false;
            }
            me.grassData = {
                'name': username,
                'sex': $('.sex-wrapper label:nth-child(1) input').attr('checked') ? 1 : 2,
                'age': $('#datetimepicker').val().replace(/-/g, '') * 1,
                'phone': tel
            }
            return true;
        },
        grassActivityPort: function(data) {
            showLoading(null, '活动查询中...');
            getResult('grass/activity', {}, 'callbackActivityInfoHandler');
        },
        grassInvitePort: function(data) {
            showLoading(null, '正在提交...');
            getResult('grass/invite', {
                acid: this.acid,
                oi: openid,
                na: data.name,
                br: data.age,
                sex: data.sex,
                ph: data.phone
            }, 'callbackinviteGrassHandler');
        },
        grassAccountInfoPort: function() {
            getResult('grass/accountInfo', {
                acid: this.acid,
                oi: openid
            }, 'callBackQueryAccountInfoHandler');
        },
        grassRecordPort: function() {
            getResult('grass/record', {
                acid: this.acid,
                oi: openid
            }, 'callBackGrassRecordHandler');
        },
        grassRankPort: function() {
            getResult('grass/rank', {
                acid: this.acid,
                oi: openid
            }, 'callBackRankGrassHandler');
        },
        grassDetailPort: function(number) {
            getResult('grass/detail', {
                acid: this.acid
            }, 'callbackQueryActivityHandler');
        },
        fillUserInfo: function() {
            $('.myname').text(nickname ? nickname : '乐宁学员');
            $('.header .avatar').attr('src', headimgurl ? headimgurl : '../../images/avatar.jpg');
        }
    };

    W.callbackActivityInfoHandler = function(data) {
        if (data.result) {
            H.index.acid = data.acid;
            if (data.ta == 1) {
                hideLoading();
                $('body').addClass('key-none');
                if (data.st)
                    showTips('活动将在' + data.st + '开始');
                else
                    showTips('活动未开始');
            } else if (data.ta == 3) {
                H.index.grassDetailPort();
                H.index.grassAccountInfoPort();
            } else {
                hideLoading();
                $('body').addClass('key-none');
                $('#pop-end').removeClass('none');
            }
        } else {
            hideLoading();
            $('body').addClass('key-none');
            $('#pop-end').removeClass('none');
        }
    };

    W.callbackinviteGrassHandler = function(data) {
        if (data.result)
            $('#pop-register').removeClass('none');
        else
            showTips(data.message);
        hideLoading();
    };

    W.callBackQueryAccountInfoHandler = function(data) {
        var me = H.index;
        if (data.result) {
            $('.pop-register').addClass('none');
            toUrl('grass-share.html?shareUUID=' + openid);
        }
        hideLoading();
    };

    W.callbackQueryActivityHandler = function(data) {
        if (data.result) {
            if (data.message)
                $('.rule').removeClass('none').find('p').html(data.message);
            else
                $('.rule').addClass('none');
        }
    };
})(Zepto);

$(function() {
    H.jssdk.init();
    H.index.init();
});