var __ns = function(fullNs) {
    var nsArray = fullNs.split('.');
    var evalStr = '';
    var ns = '';
    for (var i = 0, l = nsArray.length; i < l; i++) {
        i !== 0 && (ns += '.');
        ns += nsArray[i];
        evalStr += '( typeof ' + ns + ' === "undefined" && (' + ns + ' = {}) );';
    }
    evalStr !== '' && eval(evalStr);
}
var __noop = function() {};
var W = W || window;
__ns('H');

var isWeixin = function() {
    return /MicroMessenger/i.test(navigator.userAgent);
};

function ReplaceAll(str, sptr, sptr1) {
    while (str.indexOf(sptr) >= 0) {
        str = str.replace(sptr, sptr1);
    };
    return str;
};

function forEach(obj, callback) {
    for (var i = 0; i < obj.length; i++) {
        var item = obj[i];
        callback.call(this, item, i);
    };
};

function xssEscape(str) {
    str = str.replace('&', '&amp;');
    str = str.replace('<', '&lt;');
    str = str.replace('>', '&gt;');
    str = str.replace('\"', '&quot;');
    return str;
};

function historyChange() { 
    var state = {
        title: "title",
        url: "#"
    }; 
    window.history.pushState(state, "title", "#");
};

function confirm2(url) {
    // historyChange();
    // window.addEventListener("popstate", function(e) {
    //     swal({
    //         title: "是否退出",
    //         text: "退出后未提交内容将不会保存",
    //         type: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#DD6B55",
    //         confirmButtonText: "确定退出",
    //         closeOnConfirm: false
    //     },
    //     function() {
    //         if (url)
    //             toUrl(url);
    //         else
    //             history.back(-1);  
    //     });
    // }, false);
};

function deConfirm2() {
    // window.removeEventListener("popstate", function(){}, false);
};

String.prototype.tofilter = function() {
    if (window.filterXSS) {
        return filterXSS(this);
    } else {
        return xssEscape(this);
    }
};

var comptime = function(beginTime, endTime) {
    var beginTimes = beginTime.substring(0, 10).split('-');
    var endTimes = endTime.substring(0, 10).split('-');
    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
    var a = (timestamp(endTime) - timestamp(beginTime)) / 3600 / 1000;
    if (a < 0) {
        return -1;
    } else if (a > 0) {
        return 1; //未开始
    } else if (a == 0) {
        return 0;
    } else {
        return -2
    }
};

