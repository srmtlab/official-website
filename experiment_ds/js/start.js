// start.js
// ダイアログを読み込む
function loadDialogs() {
    fetch('dialogs.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('dialog-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading dialogs:', error));
    fetch('persona.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('persona-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading personas:', error));
}
// ページ読み込み時に外部ファイルを読み込む
window.onload = loadDialogs;

// ボタン
document.getElementById('dialogButton').addEventListener('click', function () {
    // ボタンを非表示にする
    this.style.display = 'none';
    generateRandomDialogs();
});

document.getElementById('personaButton').addEventListener('click', function () {
    // ボタンを非表示にする
    this.style.display = 'none';
    showPersona();
});