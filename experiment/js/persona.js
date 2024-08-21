// js/persona.js
// randomNames を sessionStorage から取得
function showPersona() {
    // ローカルストレージから "persona" の値を取得
    var selectedPersonas = localStorage.getItem('persona');
    console.log("this is persona", selectedPersonas);

    // 選ばれたペルソナの組み合わせを作る
    for (let i = 0; i < 3; i++) {
        const personaId = selectedPersonas[i];
        selectedPersonas.push(personaId);
    }

    // すべてのペルソナを非表示にする
    const allPersonas = document.querySelectorAll('#persona-container > div');
    allPersona.forEach(persona => persona.classList.add('hidden'));

    // 選ばれたペルソナを表示し、適切な位置に移動する
    const personaContainer = document.getElementById('persona-container');
    allPersonas.forEach(persona => persona.classList.add('hidden'));
    selectedPersonas.forEach(personaId => {
        const personaElement = document.getElementById(personaId);
        personaElement.classList.remove('hidden');
        personaContainer.appendChild(personaElement);  // 対話をコンテナの最後に移動
    });
}