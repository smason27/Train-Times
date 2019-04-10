$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyAlHWRQrMbKW_bTAu0W897tgciE0NEPs3Q",
        authDomain: "train-times-c21f1.firebaseapp.com",
        databaseURL: "https://train-times-c21f1.firebaseio.com",
        projectId: "train-times-c21f1",
        storageBucket: "train-times-c21f1.appspot.com",
        messagingSenderId: "522739324977"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var firstTrain = 0;
    var frequency = "";

    $("#addTrain").on("click", function () {
        event.preventDefault();

        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").format("X");
        frequency = $("#frequency").val().trim();

        database.ref().push({
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });
    database.ref().on("child_added", function (snapshot) {
        var snap = snapshot.val();
        console.log(snap)
        console.log(moment() + "<--moment")
        var firstTrainToday = moment.unix(firstTrain).format("HH:mm");
        console.log(firstTrainToday)
        var nextTrain = moment().diff(moment(firstTrainToday, moment()));
        // var nextTrain = moment().diff(momemt(firstTrain, "minutes"));
        console.log(nextTrain)
      
        

        $("#trainSchedule").find('tbody')
            .append($('<tr>')
                .append($('<td>').text(snap.name))
                .append($('<td>').text(snap.destination))
                .append($('<td>').text(snap.frequency))
                // .append($('<td>').text(nextTrain))
                // .append($('<td>').text(minutesAway))
            )
    });
});