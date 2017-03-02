H.index = {
    ts: getQueryString('ts') || '',
    uid: getQueryString('uid') || '',
    puid: getQueryString('puid') || '',
    pname: getQueryString('pname') || '',
    stuid: getQueryString('stuid') || '',
    init: function() {
        this.event();
        this.safeKeyLost();
    },
    safeKeyLost: function() {
        if (!this.uid || !this.puid || !this.stuid) {
            showNewLoading($('body'), '关键参数丢失，3秒后返回预习首页');
            $('#pre-list').addClass('none');
            setTimeout(function() {
                toUrl('preview-index.html');
            }, 3e3);
        } else {
            this.userGettypePort();
        }
    },
    event: function() {
        var me = this;
        $(".btn-back").click(function(e) {
            e.preventDefault();
            toUrl('preview-detail.html?uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&ts=' + me.ts);
        });
    },
    userGettypePort: function() {
        showLoading(null, '请稍等...');
        getResultEdu("user/gettype", {
            openid: openid,
            eduid: eduData[getQueryString('kfrom')].uid
        }, "callBackMobileGetTypekHandler");
    },
    prepareListPort: function(data) {
        getResult('prepare/record/list', {
            cuid: this.uid,
            puid: this.puid
        }, 'callBackprepareRecordListHandler');
    },
    fillRecordInfo: function(data) {
        var tpl = '',
            items = data.item;
        for (var i = 0; i < items.length; i++) {
            tpl += '<a href="#" class="' + (items[i].state == 0 ? 'unpre' : '') + '"><label>' + items[i].name + '</label></a>';
        };
        $('.detail').html(tpl);
        if (this.pname) $('h6').removeClass('none').find('label').html(this.pname);
    }
};

W.callBackMobileGetTypekHandler = function(data) {
    var me = H.index;
    if (data.result) {
        if (!me.ts) me.ts = data.type;
        me.prepareListPort();
        bindOpendid(data);
    } else {
        toUrl("../../infor/register.html?ref=preview");
    }
};

W.callBackprepareRecordListHandler = function(data) {
    var me = H.index;
    if (data.result) {
        if (data.item.length != 0) {
            me.fillRecordInfo(data);
        } else {
            $('#pre-list').addClass('none');
            showNewLoading($('body'), '“' + me.pname + '”课程未查询到学员');
        }
    } else {
        $('#pre-list').addClass('none');
        showNewLoading($('body'), '“' + me.pname + '”课程未查询到学员');
    }
    hideLoading();
};

$(function() {
    H.jssdk.init('off');
    H.index.init();
});