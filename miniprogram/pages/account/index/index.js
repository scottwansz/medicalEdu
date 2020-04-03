// miniprogram/pages/course/myCourse/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // avatarUrl: './user-unlogin.png',
    // userInfo: {},
    // logged: false,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })

    let { data } = await wx.cloud.database().collection('score').get()

    data.map(item => {
      item.createDate = new Date(item.createdAt).toLocaleString()
    })

    this.setData({
      list: data
    })

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
    wx.cloud.database().collection('user').doc('{openid}').get().then(res => this.setData({ user: res.data }))
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

  },

  // onGetUserInfo: function (e) {

  //   let userInfo = e.detail.userInfo

  //   if (!this.data.logged && userInfo) {

  //     wx.cloud.database().collection('user').doc('{openid}').update({
  //       data: userInfo
  //     })

  //     this.setData({
  //       logged: true,
  //       avatarUrl: userInfo.avatarUrl,
  //       userInfo
  //     })
  //   }
  // },


  applyCertification() {
    wx.cloud.database().collection('user').doc('{openid}').update({
      data: { crtRequested: true }
    }).then(wx.showToast({
      title: 'Certification apply successed.',
    }))
  }


})