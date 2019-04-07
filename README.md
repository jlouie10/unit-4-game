# unit-4-game
Fun and interactive game for web browsers with dynamically updated HTML pages using the jQuery library.

# Avengers: Battle Royale

The Avengers are on a mission to locate the Infinity Gauntler! Choose a hero and survive against other heroes and villains to be the one who ends up with it.

This game is abstracted into a state machine of 3 states (character selection, play match, game over). 
- The game starts in the character selection state
    - Players choose their character and opponent
    - After an opponent is selected, the game transitions to the play match state
- Play match state
    - Players attack their opponent
    - Opponents counter attack the player
    - Players gain experience, which contributes to their attack power
    - If the player's health reaches 0, the game is over and the game transitions to the game over state
    - If the opponent's health reaches 0, the game returns to the character selection state to choose a new opponent
    - If the player defeats all other characters, the game transitions to the game over state
- Game over state
    - Players will access the credits if they defeat all other characters
    - Players will access the game over screen if they are defeated

Separate screen for each stage of the game:
- Character Select
- Arena

# Screenshots

# What's New

# Instructions

When the page loads, you will be brought to the Character Select Screen. Choose your hero, and then select your opponent. 

Once the match starts, you will be transported to the Arena, where you will be able to perform special abilities and fight your opponent. For each successful attack landed, you'll gain experience that will allow you to attack with stronger abilities. Defeat your opponent, and you will return to the Character Select Screen to choose your next opponent. Lose, and the game is over. 

All experience gains carry over to the next match.

# Issues

# References