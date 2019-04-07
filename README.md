# unit-4-game
Fun and interactive game for web browsers with dynamically updated HTML pages using the jQuery library.

# Avengers: Battle Royale

The Avengers are on a mission to locate the Infinity Gauntler! Choose a hero and survive against other heroes and villains to be the one who ends up with it.

This game is abstracted into a state machine of 3 states (character selection, play match, game over). 
* Character selection
    * Initial state
    * Players choose their character and opponent
    * After an opponent is selected, the game transitions to the play match state
* Play match
    * Players attack their opponent
    * Opponents counter attack the player
    * Players gain experience, which contributes to their attack power
    * If the player's health reaches 0, the game is over and the game transitions to the game over state
    * If the opponent's health reaches 0, the game returns to the character selection state to choose a new opponent
    * If the player defeats all other characters, the game transitions to the game over state
* Game over
    * Players will access the credits if they defeat all other characters
    * Players will access the game over screen if they are defeated

Other features
* Screen is cleared at each stage of the game
* Damage dealt and taken will appear in the character model instead of a message

# Screenshots

# What's New

# Instructions

When the page loads, you will be brought to the Character Select Screen. Choose your hero, and then select your opponent. 

Once the match starts, you will be transported to the Arena, where you will be able to perform special abilities and fight your opponent. For each successful attack landed, you'll gain experience that will allow you to attack with stronger abilities. Defeat your opponent, and you will return to the Character Select Screen to choose your next opponent. Lose, and the game is over. 

All experience gains carry over to the next match.

## Issues ([Feature], [Bug])

* [Bug] When character model is loaded in Arena, hp section is removed (Fixed by re-adding on load)
* [Feature] Refactor character stats
* [Feature] Add border when selecting a hero or villain on the Character Select Screen
* [Feature] Add character model when hovered or selected on Character Select Screen
* [Feature] Prevent health from reducing less than 0
* [Feature] Add special abilities (Iron Man - fire cannon, Captain America - shield bash, Black Widow - increase speed, Hulk - go berserk)
* [Feature] Add resource bar for special abilities
* [Feature] Make attack and counter attack calculated (i.e. attack and counter attack are ranges, attack is multiplied times a modifier for Black Widow, experience impacts characters differently)
* [Feature] Extend to more Marvel characters with cool abilities (Spider Man - shoot web, Black Panther - absorb damage & counter attack, Ant Man - shrink/grow, Dr. Strange - go back in time and heal)
* [Feature] Make mobile responsive for phones
* [Feature] Refactor game and character objects to efficiently handle player and opponent objects 


# References

* Used event delegation to remove character choices from the menu after selected
    * https://stackoverflow.com/questions/28108736/jquery-click-function-still-works-after-removeclass