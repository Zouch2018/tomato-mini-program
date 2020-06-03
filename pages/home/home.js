// pages/home/home.js
const {http} = require('../../lib/http.js')

Page({
  updateId:'',
  updateIndex:'',
  data: {
    lists: [],
    visibleCreateConfirm:false,
    visibleUpdateConfirm: false,
    updateContent:''
  },
  onShow(){
    //获取todo
    http.get('/todos?completed=false').then(response => {
      console.log('get',response)
      this.setData({lists: response.response.data.resources})
    })
  },
// 创建todo
  createConfirm(event){
    
    let content =  event.detail
    if(content){
      http.post('/todos',{
          completed: false, 
          description: content        
      }).then(response => {
        console.log('返回',response)
        let todo = [response.response.data.resource]
        this.data.lists  = todo.concat(this.data.lists)
        this.setData({lists: this.data.lists})
        this.hideCreateConfirm()
      })
    }
  },
  changeText(event){
    let {content,id,index} = event.currentTarget.dataset
    this.updateId = id
    this.updateIndex = index
    this.setData({visibleUpdateConfirm:true,updateContent: content}) 
  },
  updateConfirm(event){
    let content = event.detail
    http.put(`/todos/${this.updateId}`,{
      description:content
    }).then(response => {
      console.log('update',response)
      let todo = response.response.data.resource
      this.data.lists[this.updateIndex] = todo
      console.log(this.data.lists)
      this.setData({lists:this.data.lists})
      this.hideUpdateConfirm()
    })
  },
  // 更新todo完成状态
  destroyToDo(event){
     let index = event.currentTarget.dataset.index
     let id =  event.currentTarget.dataset.id
     http.put(`/todos/${id}`,{completed:true}).then(response =>{
       let todo = response.response.data.resource
       this.data.lists[index] = todo
       this.setData({lists:this.data.lists})
     })
  },
  hideCreateConfirm(){
    this.setData({visibleCreateConfirm:false})
  },
  showCreateConfirm(){
    this.setData({visibleCreateConfirm:true})
  },
  hideUpdateConfirm(){
    this.setData({visibleUpdateConfirm:false})
  },
})