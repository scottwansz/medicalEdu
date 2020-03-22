// miniprogram/pages/courseMaterial/edit/index.js
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

    if (options._id) {
      this.setData({
        materialId: options._id
      })
    }

    if (options.courseId) {
      this.setData({
        courseId: options.courseId
      })
    }

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
    if (this.data.materialId) {
      wx.cloud.database().collection('courseMaterial').doc(this.data.materialId).get().then(res => this.setData({ material: res.data }))
    }
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

  upload() {
    const _this = this
    wx.chooseMessageFile({
      count: 1,

      success(res) {

        // console.log('>>> res of file choose: ', res)
        const file = res.tempFiles[0]

        if (file.type == 'video' || (file.type == 'file' && file.name.indexOf('.pdf' != -1))) {

          _this.setData({
            file
          })

        } else {

          wx.showToast({
            title: 'Only video and PDF file support',
            duration: 2000,
            mask: true
          })

        }
      }
    })
  },


  async saveMaterial(e) {
    // console.log('form new Material 发生了submit事件，携带数据为：', e.detail.value)

    let material = e.detail.value

    if (this.data.file) {

      // delete the old file if exist
      if (this.data.material && this.data.material.file) {
        wx.cloud.deleteFile({ fileList: [this.data.material.file] })
      }

      let { fileID } = await wx.cloud.uploadFile({

        cloudPath: `${this.data.courseId || this.data.material.courseId}/${Date.now()}.${this.data.file.name.split('.').pop()}`, // 上传至云端的路径
        filePath: this.data.file.path, // 小程序临时文件路径

      })

      material.file = fileID
      material.type = this.data.file.type
    }


    if (this.data.courseId) { // add a new one

      material.courseId = this.data.courseId

      // let _id = this.data.material ? this.data.material._id : `${Date.now()}-${Math.floor(Math.random()*10000)}`

      wx.cloud.database().collection('courseMaterial').add({ data: material }).then(wx.navigateBack({
        complete: (res) => { },
      }))

    } else {  // update a old one

      wx.cloud.database().collection('courseMaterial').doc(this.data.material._id).update({ data: material }).then(wx.navigateBack({
        complete: (res) => { },
      }))

    }

  },

})