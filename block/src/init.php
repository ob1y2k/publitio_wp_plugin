<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function publitio_block_assets() { // phpcs:ignore

	add_thickbox();
		    	
	// Styles.
	wp_enqueue_style(
		'publitio-block-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'publitio_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function publitio_block_editor_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'publitio-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
		true // Enqueue the script in the footer.
	);

	wp_localize_script('publitio-block-js', 'publitioBlockVars', array(
		'icon' => plugins_url( '../admin/images/cloud-icon.png', dirname(__FILE__)  ),
	    'url' => 'https://publit.io/dashboard-wordpress?api_key='.get_option(PUBLITIO_KEY_FIELD).'&api_secret='.get_option(PUBLITIO_SECRET_FIELD).'&default_player='.get_option(PUBLITIO_DEFAULT_PLAYER).'&gutenberg=true&TB_iframe=true&width=600&height=550'
	));


	// Styles.
	wp_enqueue_style(
		'publitio-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'publitio_block_editor_assets' );

