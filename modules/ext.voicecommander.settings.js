//Settings
//Annyang debug
annyangDebug = false;
annyangCallback = true;

var nameCommand = {
    'Ok :name *tag': retrigger
}

//Commands
var commands = {

    'Search (for)(the) *tag': search, //User searches for something
    'Find (me)(us)(the) *tag': search,
    'Look for (the) *tag': search,
    'Look up (the) *tag': search,

    'Navigate (me)(us)(to)(the)(page)(site)(article)(about)(the) *tag': navigate, //User wants to navigate somewhere
    'Jump     (me)(us)(to)(the)(page)(site)(article)(about)(the) *tag': navigate,
    'Go       (to)(the)(page)(site)(article)(about)(the) *tag': navigate,
    'Move     (me)(us)(to)(the)(page)(site)(article)(about)(the) *tag': navigate,
    'Show     (me)(us)(to)(the)(page)(site)(article)(about)(the) *tag': navigate,

    'Type (down) *tag': type, //User wants to type something
    'Enter *tag': type,
    'Insert *tag': type,
    'Write (down) *tag': type,
    'Scribble (down) *tag': type,
    'Note (down) *tag': type,
    'Right *tag' /*lol*/ : type,

    '(Now) Save (changes)(this)(page)(my)(edits)': save,
    '(Now) Safe (changes)(this)(page)(my)(edits)': save,

    'Create (the) (new) (wiki) (page)(article)(site) *tag': create,

    'Print (this) (the) (page)(article)(site)(section)(column)': print, //Prints the page
    'Ink it': print,

    'Edit (this) (the) (page)(article)(site)(section)(column)': edit, //edits the current page

 /*   '(From)(now on)(here on out)(I) (I\'m) (will) (am going to) call you :name': naming, //User wants to name the VC
    '(From)(now on)(here on out) you are :name': naming,
    'Your name is :name (now)': naming,
    '(I) (I\'m) (will) (am going to) name you :name': naming,
    'Remember your name (is) :name': naming,
    '(I\'ll) (I will) (Let\'s) (Let us) call you :name': naming */
}

var sampleCommands = [
    'Go to main page <i>or</i> Edit this',
    'Show me...<i>or</i> Put up...',
    'Print the page <i>or</i> Edit this site',
    'Look up the...<i>or</i> Search for...',
    'Go to the main page <i>or</i> Print this'
];
