// js/persona.js
// randomNames を sessionStorage から取得
const randomNames = JSON.parse(sessionStorage.getItem('randomNames'));


console.log("this is persona" ,randomNames); // ここで randomNames を使って何かを処理する
