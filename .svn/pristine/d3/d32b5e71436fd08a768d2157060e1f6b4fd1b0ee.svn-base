H.index = {
    ts: null,
    stuid: '',
    init: function() {
        this.event();
        this.userGettypePort();
    },
    event: function() {
        var me = this;
        $('body').delegate('.subject a', 'click', function(e) {
            e.preventDefault();
            toUrl('preview-detail.html?uid=' + $(this).attr('data-uid') + '&pname=' + encodeURIComponent($(this).html()) + '&ts=' + me.ts + '&stuid=' + $(this).attr('data-stuid'));
        });
    },
    // prepareCoursePort: function(data) {
    //     showLoading(null, '查询课程中...');
    //     getResult('prepare/course', {
    //         openid: openid,
    //         eduid: eduData[getQueryString('kfrom')].uid
    //     }, 'callBackPrepareCourseHandler');
    // },
    prepareNewCoursePort: function(data) {
        showLoading(null, '查询课程中...');
        getResult('prepare/newcourse', {
            openid: openid,
            eduid: eduData[getQueryString('kfrom')].uid
        }, 'callBackPrepareCourseHandler');
    },
    // fillCourseInfo: function(data) {
    //     var items = data;
    //     for (var i = 0; i < items.length; i++) {
    //         $('.subject').append('<p><a href="#" data-uid="' + items[i].cuuid + '">' + items[i].cname + '</a></p>')
    //     };
    // },
    fillCourseInfo: function(data) {
        for (var k = 0; k < data.length; k++) {
            $('.subject').append('<p class="k-uname">' + data[k].stna + '</p>');
            for (var i = 0; i < data[k].couItems.length; i++) {
                $('.subject').append('<p><a href="#" data-stuid="' + data[k].stuid + '" data-uid="' + data[k].couItems[i].cuuid + '">' + data[k].couItems[i].cname + '</a></p>')
            };
        };
        if (data.length <= 1) $('.k-uname').addClass('none');
    },
    userGettypePort: function() {
        getResultEdu("user/gettype", {
            openid: openid,
            eduid: eduData[getQueryString('kfrom')].uid
        }, "callBackMobileGetTypekHandler");
    }
};

// W.callBackPrepareCourseHandler = function(data) {
//     var me = H.index;
//     if (data.result) {
//         if (data.stuid) me.stuid = data.stuid;
//         if (data.items) me.fillCourseInfo(data.items);
//     } else {
//         if (data.message)
//             showNewLoading($('body'), data.message);
//         else
//             showNewLoading($('body'), '今日暂无课程');
//     }
//     hideLoading();
// };

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

W.callBackMobileGetTypekHandler = function(data) {
    var me = H.index;
    if (data.result) {
        me.ts = data.type;
        // me.prepareCoursePort();
        me.prepareNewCoursePort();
        bindOpendid(data);
    } else {
        toUrl("../../infor/register.html?ref=preview");
    }
    // alert('openid: ' + openid + '     Type: ' + JSON.stringify(data));
};

$(function() {
    H.jssdk.init('off');
    H.index.init();
});