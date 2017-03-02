H.index = {
    puid: getQueryString('puid'),
    cuid: getQueryString('cuid'),
    stuid: getQueryString('stuid'),
    userType: getQueryString('userType'),
    changeType: getQueryString('changeType'),
    userInfo: null,
    selectDOM: null,
    init: function() {
        this.event();
        this.userGettypePort();
    },
    boom: function() {
        if (/mall-list.html/i.test(location.href) || /mall-history.html/i.test(location.href)) {
            forEach($('.card'), function(item, i) {
                TweenMax.from(item, .6, {
                    alpha: 1,
                    x: "+=500",
                    delay: 0.3 + i * .08
                })
            });
            $('.cards').css('opacity', 1);
        }
        if (/mall-info.html/i.test(location.href)) {
            forEach($('.link'), function(item, i) {
                TweenMax.from(item, .6, {
                    alpha: 1,
                    x: "+=500",
                    delay: 0.3 + i * .08
                })
            });
            $('.content').css('opacity', 1);
        }
    },
    fillTitle: function() {
        var me = this;
        if (!/mall.html/i.test(location.href)) {
            if (me.userType) {
                var id = $('body > section').attr('id');
                if (me.userType == 'parent') {
                    $('body > section').addClass('parent');
                    switch (id) {
                        case 'nav':
                            $('h1').html('家长商城购物专区');
                            break;
                        case 'list':
                            if (me.changeType) {
                                $('h1').html('家长商城购物专区<p>' + me.changeType + '</p>');
                            } else {
                                $('h1').html('家长商城购物专区');
                            }
                            break;
                        case 'info':
                            $('h1').html('家长币详情');
                            break;
                    }
                } else {
                    $('body > section').addClass('student');
                    switch (id) {
                        case 'nav':
                            $('h1').html('学生商城购物专区');
                            break;
                        case 'list':
                            if (me.changeType) {
                                $('h1').html('学生商城购物专区<p>' + me.changeType + '</p>');
                            } else {
                                $('h1').html('学生商城购物专区');
                            }
                            break;
                        case 'info':
                            $('h1').html('学生币详情');
                            break;
                    }
                }
                $('h1').removeClass('none');
            } else {
                $('h1').addClass('none');
                $('#index h1').removeClass('none');
            }
        }
    },
    event: function() {
        var me = this;
        $('body').delegate('.area .btn-detailCoin', 'tap', function(e) {
            e.preventDefault();
            if ($(this).parents('.area').hasClass('parent')) {
                showLoading(null,'跳转中，请稍等...');
                toUrl('mall-info.html?userType=parent&stuid=' + me.stuid);
            } else {
                showLoading(null,'跳转中，请稍等...');
                toUrl('mall-info.html?userType=student&stuid=' + me.stuid);
            }
        }).delegate('#nav .btn-cardDetail', 'tap', function(e) {
            e.preventDefault();
            if (me.userType == 'parent') {
                showLoading(null,'跳转中，请稍等...');
                toUrl('mall-list.html?userType=parent&changeType=' + $(this).attr('data-name') + '&puid=' + me.puid + '&cuid=' + $(this).attr('data-cuid') + '&stuid=' + me.stuid);
            } else {
                showLoading(null,'跳转中，请稍等...');
                toUrl('mall-list.html?userType=student&changeType=' + $(this).attr('data-name') + '&puid=' + me.puid + '&cuid=' + $(this).attr('data-cuid') + '&stuid=' + me.stuid);
            }
        }).delegate('.btn-list', 'tap', function(e) {
            e.preventDefault();
            if (me.userType == 'parent') {
                showLoading(null,'跳转中，请稍等...');
                toUrl('mall-history.html?userType=parent&stuid=' + me.stuid);
            } else {
                showLoading(null,'跳转中，请稍等...');
                toUrl('mall-history.html?userType=student&stuid=' + me.stuid);
            }
        }).delegate('.btn-get', 'click', function(e) {
            e.preventDefault();
            var _this = this;
            if ($(_this).parents('.card').hasClass('out')) {
                showTips('该商品已兑完，下次来早点哦~');
                return;
            }
            swal({
                title: "兑换确认",
                text: "是否要兑换该商品？",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认兑换",
                cancelButtonText: "返回商城",
                closeOnConfirm: false,
                closeOnCancel: true,
                showLoaderOnConfirm: true
            }, function(){
                me.selectDOM = _this;
                getResult('mall/order/pay', {
                    guid: $(_this).parents('.card').attr('data-uuid'),
                    stuid: me.stuid
                }, 'callBackMallOrderPayHandler');
            });
        }).delegate('.user', 'tap', function(e) {
            e.preventDefault();
            me.stuid = $(this).attr('data-stuid');
            me.userInfo = JSON.parse(decodeURIComponent($(this).attr('data')));
            $('.user-choice').addClass('none');
            me.getMallPort();
        }).delegate('.info .coin', 'tap', function(e) {
            e.preventDefault();
            if (/mall.html/i.test(location.href)) return;
            if (me.userType == 'parent') {
                showLoading(null,'跳转中，请稍等...');
                toUrl('mall-info.html?userType=parent&stuid=' + me.stuid);
            } else {
                showLoading(null,'跳转中，请稍等...');
                toUrl('mall-info.html?userType=student&stuid=' + me.stuid);
            }
        }).delegate('#list .ci', 'tap', function(e) {
            e.preventDefault();
            $('#detail').removeClass('none');
            $('#detail img').attr('src', $(this).attr('data-bimg'));
            $('#detail p').text($(this).attr('data'));
            $('.detail-main h4').html($(this).siblings('h5').find('p').html());
            $('.detail-main h5').html($(this).parents('.card').attr('data-coin') + '金币');
            $('.detail-main h6 label').html($(this).attr('data-vali').replace('#','~'))
            $('.btn-dui').attr('uuid', $(this).parents('.card').attr('data-uuid'));
            $('body').attr('style', 'overflow: hidden');
        }).delegate('.buy-wrap .btn-close', 'tap', function(e) {
            e.preventDefault();
            $('#detail').addClass('none').find('p').html('');
            $('.btn-dui').removeAttr('uuid');
            $('body').removeAttr('style');
        }).delegate('.buy-wrap .btn-dui', 'click', function(e) {
            e.preventDefault();
            $('.list_' + $(this).attr('uuid')).find('.btn-get').trigger('click');
        });
        // $('#index').delegate('.area .list', 'click', function(e) {
        //     e.preventDefault();
        //     if ($(this).parents('.area').hasClass('parent')) {
            // showLoading(null,'跳转中，请稍等...');
        //         toUrl('mall-nav.html?userType=parent&puid=' + $(this).attr('data-puid') + '&stuid=' + me.stuid);
        //     } else {
            // showLoading(null,'跳转中，请稍等...');
        //         toUrl('mall-nav.html?userType=student&puid=' + $(this).attr('data-puid') + '&stuid=' + me.stuid);
        //     }
        // });
    },
    userGettypePort: function() {
        getResultEdu("user/gettype", {
            openid: openid,
            eduid: eduData[getQueryString('kfrom')].uid
        }, "callBackMobileGetTypekHandler");
    },
    multiUserPort: function() {
        if (this.stuid && this.userInfo) {
            this.getMallPort();
        } else {
            getResult('integral/info', {
                eduUuid: eduData[getQueryString('kfrom')].uid,
                openid: openid
            }, 'callBackIntegralInfoHandler');
        }
    },
    getMallPort: function() {
        var me = this;
        if (/mall.html/i.test(location.href)) {
            if (me.stuid) {
                getResult('mall/categorys/list', {
                    eduUuid: eduData[getQueryString('kfrom')].uid,
                    stuid: me.stuid
                }, 'callBackMallCategorysListHandler');
            } else {
                me.keyLost();
            }
        } else if (/mall-nav.html/i.test(location.href)) {
            if (me.stuid && me.puid) {
                getResult('mall/categorys/list', {
                    eduUuid: eduData[getQueryString('kfrom')].uid,
                    stuid: me.stuid
                }, 'callBackMallCategorysListHandler');
            } else {
                me.keyLost();
            }
        } else if (/mall-list.html/i.test(location.href)) {
            if (me.stuid && me.puid && me.cuid) {
                getResult('mall/goods/list', {
                    eduid: eduData[getQueryString('kfrom')].uid,
                    category: me.puid + ',' + me.cuid
                }, 'callBackMallGoodsListHandler');
            } else {
                me.keyLost();
            }
        } else if (/mall-history.html/i.test(location.href)) {
            if (me.stuid) {
                getResult('mall/order/record', {
                    stuid: me.stuid,
                    type: me.userType == 'student' ? 1 : 2
                }, 'callBackMallOrderRecordHandler');
            } else {
                me.keyLost();
            }
        } else if (/mall-info.html/i.test(location.href)) {
            if (me.stuid) {
                getResult('integral/record', {
                    stuid: me.stuid,
                    type: me.userType == 'student' ? 1 : 2
                }, 'callBackIntegralRecordHandler');
            } else {
                me.keyLost();
            }
        }
    },
    keyLost: function() {
        swal({
            title: "数据加载失败",
            text: "由于网络波动造成数据丢失，请重试",
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "返回上一页",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) history.back(-1);
        });
    },
    fillCoin: function() {
        $('.parent .coin').html(this.userInfo.parcou || 0);
        $('.student .coin').html(this.userInfo.stucou || 0);
    },
    fillCate: function(data) {
        var me = this,
            t = simpleTpl(),
            items = data,
            type = '',
            title = '';
        for (var i = 0; i < items.length; i++) {
            if (items[i].childs.length > 0) {
                if (items[i].type == 1) {
                    type = ' student';
                    title = '学生币';
                } else {
                    type = ' parent';
                    title = '家长币';
                }
                t._('<section class="area' + type + '">')
                    ._('<a href="javascript:void(0);" class="btn-detailCoin">' + title + '详情 &gt;</a>')
                    ._('<section class="list" data-puid="' + items[i].puid + '">')
                    ._('<img src="' + items[i].pimg + '">')
                    ._('<section class="info">')
                    ._('<p class="title">我的乐宁' + title + '</p>')
                    ._('<p class="coin"></p>')
                    ._('</section>')
                    ._('</section>')
                    ._('</section>')
            }
        };
        $('.content').html(t.toString());
        me.fillCoin();
        me.indexEvent();
    },
    indexEvent: function() {
        var me = this;
        $('.area .list').click(function(e){
            e.preventDefault();
            if (openid == 'o0ZrSvzOoKIXjKhdzzvGRh2VWc84') {
                if ($(this).parents('.area').hasClass('parent')) {
                    showLoading(null,'跳转中，请稍等...');
                    location.href = 'http://edu.holdfun.cn/leningpgs/html/pages/' + 'mall-nav.html?kfrom=lening&kcode=524&userType=parent&puid=' + $(this).attr('data-puid') + '&stuid=' + me.stuid
                } else {
                    showLoading(null,'跳转中，请稍等...');
                    location.href = 'http://edu.holdfun.cn/leningpgs/html/pages/' + 'mall-nav.html?kfrom=lening&kcode=524&userType=student&puid=' + $(this).attr('data-puid') + '&stuid=' + me.stuid
                }
            } else {
                if ($(this).parents('.area').hasClass('parent')) {
                    showLoading(null,'跳转中，请稍等...');
                    toUrl('mall-nav.html?userType=parent&puid=' + $(this).attr('data-puid') + '&stuid=' + me.stuid);
                } else {
                    showLoading(null,'跳转中，请稍等...');
                    toUrl('mall-nav.html?userType=student&puid=' + $(this).attr('data-puid') + '&stuid=' + me.stuid);
                }
            }
        });
    },
    fillNav: function(data) {
        var me = this,
            items = data,
            item = '',
            t = simpleTpl();
        for (var i = 0; i < items.length; i++) {
            if (me.puid == items[i].puid) item = items[i].childs;
        };
        for (var j = 0; j < item.length; j++) {
            t._('<a data-name="' + (item[j].cname || '') + '" class="btn-cardDetail" href="javascript:void(0);" data-cuid="' + item[j].cuid + '">')
                ._('<img src="' + item[j].cimg + '">')
                ._('</a>')
        };
        $('.content').append(t.toString());
        me.fillCoin();
    },
    fillGoods: function(data) {
        var me = this,
            items = data,
            t = simpleTpl(),
            type = (this.userType == 'student' ? 1 : 2),
            outStatus = '',
            outWord = '',
            nowTimeStr = formatDate(new Date().getTime());
        for (var i = 0; i < items.length; i++) {
            if (items[i].vali) {
                var beginTimeStr = items[i].vali.split('#')[0] + ' 00:00:00',
                    endTimeStr = items[i].vali.split('#')[1] + ' 00:00:00';
                if (comptime(nowTimeStr, beginTimeStr) < 0 && comptime(nowTimeStr, endTimeStr) >= 0) {
                    if (type == items[i].type) {
                        if (items[i].left <= 0) {
                            outStatus = ' out';
                            outWord = '已兑完';
                        } else {
                            outStatus = '';
                            outWord = '立即兑换';
                        }
                        t._('<section class="card' + outStatus + ' list_' + items[i].uuid + '" data-uuid="' + items[i].uuid + '" data-coin="' + items[i].price + '" data-left="' + items[i].left + '">')
                            ._('<img src="../../images/cards.png">')
                            ._('<img class="ci" src="' + items[i].img + '" data="' + (items[i].des || '暂无内容') + '" data-vali="' + items[i].vali + '" data-bimg="' + (items[i].bimg || items[i].img) + '">')
                            ._('<h5><p>' + (items[i].name || '') + '</p><span>有效期：' + items[i].vali.replace('#','~') + '</span></h5>')
                            ._('<a href="javascript:void(0);" class="btn-get">' + outWord + '</a>')
                            ._('<i>' + items[i].price + '<span></span></i>')
                            ._('</section>')
                    }
                }
            }
        };
        if (t == '') {
            swal({
                title: "商品已兑完",
                text: "请到其它类目看看",
                type: "info",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "返回上一页",
                closeOnConfirm: false
            }, function(isConfirm) {
                if (isConfirm) history.back(-1);
            });
        } else {
            $('.cards').html(t.toString());
        }
        me.fillCoin();
        me.boom();
    },
    fillRecord: function(data) {
        var me = this,
            items = data,
            t = simpleTpl();
        for (var i = 0; i < items.length; i++) {
            t._('<section class="card' + (items[i].sta == 2 ? ' mask' : '') + '">')
                ._('<img src="../../images/cards.png">')
                ._('<img class="ci" src="' + items[i].gimg + '">')
                ._('<h5><p>' + (items[i].gn || '') + '</p><span>有效期：' + items[i].vali.replace('#','~') + '</span></h5>')
                ._('<i>' + items[i].pr + '<span></span></i>')
                ._('<h4>' + items[i].ot.split(' ')[0] + '</h4>')
            t._('</section>')
        };
        $('.cards').html(t.toString());
        me.fillCoin();
        me.boom();
    },
    fillInfo: function(data) {
        var me = this,
            items = data,
            t = simpleTpl(),
            type = (this.userType == 'student' ? 1 : 2);
        for (var i = 0; i < items.length; i++) {
            if (type == items[i].type) {
                t._('<section class="link">')
                    ._('<span class="l-name"><i style="background:url(' + items[i].img + ') no-repeat;background-size:100% 100%;"></i>' + (items[i].des ? items[i].des : (items[i].sna ? items[i].sna : '其它渠道')) + '</span>')
                    ._('<span class="l-num">' + (items[i].count || '---') + '</span>')
                    ._('<span class="l-time">' + (items[i].time.split(' ')[0] || '---') + '</span>')
                    ._('</section>')
            }
        };
        if (t == '') {
            showNewLoading(null, '还没有记录列表<br>马上去获取金币');
        } else {
            $('.content').html(t.toString());
        }
        me.fillCoin();
        me.boom();
    },
    userChoice: function(data) {
        var items = data,
            tpl = '',
            avatar = '';
        for (var i = 0; i < items.length; i++) {
            if (items[i].img) {
                avatar = items[i].img;
            } else {
                if (items[i].sex && items[i].sex == 1) {
                    avatar = '../../images/avatar-man.png';
                } else {
                    avatar = '../../images/avatar-woman.png';
                }
            }
            tpl += '<section data-stuid="' + items[i].suid + '" data="' + encodeURIComponent(JSON.stringify(items[i])) + '" class="user"><img src="' + avatar + '"><p class="name">' + items[i].sname + '</p></section>';
        };
        tpl = '<section class="user-choice"><section class="wrap"><h4>请先选择一个账号</h4>' + tpl + '</section></section>';
        $('body').append(tpl);
    }
};

