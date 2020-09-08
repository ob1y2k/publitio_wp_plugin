<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://publit.io
 * @since             1.0.0
 * @package           Publitio
 *
 * @wordpress-plugin
 * Plugin Name:       Publitio
 * Plugin URI:        https://publit.io/
 * Description:       Simple Image & Video Asset Management in the cloud. 
 * Version:           2.0.7
 * Author:            Publitio
 * Author URI:        https://publit.io
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       publitio
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PUBLITIO_PLUGIN_NAME_VERSION', '2.0.7' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-publitio-activator.php
 */
function activate_publitio() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-publitio-activator.php';
	Publitio_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-publitio-deactivator.php
 */
function deactivate_publitio() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-publitio-deactivator.php';
	Publitio_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_publitio' );
register_deactivation_hook( __FILE__, 'deactivate_publitio' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-publitio.php';

/**
 * Block Initializer.
 *
 * @since    2.0.1
 */
require_once plugin_dir_path( __FILE__ ) . 'block/src/init.php';


/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_publitio() {

	$plugin = new Publitio();
	$plugin->run();

}
run_publitio();
