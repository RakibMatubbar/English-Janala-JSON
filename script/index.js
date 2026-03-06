/*
<= Process of Load and Display: =>
    1: Load Func.
    2: Display Func.

<= Process of Dynamic Data Store: =>
    1. Get the Container & Empty it:
    2. Get into Every Lessons:
    3. Create Element:
    4. Append into Container:
*/

// Create Elemetes | Array to String | for Synonyms:
const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    // console.log(htmlElements);
    // console.log(htmlElements.join(" "));
    
    return htmlElements.join(" ");
};


// Speak Word Func: Have to Understand:
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// Loading Data Graphics daisyUI:
const maanageSpinner = (status) => {
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

//<=====================================>//

// load Btn-Number:
const loadLessons = () => {

    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
}


// Remove all Btn Colors Selected one Just:
const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach(btn => btn.classList.remove("active"));
    
}


// Load Btn Words:
const loadLevelWord = (id) => {
    // console.log(id);

    // call the func for ture and show Loading:
    maanageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);

    fetch(url)
        .then((res) => res.json())
        // .then((data) => displayLevelWord(data.data));
        .then((data) => {

            // After Clicking Btn: Change it's Color:
            removeActive(); // Remove all active class:

            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickBtn);

            clickBtn.classList.add("active"); // Selected one add active class:
            
            displayLevelWord(data.data)
        });

}


// Load Card Word Details: Avoid .then .then : async
const loadWordDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);

    const res = await fetch(url);
    const details = await res.json();
    // console.log(details);
    displayWordDetails(details.data);
}


// Display Word Details:
const displayWordDetails = (word) => {
    // console.log(word);

    const detailsBox = document.getElementById("details-container");
    // console.log(detailsBox);
    // ${createElements(word.synonyms) ? word.synonyms : ":::"}

    detailsBox.innerHTML = `
        <div>
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
        </div>

        <div>
            <h2 class="font-bold">Meaning:</h2>
            <p>${word.meaning ? word.meaning : ":::"}</p>
        </div>
        <div>
            <h2 class="font-bold">Example:</h2>
            <p>${word.sentence ? word.sentence : ":::"}</p>
        </div>
        <div>
            <h2 class="font-bold">Synonyms:</h2>
            <div class="flex flex-wrap gap-2">${word.synonyms && word.synonyms.length > 0 ? createElements(word.synonyms) : ":::"}</div>
        </div>
    `;

    // Call daisyUI's function:
    document.getElementById("word_modal").showModal();
}


// Display Specific Btn's Word:
const displayLevelWord = (words) => {
    // console.log(words);

    const wordContainer = document.getElementById("word-container"); // 1:
    wordContainer.innerHTML = "";

    // Length 0 for a Message:
    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl py-10 space-y-6 bg-red-200">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="font-bangla text-xl font-semibold text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla font-bold text-3xl">অন্য Lesson এ যান।</h2>
        </div>

        `;

        // Call the Spinner:
        maanageSpinner(false);

        return;
    }

// Tarnary oparator for Null ? : >>

    words.forEach(word => { // 2:
        // console.log(word);
        // ('${word.word}') // Bujhte Hobe:

        const card = document.createElement("div"); // 3:
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4 hover:bg-red-200">

            <h2 class="font-bold text-2xl">${word.word
                ? word.word
                : ":::"
            }</h2>

            <p class="font-semibold">Meaning | Pronounciation</p>
            
            <div class="font-bangla text-2xl font-medium">${word.meaning ? word.meaning : ":::"} | ${word.pronunciation ? word.pronunciation : ":::"} </div>

            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80] "> <i class="fa-solid fa-circle-info"></i> </button>

                <button onclick="markAsDone(this)" class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"> <i class="fa-regular fa-calendar-check"></i> </button>

                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"> <i class="fa-solid fa-volume-high"></i> </button>
            </div>

        </div>
        `;

        wordContainer.append(card); // 4:
    });

    // Call the func after DisplyData.
    maanageSpinner(false);
};


// loadLevelWord();
const displayLesson = (lessons) => {
    // console.log(lessons);

    const levelContainer = document.getElementById("level-container"); // 1:
    levelContainer.innerHTML = "";

    for (let lesson of lessons) { // 2:
        // console.log(lesson);

        const btnDiv = document.createElement("div"); // 3:
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open">
            </i> Lesson - ${lesson.level_no} </button>
        `;

        levelContainer.append(btnDiv); // 4:
    };

};

loadLessons();


// Search Btn for searching Words:
document.getElementById("btn-search").addEventListener("click", ()=>{

    // Removo all Active class when Searching:
    removeActive();

    const input = document.getElementById("input-search");
    // const searchValue = input.value;
    const searchValue = input.value.trim().toLowerCase();
    // console.log(searchValue);

    // fetch all words:
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    // .then((data) => console.log(data));
    .then((data) => {
        const allWords = data.data;
        // console.log(allWords);

        const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));
        // console.log(filterWords);

        displayLevelWord(filterWords);
    });
    
});

// Write word and Search by pressing Enter:
document.getElementById("input-search").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        document.getElementById("btn-search").click();
    }
});



// Tik Mark:
const markAsDone = (btnElement) => {
    // console.log("Word Marked");

    const card = btnElement.closest(".bg-white") || btnElement.parentElement.parentElement;

    card.classList.remove("bg-white", "hover:bg-red-200");
    card.classList.add("bg-green-200");

    const allButtons = card.querySelectorAll(".btn");
    allButtons.forEach(btn =>{
        btn.classList.remove("bg-[#1A91FF20]", "hover:bg-[#1A91FF80]");
        btn.classList.add("bg-white", "text-green-700", "border-none")
    });
};



