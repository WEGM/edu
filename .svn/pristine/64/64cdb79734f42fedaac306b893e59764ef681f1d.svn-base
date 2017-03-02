function sendBase64File(ret) {
    showLoading(false, '上传中，请稍后');
    var form = document.forms[0];
    var fd = new FormData(form);
    fd.append("base64String", ret.substring(22));
    fd.append("fileType", "png");

    $.ajax({
        url: business_url + "file/upload/base64/image",
        type: "POST",
        data: fd,
        async: true,
        dataType: "text",
        processData: false,
        contentType: false,
        success: function(data) {
            // console.log(JSON.stringify(data));
            if (data && data.result && data.filePath) {
                $('.head-img img').attr('src', ret);
                getResult('student/addimg', {
                    stuid: H.integrate.suid,
                    img: data.filePath
                }, 'callChangeAddImgHandler');
            } else {
                hideLoading();
                showTips("上传失败，单张图片大小不能超过5M");
            }
        },
        error: function() {
            showTips("上传失败，单张图片大小不能超过5M");
            hideLoading();
        }
    });
};

function sendFile(ret) {
    showLoading(false, '上传中，请稍后');
    var $file_upload = document.getElementById('file-upload'),
        fd = new FormData(),
        img = $file_upload.files[0];
    fd.append('file', img);
    fd.append('serviceName', 'clueImg');

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(evt) {
        if (evt.target && evt.target.responseText) {
            var data = $.parseJSON(evt.target.responseText);
            if (!data || data.result == false) {
                hideLoading();
                showTips("上传失败，单张图片大小不能超过5M");
                return;
            } else if (data.result && data.filePath) {
                if ($file_upload.files && $file_upload.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        if (e.target.result) {
                            $('.head-img img').attr('src', e.target.result);
                        }
                    };
                    reader.readAsDataURL($file_upload.files[0]);
                }
                getResult('student/addimg', {
                    stuid: H.integrate.suid,
                    img: data.filePath
                }, 'callChangeAddImgHandler');
            }
        }
    }, false);
    if (fd == 0) return;
    xhr.addEventListener("error", function() {
        hideLoading();
        showTips('上传出错，单张图片大小不能超过5M');
    }, false);
    xhr.addEventListener("abort", function() {
        hideLoading();
        showTips("上传已取消");
    }, false);
    xhr.open('POST', business_url + "file/upload/image");
    xhr.send(fd);
};

(function($) {
    H.integrate = {
        suid: '',
        $headimg: $(".head-img").find("img"),
        $nametext: $(".user-name"),
        $cardValue: $(".card-value"),
        $boxTopW: $(".box-top").width(),
        init: function() {
            getResultEdu("user/gettype", {
                openid: openid,
                eduid: eduData[getQueryString('kfrom')].uid
            }, "callBackMobileGetTypekHandler", true);
            this.ruleLoad();
            this.event();
            cuckooSeed();
        },
        loadData: function() {
            getResult("integral/info", {
                openid: openid,
                eduid: eduData[getQueryString('kfrom')].uid
            }, "callBackIntegralInfoHandler", true);
        },
        fillDom: function(data) {
            var me = this;
            me.$headimg.attr("src", data.img ? data.img : "./images/avatar.jpg");
            me.$nametext.text(data.sname ? data.sname : "匿名");
            me.$cardValue.text(data.stucou ? data.stucou : "0");
            $(".box-top").css({
                "padding-left": ($(".integrate-box").width() - 40 - $(".box-top div").width() * 3) / 2 + 'px',
                "padding-right": ($(".integrate-box").width() - 40 - $(".box-top div").width() * 3) / 2 + 'px'
            });
            $(".box-bottom").css({
                "padding-left": ($(".integrate-box").width() - 40 - $(".card-name").width() * 3) / 2 + 'px',
                "padding-right": ($(".integrate-box").width() - 40 - $(".card-name").width() * 3) / 2 + 'px'
            });
        },
        ruleLoad: function() {
            $.ajax({
                type: 'GET',
                async: false,
                url: business_url + 'rules/info',
                data: {
                    eduUuid: eduUuid,
                    type: 1
                },
                dataType: "jsonp",
                jsonpCallback: 'callBackRulesInfoHandler',
                timeout: 15000,
                complete: function() {},
                success: function(data) {
                    if (data.result) {
                        $(".integrate-rule").find(".rule-content").html(filterXSS(data.detail));
                    }
                },
                error: function(xmlHttpRequest, error) {}
            });
        },
        event: function() {
            var me = this;
            $(".head-img").click(function(e) {
                e.preventDefault();
                $('#file-upload').trigger('click');
            });
        },
        initBox: function() {
            var me = this,
                w = $(window).width(),
                h = $(window).height();
            $('.cutbox').crop({
                w: w > h ? h : w,
                h: h,
                r: (w - 30) * 0.5,
                res: '',
                callback: function(ret) {
                    sendFile(ret);
                }
            });
        }
    }
    W.callBackMobileGetTypekHandler = function(data) {
        if (data.result) {
            if (data.type == 0) {
                H.integrate.loadData()
            } else {
                hideLoading();
                showTips('老师暂未开放积分页<br>5秒后返回首页', null, 5e3);
                setTimeout(function() {
                    toUrl('index.html');
                }, 5e3);
            }
            bindOpendid(data);
        } else {
            toUrl('./infor/register.html?ref=integrate')
        }
    };

    W.callBackIntegralInfoHandler = function(data) {
        if (data.result && data.items) {
            H.integrate.suid = data.items[0].suid;
            H.integrate.fillDom(data.items[0]);
            if (data.items[0].img == '' && data.items[0].sex) {
                switch (data.items[0].sex) {
                    case 1:
                        $('.head-img img').attr('src', 'images/avatar-man.png');
                        break;
                    case 2:
                        $('.head-img img').attr('src', 'images/avatar-woman.png');
                        break;
                    default:
                        $('.head-img img').attr('src', 'images/avatar.jpg');
                };
            }
            $(".main").removeClass("none");
        } else {
            showTips(data.message)
        }
        hideLoading();
    };

    W.callChangeAddImgHandler = function(data) {
        hideLoading();
        if (data.result) {
            showTips('头像修改成功');
            $('.cutbox').addClass('none');
        } else {
            showTips('头像修改失败，试试刷新页面');
        }
    };

    H.jssdk.init('off');
    showLoading(null, '查询中...');
    setTimeout(function() {
        H.integrate.init();
    }, 2e3);
})(Zepto);