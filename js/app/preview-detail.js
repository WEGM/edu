H.index = {
    ts: getQueryString('ts') || '',
    uid: getQueryString('uid') || '',
    stuid: getQueryString('stuid') || '',
    pname: getQueryString('pname') || '',
    puid: '',
    init: function() {
        this.event();
        this.safeKeyLost();
    },
    safeKeyLost: function() {
        if (!this.uid || !this.stuid) {
            $('#pre-detail').addClass('none');
            showNewLoading($('body'), '关键参数丢失，3秒后返回上一页');
            setTimeout(function() {
                toUrl('preview-index.html');
            }, 3e3);
        } else {
            this.userGettypePort();
        }
    },
    event: function() {
        var me = this;
        $('.btn-list').click(function(e) {
            e.preventDefault();
            toUrl('preview-list.html?uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&puid=' + $(this).attr('data-puid') + '&ts=' + me.ts);
        });
        $('.btn-edit').click(function(e) {
            e.preventDefault();
            toUrl('preview-edit.html?uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&ts=' + me.ts);
        });
        $('.btn-back').click(function(e) {
            e.preventDefault();
            toUrl('preview-index.html');
        });
    },
    userGettypePort: function() {
        showLoading(null, '请稍等...');
        getResultEdu("user/gettype", {
            openid: openid,
            eduid: eduData[getQueryString('kfrom')].uid
        }, "callBackMobileGetTypekHandler");
    },
    prepareInfoPort: function(data) {
        getResult('prepare/info/list', {
            cuid: this.uid
        }, 'callBackprepareInfoListHandler');
    },
    prepareRecordAddPort: function() {
        getResult('prepare/record/add', {
            eduUuid: eduData[getQueryString('kfrom')].uid,
            studentUuid: this.stuid,
            prepareUuid: this.puid
        }, 'callBackprepareRecordAddHandler');
    },
    fillItemInfo: function(data) {
        var me = this;
        if (me.pname) $('h6').removeClass('none').find('label').html(me.pname);
        if (data.per) $('h3').removeClass('none').find('label').html(data.per);
        if (data.des) $('.content').html(data.des).removeClass('none');
        if (data.vi) $('.content').after('<video x-webkit-airplay="true" webkit-playsinline="yes" id="video" class="video video-js vjs-default-skin" controls preload="auto" data-setup="{}"><source src="' + data.vi + '" type="video/mp4" /></video>');
        if (data.puid) {
            me.puid = data.puid;
            $('.btn-list').attr('data-puid', data.puid).removeClass('none');
        }
        if (me.ts == 1 || me.ts == 2) {
            $('.btn-edit').removeClass('none');
        } else {
            $('.btn-edit').remove();
            $('.btn-back').removeClass('none');
            me.prepareRecordAddPort();
        }
    }
};

W.callBackMobileGetTypekHandler = function(data) {
    var me = H.index;
    if (data.result) {
        if (!me.ts) me.ts = data.type;
        me.prepareInfoPort();
        bindOpendid(data);
    } else {
        toUrl("../../infor/register.html?ref=preview");
    }
};

W.callBackprepareInfoListHandler = function(data) {
    var me = H.index;
    if (data.result) {
        me.fillItemInfo(data);
        hideLoading();
    } else {
        if (me.ts == 1 || me.ts == 2) {
            toUrl('preview-edit.html?uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&ts=' + me.ts);
        } else {
            showNewLoading($('body'), '“' + me.pname + '”暂时没有预习题');
            hideLoading();
        }
    }
};

W.callBackprepareRecordAddHandler = function(data) {
    if (data.result && data.integral) {
        swal({
            title: "完成预习",
            text: '真棒，奖励 ' + data.integral + ' 金币',
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "我知道了",
            closeOnConfirm: true,
            closeOnCancel: true
        });
    }
};

$(function() {
    H.jssdk.init('off');
    H.index.init();
});