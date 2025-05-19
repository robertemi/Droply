function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    
    
    if (!email || !password) {
        document.getElementById('errorMessage').style.display = 'block';
        return; // Stop if fields are empty
    }

    // logica pentru verificarea credentialelor de user in BD
    // trimite la flask, flasku cauta in BD

    window.location.href = '../main/main.html';
}

// Add click event as fallback (optional)
document.querySelector('button[type="submit"]').addEventListener('click', function(e) {
    console.log("Button clicked - form should submit");
});