// js/persona.js
function showPersona() {
    // 対話履歴を復元する
    restoreDialogHistory();
    
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

// 対話履歴を復元する
function restoreDialogHistory() {
    // localStorageからselectedDialogsを取得
    const savedDialogs = localStorage.getItem('selectedDialogs');
    if (!savedDialogs) {
        console.log("No dialog history to restore");
        return;
    }
    
    let selectedDialogs;
    try {
        selectedDialogs = JSON.parse(savedDialogs);
    } catch (e) {
        console.error("Error parsing selectedDialogs:", e);
        return;
    }
    
    if (!Array.isArray(selectedDialogs) || selectedDialogs.length === 0) {
        console.log("No valid dialog history to restore");
        return;
    }
    
    const dialogContainer = document.getElementById('dialog-container');
    if (!dialogContainer) {
        console.error("Dialog container not found");
        return;
    }
    
    // すべての対話を表示
    selectedDialogs.forEach(dialogId => {
        const dialogElement = document.getElementById(dialogId);
        if (dialogElement) {
            // hiddenクラスを削除して表示
            dialogElement.classList.remove('hidden');
            
            // コンテナに追加（既に追加されている場合は移動）
            if (dialogElement.parentNode !== dialogContainer) {
                dialogContainer.appendChild(dialogElement);
            }
        } else {
            console.warn(`Dialog element not found: ${dialogId}`);
        }
    });
    
    console.log("Dialog history restored:", selectedDialogs);
}
