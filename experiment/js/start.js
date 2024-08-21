// ダイアログを読み込む
function loadDialogs() {
    fetch('dialogs.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('dialog-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading dialogs:', error));
}
// ページ読み込み時に外部ファイルを読み込む
window.onload = loadDialogs;

// ボタン
document.getElementById('dialogButton').addEventListener('click', function () {
    generateRandomDialogs();
    // ボタンを非表示にする
    this.style.display = 'none';
});