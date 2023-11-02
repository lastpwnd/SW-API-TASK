This is the project utilising Star Wars Api (https://www.swapi.tech/)

Project contains main file index.html, JavaScript code in main.js, css styling and images in /css and /img respectively.

Launching index.html will open the page with a very simplistic interface. 
By clicking one of the 6 buttons under the logo you will initiate data fetching, the overlay "loading..." will appear and after several seconds the desired data will be displayed.
Time delay is required for the server to react and send data due to the implemented rate slowing system.
User won't be able to navigate for a certain time, in order not to overflow server with requests, receiving denial.

"Films" contains limited data and has slightly different data configuration. Requires no navigation and only 1 page to be displayed. 
Other categories ("people", "species", "planets", "starships" and "vehicles") contains more data, stored identical way.
By default limit = 10, so there will be at most 10 elements per page, each in its own designated card, with at least 4 parametres, including name/title.
In this categories navigation link(s) will appear in the bottom of the screen.
For the first page only "Next page" link will be present. For the page showing last elements of the category only "Previous Page" button will exist.
Between first and last page both navigational links will appear. 
Scroll bar is hidden, but scrolling itself works.

Sometimes parameters have wrong values (planets have zero diameter, floating point instead integer and so on)
Problem is not in the project, its just database not accurately filled.