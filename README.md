# LaTeX Latte

## Capabilities

LaTex Latte is capable of generating flashcards from LaTeX files that can then be stored and reviewed directly with the webapp. Simply upload a LaTeX file following the formatting specified below, add the course code if you want, and generate the flashcards. Navigate to the flashcards page and begin studying! Click *next* or *previous* to move between flashcards or click the flashcard itself to reveal the answer. 

## Installation Instructions

1. Install Node.js by running `npm install node` in a command window in the root folder of the repository
2. Ensure you have your local MongoDB running (either as a service or add its path in the relevant folder)
3. Start the server by running the command `node server.js`
4. Now that the server is listening, you may navigate to http://localhost:3000 in your web browser. Note that you will be redirected to http://localhost:3000/login and you will now see the LaTeX Latte login page
5. Log in or create an account and begin generating flashcards!

## LaTeX file formatting

There are a few restrictions on how the LaTeX file must be formatted:

The flashcards are generated from `\definition{Text1}{Text2}` commands where *Text1* is the term being defined and *Text2* is the definition

You can add `\code{some text}` where *some text* will be formatted in monospace font with a different colour

Add the following commands to the top of your .tex file in order to be able to use the \definition and \code custom commands (these commands also provide nice formatting for your LaTeX notes):

%new command for writing a definition, will have bold font and will insert a colon after the definition

\newcommand{\definition}[2]{\textbf{#1}: #2}

%custom underline shortcut

\newcommand{\ul}[1]{\underline{\smash{#1}}}
