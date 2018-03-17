// pages/md/history/history.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgurl: '../img', // 本地url
        openId: '',
        historyList: ''
    },
    getInitData() {
        var _this = this;
        wx.request({
            url: 'https://mdmj.devdexterity.com/api/store/history',
            data: {
                openId: _this.data.openId, //  当前团购ID
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                _this.setData({
                    historyList: res.data.data
                });

                wx.hideLoading()
            }
        })
    },
    jumpPage(e) {
        var url = e.currentTarget.dataset.url;
        wx.reLaunch({
            url: url
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this; 
        // 登录
        wx.login({
            success: function (res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'https://mdmj.devdexterity.com/api/default/login',
                        data: {
                            code: res.code
                        },
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        method: 'POST',
                        success: function (res) {
                            _this.setData({
                                'openId': res.data.data.open_id
                            });

                            _this.getInitData();
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
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
        wx.showLoading({
            title: '正在加载中'
        })
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
    onShareAppMessage: function () {

    }
})