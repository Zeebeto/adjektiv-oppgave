
// model
let story = `<p>Etter en | _ | sommer, kommer den | _ | høsten. Det ser ikke helt lyst ut. <br>

Den | _ | IS-gruppen blir stadig drøyere, mens selv våre | _ | svenske brødre er skremt av den | _ | Putin. <br>

Men det stopper ikke der, listen er | _ | og lang. <br>

Nordmenn plager hverandre med | _ | netthets. Den tidligere så | _ | villaksen er i ferd med å forsvinne fra | _ | vassdrag. <br>

Våre | _ | fotballspillere har sjelden vært dårligere representert i | _ | Premier League, og landets | _ | kornsiloer er ikke lenger trygge. <br>

Det rakner videre i landets | _ | avishus, mens den | _ | PR-bransjen vokser. <br>

Ståle ble kastet ut av det | _ | Big Brother-huset, kaffebarutvalget i Oslo blir stadig mer | _ |, og vinteren tør vi ikke engang tenke på. <br>

Orker du ikke mer? <br></p>`




let storyArray = story.split(' ');
let adjektivNeeded = 16;
let wordArrayAdjectives = []
let button = document.getElementsByClassName('adj-button');
let wordsNeeded= (story.match(/_/g) || []).length;
let storyHtml = document.getElementById('story');
let adjektivHtml = document.getElementById('adjektiv');
let outputHtml = document.getElementById('output');
let wordButtons ="";

// view 

// fyller inn i "story" diven i HTML, og legger innholdet av "story" variabelen på linje 12 inn der.
updateView();
function updateView() {
    let input = document.getElementById('input');
    storyHtml.innerHTML = story;
    adjektivHtml.innerHTML =`
            <p>Du trenger ${wordsNeeded} ord for å fylle ut historien</p>
            <input type="text" id="input" placeholder="Legg til adjektiv"><br>
            <div id="output">${wordButtons}</div>
    `
    ;
}



// controller


input.addEventListener("keydown", function(event) {
    if (event.code === "Enter" && wordsNeeded > 1) {
        let word = input.value;

    if (wordArrayAdjectives.includes(word)) {
             return 
    };

        wordArrayAdjectives.push(input.value);
        input.value = '';
        

    }
    
});

function createButton() {
    let word = input.value;
    if (wordArrayAdjectives.includes(word)) {
        return
    }

    for (let i = 0; i < wordArrayAdjectives.length; i++) {
        var btn = document.createElement("BUTTON");
        btn.classList.add(`adj-button`);
        btn.setAttribute("onclick","addWordToStory(this)");
        btn.innerHTML = `${wordArrayAdjectives[i]}`;
        //outputHtml.appendChild(btn); 
        wordButtons += btn.outerHTML;

    }
    updateView();
    
}
    //En loop vil kjøre igjennom hver knapp som lages og legge til en evenlistener(click) som vil kjøre funksjonen addWordToStory();
    //   for (let i = 0; i < button.length; i ++) {
    //       var buttons = button[i]
    //   };
      
function addWordToStory(wordElement) {

    //Hent ut teksten fra et html element, legg merke til bruken av innertext
    //istedenfor innerhtml for å unngå å fange opp html tags, vi vil kun ha
    //friendly text. 
    let word = wordElement.innerText;
    console.log(word);
    //Gå gjennom storyen og finn første instans av stringen "_". Når den er funnet
    //Erstatt den med ordet vi hentet ut fra wordelementet. For eksempel:
    //Hvis storyen er lik " jeg er _ " og ordet er lik "rød" vil storyen bli 
    //endret til " jeg er rød "
    story = story.replace("_", word);
    //Etter at storyen er oppdatert, fjern knappen så ordet ikke kan brukes 2 ganger.
    wordElement.remove();
    //Sjekk hvor mange ord som trengs for å fullføre storyen. Deretter oppdater viewet så 
    //brukeren kan se storyen med det nye ordet lagt til.
    wordsNeeded= (story.match(/_/g) || []).length;
    updateView();
    
}


