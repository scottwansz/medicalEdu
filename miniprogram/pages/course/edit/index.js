// miniprogram/pages/course/edit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newFile: '',
    newMaterial: {},
    newMaterialList: [],
    course: {},

    showNewMaterial: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    console.log(getApp().globalData.courseList)
    let index = options.index
    let course = index >= 0 ? getApp().globalData.courseList[index] : {}
    this.setData({
      course
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

  },

  upload() {
    const _this = this
    wx.chooseImage({
      success(res) {
        const newFile = res.tempFilePaths[0]
        _this.setData({
          newFile
        })
      }
    })
  },

  addMaterial(e) {
    console.log('form new Material 发生了submit事件，携带数据为：', e.detail.value)
    let newMaterial = e.detail.value
    this.data.newMaterialList.push(newMaterial)
    this.setData({
      showNewMaterial: false
    })
  },

  saveCourse(e) {
    console.log('form Cousr 发生了submit事件，携带数据为：', e.detail.value)
    let data = e.detail.value

    wx.showLoading()
    wx.cloud.database().collection('course').add({
      data
    }).then(result => {
      console.log(result)
      wx.hideLoading()
    })
  },

  showNewMaterial() {
    this.setData({
      showNewMaterial: !this.data.showNewMaterial
    })
  }
})