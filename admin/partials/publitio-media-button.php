<?php
$dashboard_url = add_query_arg( array(
    'action' => 'publitio_dashboard_redirect',
    'nonce'  => wp_create_nonce( 'publitio_dashboard_nonce' ),
    'TB_iframe' => 'true',
    'width'  => '600',
    'height' => '550',
), admin_url( 'admin-ajax.php' ) );
?>
<a title="Publitio" href="<?php echo esc_url( $dashboard_url ); ?>" id="publitio-media-button" class="thickbox button">
  <img src="<?php echo plugins_url( '/images/cloud-icon.png', dirname(__FILE__)  ); ?>"/> Publitio
</a>
