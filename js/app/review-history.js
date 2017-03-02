H.index = {
    ts: null,
    ruid: null,
    cuid: getQueryString('cuid') || '',
    cname: getQueryString('cname') || '',
    stuid: getQueryString('stuid') || '',
    init: function() {
        this.event();
        this.safeKeyLost();
    },
    safeKeyLost: function() {
        if (!this.cname || !this.cuid || !this.stuid) {
            showNewLoading($('body'), '关键参数丢失，3秒后返回复习首页');
            $('#re-history').addClass('none');
            setTimeout(function() {
                toUrl('review-index.html');
            }, 3e3);
        } else {
            this.userGettypePort();
        }
    },
    event: function() {
        var me = this;
        $('body').delegate('.btn-list', 'click', function(e) {
            e.preventDefault();
            if (me.ts == 0) {
                toUrl('review-list.html?froms=history&uid=' + me.ruid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.cname) + '&ruid=' + $(this).attr('data-ruid'));
            } else {
                toUrl('review-list.html?froms=history&uid=' + me.ruid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.cname) + '&ruid=' + $(this).attr('data-ruid'));
            }
        });
    },
    userGettypePort: function() {
        showLoading(null, '请稍等...');
        getResultEdu("user/gettype", {
            openid: openid,
            eduid: eduData[getQueryString('kfrom')].uid
        }, "callBackMobileGetTypekHandler");
    },
    reviewListPort: function() {
        getResult('review/history/info/list', {
            cuid: this.cuid
        }, 'callBackHistoryReviewListHandler');
    },
    fillHistoryInfo: function(data) {
        var tpl = '', items = data.item;
        if (this.cname) $('#re-history .hname').html(this.cname);
        if (data.cn) $('h6').removeClass('none').find('label').html(data.cn);
        if (data.cuid) this.ruid = data.cuid;
        for (var i = 0; i < items.length; i++) {
            // tpl += '<a href="#" class="btn-list" data-ruid="' + items[i].ruid + '"><label class="cname">课时' + items[i].period +( items[i].title ? ('：' + items[i].title) : '') + '</label><label class="ctime">' + items[i].time.split(' ')[0] + '</label></a>';
            tpl += '<a href="#" class="btn-list" data-ruid="' + items[i].ruid + '"><label class="cname">课时' + items[i].period + '</label><label class="ctime">' + items[i].time.split(' ')[0] + '</label></a>';
        };
        $('.detail').html(tpl);
    }
};

W.callBackMobileGetTypekHandler = function(data) {
    var me = H.index;
    if (data.result) {
        me.ts = data.type;
        me.reviewListPort();
        bindOpendid(data);
    } else {
        toUrl("../../infor/register.html?ref=review");
    }
};

W.callBackHistoryReviewListHandler = function(data) {
    var me = H.index;
    if (data.code) {
        if (data.item.length != 0) {
            me.fillHistoryInfo(data);
        } else {
            $('#re-history').addClass('none');
            showNewLoading($('body'), me.cname + '课程没有复习题');
        }
    } else {
        $('#re-history').addClass('none');
        showNewLoading($('body'), me.cname + '课程没有复习题');
    }
    hideLoading();
};

$(function() {
    H.jssdk.init('off');
    H.index.init();
});