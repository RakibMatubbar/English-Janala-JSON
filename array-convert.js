// একটা Array এর ডাটা গুলো কীভাবে HTML Elements এর মধ্যে গুছিয়ে রাখতে হয়:

const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    // console.log(htmlElements);
    console.log(htmlElements.join(" "));
    
};

const synonyms = ['Rakib', 'Emon', 'Kodom', 'Dhutra'];
createElements(synonyms);

// index.js এর মধ্যে এটা ভালো ভাবে বুঝি নাই। বুঝতে হবে।


