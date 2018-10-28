/**
 * Simple javascript to read Question & Answer and send them to the backend...
 */
let $ = require('jquery');

$(document).ready(function () {
    // Typewriter
    // const titleUpper = 'You have a weird question? ';
    // const titleLower = 'Good. Go ahead & answer it! ';

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
        // clearing time
        $(clonedAnswerTemplate).find('.badge').text('');

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

    // Listening on time button
    $(document).on('click', '#button-time', function () {
        // Getting Clockpicker element
        let clockPicker = $(this).closest('.clockpicker');
        // Removing all eventListeners first -> Necesarry if user wants to reset time
        $(clockPicker).find('input').off();
        // clearing Badge Value -> Necesarry if user wants to reset time
        $(this).find('.badge').text('');

        // Initializing & Listening on input element
        clockPicker.clockpicker().find('input').change(function () {
            // Getting current Badge Value
            let currentBadgeValue = $(this).closest('.clockpicker').find('.badge').text();
            let newBadgeValue = '';
            // Flag indicating if second clockPicker needs to be shown
            let setToTime = false;
            // Flag indicating if ClockPicker event listeners should be removed.
            if (!currentBadgeValue) {
                // Setting from-time
                newBadgeValue = this.value + '-';
                setToTime = true;
            } else {
                // Setting to-time
                newBadgeValue = currentBadgeValue + this.value;
            }

            // Setting time value in badge
            $(this).closest('.clockpicker').find('.badge').text(newBadgeValue);

            // Showing ClockPicker for to-time
            if (setToTime) {
                clockPicker.clockpicker('show');
            }
        });
        clockPicker.clockpicker('show');
    });

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

        // TimeOption(s) defined?
        $('.time-option').each(function () {
            // Preparing flag
            let timeOptionValid = true;
            // Getting time option value
            let timeOption = $(this).text();
            // Is there a time option and is it valid?
            if (timeOption && timeOption.length !== 11) {
                // Removing warning class
                $(this).closest('#button-time').removeClass('btn-outline-warning');
                // Adding danger class
                $(this).closest('#button-time').addClass('btn-outline-danger');
                // Setting Flags
                timeOptionValid = false;
                dataValid = false;
            }
            // Is this time option valid?
            if (timeOptionValid) {
                // Removing warning class
                $(this).closest('#button-time').removeClass('btn-outline-danger');
                // Adding warning class -> normal styling
                $(this).closest('#button-time').addClass('btn-outline-warning');
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
