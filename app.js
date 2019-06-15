App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo,
      wx.requestPayment)

    let clientID = '336b7fb1f464395ef159'
    wx.BaaS.init(clientID)

    wx.BaaS.auth.loginWithWechat().then(user => {
      console.log(user)
    }, err => {
      console.log(err)
    })
  }
})