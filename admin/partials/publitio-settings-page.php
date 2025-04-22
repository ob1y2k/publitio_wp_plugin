<?php

/**
 * Provide a settings view for the plugin
 *
 * This file is used to markup the settings page of the plugin.
 *
 * @link       https://publit.io
 * @since      1.0.0
 *
 * @package    Publitio
 * @subpackage Publitio/admin/partials
 */
?>

<div class="publitio-page-wrapper">
  <div class="publitio-section-wrapper">
    <h2 class="publitio-section-title">
      <img src="<?php echo plugins_url( '/images/cloud-icon.png', dirname(__FILE__)  ); ?>" alt="" />
      Publitio Settings
    </h2>

    <!--<p class="section-paragraph" style="background-color: #fff8e5; border: 1px solid #ffb900; padding:10px;">
      <strong>WordPress 5.0+ Users</strong>: Current Version of Publitio Plugin (2.0.0) is compatible with WP 5.0+ however you will need <a href="https://wordpress.org/plugins/classic-editor/" target="_blank" >Classic Editor Plugin</a> for it to work. We're working on adding block support for new Guttenberg Editor and it will be released in next plugin update (pretty soon).
    </p>-->

    <p class="publitio-section-paragraph">
      <a target="_blank" href="https://publit.io/">Publitio</a> offers advanced APIs for Video & Image
      managment in the cloud.
    </p>
    <p class="publitio-section-paragraph">
      You can use it to transcode your files between formats, for resizing, cropping, trimming, watermarking and/or
      quality adjustment of your images and videos.
    </p>
    <p class="publitio-section-paragraph">
      To start uploading your files to <span class="emphasize">Publitio</span>, you will need a <span class="emphasize">Publitio</span> account.
      Sign up is free and takes only a few seconds. <a class="publitio-a" target="_blank" href="https://publit.io/register">Sign up now.</a>
    </p>
    <p class="publitio-section-paragraph">
      Then get your 
      <span class="publitio-emphasize">API KEY</span> and 
      <span class="publitio-emphasize">API SECRET</span> from 
      <a class="publitio-a" target="_blank" href="https://publit.io/dashboard">
        Publitio Dashboard
      </a>
      and enter them bellow.
    </p>

    <p class="publitio-section-paragraph">
      For additional customization and security (CNAME, Domain Level protection, etc.) visit <a class="publitio-a" target="_blank" href="https://publit.io/dashboard/settings">Publitio Settings</a>  
    </p>
  </div>

  <div class="publitio-section-wrapper">
    <?php wp_nonce_field('publitio_settings_nonce_action'); ?>
    <label class="publitio-form-label" for="api-key">API key:</label>
    <input class="publitio-form-input" id="api-key" name="api-key" type="password" value="<?php echo get_option('publitio_key', ''); ?>"/>

    <label class="publitio-form-label" for="api-secret">API secret:</label>
    <input class="publitio-form-input" id="api-secret" name="api-secret" type="password" value="<?php echo get_option('publitio_secret', ''); ?>"/>

    <div class="publitio-feedback-block publitio-feedback-error-block" id="publitio-feedback-error-block"></div>
    <div class="publitio-feedback-block publitio-feedback-success-block" id="publitio-feedback-success-block"></div>
  </div>

  <div class="publitio-button-section-wrapper">
    <button type="button" class="publitio-button" id="publitio-update-settings-button">Update Settings</button>
  </div>

  <hr />

  <div class="publitio-section-wrapper">
    <p class="publitio-section-paragraph">
      Choose <span class="publitio-emphasize">Publitio</span> HTML5 Media player to use by default with
      <span class="publitio-emphasize">'Insert Player'</span> option.
    </p>
    <p class="publitio-section-paragraph">
      To create and manage players go to 
      <a class="publitio-a" target="_blank" href="https://publit.io/dashboard">
        Publitio Dashboard
      </a>
      Checks docs to
      <a class="publitio-a" target="_blank" href="https://publit.io/docs">
        learn more.
      </a>
    </p>
  </div>

  <div class="publitio-section-wrapper">
    <label class="publitio-form-label" for="publitio-default-player">Player:</label>
    <select class="publitio-form-select" name="publitio-default-player" id="publitio-default-player"></select>
    
    <div class="publitio-feedback-block publitio-feedback-error-block" id="publitio-feedback-player-error-block"></div>
    <div class="publitio-feedback-block publitio-feedback-success-block" id="publitio-feedback-player-success-block"></div>

  </div>
</div>
