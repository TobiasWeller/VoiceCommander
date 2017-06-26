(function() {
    if (annyang) {
        $('#VC_loading').css('display', 'none');
        $('#VC_success').css('display', 'block');
    } else {
        $('#VC_loading').css('display', 'none');
        $('#VC_failure').css('display', 'block');
        $('#preference').hide();
    }
}());