var actTimeFlag = function(bTime, eTime) {  //0-未开始，1-正在进行，2-结束
    if (bTime && eTime) {
        var nowTime = formatDate(new Date().getTime());
        bTime = bTime.length == 13 ? formatDate(bTime) : bTime;
        eTime = eTime.length == 13 ? formatDate(eTime) : eTime;
        if (new Date(eTime).getTime() - new Date(bTime).getTime() >= 0) {
            if (comptime(eTime, nowTime) >= 0) return 2;
            if (comptime(nowTime, bTime) < 0 && comptime(nowTime, eTime) >= 0) return 1;
            if (comptime(nowTime, bTime) > 0) return 0;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

var CHARS = 'abcdefghijABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
Math.sn = function(len, radix) {
    var chars = CHARS,
        sn = [],
        i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++) sn[i] = chars[0 | Math.random() * radix];
    } else {
        var r;
        sn[8] = sn[13] = sn[18] = sn[23] = '-';
        sn[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!sn[i]) {
                r = 0 | Math.random() * 16;
                sn[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    var re = new RegExp("-", "g");
    return sn.join('').toLocaleLowerCase().replace(re, "");
};

var getUrlParam = function() {
    var jsonobj = {};
    var currentSearch = decodeURIComponent(location.search.slice(1)).split('&');

    for (var i = 0, l = currentSearch.length, items; i < l; i++) {
        items = currentSearch[i].split('=');
        jsonobj[items[0]] = items[1];
    };

    return encodeURIComponent(JSON.stringify(jsonobj)) || '';
};

var formatDate = function(stamp, format, zero) {
    var stamp = Number(stamp),
        date = new Date(stamp),
        formatDate,
        format = format ? format : "yyyy-mm-dd hh:ii:ss",
        zero = (zero === undefined) ? true : zero,
        dateNum = function(num) {
            return num < 10 ? '0' + num : num;
        },
        _d = zero ? dateNum : function(s) {
            return s;
        };
    var year = _d(date.getFullYear()),
        month = _d(date.getMonth() + 1),
        day = _d(date.getDate()),
        hour = _d(date.getHours()),
        minute = _d(date.getMinutes()),
        second = _d(date.getSeconds());
    formatDate = format.replace(/yyyy/i, year).replace(/mm/i, month).replace(/dd/i, day).replace(/hh/i, hour).replace(/ii/i, minute).replace(/ss/i, second);
    return formatDate;
};

var getQueryString = function(name) {
    var target = location.href.split('?');
    if (location.href.indexOf('?') >= 0) {
        var temp = '';
        for (var i = 1; i < target.length; i++) {
            if (i == 1) {
                temp = target[i];
            } else {
                temp = temp + '&' + target[i];
            }
        };
        var currentSearch = decodeURIComponent(temp);
        if (currentSearch != '') {
            var paras = currentSearch.split('&');
            for (var i = 0, l = paras.length, items; i < l; i++) {
                var ori = paras[i];
                if (paras[i].indexOf('#') >= 0) {
                    paras[i] = paras[i].split('#')[0];
                }
                items = paras[i].split('=');
                if (items[0] === name) return items[1];
            };
            return '';
        } else {
            return '';
        }
    } else {
        return '';
    }
};

var eduid = eduUuid = typeof(eduData[getQueryString("kfrom")]) == 'undefined' ? '' : (eduData[getQueryString("kfrom")].uid || '');

var simpleTpl = function(tpl) {
    tpl = $.isArray(tpl) ? tpl.join('') : (tpl || '');

    return {
        store: tpl,
        _: function() {
            var me = this;
            $.each(arguments, function(index, value) {
                me.store += value;
            });
            return this;
        },
        toString: function() {
            return this.store;
        }
    };
};

var str2date = function(str) {
    str = str.replace(/-/g, '/');
    return new Date(str);
};

var timestamp = function(str) {
    return Date.parse(str2date(str));
};

var timeGetMD = function(str) {
    var obj = {};
    var date = new Date();
    obj.sampleTime = str2date(str);
    obj.Year = obj.sampleTime.getFullYear() + "年";
    obj.Month = (obj.sampleTime.getMonth() + 1 >= 10) ? ((obj.sampleTime.getMonth() + 1) + "月") : ("0" + (obj.sampleTime.getMonth() + 1) + "月");
    obj.Day = (obj.sampleTime.getDate() >= 10) ? (obj.sampleTime.getDate() + "日") : ("0" + obj.sampleTime.getDate() + "日");
    return obj;
};

var dateformat = function(date, format) {
    var z = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
    };
    format = format.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2);
    });
    return format.replace(/(y+)/g, function(v) {
        return date.getFullYear().toString().slice(-v.length)
    });
};

var dateNum = function(num) {
    return num < 10 ? '0' + num : num;
};

// var showLoading = function($container, tips) {
//     var t = simpleTpl(),
//         spinnerSize = 146,
//         width = $(window).width(),
//         height = $(window).height(),
//         $container = $container || $('body'),
//         $spinner = $container ? $container.find('#spinner') : $('body').children('#spinner'),
//         tips = tips || '努力加载中...';
//     if ($spinner.length > 0) {
//         $spinner.remove();
//     };
//     t._('<div id="spinner" class="spinner">')
//         ._('<div class="new-spinner">')
//         ._('<div class="new-overlay"></div>')
//         ._('<div class="new-spinner-inner">')
//         ._('<p class="new-spinner-spinner"></p>')
//         ._('<p class="new-spinner-text">' + tips + '</p>')
//         ._('</div>')
//         ._('</div>')
//         ._('</div>')
//         ._('</div>');
//     $spinner = $(t.toString()).css({
//         'top': (height - spinnerSize) / 2,
//         'left': (width - spinnerSize) / 2
//     });
//     $container.append($spinner);
// };

