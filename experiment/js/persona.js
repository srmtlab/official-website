// js/persona.js
// randomNames を sessionStorage から取得
function showPersona() {
    var value1 = localStorage.getItem('persona')
    console.log("this is persona", value1); // ここで randomNames を使って何かを処理する
    // value1と一致するIDを持つ要素を探して表示する
    if (value1) {
        const selectedDialog = document.getElementById(value1);
        if (selectedDialog) {
            selectedDialog.classList.remove('hidden');
        } else {
            console.log("No matching dialog found for persona:", value1);
        }
    } else {
        console.log("No persona value found in localStorage.");
    }
}