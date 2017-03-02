(function($) {
    H.coupon = {
        wxCheck: false, //
        isError: false, //判断 wxcongfig是否失败，默认为false（未失败），config失败之后置为true（失败）
        ci: null, //卡券id
        ts: null,
        si: null,
        username: null,
        couponImg: null,
        couponName: null,
        rulesText:"",
        winH: $(window).height(),
        $fillInfor: $(".fill-infor"),
        $btnSubmit: $(".btn-submit"),
        $inforSlide: $(".infor-slide"),
        $successSlide: $(".success-slide"),
        $coupoList: $(".coupon-list"),
        $formInfor: $(".form-infor"),
        $couponBg: $(".coupon-bg"),
        $couponState: $(".fill-infor").find("span"),
        $couponDiv: $(".fill-infor").find("div"),
        $scrollBox: $(".scroll-box"),
        
        init: function() {
            //this.slideScorll();
            this.eventhander();
            this.resize();
            this.$formInfor.height(this.winH);
            this.loadData();
            //this.ruleLoad();
            // this.wxConfig();
            this.$coupoList.css("height", (this.winH - this.$fillInfor.height() - $(".coupon-bg").height()));
        },
        loadData: function() {
            getResult("wxcard/user/status", { openid: openid, eduUuid: eduUuid, appid: busiAppId }, "callBackWxcardUserGetStatusHandler", true);
            getResult("wxcard/record/list", { openid: openid, eduUuid: eduUuid, page: 1, pageSize: 20 }, "callBackWxcardRecordHandler", true);
        },
        ruleLoad: function() {
            $.ajax({
                type: 'GET',
                async: false,
                url: business_url + 'rules/info',
                data: {eduUuid: eduUuid, type: 6},
                dataType: "jsonp",
                jsonpCallback: 'callBackRulesInfoHandler',
                timeout: 15000,
                complete: function() {},
                success: function(data) {
                    if (data.result) {
                        $("#rule-pop").find("p").html(data.detail);
                    }
                },
                error: function(xmlHttpRequest, error) {
                   
                }
            });
        },
        fillDom: function(data) {
            var me = this;
            me.ci = data.ci;
            me.ts = data.ts;
            me.si = data.si;
            me.couponImg = data.cimg;
            me.couponName = data.cn;
            me.rulesText=data.rl;
            me.$couponBg.attr("src", me.couponImg?me.couponImg:'./images/coupon-bg.jpg');
            if (data.isen === "1") {
                if (data.isget === "0") {
                    me.$couponState.text("已注册,  领取千元代金券");
                } else {
                    me.$couponState.text("卡券已领取");
                    me.$couponDiv.append('<p class="font14">请在微信卡券查看并使用</p>')  
                }

            }
            $("#rule-pop").find("p").html(me.rulesText);
            me.$scrollBox.removeClass("hidden");
            me.slideScorll(data);
        },
        fillDomList: function(items) {
            var me = this;
            var t = simpleTpl();
            $.each(items, function(i, el) {
                t._('<li >')
                    ._('<div class="coupon-small"><img src="images/coupon.png" alt=""></div>')
                    ._('<div>')
                    ._('<p class="coupon-value">' + el.cn + '</p>')
                    ._('<p class="time-limit font14">使用期限：' + el.ct + '</p>')
                    ._('</div>')
                    ._('</li>')

            });
            me.$coupoList.find('ul').append(t.toString());
        },
        slideScorll: function(data) {
            var me = this;
            var mySwiper = new Swiper('.swiper-container', {
                onSlideNextEnd: function(swiper) {
                    if (swiper.isEnd) {

                    } else {
                        mySwiper.lockSwipes();
                    }
                }
            });
            mySwiper.lockSwipes();
            me.$fillInfor.click(function() {
                if (data.isen === "1") {
                    if (data.isget === "1") {
                        showTips("您已经领取卡券了");
                    } else {
                        if (H.coupon.wxCheck = true) {
                            me.wx_card();
                        } else {
                            showTips("微信配置有问题");
                        }

                    }
                } else {
                    mySwiper.unlockSwipes();
                    mySwiper.slideNext();
                }
            })
            me.$btnSubmit.click(function() {
                if (me.checkInfo() && !$(this).hasClass("clicked")) {
                    mySwiper.unlockSwipes();
                    $(this).addClass("clicked");
                    var username = $.trim($('.username').val()),
                        sex = $("input[type=radio]:checked").val() * 1,
                        birth_day = $('#datetimepicker').val(),
                        tel = $.trim($('.tel').val()),
                        school = $.trim($('.school').val());
                    getResult("wxcard/user/save", { openid: openid, eduUuid: eduUuid, name: username, sex: sex, birth: birth_day, phone: tel, eduInstitution: school }, "callBackWxcardUserSaveHandler", true);
                }
            })

        },
        checkInfo: function() {
            var username = $.trim($('.username').val()),
                sex = $("input[type=radio]:checked").val(),
                birth_day = $('#datetimepicker').val(),
                tel = $.trim($('.tel').val()),
                school = $.trim($('.school').val());
            if (username.length === 0 || username.length > 10) {
                showTips('请填写小于10个字的用户名');
                return false;
            }
            if (sex * 1 === 0) {
                showTips('性别没选');
                return false;
            }
            if (birth_day === "") {
                showTips('生日没选');
                return false;
            }
            if (!/^\d{11}$/.test(tel)) {
                showTips('输入正确手机号码');
                return false;
            }
            return true;
        },
        eventhander: function() {
            $("#datetimepicker").on("click", function(e) {
                e.stopPropagation();
                $(this).lqdatetimepicker({
                    css: 'datetime-day',
                    dateType: 'D',
                    selectback: function() {

                    }
                });
            });
            $(".coupon-rule").click(function(e) {
                e.preventDefault();
                $('#rule-pop').removeClass('none');
            });
            $(".btn-close").click(function(e) {
                e.preventDefault();
                $('#rule-pop').addClass('none');
            });
        },
        resize: function() {
            if (W.screen.width === 320) {
                $(".coupon-list li").css("font-size", "14px")
            }
        },
        wxConfig: function() {
            showLoading();
            //后台获取jsapi_ticket并wx.config
            $.ajax({
                type: 'GET',
                async: true,
                url: business_url + 'mp/jsapiticket',
                data: {appid:busiAppId},
                dataType: "jsonp",
                jsonpCallback: 'callbackJsapiTicketHandler',
                timeout: 15000,
                complete: function() {},
                success: function(data) {
                    if (data.result) {
                        var url = window.location.href.split('#')[0];
                        var nonceStr = 'df51d5cc9bc24d5e86d4ff92a9507361';
                        var timestamp = Math.round(new Date().getTime() / 1000);
                        var signature = hex_sha1('jsapi_ticket=' + data.ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + url);
                        //权限校验
                        wx.config({
                            debug: false,
                            appId: busiAppId,
                            timestamp: timestamp,
                            nonceStr: nonceStr,
                            signature: signature,
                            jsApiList: [
                                "addCard",
                                "checkJsApi"
                            ]
                        });
                    }
                },
                error: function(xmlHttpRequest, error) {}
            });
        },
        wx_card: function() {
            var me = this;
            //卡券
            wx.addCard({
                cardList: [{
                    cardId: H.coupon.ci,
                    cardExt: "{\"timestamp\":\"" + H.coupon.ts + "\",\"signature\":\"" + H.coupon.si + "\"}"
                }],
                success: function(res) {
                    getResult('wxcard/record/save', {
                        openid: openid,
                        eduUuid: eduUuid,
                        userName: nickname ? encodeURIComponent(nickname) : "",
                        userUrl: headimgurl ? headimgurl : "",
                        cardId: me.ci,
                        prizeName: me.couponName,
                        prizeUrl: me.couponImg,
                        endTime: "",
                    }, 'callBackWxcardRecordSaveHandler', true);
                },
                fail: function(res) {
                    showTip("卡券领取失败");
                },
                complete: function() {

                },
                cancel: function() {

                }
            });
        },
    }
    W.callBackWxcardRecordHandler = function(data) {
        if (data.code === "0") {
            H.coupon.fillDomList(data.item);
        } else {

            // showTips("暂无卡券");
        }
    }
    W.callBackWxcardUserGetStatusHandler = function(data) {
        if (data.code === "0") {
            H.coupon.fillDom(data);
        } else {

            showTips("网络繁忙");
        }
    }
    W.callBackWxcardUserSaveHandler = function(data) {
        if (data.code === "0") {
            if (H.coupon.wxCheck = true) {
                H.coupon.wx_card();
            } else {
                showTips("微信配置有问题");
            }
        } else {
            H.$btnSubmit.removeClass("clicked");
            showTips("信息保存失败");
        }
    }
    W.callBackWxcardRecordSaveHandler = function(data) {
        if (data.code == "0") {
            showTips("卡券领取成功");
            window.location.reload();

        } else {
            showTips("卡券领取失败");
        }
    }
    H.coupon.wxConfig();
    wx.ready(function() { 
        wx.checkJsApi({
            jsApiList: [
                'addCard'
            ],
            success: function(res) {
                var t = res.checkResult.addCard;
                //判断checkJsApi 是否成功 以及 wx.config是否error
                if (t && !H.coupon.isError) {
                    H.coupon.wxCheck = true;
                }
            }
        });
        hideLoading();
        H.coupon.init();

    });
    wx.error(function(res) {
        H.coupon.isError = true;
    });
})(Zepto)
