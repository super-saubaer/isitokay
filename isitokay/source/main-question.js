/**
 * Simple javascript to read Question & Answer and send them to the backend...
 */
let $ = require('jquery');

$(document).ready(function () {
    // questionChanged flag
    let questionChanged = false;
    // Typewriter
    const titleUpperText = 'weirdquestion.io ';
    const titleLowerText = 'You have a weird question? Great! Answer it and show the world! ';

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
    typeTitles('title-upper', titleUpperText, 0);

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
            if (element.indexOf('title-upper') > -1) {
                // typeTitles('titleLower', titleLower, 0);
                $('#title-lower').text(titleLowerText);
                // Revealing container
                $('.container').css('opacity', 1);
            } else if (element.indexOf('title-lower') > -1) {
                // Revealing container
                // $('.container').css('opacity', 1);
            }
        }
    }

    // Listening on Add Button Click
    $(document).on('click', '#button-add', function () {
        // new question?
        checkQuestionChanged();
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
        // new question?
        checkQuestionChanged();
        // Getting clostet parent Answer Template
        let removableAnswerTemplate = $(this).closest('#answer-template');
        // Remove Answer Template
        $(removableAnswerTemplate).remove();
    });

    // Listening on time button
    $(document).on('click', '#button-time', function () {
        // new question?
        checkQuestionChanged();
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

    // Listening on Link-Button
    $('#link-button').click(function () {
        link = $(this).attr('href');
        // TODO: Copying Link to clipboard
        // Selecting Text
        // link.select();
        // // Copying selected Text
        // document.execCommand('copy');
        // Opening Link in new Tab
        window.open(link, '_blank');
    });

    // Listening on change of user input
    $(document).on('change', '.form-user-input', function () {
        checkQuestionChanged();
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
                $(this).closest('.button-time').removeClass('btn-outline-warning');
                // Adding danger class
                $(this).closest('.button-time').addClass('btn-outline-danger');
                // Setting Flags
                timeOptionValid = false;
                dataValid = false;
            }
            // Is this time option valid?
            if (timeOptionValid) {
                // Removing warning class
                $(this).closest('.button-time').removeClass('btn-outline-danger');
                // Adding warning class -> normal styling
                $(this).closest('.button-time').addClass('btn-outline-warning');
            }
        });

        // Calling for Answer Link
        if (dataValid) {
            // Simple json data model
            let dataModel = {
                question: '',
                answers: [],
                utcTimeOffset: new Date().getTimezoneOffset(), // Setting UTC Time Offset of client
            };

            // Adding Question Text
            dataModel.question = $('#form-question').val();

            $('.form-answer').each(function () {
                // Adding Answer Text
                let answer = {
                    text: $(this).val(),
                };

                // Getting Answer Time Option
                let answerTimeOption = $(this).next('#button-group').find('.time-option').text();
                // Is it defined?
                if (answerTimeOption && answerTimeOption.length === 11) {
                    // Setting Answer Time option
                    answer.time = answerTimeOption;
                }
                // Pushing answer object to data model
                dataModel.answers.push(answer);
            });
            let questionDataString = JSON.stringify(dataModel);
            console.log('Sending data: ' + questionDataString);
            console.log('data length: ' + questionDataString.length);
            let url = encodeURI(window.location + '?generate=' + questionDataString);

            $.get(url, function (result) {
                if (result) {
                    let link = window.location + decodeURIComponent(result);
                    // setting result link in text element
                    $('#link-text').val(link);
                    // Setting href for button
                    $('#link-button').attr('href', link);
                    // Hiding generate Button
                    $('#generate-button').css('display', 'none');
                    // Showing text container
                    $('#link-container').css('visibility', 'visible');
                    // Setting questionChanged flag
                    questionChanged = true;
                }
            });
        }
    });

    /**
     * Function that checks if question has changed
     */
    function checkQuestionChanged() {
        if (questionChanged) {
            // question already submitted and now changed
            // Changing visibility of link containes & buttons
            $('#generate-button').css('display', 'block');
            // Showing text container
            $('#link-container').css('visibility', 'hidden');
            // toggling questionChanged flag
            questionChanged = false;
        }
    }
});
