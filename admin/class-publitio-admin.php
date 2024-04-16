<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://publit.io
 * @since      1.0.0
 *
 * @package    Publitio
 * @subpackage Publitio/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Publitio
 * @subpackage Publitio/admin
 * @author     Publitio <info@publit.io>
 */
class Publitio_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Instance of Publitio class
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      Publitio    $version    The current version of this plugin.
	 */
	 private $publitio;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->publitio = new PublitioService;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Publitio_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Publitio_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . '/css/publitio-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Publitio_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Publitio_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . '/js/publitio-admin.js', array( 'jquery' ), $this->version, false );

	}

	public function add_plugin_admin_menu() {
		add_menu_page( 'Publitio', 'Publitio', 'manage_options', 'publitio-settings', array($this, 'display_plugin_settings_page'), plugin_dir_url( __FILE__ ) . '/images/cloud-icon.png', 12);
	}

	public function display_plugin_settings_page() {
		include_once('partials/publitio-settings-page.php');
	}

	public function update_settings() {
		$this->publitio->init($_POST['api_key'], $_POST['api_secret']);
	}

	public function try_to_get_players() {
		$this->publitio->on_load();
	}

	public function set_default_player() {
		$this->publitio->set_default_player($_POST['default_player_id']);
	}

	public function publitio_media_button() {
		include_once('partials/publitio-media-button.php');
	}

	public function publitio_the_content($content) {
		$publitio_shortocode = 'publitio';
		$publitio_regex = '#\[' . $publitio_shortocode . '\].*?\[/' . $publitio_shortocode . '\]#';

		$replaced = preg_replace_callback($publitio_regex, function($matches) {
			
			$match = $matches[0];
			$matched = substr($match, 10, -11);
			if (strpos($matched, 'source') === 0) {
				#source logic
				$parts = explode("|", $matched);
				$id = $parts[1];
				$player = @$parts[2];
				$url = 'https://api.publit.io/v1/files/player/'.$id.'?&player='.$player.$this->publitio_api_signature();
				$response = $this->publitio_curl($url);
				$response = json_decode($response, true);
		        $source_html = @$response['source_html'];
		        if($source_html==null) {
		            $source_html = @$response['error']['message'];		            
		        }
        		return $source_html;				

			} else if (strpos($matched, 'iframe') === 0) {
				#iframe logic
				$parts = explode("|", $matched);
				$id = $parts[1];
				$player = @$parts[2];
				$url = 'https://api.publit.io/v1/files/player/'.$id.'?&player='.$player.$this->publitio_api_signature();
				#die($url);
				$response = $this->publitio_curl($url);
				$response = json_decode($response, true);
		        $iframe_html = @$response['iframe_html'];
		        if($iframe_html==null) {
		            $iframe_html = @$response['error']['message'];		            
		        }
        		return $iframe_html;
			} else if (strpos($matched, 'player') === 0) {
				#player logic
				$parts = explode("|", $matched);
				$id = $parts[1];
				$player = @$parts[2];
				$url = 'https://api.publit.io/v1/files/player/'.$id.'?&player='.$player.$this->publitio_api_signature();
				$response = $this->publitio_curl($url);
				$response = json_decode($response, true);
		        $player_html = @$response['player_html'];
		        if($player_html==null) {
		            $player_html = @$response['error']['message'];		            
		        }
        		return $player_html;
			} else if (strpos($matched, 'link') === 0) {
				#link logic
				$parts = explode("|", $matched);
				$id = $parts[1];
				$player = @$parts[2];
				$url = 'https://api.publit.io/v1/files/show/'.$id.'?'.$this->publitio_api_signature();
				#die($url);
				$response = $this->publitio_curl($url);
				$response = json_decode($response, true);
		        $url_preview = @$response['url_preview'];
		        if($url_preview==null) {
		            $url_preview = @$response['error']['message'];		            
		        }
        		return $url_preview;
			} else if (strpos($matched, 'download') === 0) {
				#download logic
				$parts = explode("|", $matched);
				$id = $parts[1];
				$player = @$parts[2];
				$url = 'https://api.publit.io/v1/files/show/'.$id.'?'.$this->publitio_api_signature();
				$response = $this->publitio_curl($url);
				$response = json_decode($response, true);
		        $url_download = @$response['url_download'];
		        #die($url_download);
		        if($url_download==null) {
		            $url_download = @$response['error']['message'];		            
		        }
        		return $url_download;
			} else {
				#old logic
				$url = $matched . '?api_key=' . get_option(PUBLITIO_KEY_FIELD) . '&api_secret=' . get_option(PUBLITIO_SECRET_FIELD);
				return $this->publitio_curl($url);
			}			

		}, $content);

		return $replaced;
	}	

	public function publitio_shortcode($atts, $content = null) {
		if($content) {
			$parts = explode("|", $content);
			if($parts[0] == 'source') {
				#source logic
				$id = $parts[1];
				$player = @$parts[2];
				$url = 'https://api.publit.io/v1/files/player/'.$id.'?&player='.$player.$this->publitio_api_signature();
				$response = $this->publitio_curl($url);
				$response = json_decode($response, true);
		        $source_html = @$response['source_html'];
		        if($source_html==null) {
		            $source_html = @$response['error']['message'];
		        }
        		return $source_html;
			} else if($parts[0] == 'iframe') {
				#iframe logic
				$id = $parts[1];
				$player = @$parts[2];
				$url = 'https://api.publit.io/v1/files/player/'.$id.'?&player='.$player.$this->publitio_api_signature();
				$response = $this->publitio_curl($url);
				$response = json_decode($response, true);
				$iframe_html = @$response['iframe_html'];
				if($iframe_html==null) {
					$iframe_html = @$response['error']['message'];
				}
				return $iframe_html;
			} else if($parts[0] == 'player') {
				#player logic
				$id = $parts[1];
				$player = @$parts[2];
				$url = 'https://api.publit.io/v1/files/player/'.$id.'?&player='.$player.$this->publitio_api_signature();
				$response = $this->publitio_curl($url);
				$response = json_decode($response, true);
				$player_html = @$response['player_html'];
				if($player_html==null) {
					$player_html = @$response['error']['message'];
				}
				return $player_html;
			} else if($parts[0] == 'link') {
				#link logic
				$id = $parts[1];
				$player = @$parts[2];
				$url = 'https://api.publit.io/v1/files/show/'.$id.'?'.$this->publitio_api_signature();
				#die($url);
				$response = $this->publitio_curl($url);
				$response = json_decode($response, true);
				$url_preview = @$response['url_preview'];
				if($url_preview==null) {
					$url_preview = @$response['error']['message'];
				}
				return $url_preview;
			} else if($parts[0] == 'download') {
				#download logic
				$id = $parts[1];
				$player = @$parts[2];
				$url = 'https://api.publit.io/v1/files/show/'.$id.'?'.$this->publitio_api_signature();
				$response = $this->publitio_curl($url);
				$response = json_decode($response, true);
				$url_download = @$response['url_download'];
				#die($url_download);
				if($url_download==null) {
					$url_download = @$response['error']['message'];
				}
				return $url_download;
			} else {
				#old logic
				$url = $content . '?api_key=' . get_option(PUBLITIO_KEY_FIELD) . '&api_secret=' . get_option(PUBLITIO_SECRET_FIELD);
				return $this->publitio_curl($url);
			}
		}
		return $content;
	}

	/**
	 * Do curl
	 *
	 * @since    1.0.0
	 */
	public function publitio_curl($url) {
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		return curl_exec($ch);
	}
	/**
	 * Generate signature
	 *
	 * @since    2.0.0
	 */
	public function publitio_api_signature() {
		
		$api_key= get_option(PUBLITIO_KEY_FIELD);
		$api_secret= get_option(PUBLITIO_SECRET_FIELD);
		$api_nonce = mt_rand(10000000, 99999999);
        $api_timestamp= time();
        $api_sdk = "wp";        
        $api_signature = "&api_key=$api_key&api_nonce=$api_nonce&api_timestamp=$api_timestamp&api_signature=".sha1($api_timestamp.$api_nonce.$api_secret)."&api_sdk=$api_sdk";
		return $api_signature;
	}
}
