// This script tests if JavaScript files are being served with the correct MIME type
console.log('MIME test script loaded successfully!');

function testMimeType() {
  const result = document.getElementById('mime-test-result');
  if (result) {
    result.innerHTML = 'JavaScript MIME type is working correctly!';
    result.style.color = 'green';
  }
}

// Run the test when the script loads
window.addEventListener('DOMContentLoaded', function() {
  testMimeType();
});
