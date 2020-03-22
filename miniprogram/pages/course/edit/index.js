// miniprogram/pages/course/edit/index.js
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

    wx.cloud.database().collection('course').doc('1583079426863-443587').get().then(result => {
      this.setData({
        // myOpenId,
        course: result.data
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
    wx.cloud.database().collection('courseMaterial').orderBy('nbr', 'asc').get().then(res => {
      this.setData({
        materials: res.data
      })
    })
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

  deleteMaterial(e) {

    let index = e.mark.index
    let material = this.data.materials[index]

    wx.showModal({
      title: 'Are you sure to delete Material #' + material.nbr,
      success(res) {
        if (res.cancel) return
      }
    })

    this.data.materials.splice(index, 1)

    this.setData({
      materials: this.data.materials
    })

    wx.cloud.database().collection('courseMaterial').doc(material._id).remove()

    // 删除文件

    wx.cloud.deleteFile({
      fileList: [material.file]
    })

  },

  async saveCourse(e) {

    wx.showLoading()

    let _id = this.data.course._id ? this.data.course._id : `${Date.now()}-${Math.floor(Math.random() * 1000000)}`

    wx.cloud.database().collection('course').doc(_id).set({
      data: e.detail.value
    }).then(res => {

      wx.hideLoading()

      wx.showToast({
        title: 'Data saved',
      })
    })

  },

})