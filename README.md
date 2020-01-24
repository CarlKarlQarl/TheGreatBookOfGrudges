# Welcome to the Great Book of Grudges
The Great Book of Grudges is an heirloom owned by the dwarves in the Warhammer fantasy mythos. The book is passed on from Dwarven High King to High King, with its pages detailing every insult, smear, and slight ever commited against the dwarves. As a result, the book is an astonishingly detailed recounting of dwarven history.

# Links to each component in the project
Grudge List Back-end
- https://github.com/CarlKarlQarl/dwarven-grudges-submitted
- https://dashboard.heroku.com/apps/dwarven-grudges-submitted

Grudge Submission Front-end
- https://github.com/CarlKarlQarl/dwarven-grudges-submitted-frontend
- https://console.firebase.google.com/project/dwarven-grudges-submitted-fron/overview

User and Logins (Back-end)
- https://github.com/CarlKarlQarl/dwarven-logins
- https://dashboard.heroku.com/apps/dwarven-logins

The Great Book of Grudges (Front-end)
- https://github.com/CarlKarlQarl/TheGreatBookOfGrudges
- https://console.firebase.google.com/project/thegreatbookofgrudges-de5a8/overview

# Map of components
- From the Grudge Submission Front-end, new grudges can be submitted to appear in the Great Book of Grudges front-end.
- Submissions from here are sent to the Grudge List Back-end and wait to be fetched from the Great Book of Grudges front-end.
- Parallel to this is the User and Logins back-end, which handles user creation and authentication upon a login attempt.
- Finally, the Great Book of Grudges front-end has sign-up and log-in forms that communicate with the User and Logins back-end, and once logged in, it will display all the grudges stored in the Grudge List back-end

# Entry point
https://thegreatbookofgrudges-de5a8.firebaseapp.com/

NOTE: The Grudge List and User and Logins back-ends are deployed on Heroku, and will likely need about a minute to wake up. Before that point, the application may stall for a bit, but once the two back-ends are awake, everything should run smoothly.

# Functions
## Sign-up
On the main page, the user will be given an option to sign-up for a new account. By entering a desired username and password, and then hitting the "Sign-up" button, a POST request will be sent to the back-end and create a new user. An alert will pop-up letting the user know the action was successful.
## Log-in
After the user has signed-up, they can use the log-in form to the right of the sign-up form, and use the same log-in they just registered with. This form will send a POST request to the authentication controller in the User and Logins back-end and return a token if the authentication was successful. If unsuccessful, an "unauthorized" status will be returned. But even if the authentication was a success, new users will hit...
## Log-in Rejection
The Great Book of Grudges is meant for dwarven eyes only, and any attempts to log-in with an account other the the current High King of the Dwarves, Thorgrim Grudgebearer, will have the user rejected, and have their username added to the Great Book of Grudges.

As much fun as it would be to make a book and then leave it locked, or have the user guess at the log-in, all the you have to do is "speak friend and enter".

Bleh, enough riddles, the working log-in is:
> Username: Thorgrim_Grudgebearer  
> Password: mellon

## Navigating the Book
Once inside, the arrows on the left and right of the book can be used to scan through the entries in the book, plus any new ones created from unauthorized log-in attempts.

# Possible Future Additions
- Adding a flipping page animation. An attempt was made at doing this earlier, but time constraints had it placed on the back burner.
- Deleting grudges. A simple deletion would be easy to implement, but that doesn't work well within the fact that this is a history book, and ripping out pages is quite oafish, even for the dwarves. Instead, a boolean "active" property could be added to grudges, and this would have grudges either display normally if "active", or crossed-out if "inactive".
- An in-app way to modify or update entries would be convenient.
- Background music? Likely, Edvard Grieg's "In the Hall of the Mountain King"?