W.callBackMobileGetTypekHandler = function(data) {
    var me = H.index;
    if (data.result) {
        if (data.type == 0) {
            me.ts = data.type;
            me.fillTitle();
            me.multiUserPort();
        } else {
            swal({
                title: "暂未开放",
                text: "（TOT）商城仅供学生及家长使用",
                showConfirmButton: false,
                type: "warning"
            });
        }
        bindOpendid(data);
    } else {
        swal({
            title: "您还未注册",
            text: "请注册后重新进入商城",
            type: "error",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "立即注册",
            cancelButtonText: "知道了",
            closeOnConfirm: false,
            closeOnCancel: true
        }, function(isConfirm) {
            if (isConfirm) toUrl("../../infor/register.html?ref=mall");
        });
    }
};

W.callBackIntegralInfoHandler = function(data) {
    var me = H.index;
    if (data.result) {
        if (data.items && data.items.length == 1) {
            me.userInfo = data.items[0];
            me.stuid = data.items[0].suid;
            me.getMallPort();
        } else if (data.items && data.items.length > 1) {
            if (me.stuid) {
                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].suid == me.stuid) me.userInfo = data.items[i];
                };
                me.getMallPort();
            } else {
                me.userChoice(data.items);
            }
        } else {
            swal({
                title: "还没有关联用户",
                text: "请咨询老师或刷新页面试试",
                showConfirmButton: false,
                type: "error"
            });
        }
    } else {
        swal({
            title: "用户信息不存在",
            text: "请咨询老师或刷新页面试试",
            showConfirmButton: false,
            type: "error"
        });
    }
};

