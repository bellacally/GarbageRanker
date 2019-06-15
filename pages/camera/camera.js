
Page({
  data: {
    cameraOn: true,
    trashCategories: [
      { name: "dry", src: "/audios/dry.mp3",  },
      { name: "wet", src: "/audios/wet.mp3" },
      { name: "recyclable", src: "/audios/recyclable.mp3" },
      { name: "hazardous", src: "/audios/hazardous.mp3" },
    ]
  },

  shutterClicked: function() {
    let page = this;
    let audioList = page.data.audioList
    let camera = wx.createCameraContext();
    let audio = wx.createInnerAudioContext(); 
    camera.takePhoto({
      quality: 'high',
      success: (res) => {
        page.setData({
          cameraOn: false,
          imgUrl: res.tempImagePath
        })
        audio.autoplay = true
        audio.src = trashCategories[0].src
      }
    })
  }
})