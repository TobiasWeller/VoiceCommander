<?php
class VoiceCommanderSpecial extends SpecialPage {
    function __construct() {
        parent::__construct( 'VoiceCommander' );
    }

    function getGroupName() {
        return 'wiki';
    }

    function execute( $par ) {
        $out = $this->getOutput();
        $request = $this->getRequest();
        $user = $this->getUser();
        $this->setHeaders();
        $out->setPageTitle( $this->msg( 'sta-special-title' ) );

        //Intro Text
        $out->addWikiMsg( 'vc-special-intro' );

        //Compatibility
        $out->addWikiText( '== '.$this->msg( 'vc-compatibility-title' ).' ==' );
        $out->addWikiMsg( 'vc-special-check-compatibility' );

        
        if ($user->getId() != 0){
          //Preference Title
          $out->addHTML("<div id='preference'>");
          $out->addWikiText( '== '.$this->msg( 'vc-preferences-title' ).' ==' );

          $styleOption = $user->getOption( 'VoiceCommander-name' );
          $nameOption = $user->getOption( 'userjs-vcname' );
                if($nameOption === "" || $nameOption === 0 ||$nameOption === null){
                    $nameOption = "Kate";
                }

          //Voice Commander Name
          $out->addWikiText( "*" . $this->msg( 'vc-special-user-change-name-1' ) . "'''" . $nameOption . "'''" );
          $out->addWikiText( ":*" . $this->msg( 'vc-special-user-change-name-2' ) . "''Ok " . $nameOption . $this->msg( 'vc-special-user-change-name-3' ) . "''" );
          
          //Current Style
          $out->addWikiText( "*" . $this->msg( 'vc-special-user-style' ) . "'''" . $styleOption . "'''" );

          //Push Button Listening Mode
          if($user->getOption('VoiceCommander-hidesig')){
            $out->addWikiText( "*" . $this->msg( 'vc-special-user-listening-mode' ) . $this->msg( 'vc-special-user-not-always-listening' ) );
          }else{
          	$out->addWikiText( "*" . $this->msg( 'vc-special-user-listening-mode' ) . $this->msg( 'vc-special-user-always-listening' ) );
          }

          //Link to Preferences
          $out->addWikiText( '[[Special:Preferences#mw-prefsection-vc-title|Click here]] to change your preferences on style and listening mode.' );
          $out->addHTML("</div>");
        }


        $out->addModules('ext.voicecommander.special');

    }

}
