H.index = {
    ts: null,
    stuid: getQueryString('stuid') || '',
    history: getQueryString('history') || false,
    init: function() {
        this.event();
        this.userGettypePort();
    },
    event: function() {
        var me = this;
        $('body').delegate('.subject p a', 'click', function(e) {
            e.preventDefault();
            if (me.history) {
                if (me.ts == 0) {
                    toUrl('review-history.html?cuid=' + $(this).attr('data-cuid') + '&cname=' + encodeURIComponent($(this).html()) + '&stuid=' + me.stuid);
                } else {
                    toUrl('review-history.html?cuid=' + $(this).attr('data-uid') + '&cname=' + encodeURIComponent($(this).html()) + '&stuid=' + me.stuid);
                }
            } else {
                toUrl('review-detail.html?uid=' + $(this).attr('data-uid') + '&pname=' + encodeURIComponent($(this).html()) + '&ts=' + me.ts + '&stuid=' + $(this).attr('data-stuid'));
            }
        }).delegate('.btn-history, .btn-historys', 'click', function(e) {
            e.preventDefault();
            toUrl('review-index.html?history=on&stuid=' + $(this).attr('data-stuid'));
        });
    },
    prepareCoursePort: function(data) {
        showLoading(null, '查询课程中...');
        getResult('prepare/course', {
            openid: openid,
            eduid: eduData[getQueryString('kfrom')].uid
        }, 'callBackPrepareCourseHandler');
    },
    prepareNewCoursePort: function(data) {
        var me = this;
        showLoading(null, '查询课程中...');
        if (this.history) {
            $('body').addClass('history');
            $('#re-index > h2').html('课后复习历史');
            $('#re-index > p').html('选择要查看的课程');
            if (me.ts == 1 || me.ts == 2) {
                getResult('prepare/newcourse', {
                    openid: openid,
                    eduid: eduData[getQueryString('kfrom')].uid
                }, 'callBackPrepareCourseHandler');
            } else {
                getResult('review/history/course/list', {
                    stuid: me.stuid
                }, 'callBackHistoryCourseListHandler');
            }
        } else {
            $('body').removeClass('history');
            getResult('prepare/newcourse', {
                openid: openid,
                eduid: eduData[getQueryString('kfrom')].uid
            }, 'callBackPrepareCourseHandler');
        }
    },
    fillCourseInfo: function(data) {
        for (var k = 0; k < data.length; k++) {
            $('.subject').append('<div class="userbox none"><p class="k-uname">' + data[k].stna + '</p><a href="javascript:void(0);" class="btn-history" data-stuid="' + data[k].stuid + '">复习历史</div>');
            for (var i = 0; i < data[k].couItems.length; i++) {
                $('.subject').append('<p><a href="#" data-stuid="' + data[k].stuid + '" data-uid="' + data[k].couItems[i].cuuid + '">' + data[k].couItems[i].cname + '</a></p>')
            };
        };
        if (data.length <= 1) {
            $('.userbox').addClass('none');
            $('.btn-historys').attr('data-stuid', data[0].stuid).removeClass('none');
        } else {
            $('.userbox').removeClass('none');
            $('.btn-historys').addClass('none');
        }
        // if (this.ts == 1 || this.ts == 2) {
        //     $('.btn-historys, .btn-history').addClass('none');
        //     $('#re-index > p').css('text-align', 'center');
        // }
    },
    fillHistoryCourseInfo: function(data) {
        for (var i = 0; i < data.length; i++) {
            $('.subject').append('<p><a href="#" data-cuid="' + data[i].cuid + '">' + data[i].cname + '</a></p>')
        };
    },
    userGettypePort: function() {
        getResultEdu("user/gettype", {
            openid: openid,
            eduid: eduData[getQueryString('kfrom')].uid
        }, "callBackMobileGetTypekHandler");
    }
};

W.callBackPrepareCourseHandler = function(data) {
    var me = H.index;
    if (data.stItems) {
        me.fillCourseInfo(data.stItems);
    } else {
        if (data.message)
            showNewLoading($('body'), data.message);
        else
            showNewLoading($('body'), '今日暂无课程');
    }
    hideLoading();
};

W.callBackHistoryCourseListHandler = function(data) {
    var me = H.index;
    if (data.item) {
        me.fillHistoryCourseInfo(data.item);
    } else {
        if (data.message)
            showNewLoading($('body'), data.message);
        else
            showNewLoading($('body'), '没有复习历史记录');
    }
    hideLoading();
};

W.callBackMobileGetTypekHandler = function(data) {
    var me = H.index;
    if (data.result) {
        me.ts = data.type;
        me.prepareNewCoursePort();
        bindOpendid(data);
    } else {
        toUrl("../../infor/register.html?ref=review");
    }
};

$(function() {
    H.jssdk.init('off');
    H.index.init();
});