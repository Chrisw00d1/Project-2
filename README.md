![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

# Superhero Top Trumps 

![gif](/images/superheroGif.gif)

## Table of Contents
* [Overview](#overview)
* [Brief](#brief)
* [Technologies Used](#technologies)
* [Set up](#setup)
* [Index page](#index)
* [Individual page](#individual)
* [Top Trumps page](#toptrumps)
* [Wins and Challenges](#wins)
* [Lessons learned](#lessons)
* [Future improvements](#future)
* [Contributors](#contributors)

<a name="overview"></a>
## Overview
In pairs we were given 48 hours to create a website of our choice that uses a free API. We found one that had information about superheroes and decided to display the information on cards and do our own version of top trumps.

You can see the end result [here](https://superherocards.netlify.app/)
API Used [here](https://akabab.github.io/superhero-api/api/)

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
After coming up with the idea for our website, we tested the API  by using a rest client to see how information would be received. We then made the same request in React to display all the superhero names as a final check. I then set up a quick nav bar so that we could navigate between the different pages that we wanted. We decided that while we were working together we would use liveshare so that we were both able to code on the project at the same time. If we worked on it later in our own time we would do it solo then combine the code when we met up in the morning again.

<a name="index"></a>
## Index page

![index](/images/screenshot1.png)

We both worked on the index page to display the information. Since there are so many entries the into the database it can take a few seconds to load and display it all. We used a use state and conditionals to display a spinner until the information had been loaded.

```js
return (
    <div>
      <div className='content'>
        <input type='text' placeholder='Search' onInput={handleInput} />
        <div className='all-cards'>
          {superheros ? (
            filterSearch(superheros, search).map(superhero => {
              return <SuperHeroCard key={superhero.id} name={superhero.name} image={superhero.images.sm} publisher={superhero.biography.publisher} id={superhero.id} />
            })
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  )
```
We used react router dom to create links to the other pages. When you click on one of the superhero cards it add the id of the card to the url which is used for the Individual show page.

```js
return (
    <div className={`card ${publisher}`}>
      <Link to={`/${id}`} className='card-display'>
        <h2>{name}</h2>
        <img src={image} alt={name} />
      </Link>
    </div>
  )
```

<a name="individual"></a>
## Individual Page

![show](/images/screenshot2.png)

To access the information of a single card we used the id of the card given to us by the url. This was then used in the get request to api. Our main focus for this page was to have an effect where you could flip the superhero card to make it seem more like the Top Trumps game. This was done by creating an on click event on the container of the card the toggles the class ‘is-flipped’ on and off. Depending on if the class is on or off, the front and back of the card rotate 180 deg on the y axis.

```js
<div className={`card_details ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
  <div className='card_inner_details'>
    <div className={`card_frontface ${superhero.biography.publisher}`} style={{
      backgroundImage: `url(${superhero.images.md})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <small>(Click the card to see stats)</small>
    </div>

    <div className={`card_backface ${superhero.biography.publisher}`} style={{
      backgroundImage: `url(${superhero.images.md})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className='back_stats'>
        <h4>STATS</h4>
        <p>Intelligence: {superhero.powerstats.intelligence}</p>
        <p>Strength: {superhero.powerstats.strength}</p>
        <p>Speed: {superhero.powerstats.speed}</p>
        <p>Durability: {superhero.powerstats.durability}</p>
        <p>Power: {superhero.powerstats.power}</p>
        <p>Combat: {superhero.powerstats.combat}</p>
      </div>
    </div>
  </div>
</div>
```

<a name="toptrumps"></a>
## Top Trumps Game

![game1](/images/screenshot3.png)

I mainly focused on this page while Rizwan focused on the the Individual page. How we decided we wanted the game to work was by giving the user 3 cards to see how far they could get by comparing the stats against random cards. To get user’s cards, I got three random indexes of all the cards and put them in an array. Then I displayed the stats of the card as well as what cards the user had remaining. I then got another random index for the card that the user had to guess against but did a check to make sure that the index hadn’t already been selected so that the user could’t play against a card that they have in their deck.


```js
function randomIndexes(length) {
  const array = []
  while (array.length < 3) {
    const index = Math.floor(Math.random() * length)
    if (!array.includes(index)) array.push(index)
  }
  return array
}
```

To compare the choices after the user picks a stat, the key is stored in a use state so the value of both cards can be accessed when the comparison is made to see who scored higher. If the user wins then their score increases by one and if they lose then their card is popped from the array which contains their deck and the next one is displayed. When a draw occurs nothing happens to the user’s cards but in all cases a new card to compare against is shown. Once the user runs out of all their cards then the game over screen is shown which displays their score. If their score is higher than what has been saved in their local storage then it gets updated. An option to play again is available as well.

```js
const handleChoice = (e) => {
  const choice = e.currentTarget.innerText.split(':')
  if (!selection) {
    setSelection(choice[0].toLowerCase())
    setGameStarted(true)
  }
}
```

```js
function claculateWinner(player, computer) {
  if (player === computer) return 'Draw'
  else if (player > computer) return 'Win'
  else return 'Lose'
}
```

When testing it became clear that you couldn’t lose if you were given a card that had a stat with a value of 100. To get around this, I made a change so that if you select a stat with 100 on it your card gets swapped out for a different one to make the game a little bit harder.

```js
if (winner !== 'Lose' && superHeros[randomCardIndex[randomCardIndex.length - 1]].powerstats[selection] === 100 && randomCardIndex.length !== 0) {
  randomCardIndex[randomCardIndex.length - 1] = calculateRandomCard(randomCardIndex, superHeros)
  setRandomCardIndex(randomCardIndex)
}
```

<a name='wins'></a>
## Wins and Challenges
One of the wins for this project is that we were able to implement our main goals being the game and the card flip. We were able to set ourselves realistic goals for short amount of time we had. We were also very clear if we were changing something that could effect the other person which meant we didn't have any issues of deleting eachothers code.

Despite that, one of the challenges was using liveshare throughout all of it. If I was writing code it prevented Rizwan being able to test to see if his code is working and vise versa. I can see the benefits of using it when you are both working on the same issue but when you are working on seperate things it can slow things down. Also getting used to how React works with it's rendering proved a little challenging at times.

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
I worked with Rizwan for this project and you can find his GitHub [here](https://github.com/rizwanakhtar7)