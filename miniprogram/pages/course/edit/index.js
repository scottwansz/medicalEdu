// miniprogram/pages/course/edit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    file: '',
    material: {},
    course: {},

    showNewMaterial: false
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

    wx.cloud.database().collection('courseMaterial').orderBy('nbr', 'desc').get().then(res => {
      this.setData({
        materials: res.data
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

  async addMaterial(e) {
    // console.log('form new Material 发生了submit事件，携带数据为：', e.detail.value)

    let material = e.detail.value

    let { fileID } = await wx.cloud.uploadFile({

      cloudPath: `${this.data.course._id}/${Date.now()}.${material.file.split('.').pop()}`, // 上传至云端的路径
      filePath: material.file, // 小程序临时文件路径

    })

    material.file = fileID
    material.courseId = this.data.course._id

    let {_id} = wx.cloud.database().collection('courseMaterial').add({ data: material })

    material._id = _id

    this.data.materials.push(material)

    this.setData({
      showNewMaterial: false,
      materials: this.data.materials,
      material: {},
      file: null
    })

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
      data
    }).then(res => {

      wx.hideLoading()

      wx.showToast({
        title: 'Data saved',
      })
    })

  },

  showNewMaterial() {
    this.setData({
      showNewMaterial: !this.data.showNewMaterial
    })
  }
})