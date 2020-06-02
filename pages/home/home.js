// pages/home/home.js
Page({

  data: {
    lists: [
      {
        id:1,
        text:"bigfih你好h",
        finished:true
      },
      {
        id:2,
        text:"biffgfih你好ffh",
        finished:true
      },
      {
        id:3,
        text:"bafafgagfih你好好发放哪里接",
        finished:false
      },
      {
        id:4,
        text:"bafafgabafafgagfih你好好发放哪里接fih",
        finished:true
      },
      {
        id:5,
        text:"bafafgabafafgagfih你好好发放哪里接gfih",
        finished:false
      },
      {
        id:6,
        text:"bafafgabafafgagfih你好好发放哪里接fih",
        finished:true
      },
      {
        id:7,
        text:"bafafgabafafgagfih你好好发放哪里接gfih",
        finished:false
      }
    ],
    visibleConfirm:true
  },
  confirm(event){
    console.log(event.detail)
  },
  cancel(event){
    this.setData({visible:false})
  },
  createConfirm(event){
    
    let content =  event.detail
    if(content){
      let todo = [{id: this.data.lists.length + 1 ,text: content, fininshed: false}]
      this.data.lists  = todo.concat(this.data.lists)
      this.setData({lists: this.data.lists})
      this.hideConfirm()

    }
  },
  destroyToDo(event){
     let index = event.currentTarget.dataset.index
     this.data.lists[index].finished = true
     this.setData({lists: this.data.lists})
  },
  hideConfirm(){
    this.setData({visibleConfirm:false})
  },
  showConfirm(){
    this.setData({visibleConfirm:true})
  }
})