var showLoading = function($container, tips) {
    var t = simpleTpl(),
        $container = $container || $('body'),
        $spinner = $container ? $container.find('#spinner') : $('body').children('#spinner'),
        tips = tips || '努力加载中...';
    if ($spinner.length > 0) $spinner.remove();

    t._('<section id="spinner" class="spinner" style="position: fixed;left: 0;top: 0;width: ' + $(window).width() + 'px;height: ' + $(window).height() + 'px;background: rgba(0,0,0,0.7);font-size: 12px;color: #f65e44;z-index: 999999;max-width: initial;">')
        ._('<section style="position: absolute;background: white;width: 50%;left: 25%;border-radius: 5px;top: 30%;text-align: center;padding: 20px 0;">')
            ._('<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">')
                ._('<path fill="#f64d30" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(90.0003 25 25)">')
                    ._('<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.4s" repeatCount="indefinite">')
                    ._('</animateTransform>')
                ._('</path>')
            ._('</svg>')
            ._('<label style="display: block;color: #999999;font-size: 12px;padding-top: 10px;">' + tips + '</label>')
        ._('</section>')
    ._('</section>')

    $container.append(t.toString());
};

var bindOpendid = function(data) {
    if (edu_openid && data && data.type == 0 && !data.eduoid) {
        $.ajax({
            type : 'GET',
            async : false,
            url : business_url + 'user/addeduoid',
            data: {
                'openid': openid,
                'eduid': eduData[getQueryString('kfrom')].uid,
                'eduopenid': edu_openid
            },
            dataType : "jsonp",
            jsonpCallback : 'callBackAddEduOpenidHandler',
            timeout: 10e3,
            complete: function() {
            },
            success : function(data) {
            },
            error : function(xmlHttpRequest, error) {
            }
        });
    }
};

var showNewLoading = function($container, tips) {
    var t = simpleTpl(),
        spinnerSize = 100,
        width = $(window).width(),
        height = $(window).height(),
        $container = $container || $('body'),
        $fond = $container ? $container.find('#fond') : $('body').children('#fond'),
        tips = tips || '努力加载中~~~';
    if ($fond.length > 0) {
        $fond.remove();
    };
    t._(' <div align="center" class="fond" id="fond">')
        ._('<div class="contener_general">')
        ._('<div class="contener_mixte"><div class="ballcolor ball_1">&nbsp;</div></div>')
        ._('<div class="contener_mixte"><div class="ballcolor ball_2">&nbsp;</div></div>')
        ._('<div class="contener_mixte"><div class="ballcolor ball_3">&nbsp;</div></div>')
        ._('<div class="contener_mixte"><div class="ballcolor ball_4">&nbsp;</div></div>')
        ._('</div>')
        ._('<p class="fond-text">' + tips + '</p>')
        ._('</div>')
    $container.append(t.toString());
    $(".fond").css({
        'top': (height - $(".fond").height()) / 2,
        'left': (width - $(".fond").width()) / 2
    });

};

var hideLoading = function($container) {
    if ($container) {
        $container.find('.spinner').hide();
    } else {
        $('body').children('.spinner').hide();
    }
};

var add_param = function(sourceUrl, parameterName, parameterValue, replaceDuplicates) {
    if ((sourceUrl == null) || (sourceUrl.length == 0)) {
        sourceUrl = document.location.href;
    }
    var urlParts = sourceUrl.split("?");
    var newQueryString = "";
    if (urlParts.length > 1) {
        var parameters = urlParts[1].split("&");
        for (var i = 0;
            (i < parameters.length); i++) {
            var parameterParts = parameters[i].split("=");
            if (!(replaceDuplicates && parameterParts[0] == parameterName)) {
                if (newQueryString == "") {
                    newQueryString = "?";
                } else {
                    newQueryString += "&";
                }
                newQueryString += parameterParts[0] + "=" + parameterParts[1];
            }
        };
    }

    if (parameterValue !== null) {
        if (newQueryString == "") {
            newQueryString = "?";
        } else {
            newQueryString += "&";
        }
        newQueryString += parameterName + "=" + parameterValue;
    }
    return urlParts[0] + newQueryString;
};

