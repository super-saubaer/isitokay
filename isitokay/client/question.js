/**
 * Simple javascript to read Question & Answer and send them to the backend...
 */

$(document).ready(function () {
    // Typewriter
    let title1 = 'You have a weird question? ';
    let title2 = 'Good. Go ahead & answer it! ';
    let speed = 100; /* The speed/duration of the effect in milliseconds */

    typeTitles('title1', title1, 0);

    /**
     * typeTytle Function
     * @param {string} element - DOM Element
     * @param {string} text - title text
     * @param {number} counter - text counter
     */
    function typeTitles(element, text, counter) {
        if (counter < text.length) {
            // Typing Character
            document.getElementById(element).innerHTML += text.charAt(counter);
            // Waiting for next character
            setTimeout(function () {
                typeTitles(element, text, ++counter);
            }, speed);
        } else {
            // #Abbruchbestimmungen
            if (element.indexOf('title1') > -1) {
                typeTitles('title2', title2, 0);
            } else if (element.indexOf('title2') > -1) {
                $('.container').css('opacity', 1);
            }
        }
    }

    // Simple json data model
    let dataModel = {
        question: '',
        answers: [],
    };

    // Listening on + Button Click
    $(document).on('click', '.button-add', function () {
        $('#myAnswerTemplate').clone().appendTo('#myAnswerContainer');
    });

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
