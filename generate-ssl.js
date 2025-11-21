// Generate self-signed SSL certificates for local development
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const sslDir = path.join(__dirname, 'ssl');

// Create ssl directory if it doesn't exist
if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir);
  console.log('Created ssl directory');
}

try {
  // Generate self-signed certificate
  execSync(`openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/CN=localhost"`, {
    stdio: 'inherit'
  });
  console.log('✓ SSL certificates generated successfully!');
  console.log('  - ssl/key.pem');
  console.log('  - ssl/cert.pem');
} catch (error) {
  console.error('Error generating certificates. Make sure OpenSSL is installed.');
  console.error('For Windows: Download from https://slproweb.com/products/Win32OpenSSL.html');
  process.exit(1);
}
