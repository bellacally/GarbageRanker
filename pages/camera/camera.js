let MyFile = new wx.BaaS.File()

Page({
  data: {
    cameraOn: true,
    trashCategories: [
      { name: "dry", audioSrc: "/audios/dry.mp3", garbageImgUrl: "/images/hazardous2.png" },
      { name: "wet", audioSrc: "/audios/wet.mp3" },
      { name: "recyclable", audioSrc: "/audios/recyclable.mp3" },
      { name: "hazardous", audioSrc: "/audios/hazardous.mp3" },
    ],
    garbageImgUrl: '', 
    result: ''
  },

  shutterClicked: function() {
    let page = this;
    let trashCategories = page.data.trashCategories;
    let camera = wx.createCameraContext();
    let audio = wx.createInnerAudioContext(); 
    camera.takePhoto({
      quality: 'high',
      success: (res) => {
        page.setData({
          cameraOn: false,
          imgUrl: res.tempImagePath,
          garbageImgUrl: trashCategories[0].garbageImgUrl
        })
        let fileParams = { filePath: res.tempImagePath };
        let metaData = { categoryName: 'Garbage' };
        MyFile.upload(fileParams, metaData).then(res => {
          let imgPath = res.data.path
          page.classifyImage(imgPath)
        })
        audio.autoplay = true;
        audio.src = trashCategories[0].audioSrc;
      }
    })
  },

  classifyImage: function(imgPath) {
    let self = this
    let url = 'http://localhost:3000/upload?imgPath=' + imgPath
    wx.request({
      url: url,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        imgUrl: imgPath
      },
      success(res) {
        console.log(res)
        self.setData({
          result: res.data.images[0].classifiers[0].classes[0].class
        })
      }
    })
  },

  openCamera: function () {
    this.setData({
      cameraOn: true, 
      result: ''
    })
  }
})