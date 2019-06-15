// pages/landing/landing.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {},

  takePic: function () {
    wx.redirectTo({
      url: "../camera/camera"
    }); 
  
  },
  uploadPic: function () {
    // wx.redirectTo({
    //   url: "../camera/camera"
    // });
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    wx.request({
      url: 'http://localhost:3000/upload?imgUrl=https://cloud-minapp-28140.cloud.ifanrusercontent.com/1hc4YSm10Iwm8jeu.jpg',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        imgUrl: 'https://cloud-minapp-28140.cloud.ifanrusercontent.com/1hc4YSm10Iwm8jeu.jpg'
      },
      success(res) {
        console.log(res)
      }
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})