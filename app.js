
var modulesS1 = [
  { nom: "Analyse 1",            coef: 4, td: true,  tp: false },
  { nom: "Algèbre 1",            coef: 2, td: true,  tp: false },
  { nom: "ASD 1",                coef: 5, td: true,  tp: true  },
  { nom: "Structure Machine 1",  coef: 3, td: true,  tp: false },
  { nom: "Logiciels Libres",     coef: 1, td: false, tp: false },
  { nom: "Langue Étrangère",     coef: 1, td: false, tp: false },
  { nom: "Électricité Générale", coef: 2, td: true,  tp: false }
];

var modulesS2 = [
  { nom: "Analyse 2",                 coef: 4, td: true,  tp: false },
  { nom: "Algèbre 2",                 coef: 2, td: true,  tp: false },
  { nom: "ASD 2",                     coef: 5, td: true,  tp: true  },
  { nom: "Structure Machine 2",       coef: 3, td: true,  tp: false },
  { nom: "Logique Mathématique",      coef: 1, td: true,  tp: false },
  { nom: "Intro à l'IA",              coef: 1, td: false, tp: true  },
  { nom: "Électronique Fondamentale", coef: 2, td: true,  tp: false }
];
var modules = modulesS1;
function afficherTableau() {
  var corps = document.getElementById("corps");
  corps.innerHTML = "";
  for (var i = 0; i < modules.length; i++) {
    var ligne = "<tr>";
    ligne = ligne + "<td>" + modules[i].nom + "</td>";
    ligne = ligne + "<td><span class='badge'>" + modules[i].coef + "</span></td>";
    if (modules[i].td) {
      ligne = ligne + "<td><input type='number' class='note-input' id='td_" + i + "' min='0' max='20' step='0.25' placeholder='—'></td>";
    } else {
      ligne = ligne + "<td><span class='vide'>—</span></td>";
    }
    if (modules[i].tp) {
      ligne = ligne + "<td><input type='number' class='note-input' id='tp_" + i + "' min='0' max='20' step='0.25' placeholder='—'></td>";
    } else {
      ligne = ligne + "<td><span class='vide'>—</span></td>";
    }
    ligne = ligne + "<td><input type='number' class='note-input' id='exam_" + i + "' min='0' max='20' step='0.25' placeholder='—'></td>";
    ligne = ligne + "</tr>";
    corps.innerHTML = corps.innerHTML + ligne;
  }
  document.getElementById("resultat").style.display = "none";
}
document.getElementById("btnS1").addEventListener("click", function() {
  modules = modulesS1;
  document.getElementById("btnS1").className = "btn-sem actif";
  document.getElementById("btnS2").className = "btn-sem";
  afficherTableau();
});
document.getElementById("btnS2").addEventListener("click", function() {
  modules = modulesS2;
  document.getElementById("btnS2").className = "btn-sem actif";
  document.getElementById("btnS1").className = "btn-sem";
  afficherTableau();
});
document.getElementById("btnCalculer").addEventListener("click", function() {
  var totalPondere = 0;
  var totalCoef = 0;

  for (var i = 0; i < modules.length; i++) {

    var exam = parseFloat(document.getElementById("exam_"+ i).value);
    var td = 0;
    var tp = 0;
    if (modules[i].td) {
      td = parseFloat(document.getElementById("td_" + i).value);
    }
    if (modules[i].tp) {
      tp = parseFloat(document.getElementById("tp_" + i).value);
    }
    if (isNaN(exam) || exam < 0 || exam > 20) {
      alert("Note examen invalide : " + modules[i].nom);
      return;
    }
    if (modules[i].td) {
      if (isNaN(td) || td < 0 || td > 20) {
        alert("Note TD invalide : " + modules[i].nom);
        return;
      }
    }
    if (modules[i].tp) {
      if (isNaN(tp) || tp < 0 || tp > 20) {
        alert("Note TP invalide : " + modules[i].nom);
        return;
      }
    }
    var note = 0;
    if (modules[i].td && modules[i].tp) {
      note = ((td + tp) / 2) * 0.4 + exam * 0.6;
    } else if (modules[i].td) {
      note = td * 0.4 + exam * 0.6;
    } else if (modules[i].tp) {
      note = tp * 0.4 + exam * 0.6;
    } else {
      note = exam;
    }
    totalPondere = totalPondere + note * modules[i].coef;
    totalCoef = totalCoef + modules[i].coef;
  }
  var moyenne = totalPondere / totalCoef;
  afficherResultat(moyenne);
});
function afficherResultat(moyenne) {
  var affNote = document.getElementById("affNote");
  var affMention = document.getElementById("affMention");
  affNote.textContent = moyenne.toFixed(2) + " / 20";
  if (moyenne >= 16) {
    affNote.className = "res-note ok";
    affMention.textContent = "Very good";
    affMention.className = "res-mention ok";
  } else if (moyenne >= 14) {
    affNote.className = "res-note ok";
    affMention.textContent = "Good";
    affMention.className = "res-mention ok";
  } else if (moyenne >= 12) {
    affNote.className = "res-note ok";
    affMention.textContent = "Pretty good";
    affMention.className = "res-mention ok";
  } else if (moyenne >= 10) {
    affNote.className = "res-note warn";
    affMention.textContent = "Fair";
    affMention.className = "res-mention warn";
  } else {
    affNote.className = "res-note bad";
    affMention.textContent = "Not Validated";
    affMention.className = "res-mention bad";
  }
  var listeMods = document.getElementById("listeMods");
  listeMods.innerHTML = "";
  for (var i = 0; i < modules.length; i++) {
    var exam = parseFloat(document.getElementById("exam_" + i).value);
    var td = 0;
    var tp = 0;
    if (modules[i].td) {
      td = parseFloat(document.getElementById("td_" + i).value);
    }
    if (modules[i].tp) {
      tp = parseFloat(document.getElementById("tp_" + i).value);
    }
    var note = 0;
    if (modules[i].td && modules[i].tp) {
      note = ((td + tp) / 2) * 0.4 + exam * 0.6;
    } else if (modules[i].td) {
      note = td * 0.4 + exam * 0.6;
    } else if (modules[i].tp) {
      note = tp * 0.4 + exam * 0.6;
    } else {
      note = exam;
    }
    var couleur = "";
    if (note >= 12) {
      couleur = "ok";
    } else if (note >= 10) {
      couleur = "warn";
    } else {
      couleur = "bad";
    }
    var ligne = "<div class='mod-ligne'>";
    ligne = ligne + "<span class='mod-nom'>" + modules[i].nom + "</span>";
    ligne = ligne + "<span class='mod-val " + couleur + "'>" + note.toFixed(2) + " / 20</span>";
    ligne = ligne + "</div>";
    listeMods.innerHTML = listeMods.innerHTML + ligne;
  }
  document.getElementById("resultat").style.display = "block";
  document.getElementById("resultat").scrollIntoView({ behavior: "smooth", block: "nearest" });
}
document.getElementById("btnReset").addEventListener("click", function() {
  document.getElementById("resultat").style.display = "none";
  var inputs = document.getElementsByClassName("note-input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
});
afficherTableau();