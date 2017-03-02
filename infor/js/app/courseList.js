(function($) {
    H.courseList = {
        $dom: null,
        $main:$(".main"),
        $courseList: $(".course-list"),
        $courseState: $(".course-state"),
        $teacherStyle: getQueryString("teacherStyle")?getQueryString("teacherStyle"):"1",
        zhiboDelay: 15,
        init: function() {
            this.checkUser();
        },
        dataLoad: function() {
            var me = this;
            if(this.$teacherStyle=="1") {
                // 普通老师
                getResult("teacher/course", {
                    openid: openid,
                    eduid: eduData[getQueryString('kfrom')].uid
                }, "callBackTecherCourseHandler", true);
            } else {
                // 行政老师
                getResult("adm/teacher/course/info", {
                    openid: openid,
                    type:3,
                    eduid: eduData[getQueryString('kfrom')].uid
                }, "callBackAdmCourseListHandler", true);            
            }
            
        },
        // 行政课程列表
        adminInforFill: function(data) {
            var me = this;
            var checkedStyle = "";
            var t = simpleTpl();
            if (data.lf && data.lf == 0) $('body').addClass('live_off');
            if(data.items.length <= 0||data.items=="" ||data.items==undefined) {
                showNewLoading($("body"),"今日暂无课程");
                return;
            };
            data.items.sort(function(a,b){return parseInt(a.st.replace(':', '')) - parseInt(b.st.replace(':', ''))})
            $(data.items).each(function(i, item) {
                var courseState = "";
                var courseTxt = "";
                var status = '';
                var stat = '';
                var liveUrl = '';
                switch (item.ty) {
                    case 0:
                        courseState = "state-before";
                        courseTxt = "未开始";
                        status = '';
                        break;
                    case 1:
                        courseState = "state-during";
                        courseTxt = "进行中";
                        status = '';
                        break;
                    case 2:
                        courseState = "state-before";
                        courseTxt = "已完成";
                        status = 'end';
                        break;
                    default:
                        break;
                };
                if (item.liveUrl) {
                    liveUrl = item.liveUrl;

                    var nowTimeStr = formatDate(new Date().getTime());
                    var beginTimeStr = formatDate(new Date().getTime()).split(' ')[0] + ' ' + item.st + ':00';
                    var endTimeStr = formatDate(new Date().getTime()).split(' ')[0] + ' ' + item.et + ':00';

                    if (comptime(nowTimeStr, beginTimeStr) < 0 && comptime(nowTimeStr, endTimeStr) >= 0) {
                        stat = '';
                    } else {
                        stat = 'none';
                    }
                } else {
                    stat = 'none';
                    liveUrl = '';
                }
                var imgUrl=item.img?item.img:"../../images/avatar.jpg";
                t._('<li class="' + status + '">')
                    ._('<div class="infor-box " data-type="'+item.ty+'" data-teachuid="' + (item.op?item.op:"") + '" data-syllauid="' + (item.pu?item.pu:"") + '" data-cuid="' + (item.cu?item.cu:"") + '">')
                        ._('<div class="teacher-infor">')
                            ._('<div class="teacher-headimg">')
                                ._('<img src="'+imgUrl+'" alt="">')
                            ._('</div>')
                            ._('<p class="teacher-name">' + (item.tc?item.tc:"匿名") + '</p>')
                        ._('</div>')
                        ._('<div class="course-infor" >')
                            ._('<p>' + (item.ce?item.ce:"匿名") + '</p> ')
                            ._('<p class="class_time">' + item.st + ' - ' + item.et + '</p> ')
                        ._('</div>')
                        ._('<div class="btn-box">')
                            ._('<div class="a-btn course-state ' + courseState + '">')
                                ._('<div class="choosen-box" data-studentId="' + item.studentId + '">' + courseTxt + '</div>')
                            ._('</div>')
                            ._('<a class="a-btn live xzt ' + stat + '" live-url="' + liveUrl + '">观看直播</a>')
                        ._('</div>')
                    ._('</div>')
                ._('</li>')
            });
            me.$courseList.append(t.toString()).removeClass("none");
            me.$main.removeClass("none");
            me.eventHander();
        },
        teacherInforFill: function(data) {
            var me = this;
            var checkedStyle = "";
            var imgUrl=data.img?data.img:"../../images/avatar.jpg";
            var name = data.name;
            var t = simpleTpl();
            if (data.lf && data.lf == 0) $('body').addClass('live_off');
            if(data.item.length <= 0||data.item=="" ||data.item==undefined) {
                showNewLoading($("body"),"今日暂无课程");
                return;
            };
            data.item.sort(function(a,b){return parseInt(a.st.replace(':', '')) - parseInt(b.st.replace(':', ''))})
            $(data.item).each(function(i, item) {
                var courseState = "";
                var courseTxt = "";
                var status = "";
                var liveClass = '';
                var tips = '';
                switch (item.state) {
                    case 0:
                        status = '';
                        courseState = "state-before";
                        courseTxt = "未开始";
                        break;
                    case 1:
                        status = '';
                        courseState = "state-during";
                        courseTxt = "进行中";
                        break;
                    case 2:
                        status = 'end';
                        courseState = "state-before";
                        courseTxt = "已完成";
                        break;
                    default:
                        break;
                };
                if (item.liveUrl) {
                    liveClass = 'lived';
                    tips = '正在直播';
                } else {
                    var nowTimeStr = formatDate(new Date().getTime());
                    var beginTimeStr = formatDate(new Date().getTime()).split(' ')[0] + ' ' + item.st + ':00';
                    var endTimeStr = formatDate(new Date().getTime()).split(' ')[0] + ' ' + item.et + ':00';

                    var delayBTS = formatDate(new Date(beginTimeStr).getTime() - me.zhiboDelay * 60 * 1000);
                    if (comptime(nowTimeStr, delayBTS) < 0 && comptime(nowTimeStr, endTimeStr) >= 0) {
                        liveClass = '';
                        tips = '开始直播';
                    } else {
                        liveClass = 'none';
                        tips = '';
                    }
                }
                t._('<li class="' + status + '">')
                    ._('<div class="infor-box" data-teachuid="' + data.teachuid + '" data-syllauid="' + item.syllauid + '" data-cuid="' + item.cuid + '">')
                        ._('<div class="teacher-infor">')
                            ._('<div class="teacher-headimg">')
                                ._('<img src="'+imgUrl+'" alt="">')
                            ._('</div>')
                            ._('<p class="teacher-name">' + (name?name:"匿名") + '</p>')
                        ._('</div>')
                        ._('<div class="course-infor" >')
                            ._('<p>' + (item.courseName?item.courseName:"无相关课程") + '</p> ')
                            ._('<p class="class_time">' + item.st + ' - ' + item.et + '</p> ')
                        ._('</div>')
                        ._('<div class="btn-box">')
                            ._('<div class="a-btn course-state ' + courseState + '">')
                                ._('<div class="choosen-box" data-studentId="' + item.studentId + '">' + courseTxt + '</div>')
                            ._('</div>')
                            ._('<a class="a-btn live jxt ' + liveClass + '">' + tips + '</a>')
                        ._('</div>')
                    ._('</div>')
                ._('</li>')
            });
            me.$courseList.empty();
            me.$courseList.append(t.toString()).removeClass("none");
            me.$main.removeClass("none");
            me.eventHander();
        },
        eventHander: function() {
            var me = this;
            $(".infor-box").click(function() { 
                var teachuid = $(this).attr("data-teachuid");
                var syllauid = $(this).attr("data-syllauid");
                var cuid = $(this).attr("data-cuid");
                if(teachuid == "" || syllauid == "" || cuid == "") return;
                toUrl("./teachercourse.html?teachuid=" + teachuid+'&syllauid='+syllauid+'&cuid='+cuid);
            });
            $('.live').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                var that = this;
                if ($(this).hasClass('lived')) {
                    // showTips('直播已经创建，请进入App中进行直播~');
                    swal({
                        title: "直播已存在",
                        text: "请进入直播APP进行直播",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "下载APP",
                        cancelButtonText: "知道了",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    }, function(isConfirm){
                        if (isConfirm) location.href = 'http://statics.holdfun.cn/live/material/download.html';
                    });
                    return;
                }
                if ($(this).hasClass('none')) return;
                if ($(this).hasClass('jxt')) {
                    me.$dom = $(this);
                    var btime = formatDate(new Date().getTime()).split(' ')[0] + ' ' + $(that).parents('.infor-box').find('.class_time').html().split(' - ')[0] + ':00';
                    var etime = formatDate(new Date().getTime()).split(' ')[0] + ' ' + $(that).parents('.infor-box').find('.class_time').html().split(' - ')[1] + ':00';
                    var delayBtime = formatDate(new Date(btime).getTime() - me.zhiboDelay * 60 * 1000);
                    
                    getResult("teacher/live/add", {
                        oid: openid,
                        eduid: eduData[getQueryString('kfrom')].uid,
                        syuid: $(that).parents('.infor-box').attr('data-syllauid'),
                        can: encodeURIComponent($(that).parents('.infor-box').find('.course-infor p').html()),
                        st: delayBtime,
                        en: etime
                    }, "callBackCreateLiveHandler");
                    return;
                }
                if ($(this).hasClass('xzt') && $(this).attr('live-url') != '') {
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
    };

    W.callBackTecherCourseHandler = function(data) {
        if (data.result) {
            H.courseList.teacherInforFill(data);
        } else {
            showNewLoading($("body"),"今日暂无课程");
        }
    };

    W.callBackAdmCourseListHandler=function(data) {
        if (data.result) {
            H.courseList.adminInforFill(data);
        } else {
            showNewLoading($("body"),"今日暂无课程");
        }
    };

    W.callBackCreateLiveHandler = function(data) {
        if (data.code == 0) {
            // showTips('直播创建成功，请到APP中开始直播');
            swal({
                title: "直播创建成功",
                text: "请进入直播APP开始直播",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "下载APP",
                cancelButtonText: "知道了",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function(isConfirm){
                if (isConfirm) location.href = 'http://statics.holdfun.cn/live/material/download.html';
            });
            H.courseList.$dom.html('正在直播').addClass('lived');
        } else {
            showTips('直播创建失败，请重试');
        }
    };

    W.callBackMobileGetTypekHandler = function(data) {
        if (data.result) {
            H.courseList.dataLoad();
            bindOpendid(data);
        } else {
            showTips('登录态失效，请重新验证身份');
            setTimeout(function() {
                toUrl("../../register.html");
            }, 2500);
        }
    };

    H.courseList.init();
    H.jssdk.init('off');
})(Zepto);