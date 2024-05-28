document.getElementById('bookmarkForm').addEventListener('submit', addBookmark);
document.getElementById('name').addEventListener('input', validateForm);
document.getElementById('url').addEventListener('input', validateForm);

function addBookmark(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const url = document.getElementById('url').value;

    if (!validateUrl(url)) {
        alert('Please enter a valid URL');
        return;
    }

    const bookmark = {
        name,
        url
    };

    if (localStorage.getItem('bookmarks') === null) {
        const bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('bookmarkForm').reset();
    document.getElementById('addBtn').disabled = true;

    fetchBookmarks();
}

function deleteBookmark(url) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.url !== url);

    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

    fetchBookmarks();
}

function fetchBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    const bookmarksTable = document.querySelector('tbody');

    bookmarksTable.innerHTML = '';

    bookmarks.forEach(bookmark => {
        const row = bookmarksTable.insertRow();

        const nameCell = row.insertCell(0);
        const urlCell = row.insertCell(1);
        const actionsCell = row.insertCell(2);

        nameCell.textContent = bookmark.name;
        urlCell.textContent = bookmark.url;

        const visitButton = document.createElement('button');
        visitButton.textContent = 'Visit';
        visitButton.classList.add('btn', 'btn-success', 'btn-sm', 'me-2');
        visitButton.onclick = () => window.open(bookmark.url, '_blank');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.onclick = () => deleteBookmark(bookmark.url);

        actionsCell.appendChild(visitButton);
        actionsCell.appendChild(deleteButton);
    });
}

function validateUrl(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
}

function validateForm() {
    const name = document.getElementById('name').value;
    const url = document.getElementById('url').value;
    document.getElementById('addBtn').disabled = !(name && validateUrl(url));
}

function validateForm() {
    const name = document.getElementById('name').value;
    const url = document.getElementById('url').value;
    const validationMessage = document.getElementById('validationMessage');

    if (!name || !url) {
        validationMessage.innerText = 'Please fill out all fields';
        document.getElementById('addBtn').disabled = true;
    } else if (!validateUrl(url)) {
        validationMessage.innerText = 'Please enter a valid URL';
        document.getElementById('addBtn').disabled = true;
    } else {
        validationMessage.innerText = '';
        document.getElementById('addBtn').disabled = false;
    }
}
fetchBookmarks();

