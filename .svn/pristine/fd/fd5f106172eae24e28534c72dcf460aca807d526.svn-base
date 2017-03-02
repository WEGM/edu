(function($) {
    H.register = {
        $txtLoginId: $("#txtLoginId"),
        $identifyingCode: $("#identifyingCode"),
        $require: $(".require"),
        $btnLogin: $(".btn-login"),
        $title: $(".title"),
        ref: getQueryString("ref"),
        step: 60,
        init: function() {
            this.eventHander();
            //this.createCode();
            if (getQueryString('kfrom') == 'lening') {
                $('.title').html('<span>如果您还不是我们的会员，请移步预约课程</span>').attr('href', 'http://edu.holdfun.cn/leningpgs/html/pages/reserve.html');
            } 
            $('.title').removeClass('none');
            if (getQueryString('kfrom') != 'lening') {
                $('.title').addClass('none');
            }
        },

        loadBox: function() {

        },
        timeCount: function(step) {
            var me = this;
            var inteval = setInterval(function() {
                if (step > 0) {
                    // console.log(step);
                    H.register.$require.find('.time-count').text(--step);
                } else {
                    clearInterval(inteval);
                    H.register.$require.removeClass("require-disable").text("重新获取");
                }
            }, 1000)
        },
        eventHander: function() {
            var animating = false,
                submitdelay = 1500,
                me = this;
            me.$require.click(function() {
                //me.createCode();
                if (me.isCheck() && !me.$require.hasClass("require-disable")) {
                    $(this).addClass("require-disable");

                    getResult("smscode/sendsms", {
                        openid: openid,
                        phone: $.trim(me.$txtLoginId.val())
                    }, "callbackSendSmsCountHandler");
                }
            });
            me.$btnLogin.click(function(e) {
                var that = this;
                if (me.isCheck() && me.isCheck("code")) {
                    if (animating) return;
                    animating = true;
                    //ripple($(that), e);
                    $(that).addClass("processing");
                    setTimeout(function() {
                        animating = false;
                        $.ajax({
                            type: "get",
                            url: business_url + "user/mobilelock",
                            dataType: "jsonp",
                            jsonp: "callback",
                            jsonpCallback: "callBackMobileLockHandler",
                            data: {
                                openid: openid,
                                phone: me.$txtLoginId.val(),
                                code: me.$identifyingCode.val(),
                                eduid: eduData[getQueryString('kfrom')].uid
                            },
                            complete: function() {
                            },
                            success: function(data) {
                                if (data.result) {
                                    if (data.type == 0) {
                                        if (me.ref == "integrate") {
                                            toUrl("../integrate.html");
                                        } else if (me.ref == 'exercises') {
                                            toUrl("../html/pages/exercises-index.html");
                                        } else if (me.ref == 'preview') {
                                            toUrl("../html/pages/preview-index.html");
                                        } else if (me.ref == 'review') {
                                            toUrl("../html/pages/review-index.html");
                                        } else if (me.ref == 'mall') {
                                            toUrl("../html/pages/mall.html");
                                        } else {
                                            toUrl("html/student/studentcourse.html");
                                        }
                                    } else if (data.type == 1) {
                                        // 老师课程列表
                                        if (me.ref == 'preview') {
                                            toUrl("../html/pages/preview-index.html");
                                        } else if (me.ref == 'review') {
                                            toUrl("../html/pages/review-index.html");
                                        } else if (me.ref == 'mall') {
                                            toUrl("../html/pages/mall.html");
                                        } else {
                                            toUrl("html/teacher/courselist.html?teacherStyle=" + data.type);
                                        }
                                    } else if (data.type == 2) {
                                        // 行政课程列表
                                        if (me.ref == 'preview') {
                                            toUrl("../html/pages/preview-index.html");
                                        } else if (me.ref == 'review') {
                                            toUrl("../html/pages/review-index.html");
                                        } else if (me.ref == 'mall') {
                                            toUrl("../html/pages/mall.html");
                                        } else {
                                            toUrl("html/teacher/courselist.html?teacherStyle=" + data.type);
                                        }
                                    }
                                } else {
                                    me.$title.removeClass('none');
                                    if (data.cost != 0) {
                                        $(that).removeClass("processing");
                                        me.$title.addClass("error").text("注册失败！验证码参数错误");
                                    } else if (data.already) {
                                        $(that).removeClass("processing");
                                        me.$title.addClass("error").text("注册失败！您的电话号码已经注册过了");
                                    } else {
                                        $(that).removeClass("processing");
                                        me.$title.addClass("error").text("注册失败！可能您还不是学生或者老师");
                                    }
                                }
                            },
                            error: function() {
                                showTips("获取失败！");
                            }
                        });
                    }, submitdelay);
                }
            })
        },
        isCheck: function(code) {
            var me = this,
                tel = $.trim(me.$txtLoginId.val()),
                identifyingCode = $.trim(me.$identifyingCode.val());
            if (!/^\d{11}$/.test(tel)) {
                showTips('请填写正确手机号');
                return false;
            };
            if (code === "code" && identifyingCode === "") {
                showTips('请填写验证码');
                return false;
            }
            return true;
        },
        createCode: function() {
            var me = this;
            var code = "";
            var codeLength = 4; //验证码的长度
            var color = [];
            var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的

            me.colorMake(color);
            for (var i = 0; i < codeLength; i++) {
                var charNum = Math.floor(Math.random() * 52);
                code += '<span style="color:' + color[i] + '">' + codeChars[charNum] + '</span>';
            }
            me.$require.html(code);
        },
        validateCode: function() {
            var me = this;
            var inputCode = me.$identifyingCode.val();
            var textShow = me.$require.text();;
            if (inputCode.length <= 0) {
                showTips("请输入验证码");
                return false;
            } else if (inputCode.toUpperCase() != textShow.toUpperCase()) {
                showTips("您输入的验证码有误");
                me.createCode();
                return false;
            } else {
                return true;
            }
        },
        colorMake: function(color) {

            for (var j = 0; j < 4; j++) {
                var r, g, b;
                r = Math.floor(Math.random() * 255);
                g = Math.floor(Math.random() * 255);
                b = Math.floor(Math.random() * 255);
                color[j] = "rgb(" + r + "," + g + "," + b + ")";
            };
        },
    }
    W.callbackSendSmsCountHandler = function(data) {

        if (data.code === 0) {
            $('.title').text("短信已发送");
            H.register.$require.html("重新获取(<b class='time-count'>60</b>)");
            H.register.timeCount(H.register.step);
        } else {
            H.register.$title.addClass("error").text("短信发送失败，请检查您的电话号码");
            H.register.$require.removeClass("require-disable").text("重新获取");
        }
    }

    function ripple(elem, e) {
        $(".ripple").remove();
        var elTop = elem.offset().top,
            elLeft = elem.offset().left,
            // x = e.pageX - elLeft,
            // y = e.pageY - elTop;
            x = $(window).width() / 2 - elLeft,
            y = e.pageY - elTop;
        var $ripple = $("<div class='ripple'></div>");
        $ripple.css({ top: y, left: x });
        elem.append($ripple);
    };
    H.register.init();
    H.jssdk.init('off');
})(Zepto);