// miniprogram/pages/course/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myOpenId: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {

    console.log('>>>> get open id in page course: ', getApp().getOpenId())

    let myOpenId = await getApp().getOpenId()
    this.setData({
      myOpenId
    })

    wx.cloud.database().collection('course').get().then(result => {
      // console.log(result.data)
      getApp().globalData.courseList = result.data
      this.setData({
        list: result.data
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})