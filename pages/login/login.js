const {http} = require('../../lib/http.js')
const {app_id, app_secret} = getApp().globalData

Page({
  data: {

  },
  //点击按钮--调用小程序原生的wx.login -- 参数 -- http.post--user
  login(event){
    console.log(event)
    let encrypted_data = event.detail.encryptedData
    let iv = event.detail.iv
   
    this.wxLogin(encrypted_data, iv)
    
  },
  wxLogin(encrypted_data, iv){
    wx.login({
      success:res=>{
        let code = res.code 
        this.onGetCode(code, iv, encrypted_data)
      } 
      
    })
  },

  onGetCode(code,iv,encrypted_data){
    console.log('getcode')
    http.post('/sign_in/mini_program_user',{
      code,
      iv,
      encrypted_data,
      app_id,
      app_secret,
    }).then(response => {
      console.log(response)
      this.saveMessage(response)
      wx.reLaunch({
        url: "/pages/home/home"
      })

    })
    },
  saveMessage(response){

    wx.setStorageSync('my',response.response.data.resource)
    wx.setStorageSync('X-token',response.response.header['X-token'])
  }


 
})