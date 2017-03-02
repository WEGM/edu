(function($) {

    H.index = {
        init: function() {
            document.getElementById("content").classList.add("appears");
            this.loadingData();
        },
        loadingData: function() {
            getResult("user/gettype", {
                openid: openid,
                eduid: eduData[getQueryString('kfrom')].uid
            }, "callBackMobileGetTypekHandler");
        }
    }

    
    W.callBackMobileGetTypekHandler = function(data) {
        if (data.result) {
            setTimeout(function() {
                if (data.type == 0) {
                    toUrl("./html/student/studentcourse.html");
                } else if (data.type == 1) {
                    toUrl("./html/teacher/courselist.html?teacherStyle=" + 1);
                } else if (data.type == 2) {
                    toUrl("./html/teacher/courselist.html?teacherStyle=" + 2);
                }
            }, Math.random() * 1000 + 2000);
            bindOpendid(data);
        } else {
            setTimeout(function() {
                toUrl("register.html");
            }, Math.random() * 1000 + 2000);
        }
    }
    H.index.init();
    H.jssdk.init('off');
})(Zepto);