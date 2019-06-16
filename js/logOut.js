var btnLogOut = document.getElementById('btnLogOut');

btnLogOut.addEventListener('click', function () {
    firebase.auth().signOut().then(function() {
        window.location.replace("index.html");
    }).catch(function(error) {
        alert("Algo Deu Errado", error);
    });
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var body = document.querySelector('body');
        body.style.display = "block";
    } else {
        location.replace("index.html");
    }
  });

