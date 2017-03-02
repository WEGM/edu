$(function() {
    $("script").each(function(i, item) {
        var scr = $(this).attr("src");
        $(this).attr("src", scr + "?v=" + version);
    });

    if (getQueryString('kfrom') in eduName) {
        document.title = eduName[getQueryString('kfrom')];
    } else {
        document.title = '教育系统';
    }
    var $iframe = $('<iframe src="http://edu.holdfun.cn/images/blank.png" class="preload"></iframe>');
    $iframe.on('load', function() {
        setTimeout(function() {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($('body'));

    if (!/integrate.html/i.test(location.href)) {
        if (getQueryString('kfrom') == 'lening') meunInforLoad(3);
    }

    $('.main').css('padding-bottom', "20px");

    if (!(getQueryString('kfrom') in eduMap)) errorTips();

    cuckooSeed();

    $('body').delegate("a", "click", function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        if ($(this).attr('data-stoppropagation') == 'true') e.stopPropagation();
        if (href && href !== '#' && href !== 'javascript:;' && href !== 'javascript:void(0);' && href !== 'javascript:void();') {
            if (getQueryString('kfrom')) {
                var kfrom = (href.indexOf('?') >= 0 ? '&' : '?') + 'kfrom=' + getQueryString('kfrom');
            } else {
                var kfrom = '';
            }
            window.location.href = href + kfrom;
        } else {
            var kfrom = '',
                suffix = '';
            if ($(this).attr('data-url') && $(this).attr('data-url') != '') {
                suffix = ($(this).attr('data-url') + (getQueryString('kfrom') ? (kfrom = ($(this).attr('data-url').indexOf('?') >= 0 ? '&' : '?') + 'kfrom=' + getQueryString('kfrom')) : kfrom = '')).replace('@', getQueryString('kfrom'));
                window.location.href = suffix;
            } else {
                suffix = '';
            }
        }
    });
});