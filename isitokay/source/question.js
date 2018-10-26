/**
 * Simple javascript to read Question & Answer and send them to the backend...
 */
let $ = require('jquery');

$(document).ready(function () {
    // Typewriter
    // const titleUpper = 'You have a weird question? ';
    // const titleLower = 'Good. Go ahead & answer it! ';

    // $('#button-time').clockpicker({
    //     'placement': 'bottom',
    //     'align': 'right',
    //     'autoclose': true,

    // });


    const titleUpper = 'weirdquestion.io ';
    const titleLower = 'You have a weird question? Great! Answer it and show the world! ';

    const speed = 100; /* The speed/duration of the effect in milliseconds */
    // Placeholder Texts
    const placeholderAnswers = [
        'Okay. But only 3',
        'Is this realy a question?',
        'BEEEER!!11!',
        'If you wait another 2 minutes it should be fine',
        'Ahem. Always. ',
    ];

    // Starting Typewriter
    typeTitles('titleUpper', titleUpper, 0);

    /**
     * typeTitles Function
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
            if (element.indexOf('titleUpper') > -1) {
                // typeTitles('titleLower', titleLower, 0);
                $('#titleLower').text(titleLower);
                // Revealing container
                $('.container').css('opacity', 1);
            } else if (element.indexOf('titleLower') > -1) {
                // Revealing container
                // $('.container').css('opacity', 1);
            }
        }
    }

    // Simple json data model
    let dataModel = {
        question: '',
        answers: [],
    };

    // Listening on Add Button Click
    $(document).on('click', '#button-add', function () {
        // Clonging Answer
        let clonedAnswerTemplate = $('#answer-template').clone();
        // Getting random Placeholder Text
        let placeHolderText = placeholderAnswers[Math.round(Math.random() * ((placeholderAnswers.length - 1) - 0))];
        // Setting on child element
        $(clonedAnswerTemplate).find('#form-answer').attr('placeholder', placeHolderText);
        // clearing text
        $(clonedAnswerTemplate).find('#form-answer').val('');

        // Changing Add Button to Remove Button
        $(clonedAnswerTemplate).find('#button-add').find('i').text('remove');
        $(clonedAnswerTemplate).find('#button-add').attr('id', 'button-remove');

        // // Adding Remove Button
        // let removeButtonElement = $(clonedAnswerTemplate).find('#button-add').clone();
        // // Setting ID and Remove Icon
        // $(removeButtonElement).attr('id', 'button-remove');
        // $(removeButtonElement).find('i').text('remove');
        // // Inserting bevor add button
        // $($(clonedAnswerTemplate).find('#button-add')).before(removeButtonElement);

        // Inserting Complete Answer Element into DOM
        $(clonedAnswerTemplate).appendTo('#answer-container');
    });

    // Listening on Remove Button Click
    $(document).on('click', '#button-remove', function () {
        // Getting clostet parent Answer Template
        let removableAnswerTemplate = $(this).closest('#answer-template');
        // Remove Answer Template
        $(removableAnswerTemplate).remove();
    });

    $('.clockpicker').clockpicker()
        .find('button').change(function () {
            // TODO: time changed
            console.log(this.value);
        });
    $('#button-time').clockpicker({
        autoclose: false,
        donetext: 'thisishitty',
    });




    // Listening on time button
    $(document).on('click', '#button-time', function () {
        console.log('button-time');
        // Hanging on listener
        $('#button-time').clockpicker('show') // Or hide, remove ...
            .clockpicker('toggleView', 'minutes');


        // // Creating
        // let clockFrom = $('#button-time').clockpicker();
        // clockFrom.clockpicker().find('input').change(function () {
        //     // TODO: time changed
        //     console.log(this.value);
        // });
        // // Listening

        // // Showing
        // clockFrom.clockpicker('show');
    });


    // $('.clockpicker').clockpicker()
    //     .find('input').change(function () {
    //         // TODO: time changed
    //         console.log(this.value);
    //     });
    // $('#demo-input').clockpicker({
    //     autoclose: true
    // });

    // Generate Button Listener
    $('#generate-button').click(function () {
        let dataValid = true;

        // Question defined?
        if (!$('.form-question').val()) {
            $('.form-question').addClass('is-invalid');
            dataValid = false;
        } else {
            // In case it was invalid already
            $('.form-question').removeClass('is-invalid');
        }

        // Answer(s) defined?
        $('.form-answer').each(function () {
            if (!$(this).val()) {
                $(this).addClass('is-invalid');
                dataValid = false;
            } else {
                // In case it was invalid already
                $(this).removeClass('is-invalid');
            }
        });

        // Calling for Answer Link
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
