const jobs = require('./jobs.json');  //stores json file in a variable

//loop through the json file, if a job category doesn't exist add that category to the array, once its looped through once, 
//loop again check how many times each category occurs, print the name of the category that occurs the most and the amount of times

let categories = [];
let repeats = []
for(let job in jobs){   //loops through every category and removes the repeats
    for(let category of jobs[job].categories){
        if(!categories.includes(category)){
            categories.push(category);
        }
    }
    repeats = repeats.concat(jobs[job].categories);
}

let max = 0;
let category = "";
for(let i = 0; i < categories.length; i++){
    if(repeats.filter(x => x==categories[i]).length > max){
        max = repeats.filter(x => x==categories[i]).length;
        category = categories[i];
    }
}

console.log(category + " " + max);


//Q2
const jobsArray = Object.values(jobs) // Converting to array because JSON wont let me use array functions on objects

let getCities = function(job) {
    let jobTitle = job.title.split(/[(,)]+/).reverse();// Splits by "(,)" then reverses cause city is usually near the end of the title
    if(jobTitle.length<=3 && !jobTitle[1].split(/[\s]+/).includes('at')) { //Some things in the data only have 3 elements in those causes city is always the 2nd
        return jobTitle[1];
    }
    else if(jobTitle[1].includes('allows remote')) { // When "allows remote" city sometimes isn't listed but when it is listed it is followed by a 3 character string representing state
        for(let i = 0;i<jobTitle.length;i++) {
            let j=i+1;
            if(jobTitle[i].length===3 && !jobTitle[j].split(/[\s]+/).includes('at')) {//finds 3 character string checks if the next string doesn't have "at"
                return jobTitle[j];
            }
        }
    }
    else if(jobTitle[2].length===3 && !jobTitle[3].split(/[\s]+/).includes('at')) { // For canadian cities province is always the 3rd element and 3 charaters so the next is the city 
        return jobTitle[3];
    }
    else if(!jobTitle[2].split(/[\s]+/).includes('at')) {// 90% of the time the city is the 3rd element but never includes the word "at" so those should be excluded
        return jobTitle[2];
    }
}

let citiesWithRepeats = jobsArray.map(getCities);
let cities = [];

for(let city of citiesWithRepeats) {
    if(!cities.includes(city)) {
        cities.push(city);
    }
}

for(let city of citiesWithRepeats) {
    console.log(city);
}

let maxCity = 0;
let cityName = "";
for(let city of cities) {
    let currentCity = citiesWithRepeats.filter(c => {
        if(c == city){
            return c;
        }
    })

    if(currentCity.length>maxCity) {
        maxCity = currentCity.length;
        cityName = city;
    }
}

console.log(cityName + " " + maxCity);
    

//Q3 What is the most popular category in each city?



