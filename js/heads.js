function loadFile(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${url}:`, error));
}

function loadFiles() {
    const publications = [
        { url: './head.html/', elementId: 'head' },
        { url: './header.html', elementId: 'header' },
    ];

    publications.forEach(pub => loadFile(pub.url, pub.elementId));
}

// ページ読み込み時に外部ファイルを読み込む
window.onload = loadFiles;