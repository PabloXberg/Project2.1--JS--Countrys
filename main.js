
const africheckCheckbox = document.getElementById("africheck");    ///  VARIABLES DECLARADAS
const amecheckCheckbox = document.getElementById("amecheck");
const asiacheckCheckbox = document.getElementById("asiacheck");
const eurocheckCheckbox = document.getElementById("eurocheck");
const oceacheckCheckbox = document.getElementById("oceacheck");
let Selected = ""; 

const table = document.getElementById("tabla");
                                            

africheckCheckbox.addEventListener("click", function(e) {
  e.stopPropagation()
  console.log(e.target)
  if (africheckCheckbox.checked) {
    table.style.display = 'table';
    Selected = "Africa"; 
    ShowTable (Selected);
  } else {
    table.style.display = 'none';
    Selected = ""; 
    location. reload();
  }
});

amecheckCheckbox.addEventListener("click", function(e) {
  e.stopPropagation()
  console.log(e.target)
    if (amecheckCheckbox.checked) {
    table.style.display = 'table';
    Selected = "Americas"; 
    ShowTable (Selected);
  } else {
    table.style.display = 'none';
    Selected = ""; 
    location. reload();
  }
});

asiacheckCheckbox.addEventListener("click", function(e) {
  e.stopPropagation()
  console.log(e.target)
  if (asiacheckCheckbox.checked) {
    table.style.display = 'table';
    Selected = "Asia"; 
    ShowTable (Selected);
  } else {
    table.style.display = 'none';
    Selected = ""; 
    location. reload();
  }
});
eurocheckCheckbox.addEventListener("click", function(e) {
  e.stopPropagation()
  console.log(e.target)
  if (eurocheckCheckbox.checked) {
    table.style.display = 'table';
    Selected = "Europe"; 
    ShowTable (Selected);
  } else {
    table.style.display = 'none';
    Selected = ""; 
    location. reload();
  }
});
oceacheckCheckbox.addEventListener("click", function(e) {
  e.stopPropagation();
  console.log(e.target)
    if (oceacheckCheckbox.checked) {
    table.style.display = 'table';
    Selected = "Oceania"; 
    ShowTable (Selected);
     } else {
    table.style.display = 'none';
    Selected = ""; 
    location. reload();
  }
});


function ShowTable (selected) {                                 // SHOW THE TABLE ON INDEX
const table = document.querySelector("tbody");

  for(let i = 0; i < AllCountries.length; i++) {
    const region = AllCountries[i].region;
 
    if (selected === region){ 
      const row = document.createElement("tr");
      table.appendChild(row);
      const nameCell = document.createElement("td");
      nameCell.innerHTML = AllCountries[i].name.common;
      const lenguage = document.createElement("td");
      lenguage.innerHTML = AllCountries[i].lenguage;
      const popCell = document.createElement("td");
      popCell.innerHTML = AllCountries[i].population
      const capitalCell = document.createElement("td");
      capitalCell.innerHTML = AllCountries[i].capital;
      const flagCell =  document.createElement("td");

      const flagImg = document.createElement("img");
      flagImg.setAttribute("src", AllCountries[i].flags.png);
      flagImg.setAttribute("alt", AllCountries[i].flags.alt);
      flagImg.setAttribute("Style",   "height: 4rem", "width: auto") ;

      flagCell.appendChild(flagImg);
      row.append(nameCell, lenguage, popCell, capitalCell, flagCell);
    }
  }
}

