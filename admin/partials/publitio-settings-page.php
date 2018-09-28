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

<div class="page-wrapper">
  <div class="section-wrapper">
    <h2 class="section-title">
      <img src="<?php echo plugins_url( '/images/cloud-icon.png', dirname(__FILE__)  ); ?>" alt="" />
      Publitio Settings
    </h2>
    <p class="section-paragraph">
      <a target="_blank" href="https://publit.io/">Publitio</a> offers advanced APIs for Video & Image
      managment in the cloud.
    </p>
    <p class="section-paragraph">
      You can use it to transcode your files between formats, for resizing, cropping, trimming, watermarking and/or
      quality adjustment of your images and videos.
    </p>
    <p class="section-paragraph">
      To start uploading your files to <span class="emphasize">Publitio</span>, you will need a <span class="emphasize">Publitio</span> account.
      Sign up is free and takes only a few seconds. <a class="publitio-a" target="_blank" href="https://publit.io/register">Sign up now.</a>
    </p>
    <p class="section-paragraph">
      Then get your 
      <span class="emphasize">API KEY</span> and 
      <span class="emphasize">API SECRET</span> from 
      <a class="publitio-a" target="_blank" href="https://publit.io/dashboard">
        Publitio Dashboard
      </a>
      and enter them bellow.
    </p>

    <p class="section-paragraph">
      For additional customization and security (CNAME, Domain Level protection, etc.) visit <a class="publitio-a" target="_blank" href="https://publit.io/dashboard/settings">Publitio Settings</a>  
    </p>
  </div>

  <div class="section-wrapper">
    <label class="form-label" for="api-key">API key:</label>
    <input class="form-input" id="api-key" name="api-key" type="password" value="<?php echo get_option('publitio_key', ''); ?>"/>

    <label class="form-label" for="api-secret">API secret:</label>
    <input class="form-input" id="api-secret" name="api-secret" type="password" value="<?php echo get_option('publitio_secret', ''); ?>"/>

    <div class="feedback-block feedback-error-block" id="feedback-error-block"></div>
    <div class="feedback-block feedback-success-block" id="feedback-success-block"></div>
  </div>

  <div class="button-section-wrapper">
    <button type="button" class="publitio-button" id="update-settings-button">Update Settings</button>
  </div>

  <hr />

  <div class="section-wrapper">
    <p class="section-paragraph">
      Choose <span class="emphasize">Publitio</span> HTML5 Media player to use by default with
      <span class="emphasize">'Insert Player'</span> option.
    </p>
    <p class="section-paragraph">
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

  <div class="section-wrapper">
    <label class="form-label" for="default-player">Player:</label>
    <select class="form-select" name="default-player" id="default-player"></select>
    
    <div class="feedback-block feedback-error-block" id="feedback-player-error-block"></div>
    <div class="feedback-block feedback-success-block" id="feedback-player-success-block"></div>

  </div>
</div>
