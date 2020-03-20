// miniprogram/pages/course/detail/index.js
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
    wx.cloud.database().collection('course').doc('1583079426863-443587').get().then(res => {
      this.setData({
        course: res.data
      })
    })

    wx.cloud.database().collection('user').doc('{openid}').get().then(res => {
      this.setData({
        user: res.data
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

  openFile(e) {
    // console.log(e.mark.index)
    let material = this.data.course.materials[e.mark.index]

    if (material.type == 'video') {

      this.setData({
        video: material.file
      })

    } else {

      wx.cloud.downloadFile({

        fileID: material.file,

        success: res => {
          // get temp file path
          console.log(res.tempFilePath)

          wx.openDocument({
            filePath: res.tempFilePath,
          })
        },

        fail: err => {
          // handle error
        }
      })

    }
  },

  async rollIn() {

    wx.cloud.database().collection('user').doc('{openid}').update({
      data: {
        isRolledIn: true
      }
    }).then(res => {
      this.data.user.isRolledIn = true
      this.setData({
        user: this.data.user
      })
    })

  }
})