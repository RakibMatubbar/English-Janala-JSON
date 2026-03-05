
// Vocabularies Section:
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
}

/*
1. Get the Container & Empty it:
2. Get into Every Lessons:
3. Create Element:
4. Append into Container:
*/

const displayLesson = (lessons) => {
    // console.log(lessons);

    const levelContainer = document.getElementById("level-container"); // 1:
    levelContainer.innerHTML = "";

    for(let lesson of lessons){ // 2:
        // console.log(lesson);
        
        const btnDiv = document.createElement("div"); // 3:
        btnDiv.innerHTML = `
            <button class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open">
            </i> Lesson - ${lesson.level_no} </button>
        `;

        levelContainer.append(btnDiv); // 4:
    };
    
};
loadLessons();