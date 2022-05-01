function text() {
  console.log(11111)
}
import imgSrc from './assets/logo.png'
let imgBox = document.createElement('img')
imgBox.src = imgSrc
document.body.appendChild(imgBox)
import imgSrc2 from './assets/asset-asset.svg'
let imgBoxSvg = document.createElement('img')
imgBoxSvg.style.cssText = 'width: 100px; height: 100px;background: #ccc;'
imgBoxSvg.src = imgSrc2
document.body.appendChild(imgBoxSvg)

import texts from './example.txt'
let txtBox = document.createElement('div')
txtBox.classList.add('bg-img')
txtBox.style.cssText = 'width: 100px; height: 100px;background: yellow;'
txtBox.textContent = texts
document.body.appendChild(txtBox)

import './index.css'
import './index.scss'

text()
const a = (arr) => {
  return arr.map(e=> e==2)
}
console.log(a([1, 2, 3]));

const button = document.createElement('button')
button.textContent = 'Click me and check the console!'
button.addEventListener('click',() => {
  // 这个数字可以定义文件名 webpackPrefetch 预加载 webpackPreload
  import(/* webpackChunkName: 'math', webpackPrefetch: true */'./another.js').then(({ twoSum, minus }) => {
    console.log(twoSum(1, 2)) // 3);
    console.log(minus(3, 2)) // 3);
  })
})
document.body.appendChild(button)