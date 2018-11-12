/**
 * Simple javascript to read Question & Answer and send them to the backend...
 */
let $ = require('jquery');

$(document).ready(function () {
    // Getting question data first
    let questionData = JSON.parse($('.question-data').text());
    // Typewriter
    let titleUpperText = questionData.question;
    let titleLowerText = selectAnswer(questionData);

    const speed = 80; /* The speed/duration of the effect in milliseconds */

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
            }
        }
    }

    /**
     * Function that selects the answer
     * @param {JSON} questionData - questionData
     * @return {string} answerText
     */
    function selectAnswer(questionData) {
        let answerText = '';
        let answersWithRighTime = [];
        let answersWithNoTime = [];
        let answersWithWrongTime = [];
        let timeNow = new Date();

        // Looping through answers to check time
        for (let i = (questionData.answers.length - 1); i >= 0; i--) {
            if (questionData.answers[i].time) {
                let timeRangeStart = new Date();
                let timeRangeEnd = new Date();
                // Trying to get time values from timeString
                let timeStrings = questionData.answers[i].time.split('-');
                let timesStart = timeStrings[0].split(':');
                let timesEnd = timeStrings[1].split(':');

                // Setting Start Time
                timeRangeStart.setHours(timesStart[0]);
                timeRangeStart.setMinutes(timesStart[1]);

                // Setting End Time
                timeRangeEnd.setHours(timesEnd[0]);
                timeRangeEnd.setMinutes(timesEnd[1]);

                // Checking dates range
                if (timeRangeStart.getTime() >= timeRangeEnd.getTime()) {
                    timeRangeEnd.setDate(timeRangeEnd.getDate() + 1);
                }

                // current time fitting in timerange?
                if (timeRangeStart.getTime() <= timeNow.getTime() && timeNow.getTime() <= timeRangeEnd.getTime()) {
                    // Time fitting
                    answersWithRighTime.push(questionData.answers[i].text);
                } else {
                    // Time not fitting
                    answersWithWrongTime.push(questionData.answers[i].text);
                }
            } else {
                // No time at all
                answersWithNoTime.push(questionData.answers[i].text);
            }
        }

        if (answersWithRighTime.length > 0) {
            // First answer with fitting times
            let randomNumber = getRandomNumber(answersWithRighTime.length);
            answerText = answersWithRighTime[randomNumber];
        } else if (answersWithNoTime.length > 0) {
            // then answer with no times times
            let randomNumber = getRandomNumber(answersWithNoTime.length);
            answerText = answersWithNoTime[randomNumber];
        } else if (answersWithWrongTime.length > 0) {
            // if not fitting and no no time answers, answer with wrong time
            let randomNumber = getRandomNumber(answersWithWrongTime.length);
            answerText = answersWithWrongTime[randomNumber];
        }
        return answerText;
    }

    /**
     * Function that returns a random number wirhin a range
     * @param {number} numberRange -  number of range
     * @return {number} randomNumber
     */
    function getRandomNumber(numberRange) {
        return Math.floor(Math.random() * ((numberRange - 1) - 0 + 1));
    }
});
