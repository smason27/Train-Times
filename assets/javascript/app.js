$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDci3ME4-tlJwujNAvcmUMG5t_WABZySPE",
        authDomain: "train-schedule-911f1.firebaseapp.com",
        databaseURL: "https://train-schedule-911f1.firebaseio.com",
        projectId: "train-schedule-911f1",
        storageBucket: "",
        messagingSenderId: "960806586004"
      };
      firebase.initializeApp(config)

    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = 0;
    var minutesAway = 0;
    var trainArrival = 0;

    database.ref().on("child_added", function (snapshot) {
        var snap = snapshot.val();
        console.log(snap);
        var firstTrainToday = moment(firstTrain, "HH:mm").subtract(1, "weeks");
        console.log(firstTrainToday)
        var trainTimeDifference = moment().diff(moment(firstTrainToday), "minutes")
        console.log(trainTimeDifference)
        var trainDifference = trainTimeDifference % frequency;
        console.log(trainDifference)
        minutesAway = frequency - trainDifference;
        console.log(minutesAway)
        var nextTrain = moment().add(minutesAway, "mins");
        console.log(nextTrain)
        trainArrival = moment(nextTrain).format("HH:mm");
        console.log(trainArrival)

        $("#trainSchedule").find('tbody')
            .append($('<tr>')
                .append($('<td>').text(snap.name))
                .append($('<td>').text(snap.destination))
                .append($('<td>').text(snap.frequency))
                .append($('<td>').text(snap.trainArrival))
                .append($('<td>').text(snap.minutesAway))
            )
    });
   
    $("#addTrain").on("click", function () {
        event.preventDefault();

        trainName = $("#trainName").val().trim();
        console.log(trainName)
        destination = $("#destination").val().trim();
        console.log(destination)
        firstTrain = $("#firstTrain").val().trim()
        console.log(firstTrain)
        frequency =parseInt($("#frequency").val().trim());
        console.log(frequency)

        database.ref().push({
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            minutesAway: minutesAway,
            trainArrival: trainArrival,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });
   
});