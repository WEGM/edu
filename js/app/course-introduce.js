(function($) {
    H.courseIntroduce = {
        uuid: getQueryString("uuid"),
        $specialEdu: $(".special-edu").find("p"),
        $learnGet: $(".learn-get").find("p"),
        $classTitle: $(".class-title"),
        $imgShow: $(".img-show"),
        init: function() {
            this.loadData();
        },
        loadData: function() {
            getResult("courseSystem/detail", {
                uuid: this.uuid
            }, "callBackCourseSdetailHandler", true);
        },
        fillDom: function(data) {
            var me = this;
            me.$imgShow.find('img').attr("src", data.smallImg)
            me.$classTitle.html(data.name);
            me.$specialEdu.html(data.detail);
            me.$learnGet.html(data.learning);
        },
        eventhander: function() {

        },
    }
    W.callBackCourseSdetailHandler = function(data) {
        if (data.result) {
            H.courseIntroduce.fillDom(data);
        } else {
            showTips("网络繁忙");
        }
    }
    H.courseIntroduce.init();
    H.jssdk.init();
})(Zepto);