(function($) {
    H.studentCourse = {
        $body: $("body"),
        $main: $(".main"),
        $courseState: $(".course-state"),
        init: function() {
            // this.studentInforFill();
            this.checkUser();
        },
        loadingData: function() {
            getResult("student/course/list", {
                openid: openid,
                type: "3",
                eduid: eduData[getQueryString('kfrom')].uid
            }, "callBackStudentCoursesHandler")
        },
        // 家长课程列表
        studentInforFill: function(data) {
            var me = this;
            var checkedStyle = "";
            var stuItems = data.stuItems;
            var t = simpleTpl();
            if (data.lf && data.lf == 0) $('body').addClass('live_off');
            if (stuItems.length <= 0 || stuItems == "" || stuItems == undefined) {
                showNewLoading($("body"), "暂无课程");
                return;
            };
            $(stuItems).each(function(i, List) {
                t._('<section data-studentId="' + List.suid + '"><h1>' + List.sn + '的课程列表</h1>')
                t._('<ul class="course-list">')
                $(List.couItems).each(function(j, item) {
                    var courseState = "";
                    var courseTxt = "";
                    var stat = '';
                    var liveUrl = '';
                    // if (item.tuid) {
                        switch (item.cs) {
                            case 0:
                                courseState = "state-before";
                                courseTxt = "未开始";
                                break;
                            case 1:
                                courseState = "state-during";
                                courseTxt = "进行中";
                                break;
                            case 2:
                                courseState = "state-before";
                                courseTxt = "已完成";
                                break;
                            default:
                                break;
                        };
                    // } else {
                    //     courseState = "state-noclass";
                    //     courseTxt = "暂未分配课程";
                    // }
                    
                    if (item.liveUrl) {
                        liveUrl = item.liveUrl;

                        var nowTimeStr = formatDate(new Date().getTime());
                        var beginTimeStr = formatDate(new Date().getTime()).split(' ')[0] + ' ' + item.st + ':00';
                        var endTimeStr = formatDate(new Date().getTime()).split(' ')[0] + ' ' + item.en + ':00';

                        if (comptime(nowTimeStr, beginTimeStr) < 0 && comptime(nowTimeStr, endTimeStr) >= 0) {
                            stat = '';
                        } else {
                            stat = 'none';
                        }
                    } else {
                        stat = 'none';
                        liveUrl = '';
                    }
                    t._('<li>')
                        ._('<div class="infor-box " data-courseid="' + item.cuid + '" data-teacherid="' + item.tuid + '">')
                            ._('<div class="teacher-infor">')
                                ._('<div class="teacher-headimg">')
                                    ._('<img src="' + (item.tim ? item.tim : '../../images/avatar.jpg') + '" alt="">')
                                ._('</div>')
                                ._('<p class="teacher-name">' + (item.tn ? item.tn : "匿名") + '</p>')
                            ._('</div>')
                            ._('<div class = "course-count '+(item.sp!=undefined?"":"none")+'"><span>已缴：'+(item.sp).toFixed(0)+'<label>课</label></span><span>已上：'+(item.sp-(item.slp!=undefined?item.slp:0)).toFixed(0)+'<label>课</label></span><span>剩余：'+(item.slp!=undefined?item.slp:0).toFixed(0)+'<label>课</label></span></div>')
                            ._('<div class = "course-infor" >')
                                ._('<p>' + (item.cn ? item.cn : "无相关课程") + '</p> ')
                            ._('</div>')
                            ._('<div class="btn-box">')
                                ._('<div class="a-btn course-state ' + courseState + '">')
                                    ._('<div class="choosen-box" data-studentId="' + item.studentId + '">' + courseTxt + '</div>')
                                ._('</div>')
                                ._('<a class="a-btn live stu ' + stat + '" live-url="' + liveUrl + '">观看直播</a>')
                            ._('</div>')
                        ._('</div>')
                    ._('</li>')
                })
                t._('</ul></section>')
            });
            me.$main.append(t.toString()).removeClass("none");
            me.eventHander();
        },
        eventHander: function() {
            var me = this;
            $(".infor-box").click(function() {
                var courseId = $(this).attr("data-courseid");
                var teacherid = $(this).attr("data-teacherid");
                var studentId = $(this).closest("section").attr("data-studentId");
                var t = simpleTpl();
                if (teacherid == "" || teacherid == "undefined") {
                        // t._('<section class="modal">')
                        //     ._('<div class="msgbox" >')
                        //     ._('<div class="msgbox-bd">')
                        //     ._('<p class="msgbox-title">您还无课表</p>')
                        //     ._('<p>请联系相关老师给您安排课程</p>')
                        //     ._('</div>')
                        //     ._('</div>')
                        //     ._('</section>')
                        // me.$body.append(t.toString());
                        // var height = $(window).height(),
                        //     MsgH = $(".msgbox").height();
                        // $(".msgbox").css({
                        //     'top': (height - MsgH) / 2,
                        // });
                        // $(".msgbox").click(function() {
                        //     $(this).closest('.modal').remove();
                        // })
                        swal({
                            title: "暂无课程安排",
                            text: "请联系相关老师给您安排课程",
                            type: "info",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "知道了",
                        });
                        return;
                };
                // console.log(studentId);
                // console.log(teacherid);
                toUrl("./coursedetail.html?courseId=" + courseId + "&studentId=" + studentId + "&teacherId=" + teacherid);
            });
            $('.live').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                var that = this;
                if ($(this).hasClass('none')) return;
                if ($(this).hasClass('stu') && $(this).attr('live-url') != '') {
                    toUrl($(this).attr('live-url'));
                    return;
                }
            });
        },
        checkUser: function() {
            getResult("user/gettype", {
                openid: openid,
                eduid: eduData[getQueryString('kfrom')].uid
            }, "callBackMobileGetTypekHandler");
        }
    }

    W.callBackMobileGetTypekHandler = function(data) {
        if (data.result) {
            H.studentCourse.loadingData();
            bindOpendid(data);
        } else {
            showTips('登录态失效，请重新验证身份');
            setTimeout(function() {
                toUrl("../../register.html");
            }, 2500);
        }
    };

    W.callBackStudentCoursesHandler = function(data) {
        if (data.result) {
            H.studentCourse.studentInforFill(data);
        }
    }
    H.studentCourse.init();
    H.jssdk.init('off');
})(Zepto);