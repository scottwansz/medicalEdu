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
  onLoad: function(options) {

    getApp().getOpenId().then(myOpenId => {

      // console.log('>>> openid get in onload of course list page: ', myOpenId)

      this.setData({
        myOpenId
      })

    })


    // wx.cloud.database().collection('course').get().then(result => {
    //   // console.log(result.data)
    //   getApp().globalData.courseList = result.data

    //   this.setData({
    //     list: result.data
    //   })
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {

    // console.log('>>>> onshow in course list page.')
    wx.cloud.database().collection('course').orderBy('createdAt', 'desc').get().then(result => {
      getApp().globalData.courseList = result.data
      this.setData({
        list: result.data
      })
    })

    // let list = await getApp().getCourseList()

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

  delete(e) {
    // console.log('>>> delete index in course list page: ', e.mark.index)
    wx.showLoading({
      title: 'deleting ...',
    })

    let index = e.mark.index
    let course = this.data.list[index]

    let _this = this

    wx.showModal({
      title: 'Warning',
      content: `Are your to delet course ${course.name} ?`,
      async success(res) {
        if (res.confirm) {
          // console.log('>>> confirmed the delete of course')

          // delete the course material files
          let fileList = course.materials.reduce(function(accumulator, current) {
            // console.log('>>> current of material lis: ', current.file)
            // console.log('>>> accumulator of reduce in course list: ', accumulator)
            accumulator.push(current.file)
            return accumulator
          }, [])

          // console.log('>>>> files of course to delecte: ', fileList)

          let result = await wx.cloud.deleteFile({
            fileList
          })

          // console.log('>>> result of files delte in course list: ', result)

          wx.cloud.database().collection('course').doc(course._id).remove().then(res => {
            // console.log('>>> res from course remove in course list page: ', res)
            _this.data.list.splice(index, 1)
            _this.setData({
              list: _this.data.list
            })

            wx.hideLoading()

            wx.showToast({
              title: 'Course deleted',
            })
          })
        }
      }
    })
  },


  showDetail(e) {
    console.log(e.mark)

    wx.navigateTo({
      url: `/pages/course/detail/index?index=${e.mark.index}`,
    })
  },

  // test(){
  //   wx.cloud.database().collection('course').add({data:{}}).then(console.log)
  // }

})