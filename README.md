<img src="https://user-images.githubusercontent.com/11618221/27525962-a422528e-5a42-11e7-8d3c-e54265c669a2.png" alt="Semantic Text Annotator" title="Semantic Text Annotator" align="middle" height="80"/>

Voice Commander
======================

The repository contains the Semantic Text Annotator extension for Semantic MediaWiki. The extension provides a plugin for capturing Text Annotations of wiki articles.


## Table of content
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
	- [Preferences](#preferences)
    - [Commands](#commands)
    - [Always-Listening Mode](#always-listening-mode)
    - [Statistics](#statistics)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Links](#links)

## Prerequisites
* [MediaWiki](http://mediawiki.org) must be installed


## Installation
* Download and extract the repository
* Place the extracted folder in your extension folder of MediaWiki
* Add the following code at the bottom of your LocalSettings.php:</br>
```wfLoadExtension( 'VoiceCommander' );```
* To users running MediaWiki 1.24 or earlier: Add the folloding at the bottom of your LocalSettings.php:</br>
```require_once "$IP/extensions/VoiceCommander/VoiceCommander.php";```

## Usage

### Preferences
* Under user preferences can the style of the Voice Commander be changed.
* Under preferences can the Always On functionality be toggled.


### Commands
The following codes are currently supported by this extension. The words in brackets are optional:
```javascript
	//Search for something in the wiki
	'Search (for)(the) *tag': search, //User searches for something
    'Find (me)(us)(the) *tag': search,
    'Look for (the) *tag': search,
    'Look up (the) *tag': search,

    //Go to a certain wiki page
    'Navigate (me)(us)(to)(the)(page)(site)(article)(about)(the) *tag': navigate, //User wants to navigate somewhere
    'Jump     (me)(us)(to)(the)(page)(site)(article)(about)(the) *tag': navigate,
    'Go       (to)(the)(page)(site)(article)(about)(the) *tag': navigate,
    'Move     (me)(us)(to)(the)(page)(site)(article)(about)(the) *tag': navigate,
    'Show     (me)(us)(to)(the)(page)(site)(article)(about)(the) *tag': navigate,

    //Write something when in the edit mode
    'Type (down) *tag': type, //User wants to type something
    'Enter *tag': type,
    'Insert *tag': type,
    'Write (down) *tag': type,
    'Scribble (down) *tag': type,
    'Note (down) *tag': type,
    'Right *tag': type,

    //Saves a Page when in the edit mode
    '(Now) Save (changes)(this)(page)(my)(edits)': save,
    '(Now) Safe (changes)(this)(page)(my)(edits)': save,

    //Create a new Page
    'Create (the) (new) (wiki) (page)(article)(site) *tag': create,

    //Prints the page
    'Print (this) (the) (page)(article)(site)(section)(column)': print, 
    'Ink it': print,

    //Edits the Current Page
    'Edit (this) (the) (page)(article)(site)(section)(column)': edit
```

* The commands can be applied by clicking on the Speech Recognition button on the bottom left.
* Or, if the Always-Listening Mode is enabled by starting the command with *Ok, Kate*


### Always-Listening Mode
* By enabling the Always-listening Mode, the Voice Commander listens to the speech of the user and reacts when the user starts a phrase by saying *Ok Kate, <Command>*.
* This Mode is by default disabled but can be enabled under the user preferences.



### Statistics
* Statistics are send to an API in order to improve the functionality. However, it can be disabled by commenting out the correpsonding code lines.


## License
The Voice Commander is currently under the MIT License.


## Acknowledgements
The Voice commander uses the JS Library [annyang](https://github.com/TalAter/annyang). This Extension was created for the [Semantic MediaWiki Seminar of the AIFB](http://www.aifb.kit.edu/web/Prüfung/Seminare/WS2015/SMW) in WS17/18 by Jonas Bakker.


## Links

* [MediaWiki Extension Page](https://www.mediawiki.org/wiki/Extension:Voice_Commander)
* [AIFB](http://www.aifb.kit.edu/web/Voice_Commander)
