// miniprogram/pages/account/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('user').doc('{openid}').get().then(res => this.setData({
      user: res.data
    })).catch(err => console.log)
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

    if (this.data.user) {
      wx.cloud.database().collection('user').doc('{openid}').update({
        data: {
          userInfo
        }
      }).then(res => {
        this.setData({
          user: {...user, userInfo}
        })
      })

    } else {
      wx.cloud.database().collection('user').doc('{openid}').set({
        data: {
          userInfo
        }
      }).then(res => {
        this.setData({
          user: {userInfo}
        })
      })
    }
  },

  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let user = e.detail.value

    if (this.data.user) { // 修改

      wx.cloud.database().collection('user').doc('{openid}').update({ data: user }).then(res => wx.navigateBack({
        complete: (res) => { },
      }))

    } else {  // 新增
      user.createTime = user.createTime ? user.createTime : new Date()

      wx.cloud.database().collection('user').doc('{openid}').set({
        data: user
      }).then(res => {
        wx.navigateBack({
          complete: (res) => { },
        })
      })
    }
  },

})