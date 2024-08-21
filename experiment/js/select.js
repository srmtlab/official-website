//　対話をランダムに表示する
function generateRandomDialogs() {
    const names = ['Endo', 'Ito', 'Iwahashi', 'Kato', 'Kawashima', 'Kobayashi', 'Matsumoto', 'Mizutani', 'Nakamura', 'Osaki', 'Sakai', 'Sato', 'Takahashi', 'Takayama', 'Tanaka', 'Yamamoto'];
    // const names = ['Endo', 'Ito', 'Iwahashi', 'Kato'];
    const models = ['A', 'B', 'C'];
    const randomNames = [];
    const randomModels = [];
    const selectedDialogs = [];

    // 名前リストからランダムに3つを選ぶ
    while (randomNames.length < 3) {
        const randName = names[Math.floor(Math.random() * names.length)];
        if (!randomNames.includes(randName)) {
            randomNames.push(randName);
        }
    }

    // 選ばれた名前を localStorage に保存
    localStorage.setItem('persona', JSON.stringify(randomNames));
    console.log("this is persona", randomNames); // ここで randomNames を使って何かを処理する
    console.log(localStorage);

    // モデルリストをシャッフルしてrandomModelsに追加
    for (let i = models.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [models[i], models[j]] = [models[j], models[i]];
    }
    randomModels.push(...models);

    // 選ばれた名前とシャッフルされたモデルの組み合わせを作る
    for (let i = 0; i < 3; i++) {
        const dialogId = 'dialog_' + randomModels[i] + '_' + randomNames[i];
        selectedDialogs.push(dialogId);
    }

    // すべての対話例を非表示にする
    const allDialogs = document.querySelectorAll('#dialog-container > div');
    allDialogs.forEach(dialog => dialog.classList.add('hidden'));

    // 選ばれた対話例を表示し、適切な位置に移動する
    const dialogContainer = document.getElementById('dialog-container');
    selectedDialogs.forEach(dialogId => {
        const dialogElement = document.getElementById(dialogId);
        dialogElement.classList.remove('hidden');
        dialogContainer.appendChild(dialogElement);  // 対話をコンテナの最後に移動
    });
}