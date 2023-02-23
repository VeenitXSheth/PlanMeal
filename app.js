const welcomeText = document.querySelector('.welcome');
const accountDate = document.querySelector('.creation-date');
const settingsViewNameText = document.querySelector('.account-name');

let generatedMealText = document.querySelector('.generateMealText');
let generateIcon = document.querySelector('#generate-icon');

/* idk how to check whether a new day has happened like if 24hrs passed with the getDay() function. how do i do this so that every day, the app resets the .innerText of the h1 that shows the generated meal? */

const time = new Date();
let currentDay = time.getDay();



const startSetupBtn = document.querySelector('#start-setup-btn');
let setupView = document.querySelector('.setup'); 
let generationView = document.querySelector('.generate-wrapper');
let setupMealsView = document.querySelector('.setup-meals');

let settingsWrapperView = document.querySelector('.settings-wrapper');
settingsWrapperView.style.display = 'flex';
let editAccountView = document.querySelector('.edit-account-view');
editAccountView.style.display = 'none';

function greeting() {

    let name = localStorage.getItem("username");
    welcomeText.innerText = `Welcome ${name}!`;
    
}

function preload() {

    let creationDate = localStorage.getItem('creationDate');
    accountDate.innerText = `Account ID: ${creationDate}`;

    let settingsViewName = localStorage.getItem("username");
    settingsViewNameText.innerText = settingsViewName;

    let newsletterToggle = document.querySelector('#newsletter-toggle');

    let newsletterSetting = localStorage.getItem("newsletterPreference");
    if (newsletterSetting == "true") {
        newsletterToggle.innerText = "toggle_on";
    } else {
        newsletterToggle.innerText = "toggle_off";
    };

    if (!localStorage.getItem('generatedMeal')) {
        return
    } else {
        generatedMealText.innerText = localStorage.getItem('generatedMeal');
        console.log('meal prefilled');
        generatedIcon.innerText = 'refresh';
    }
    
    
};

let toggle = document.querySelector('#newsletter-toggle');

toggle.addEventListener('click', function() {

    if (toggle.innerText == 'toggle_off') {
        toggle.innerText = 'toggle_on';
        localStorage.setItem('preference', true);
    } else {
        toggle.innerText = 'toggle_off';
        localStorage.setItem('preference', false);
    };
});

window.addEventListener('load', function() {
    greeting();
    preload();
});

let homeBtn = document.querySelector('.home');
let generateBtn = document.querySelector('.generate');
let settingsBtn = document.querySelector('.settings');

let homeView = document.querySelector('.home-view');
let generateView = document.querySelector('.generate-view');
let settingsView = document.querySelector('.settings-view');

homeBtn.addEventListener('click', function() {

    homeBtn.style.scale = 1.35;
    homeBtn.style.marginTop = '2.5px';

    generateBtn.style.scale = 1;
    generateBtn.style.marginTop = '0px';

    settingsBtn.style.scale = 1;
    settingsBtn.style.marginTop = '0px';
    
    homeView.style.display = 'block';
    generateView.style.display = 'none';
    settingsView.style.display = 'none';
    
});

generateBtn.addEventListener('click', function() {

    
    if (localStorage.getItem("setupCompletion") == "true") {

        generateView.style.display = 'block';
        setupMealsView.style.display = 'none';
        setupView.style.display = 'none';
        generationView.style.display = 'flex';
        
    } else {

        setupMealsView.style.display = 'block';
        generationView.style.display = 'none';
        generateView.style.display = 'block';
        
    }

    generateBtn.style.scale = 1.35;
    generateBtn.style.marginTop = '2.5px';

    homeBtn.style.scale = 1;
    homeBtn.style.marginTop = '0px';

    settingsBtn.style.scale = 1;
    settingsBtn.style.marginTop = '0px';
    
    homeView.style.display = 'none';
    settingsView.style.display = 'none';
    
});

settingsBtn.addEventListener('click', function() {

    settingsBtn.style.scale = 1.35;
    settingsBtn.style.marginTop = '2.5px';

    generateBtn.style.scale = 1;
    generateBtn.style.marginTop = '0px';

    homeBtn.style.scale = 1;
    homeBtn.style.marginTop = '0px';
    
    settingsView.style.display = 'block';
    generateView.style.display = 'none';
    homeView.style.display = 'none';
    
});

setupMealsView.style.display = 'none';

startSetupBtn.addEventListener('click', function() {

    setupMealsView.style.display = 'block';
    setupView.style.display = 'none';

});

let meal = document.getElementById('meal-input');
let addMealBtn = document.getElementById('add-meal-btn');

let finishSetupBtn = document.getElementById('finish-setup-btn');
finishSetupBtn.style.display = 'none';

function addMeal() {

    let mealList = document.querySelector('#user-menu');
    let mealInput = document.querySelector('#meal-input');

    let mealText = document.createElement('li'); 

    let liText = document.createTextNode(meal.value)

    mealText.classList += "meal-item";
        
    mealText.appendChild(liText);
    mealList.appendChild(mealText);
    mealInput.value = '';

    finishSetupBtn.style.display = 'block';

    
}

function mealsToJson() {

    let allMeals = {}
    let lis = document.querySelectorAll(".meal-item")

    for (let i = 0; i < lis.length; i++) {

        eval(`allMeals.meal${i} = ` + "lis[i].innerText.toString()")
        
    }

    // console.log(allMeals)
    return allMeals
    
}


