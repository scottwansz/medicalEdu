// miniprogram/pages/user/list/index.js
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
    wx.cloud.database().collection('user').orderBy('createTime', 'desc').get().then(res => {
      let list = res.data

      // list.map(user => {
      //   let pn = user.phoneNumber.split('')
      //   pn.splice(3,4,'****')
      //   user.phoneNumber = pn.join('')
      //   return user
      // })

      this.setData({
        list
      })
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

  search(e){
    // console.log(e.detail)
    let value = e.detail.value
    wx.cloud.database().collection('user').where({
      phoneNumber: wx.cloud.database().RegExp({
        regexp: value,
        // options: 'i',
      })
    }).get().then(res => this.setData({
      list: res.data
    }))
  },

  setRollState(e) {
    // console.log('index:', e.mark.index)
    // console.log('e.detail.value: ', e.detail.value)

    let index = e.mark.index
    let user = this.data.list[index]
    let isRolledIn = e.detail.value

    wx.cloud.database().collection('user').doc(user._id).update({
      data: {
        isRolledIn
      }
    })
  }
})