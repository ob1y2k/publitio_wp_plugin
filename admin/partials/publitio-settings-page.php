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

<div class="settings-wrapper">
  <h2 class="settings-title">
    <img src="<?php echo plugins_url('/publitio/admin/images/cloud-icon.png'); ?>" alt="" />
    Publitio Settings
  </h2>
  <p class="settings-paragraph">
    <a target="_blank" href="https://publit.io/">Publitio</a> offers advanced APIs for Video & Image
    managment in the cloud.
  </p>
  <p class="settings-paragraph">
    You can use it to transcode your files between formats, for resizing, cropping, trimming, watermarking and/or
    quality adjustment of your images and videos.
  </p>
  <p class="settings-paragraph">
    To start uploading your files to <span class="emphasize">Publitio</span>, you will need a <span class="emphasize">Publitio</span> account.
    Sign up is free and takes only a few seconds. <a target="_blank" href="https://publit.io/register">Sign up now.</a>
  </p>
  <p class="settings-paragraph">
    Then get your <span class="emphasize">API KEY</span> and <span class="emphasize">API SECRET</span> from <a target="_blank" href="https://publit.io/dashboard">Publitio Dashboard</a>
    and enter them bellow.
  </p>

  <div class="api-wrapper">
    <label for="api-key">API key:</label>
    <input id="api-key" name="api-key" type="password" />

    <label for="api-secret">API secret:</label>
    <input id="api-secret" name="api-secret" type="password" />

    <div class="feedback-block feedback-error-block" id="feedback-error-block"></div>
    <div class="feedback-block feedback-success-block" id="feedback-success-block"></div>
  </div>

  <hr />

  <div class="button-wrapper">
    <button type="button" class="publitio-button" id="update-settings-button">Update Settings</button>
  </div>
</div>
