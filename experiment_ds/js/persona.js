// js/persona.js
function showPersona() {
    // ローカルストレージから "persona" の値を取得
    var selectedPersonas = localStorage.getItem('persona');

    // 取得した文字列を配列に変換
    try {
        selectedPersonas = JSON.parse(selectedPersonas);
        if (!Array.isArray(selectedPersonas)) {
            selectedPersonas = [];
        }
    } catch (e) {
        selectedPersonas = [];
    }

    console.log("this is persona", selectedPersonas);

    // 選ばれたペルソナの組み合わせを作る
    for (let i = 0; i < 3; i++) {
        const personaId = selectedPersonas[i];
        selectedPersonas.push(personaId);
    }

    // すべてのペルソナを非表示にする
    const allPersonas = document.querySelectorAll('#persona-container > div');
    allPersonas.forEach(persona => persona.classList.add('hidden'));

    // 選ばれたペルソナを表示し、適切な位置に移動する
    const personaContainer = document.getElementById('persona-container');
    selectedPersonas.forEach(personaId => {
        const personaElement = document.getElementById(personaId);
        if (personaElement) {
            personaElement.classList.remove('hidden');
            personaContainer.appendChild(personaElement);  // 対話をコンテナの最後に移動
        }
    });
}
