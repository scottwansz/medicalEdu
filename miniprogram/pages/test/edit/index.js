// miniprogram/pages/test/edit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: {},
    answer: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let courseId = options.courseId
    let questionId = options.questionId ? options.questionId : `${Date.now()}-${Math.floor(Math.random()*10000)}`
    this.setData({
      courseId,
      questionId
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

  checkboxChange: function (e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let answer =  e.detail.value

    this.setData({
      answer
    })
  },

  formSubmit(e){
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let data = e.detail.value
    data.courseId = this.data.courseId

    wx.cloud.database().collection('test').doc(this.data.questionId).set({data})
    wx.cloud.database().collection('testAnswer').doc(this.data.questionId).set({data: {answer: this.data.answer}})
  }
})