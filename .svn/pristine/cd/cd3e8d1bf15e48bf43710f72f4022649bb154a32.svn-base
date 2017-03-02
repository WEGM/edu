(function($) {
    H.courseDetail = {
        courseId: getQueryString("courseId"),
        suId: getQueryString("studentId"),
        teacherId: getQueryString("teacherId"),
        $body: $("body"),
        $courseList: $(".label-time ul"),
        $courseState: $(".course-state"),
        $timeDetail: $(".time-detail"),
        $teacherHeadimg: $(".teacher-headimg").find("img"),
        $teacherName: $(".teacher-name"),
        $courseName: $(".course-infor").find("p"),
        $main: $(".main"),

        color: ["#D8D8D8", "#9CCF38", "#3ACC83", "#F5A623", "#EB9D9D"],

        init: function() {
            this.checkUser();
        },
        loadingData: function() {
            var startState = false;
            var me = this;
            getResult("student/courseAttend", {
                courseUid: me.courseId,
                suid: me.suId,
                teacherUid: me.teacherId
            }, "callBackcourseAttendHandler");
        },
        // 考勤状态
        courseInforFill: function(data) {
            var me = this;
            var t = simpleTpl();
            if (data.item == null || data.item.length <= 0 || data.item == undefined) {
                showNewLoading($("body"), "暂无考勤记录");
                return;
            };
            // var timestr1 = data.item[0].stime.substring(0, 5) + '-' + data.item[0].etime.substring(0, 5);
            // var timestr2 = data.item[1].stime.substring(0, 5) + '-' + data.item[1].etime.substring(0, 5);
            var desData = me.sortOrder(data.item); //排序
            $(desData).each(function(i, item) {
                if (item.type) {
                    if (item.maked && item.maked == 1)
                        $('.label-state span:nth-child(1)').find('b').html($('.label-state span:nth-child(1)').find('b').html()*1 + 1);
                    else
                        $('.label-state span:nth-child(' + (item.type || 0) + ')').find('b').html($('.label-state span:nth-child(' + (item.type || 0) + ')').find('b').html()*1 + 1);
                }
                t._('<li style="background:' + (item.maked ? me.color[1] : me.color[(item.type == "" ? 0 : item.type)]) + '">')
                    //调课
                if (item.changeType) {
                    t._('<i class="changeState ' + (item.changeType ? item.changeType : "none") + ' " data-changeDate="' + (item.targetTime ? item.targetTime : "") + '" data-nowDate="' + (timeGetMD(item.date).Month + timeGetMD(item.date).Day) + '">调</i>')
                }
                //补课
                if (item.maked) {
                    // 同时调课
                    if (item.changeType) {
                        t._('<i class="changeState" style="left:2px">补</i>')
                    } else {
                        t._('<i class="changeState makestate">补</i>')
                    }
                }
                t._('' + (i + 1) + '')
                    ._('<div>')
                    ._('<p>' + item.stime.substring(0, 5) + '</p>')
                    ._('<p>' + item.date.substring(2, 10).replace(/-/g, '/') + '</p>')
                    ._('</div>')
                    ._('</li>')
            });
            // me.$timeDetail.removeClass("none").find("time").text(timestr1);
            me.$courseList.append(t.toString());
            me.eventHander();
        },
        eventHander: function() {
            var me = this;
            me.$courseList.find("li").click(function() {
                if ($(this).find(".changeState").hasClass("none") || $(this).find(".changeState").hasClass("makestate")) {
                    return;
                } else {
                    var changeDate = $(this).find(".changeState").attr("data-changeDate");
                    var nowDate = $(this).find(".changeState").attr("data-nowDate");
                    var t = simpleTpl();
                    if (changeDate == undefined || changeDate == "" || nowDate == "" || nowDate == undefined) {
                        return;
                    }
                    t._('<section class="modal">')
                        ._('<div class="msgbox" >')
                        ._('<div class="msgbox-bd">')
                        ._('<p class="msgbox-title">原' + nowDate + '的课</p>')
                        ._('<p>现已调到' + timeGetMD(changeDate).Month + timeGetMD(changeDate).Day + '</p>')
                        ._('</div>')
                        ._('</div>')
                        ._('</section>')
                    me.$body.append(t.toString());
                    var height = $(window).height(),
                        MsgH = $(".msgbox").height();
                    $(".msgbox").css({
                        'top': (height - MsgH) / 2,
                    });
                    $(".msgbox").click(function() {
                        $(this).closest('.modal').remove();
                    })
                }
            });
            if (W.screen.width === 320) {
                me.$courseList.find("li>div").on("touchend", function() {
                    var temp = this;
                    // $("body").find(".tooltips").remove();
                    if ($(this).hasClass("hasclick")) {
                        return;
                    } else {
                        $(this).addClass("hasclick");
                        var pointX = $(this).offset().left;
                        var pointY = $(this).offset().top;
                        if (pointX <= 15) {
                            pointX = pointX;
                            $(".tooltips").css({
                                "-webkit-transform": "rotate(30deg)"
                            });
                        };
                     
                        $("body").append('<span class="tooltips" style="top:' + pointY + 'px;left:' + pointX + 'px">' + $(this).find("p:last").text() + '</span>')
                        setTimeout(function() {
                            $(".tooltips").css({
                                "opacity": "1",
                                "margin-top": "-30px",
                                "background": "#4A90E2"
                            });
                        }, 100);
                        if (pointX <= 15) {
                            pointX = pointX;
                            $(".tooltips").css({
                                "-webkit-transform": "rotate(30deg)"
                            });
                        };
                        setTimeout(function()
                        {
                            $(temp).removeClass("hasclick");
                            $(".tooltips").css({
                                "opacity": "0",
                                "margin-top": "-60px",
                            });
                            setTimeout(function() {
                                 $(".tooltips").remove();
                            }, 200)
                        },2000)
                    }
                });
            }
        },
        domResize: function() {
            if (W.screen.width === 320) {
                $(".time-detail").css({
                    'font-size': "14px"
                });
            }
        },
        sortOrder: function(srcData) {
            var desData = srcData;
            // console.log(srcData);
            for (var i = 0; i < desData.length; i++) {
                for (var j = i; j < desData.length; j++) {
                    if (timestamp(desData[i].date) > timestamp(desData[j].date)) {
                        var temp = desData[i];
                        desData[i] = desData[j];
                        desData[j] = temp;
                    }
                }
            }
            return desData;
        },
        checkUser: function() {
            getResult("user/gettype", {
                openid: openid,
                eduid: eduData[getQueryString('kfrom')].uid
            }, "callBackMobileGetTypekHandler");
        }
    }
    W.callBackcourseAttendHandler = function(data) {
        if (data.result) {
            H.courseDetail.courseInforFill(data);
            H.courseDetail.$teacherHeadimg.attr("src", data.img ? data.img : "../../images/avatar.jpg");
            H.courseDetail.$teacherName.text(data.teacherName ? data.teacherName : "匿名");
            H.courseDetail.$courseName.text(data.courseName ? data.courseName : "无相关课程");
            H.courseDetail.$main.removeClass("none");
            if (data.syllaState == 0) {
                H.courseDetail.$courseState.addClass("state-before").removeClass("none").text("未开始");
            } else if (data.syllaState == 1) {
                H.courseDetail.$courseState.addClass("state-during").removeClass("none").text("进行中");
            } else if (data.syllaState == 2) {
                H.courseDetail.$courseState.addClass("state-before").removeClass("none").text("已完成");
            }
        } else {
        }
    }


    W.callBackMobileGetTypekHandler = function(data) {
        if (data.result) {
            H.courseDetail.loadingData();
            H.courseDetail.domResize();
            bindOpendid(data);
        } else {
            showTips('登录态失效，请重新验证身份');
            setTimeout(function() {
                toUrl("../../register.html");
            }, 2500);
        }
    };

    H.courseDetail.init();
    H.jssdk.init('off');
})(Zepto);