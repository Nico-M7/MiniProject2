const jobs = require('./jobs.json');  //stores json file in a variable

//loop through the json file, if a job category doesn't exist add that category to the array, once its looped through once, 
//loop again check how many times each category occurs, print the name of the category that occurs the most and the amount of times

let categories = [];

for(let job in jobs) {
    for(let category of jobs[job].categories) {
        if(!categories.includes(category)){
            categories.push(category);
        }
    } 
}

console.log(categories)

let jobsWithCategory = [];





