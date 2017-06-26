/**
 * @author Jonas Bakker <jonasbakker1@gmail.com> and Tobias Weller <tobias.weller@kit.edu>
 */
(function() {

    if (annyang) {

        //either statements:
        annyang.debug(annyangDebug);

        //decide on genereal mode
        if (mw.config.get('wgVcUserConfig').alwaysOn == true) {
            console.log('VoiceCommander Always On Mode: Activated');
            //add just the nameCommand
            annyang.addCommands(nameCommand);
            //explanation of the rest see else block
            SpeechKITT.annyang();
            SpeechKITT.setStylesheet(mw.config.get('wgScriptPath') + '/extensions/VoiceCommander/modules/lib/css/' + mw.config.get('wgVcUserConfig').style + '.css');
            SpeechKITT.setInstructionsText('');
            SpeechKITT.vroom();
            $('#skitt-listening-box').hide();
            SpeechKITT.startRecognition();
            $('#skitt-toggle-button').css('cursor', 'default');

            annyang.addCallback('result', function(userSaid) {
                console.log(userSaid); // sample output: 'hello'
                if (annyangCallback) {
                    userSaid = reorderSpeeches(userSaid, mw.config.get('wgVcUserConfig').commandersName);
                    annyangCallback = false;
                }
            });
            annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
                sendStatisticRequest(userSaid, 1, annyang.getConfidence());
                SpeechKITT.setInstructionsText(userSaid);
            });
            annyang.addCallback('resultNoMatch', function(phrases) {
                sendStatisticRequest(phrases[0], 0, annyang.getConfidence());
                SpeechKITT.setInstructionsText("I don't understand: " + phrases[0]);
                //   SpeechKITT.setSampleCommands(phrases[0]);
                $('#skitt-toggle-button').addClass('wrong'); //shaking of the microphone to signal false command
                setTimeout(function() {
                    $('#skitt-toggle-button').removeClass('wrong');
                    reset();
                }, 3000);
            });
        } //always on activated end
        else {
            console.log('VoiceCommander Always On Mode: Deactivated');
            //Add Commands to annyang
            annyang.addCommands(commands);
            //Attach Annyang to SpeechKITT
            SpeechKITT.annyang();
            //Set appropriate styling to whatever it was set on by the user
            SpeechKITT.setStylesheet(mw.config.get('wgScriptPath') + '/extensions/VoiceCommander/modules/lib/css/' + mw.config.get('wgVcUserConfig').style + '.css');
            //Render SpeechKITT on screen
            SpeechKITT.vroom();


            $('#skitt-toggle-button').click(function() {
                //Set Sample Commands to give examples to the user
                SpeechKITT.setInstructionsText(sampleCommands[randomNumber(0, sampleCommands.length - 1)]);
                SpeechKITT.toggleRecognition();
            });

            annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
                sendStatisticRequest(userSaid, 1, annyang.getConfidence());
                SpeechKITT.setInstructionsText(userSaid);
            });
            annyang.addCallback('resultNoMatch', function(phrases) {
                sendStatisticRequest(phrases[0], 0, annyang.getConfidence());
                SpeechKITT.setInstructionsText("I don't understand: " + phrases[0]);
                //   SpeechKITT.setSampleCommands(phrases[0]);
                $('#skitt-toggle-button').addClass('wrong'); //shaking of the microphone to signal false command
                setTimeout(function() {
                    $('#skitt-toggle-button').removeClass('wrong');
                    reset();
                }, 3000);
            });
        } //always on deactivated end
    } else {
        console.log('Annyang is not availaible in this browser.');
    }


}());


function retrigger(input, usercommand) {
    var commandersName = mw.config.get('wgVcUserConfig').commandersName;
    //Wenn der Name gleich ist
    if (input.trim() == commandersName.trim()) {
        //Add existing events
        annyang.removeCommands(nameCommand);
        annyang.addCommands(commands);
        //Trigger Event
        annyang.trigger(usercommand);
        
        //Anschließend wieder umkehren
        annyang.removeCommands(commands);
        annyang.addCommands(nameCommand);
    }
    annyangCallback = true;
}


/**
 * Callbacks
 **/
annyang.addCallback('errorPermissionDenied', function(error) {
    $('#skitt-listening-box').css('display', 'inline-block');
    SpeechKITT.setInstructionsText("You denied VC's permission to use the microphone.");
});

annyang.addCallback('errorPermissionBlocked', function(error) {
    $('#skitt-listening-box').css('display', 'inline-block');
    SpeechKITT.setInstructionsText("Your browser blocked VC to use the microphone.");
});

annyang.addCallback('errorNetwork', function(error) {
    $('#skitt-listening-box').css('display', 'inline-block');
    SpeechKITT.setInstructionsText("Network failure. Check your internet connection.");
});



/**
 * Util functions
 **/
function reset() {
    if (mw.config.get('wgVcUserConfig').alwaysOn == true) {
        console.log('Resetting the UI and set of commands.');
        $('#skitt-listening-box').css('display', 'none !important');
        SpeechKITT.setInstructionsText("");
    } else {
        console.log('Resetting the UI.');
        $('#skitt-listening-box').css('display', 'inline-block');
        SpeechKITT.setInstructionsText(sampleCommands[randomNumber(0, sampleCommands.length - 1)]);
        SpeechKITT.abortRecognition();
    }
}


function randomNumber(i, j) {
    return Math.floor(Math.random() * j) + i;
}


function reorderSpeeches(array, name) {
    if (array[0].indexOf(name) == -1) {
        $.each(array, function(idx, val) {
            if (val.indexOf(name) > -1) {
                //swap
                array.move(0,idx);
            }
        });
    }

}

Array.prototype.move = function(old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};
