import hello from "script/hello"
import 'style/main.scss'

document.querySelector('#hello').innerHTML = `Hello ${hello.name}!`


fetch('/api/list')
.then(response => response.json() )
.then(data => {
    console.error(data);
})





