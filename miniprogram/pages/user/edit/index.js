// miniprogram/pages/account/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gotoUrl: '/pages/course/detail/index'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    options.from == 'myAccount' ? this.data.gotoUrl = '/pages/account/index/index' : null

    wx.cloud.database().collection('user').doc('{openid}').get().then(res => {

      this.setData({
        user: res.data
      })

    }).catch(err => console.log)
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

  formSubmit: function (e) {

    let user = e.detail.value

    // 检查数据的有效性

    let errorList = []
    user.name ? '' : errorList.push('Name is required')
    user.email ? '' : errorList.push('Email is required')
    user.phoneNumber ? '' : errorList.push('Phone number is requiered')

    const RegExp=/^(.+)@(.+)$/;
    user.email && user.email.match(RegExp) ? '' : errorList.push('Email error format')

    if(errorList.length){

      this.setData({
        errorList
      })

      return
    }

    user.profileOK = true

    wx.cloud.database().collection('user').doc('{openid}').update({ data: user }).then(res => {
      wx.switchTab({
        url: this.data.gotoUrl,
      })
    })

  },

  delete(){
    wx.cloud.database().collection('user').doc('{openid}').remove().then(res => {
      wx.navigateBack({
        complete: (res) => {},
      })
    })
  }

})