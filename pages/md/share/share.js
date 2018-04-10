// pages/md/share/share.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgurl: '../img', // 本地url
        shareList: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '正在加载中'
        })
        
        var _this = this;
        var buyingId = options.buyingId;
        wx.request({
            url: 'https://mdmj.devdexterity.com/api/store/forward-info?buyingId=1',
            data: {
                buyingId: buyingId, //  当前团购ID
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                _this.setData({
                    shareList: res.data.data,
                    ownOpenId: options.openId,
                    brandId: options.brandId,
                    title: options.title
                });

                wx.hideLoading();
            }
        });

        // 设置商户标题
        wx.setNavigationBarTitle({
            title: options.title
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (options) {
        var _this = this;

        return {
            title: _this.data.title,
            path: '/pages/md/index/index?brandId=' + _this.data.brandId + '&shareOpenId=' + _this.data.ownOpenId,
            success: function (res) {
                wx.request({
                    url: 'https://mdmj.devdexterity.com/api/store/forward',
                    data: {
                        openId: _this.data.ownOpenId,
                        brandId: _this.data.brandId
                    },
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        wx.showToast({
                            title: '转发成功',
                        })
                    }
                })
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})