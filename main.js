function getCountries () {
  fetch("https://restcountries.com/v3.1/all")
  .then(function(response) {
    // console.log("response: ", response);
    return response.json();
  })
  .then(function(result) {
    // console.log("result: ", result);
    // buildTable(result);
    const region = checked();
    console.log (region);
    // ShowTable(result, region);
    // mapExampleFunction(result);
    // findBorderBRAincludes(result);
    // findBorderBRAfilter(result);
  })
  .catch(function(error) {
    console.log(error);
    alert(error);
  })
}
getCountries();





// const dinner = new Promise(function(res, rej) {
//   const dinnertime = "dinner is not ready";
//   if (dinnertime === "dinner is ready") {
//     res("guten appetit")
//   } else {
//     rej("let's order pizza")
//   }
// })

// dinner.then(function(res) {
//   console.log(res);
// }).catch(function(rej) {
//   console.log(rej)
// })



// const table = document.querySelector("tbody");

// function buildTable (Countries) {
//   const table = document.querySelector("tbody");
//   for(let i = 0; i < Countries.length; i++) {
//     const row = document.createElement("tr");
//     table.appendChild(row);
//     const nameCell = document.createElement("td");
//     nameCell.innerHTML = Countries[i].name.common;
//     const aufDeuCell = document.createElement("td");
//     aufDeuCell.innerHTML = Countries[i].translations.deu.common;
//     const popCell = document.createElement("td");
//     popCell.innerHTML = Countries[i].population
//     const capitalCell = document.createElement("td");
//     capitalCell.innerHTML = Countries[i].capital[0];
//     const flagCell =  document.createElement("td");
//     flagCell.setAttribute("style", "text-align: center")

//     const flagImg = document.createElement("img");
//     flagImg.setAttribute("src", Countries[i].flags.png);
//     flagImg.setAttribute("alt", Countries[i].flags.alt);

//     flagCell.appendChild(flagImg);

//     row.append(nameCell, aufDeuCell, popCell, capitalCell, flagCell);
//   }
// }

const ShowTable = (countries, region) => {
  const table = document.querySelector("tbody");
  table.innerHTML = "";
  countries.forEach((country) => {
     
    console.log("countries:", countries[1].region);

    const row = document.createElement("tr");
    table.appendChild(row);
    const nameCell = document.createElement("td");
    nameCell.innerHTML = country.name.common;
    const aufDeuCell = document.createElement("td");
    aufDeuCell.innerHTML = country.translations.deu.common;
    const popCell = document.createElement("td");
    popCell.innerHTML = country.population;
    const capitalCell = document.createElement("td");
    capitalCell.innerHTML = country.capital;
    const flagCell =  document.createElement("td");
    flagCell.setAttribute("style", "text-align: center")

    const flagImg = document.createElement("img");
    flagImg.setAttribute("src", country.flags.png);
    flagImg.setAttribute("alt", country.flags.alt);

    flagCell.appendChild(flagImg);

    const linkCell = document.createElement("td");
    const link = document.createElement("a");
    link.setAttribute("href", `details.html?name=${country.name.common}`);
    link.innerHTML = "see more..";
    linkCell.appendChild(link)

    row.append(nameCell, aufDeuCell, popCell, capitalCell, flagCell, linkCell);
    })
  }


// const mapExampleFunction = (countries) => {
//   const mapResult = countries.map((country, i) => {
//     return {...country, arrayIndex: i}
//   })
//   console.log("map result: ", mapResult);
// }

// const findBorderBRAincludes = (countries) => {
//   const resultCountries = [];
//   countries.forEach((country) => {
//     console.log(country.borders);
//     if (country.borders && country.borders.includes('BRA')) {
//       resultCountries.push(country);
//     }
//   })
//   console.log("BRA borders: ", resultCountries);
// } 

// const findBorderBRAfilter = (countries) => {
//   const filteredArray = countries.filter((country) => {
//     return country.borders && country.borders.includes("BRA");
//   })
//   console.log("filtered array: ", filteredArray);
// }



// for (let i = 0; i < southernEurope.length; i++) {
//   const cardsDiv = document.getElementById("cards-div");
//   const card = document.createElement("div");
//   card.classList.add("card", "col-lg");
//   card.setAttribute("style", "width: 10rem;");
//   cardsDiv.appendChild(card);
//   const img = document.createElement("img");
//   img.setAttribute("src", southernEurope[i].coatOfArms.svg);
//   const cardBody = document.createElement("div");
//   cardBody.classList.add("card-body");
//   card.append(img, cardBody);
//   const title = document.createElement("h5");
//   title.classList.add("card-title");
//   title.innerHTML = southernEurope[i].name.common;
//   const text = document.createElement("p");
//   text.classList.add("card-text");
//   text.innerHTML = southernEurope[i].population;
//   cardBody.append(title, text);
// }

// const bsButt = document.getElementById("bs-butt");

// function testButton() {
//   console.log("Button has been clicked");
// }
// function clickDiv() {
//   console.log("div has been clicked");
// }

// // bsButt.addEventListener("click", testButton);

// bsButt.addEventListener("click", function() {
//   console.log("Button has been clicked anonymously");
// }, true)
// const div = document.querySelector("div");
// div.addEventListener("click", clickDiv, true);

// // bsButt.removeEventListener("click", testButton);

// const textInput = document.querySelector("input");
// textInput.addEventListener("change", function(event) {
//   console.log("event value: ", event.target.value);
// })






// spread operator
// const array = [1, 2, 3, 4, 5];
// const array2 = [6, 7, 8, 9, 10];
// const array3 = [...array, ...array2];
// console.log("array 3:", array3);

// const newArray = ["first item", ...array, "last item"];
// console.log("new array: ", newArray);
// console.log("array", array);
// console.log(...array);

// const myCat = {
//   name: "Tibbles",
//   age: 12,
//   colour: "tortoiseshell"
// }

// console.log("my cat: ", myCat);
// const myCatUpdated = {...myCat, desexed: true};
// console.log("cat updated: ", myCatUpdated);
