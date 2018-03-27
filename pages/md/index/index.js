// pages/md/index/index.js
var common = require('../common.js');

let col1H = 0;
let col2H = 0;
let sendTime = 0;
let isLoadNum = 0;

Page({

    /**
     * 页面的初始数据
     */

    data: {
        brandId: '',
        imgurl: '../img', // 本地url
        shareTitle: '', // 分享标题
        ownOpenId: '', // 自己的openId
        shareOpenId: '', // 分享者的openId 链接上带参
        isShowInfo: '',
        isShowPop: false, // 是否展示报名弹框
        detailList: '',
        showMore: false,
        limitNum: 1,
        currentTab: 0,
        imgWidth: 0,
        images: [],
        col1: [],
        col2: [],
        curr_id: ''   //当前打开的视频id
    },
    // 拨打电话
    callTel(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.teleph
        })
    },
    // 查看其他门店
    loadMore() {
        var flag = this.data.showMore;
        this.setData({
            showMore: !flag,
            limitNum: !flag ? this.data.detailList.addressLength : 1
        });
    },
    // 展开活动须知
    showActive () {
        this.setData({
            'detailList.activeList.isFold': !this.data.detailList.activeList.isFold
        });
    },
    // 切换Tab
    changeTab(e) {
        var index = e.currentTarget.dataset.index;
        var tabtype = e.currentTarget.dataset.tabtype;

        this.setData({
            currentTab: index
        });
    },
    // 预览瀑布流图片 预览单图图片
    previewImg2(e) {
        var tabno = e.target.dataset.tabno;
        var list = e.target.dataset.imgs;
        var key = 'tabListImgArr_' + tabno;
        wx.previewImage({
            current: e.target.dataset.url, // 当前显示图片的http链接
            urls: list[key] // 需要预览的图片http链接列表
        })
    },
    // 预览案例图片
    previewImg(e) {
        wx.previewImage({
            current: e.target.dataset.url, // 当前显示图片的http链接
            urls: e.target.dataset.imgs // 需要预览的图片http链接列表
        })
    },
    onImageLoad: function (e) {
        if (isLoadNum == this.data.images.length) {
            return;
        }

        isLoadNum ++;
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width;         //图片原始宽度
        let oImgH = e.detail.height;        //图片原始高度
        let imgWidth = this.data.imgWidth;  //图片设置的宽度
        let scale = imgWidth / oImgW;        //比例计算
        let imgHeight = oImgH * scale;      //自适应高度

        let images = this.data.images;
        let imageObj = null;

        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            if (img.id === imageId) {
                imageObj = img;
                break;
            }
        }
        imageObj.height = imgHeight;

        let col1 = this.data.col1;
        let col2 = this.data.col2;

        //判断当前图片添加到左列还是右列
        if (col1H <= col2H) {
            col1H += imgHeight;
            col1.push(imageObj);
        } else {
            col2H += imgHeight;
            col2.push(imageObj);
        }

        let data = {
            col1: col1,
            col2: col2
        };
        
        this.setData(data);
    },
    loadImages: function () {
        var list = this.data.tabList;
        let images = '';
        list.forEach(function(item, index) {
            if(item.tabType == 1) {
                images = item.list;
            }
        });

        let baseId = "img-" + (+new Date());

        for (let i = 0; i < images.length; i++) {
            images[i].id = baseId + "-" + i;
        }

        this.setData({
            images: images
        });
    },
    // 请求页面数据
    getInitData() {
        var _this = this;
        var brandId = _this.data.brandId;
        if (brandId == 'undefined' || !brandId) {
            brandId = 5;
        }
        wx.request({
            url: 'https://mdmj.devdexterity.com/api/store/init',
            data: {
                'brandId': brandId,
                'from': _this.data.ownOpenId,
                'to': _this.data.shareOpenId
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res)
                const code = res.data.code;
                if (code == 200) {
                    var detailList = res.data.data,
                        tabList = detailList.tabList,
                        shareTitle = detailList.title,
                        activeList = detailList.activeList;
                    
                    var tabListImgList = {};

                    tabList.forEach(function (item, index) {
                        // 所有tab下面的 各子类tab图片合集数组 传给放大轮播用 固定名称+tab顺序
                        var name = 'tabListImgArr_' + index;

                        var tabListImgArr = [];
                        if (item.tabType == 1) {
                        // 产品-瀑布流
                            item.list.forEach(function (item, index) {
                                tabListImgArr.push(item.pic)
                            });
                        } else if (item.tabType == 2) {
                        // 门店-单图
                            item.list.forEach(function (item, index) {
                                tabListImgArr.push(item.imgurl)
                            });
                        }
                        tabListImgList[name] = tabListImgArr;
                    })

                    

                    _this.setData({
                        detailList,
                        activeList,
                        tabList,
                        tabListImgList,
                        shareTitle,
                        hasActive: !common.isBlank(activeList),
                    });

                    
                    wx.getSystemInfo({
                        success: (res) => {
                            let ww = res.windowWidth;
                            let wh = res.windowHeight;
                            let imgWidth = ww * 0.48;

                            _this.setData({
                                imgWidth: imgWidth
                            });

                            //加载首组图片
                            _this.loadImages();
                        }
                    });

                    // 团购优惠倒计时
                    _this.countDown();
                } else {
                    errorThrow(res);
                }

                wx.hideLoading(); 
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '正在加载中'
        });

        var _this = this;

        _this.setData({
            brandId: options.brandId,
            shareOpenId: options.shareOpenId
        })

        wx.getUserInfo({
            success: function (res) {
                var userInfo = res.userInfo
                var nickName = userInfo.nickName

                // 登录
                wx.login({
                    success: function (res) {
                        if (res.code) {
                            //发起网络请求
                            wx.request({
                                url: 'https://mdmj.devdexterity.com/api/default/login',
                                data: {
                                    code: res.code,
                                    userName: nickName
                                },
                                header: {
                                    'content-type': 'application/json' // 默认值
                                },
                                method: 'POST',
                                success: function (res) {
                                    if (res.data.code == 200) {
                                        _this.setData({
                                            'ownOpenId': res.data.data.open_id
                                        });

                                        _this.getInitData();
                                    } else {
                                        errorThrow(res);
                                    }                                  
                                }
                            })
                        } else {
                            console.log('登录失败！' + res.errMsg)
                        }
                    }
                });
            }
        })
    },
    countDown () {
        if (this.data.hasActive) {
            var html;
            var that = this;
            var times = (new Date(this.data.detailList.activeList.couponTime.replace(/-/ig, '/')).getTime() - new Date().getTime()) / 1000;
            var timer = null;
            timer = setInterval(function () {
                var day = 0,
                    hour = 0,
                    minute = 0,
                    second = 0;//时间默认值
                if (times > 0) {
                    day = Math.floor(times / (60 * 60 * 24));
                    hour = Math.floor(times / (60 * 60)) - (day * 24);
                    minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                }
                if (day <= 9) day = '0' + day;
                if (hour <= 9) hour = '0' + hour;
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;
                //
                html = '<text>' + day + '</text> 天'
                    + '<text>' + hour + '</text> 时'
                    + '<text>' + minute + '</text> 分'
                    + '<text>' + second + '</text> 秒';

                times--;

                that.setData({
                    'detailList.activeList.countDownDay': day,
                    'detailList.activeList.countDownHour': hour,
                    'detailList.activeList.countDownMinute': minute,
                    'detailList.activeList.countDownSecond': second
                })
            }, 1000);
            if (times <= 0) {
                clearInterval(timer);
            }

            that.setData({
                'detailList.activeList.active_forward_num': that.data.detailList.active_forward_num,
                'detailList.activeList.forward_gift_get_num': that.data.detailList.forward_gift_get_num,
                'detailList.activeList.active_status': that.data.detailList.active_status
                // 'detailList.activeList.active_status': 100 // 201未注册未参团 200 已注册未参团 100 已参团未分享 101 已参团已转发
            })
        }
    },
    // 未注册未参团
    showPop() {
        this.setData({
            'detailList.activeList.isShowPop': !this.data.detailList.activeList.isShowPop
        })
    },
    // 已注册未参团 
    joinGroup() {
        //发起网络请求
        var _this = this;
        wx.request({
            url: 'https://mdmj.devdexterity.com/api/store/join-team',
            data: {
                brandId: _this.data.brandId,
                openId: _this.data.ownOpenId
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                errorThrow(res);

                _this.getInitData();
            }
        })
    },
    // 获取验证码实时
    inputMobile(e) {
        this.setData({
            inputMobile: e.detail.value
        })
    },
    // 发送验证码
    sendCode() {
        var _this = this;
        var mobile = _this.data.inputMobile

        if (!mobile) {
            wx.showToast({
                title: '请输入手机号',
                icon: 'none'
            });
        } else if (!common.checkPhone(mobile)) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none'
            });
        } else {

            if (sendTime + 60000 > Date.now()) {
                wx.showToast({
                    title: '请60秒后重新发送',
                    icon: 'none'
                });

                return;
            }
            wx.request({
                url: 'https://mdmj.devdexterity.com/api/sms/send-code',
                data: {
                    mobile: mobile,
                    openId: _this.data.ownOpenId
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                method: 'POST',
                success: function (res) {
                    if (res.data.code == 200) {
                        wx.showToast({
                            title: '验证码已发送',
                            icon: 'none'
                        });

                        sendTime = Date.now();
                    } else {
                        errorThrow(res);
                    }
                }
            })
        }
    },
    // 提交信息
    formSubmit (e) {
        var target = e.detail.value;
        
        if (!target.iptname) {
            wx.showToast({
                title: '请输入真实姓名',
                icon: 'none'
            })
        } else if (!target.iptsex) {
            wx.showToast({
                title: '请输入您的性别',
                icon: 'none'
            })
        } else if (!target.iptmobile) {
            wx.showToast({
                title: '请输入您的手机号',
                icon: 'none'
            })
        } else if (!common.checkPhone(target.iptmobile)) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none'
            })
        } else if (!target.iptcode) {
            wx.showToast({
                title: '请输入验证码',
                icon: 'none'
            })
        } else if (!target.iptarea) {
            wx.showToast({
                title: '请输入您所在的小区名称',
                icon: 'none'
            })
        } else if (!target.ipthouse) {
            wx.showToast({
                title: '请输入您的完整房号',
                icon: 'none'
            })
        } else {
            this.ajaxSubmit(target);        
        }

    },
    ajaxSubmit(target) {
        //发起网络请求
        var _this = this;
        wx.request({
            url: 'https://mdmj.devdexterity.com/api/sms/validate-code',
            data: {
                mobile: target.iptmobile,
                code: target.iptcode,
                sex: target.iptsex, // 1: 男 2：女
                realname: target.iptname,
                area: target.iptarea, // 小区
                house: target.ipthouse, // 房号
                openId: _this.data.ownOpenId,
                brandId: _this.data.brandId
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            method: 'POST',
            success: function (res) {
                if (res.data.code == 200){
                    wx.showToast({
                        title: '报名成功',
                        icon: 'success',
                        duration: 2000
                    });

                    _this.getInitData();
                } else {
                    errorThrow(res);
                }
            }
        })
    },
    // 一键回到顶部
    goTop: function (e) {  
        if (wx.pageScrollTo) {
            wx.pageScrollTo({
                scrollTop: 0
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.videoContext = wx.createVideoContext('myVideo')
    },
    videoPlay(e) {
        this.setData({
            curr_id: e.currentTarget.dataset.id,
        })
        this.videoContext.play()
    },
    videoEnd(e) {
        this.setData({
            curr_id: ''
        })
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
    onShareAppMessage: function (res) {
        var _this = this;

        return {
            title: _this.data.shareTitle,
            path: '/pages/md/index/index?brandId=' + this.data.brandId + '&shareOpenId=' + this.data.ownOpenId,
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

// 错误异常提醒
function errorThrow(res) {
    wx.showToast({
        title: res.data.message,
        icon: 'none'
    })
}