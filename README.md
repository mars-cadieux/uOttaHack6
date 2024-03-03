# LaTeX Latte

## Installation Instructions

1. Install Node.js by running `npm install node` in a command window in the root folder of the repository
2. Ensure you have your local MongoDB running (either as a service or add its path in the relevant folder)
3. Start the server by running the command `node server.js`
4. Now that the server is listening, you may navigate to http://localhost:3000 in your web browser. Note that you will be redirected to http://localhost:3000/login and you will now see the LaTeX Latte login page
5. Log in or create an account and begin generating flashcards!

## LaTeX file formatting

There are a few restrictions on how the LaTeX file must be formatted:

The flashcards are generated from `\\definition{Text1}{Text2}` commands where *Text1* is the term being defined and *Text2* is the definition

You can add `\\code{some text}` where *some text* will be formatted in monospace font with a different colour
