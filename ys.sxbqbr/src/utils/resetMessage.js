

//重置message,防止重复点击重复弹出message弹框
//只解决了同时出现多个相同弹框，但是还是会出现重复弹框问题

import { Message } from 'element-ui'

let messageInstance = null;

const resetMessage = (options) => {
  if(messageInstance){
    messageInstance.close()
  }
  messageInstance = Message(options)
};
['success','error','info','warning'].forEach(type => {
  resetMessage[type] = options =>{
    if( typeof options === 'string'){
      options = {
        message : options
      }
    }
    options.type = type;
    return resetMessage(options);
  }
})



export const message = resetMessage