$.fn.getData = function(name) {
    var that = this;
    if ($(that)[0].outerHTML.indexOf("data-") >= 0) {
        return $(that).attr("data-" + name);
    } else {
        alert("undefined");
    }
};

$.fn.setData = function(name, value) {
    var store = {};
    var that = this;
    $(that).attr('data-' + name, value);

};
$.fn.removeData = function(name) {
    var store = {};
    var that = this;
    $(that).removeAttr('data-' + name);
};

var delQueStr = function(url, ref) {
    var str = "";
    if (url.indexOf('?') != -1)
        str = url.substr(url.indexOf('?') + 1);
    else
        return url;
    var arr = "";
    var returnurl = "";
    var setparam = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].split('=')[0] != ref) {
                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
    } else {
        arr = str.split('=');
        if (arr[0] == ref)
            return url.substr(0, url.indexOf('?'));
        else
            return url;
    }
};

var delete_param = function(url, paramName) {
    var str = "";
    if (url.indexOf('?') != -1) {
        str = url.substr(url.indexOf('?') + 1);
    } else {
        return url;
    }
    var arr = "";
    var returnurl = "";
    var setparam = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].split('=')[0] != paramName) {
                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
    } else {
        arr = str.split('=');
        if (arr[0] == paramName) {
            return url.substr(0, url.indexOf('?'));
        } else {
            return url;
        }
    }
};

var is_android = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("android") > -1;
};

var aniTrue = true;
var showTips = function(word, pos, timer) {
    if (!word) return;
    if (aniTrue) {
        aniTrue = false;
        var pos = pos || '2', timer = timer || 1500;
        $('body').append('<div class="tips" style="opacity: 0;position: fixed;max-width: 80%;top: 60%;left: 50%;z-index: 99999999;color: #FFF;padding: 18px 18px;border-radius: 5px;margin-left: -120px;background: rgba(0, 0, 0, 0.7);text-align: center;font-size: 14px;word-break: break-all">' + word + '</div>');
        var winW = $(window).width(),
            winH = $(window).height(),
            tipsW = $('.tips').width(),
            tipsH = $('.tips').height();
        $('.tips').css({
            'margin-left': -tipsW / 2,
            'top': (winH - tipsH) / (pos - 0.2)
        }).removeClass('none');
        $('.tips').animate({
            'opacity': '1',
            'top': (winH - tipsH) / pos
        }, 300, function() {
            setTimeout(function() {
                $('.tips').animate({
                    'opacity': '0'
                }, 300, function() {
                    $('.tips').addClass('none').css('top', (winH - tipsH) / (pos - 0.2));
                });
            }, timer);
            setTimeout(function() {
                $('.tips').remove();
                aniTrue = true;
            }, timer + 350);
        });
    };
};

var toUrl = function(url) {
    if (getQueryString('kfrom')) {
        var kfrom = (url.indexOf('?') >= 0 ? '&' : '?') + 'kfrom=' + getQueryString('kfrom');
    } else {
        var kfrom = '';
    }
    window.location.href = url + kfrom;
};

var urlLoding = function() {
    var t = simpleTpl(),
        spinnerSize = 146,
        width = $(window).width(),
        height = $(window).height(),
        $container = $container || $('body'),
        $spinner = $container ? $container.find('#spinner') : $('body').children('#spinner'),
        $urljump = $container ? $container.find('#urljump') : $('body').children('#urljump');
    if ($spinner.length > 0) {
        $spinner.remove();
    };
    if ($urljump.length > 0) {
        $urljump.remove();
    };
    var srcurl = "";
    if (share_url.indexOf('html/') != -1) {
        srcurl = "../../svg/spinning-circles.svg";
    } else {
        srcurl = "svg/spinning-circles.svg";
    }
    t._('<ul class="urljump"><li>')
        ._('<img src="' + srcurl + '" width="50" alt="">')
        ._('</li></ul>')
    $spinner = $(t.toString()).css({
        'top': (height - spinnerSize) / 2,
        'left': (width - spinnerSize) / 2
    });
    $container.append($spinner);
};

