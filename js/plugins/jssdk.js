(function($) {
	H.jssdk = {
		wxIsReady: false,
		repeatLoad: 5,
		data: window.localStorage,
		init: function(flag) {
			this.ready(flag);
			this.wxConfig();
		},
		ready: function(flag) {
			var me = this;
			wx.ready(function() {
				wx.checkJsApi({
					jsApiList: [
						'addCard',
						'startRecord',
						'stopRecord',
						'onVoiceRecordEnd',
						'playVoice',
						'stopVoice',
						'onVoicePlayEnd',
						'uploadVoice',
						'downloadVoice',
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'hideAllNonBaseMenuItem',
						'onMenuShareQQ',
						'onMenuShareWeibo',
						'hideMenuItems',
						'showMenuItems',
						'hideOptionMenu',
						'showOptionMenu'
					],
					success: function(res) {
						me.wxIsReady = true;
					}
				});
				me.hideMenuList();
				wx.hideOptionMenu();
				wx.hideAllNonBaseMenuItem();
				if ('off' != flag) me.showMenuList(shareData);
			});
			wx.error(function(res) {
				me.wxIsReady = false;
				if (me.repeatLoad == 0) {
					setTimeout(function() {
						me.repeatLoad--;
						H.jssdk.init();
					}, 5000);
				}
			});
		},
		wxConfig: function() {
			$.ajax({
				type: 'GET',
				async: true,
				url: business_url + 'mp/jsapiticket',
				data: {
					appid: 'wx9097d74006e67df3'
				},
				dataType: "jsonp",
				jsonpCallback: 'callbackJsapiTicketHandler',
				timeout: 10000,
				complete: function() {},
				success: function(data) {
					if (data.result) {
						var url = window.location.href.split('#')[0];
						var nonceStr = 'df51d5cc9bc24d5e86d4ff92a9507361';
						var timestamp = Math.round(new Date().getTime() / 1000);
						var signature = hex_sha1('jsapi_ticket=' + data.ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + url);
						wx.config({
							debug: false,
							appId: 'wx9097d74006e67df3',
							timestamp: timestamp,
							nonceStr: nonceStr,
							signature: signature,
							jsApiList: [
								'addCard',
								'startRecord',
								'stopRecord',
								'onVoiceRecordEnd',
								'playVoice',
								'stopVoice',
								'onVoicePlayEnd',
								'uploadVoice',
								'downloadVoice',
								'onMenuShareTimeline',
								'onMenuShareAppMessage',
								'hideAllNonBaseMenuItem',
								'onMenuShareQQ',
								'onMenuShareWeibo',
								'hideMenuItems',
								'showMenuItems',
								'hideOptionMenu',
								'showOptionMenu'
							]
						});
					}
				},
				error: function(xmlHttpRequest, error) {}
			});
		},
		menuShare: function(data) {
			var me = this;
			wx.onMenuShareTimeline({
				title: data.title,
				desc: data.desc,
				link: shareUpdateUrl(data.link),
				imgUrl: data.imgUrl,
				trigger: function(res) {},
				success: function(res) {
					me.shareSuccess();
				},
				cancel: function(res) {
					me.shareFail();
				},
				fail: function(res) {
					me.shareFail();
				}
			})
		},
		menuToFriend: function(data) {
			var me = this;
			wx.onMenuShareAppMessage({
				title: data.title,
				desc: data.desc,
				link: shareUpdateUrl(data.link),
				imgUrl: data.imgUrl,
				success: function(res) {
					me.shareSuccess();
				},
				cancel: function(res) {
					me.shareFail();
				},
				fail: function(res) {
					me.shareFail();
				}
			});
		},
		hideMenuList: function() {
			wx.hideMenuItems({
				menuList: [
					"menuItem:share:timeline",
					"menuItem:share:qq",
					"menuItem:copyUrl",
					"menuItem:openWithQQBrowser",
					"menuItem:openWithSafari",
					"menuItem:share:email"
				],
				success: function(res) {},
				fail: function(res) {}
			});
		},
		showMenuList: function(data) {
			var me = this;
			wx.showMenuItems({
				menuList: [
					"menuItem:share:appMessage",
					"menuItem:share:timeline",
					"menuItem:favorite",
					"menuItem:copyUrl",
					"menuItem:share:email"
				],
				success: function(res) {
					me.menuToFriend(data);
					me.menuShare(data);
				},
				fail: function(res) {}
			});
		},
		shareSuccess: function() {
			var me = this;
			$('#pop-share').addClass('none');
			if (typeof(actType) != 'undefined' && typeof(actID) != 'undefined') {
				if (me.getData(pageID) == '') {
					if (typeof(W.callBackIntegralInfoHandler) == 'undefined') {
						W.callBackIntegralInfoHandler = function(data) {
							var me = H.jssdk;
							if (data.result && data.items) {
								getResult('integral/update', {
									stuid: data.items[0].suid,
									type: '1',
									source: integralFlag[actType],
									count: '2'
								}, 'callBackIntegralUpdateHandler');
							} else {
								// 接口出错未处理
							}
						};
						getResult('integral/info', {
							eduUuid: eduData[getQueryString('kfrom')].uid,
							openid: openid
						}, 'callBackIntegralInfoHandler');

					}
				}
			}
		},
		shareFail: function() {
			$('#pop-share').addClass('none');
		},
		saveData: function(key, value) {
			if (key) this.data.setItem(key, $.trim(value));
		},
		getData: function(key) {
			if (key) return this.data.getItem(key) || '';
		},
		delData: function(key) {
			if (key) this.data.removeItem(key);
		}
	};
	W.callBackIntegralUpdateHandler = function(data) {
		var me = H.jssdk;
		if (data.result) {
			swal("恭喜获得积分", "积分同步需要时间，请稍后查询", "success");
			me.saveData(pageID, true);
		} else {
			// 接口出错未处理
		}
	};
})(Zepto);