//----------------------------------------------------------Create cards-------------------------------------------

function getCountries () {
    fetch("https://restcountries.com/v3.1/all")
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
       CreateCards(result);
      addEventListeners(result);
      addEvents();
    })
    .catch(function(error) {
      console.log(error)
      alert(error);
    })
  }
getCountries();

function CreateCards(array) {     
  const cardsDiv = document.getElementById("cards-container");
  cardsDiv.innerHTML = "";

    for (let i = 0; i < array.length; i++) {

        const card = document.createElement("div");
        cardsDiv.classList.add("col", "row-cols-1", "row-cols-md-3", "g-4")
        card.classList.add("card", "col-lg", "shadow");
        card.setAttribute("style", "width: 13rem; border-radius: 120px; text-align:center");
        cardsDiv.appendChild(card);
        const img = document.createElement("img");
        img.setAttribute("src", array[i].flags.png);
        img.setAttribute("alt", array[i].flags.alt);
       img.setAttribute("style", "card-img-top");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.append(img, cardBody);
        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerHTML = array[i].name.common;
        const cardcapital = document.createElement("p");
        cardcapital.classList.add("card-text");
        cardcapital.innerHTML = array[i].capital;
        cardBody.append(title, cardcapital);
        const button = document.createElement("button");
        button.classList.add ("btn-primary");
        button.classList.add ("btn");
        button.innerHTML = "More";
        cardBody.append(button);


        button.addEventListener("click", function(e) {
            // e.stopPropagation();
   
            if ( button.innerHTML === "More" ) {
                const list = document.createElement ("ul");
                const cardpopu = document.createElement("li");
                const cardpop = document.createElement("li");
                cardpopu.innerHTML = "Population";
              
                cardpop.innerHTML = array[i].population;
                list.classlist = ("list-group list-group-flush");
                cardpopu.classList = ("list-group-item");
                cardpop.classList = ("list-group-item");
                cardpopu.id =("cardlang");
                cardpop.id = ("cardpopo");
             
                const link = document.createElement("a");
                link.setAttribute("href", `details.html?name=${array[i].name.common}`);
                link.innerHTML = "weather...";
              link.id = ("linki");
                cardBody.append (cardpopu, cardpop, link);
                button.innerHTML = "Less";
                              
            } else  {
                const cardlenguages = document.getElementById ("cardlang");
              const cardpopi = document.getElementById("cardpopo");
                const link = document.getElementById("linki");
                cardlenguages.innerHTML = "";
                cardpopi.innerHTML = "";
                link.textContent= "";
                cardBody.append (cardlenguages, cardpopi, link);
                button.innerHTML = "More";
                        
            }
          });
    }
  }
  

const addEventListeners = (countries) => {
  const checkBoxes = document.querySelectorAll("input[type='checkbox']");
  checkBoxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
         filterByCheckbox(countries)
    });
  });
};

const filterByCheckbox = (countries) => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
  const checkboxesValues = Array.from(checkboxes).map((checkbox) => {
    return checkbox.value;
  });


  const filteredCountries = countries.filter((country) => {
    return (
      checkboxesValues.includes(country.region) ||
      checkboxesValues.length === 0
    );
  });

  CreateCards(filteredCountries);
};


// const cleanDOM = (city, tbody, astronomyCards) => {
//   city.innerHTML = "";
//   tbody.innerHTML = "";
//   astronomyCards.innerHTML = "";
//   document.getElementById("city-search").value = "";
// };


//BUSCAR A TRAVES DEL INPUT TEXT

const addEvents = () => {
  let country = "";

  const searchInput = document.getElementById("buscador");
  searchInput.addEventListener("input", (event) => {
    country = event.target.value;

  });
  searchInput.addEventListener("keydown", (event) => {
    console.log("key event", event);
    if (event.key === "Enter") {
      fetchCountry(country);
      // window.location.href = `details.html?name=${country}`

    }
  });
    const buttonsearch = document.getElementById("searchbutton")
    buttonsearch.addEventListener("click", (event) => {
      fetchCountry(country);

          // window.location.href = `details.html?name=${country}`

  });
};

const fetchCountry =(countryName)=> {
  console.log('countryName :>> ', countryName);
   fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((res) => {
  const fetchedCountry = res[0];
  console.log('fetchedCountry :>> ', fetchedCountry);
  
  CreateCards(fetchedCountry);
})
.catch((err) => console.log(err));

}