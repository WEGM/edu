H.record = {
    maxRecord: parseInt($('.record-box').attr('max-record')) || 5,
    recordTime: parseInt($('.record-box').attr('record-time')) || 60,
    recordInitTimer: 15,
    recordInitFlag: null,
    recordDom: null,
    localId: null,
    serverIdList: [],
    countdownFlag: null,
    barFlag: null,
    init: function() {
        this.checkConfig();
        this.event();
        $('.recordNum').find('.max-num').html(this.maxRecord);
        $('.cur-num').html($('.record-list').length).parent('i').removeClass('none');
        confirm2();
    },
    checkConfig: function() {
        var me = H.record;
        if (H.jssdk.wxIsReady) {
            $('.record-box').removeClass('none');
            $('.btn-submit').removeClass('none');
            clearTimeout(me.recordInitFlag);
            me.recordInitFlag = null;
        } else {
            $('.record-box').addClass('none');
            if (me.recordInitTimer <= 0) {
                clearTimeout(me.recordInitFlag);
                me.recordInitFlag = null;
                // showTips('暂时不能使用录音功能，请稍后再试！');
                location.href = location.href;
            } else {
                me.recordInitFlag = setTimeout(function() {
                    me.recordInitTimer--;
                    // H.jssdk.init('off');
                    me.checkConfig();
                }, 1e3);
            }
        }
    },
    event: function() {
        var me = this;
        $('.addrecord').click(function(e) {
            e.preventDefault();
            if (me.checkPlayer()) {
                me.addPlayer();
            }
        });
        $('.record-lists').delegate('.btn-record', 'click', function(e) {
            e.preventDefault();
            me.recordDom = $(this).attr('data-id');
            me.startRecord();
        }).delegate('.btn-play', 'click', function(e) {
            e.preventDefault();
            if ($('.' + $(this).attr('data-id')).hasClass('playing')) {
                me.stopVoice();
            } else {
                if ($('.record-list').hasClass('playing')) {
                    showTips('还有正在播放的语音，请先停止');
                } else {
                    me.recordDom = $(this).attr('data-id');
                    me.playVoice();
                }
            }
        }).delegate('.btn-del', 'click', function(e) {
            e.preventDefault();
            me.recordDom = $(this).attr('data-id');
            me.stopVoice();
            $('.' + me.recordDom).remove();
            $('.cur-num').html($('.cur-num').text() * 1 - 1);
        }).delegate('.btn-ok', 'click', function(e) {
            e.preventDefault();
            me.recordDom = $(this).attr('data-id');
            clearInterval(me.countdownFlag);
            me.stopRecord();
        });
    },
    checkPlayer: function() {
        var me = this,
            len = $('.record-list').length;
        if (len != 0) {
            if (len >= me.maxRecord) {
                showTips('最大只能创建' + me.maxRecord + '个录音');
                return false;
            }
            if ($('.record-list').hasClass('ready')) {
                showTips('先录段语音吧');
                return false;
            }
            if ($('.record-list').hasClass('recording')) {
                showTips('请先将录音停止后再添加');
                return false;
            }
            if ($('.record-list').hasClass('playing')) {
                showTips('请先将播放停止后再添加');
                return false;
            }
            return true;
        }
        return true;
    },
    addPlayer: function() {
        var me = this,
            t = simpleTpl(),
            key = Math.sn(7);
        me.recordDom = key;
        $('.cur-num').html($('.record-list').length + 1).parent('i').removeClass('none');
        t._('<section class="record-list ready ' + key + '">')
            ._('<div class="record-wrapper">')
            ._('<p style="width:0%;"></p>')
            ._('</div>')
            ._('<div class="record-time">')
            ._('<p class="last-time">录音还剩<label>' + me.recordTime + '</label>秒</p>')
            ._('</div>')
            ._('<div class="record-btn">')
            ._('<a href="javascript:void(0);" class="btn btn-record" data-id="' + key + '">点我录音</a>')
            ._('<a href="javascript:void(0);" class="btn btn-play" data-id="' + key + '">播放</a>')
            ._('<a href="javascript:void(0);" class="btn btn-del" data-id="' + key + '">删除</a>')
            ._('<a href="javascript:void(0);" class="btn btn-ok" data-id="' + key + '">我录好了</a>')
            ._('</div>')
            ._('</section>')
        $('.record-lists').append(t.toString());
    },
    startRecord: function() {
        var me = this;
        if (me.localId) wx.stopVoice({
            localId: me.localId
        });
        wx.startRecord({
            success: function() {
                me.onVoiceRecordEnd();
                me.startProgress();
            },
            cancel: function() {
                alert('授权失败，请点击允许录音');
                location.href = location.href;
            },
            fail: function() {
                alert('录音失败，请重试');
                location.href = location.href;
            }
        });
    },
    stopRecord: function() {
        var me = this;
        wx.stopRecord({
            success: function(res) {
                me.localId = res.localId;
                me.uploadVoice();
            }
        });
    },
    onVoiceRecordEnd: function() {
        var me = this;
        wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function(res) {
                me.localId = res.localId;
                me.uploadVoice();
            }
        });
    },
    uploadVoice: function() {
        var me = this;
        showLoading(null, '正在保存录音，请稍等');
        wx.uploadVoice({
            localId: me.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 0, // 默认为1，显示进度提示
            success: function(res) {
                // alert(JSON.stringify(res));
                // me.serverIdList.push(res.serverId + ':0'); // 返回音频的服务器端ID
                $('.' + me.recordDom).removeClass('ready recording').addClass('recorded').attr({
                    'data-localId': me.localId,
                    'data-serverId': res.serverId
                });
                hideLoading();
            },
            fail: function() {
                me.uploadVoice();
            }
        });
    },
    playVoice: function() {
        var me = this;
        wx.playVoice({
            localId: $('.' + me.recordDom).attr('data-localId') // 需要播放的音频的本地ID，由stopRecord接口获得
        });
        me.onVoicePlayEnd();
        $('.' + me.recordDom).removeClass('ready recording').addClass('playing');
        $('.' + me.recordDom).find('.btn-play').html('停止');
    },
    pauseVoice: function() {
        var me = this;
        wx.pauseVoice({
            localId: $('.' + me.recordDom).attr('data-localId') // 需要暂停的音频的本地ID，由stopRecord接口获得
        });
        $('.' + me.recordDom).removeClass('playing');
        $('.' + me.recordDom).find('.btn-play').html('播放');
    },
    stopVoice: function() {
        var me = this;
        wx.stopVoice({
            localId: $('.' + me.recordDom).attr('data-localId') // 需要停止的音频的本地ID，由stopRecord接口获得
        });
        $('.' + me.recordDom).removeClass('playing');
        $('.' + me.recordDom).find('.btn-play').html('播放');
    },
    onVoicePlayEnd: function() {
        var me = this;
        wx.onVoicePlayEnd({
            success: function(res) {
                $('.' + me.recordDom).removeClass('playing');
                $('.' + me.recordDom).find('.btn-play').html('播放');
            }
        });
    },
    downloadVoice: function() {
        var me = this;
        wx.downloadVoice({
            serverId: '', // 需要下载的音频的服务器端ID，由uploadVoice接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
                var localId = res.localId; // 返回音频的本地ID
            }
        });
    },
    translateVoice: function() {
        var me = this;
        wx.translateVoice({
            localId: '', // 需要识别的音频的本地Id，由录音相关接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
                alert(res.translateResult); // 语音识别的结果
            }
        });
    },
    startProgress: function() {
        var me = this,
            barStep = (100 / me.recordTime).toFixed(2),
            timeStep = 1,
            i = 0;
        $('.' + me.recordDom).removeClass('ready').addClass('recording');
        if ($('.' + me.recordDom + ' .last-time label').text() > 0) {
            $('.' + me.recordDom + ' .record-wrapper p').css('width', ++i * barStep + '%');
            $('.' + me.recordDom + ' .last-time label').html($('.' + me.recordDom + ' .last-time label').text() * 1 - timeStep);
        } else {
            $('.' + me.recordDom + ' .last-time label').html('0');
            $('.' + me.recordDom + ' .record-wrapper p').css('width', '100%');
            clearInterval(me.countdownFlag);
            me.stopRecord();
        }
        me.countdownFlag = setInterval(function() {
            if ($('.' + me.recordDom + ' .last-time label').text() > 0) {
                $('.' + me.recordDom + ' .record-wrapper p').css('width', ++i * barStep + '%');
                $('.' + me.recordDom + ' .last-time label').html($('.' + me.recordDom + ' .last-time label').text() * 1 - timeStep);
            } else {
                $('.' + me.recordDom + ' .last-time label').html('0');
                $('.' + me.recordDom + ' .record-wrapper p').css('width', '100%');
                clearInterval(me.countdownFlag);
                me.stopRecord();
            }
        }, 1e3);
    },
    stopProgress: function() {

    }
};

