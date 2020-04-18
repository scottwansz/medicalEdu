//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {}

    wx.cloud.database().collection('user').doc('{openid}').get().then(res => {

      wx.switchTab({
        url: '/pages/course/detail/index',
      })
    }).catch(err => wx.navigateTo({
      url: '/pages/user/edit/index',
    }))
  },

  getOpenId() {

    if (!this.globalData.openid) {

      return wx.cloud.callFunction({

        name: 'login',
        data: {},

      }).then(res => {

        // console.log('>>>> get openid from app(): ', res.result.openid)
        this.globalData.openid = res.result.openid
        return res.result.openid

      })

    } else {

      return this.globalData.openid
    }
  },

  getCourseList() {

    if (this.globalData.courseList) return this.globalData.courseList

    return wx.cloud.database().collection('course').orderBy('createdAt', 'desc').get().then(result => {
      this.globalData.courseList = result.data
      return this.globalData.courseList
    })

  },

  getCourseMore() {

    let skip = this.globalData.courseList.length

    return wx.cloud.database().collection('course').orderBy('createdAt', 'desc').skip(skip).get().then(result => {
      this.globalData.courseList.push(...result.data)
      return this.globalData.courseList
    })

  },

})