var getResult = getResultEdu = function(url, data, callback, showloading, $target, isAsync) {
    var eduFlag = '';
    if (showloading) showLoading($target);
    if (data.eduid) {
        eduFlag = '';
    } else {
        eduFlag = '?eduid=' + eduid;
    }

    $.ajax({
        type: 'GET',
        async: typeof isAsync === 'undefined' ? false : isAsync,
        url: business_url + url + eduFlag,
        data: data,
        dataType: "jsonp",
        jsonp: callback,
        complete: function() {
            if (showloading) hideLoading($target);
        },
        success: function(data) {}
    });
};

var getUrlParam = function(name, href, noDecode) {
    if (!href) var href = location.href;
    var target = href.split('?');
    if (href.indexOf('?') >= 0) {
        var temp = '';
        for (var i = 1; i < target.length; i++) {
            if (i == 1) {
                temp = target[i];
            } else {
                temp = temp + '&' + target[i];
            }
        };
        var currentSearch = decodeURIComponent(temp);
        if (currentSearch != '') {
            var paras = currentSearch.split('&');
            for (var i = 0, l = paras.length, items; i < l; i++) {
                var ori = paras[i];
                if (paras[i].indexOf('#') >= 0) {
                    paras[i] = paras[i].split('#')[0];
                }
                items = paras[i].split('=');
                if (items[0] === name) return items[1];
            };
            return '';
        } else {
            return '';
        }
    } else {
        return '';
    }
};

(function($) {
    $.fn.countDown = function(options) {
        var defaultVal = {
            // 存放结束时间
            eAttr: 'etime',
            sAttr: 'stime', // 存放开始时间
            wTime: 29, // 以100毫秒为单位进行演算
            etpl: '%H%:%M%:%S%.%ms%', // 还有...结束
            stpl: '%H%:%M%:%S%.%ms%', // 还有...开始
            sdtpl: '已开始',
            otpl: '活动已结束', // 过期显示的文本模版
            stCallback: null,
            sdCallback: null,
            otCallback: null
        };
        var dateNum = function(num) {
            return num < 10 ? '0' + num : num;
        };
        var subNum = function(num) {
            numF = num.toString().substring(0, 1);
            numS = num.toString().substring(1, num.length);
            return num = "<label>" + numF + "</label><label>" + numS + '</label>';
        };
        var s = $.extend(defaultVal, options);
        var vthis = $(this);
        var num = 60;
        var runTime = function() {
            var nowTime = new Date().getTime();
            vthis.each(function() {
                var nthis = $(this);
                var sorgT = parseInt(nthis.attr(s.sAttr));
                var eorgT = parseInt(nthis.attr(s.eAttr));
                var sT = isNaN(sorgT) ? 0 : sorgT - nowTime;
                var eT = isNaN(eorgT) ? 0 : eorgT - nowTime;
                var showTime = function(rT, showTpl) {
                    var s_ = Math.round((rT % 60000) / s.wTime);
                    s_ = subNum(dateNum(Math.min(Math.floor(s_ / 1000 * s.wTime), 59)));
                    var m_ = subNum(dateNum(Math.floor((rT % 3600000) / 60000)));
                    var h_ = subNum(dateNum(Math.floor((rT % 86400000) / 3600000)));
                    var d_ = subNum(dateNum(Math.floor(rT / 86400000)));
                    var ms_ = Math.floor(rT % 1000);
                    if (ms_ >= 10 && ms_ < 100) {
                        ms_ = "0" + ms_;
                    }
                    if (ms_ < 10) {
                        ms_ = "00" + ms_;
                    }
                    ms_ = ms_.toString().substr(0, 2);
                    nthis.html(showTpl.replace(/%S%/, s_).replace(/%M%/, m_).replace(/%H%/, h_).replace(/%D%/, d_).replace(/%ms%/, ms_));
                };
                if (sT > 0) {
                    showTime(sT, s.stpl);
                    s.stCallback && s.stCallback();
                } else if (eT > 0) {
                    showTime(eT, s.etpl);
                    s.sdCallback && s.sdCallback();
                } else {
                    nthis.html(s.otpl);
                    s.otCallback && s.otCallback();
                }

            });
        };
        setInterval(function() {
            runTime();
        }, s.wTime);
    };
})(Zepto);

