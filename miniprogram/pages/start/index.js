// miniprogram/pages/start/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '/pages/user/edit/index'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.cloud.database().collection('user').doc('{openid}').get().then(res => {

      let user = res.data

      this.setData({
        user
      })

      let url = user.profileOK ? '/pages/course/detail/index' : '/pages/user/edit/index'

      setTimeout(() => {
        wx.navigateTo({
          url
        })

        wx.switchTab({
          url
        })
      }, 1000)

    }).catch(err => console.log)
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

  getUserInfo(e) {
    let userInfo = e.detail.userInfo

    wx.cloud.database().collection('user').doc('{openid}').set({
      data: {
        userInfo
      }
    }).then(res => {
      this.setData({
        user: { userInfo }
      })

      wx.navigateTo({
        url: '/pages/user/edit/index',
      })
    })
  },

})