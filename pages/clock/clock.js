// pages/clock/clock.js
const {http} = require('../../lib/http.js');

Page({

  data: {
    defaultTime: 1500,
    time: '',
    timer:null,
    timerStatus: 'stop',
    confirmVisible: false,
    againButtonVisible: false,
    finishConfirmVisible: false,
    clock:{}
  },

  onShow: function () {
    this.startTimer()
    http.post('/tomatoes').then(response =>{
      this.setData({clock:response.response.data.resource})
      
    })
  },
  startTimer(){
    this.setData({timerStatus: 'start'})
    
    this.changeTime()
    this.data.timer = setInterval(()=>{
      this.data.defaultTime -= 1
      this.changeTime() 
      if(this.data.defaultTime ===0){
        this.setData({againButtonVisible: true})
       return this.clearTimer()
      }
    },1000)
    this.changeTime()
  },
  againTimer(){
    this.data.defaultTime = 1500
    this.setData({againButtonVisible:false})
    this.startTimer()
  },


  clearTimer(){
    clearInterval(this.data.timer)
    this.data.timer = null
    this.setData({timerStatus: 'stop'})
  },
  changeTime(){
    let m = Math.floor(this.data.defaultTime/60) + ''
    let s = Math.floor(this.data.defaultTime%60) + ''
    if(s==='0'){s = '00'}
    if(s.length === 1){ s = '0' + s}
    if(m.length === 1){ m = '0' + m}
  
    this.setData({time: `${m}:${s}`})
  },
  showConfirm(){
    this.setData({confirmVisible:true})
    this.clearTimer()
  },
  hideConfirm(){
    this.setData({confirmVisible:false})
    this.startTimer()
  },
  //放弃番茄todo
  confirmAbandon(event){
    let content = event.detail
    http.put(`/tomatoes/${this.data.clock.id}`,{
      description: content,
      aborted:true
    }).then(response => {
      wx.navigateBack({to: -1})
    })
  },
  confirmFinish(event){

  },
  confirmCancel(){
    this.setData({finishConfirmVisible:false})
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.clearTimer()
    http.put(`/tomatoes/${this.data.clock.id}`,{
      description: "退出放弃",
      aborted: true
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.clearTimer()
    http.put(`/tomatoes/${this.data.clock.id}`,{
      description: "退出放弃",
      aborted: true
    })
  },

  
})