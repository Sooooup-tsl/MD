// pages/md/index/index.js
let col1H = 0;
let col2H = 0;
Page({

    /**
     * 页面的初始数据
     */

    data: {
        brandId: '',
        imgurl: '../img', // 本地url
        detailList: {
            bannerUrls: [
                'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
            ],
            logoUrl: '../img/history_logo.jpg',
            title: '御格家居',
            desc: '专门为您定制最顶尖的时尚家居居居居居居专门为您定制最顶尖的时尚家居居居居居居',
            brandId: '123',
            addressList: [
                {
                    address: '江苏省苏州市吴中区红星美凯龙横塘店三楼B江苏省苏州市吴中区红星美凯龙横塘店三楼B座311-8商铺南侧江苏省苏州市吴中区红星美凯龙横塘店三楼B江苏省苏州市吴中区红星美凯龙横塘店三楼B座311-8商铺南侧',
                    phonenumber: '123456'
                },
                {
                    address: '江苏省苏州市吴中区红星美凯龙横塘店三楼B江苏省苏州市吴中区红星美凯龙横塘店三楼B座311-8商铺南侧江苏省苏州市吴中区红星美凯龙横塘店三楼B江苏省苏州市吴中区红星美凯龙横塘店三楼B座311-8商铺南侧',
                    phonenumber: '12345689'
                }
            ],
            addressLength: 2,
            tabList: {
                tabNameArr: ['产品', '门店', '案例', '视频'],
                // 产品
                productList: {
                    productArr: [
                        {
                            pic: "../img/p1.jpg",
                            title: '实木边几原木风格'
                        },
                        {
                            pic: "../img/p2.jpg",
                            title: 'MUJI 原木风格茶几抽屉柜'
                        },
                        {
                            pic: "../img/p3.jpg",
                            title: 'MUJI 无印良品带边柜水曲柳 实木 换鞋凳座椅棉质椅套'
                        },
                        {
                            pic: "../img/p4.jpg",
                            title: '棉麻简约窗帘'
                        },
                        {
                            pic: "../img/p5.jpg",
                            title: '布艺三人沙发'
                        },
                        {
                            pic: "../img/p6.jpg",
                            title: '布艺三人沙发'
                        },
                        {
                            pic: "../img/p7.jpg",
                            title: '布艺三人沙发'
                        },
                        {
                            pic: "../img/p8.jpg",
                            title: '布艺三人沙发'
                        },
                        {
                            pic: "../img/p9.jpg",
                            title: '布艺三人沙发'
                        }
                    ]
                },
                // 门店
                storeList: {
                    storeArr: [
                        {
                            title: '标题一',
                            desc: '描述由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                            imgurl: '../img/1.jpg'
                        },
                        {
                            title: '标题一',
                            desc: '描述由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                            imgurl: '../img/1.jpg'
                        }
                    ]
                },
                // 案例
                caseList: {
                    caseArr: [{
                        title: '标题一',
                        desc: '描述由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                        imgurls: [
                            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
                        ],
                        time: 1520001624360
                    }, {
                        title: '标题二',
                        desc: '描述由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                        imgurls: [
                            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
                            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
                        ],
                        time: 1519862400000
                    }]
                },
                // 视频
                videoList: {
                    videoArr: [
                        {
                            desc: '视频描述由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                            videourl: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
                        },
                        {
                            desc: '视频描述由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                            videourl: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
                        }
                    ]
                },
            }
        },
        showMore: false,
        limitNum: 1,
        currentTab: 0,

        imgWidth: 0,
        images: [],
        col1: [],
        col2: [],
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
    // 切换Tab
    changeTab(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.index
        })
    },
    // 预览案例图片
    previewImg(e) {
        // wx.showToast({
        //     title: '成功',
        //     icon: 'success',
        //     duration: 2000
        // })
        console.log(e)
        wx.previewImage({
            current: e.target.dataset.url, // 当前显示图片的http链接
            urls: e.target.dataset.imgs // 需要预览的图片http链接列表
        })
    },
    onImageLoad: function (e) {
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
        let images =  this.data.detailList.tabList.productList.productArr;
    console.log(images)
        let baseId = "img-" + (+new Date());

        for (let i = 0; i < images.length; i++) {
            images[i].id = baseId + "-" + i;
        }

        this.setData({
            images: images
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            brandId: options.brandId
        })
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;

                this.setData({
                    imgWidth: imgWidth
                });

                //加载首组图片
                this.loadImages();
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // this.videoContext = wx.createVideoContext('myVideo')
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
    onShareAppMessage: function () {

    }
})