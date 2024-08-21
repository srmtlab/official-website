// js/persona.js
// randomNames を sessionStorage から取得
function showPersona() {
    // ローカルストレージから "persona" の値を取得
    var value1 = localStorage.getItem('persona');
    console.log("this is persona", value1);

    // すべての対話例を非表示にする
    const allDialogs = document.querySelectorAll('div[id]');
    allDialogs.forEach(dialog => dialog.classList.add('hidden'));

    if (value1) {
        // value1 を JSON パースして配列に変換
        const personas = JSON.parse(value1);

        // 配列の各要素に対応するIDを持つ要素を表示
        personas.forEach(persona => {
            const selectedDialog = document.getElementById(persona);
            if (selectedDialog) {
                selectedDialog.classList.remove('hidden');
            } else {
                console.log("No matching dialog found for persona:", persona);
            }
        });
    } else {
        console.log("No persona value found in localStorage.");
    }
}