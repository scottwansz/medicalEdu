// miniprogram/pages/course/edit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    file: '',
    newMaterialList: [],
    materialDeleted: [],
    course: {},

    showNewMaterial: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    // console.log(getApp().globalData.courseList)

    let myOpenId = getApp().getOpenId()

    let index = options.index
    let course = index >= 0 ? getApp().globalData.courseList[index] : {}

    this.setData({
      myOpenId,
      index,
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
        // console.log('>>> res of file choose: ', res)
        const file = res.tempFilePaths[0]
        _this.setData({
          file
        })
      }
    })
  },

  addMaterial(e) {
    // console.log('form new Material 发生了submit事件，携带数据为：', e.detail.value)

    let newMaterial = e.detail.value
    this.data.newMaterialList.push(newMaterial)
    this.data.file = null

    this.setData({
      showNewMaterial: false,
      newMaterialList: this.data.newMaterialList
    })
  },

  deleteOldMaterial(e){
    
    let index = e.mark.index
    let material = this.data.course.materials[index]
    // console.log('>>>> the old material going to delete: ', material)

    this.data.materialDeleted.push(material)

    this.data.course.materials.splice(index, 1)
    this.setData({
      course: this.data.course
    })
  },

  async saveCourse(e) {

    // console.log('form Cousr 发生了submit事件，携带数据为：', e.detail.value)
    wx.showLoading()

    let courseId = this.data.course._id

    // 先保存新加的文件

    for (const item of this.data.newMaterialList) {

      if (!item.file) return

      let res = await wx.cloud.uploadFile({
        cloudPath: `${courseId}/${Date.now()}.${item.file.split('.').pop()}`, // 上传至云端的路径
        filePath: item.file, // 小程序临时文件路径
      })

      // console.log('>>> res of upload file: ', res.fileID)
      item.file = res.fileID
    }

    // 删除文件

    let fileList = this.data.materialDeleted.reduce(function (accumulator, current) {
      accumulator.push(current.file)
      return accumulator
    }, [])

    // console.log('>>>> files of course to delecte: ', fileList)

    let result = await wx.cloud.deleteFile({
      fileList
    })

    // 组装更新的的课程数据

    // console.log('>>> material save result: ', materialSaveResult)

    let _id = this.data.course._id ? this.data.course._id : `${Date.now()}-${Math.floor(Math.random() * 1000000)}`

    let data = e.detail.value
    data.createdAt = this.data.course.createdAt ? this.data.course.createdAt : Date.now()

    // console.log('>>>> course id in course edit onload: ', _id)

    if (this.data.course.materials) {

      this.data.course.materials.push(...this.data.newMaterialList)
      data.materials = this.data.course.materials

    } else {
      data.materials = this.data.newMaterialList
    }

    // console.log('>>>> data going to save in course edit: ', data)

    // 保存数据

    wx.cloud.database().collection('course').doc(_id).set({
      data
    }).then(result => {

      // console.log(result)
      let list = getApp().globalData.courseList
      data._openid = this.data.myOpenId

      if (this.data.index >= 0) {

        list.splice(this.data.index, 1, data)

      } else {

        list.unshift(data)
      }

      // console.log('>>> global course list got from edit page: ', getApp().globalData.courseList)

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