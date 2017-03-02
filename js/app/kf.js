(function($) {
    H.index = {
        listData: '',
        init: function() {
            this.event();
            this.servicesListPort();
        },
        event: function() {
            var me = this;
            $("body").delegate('.list a', 'click', function(e) {
                e.preventDefault();
                if ($(this).attr('data-num')) {
                    me.fillAnswer(me.listData[$(this).attr('data-num')]);
                } else {
                    showTips('信息不存在！');
                    $(this).remove();
                }

            });
            $('.btn-back').click(function(e) {
                e.preventDefault();
                $('.list').removeClass('none');
                $('.detail').addClass('none');
                $('.detail .q').html('');
                $('.detail .a').html('');
            });
            $('.online').click(function(e) {
                e.preventDefault();
                wx.closeWindow();
            });
        },
        servicesListPort: function() {
            showLoading(null, '加载中...');
            getResult('custom/services/list', {
                eduUuid: eduUuid
            }, 'callBackCustomServicesListHandler');
        },
        fillList: function(data) {
            var me = this,
                list = data;
            for (var i = 0; i < list.length; i++) {
                if (list[i].qt && list[i].qa) $('.list').append('<a href="#" data-num="' + i + '">' + list[i].qt + '</a>');
            };
        },
        fillAnswer: function(data) {
            $('.list').addClass('none');
            $('.detail').removeClass('none');
            $('.detail .q').html(data.qt);
            $('.detail .a').html(data.qa);
        }
    };

    W.callBackCustomServicesListHandler = function(data) {
        var me = H.index;
        if (data.result && data.items) {
            me.listData = data.items;
            me.fillList(data.items);
            $('.tips, .detail').addClass('none');
        } else {
            $('.list, .detail').addClass('none');
            $('.tips').removeClass('none');
        }
        hideLoading();
    };
})(Zepto);

$(function() {
    H.jssdk.init('off');
    H.index.init();
});