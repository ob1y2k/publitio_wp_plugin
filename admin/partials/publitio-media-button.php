<a title="Publitio" href="http://localhost:8000/publitio-wordpress?api_key=
  <?php
    echo get_option(KEY_FIELD)
  ?>
  &api_secret=
  <?php
    echo get_option(SECRET_FIELD)
  ?>
  TB_iframe=true&width=600&height=550" id="publitio-media-button" class="thickbox button">
  <img src="<?php echo plugins_url('/publitio/admin/images/cloud-icon.png'); ?>"/> Publitio
</a>

