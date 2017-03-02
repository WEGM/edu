(function($) {
    H.index = {
        reserveData: null,
        init: function() {
            this.event();
            this.reservateDetailPort();
            // this.integralInfoPort();
        },
        event: function() {
            var me = this;
            $(".btn-submit").click(function(e) {
                e.preventDefault();
                if (me.checkInfo()) me.reservateSavePort(me.reserveData);
            });
            $(".btn-rule").click(function(e) {
                e.preventDefault();
                $('#pop-explain').removeClass('none');
            });
            $(".btn-close").click(function(e) {
                e.preventDefault();
                $('#pop-explain').addClass('none');
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
            this.reserveData = ''
            var me = this,
                username = $.trim($('.username').val()),
                birthday = $('#datetimepicker').val(),
                tel = $.trim($('.tel').val()),
                school = $.trim($('.school').val());
            if (username.length === 0) {
                showTips('姓名没有填写');
                return false;
            }
            if (!$('.sex-wrapper label:nth-child(1) input').prop('checked') && !$('.sex-wrapper label:nth-child(2) input').prop('checked')) {
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
            me.reserveData = {
                'name': username,
                'sex': $('.sex-wrapper label:nth-child(1) input').prop('checked') ? 1 : 2,
                'age': $('#datetimepicker').val().replace(/-/g, '') * 1,
                'phone': tel,
                'school': school
            }
            return true;
        },
        reservateSavePort: function(data) {
            showLoading(null, '提交中...');
            getResult('reservate/user/save', {
                openid: openid,
                // name: encodeURIComponent(data.name),
                name: data.name,
                sex: data.sex,
                age: data.age,
                phone: data.phone,
                // school: encodeURIComponent(data.school),
                school: data.school,
                type: $('.ex-study input').prop('checked') ? 1 : 0
            }, 'callBackReservateUserSaveHandler');
        },
        reservateDetailPort: function() {
            showLoading(null, '预约查询中...');
            getResult('reservate/user/appoint/detail', {
                openid: openid
            }, 'callBackReservateUserAppointDetailHandler');
        },
        integralInfoPort: function() {
            getResult('rules/info', {
                eduUuid: eduUuid,
                type: 2
            }, 'callBackRulesInfoHandler');
        }
    };

    W.callBackRulesInfoHandler = function(data) {
        if (data.result) {
            $('.btn-rule').css('display', 'block');
            if (data.detail) $('#pop-explain p').html(data.detail);
        } else {
            $('.btn-rule').css('display', 'none');
        }
        hideLoading();
    };

    W.callBackReservateUserSaveHandler = function(data) {
        if (data.result) {
            $('input, select').attr('disabled', 'disabled');
            $('#page').removeClass().addClass('step2');
        } else {
            showTips('很抱歉，预约失败，请稍后再试！');
        }
        hideLoading();
    };

    W.callBackReservateUserAppointDetailHandler = function(data) {
        if (data.result) {
            if (data.st == 0) {
                var age = data.ag.toString();
                $('input, select').attr('disabled', 'disabled');
                if (data.re) {
                    $('#page').removeClass().addClass('step3');
                    $('.reserve-time p').html(data.re);
                } else {
                    $('#page').removeClass().addClass('step2');
                }
                $('.username').val(data.na);
                $('.sex-wrapper label:nth-child(' + data.se + ') input').prop('checked', true);
                $('#datetimepicker').val(age.substr(0, 4) + '-' + age.substr(4, 2) + '-' + age.substr(6, 2));
                $('.tel').val(data.ph);
            }
        }
        hideLoading();
    };
})(Zepto);

$(function() {
    H.jssdk.init('off');
    H.index.init();
});