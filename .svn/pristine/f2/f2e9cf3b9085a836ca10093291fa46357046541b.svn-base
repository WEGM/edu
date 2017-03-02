;(function(w) {
    w.mpAppid = typeof(eduData[getQueryString("kfrom")]) == 'undefined' ? '' : (eduData[getQueryString("kfrom")].appid || '');
    w.openid = $.fn.cookie(wxAppid + '_2017_oid');
    w.headimgurl = $.fn.cookie(wxAppid + '_2017_him');
    w.nickname = $.fn.cookie(wxAppid + '_2017_nnm');
    w.expires_in = {expires: 7};
    w.Authorize = function(o) {
        this.wxAppid = o && o.wxAppid || wxAppid; //wxAppid
        this.scope = "snsapi_userinfo"; //scope
        this.redirect_uri = redirect_uri + 'userinfo';
        this.callBackPage = o && o.callBackPage || ""; //授权之后的回调页面
        this.param = ""; //微信的参数
    }
    Authorize.prototype.authorize = function(fn) {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.wxAppid + "&redirect_uri=" + encodeURIComponent(this.redirect_uri + "?callBackPage=" + this.callBackPage) + "&response_type=code&scope=" + this.scope + "&state=" + this.wxAppid + "#wechat_redirect";
        if (fn) {
            fn();
        }
    };
    Authorize.prototype.checkIsAuthorize = function() {
        if ($.fn.cookie(wxAppid + '_2017_oid')) {
            return true;
        } else {
            return false;
        }
    };
    Authorize.prototype.getQueryParam = function(name, href, noDecode) {
        if (!href) var href = location.href;
        var target = href.split('?');
        if (href.indexOf('?') >= 0) {
            var temp = '';
            for(var i = 1; i < target.length; i++) {
                if (i == 1) {
                    temp = target[i];
                } else {
                    temp = temp + '&' + target[i];
                }
            };
            var currentSearch = decodeURIComponent(temp);
            if (currentSearch != '') {
                var paras = currentSearch.split('&');
                for ( var i = 0, l = paras.length, items; i < l; i++ ) {
                    var ori = paras[i];
                    if (paras[i].indexOf('#') >= 0) {
                        paras[i] = paras[i].split('#')[0];
                    }
                    items = paras[i].split('=');
                    if ( items[0] === name) return items[1];
                };
                return '';
            } else {
                return '';
            }
        } else {
            return '';
        }
    };
    Authorize.prototype.jumpToUrl = function() {
        if (this.callBackPage) {
            window.location.href = this.callBackPage;
        }
    };
    Authorize.prototype.getParam = function() {
        var jsonobj = {};
        var currentSearch = decodeURIComponent(location.search.slice(1)).split('&');

        for (var i = 0, l = currentSearch.length, items; i < l; i++) {
            items = currentSearch[i].split('=');
            jsonobj[items[0]] = items[1];
        }
        this.param = encodeURIComponent(JSON.stringify(jsonobj));
    };
    Authorize.prototype.init = function(fn) {
        this.getParam();
        var that = this;
        if (!openid || !nickname) {
            openid = that.getQueryParam("oid");
            openid && $.fn.cookie(wxAppid + '_2017_oid', openid, expires_in);
            if (!openid) {
                that.authorize(function() {});
            }
        } else {
            $.fn.cookie(wxAppid + '_2017_oid', openid, expires_in);
            if (fn) {
                setTimeout(function() {
                    fn();
                }, 50);
            }
        }
        if (!headimgurl) {
            headimgurl = that.getQueryParam("him");
            headimgurl && $.fn.cookie(wxAppid + '_2017_him', headimgurl, expires_in);
        } else {
            $.fn.cookie(wxAppid + '_2017_him', headimgurl, expires_in);
        }
        if (!nickname) {
            nickname = that.getQueryParam("nnm");
            nickname && $.fn.cookie(wxAppid + '_2017_nnm', nickname, expires_in);
        } else {
            $.fn.cookie(wxAppid + '_2017_nnm', nickname, expires_in);
        }
    }

    // data-sc 在body元素中的授权标识，进行授权使用，存在2种授权情况
    // @ data-sc 不存在 本页面授权后跳回到当前页面
    // @ data-sc == 'x.html'  跳转到指定页面（需注意页面上下级关系，使用../..表明文件层级，否则会出现404）
    var shareCode = $('body').attr('data-sc'),
        targetUrl = location.pathname.split('/')[location.pathname.split('/').length - 1];
    if (shareCode && shareCode.indexOf('.htm') >= 0 && targetUrl.indexOf('.htm') >= 0)
        new Authorize({callBackPage: location.href.replace(targetUrl, shareCode)}).init();
    else
        new Authorize({callBackPage: location.href}).init();
})(window);