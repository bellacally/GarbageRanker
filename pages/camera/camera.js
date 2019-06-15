let MyFile = new wx.BaaS.File()

Page({
  data: {
    cameraOn: true,
    trashCategories: [
      { name: "干垃圾", audioSrc: "/audios/dry.mp3", iconUrl: "/images/dry.png" },
      { name: "湿垃圾", audioSrc: "/audios/wet.mp3", iconUrl: "/images/wet.png" },
      { name: "可回收垃圾", audioSrc: "/audios/recyclable.mp3", iconUrl: "/images/recyclable.png" },
      { name: "有害垃圾", audioSrc: "/audios/hazardous.mp3", iconUrl: "/images/hazardous2.png" },
    ],
    iconUrl: '',
    imgUrl: '',
    showToast: false,
    showRetake: false
  },

  shutterClicked: function() {
    let page = this;
    let trashCategories = page.data.trashCategories;
    let camera = wx.createCameraContext();
    camera.takePhoto({
      quality: 'high',
      success: (res) => {
        page.setData({
          cameraOn: false,
          imgUrl: res.tempImagePath,
          showToast: true
        })
        let fileParams = { filePath: res.tempImagePath };
        let metaData = { categoryName: 'Garbage' };
        MyFile.upload(fileParams, metaData).then(res => {
          let imgPath = res.data.path
          page.classifyImage(imgPath);
        })
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
        let result = res.data.images[0].classifiers[0].classes[0].class
        let garbageCategory = self.data.trashCategories.find(t => (t.name === result))
        self.setData({
          iconUrl: garbageCategory.iconUrl
        })
        self.setData({
          showToast: false,
          showRetake: true,
        })
        let audioSrc = garbageCategory.audioSr
        self.playAudio(audioSrc);
      }
    })
  },

  retakePhoto: function () {
    this.setData({
      cameraOn: true, 
      iconUrl: '',
      showRetake: false,
      imgUrl: ''
    })
  },

  playAudio: function(audioPath) {
    let audio = wx.createInnerAudioContext(); 
    audio.autoplay = true;
    audio.src = audioPath;
  }
})