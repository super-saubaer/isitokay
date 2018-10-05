/**
 * Simple javascript to read Question & Answer and send them to the backend...
 */

$(document).ready(function () {
    // Simple json data model
    let dataModel = {
        question: "",
        answers: [],
    }

    // Generate Button Listener
    $("#formButton").click(function () {
        let dataValid = true;

        if (!$("#formQuestion").val()) {
            $("#formQuestion").addClass("is-invalid");
            dataValid = false;
        }

        if (!$("#formAnswer").val()) {
            $("#formAnswer").addClass("is-invalid");
            dataValid = false;
        }

        if (dataValid) {
            // Adding data
            dataModel.question = $("#formQuestion").val();
            dataModel.answers.push($("#formAnswer").val());
            console.log("Sending data: " + JSON.stringify(dataModel));

            $.post(window.location + "/generate", dataModel, function(result){
                console.log(result);
            });
        }
    });


    function linkCallback(data) {
        console.log(data);

    }
});
