var btnLogin = document.getElementById('btnLogin');
var inputEmail = document.getElementById('inputEmail');
var inputSenha = document.getElementById('inputSenha');
var msgLogin = document.getElementById('msgLogin');

btnLogin.addEventListener('click', function () {

    firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputSenha.value).then(function (result) {
        console.log("Success!");
        window.location.replace("user.html");
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;   
        console.log("Failure!");
        msgLogin.textContent = ('Email e/ou senha incorreto(s)')
    });

});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        location.replace("user.html");
    } else {
        var body = document.querySelector('body');
        body.style.display = "block";
    }
});
