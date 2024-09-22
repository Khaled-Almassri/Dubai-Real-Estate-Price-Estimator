let currentQuestion = 0;
const totalQuestions = 17; // Total number of questions
let answers = {}; // Object to store answers

function startQuestionnaire() {
    document.getElementById('welcomePage').classList.remove('active');
    nextQuestion(0, 1);
}

function nextQuestion(current, next) {
    if (current > 0) {
        document.getElementById('question' + current).classList.remove('active');
    }
    currentQuestion = next;
    document.getElementById('question' + next).classList.add('active');
    updateProgress();
    
    // Show back button except on the first question
    if (next > 1) {
        document.querySelector('.back-button').style.display = 'inline';
    } else {
        document.querySelector('.back-button').style.display = 'none';
    }

    // Show the submit button only on the last question
    if (next === totalQuestions) {
        document.getElementById('submitButton').style.display = 'inline-block';
    } else {
        document.getElementById('submitButton').style.display = 'none';
    }

    // Store the answer for the current question
    storeAnswer(current);
}

function previousQuestion() {
    if (currentQuestion > 1) {
        document.getElementById('question' + currentQuestion).classList.remove('active');
        currentQuestion--;
        document.getElementById('question' + currentQuestion).classList.add('active');
        updateProgress();
    }

    // Hide back button if we're at the first question
    if (currentQuestion === 1) {
        document.querySelector('.back-button').style.display = 'none';
    }

    // Hide the submit button when not on the last question
    if (currentQuestion !== totalQuestions) {
        document.getElementById('submitButton').style.display = 'none';
    }
}

function storeAnswer(questionNumber) {
    switch (questionNumber) {
        case 1:
            answers.neighborhood = document.getElementById('neighborhood').value;
            break;
        case 2:
            answers.sizeInSqft = parseInt(document.getElementById('size_in_sqft').value, 10);
            break;
        case 3:
            answers.noOfBedrooms = parseInt(document.getElementById('no_of_bedrooms').value, 10);
            break;
        case 4:
            answers.noOfBathrooms = parseInt(document.getElementById('no_of_bathrooms').value, 10);
            break;
        case 5:
            answers.quality = parseInt(document.getElementById('quality_encoded').value, 10);
            break;
        case 6:
            let maidRoom = document.querySelector('input[name="maid_room"]:checked');
            answers.maidRoom = maidRoom ? parseInt(maidRoom.value, 10) : null;
            break;
        case 7:
            let unfurnished = document.querySelector('input[name="unfurnished"]:checked');
            answers.unfurnished = unfurnished ? parseInt(unfurnished.value, 10) : null;
            break;
        case 8:
            let balcony = document.querySelector('input[name="balcony"]:checked');
            answers.balcony = balcony ? parseInt(balcony.value, 10) : null;
            break;
        case 9:
            let centralAC = document.querySelector('input[name="central_ac"]:checked');
            answers.centralAC = centralAC ? parseInt(centralAC.value, 10) : null;
            break;
        case 10:
            let childrensPlayArea = document.querySelector('input[name="childrens_play_area"]:checked');
            answers.childrensPlayArea = childrensPlayArea ? parseInt(childrensPlayArea.value, 10) : null;
            break;
        case 11:
            let coveredParking = document.querySelector('input[name="covered_parking"]:checked');
            answers.coveredParking = coveredParking ? parseInt(coveredParking.value, 10) : null;
            break;
        case 12:
            let privatePool = document.querySelector('input[name="private_pool"]:checked');
            answers.privatePool = privatePool ? parseInt(privatePool.value, 10) : null;
            break;
        case 13:
            let security = document.querySelector('input[name="security"]:checked');
            answers.security = security ? parseInt(security.value, 10) : null;
            break;
        case 14:
            let sharedGym = document.querySelector('input[name="shared_gym"]:checked');
            answers.sharedGym = sharedGym ? parseInt(sharedGym.value, 10) : null;
            break;
        case 15:
            let sharedPool = document.querySelector('input[name="shared_pool"]:checked');
            answers.sharedPool = sharedPool ? parseInt(sharedPool.value, 10) : null;
            break;
        case 16:
            let viewOfLandmark = document.querySelector('input[name="view_of_landmark"]:checked');
            answers.viewOfLandmark = viewOfLandmark ? parseInt(viewOfLandmark.value, 10) : null;
            break;
        case 17:
            let viewOfWater = document.querySelector('input[name="view_of_water"]:checked');
            answers.viewOfWater = viewOfWater ? parseInt(viewOfWater.value, 10) : null;
            break;
    }
}


function updateProgress() {
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progress').style.width = progressPercentage + '%';
}

function submitForm() {
  var url = "http://127.0.0.1:5000/predict_home_price";  // Correct endpoint
  console.log("Submit button clicked");

  document.getElementById('question' + currentQuestion).classList.remove('active');
  document.getElementById('submitButton').style.display = 'none';
  document.querySelector('.back-button').style.display = 'none';
  document.getElementById('endingPage').classList.add('active');
  var estPrice = document.getElementById("uiEstimatedPrice");

  // Log the data for debugging
  console.log("Sending data:", answers);

  $.post(url, {
    neighborhood: answers.neighborhood,
    sizeInSqft: parseFloat(answers.sizeInSqft),
    noOfBedrooms: answers.noOfBedrooms,
    noOfBathrooms: answers.noOfBathrooms,
    quality: parseFloat(answers.quality),
    maidRoom: answers.maidRoom,
    unfurnished: answers.unfurnished,
    balcony: answers.balcony,
    centralAC: answers.centralAC,
    childrensPlayArea: answers.childrensPlayArea,
    coveredParking: answers.coveredParking,
    privatePool: answers.privatePool,
    security: answers.security,
    sharedGym: answers.sharedGym,
    sharedPool: answers.sharedPool,
    viewOfLandmark: answers.viewOfLandmark,
    viewOfWater: answers.viewOfWater
    },function(data, status) {
    console.log(data.estimated_price);
    estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Dhs</h2>";
    console.log(status);
});

}


function restartQuestionnaire() {
    document.getElementById('endingPage').classList.remove('active');
    document.getElementById('welcomePage').classList.add('active');
    currentQuestion = 0;
    document.getElementById('progress').style.width = '0%';
    document.querySelector('.back-button').style.display = 'none';
    answers = {}; // Reset the answers
}

// Update slider value display
function updateSliderValue() {
    const sliderValue = document.getElementById('size_in_sqft').value;
    document.getElementById('sliderValue').textContent = sliderValue;
}