var shareUpdateUrl = function(url) {
    var href = url ? url : window.location.href;
    href = delQueStr(href, "openid");
    href = delQueStr(href, "headimgurl");
    href = delQueStr(href, "nickname");
    href = delQueStr(href, "oid");
    href = delQueStr(href, "him");
    href = delQueStr(href, "nnm");
    return href;
};

var cuckooSeed = function() {
    var kfrom = getQueryString('kfrom') + '/';
    if (kfrom) {
        $('[data-img]').each(function(i, el) {
            var me = this,
                style = $.parseJSON($(this).attr('data-img'))["s"],
                url = $.parseJSON($(this).attr('data-img'))["t"] + kfrom + $.parseJSON($(this).attr('data-img'))["u"];
            switch ($.parseJSON($(this).attr('data-img'))["s"]) {
                case 'bg':
                    $(me).attr('style', 'background:url(' + url + ') no-repeat center center !important;background-size:100% 100% !important;');
                    break;
                case 'img':
                    $(me).attr('src', url);
                    break;
                default:
                    return false;
            }
            $(this).removeAttr('data-img');
        });
    }
};

var meunLoad = function() {
    if ($("body").attr("data-sc") === "integrate.html") {
        return;
    }
    if ($("body").attr("data-sc") === "index.html") {
        var t = simpleTpl();
        t._('<p><i class="icon phone"></i><a>' + menuTel + '</a></p>')
            ._('<p><i class="icon mail"></i><a>' + menuMail + '</a>')
            ._('<p><i class="icon address"></i><a>' + menuAddress + '</a></p>')
        $(".us-box").html(t.toString());
        $(".pro-connect-us").removeClass("hidden");
        H.menu.init();
        return;
    }
    var path = (window.location.href.indexOf("/pages") >= -1) ? ("./") : ("html/pages/");
    var imgpath = (window.location.href.indexOf("/pages") >= -1) ? ("../../images/") : ("../images/");
    var t = simpleTpl();
    if ($("body").attr("data-sc") === "index.html") {
        imgpath = "./images/";
    }
    t._('<article id="proMenuWarp" class="pro-menu-warp">')
        ._('<div class="menu-title"><img src="" alt="" id="title-img-menu" data-img=\'{"s":"img","u":"title.png","t":"' + imgpath + '"}\'></div>')
        ._('<div class="pro-item-list clearfix">')
        ._('<ul>')
        ._('<li><i class="icon logo-icon" data-img=\'{"s":"bg","u":"tip.png","t":"' + imgpath + '"}\'></i><a href="' + path + 'brand-introduce.html">品牌介绍</a></li>')
        ._('<li><i class="icon logo-icon" data-img=\'{"s":"bg","u":"tip.png","t":"' + imgpath + '"}\'></i><a href="' + path + 'teacher-resource.html">师资介绍</a></li>')
        ._('<li><i class="icon logo-icon" data-img=\'{"s":"bg","u":"tip.png","t":"' + imgpath + '"}\'></i><a href="' + path + 'course-system.html">课程体系</a></li>')
        ._('<li><i class="icon logo-icon" data-img=\'{"s":"bg","u":"tip.png","t":"' + imgpath + '"}\'></i><a href="' + path + 'my-strength.html">乐宁优势</a></li>')
        ._('<li><i class="icon logo-icon" data-img=\'{"s":"bg","u":"tip.png","t":"' + imgpath + '"}\'></i><a href="' + path + 'video-active.html">活动视频</a></li>')
        ._('<li><i class="icon logo-icon" data-img=\'{"s":"bg","u":"tip.png","t":"' + imgpath + '"}\'></i><a href="#" data-url="' + path + '@-360V1.html">360全景</a></li>')
        ._('</ul></div>')
        ._('<div id="proConnectUs" class="pro-connect-us">')
        ._('<div class="us-box">')
        ._('<p><i class="icon phone"></i><a>' + menuTel + '</a></p>')
        ._('<p><i class="icon mail"></i><a>' + menuMail + '</a>')
        ._('<p><i class="icon address"></i><a>' + menuAddress + '</a></p>')
        ._('</div>')
        ._('</div>')
        ._('<nav class="menu-nav" id="menuNav">')
        ._('<i><img src="" data-img=\'{"s":"img","u":"menu.png","t":"' + imgpath + '"}\'></i>')
        ._('</nav>')
        ._('</article>')
    $('body').append(t.toString());



    H.menu = {
        $proMenuWarp: $("#proMenuWarp"),
        $menuNav: $("#menuNav"),
        $menuImg: $("#title-img-menu"),

        winH: $(window).height(),
        init: function() {
            this.resize();
            this.eventHander();
        },
        resize: function() {
            var that = this;
            var Img = new Image();
            Img.src = getQueryString('kfrom') ? (imgpath + getQueryString('kfrom') + '/title.png') : (imgpath + 'avatar.jpg');
            Img.onload = function() {
                var listH = that.winH - that.$menuImg.height() - $(".pro-connect-us").height() - 10;
                $(".pro-item-list").height(listH);
                var liH = Math.floor((listH - 132) / 7);
                $(".pro-item-list li").css({
                    "padding-top": liH
                });
            }
        },
        eventHander: function() {
            var that = this;
            that.$menuNav.click(function() {
                that.$proMenuWarp.toggleClass("nav-btn-check");
            })
        }
    }
    H.menu.init();
    cuckooSeed();
};

