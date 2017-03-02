function fileSelected() {
    var $file_upload = document.getElementById('file-upload'),
        fd = new FormData(),
        img = $file_upload.files[0],
        img_id = 'upload';
    if (!img) {
        showTips('图片只能是jpg/gif/png格式');
        return;
    } else if (!(img.type.indexOf('image') == 0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name))) {
        showTips('图片只能是jpg/gif/png格式');
        return;
    } else {
        fd.append('file', img);
        fd.append('serviceName', 'clueImg');
        if ($file_upload.files && $file_upload.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                if (e.target.result) {
                    showLoading(false, '上传中，请稍后');
                    $('.avatar').attr('src', e.target.result);
                    uploadimg(img_id, fd);
                }
            };
            reader.readAsDataURL($file_upload.files[0]);
        }
    }
};

function uploadimg(img_id, fd) {
    var xhr = new XMLHttpRequest(),
        $img_id = $('#' + img_id);
    xhr.addEventListener("load", function(evt) {
        if (evt.target && evt.target.responseText) {
            var data = $.parseJSON(evt.target.responseText);
            if (!data || data.result == false) {
                hideLoading();
                showTips("上传失败，单张图片大小不能超过5M");
                return;
            } else if (data.result && data.filePath) {
                getResult('student/addimg', {
                    stuid: H.index.suid,
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

H.index = {
    suid: '',
    init: function() {
        showLoading(null, '查询课程中...');
        this.event();
        this.userGettypePort();
    },
    event: function() {
        var me = this;
        $('body').delegate('.subject a', 'click', function(e) {
            e.preventDefault();
            var uid = $(this).attr('data-uid');
            if ($(this).attr('data-uid'))
                toUrl('exercises-class.html?uid=' + uid);
            else
                showTips('课程还在准备中，请稍等');
        });
        $(".avatar").click(function(e) {
            e.preventDefault();
            $('#file-upload').trigger('click');
        });
    },
    questionCoursePort: function(data) {
        getResult('question/course', {
            openid: openid,
            eduid: eduData[getQueryString('kfrom')].uid
        }, 'callBackQuestionCourseHandler');
    },
    prepareNewCoursePort: function(data) {
        showLoading(null, '查询课程中...');
        getResult('prepare/newcourse', {
            openid: openid,
            eduid: eduData[getQueryString('kfrom')].uid
        }, 'callBackPrepareCourseHandler');
    },
    fillUserInfo: function(data) {
        $('.header .username').text(data.sname ? data.sname : '乐宁学员');
        $('.header .avatar').attr('src', data.simg ? data.simg : '../../images/avatar.jpg');
    },
    fillCourseInfo: function(data, stuid) {
        var items = data;
        for (var i = 0; i < items.length; i++) {
            $('.subject').append('<p><a href="#" data-stuid="' + stuid + '" data-uid="' + items[i].cuuid + '">' + items[i].cname + '</a></p>')
        };
    },
    fillNewCourseInfo: function(data) {
        for (var k = 0; k < data.length; k++) {
            $('.subject').append('<p class="k-uname">' + data[k].stna + '</p>');
            for (var i = 0; i < data[k].couItems.length; i++) {
                $('.subject').append('<p><a href="#" data-stuid="' + data[k].stuid + '" data-uid="' + data[k].couItems[i].cuuid + '">' + data[k].couItems[i].cname + '</a></p>')
            };
        };
    },
    userGettypePort: function() {
        getResultEdu("user/gettype", {
            openid: openid,
            eduid: eduData[getQueryString('kfrom')].uid
        }, "callBackMobileGetTypekHandler");
    }
};

W.callBackQuestionCourseHandler = function(data) {
    var me = H.index;
    if (data.result) {
        // me.fillUserInfo(data);
        if (data.items) me.fillCourseInfo(data.items);
        me.suid = data.suid;
        $('.header .username').text(data.sname ? data.sname : '乐宁学员');
        $('.header .avatar').attr('src', data.simg ? data.simg : '../../images/avatar.jpg');
        if (data.simg == undefined && data.sex) {
            switch (data.sex) {
                case 1:
                    $('.header .avatar').attr('src', '../../images/avatar-man.png');
                    break;
                case 2:
                    $('.header .avatar').attr('src', '../../images/avatar-woman.png');
                    break;
                default:
                    $('.header .avatar').attr('src', '../../images/avatar.jpg');
            };
        }
    } else {
        // if (data.message) showTips(data.message);
        hideLoading();
        showTips('老师暂未开放答题页<br>5秒后返回首页', null, 5e3);
        setTimeout(function() {
            toUrl('../../index.html');
        }, 5e3);
        return;
    }
    hideLoading();
};

W.callBackPrepareCourseHandler = function(data) {
    var me = H.index;
    if (data.result) {
        // me.fillUserInfo(data);
        if (data.stItems && data.stItems.length == 1) {
            me.fillCourseInfo(data.stItems[0].couItems, data.stItems[0].stuid);
            me.suid = data.stItems[0].stuid;
            $('.header .username').text(data.stItems[0].stna ? data.stItems[0].stna : '乐宁学员');
            if (data.stItems[0].sex) {
                switch (data.stItems[0].sex) {
                    case 1:
                        $('.header .avatar').attr('src', '../../images/avatar-man.png');
                        break;
                    case 2:
                        $('.header .avatar').attr('src', '../../images/avatar-woman.png');
                        break;
                    default:
                        $('.header .avatar').attr('src', '../../images/avatar.jpg');
                };
            }
        } else {
            $('.header').remove();
            me.fillNewCourseInfo(data.stItems);
        }
    } else {
        // if (data.message) showTips(data.message);
        hideLoading();
        showTips('老师暂未开放答题页<br>5秒后返回首页', null, 5e3);
        setTimeout(function() {
            toUrl('../../index.html');
        }, 5e3);
        return;
    }
    hideLoading();
};

W.callBackMobileGetTypekHandler = function(data) {
    var me = H.index;
    if (data.result) {
        me.questionCoursePort();
        // me.prepareNewCoursePort();
        bindOpendid(data);
    } else {
        toUrl("../../infor/register.html?ref=exercises");
    }
};

W.callChangeAddImgHandler = function(data) {
    hideLoading();
    if (data.result) {
        showTips('头像修改成功');
    } else {
        showTips('头像修改失败，试试刷新页面');
    }
};

$(function() {
    H.jssdk.init('off');
    H.index.init();
});