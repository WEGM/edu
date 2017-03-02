(function($) {
    H.teacherCourse = {
        $countDown: $(".countdown"),
        $courseOver: $(".course-over"),
        $inforBox: $(".infor-box"),

        $teacherHeadimg: $(".teacher-headimg").find("img"),
        $teacherName: $(".teacher-name"),
        $courseName: $(".course-infor").find("p"),

        teachuid: getQueryString("teachuid"),
        syllauid: getQueryString("syllauid"),
        cuid: getQueryString("cuid"),
        studentList: $(".student-list"),
        detailCountdown: $(".detail-countdown"),
        courseState: $(".course-state"),
        isTimeOver: false,
        type: 1,
        dec: 0,
        isCanCheck: true,
        init: function() {
            this.checkUser();
        },
        loadingData: function() {
            var startState = true;
            var me = this;
            getResult("teacher/coudetail", {
                cuid: me.cuid,
                syllauid: me.syllauid,
                teachuid: me.teachuid
            }, "callBackCourseDetailHandler", true)

        },
        // 点名开始
        studentInforFill: function(data) {
            var me = this;
            var checkedStyle = "unCheck";
            var t = simpleTpl();
            if (data.item.length <= 0 || data.item == "" || data.item == undefined) {
                showNewLoading($("body"), "暂无学生名单");
                return;
            };
            $(data.item).each(function(i, item) {
                if (item.attend == "1") {
                    checkedStyle = "isCheck";
                } else {
                    checkedStyle = "unCheck";
                }
                t._('<li><div class="list-item ' + checkedStyle + '">')
                    ._(' <span class="name">' + (item.stuName ? item.stuName : "匿名") + '</span>')
                    ._('<div class="choosen-box" data-studentId="' + item.suid + '" data-syllauid="' + item.syllauid + '"></span>')
                    ._('</li></div>')
            });
            switch(data.state) {
                case 0:
                    me.courseState.addClass("state-before").removeClass("none").text("未开始");
                    break;
                case 1:
                    me.courseState.addClass("state-during").removeClass("none").text("进行中");
                    break;
                case 2:
                    me.courseState.addClass("state-before").removeClass("none").text("已完成");
                    break;
                default:
                    me.courseState.addClass("none");
            }
            // me.courseState.addClass("state-during").removeClass("none").text("进行中");
            me.studentList.append(t.toString()).removeClass("none");
            me.$countDown.addClass("none");
            me.eventHander();
        },
        eventHander: function() {
            var me = this;
            me.studentList.find(".choosen-box").click(function() {
                    var suid = $(this).attr("data-studentId");
                    var syllauid = $(this).attr("data-syllauid");
                    if ($(this).closest(".list-item").hasClass("unCheck") && me.isCanCheck == true) {
                        $(this).closest(".list-item").addClass("isCheck").removeClass("unCheck");
                        me.isCanCheck = false;
                        showLoading($("body"),"正在点名");
                        getResult("student/change", {
                            syllauid: syllauid,
                            suid: suid,
                        }, "callChangeAttendHandler", false)
                    } else {
                        // 取消點名
                        if (me.isCanCheck == true) {
                            $(this).closest(".list-item").removeClass("isCheck").addClass("unCheck");
                            me.isCanCheck = false;
                            showLoading($("body"),"取消点名");
                            getResult("student/recall", {
                                syllauid: syllauid,
                                suid: suid,
                            }, "callChangeRecallHandler", false)
                            return;
                        }
                }
            })
        },
        // 点名未开始
        beginCountDown: function(data) {
            var me = this;
            var countdownTime = timestamp(data.stime);
            H.teacherCourse.dec = new Date().getTime() - data.curTime;
            me.detailCountdown.attr("etime", countdownTime + H.teacherCourse.dec);
            me.$countDown.removeClass("none");
            me.count_down();
            me.courseState.addClass("state-before").removeClass("none").text("未开始");
        },
        courseOver: function() {
            var me = this;
            me.$countDown.addClass("none");
            me.$courseOver.removeClass("none");
            me.courseState.addClass("state-before").removeClass("none").text("已完成");
        },
        count_down: function() {
            var meOut = this;
            $('.detail-countdown').each(function(index, el) {
                var $me = $(this);
                $(this).countDown({
                    etpl: '%H%' + ':' + '%M%' + ':' + '%S%', // 还有...结束
                    stpl: '%H%' + ':' + '%M%' + ':' + '%S%', // 还有...开始
                    sdtpl: '',
                    otpl: '',
                    otCallback: function() {
                        if (!H.teacherCourse.isTimeOver && H.teacherCourse.type == 1) {
                            H.teacherCourse.isTimeOver = true;
                        } else if (H.teacherCourse.type == 2) {
                            return;
                        } else {
                            showLoading();
                            setTimeout(function() {
                                hideLoading();
                                meOut.loadingData(false);
                            }, 1000)

                            H.teacherCourse.type = 2;
                        }

                    },
                    sdCallback: function() {
                        H.teacherCourse.isTimeOver = false;
                    }
                });
            });
        },
        checkUser: function() {
            getResult("user/gettype", {
                openid: openid,
                eduid: eduData[getQueryString('kfrom')].uid
            }, "callBackMobileGetTypekHandler");
        }
    }
    W.callBackCourseDetailHandler = function(data) {
        var me = H.teacherCourse;
        if (data.result) {
            me.$teacherHeadimg.attr("src", data.img ? data.img : "../../images/avatar.jpg");
            me.$teacherName.text(data.name ? data.name : "匿名");
            me.$courseName.text(data.courseName ? data.courseName : "无相关课程");
            me.$inforBox.removeClass("none");
            me.studentInforFill(data);
        } else {
            showTips("网络繁忙");
        }
    }
    W.callChangeAttendHandler = function(data) {
        hideLoading();
        if (data.result) {
            H.teacherCourse.isCanCheck = true;
        } else {
            H.teacherCourse.isCanCheck = true;
        }
    }
    W.callChangeRecallHandler = function(data) {
        hideLoading();
        if (data.result) {
            H.teacherCourse.isCanCheck = true;
        } else {
            H.teacherCourse.isCanCheck = true;
        }
    }


    W.callBackMobileGetTypekHandler = function(data) {
        if (data.result) {
            H.teacherCourse.loadingData();
            bindOpendid(data);
        } else {
            showTips('登录态失效，请重新验证身份');
            setTimeout(function() {
                toUrl("../../register.html");
            }, 2500);
        }
    };

    H.teacherCourse.init();
    H.jssdk.init('off');
})(Zepto);