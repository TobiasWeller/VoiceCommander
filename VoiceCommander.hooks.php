<?php
/**
 * Hooks for VoiceCommander extension
 *
 * @file
 * @ingroup Extensions
 */

class VoiceCommanderHooks {

    /* Protected Static Members */

    protected static $features = array(
    'hidesig' => array(
      'preferences' => array(
        'VoiceCommander-hidesig' => array(
          'type' => 'toggle',
          'label-message' => 'vc-pref-mypref2',
          'section' => 'vc-title/vc-bar1',
            'help-message' => 'vc-pref-mypref1-help',
        ),
      ),
    ),
    'name' => array(
      'preferences' => array(
        'VoiceCommander-name' => array(
          'type' => 'radio',
          'label-message' => 'vc-pref-mypref3',
            'section' => 'vc-title/vc-bar2',
          'options' => array(
                'Basic Theme' => 'Basic',
                'Amethyst' => 'Amethyst',
                'Clouds' => 'Clouds',
                        'Concrete' => 'Concrete',
                        'Emerald' => 'Emerald',
                        'Midnight' => 'Midnight',
                        'Orange' => 'Orange',
                        'Pomegranate' => 'Pomegranate',
                        'Pumpkin' => 'Pumpkin',
                        'Turquoise' => 'Turquoise',
            ),
          'default' => 'Basic',
            'help-message' => 'vc-pref-mypref3-help',
        )
      )
    ),
    );

    /* Static Methods */

    /**
     * Checks if a certain option is enabled
     *
     * This method is public to allow other extensions that use VoiceCommander to use the
     * same configuration as VoiceCommander itself
     *
     * @param $name string Name of the feature, should be a key of $features
     * @return bool
     */
    public static function isEnabled( $name ) {
        global $wgVoiceCommanderFeatures, $wgUser;

        // Features with global set to true are always enabled
        if ( !isset( $wgVoiceCommanderFeatures[$name] ) || $wgVoiceCommanderFeatures[$name]['global'] ) {
            return true;
        }
        // Features with user preference control can have any number of preferences to be specific values to be enabled
        if ( $wgVoiceCommanderFeatures[$name]['user'] ) {
            if ( isset( self::$features[$name]['requirements'] ) ) {
                foreach ( self::$features[$name]['requirements'] as $requirement => $value ) {
                    // Important! We really do want fuzzy evaluation here
                    if ( $wgUser->getOption( $requirement ) != $value ) {
                        return false;
                    }
                }
            }
            return true;
        }
        // Features controlled by $wgVoiceCommanderFeatures with both global and user set to false are awlways disabled
        return false;
    }

    /**
     * EditPage::showEditForm:initial hook
     *
     * Adds the modules to the edit form
     *
     * @param $toolbar array list of toolbar items
     * @return bool
     */
    public static function editPageShowEditFormInitial( &$toolbar ) {
        global $wgOut;

        // Add modules for enabled features
        foreach ( self::$features as $name => $feature ) {
            if ( isset( $feature['modules'] ) && self::isEnabled( $name ) ) {
                $wgOut->addModules( $feature['modules'] );
            }
        }
        return true;
    }

    /**
     * EditPageBeforeEditToolbar hook
     *
     * Disable the old toolbar if the new one is enabled
     *
     * @param $toolbar html
     * @return bool
     */
    public static function EditPageBeforeEditToolbar( &$toolbar ) {
        if ( self::isEnabled( 'toolbar' ) ) {
            $toolbar = Html::rawElement(
                'div', array(
                    'class' => 'VoiceCommander-oldToolbar',
                    'style' => 'display:none;'
                ),
                $toolbar
            );
        }
        return true;
    }

    /**
     * GetPreferences hook
     *
     * Adds VoiceCommander-releated items to the preferences
     *
     * @param $user User current user
     * @param $defaultPreferences array list of default user preference controls
     * @return bool
     */
    public static function getPreferences( $user, &$defaultPreferences ) {
        global $wgVoiceCommanderFeatures;

        foreach ( self::$features as $name => $feature ) {
            if (
                isset( $feature['preferences'] ) &&
                ( !isset( $wgVoiceCommanderFeatures[$name] ) || $wgVoiceCommanderFeatures[$name]['user'] )
            ) {
                foreach ( $feature['preferences'] as $key => $options ) {
                    $defaultPreferences[$key] = $options;
                }
            }
        }
        return true;
    }

  public static function getScripts (&$out, &$text) {

    if($out->getTitle()->getNamespace() == 0) {
      $out->addModules('ext.voicecommander.module');
    }
    return true;
  }

  public static function onBeforePageDisplay (OutputPage &$out, Skin &$skin) {
    $out->addModules('ext.voicecommander.module');
    return true;
  }

    public static function onMakeGlobalVariablesScript( array &$vars, OutputPage $out ) {
        $vcUser = $out->getContext()->getUser();
        if($vcUser->getId()!= 0){
            $vcStyle = $vcUser->getOption( 'VoiceCommander-name' );
            $vcAlwaysOn = $vcUser->getOption( 'VoiceCommander-hidesig' );
            $vcName = $vcUser->getOption( 'userjs-vcname' );
            if($vcName === "" || $vcName === 0 ||$vcName === null){
                $vcName = "Kate";
            }
            if($vcStyle === "" || $vcStyle === 0 ||$vcStyle === null){
                $vcStyle = "Basic";
            }
        }else{
            $vcAlwaysOn = false;
            $vcStyle = 'Basic';
            $vcName = "Kate";
        }
        $vars['wgVcUserConfig'] = array(
            'alwaysOn'=> $vcAlwaysOn,
            'commandersName' => $vcName,
            'style' => $vcStyle
        );

        $enabledModules = array();
        foreach ( self::$features as $name => $feature ) {
            $enabledModules[$name] = self::isEnabled( $name );
        }

        $vars['wgVoiceCommanderEnabledModules'] = $enabledModules;


        return true;
    }
}
