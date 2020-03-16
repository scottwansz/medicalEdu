// miniprogram/pages/test/list/index.js
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
    let courseId = '1583079426863-443587' // options.courseId

    this.setData({
      courseId
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
    // console.log('>>> onshow of test list page.')
    let courseId = this.data.courseId
    wx.cloud.database().collection('test').where({ courseId }).get().then(result => this.setData({ list: result.data }))
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

  delete(e){
    let index = e.mark.index
    let question = this.data.list[index]
    let _this = this
    
    wx.showModal({
      cancelColor: 'cancelColor',
      title: `Are you sure to delete this record # ${index + 1}?`,
      success(res){
        if(res.confirm){
          wx.cloud.database().collection('test').doc(question._id).remove()
          wx.cloud.database().collection('testAnswer').doc(question._id).remove()
          _this.data.list.splice(index,1)

          _this.setData({
            list: _this.data.list
          })
        }
      }
    })
  }
})