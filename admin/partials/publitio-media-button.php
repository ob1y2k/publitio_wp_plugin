<a title="Publitio" href="https://publit.io/publitio-wordpress?api_key=
  <?php
    echo get_option(PUBLITIO_KEY_FIELD)
  ?>
  &api_secret=
  <?php
    echo get_option(PUBLITIO_SECRET_FIELD)
  ?>
  &default_player=
  <?php
    echo get_option(PUBLITIO_DEFAULT_PLAYER)
  ?>
  TB_iframe=true&width=600&height=550" id="publitio-media-button" class="thickbox button">
  <img src="<?php echo plugins_url( '/images/cloud-icon.png', dirname(__FILE__)  ); ?>"/> Publitio
</a>

