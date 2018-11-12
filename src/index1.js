import {chunk1} from './chunk1'
import {chunk2} from './chunk2'
import {chunk3} from './chunk3'
import './chunk4'
import {indexChunk1} from './indexChunk1'

function component() {
    var element = document.createElement('div');
  
    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = chunk1+chunk2+chunk3+indexChunk1
  
    return element;
}
  
document.body.appendChild(component());