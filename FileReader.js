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

let reverseString = function(str) {
    let strArray = str.split("");
    strArray.reverse();
    return strArray.join("");
}





