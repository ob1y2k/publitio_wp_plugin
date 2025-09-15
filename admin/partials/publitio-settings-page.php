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
  <div class="publitio-page-header">
    <img class="publitio-page-logo" src="<?php echo plugins_url( '/images/publitio_logo_grey_s.png', dirname(__FILE__)  ); ?>" alt="Publitio" />
    <a class="publitio-page-review" target="_blank" href="https://wordpress.org/support/plugin/publitio/reviews/#new-post">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>
      <div>Please rate us on<br /><span class="publitio-emphasize">WordPress.org</span></div>
    </a>
  </div>

  <div class="publitio-section-wrapper">

    <div class="publitio-page-warning-message">
      <svg viewBox="0 0 24 24" class="text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"><path fill="currentColor" d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"></path></svg>
      <p>Publitio plugin is not connected to the API. Please update settings to get started.</p>
    </div>

    <div id="publitio-page-data" class="publitio-page-data">
      <div class="publitio-page-data-item">
        <div class="publitio-storage-chart-container">
          <div class="publitio-storage-chart" data-percentage="0">
            <div class="publitio-storage-inner">
              <span class="publitio-storage-percentage">0%</span>
            </div>
          </div>
        </div>

        <div class="publitio-storage-info">
          <span class="publitio-storage-used">Storage used: 0B</span>
          <span class="publitio-storage-limit">Storage limit: 0B</span>
        </div>
      </div>

      <div class="publitio-page-data-item">
        <div class="publitio-bandwidth-chart-container">
          <div class="publitio-bandwidth-chart" data-percentage="0">
            <div class="publitio-bandwidth-inner">
              <span class="publitio-bandwidth-percentage">0%</span>
            </div>
          </div>
        </div>

        <div class="publitio-bandwidth-info">
          <span class="publitio-bandwidth-used">Bandwidth used: 0B</span>
          <span class="publitio-bandwidth-limit">Bandwidth limit: 0B</span>
        </div>
      </div>

      <div class="publitio-page-data-item">
        <div class="publitio-plan-info">
          <span class="publitio-plan-used">Current plan: <b id="publitio-plan-used" class="publitio-emphasize">None</b></span>
          <a class="publitio-button" target="_blank" href="https://publit.io/billing">Manage billing</a>
        </div>
      </div>
    </div>

    <div class="publitio-settings">
      <div class="publitio-settings-description">
        <p>
          <a target="_blank" href="https://publit.io/">Publitio</a> offers advanced APIs for Video & Image managment in the cloud.
        </p>
        <p>
          You can use it to transcode your files between formats, for resizing, cropping, trimming, watermarking and/or quality adjustment of your images and videos.
        </p>
        <p>
          To start uploading your files to <span class="publitio-emphasize">Publitio</span>, you will need a <span class="publitio-emphasize">Publitio</span> account.
          Sign up is free and takes only a few seconds. <a class="publitio-a" target="_blank" href="https://publit.io/register">Sign up now.</a>
        </p>
        <p>
          Then get your <span class="publitio-emphasize">API KEY</span> and <span class="publitio-emphasize">API SECRET</span> from 
          <a class="publitio-a" target="_blank" href="https://publit.io/dashboard">Publitio Dashboard</a> and enter them bellow.
        </p>
        <p>
          For additional customization and security (CNAME, Domain Level protection, etc.) visit <a class="publitio-a" target="_blank" href="https://dashboard.publit.io/app/dashboards/settings">Publitio Settings</a>  
        </p>
        <p>
          Check out the tutorial <a class="publitio-a" target="_blank" href="https://publit.io/community/blog/how-to-setup-publitio-wordpress-plugin">How to setup Publitio Wordpress Plugin</a>
        </p>
      </div>
    </div>

    <div class="publitio-settings-info-title">⚙ Settings</div>

    <div class="publitio-settings">

      <?php wp_nonce_field('publitio_settings_nonce_action'); ?>

      <div class="publitio-field-wrapper">
        <label for="api-key">API key<br />
          <small>API key and API secret pairs are used to authenticate your requests to the Publitio API.</small>
        </label>
        <input id="api-key" name="api-key" type="password" value="<?php echo get_option(PUBLITIO_KEY_FIELD, ''); ?>" autocomplete="off" placeholder="API key" />
      </div>

      <div class="publitio-field-wrapper">
        <label for="api-secret">API secret</label>
        <input id="api-secret" name="api-secret" type="password" value="<?php echo get_option(PUBLITIO_SECRET_FIELD, ''); ?>" autocomplete="off" placeholder="API secret" />
      </div>

      <div id="publitio-default-player-wrapper" class="publitio-field-wrapper">
        <label for="publitio-default-player">Default player<br />
        <small>
          Choose <span class="publitio-emphasize">Publitio</span> HTML5 Media player to use by default with <span class="publitio-emphasize">'Insert Player'</span> option.
          To create and manage players go to <a target="_blank" href="https://publit.io/dashboard">Publitio Dashboard</a>
          Check docs to <a target="_blank" href="https://publit.io/docs"> learn more.</a>
        </small>
      </label>
        <select name="publitio-default-player" id="publitio-default-player"></select>
      </div>
    </div>

    <button type="button" class="publitio-settings-button" id="publitio-update-settings-button">Update Settings</button>
  </div>
  <small class="publitio-version">
    <?php echo PUBLITIO_PLUGIN_NAME_VERSION; ?>
  </small>
</div>

<div class="publitio-page-wrapper">
  <div class="publitio-page-data">
    <div class="publitio-page-data-item">
      <a class="publitio-page-footer-block" target="_blank" href="https://dashboard.publit.io/app/dashboards/api-tokens">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>
        <div>
          <div class="publitio-emphasize">API Keys</div>
          <div>API Keys allow third-party services such as Wordpress to authenticate with Publitio on your behalf.</div>
        </div>
      </a>
    </div>

    <div class="publitio-page-data-item">
      <a class="publitio-page-footer-block" target="_blank" href="https://publit.io/community">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
        <div>
          <div class="publitio-emphasize">Our blog</div>
          <div>Here you can find tutorials, learn more, stay updated with the latest news, discover best practices, and explore helpful insights.</div>
        </div>
      </a>
    </div>

    <div class="publitio-page-data-item">
      <a class="publitio-page-footer-block" target="_blank" href="https://dashboard.publit.io/app/dashboards/community">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>
        <div>
          <div class="publitio-emphasize">Community</div>
          <div>Here you can ask questions, share your ideas, discuss, suggest new features and get help from other users.</div>
        </div>
      </a>
    </div>
  </div>
</div>