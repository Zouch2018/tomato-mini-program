// pages/my/my.js
const {http} = require('../../lib/http.js');
Page({
  data: {
    tab:"tomato",
    tomatoes:{},
    todos:{}
  },
  onShow: function () {
    this.fetchClock()
    this.fetchTodos()
   
  },
  fetchClock(){
    http.get('/tomatoes',{
      is_group: "yes"
    }).then(response =>{
      this.setData({tomatoes: response.response.data.resources})
      console.log(response)
    })
  },
  fetchTodos(){
    http.get('/todos',{
      is_group: "yes"
    }).then(response =>{
      this.setData({todos: response.response.data.resources})
    })
  },

  changeTab(event){
   let name = event.currentTarget.dataset.name
   this.setData({tab: name})
  }
})