var meunInforLoad = function(type) {
    if (type == 3) {
        menuType = 1;
        getResult("rules/info", {
            eduUuid: eduData[getQueryString('kfrom')].uid,
            type: 3
        }, "callBackRulesInfoHandler", false, true);
    } else
    if (type == 4) {
        menuType = 2;
        getResult("rules/info", {
            eduUuid: eduData[getQueryString('kfrom')].uid,
            type: 4
        }, "callBackRulesInfoHandler", false, true);
    } else if (type == 5) {
        menuType = 3;
        getResult("rules/info", {
            eduUuid: eduData[getQueryString('kfrom')].uid,
            type: 5
        }, "callBackRulesInfoHandler", false, true);
    }
};

var errorTips = function() {
    swal({
        title: "关键参数丢失",
        text: "请从公众号菜单中再次进入 :)",
        type: "error",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "我知道了",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function(isConfirm) {
        if (isConfirm) {
            if (isWeixin()) {
                wx.closeWindow({});
            } else {
                history.back(-1);
            }
        }
    });
};

W.callBackRulesInfoHandler = function(data) {
    if (data.result) {
        if (menuType == 1) {
            menuTel = (data.detail ? data.detail : menuTel);
            meunInforLoad(4);
        } else
        if (menuType == 2) {
            menuMail = (data.detail ? data.detail : menuMail);
            meunInforLoad(5);
        } else if (menuType == 3) {
            menuAddress = (data.detail ? data.detail : menuAddress);
            meunLoad();
        }
    } else {
        if (menuType == 1) {
            meunInforLoad(4);
            menuTel = (data.detail ? data.detail : menuTel);
        } else
        if (menuType == 2) {
            menuMail = (data.detail ? data.detail : menuMail);
            meunInforLoad(5);
        } else if (menuType == 3) {
            menuAddress = (data.detail ? data.detail : menuAddress);
            meunLoad();
        }
    }
};