H.index = {
    ts: getQueryString('ts') || '',
    uid: getQueryString('uid') || '',
    stuid: getQueryString('stuid') || '',
    pname: getQueryString('pname') || '',
    per: '',
    puid: '',
    ruid: '', //复习内容ID
    reuid: '', //复习记录ID
    init: function() {
        this.event();
        this.safeKeyLost();
    },
    safeKeyLost: function() {
        if (!this.uid || !this.stuid) {
            $('#pre-detail').addClass('none');
            showNewLoading($('body'), '关键参数丢失，3秒后返回上一页');
            setTimeout(function() {
                toUrl('review-index.html');
            }, 3e3);
        } else {
            this.userGettypePort();
        }
    },
    event: function() {
        var me = this;
        $('.btn-list').click(function(e) {
            e.preventDefault();
            toUrl('review-list.html?uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&ruid=' + me.ruid + '&ts=' + me.ts + '&per=' + me.per);
        });
        $('.btn-edit').click(function(e) {
            e.preventDefault();
            toUrl('review-edit.html?edit=update&uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&ts=' + me.ts);
        });
        $('.btn-add').click(function(e) {
            e.preventDefault();
            toUrl('review-edit.html?edit=add&uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&ts=' + me.ts);
        });
        $('.btn-back').click(function(e) {
            e.preventDefault();
            window.history.back();
            // toUrl('review-index.html');
        });
        $('.btn-see').click(function(e) {
            e.preventDefault();
            toUrl('review-ac.html?uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&ts=' + me.ts + '&reuid=' + me.reuid + '&ruid=' + me.ruid + '&per=' + me.per);
        });
        $('.btn-submit').click(function(e) {
            e.preventDefault();
            if ($('.recorded').length > 0) {
                me.reviewRecordAddPort();
            } else {
                $('.addrecord').trigger('click');
                showTips('先添加一条语音吧');
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
    reviewInfoPort: function(data) {
        getResult('review/info/list', {
            cuid: this.uid,
            stuid: this.stuid
        }, 'callBackreviewInfoListHandler');
    },
    reviewRecordDetailPort: function(reuid) {
        getResult('review/record/detail', {
            uuid: reuid
        }, 'callBackreviewRecordDetailHandler');
    },
    reviewRecordAddPort: function() {
        showLoading(null, '提交中...');
        H.record.serverIdList = [];
        $('.record-list').each(function(i, e) {
            if ($(this).attr('data-serverId')) H.record.serverIdList.push($(this).attr('data-serverId') + ':0');
        });
        getResult('review/record/add', {
            'eduUuid': eduData[getQueryString('kfrom')].uid,
            'studentUuid': this.stuid,
            'reviewUuid': this.ruid,
            'infoAudio': H.record.serverIdList.join(',')
        }, 'callBackreviewRecordAddHandler');
    },
    fillItemInfo: function(data) {
        var me = this;
        if (me.ts == 0) {
            if (data.reuid) {
                this.reuid = data.reuid;
                $('.btn-submit').remove();
                $('.btn-see').removeClass('none');
            } else {
                $('.btn-see').remove();
                H.record.init();
            }
            $('.btn-edit, .btn-add').remove();
        } else {
            $('.btn-see').remove();
            $('.btn-submit').remove();
            $('.record-box').remove();
            $('.btn-edit, .btn-add').removeClass('none');
        }
        // $('.btn-back').removeClass('none');
        if (data.cn) $('h6').removeClass('none').find('label').html(data.cn);
        if (data.per) {
            var title = '';
            me.per = data.per;
            // if (data.title) title = '：' + data.title;
            $('h3').removeClass('none').find('label').html(data.per + title);
        }
        if (data.des) $('.content').append('<p class="des">' + data.des + '</p>').removeClass('none');
        if (data.vi) $('.content').append('<video x-webkit-airplay="true" webkit-playsinline="yes" id="video" class="video video-js vjs-default-skin" controls preload="auto" data-setup="{}"><source src="' + data.vi + '" type="video/mp4" /></video>');

        if (data.ruid) {
            me.ruid = data.ruid;
            $('.btn-list').removeClass('none');
        }
    }
};

W.callBackMobileGetTypekHandler = function(data) {
    var me = H.index;
    if (data.result) {
        if (!me.ts) me.ts = data.type;
        me.reviewInfoPort();
        bindOpendid(data);
    } else {
        toUrl("../../infor/register.html?ref=review");
    }
};

W.callBackreviewInfoListHandler = function(data) {
    var me = H.index;
    if (data.result) {
        me.fillItemInfo(data);
        hideLoading();
    } else {
        if (me.ts == 1 || me.ts == 2) {
            toUrl('review-edit.html?edit=add&uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&ts=' + me.ts);
        } else {
            $('#re-detail').addClass('none');
            showNewLoading($('body'), '“' + me.pname + '”暂时没有复习题');
            hideLoading();
        }
    }
};

W.callBackreviewRecordDetailHandler = function(data) {};

W.callBackreviewRecordAddHandler = function(data) {
    var me = H.index,
        tips = '';
    if (data.result) {
        deConfirm2();
        if (data.integral)
            tips = '真棒，完成了复习。奖励 ' + data.integral + ' 金币';
        else
            tips = '';
        if (data.reuid) {
            swal({
                title: "提交成功",
                text: tips,
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "进入点评页",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) toUrl('review-ac.html?uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&ts=' + me.ts + '&reuid=' + data.reuid + '&ruid=' + me.ruid + '&per=' + me.per);
            });
        } else {
            swal({
                title: "提交成功",
                text: tips,
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "查看复习记录",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) toUrl('review-list.html?uid=' + me.uid + '&stuid=' + me.stuid + '&pname=' + encodeURIComponent(me.pname) + '&ruid=' + me.ruid + '&ts=' + me.ts + '&per=' + me.per);
            });
        }
    } else {
        showTips('提交失败，请重试！');
    }
    hideLoading();
};

$(function() {
    H.jssdk.init('off');
    H.index.init();
});