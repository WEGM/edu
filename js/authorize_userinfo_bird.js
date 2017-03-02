;(function(w) {
    w.mpAppid = typeof(eduData[getQueryString("kfrom")]) == 'undefined' ? '' : (eduData[getQueryString("kfrom")].appid || '');
    // 测试教师oi
    // w.edu_openid = 'o0ZrSv1Slw7AMoIgXTEmh0nZ9oR4';
    // w.openid = 'o0ZrSv1Slw7AMoIgXTEmh0nZ9oR4';
    // 测试学生oi
    // w.edu_openid = 'o0ZrSv_bFnYRxomGy0zS1VBWPQoE';
    // w.openid = 'o0ZrSv_bFnYRxomGy0zS1VBWPQoE';


    // 教师oi
    // w.edu_openid = 'o0ZrSv-wtBOcqgmpZqA8LEcoMbMo';
    // w.openid = 'o0ZrSv-wtBOcqgmpZqA8LEcoMbMo';
    // 学生oi
    // w.edu_openid = 'o0ZrSv5hcu4KD4u8qs6ljDUPIu4k';
    // w.openid = 'o0ZrSv5hcu4KD4u8qs6ljDUPIu4k';

    
    w.edu_openid = $.fn.cookie(mpAppid + '_eduMP2017_openid');
    w.openid = $.fn.cookie(wxAppid + '_eduK2017_openid');
    w.expires_in = {
        expires: 5
    };

    w.Authorize = function(o) {
        this.param = "";
        this.callBackPage = o && o.callBackPage || "";
    };

    Authorize.prototype.authorize = function(fn) {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + wxAppid + "&redirect_uri=" + encodeURIComponent(redirect_uri + "base?callBackPage=" + this.callBackPage + "&param=" + this.param) + "&response_type=code&scope=snsapi_base&state=" + wxAppid + "#wechat_redirect";
        if (fn) fn();
    };

    Authorize.prototype.init = function(fn) {
        var that = this;
        this.getParam();
        if (!openid) {
            openid = getQueryString("oid");
            if (!openid) {
                that.authorize();
            } else {
                openid && $.fn.cookie(wxAppid + '_eduK2017_openid', openid, expires_in);
                if (fn) setTimeout(function() {
                    fn()
                }, 200);
            }
        } else {
            $.fn.cookie(wxAppid + '_eduK2017_openid', openid, expires_in);
            if (fn) setTimeout(function() {
                fn()
            }, 200);
        }
    };

    Authorize.prototype.getParam = function() {
        var jsonobj = {},
            authURL = decodeURIComponent(location.search.slice(1)).split('&');
        for (var i = 0, l = authURL.length, items; i < l; i++) {
            items = authURL[i].split('=');
            jsonobj[items[0]] = items[1];
        };
        this.param = encodeURIComponent(JSON.stringify(jsonobj));
    };

    var authMP = function() {
        if (mpAppid) {
            new AuthorizeMP({
                callBackPage: callBackPage.replace('oid', 'k_oid')
            }).init();
        }
    };

    w.AuthorizeMP = function(o) {
        this.param = "";
        this.callBackPage = o && o.callBackPage || "";
    };

    AuthorizeMP.prototype.authorizemp = function() {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + mpAppid + "&redirect_uri=" + encodeURIComponent(business_url + "mp/auth/snsapi_base?callBackPage=" + this.callBackPage + "&param=" + this.param) + "&response_type=code&scope=snsapi_base&state=" + mpAppid + "#wechat_redirect";
    };

    AuthorizeMP.prototype.init = function() {
        var that = this;
        this.getParam();
        if (!edu_openid) {
            if (openid) {
                edu_openid = getQueryString("oid");
                edu_openid && $.fn.cookie(mpAppid + '_eduMP2017_openid', edu_openid, expires_in);
            } else {
                that.authorizemp();
            }
        } else {
            $.fn.cookie(mpAppid + '_eduMP2017_openid', edu_openid, expires_in);
        }
    };

    AuthorizeMP.prototype.getParam = function() {
        var jsonobj = {},
            authURL = decodeURIComponent(location.search.slice(1)).split('&');
        for (var i = 0, l = authURL.length, items; i < l; i++) {
            items = authURL[i].split('=');
            jsonobj[items[0]] = items[1];
        };
        this.param = encodeURIComponent(JSON.stringify(jsonobj));
    };

    var shareCode = $('body').attr('data-sc'),
        targetUrl = location.pathname.split('/')[location.pathname.split('/').length - 1];
    if (shareCode && shareCode.indexOf('.htm') >= 0 && targetUrl.indexOf('.htm') >= 0)
        var callBackPage = location.href.split('#')[0].split('?')[0].replace(targetUrl, shareCode);
    else
        var callBackPage = location.href.split('#')[0].split('?')[0];
    new Authorize({
        callBackPage: callBackPage
    }).init(authMP());
})(window);