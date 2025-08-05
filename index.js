
document.getElementById('signinForm').addEventListener('submit', function(e) {
e.preventDefault();

const email = document.getElementById('email').value.trim();
const password = document.getElementById('password').value.trim();

if (email && password) {
    // Redirect to dashboard
    window.location.href = 'dash.html';
} else {
    alert("Please fill in both fields.");
}
});

