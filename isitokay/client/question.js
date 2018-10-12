/**
 * Simple javascript to read Question & Answer and send them to the backend...
 */

$(document).ready(function () {
    // Typewriter
    let counter1 = 0;
    let title1 = 'You have a weird question? ';
    let counter2 = 0;
    let title2 = 'Good. Go ahead & answer it! ';
    let speed = 100; /* The speed/duration of the effect in milliseconds */

    typeTitel1();

    /**
     * typeTytle Function
     */
    function typeTitel1() {
        if (counter1 < title1.length) {
            document.getElementById('title1').innerHTML += title1.charAt(counter1);
            counter1++;
            setTimeout(typeTitel1, speed);
        } else {
            console.log('read here');
            typeTitel2();
        }
    }

    /**
     * typeTytle Function
     */
    function typeTitel2() {
        if (counter2 < title2.length) {
            document.getElementById('title2').innerHTML += title2.charAt(counter2);
            counter2++;
            setTimeout(typeTitel2, speed);
        } else {
            $('.container').css('opacity', 1);
        }
    }

    

    // Simple json data model
    let dataModel = {
        question: '',
        answers: [],
    };

    // Generate Button Listener
    $('#formButton').click(function () {
        let dataValid = true;

        if (!$('#formQuestion').val()) {
            $('#formQuestion').addClass('is-invalid');
            dataValid = false;
        }

        if (!$('#formAnswer').val()) {
            $('#formAnswer').addClass('is-invalid');
            dataValid = false;
        }

        if (dataValid) {
            // Adding data
            dataModel.question = $('#formQuestion').val();
            dataModel.answers.push($('#formAnswer').val());
            console.log('Sending data: ' + JSON.stringify(dataModel));
            let url = window.location + '?generate';
            console.log(url);

            $.post(url, JSON.stringify(dataModel), function (result) {
                console.log(decodeURIComponent(result));
            });
        }
    });
});
