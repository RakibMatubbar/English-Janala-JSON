/*
<== Process of Dynamic Data Store==>

1. Get the Container & Empty it:
2. Get into Every Lessons:
3. Create Element:
4. Append into Container:
*/

// load Btn-Number:
const loadLessons = () => {

    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
}


// Load Btn Words:

const loadLevelWord = (id) => {
    // console.log(id);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);

    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLelelWord(data.data));

}

const displayLelelWord = (words) => {
    // console.log(words);

    const wordContainer = document.getElementById("word-container"); // 1:
    wordContainer.innerHTML = "";

    // Length 0 for a Message:
    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl py-10 space-y-6 bg-red-200">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="font-bangla text-xl font-semibold text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla font-bold text-3xl">নেক্সট Lesson এ যান।</h2>
        </div>

        `;
        return;
    }

// Tarnary oparator for Null ? : >>

    words.forEach(word => { // 2:
        // console.log(word);

        const card = document.createElement("div"); // 3:
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">

            <h2 class="font-bold text-2xl">${word.word
                ? word.word
                : ":::"
            }</h2>

            <p class="font-semibold">Meaning | Pronounciation</p>
            
            <div class="font-bangla text-2xl font-medium">${word.meaning ? word.meaning : ":::"} | ${word.pronunciation ? word.pronunciation : ":::"} </div>
            

            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80] "> <i class="fa-solid fa-circle-info"></i> </button>
                <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"> <i class="fa-solid fa-volume-high"></i> </button>
            </div>

        </div>
        `;

        wordContainer.append(card); // 4:
    });
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
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open">
            </i> Lesson - ${lesson.level_no} </button>
        `;

        levelContainer.append(btnDiv); // 4:
    };

};
loadLessons();


// Get Vocab after Clicking Btn:
