document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();

    if(email === "" || pass === ""){
        alert("Please fill all fields");
        return;
    }

    // fake login
    alert("Login Successful!");
});
document.getElementById("loginForm").addEventListener("submit", function(e){
    // ... login logic ...
    window.location.href = '/index.html'; // This runs ONLY when the submit event fires
});
