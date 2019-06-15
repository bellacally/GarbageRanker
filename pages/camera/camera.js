
Page({
  data: {
    cameraOn: true
  },

  shutterClicked: function() {
    let page = this
    let camera = wx.createCameraContext()
    camera.takePhoto({
      quality: 'high',
      success: (res) => {
        page.setData({
          cameraOn: false,
          imgUrl: res.tempImagePath
        })
        // this.setData({
        //   src: res.tempImagePath,//保存拍摄路径
        // })
      }
    })

  }
})