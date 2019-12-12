var firebaseConfig = {
  apiKey: "AIzaSyAfgjSwZ6q_1aCFNXlEhJv_vyltl2qD-lI",
  authDomain: "mymoto-9f776.firebaseapp.com",
  databaseURL: "https://mymoto-9f776.firebaseio.com",
  projectId: "mymoto-9f776",
  storageBucket: "mymoto-9f776.appspot.com",
  messagingSenderId: "74704005722",
  appId: "1:74704005722:web:9d6b1ea47ac201a1"
};
firebase.initializeApp(firebaseConfig);

var items = document.getElementById('items');
var auth = firebase.auth();
const database = firebase.database().ref();
const refPed = database.child('pendentes');
var data = new Date;
let info = document.getElementById('info');
let user = document.getElementById('user');

function exibir() {
	info.innerHTML = "";
	info.innerHTML = "<thead><tr><th>Nome</th><th>Cor da moto</th><th>Placa</th><th>CNH</th><th>Opções</th></tr></thead>";

	refPed.on("child_added", data => {
		dados = data.val();
		id = data.key;
		console.log("dados" + data);
		info.innerHTML += "<tbody><tr>" +
			"<th class='th-body'><h4 class='mt-h4'><strong>" + dados.nome + "</strong></h4></th>" +
			"<th class='th-body'><h4 class='mt-h4'><strong>" + dados.cor + "</strong></h4></th>" +
			"<th class='th-body'><h4 class='mt-h4'><strong>" + dados.placa + "</strong></h4></th>" +
			"<th>" + "<img src=" + dados.cnh_image + " class='img-table'>" + "</th>" +
			"<th>" + "<button class='default-button iconContent-tableMotoDanger' id=" + id + " onclick='recusar(this.id)'><i class='fas fa-times'></i></button>" +
			"<button class='default-button iconContent-tableMotoSuccess' id=" + id + " onclick='aceitar(this.id)'><i class='fas fa-check'></i></button>" + "</th>" +
			"</tr></tbody>";
	});
}

function aceitar(i) {
	var refId = refPed.child(i);
	refId.on("value", data => {
		dados = data.val();
		console.log(dados);

		firebase.database().ref('motoristas/' + i).set({
			nome: dados.nome,
			cor: dados.cor,
			placa: dados.placa,
			perfil: "",
			cnh_image: dados.cnh_image,
			corridas: 0,
			avaliacao: 0
		}).then(function () {
			alert("Motorista aceito");
			refId.remove();
			exibir();
		});
	});
}

function recusar(i) {
	var refId = refPed.child(i);
	refId.on("value", data => {
		dados = data.val();
		auth.signInWithEmailAndPassword(dados.email, dados.senha).then(function () {
			var user = firebase.auth().currentUser;
			user.delete().then(function () {
				console.log("usuario deletado");
				$.ajax({
					method: "POST",
					url: "email/recusado.php",
					data: {
						email: dados.email,
						nome: dados.nome
					}
				}).done(function (msg) {
					alert("Data Saved: " + msg);
				});
				refId.remove()
				exibir();
			}).catch(console.log("não deletou"));
		}).catch(console.log("não conectou"));
	});
}