// pages/my/my.js
Page({
  data: {
    tab:"tomato",
    lists:{
      "本周四": [{time:'14:00',text:"哈哈哈哈nihaoy哈哈",id: 1},
      {time:'14:00',text:"哈哈哈哈nihaoy哈哈",id: 1},
      {time:'14:00',text:"哈哈哈哈nihaoy哈哈",id: 1}],
      "本周五": [{time:'14:00',text:"哈哈哈哈你好哇哈哈",id: 1}],
      "本周liu": [{time:'14:00',text:"哈哈很好的哈哈哈哈",id: 1}]
    }
  },


  onShow: function () {

  },


  changeTab(event){
   let name = event.currentTarget.dataset.name
   this.setData({tab: name})
  },
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

  }
})