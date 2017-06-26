/**
 * Functionality
 **/
function search(input) {
    window.location = "index.php?search=" + input;
}

function navigate(input) {
    search(input);
}

function print(input) {
    //    $.post("api.php", { action: "vcoutput", phrases: JSON.stringify(annyang.getPhrases()), confidence: annyang.getConfidence(), success: true, format: 'json' });
    $('#skitt-ui').addClass('noprint'); //MW class for elements to not appear in print
    window.print();
    setTimeout(function() {
        reset();
    }, 2000);
}

function type(input) {
    //   $.post("api.php", { action: "vcoutput", phrases: JSON.stringify(annyang.getPhrases()), confidence: annyang.getConfidence(), success: true, format: 'json' });
    if ($("textarea").length !== 0) {
        var cursorPosition = $("textarea").prop("selectionStart");
        var content = $('textarea').val();
        var newContent = content.substr(0, cursorPosition) + ' ' + input.trim() + ' ' + content.substr(cursorPosition);
        $('textarea').val(newContent);
    } else {
        SpeechKITT.setInstructionsText('I don\'t know where');
    }
    setTimeout(function() {
        reset();
    }, 2500);
}


function edit() {
    editPage(mw.config.get('wgPageName'));
}

function editPage(input) {
    if (mw.config.get('wgAction') != 'edit') {
        window.location = mw.config.get('wgScriptPath') + '/index.php?title=' + input + '&action=edit';
    } else {
        SpeechKITT.setInstructionsText("You are already editing.");
        setTimeout(function() {
            reset();
        }, 2500);
    }
}

function save() {
    if ($('#wpSave').length === 0) {
        SpeechKITT.setInstructionsText("Nothing to save here.");
        setTimeout(function() {
            reset();
        }, 2500);
    } else {
        $('#wpSave').trigger('click');
    }
}

function create(input) {
    //   $.post("api.php", { action: "vcoutput", phrases: JSON.stringify(annyang.getPhrases()), confidence: annyang.getConfidence(), success: true, format: 'json' });
    window.location = mw.config.get('wgScriptPath') + '/index.php?title=' + input + '&action=edit';
}

function naming(input) {
    console.log('Token for changing options of user successfully retrieved.');
    api.optionChange('userjs-vcname', input, function() {
        console.log('Name change successfully communicated to MW.');
        SpeechKITT.setInstructionsText("Congrats. All well and done my new name is " + input);
        commandersName = input;
        setTimeout(function() {
            reset();
            return true;
        }, 2500);
    });

    SpeechKITT.setInstructionsText("Something went wrong there. Try again.");

    setTimeout(function() {
        reset();
        return false;
    }, 2000);
}


function sendStatisticRequest(command, resultmatch, confidence) {
    var server = mw.config.get('wgServer') + mw.config.get('wgScriptPath');
    var date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
    $.get("http://ipinfo.io", function(data) {
        $.post("http://aifb-ls3-vm2.aifb.kit.edu:8081/entry", {
            wiki: server,
            user: mw.config.get('wgUserName'),
            ip: data.ip,
            command: command,
            resultmatch: resultmatch,
            confidence: confidence,
            city: data.city,
            wikipage: mw.config.get('wgPageName'),
            wikiversion: mw.config.get('wgVersion'),
            timestamp: date
        }).always(function() {
            return true;
        });
    }, "jsonp");

}
