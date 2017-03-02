H.index = {
    ts: getQueryString('ts') || '',
    uid: getQueryString('uid') || '',
    per: getQueryString('per') || '',
    ruid: getQueryString('ruid') || '',
    pname: getQueryString('pname') || '',
    stuid: getQueryString('stuid') || '',
    froms: getQueryString('froms') || '',
    init: function() {
        this.event();
        this.safeKeyLost();
    },
    safeKeyLost: function() {
        if (!this.uid || !this.ruid || !this.stuid) {
            showNewLoading($('body'), '关键参数丢失，3秒后返回复习首页');
            $('#re-list').addClass('none');
            setTimeout(function() {
                toUrl('review-index.html');
            }, 3e3);
        } else {
            this.userGettypePort();
        }
    },
    event: function() {
        var me = this, param = '';
        $(".btn-back").click(function(e) {
            e.preventDefault();
            window.history.back();
            // toUrl('review-detail.html?uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&ts=' + me.ts);
        });
        $('body').delegate('.btn-list', 'click', function(e) {
            e.preventDefault();
            var reuid = $(this).attr('data-reuid');
            var name = $(this).find('label').text();
            if (reuid) {
                if (me.froms == 'history') param = '&froms=history';
                toUrl('review-ac.html?uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&ts=' + me.ts + '&reuid=' + reuid + '&per=' + me.per + '&ruid=' + me.ruid + param);
            } else {
                showTips((name || '该同学') + '还未提交作业');
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
    reviewListPort: function(data) {
        getResult('review/record/list', {
            cuid: this.uid,
            ruid: this.ruid
        }, 'callBackreviewRecordListHandler');
    },
    fillRecordInfo: function(data) {
        var tpl = '',
            items = data.item,
            state = '';
        for (var i = 0; i < items.length; i++) {
            switch (items[i].state) {
                case 0:
                    state = 'al';
                    break;
                case 1:
                    state = 'ac';
                    break;
                default:
                    state = '';
            }
            tpl += '<a href="#" class="btn-list ' + state + '" data-reuid="' + (items[i].reuid || '') + '"><label>' + items[i].name + '</label></a>';
        };
        $('.detail').html(tpl);
        if (this.pname) $('h6').removeClass('none').find('label').html(this.pname);
    }
};

W.callBackMobileGetTypekHandler = function(data) {
    var me = H.index;
    if (data.result) {
        if (!me.ts) me.ts = data.type;
        me.reviewListPort();
        bindOpendid(data);
    } else {
        toUrl("../../infor/register.html?ref=review");
    }
};

W.callBackreviewRecordListHandler = function(data) {
    var me = H.index;
    if (data.result) {
        if (data.item.length != 0) {
            me.fillRecordInfo(data);
        } else {
            $('#re-list').addClass('none');
            showNewLoading($('body'), '“' + me.pname + '”课程未查询到学员');
        }
    } else {
        $('#re-list').addClass('none');
        showNewLoading($('body'), '“' + me.pname + '”课程未查询到学员');
    }
    hideLoading();
};

$(function() {
    H.jssdk.init('off');
    H.index.init();
});