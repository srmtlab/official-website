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
        showConfirmationDialog(index);
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

// 確認ダイアログを表示
function showConfirmationDialog(index) {
    // 既存の確認ダイアログを削除
    const existingDialog = document.getElementById('confirmation-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    // 確認ダイアログを作成
    const dialogOverlay = document.createElement('div');
    dialogOverlay.id = 'confirmation-dialog';
    dialogOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const dialogBox = document.createElement('div');
    dialogBox.className = 'bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl';
    
    const title = document.createElement('h3');
    title.className = 'text-xl font-semibold mb-4 text-gray-800';
    title.textContent = '確認';
    
    const message = document.createElement('p');
    message.className = 'text-gray-700 mb-6';
    message.textContent = '評価は終えましたか？はいを押すとこの対話は表示されなくなります。';
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex justify-end space-x-3';
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors';
    cancelButton.textContent = 'いいえ';
    cancelButton.addEventListener('click', function() {
        dialogOverlay.remove();
    });
    
    const confirmButton = document.createElement('button');
    confirmButton.className = 'px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors';
    confirmButton.textContent = 'はい';
    confirmButton.addEventListener('click', function() {
        dialogOverlay.remove();
        currentDialogIndex++;
        showNextDialog();
        // スクロールを確実に実行するため、少し待ってから実行
        setTimeout(() => {
            scrollToDialogStart();
        }, 200);
    });
    
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(confirmButton);
    
    dialogBox.appendChild(title);
    dialogBox.appendChild(message);
    dialogBox.appendChild(buttonContainer);
    dialogOverlay.appendChild(dialogBox);
    
    document.body.appendChild(dialogOverlay);
}

// 対話の開始部分にスクロール
function scrollToDialogStart() {
    if (currentDialogIndex < selectedDialogs.length) {
        const dialogId = selectedDialogs[currentDialogIndex];
        const dialogElement = document.getElementById(dialogId);
        
        if (dialogElement) {
            const dialogTitle = dialogElement.querySelector('h2');
            if (dialogTitle) {
                // 要素の位置を取得
                const rect = dialogTitle.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetY = rect.top + scrollTop - 20; // 20px上に余裕を持たせる
                
                window.scrollTo({
                    top: targetY,
                    behavior: 'smooth'
                });
            } else {
                // h2が見つからない場合は、対話要素自体にスクロール
                const rect = dialogElement.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetY = rect.top + scrollTop - 20;
                
                window.scrollTo({
                    top: targetY,
                    behavior: 'smooth'
                });
            }
        }
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