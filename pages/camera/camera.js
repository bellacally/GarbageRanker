
Page({
  data: {
    cameraOn: true,
    trashCategories: [
      { name: "dry", audioSrc: "/audios/dry.mp3", garbageImgUrl: "/images/hazardous.png" },
      { name: "wet", audioSrc: "/audios/wet.mp3" },
      { name: "recyclable", audioSrc: "/audios/recyclable.mp3" },
      { name: "hazardous", audioSrc: "/audios/hazardous.mp3" },
    ],
    garbageImgUrl: ''
  },

  shutterClicked: function() {
    let page = this;
    let trashCategories = page.data.trashCategories
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
        audio.autoplay = true
        audio.src = trashCategories[0].audioSrc
      }
    })
  }
})