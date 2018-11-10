# isitokay / weirdquestion / whatstheanswer
Azure Function providing Question &amp; Answer

## How it (shoud) work

1. Site with Forms to insert Question and Answer. 
Feature: Multiple Answers and further options like answers depending on time (Hat der Simple offen? Kurz vor 9: Letzte Runde), weather and what not. User clicks on Generate Button.

2. Question and Answer(s) are send to server backend. Backend stores data on Azure Table Storage. Returns special Link to client.

3. User clicks link -> Server getd data from table storage and provides answer to client

4. Megafun!
