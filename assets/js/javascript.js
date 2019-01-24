 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyDt1AO88NlXFZxF5jtm8crvWp2iHTXmqFk",
  authDomain: "my-firebase-project-ebd46.firebaseapp.com",
  databaseURL: "https://my-firebase-project-ebd46.firebaseio.com",
  projectId: "my-firebase-project-ebd46",
  storageBucket: "my-firebase-project-ebd46.appspot.com",
  messagingSenderId: "877624670936"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Train Information
$("#add-Train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var trainDestination = $("#destination").val().trim();
  var trainFrequency = $("#frequency").val().trim();
  var trainTime = $("#first-time").val().trim();
  

  // Creates local "temporary" object for holding train data
  var newTrainData = {
    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    time: trainTime,
  };

  // Uploads train data to the database
  database.ref.push(newTrainData);

  // Logs everything to console
  console.log(newTrainData.name);
  console.log(newTrainData.destination);
  console.log(newTrainData.frequency);
  console.log(newTrainData.time);
  

  alert("New train information successfully added");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#frequency").val("");
  $("#first-time").val("");
  
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot){ 
  console.log(childSnapshot.val());
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var trainTime = childSnapshot.val().time;


  var diffTime = moment().diff(moment())



  // Digit
  // Time apart (remainder)
  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);
  
// Minute untill Train
var tMinutesTillTrain = trainFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
   
  );

  console.log("New Row", newRow);
//Append the new roe to the table
$("#train-table").append(newRow);

});

$("#clear-train-btn").on("click", function(event) {
  event.preventDefault();

  $("#train-table > tbody").hide();

}
);