// miniprogram/pages/course/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: -1, // selected couse index from course list page
    isTaken: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index
    let course = getApp().globalData.courseList[index]

    this.setData({
      index,
      course
    })

    wx.cloud.database().collection('myCourse').doc(course._id).get().then(
      this.setData({
        isTaken: true
      })
    ).catch(err => {
      this.setData({
        isTaken: false
      })
    }
    )
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

  async takeCourse() {
    let _id = this.data.course._id
    let data = { courseId: this.data.course._id }
    wx.cloud.database().collection('myCourse').doc(_id).set({ data }).then(console.log)

    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})