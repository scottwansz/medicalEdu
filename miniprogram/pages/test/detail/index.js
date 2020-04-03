// miniprogram/pages/test/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    answer: [],
    answerList: [],
    score: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.cloud.database().collection('user').where({ _openid: '{openid}' }).get().then(res => this.setData({ score: res.data[0].score }))

    let courseId = '1583079426863-443587'
    wx.cloud.database().collection('test').get()
      .then(res => this.setData({ list: res.data, question: res.data[0] }))

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

  previous() {
    this.data.answerList[this.data.index] = {
      questionId: this.data.question._id,
      answer: this.data.answer
    }

    let index = this.data.index - 1
    this.resetData(index)
  },

  async next() {
    this.data.answerList[this.data.index] = {
      questionId: this.data.question._id,
      answer: this.data.answer || []
    }

    if (this.data.index == this.data.list.length - 1) {

      wx.showLoading({
        title: 'Saving your answers',
      })

      // 统计分数
      let correctCount = 0

      // 比较答案
      for (const item of this.data.answerList) {
        let questionId = item.questionId
        let result = await wx.cloud.database().collection('testAnswer').doc(questionId).get()
        // console.log(result)
        // console.log(result.data.answer.sort().join())
        // console.log(item.answer.sort().join())
        if (result.data.answer.sort().join() == item.answer.sort().join()) {
          item.isCorrect = true
          correctCount++
        }
      }

      // 保存数据
      // let id = `${Date.now()}-${Math.floor(Math.random() * 100000)}`
      let score = Math.floor(correctCount / this.data.answerList.length * 100)

      if (!this.data.score || this.data.score < score) {
        wx.cloud.database().collection('user').doc('{openid}').update({ data: { score } })
      }

      wx.cloud.database().collection('score').add({
        data: {
          courseId: this.data.question.courseId,
          answerList: this.data.answerList,
          createdAt: new Date(),
          score //  : Math.floor(correctCount / this.data.answerList.length * 100)
        }
      }).then(result => {

        wx.hideLoading({
          complete: (res) => { },
        })

        wx.switchTab({
          url: '/pages/account/index/index',
        })
      })
    }

    let index = this.data.index + 1
    this.resetData(index)
  },

  resetData(index) {
    let question = this.data.list[index]
    let answer = this.data.answerList[index] ? this.data.answerList[index].answer : []
    // console.log("answer: ", answer)
    let answerChecked = {
      'A': answer.indexOf('A') >= 0 ? true : false,
      'B': answer.indexOf('B') >= 0 ? true : false,
      'C': answer.indexOf('C') >= 0 ? true : false,
      'D': answer.indexOf('D') >= 0 ? true : false
    }

    this.setData({
      index,
      question,
      answer,
      answerChecked
    })
  },

  checkboxChange(e) {
    // console.log('>>> checkbox change: ', e.detail.value)
    this.setData({
      answer: e.detail.value
    })
  }
})