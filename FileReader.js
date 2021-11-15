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
for(let i = 0; i < categories.length; i++){     //for loop thats calculates the category with the most postings and how many times it occurs
    if(repeats.filter(x => x==categories[i]).length > max){
        max = repeats.filter(x => x==categories[i]).length;
        category = categories[i];
    }
}

console.log("Most popular job category is " + category + " and it occurs " + max + " times");   //prints the data


//Q2
const jobsArray = Object.values(jobs) // Converting to array because JSON wont let me use array functions on objects

let getCities = function(job) { // 5-Michelin Star Gourmet Spaghetti
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

let citiesWithRepeats = jobsArray.map(getCities);   //arrays
let cities = [];

for(let city of citiesWithRepeats) {    //loops through each city and if the city isnt in the array it gets added
    if(!cities.includes(city)) {
        cities.push(city);
    }
}

let maxCity = 0;
let cityName = "";
for(let city of cities) {   //for loop that calculates the most popular city category and how many occurences
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

console.log("The most popular city is " + cityName + " and it occurs in " + maxCity + " job postings");  //prints data
    
//Q3 What is the most popular category in each city?
cities.shift();     
console.log("Most popular category in each city: ");
for(let city of cities) {   //loops through all cities and filters jobs
    let jobsInCity = jobsArray.filter((job) => {
        if(job.title.includes(city)) {
            return job;
        }
    })
    
    let cityCategories = [];
    let cityCategoryRepeats = [];
    for(let job of jobsInCity){   //loops through every category and removes the repeats
        for(let category of job.categories){
            if(!cityCategories.includes(category)){
                cityCategories.push(category);
            }
        }
        cityCategoryRepeats = cityCategoryRepeats.concat(job.categories);   
    }
    
    let max2 = 0;
    let category2 = "";
    for(let i = 0; i < cityCategories.length; i++){     //calculates the most popular job category in each city
        if(cityCategoryRepeats.filter(x => x==cityCategories[i]).length > max2){
            max2 = cityCategoryRepeats.filter(x => x==cityCategories[i]).length;
            category2 = cityCategories[i];
        }
    }
    console.log("City Name: " + city + "    Most Popular Job Category: " + category2 + "    Number of Occurences: " + max2);    //prints data
}


 


