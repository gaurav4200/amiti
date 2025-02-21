function continueSignup() {
    let input = document.getElementById('userInput').value.trim();
    let errorMsg = document.getElementById('errorMsg');
    
    // Regular expressions for email and phone validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^[0-9]{10}$/;

    if (emailPattern.test(input) || phonePattern.test(input)) {
        errorMsg.textContent = "";
        alert('Proceeding with: ' + input);
        // Redirect or proceed with signup logic here
    } else {
        errorMsg.textContent = "Please enter a valid email or 10-digit phone number.";
    }
}

function googleSignup() {
    alert('Google Signup Clicked');
}
function appleSignup() {
    alert('Apple Signup Clicked');
}
function qrLogin() {
    alert('QR Login Clicked');
}