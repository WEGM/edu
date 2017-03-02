(function($) {
    H.brandIntroduce = {
        $img: $(".swiper-container").find("img"),
        $text: $(".brand-infor").find("p"),
        init: function() {
            this.loadData();
        },
        loadData: function() {
            getResult("grand/info", {
                eduUuid: eduUuid
            }, "callBackGrandInfoHandler", true);
        },
        fillDom: function(data) {
            var me = this;
            me.$img.attr("src", data.img ? data.img : '');
            me.$text.html(data.detail);
        }
    }
    W.callBackGrandInfoHandler = function(data) {
        if (data.result) {
            $(".main").removeClass("none")
            H.brandIntroduce.fillDom(data);
        }
    }
    H.brandIntroduce.init();
    H.jssdk.init();
})(Zepto);