function jsonToMeals(){

    return JSON.parse(localStorage.getItem("allMeals"))
    
}

let generateMealBtn = document.getElementById('generate-btn');

function generate() {

    console.log('generate function started!');

    jsonToMeals();
    console.log(jsonToMeals());

    let mealArray = Object.values(jsonToMeals());
    console.log(mealArray);

    let generatedMeal = mealArray[Math.floor(Math.random() * mealArray.length)];
    console.log(generatedMeal);

    let formatted = generatedMeal.toUpperCase();
    
    generatedMealText.innerText = formatted;

    localStorage.setItem('generatedMeal', formatted);
    
};

generateMealBtn.addEventListener('click', function() {

    generateIcon.innerText = 'refresh';

    generate();
    
});


addMealBtn.addEventListener('click', function() {

    if (meal.value.match(/[A-Za-z]/gmi) && meal.value != "") {
        addMeal();
        localStorage.setItem("allMeals", JSON.stringify(mealsToJson()));
        // console.log(localStorage.getItem("allMeals"));
        console.log(jsonToMeals())
    } else {
        alert('Please Enter A Meal!')
    }
    
   

});

window.addEventListener("keypress", e => {
  e = e.key;

  if (e=="Enter" && setupMealsView.style.display == 'block') {
    addMealBtn.click();
  };
  
});

finishSetupBtn.addEventListener('click', function() {

    console.log('setup is done')

    localStorage.setItem('setupCompletion', true);

    setupMealsView.style.display = 'none';
    generationView.style.display = 'block';
    
});

const saveChangesBtn = document.getElementById("complete-changes-btn");

const editAccountBtn = document.querySelector('.edit-account-btn');
editAccountBtn.addEventListener('click', function() {

    editAccountView.style.display = 'flex';
    settingsWrapperView.style.display = 'none';
    
});

let editUsernameBtn = document.getElementById("username-lock");
let editUsernameIcon = document.querySelector('#confirm-username');
let usernameField = document.getElementById('editUsernameField');
editUsernameBtn.addEventListener('click', function() {

    if (editUsernameBtn.innerText == 'lock') {
        editUsernameBtn.innerText = 'lock_open';
        usernameField.style.display = 'inline-block';
        editUsernameIcon.style.display = 'inline-block';
    } else {
        editUsernameBtn.innerText = 'lock';
        usernameField.style.display = 'none';
        editUsernameIcon.style.display = 'none';
    };

});

editUsernameIcon.addEventListener('click', function() {

    let usernameChangeText = document.querySelector('.username-setting-text');

    let newUsername = document.getElementById('editUsernameField').value;
    console.log(newUsername);

    localStorage.setItem('username', newUsername);
    console.log(localStorage.getItem('username'));

    editUsernameBtn.style.display = 'none';
    editUsernameIcon.style.display = 'none';
    usernameField.style.display = 'none';
    usernameChangeText.innerText = 'Username Changed!';

    welcomeText.innerText = `Welcome ${newUsername}!`

    preload();
    
});

let editPasswordBtn = document.getElementById("password-lock");
let editPasswordIcon = document.querySelector('#confirm-password');
let passwordField = document.getElementById('editPasswordField');
editPasswordBtn.addEventListener('click', function() {
    
    let passwordField = document.getElementById('editPasswordField');

    if (editPasswordBtn.innerText == 'lock') {
        editPasswordBtn.innerText = 'lock_open';
        passwordField.style.display = 'inline-block';
        editPasswordIcon.style.display = 'inline-block';
    } else {
        editPasswordBtn.innerText = 'lock';
        passwordField.style.display = 'none';
        editPasswordIcon.style.display = 'none';
    };
    
});

editPasswordIcon.addEventListener('click', function() {

    let passwordChangeText = document.querySelector('.password-setting-text');
    
    let newPassword = document.getElementById('editPasswordField').value;
    console.log(newPassword);

    localStorage.setItem('password', newPassword);
    console.log(localStorage.getItem('password'));

    editPasswordBtn.style.display = 'none';
    editPasswordIcon.style.display = 'none';
    passwordField.style.display = 'none';
    passwordChangeText.innerText = 'Password Changed!';

    preload();

    
    
});

let deleteAccountBtn = document.getElementById('delete-lock');
let confirmDeletionBtn = document.getElementById('confirm-deletion');
console.log(deleteAccountBtn);

deleteAccountBtn.addEventListener('click', function() {

    if (deleteAccountBtn.innerText == 'lock') {
        deleteAccountBtn.innerText = 'lock_open';
        confirmDeletionBtn.style.display = 'inline-block';
    } else {
        deleteAccountBtn.innerText = 'lock';
        confirmDeletionBtn.style.display = 'none';
    };
    
});

confirmDeletionBtn.addEventListener('click', function() {

    console.log('deletion has started!');

    localStorage.clear();
    alert('Account Has Been Successfully Deleted!');
    location.href = 'https://planmeal.repl.co';
        
});

saveChangesBtn.addEventListener('click', function() {

    editAccountView.style.display = 'none';
    settingsWrapperView.style.display = 'flex';

    editUsernameBtn.innerText = 'lock';
    
});
