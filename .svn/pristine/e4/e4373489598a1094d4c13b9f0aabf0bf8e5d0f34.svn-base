(function($) {
    H.index = {
        acid: '',
        growNum: 0,
        shareUUID: getUrlParam('shareUUID'),
        init: function() {
            this.event();
            this.checkUser();
            this.grassActivityPort();
            this.wxShare();
        },
        event: function() {
            var me = this;
            $('.btn-help').click(function(e) {
                e.preventDefault();
                me.grassGrowPort();
            });

            $('.btn-join').click(function(e) {
                e.preventDefault();
                toUrl('grass-index.html');
            });

            $('.btn-ok').click(function(e) {
                e.preventDefault();
                $('#pop-help').addClass('none');
            });

            $('.btn-share').click(function(e) {
                e.preventDefault();
                me.wxShare();
                $('#pop-help').addClass('none');
                $('#pop-share').removeClass('none');
            });

            $('#pop-share').click(function(e) {
                e.preventDefault();
                $('#pop-share').addClass('none');
            });

            $('.btn-submit').click(function(e) {
                e.preventDefault();
                $('#pop-share').removeClass('none');
            });

            $('.rule h4').click(function(e) {
                e.preventDefault();
                if ($('.rule').hasClass('on'))
                    $('.rule').removeClass('on');
                else
                    $('.rule').addClass('on');
            });
        },
        checkUser: function() {
            if (this.shareUUID == '') toUrl('grass-index.html');
            if (openid == this.shareUUID)
                $('body').addClass('my');
            else
                $('body').removeClass('my');
        },
        grassActivityPort: function(data) {
            showLoading(null, '信息查询中...');
            getResult('grass/activity', {}, 'callbackActivityInfoHandler');
        },
        grassAccountInfoPort: function() {
            getResult('grass/accountInfo', {
                acid: this.acid,
                oi: this.shareUUID
            }, 'callBackQueryAccountInfoHandler');
        },
        grassRecordPort: function() {
            getResult('grass/record', {
                acid: this.acid,
                oi: this.shareUUID
            }, 'callBackGrassRecordHandler');
        },
        grassRankPort: function(number) {
            getResult('grass/rank', {
                acid: this.acid,
                number: number ? number : 20
            }, 'callBackRankGrassHandler');
        },
        grassDetailPort: function(number) {
            getResult('grass/detail', {
                acid: this.acid
            }, 'callbackQueryActivityHandler');
        },
        grassGrowPort: function() {
            showLoading(null, '请稍等...');
            getResult('grass/grow', {
                acid: this.acid,
                oi: this.shareUUID,
                com_oi: openid,
                ni: encodeURIComponent(nickname ? nickname : '乐宁学员'),
                im: headimgurl
            }, 'callbackgrowGrassHandler');
        },
        fillGrassInfo: function(data) {
            var me = this;
            $('#pop-register').addClass('none');
            $('.register').addClass('none');
            $('.result').removeClass('none');
            if (data.message.cs) {
                $('.grassNum').text(data.message.cs);
                me.randomGrass(data.message.cs * 1);
            }
            if (data.message.my) $('.grassPrice').text(data.message.my);
            if (data.message.na) {
                shareData.desc = (data.message.na + '喊你帮TA种草赚学费啦~快来看看');
                $('.myname').text(data.message.na);
            }
            if (data.message.im) {
                shareData.imgUrl = data.message.im;
                $('.header .avatar').attr('src', data.message.im);
            }
        },
        fillRankList: function(data) {
            var list = data.message;
            if (list.length > 0) $('.all-rank i').addClass('none');
            for (var i = 0; i < list.length; i++) {
                $('.all-rank').append('<section class="list"><h5>' + (list[i].na ? list[i].na : '乐宁学员') + '</h5><p>收到了<label class="big-grass">' + list[i].cs + '</label>棵草，已获得学费<label>' + list[i].fe + '</label>元</p><img class="avatar" src="' + (list[i].im ? list[i].im : '../../images/avatar.jpg') + '"></section>')
            };
        },
        fillRecordList: function(data) {
            var list = data.message;
            if (list.length > 0) $('.my-rank i').addClass('none');
            for (var i = 0; i < list.length; i++) {
                $('.my-rank').append('<section class="list"><h5>' + (list[i].na ? list[i].na : '乐宁学员') + '</h5><p>帮你肿了一棵草，获得学费<label>' + list[i].fe + '</label>元</p><i>' + list[i].it + '</i><img class="avatar" src="' + (list[i].im ? list[i].im : '../../images/avatar.jpg') + '"></section>')
            };
        },
        wxShare: function() {
            shareData.link = shareUpdateUrl(location.href);
            shareData.title = '乐宁英语种草活动进行中~可以帮好友赚钱哦';
            H.jssdk.menuShare(shareData);
            H.jssdk.menuToFriend(shareData);
        },
        randomGrass: function(num) {
            if (!num) return;
            if (num > 30) num = 40;
            $('.grass i').remove();
            for (var i = 1; i <= num; i++) {
                var left = Math.ceil(Math.random() * ($('.grand').width() - 50));
                var bottom = 6 + Math.ceil(Math.random() * $('.grand').height() / 2);
                var width = 20 + Math.ceil(Math.random() * 12);
                $("<i><img src='../../images/grass.png'></i>").css({
                    'left': left,
                    'bottom': bottom,
                    'width': width + '%'
                }).appendTo('.grass');
            };
        }
    };

    W.callbackActivityInfoHandler = function(data) {
        if (data.result) {
            H.index.acid = data.acid;
            if (data.ta == 1) {
                hideLoading();
                $('body').addClass('key-none');
                if (data.st)
                    showTips('活动将在' + data.st + '开始');
                else
                    showTips('活动未开始');
            } else if (data.ta == 3) {
                H.index.grassAccountInfoPort();
                H.index.grassRankPort(50);
                H.index.grassRecordPort();
                H.index.grassDetailPort();
            } else {
                hideLoading();
                $('body').addClass('key-none');
                $('#pop-end').removeClass('none');
            }
        } else {
            hideLoading();
            $('body').addClass('key-none');
            $('#pop-end').removeClass('none');
        }
    };

    W.callBackQueryAccountInfoHandler = function(data) {
        var me = H.index;
        if (data.result) {
            me.fillGrassInfo(data);
        }
        hideLoading();
    };

    W.callbackgrowGrassHandler = function(data) {
        var me = H.index;
        if (data.result) {
            $('#pop-help').removeClass('none').find('.help-content').attr('id', 'ok');
            if (data.cs) {
                $('.grassNum').text(data.cs);
                me.randomGrass(data.cs * 1);
            }
            if (data.my) $('.grassPrice').text(data.my);
        } else {
            $('#pop-help').removeClass('none').find('.help-content').attr('id', 'error');
        }
        hideLoading();
    };

    W.callBackRankGrassHandler = function(data) {
        var me = H.index;
        if (data.result)
            me.fillRankList(data);
    };

    W.callBackGrassRecordHandler = function(data) {
        var me = H.index;
        if (data.result)
            me.fillRecordList(data);
    };

    W.callbackQueryActivityHandler = function(data) {
        if (data.result) {
            if (data.message)
                $('.rule').removeClass('none').find('p').html(data.message);
            else
                $('.rule').addClass('none');
        }
    };
})(Zepto);

$(function() {
    H.jssdk.init();
    H.index.init();
});