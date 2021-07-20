​### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

Superhero Top Trumps 
UPDATE READ ME 1 POINT 5 OF CREATING THE GAME

## Table of Contents
* [Overview](#overview)
* [Brief](#brief)
* [Technologies Used](#technologies)
* [Set up](#setup)
* [Index page](#index)
* [Individual page](#individual)
* [Top Trumps page](#toptrumps)
* [Lessons learned](#lessons)
* [Future improvements](#future)
* [Contributors](#contributors)

<a name="overview"></a>
## Overview
We were given 48 hours to create a website of our choice that uses a free API. We found one that  had information about superheroes and decided to display the information on cards and do our own version of top trumps.

You can see the end results here.
API Used here

<a name="brief"></a>
## Brief
* Use a public API
* Apply KISS (Keep It Simple Stupid) and Dry (Don’t Repeat Yourself)
* Deploy the project online

<a name="technologies"></a>
## Technologies used
* HTML5
* CSS
* React
* VSCode Live Share
* Animate.css

<a name="setup"></a>
## Set up
After coming up with the idea for our website, we tested the API  by using a rest client to see how information would be received. We then made the same request in React to display all the superhero names as a final check. I then set up a quick nav bar so that we could navigate between the different pages that we wanted.

<a name="index"></a>
## Index page
We both worked on the index page to display the information. Since there are so many entries the into the database it can take a few seconds to load and display it all. We used a use state and conditionals to display a spinner until the information had been loaded.  We used react router dom to create links to the other pages. When you click on one of the superhero cards it add the id of the card to the url which is used for the Individual show page.

![](/images/screenshot1.png)

<a name="individual"></a>
## Individual Page
To access the information of a single card we used the id of the card given to us by the url. This was then used in the get request to api. Our main focus for this page was to have an effect where you could flip the superhero card to make it seem more like the Top Trumps game. This was done by creating an on click event on the container of the card the toggles the class ‘is-flipped’ on and off. Depending on if the class is on or off, the front and back of the card rotate 180 deg on the y axis.

![](/images/screenshot2.png)

<a name="toptrumps"></a>
## Top Trumps Game
I mainly focused on this page while Rizwan focused on the the Individual page. How we decided we wanted the game to work was by giving the user 3 cards to see how far they could get by comparing the stats against random cards. To get user’s cards, I got three random indexes of all the cards and put them in an array. Then I displayed the stats of the card as well as what cards the user had remaining. I then got another random index for the card that the user had to guess against but did a check to make sure that the index hadn’t already been selected so that the user could’t play against a card that they have in their deck.

![](/images/screenshot3.png)
![](/images/screenshot4.png)

To compare the choices after the user picks a stat, the key is stored in a use state so the value of both cards can be accessed when the comparison is made to see who scored higher. If the user wins then their score increases by one and if they lose then their card is popped from the array which contains their deck and the next one is displayed. When a draw occurs nothing happens to the user’s cards but in all cases a new card to compare against is shown. Once the user runs out of all their cards then the game over screen is shown which displays their score. If their score is higher than what has been saved in their local storage then it gets updated. An option to play again is available as well.

![](/images/screenshot5.png)
![](/images/screenshot6.png)

When testing it became clear that you couldn’t lose if you were given a card that had a stat with a value of 100. To get around this, I made a change so that if you select a stat with 100 on it your card gets swapped out for a different one to make the game a little bit harder.



<a name="lessons"></a>
## Lessons Learned
While pair programming I realised that it is important to make it clear what each person is doing so our code doesn’t effect the other person. As well as this sticking to a naming convention so that we are consistent throughout the project. Also, the planning beforehand needs to be a lot clearer so that there is no confusion between both people. I feel like we were able to plan our project out effectively so that we didn’t run into any of those issues.

<a name="future"></a>
## Future Improvements
* Mobile Friendly
* Using the card flipping effect in the Top Trumps game as well
* Improving the overall design of the game.

<a name="contributors"></a>
## Contributors
I worked with Rizwan for this project and you can find his GitHub here.