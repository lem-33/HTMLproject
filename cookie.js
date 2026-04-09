function accepter() {
  localStorage.setItem("cookie", "ok");
  document.getElementById("overlay").style.display = "none";
}

function refuser() {
  document.getElementById("overlay").style.display = "none";
}
/*
window.onload = function() {
  if (localStorage.getItem("cookie") === "ok") {
    document.getElementById("overlay").style.display = "none";
  }
}*/
function changerBouton(btn, texte, classe) {
  btn.innerText = texte;

  btn.classList.remove("accept", "refuse"); // enlève les anciennes classes
  btn.classList.add(classe); // ajoute la nouvelle
}