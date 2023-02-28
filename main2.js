//----------------------------------------------------------Create cards-------------------------------------------

function CreateCards (array) {     
    for (let i = 0; i < array.length; i++) {
        const cardsDiv = document.getElementById("cards-container");
        const card = document.createElement("div");
        cardsDiv.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4")
        card.classList.add("card", "col-lg");
        card.setAttribute("style", "width: 13rem;");
        cardsDiv.appendChild(card);
        const img = document.createElement("img");
        img.setAttribute("src", array[i].flags.png);
        img.setAttribute("alt", AllCountries[i].flags.alt);
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
        button.innerHTML = "Show More";
        cardBody.append(button);


        button.addEventListener("click", function(e) {
            // e.stopPropagation();
   
            if ( button.innerHTML === "Show More" ) {
                const list = document.createElement ("ul");
                const cardlenguage = document.createElement("li");
                const cardpop = document.createElement("li");
                cardlenguage.innerHTML = AllCountries[i].languages.toString();
                cardpop.innerHTML = AllCountries[i].population;
                list.classlist = ("list-group list-group-flush");
                cardlenguage.classList = ("list-group-item");
                cardpop.classList = ("list-group-item");
                cardlenguage.id =("cardlang");
                cardpop.id =("cardpopo");
                cardBody.append (cardlenguage, cardpop);
                button.innerHTML = "Show Less";
                              
            } else  {
                const cardlenguages = document.getElementById ("cardlang");
                const cardpopi = document.getElementById ("cardpopo");
                cardlenguages.innerHTML = "";
                cardpopi.innerHTML = "";
                cardBody.append (cardlenguages, cardpopi);
                button.innerHTML = "Show More";
              
            }
          });
    }
  }
  
  CreateCards(AllCountries);

