// 対話を順番に表示するための変数
let selectedDialogs = [];
let currentDialogIndex = 0;

//　対話をランダムに選択し、1つずつ順番に表示する
function generateRandomDialogs() {
    const names = ['Endo', 'Ito', 'Iwahashi', 'Kato', 'Kawashima', 'Kobayashi', 'Matsumoto', 'Mizutani', 'Nakamura', 'Osaki', 'Sakai', 'Sato', 'Takahashi', 'Takayama', 'Tanaka', 'Yamamoto'];
    const models = ['A', 'B', 'C'];
    const randomNames = [];
    const randomModels = [];
    selectedDialogs = [];
    currentDialogIndex = 0;

    // 名前リストからランダムに3つを選ぶ
    while (randomNames.length < 3) {
        const randName = names[Math.floor(Math.random() * names.length)];
        if (!randomNames.includes(randName)) {
            randomNames.push(randName);
        }
    }

    // 選ばれた名前を localStorage に保存
    localStorage.setItem('persona', JSON.stringify(randomNames));
    console.log("this is select", localStorage);

    // モデルリストをシャッフルしてrandomModelsに追加
    const shuffledModels = [...models];
    for (let i = shuffledModels.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledModels[i], shuffledModels[j]] = [shuffledModels[j], shuffledModels[i]];
    }

    // 選ばれた名前とシャッフルされたモデルの組み合わせを作る
    for (let i = 0; i < 3; i++) {
        const dialogId = 'dialog_' + shuffledModels[i] + '_' + randomNames[i];
        selectedDialogs.push(dialogId);
    }

    // selectedDialogsをlocalStorageに保存
    localStorage.setItem('selectedDialogs', JSON.stringify(selectedDialogs));

    // すべての対話を非表示にする
    const allDialogs = document.querySelectorAll('[id^="dialog_"]');
    allDialogs.forEach(dialog => dialog.classList.add('hidden'));

    // 最初の対話を表示
    showNextDialog();
}

// 次の対話を表示する
function showNextDialog() {
    // 既存のボタンを削除
    const existingButtons = document.querySelectorAll('.next-dialog-button-container');
    existingButtons.forEach(btn => btn.remove());
    
    // すべての対話を非表示にする
    const allDialogs = document.querySelectorAll('[id^="dialog_"]');
    allDialogs.forEach(dialog => dialog.classList.add('hidden'));

    const dialogContainer = document.getElementById('dialog-container');
    
    if (currentDialogIndex < selectedDialogs.length) {
        // 現在の対話を表示
        const dialogId = selectedDialogs[currentDialogIndex];
        const dialogElement = document.getElementById(dialogId);
        
        if (dialogElement) {
            dialogElement.classList.remove('hidden');
            dialogContainer.appendChild(dialogElement);
            
            // 少し待ってからボタンを追加（DOMが更新された後）
            setTimeout(() => {
                addNextButton(dialogElement, currentDialogIndex);
            }, 100);
        }
    } else {
        // すべての対話が終わったら「作業３を始める」ボタンを表示
        showPersonaButton();
    }
}

// 「次の対話へ」ボタンを追加
function addNextButton(dialogElement, index) {
    // 対話要素の次の要素（[対話#X 終了]のh2タグ）を探す
    let nextElement = dialogElement.nextElementSibling;
    while (nextElement && !nextElement.textContent.includes('終了')) {
        nextElement = nextElement.nextElementSibling;
    }
    
    // 見つからない場合は、対話要素の親要素内で探す
    if (!nextElement) {
        const parent = dialogElement.parentElement;
        if (parent) {
            const siblings = Array.from(parent.children);
            const dialogIndex = siblings.indexOf(dialogElement);
            for (let i = dialogIndex + 1; i < siblings.length; i++) {
                if (siblings[i].textContent && siblings[i].textContent.includes('終了')) {
                    nextElement = siblings[i];
                    break;
                }
            }
        }
    }
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'next-dialog-button-container mt-6 mb-4 text-center';
    
    const button = document.createElement('button');
    button.className = 'next-dialog-button bg-green-500 text-white py-2 px-6 rounded hover:bg-green-700 transition-colors';
    button.textContent = index < selectedDialogs.length - 1 ? '次の対話へ' : 'すべての対話を完了';
    
    button.addEventListener('click', function() {
        currentDialogIndex++;
        showNextDialog();
    });
    
    buttonContainer.appendChild(button);
    
    // 終了h2タグの後にボタンを追加
    if (nextElement && nextElement.parentNode) {
        nextElement.parentNode.insertBefore(buttonContainer, nextElement.nextSibling);
    } else if (dialogElement.parentNode) {
        dialogElement.parentNode.appendChild(buttonContainer);
    } else {
        document.getElementById('dialog-container').appendChild(buttonContainer);
    }
}

// 「作業３を始める」ボタンを表示
function showPersonaButton() {
    const personaButton = document.getElementById('personaButton');
    const separator = document.querySelector('div');
    
    // セパレーターのテキストを探す
    let separatorDiv = null;
    const allDivs = document.querySelectorAll('div');
    for (let div of allDivs) {
        if (div.textContent && div.textContent.includes('========以下は作業２が終わってから========')) {
            separatorDiv = div;
            break;
        }
    }
    
    if (personaButton) {
        personaButton.style.display = 'block';
        
        // 完了メッセージを追加
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bg-green-50 p-4 rounded-lg mb-4 border-l-4 border-green-500';
        messageDiv.innerHTML = '<p class="text-green-800 font-semibold">✅ すべての対話が完了しました。作業３に進んでください。</p>';
        
        const dialogContainer = document.getElementById('dialog-container');
        if (separatorDiv && separatorDiv.parentNode) {
            separatorDiv.parentNode.insertBefore(messageDiv, separatorDiv);
        } else {
            dialogContainer.appendChild(messageDiv);
        }
    }
}