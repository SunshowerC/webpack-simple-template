import hello from "script/hello"
import 'style/main.scss'

document.querySelector('#hello').innerHTML = `背景已转成base64 编码`
let c = {c: 'c', d: 'd'};

/*测试transform-object-rest-spread插件*/
let test = {
    a: 'a',
    ...c
}
console.log('transform-object-rest-spread', test)


/*测试请求代理转发*/
fetch('/api/list')
.then(response => {

    response.json()
}).then(data => {
    console.log(data);
}).catch(error => {
    console.log(error)
})