W.callBackMallCategorysListHandler = function(data) {
    var me = H.index;
    if (data.result && data.parents) {
        if (/mall-nav.html/i.test(location.href)) {
            me.fillNav(data.parents);
        } else {
            me.fillCate(data.parents);
        }
    } else {
        showNewLoading(null, '类目下没有内容');
    }
};

W.callBackMallGoodsListHandler = function(data) {
    var me = H.index;
    if (data.result && data.items) {
        me.fillGoods(data.items);
    } else {
        swal({
            title: "商品已兑完",
            text: "请到其它类目看看",
            type: "info",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "返回上一页",
            closeOnConfirm: false
        }, function(isConfirm) {
            if (isConfirm) history.back(-1);
        });
    }
};

W.callBackMallOrderPayHandler = function(data) {
    var me = H.index;
    if (data.result) {
        var $dom = $(me.selectDOM).parents('.card'),
            needCoin = parseInt($dom.attr('data-coin')),
            myCoin = parseInt($('.info .coin').html()),
            left = parseInt($dom.attr('data-left'));
        $('.info .coin').html(myCoin - needCoin);
        swal({
            title: "恭喜您，兑换成功",
            text: "",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "继续兑换",
            closeOnConfirm: true,
        });
        if (left - 1 <= 0) {
            $dom.addClass('out').find('.btn-get').html('已兑完');
        } else {
            $dom.attr('data-left', left - 1);
        }
    } else {
        if (data.code) {
            if (data.code == 2 || data.code == 4) {
                swal({
                    title: "金币不足",
                    text: "获取更多金币再来兑换",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "获取金币",
                    cancelButtonText: "知道了",
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function(isConfirm) {
                    if (isConfirm) location.href = 'http://mp.weixin.qq.com/s?__biz=MzI5NzMxNTAzMw==&mid=2247483903&idx=1&sn=098cc6796fe4cd4c86f48061e44b761b&chksm=ecb7be49dbc0375f2fa5b1371ce9ad1c8052887f94e183438e5d6f13a871d5fe6791464e1aa3&scene=0#wechat_redirect';
                });
            } else {
                swal('兑换失败', '请重新兑换或刷新页面重试', 'error');
            }
        }
    }
    $('.cards').removeClass('loading');
    hideLoading();
};

W.callBackMallOrderRecordHandler = function(data) {
    var me = H.index;
    if (data.result && data.items) {
        $('.info').removeClass('none');
        me.fillRecord(data.items);
    } else {
        showNewLoading(null, '还没有兑换记录<br>马上去兑换吧');
    }
};

W.callBackIntegralRecordHandler = function(data) {
    var me = H.index;
    if (data.result && data.items) {
        var items = data.items.sort(function(a, b) {
            return timestamp(b.time) - timestamp(a.time)
        });
        me.fillInfo(items);
    } else {
        showNewLoading(null, '还没有金币记录<br>马上去获取吧');
    }
};

$(function() {
    H.jssdk.init('off');
    H.index.init();
});