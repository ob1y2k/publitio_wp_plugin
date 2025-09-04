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

		// Only load styles on Publitio settings page
		if (isset($_GET['page']) && $_GET['page'] === 'publitio-settings') {
			wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . '/css/publitio-admin.css', array(), $this->version, 'all' );
			wp_enqueue_style( $this->plugin_name . '-toastify-css', 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css' );
		}
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

		// Only load script on Publitio settings page
		if (isset($_GET['page']) && $_GET['page'] === 'publitio-settings') {
			wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . '/js/publitio-admin.js', array( 'jquery' ), $this->version, false );
			wp_enqueue_script( $this->plugin_name . '-toastify-js', 'https://cdn.jsdelivr.net/npm/toastify-js', array( 'jquery' ), null, true );
		}

	}

	public function add_plugin_admin_menu() {
		add_menu_page( 'Publitio', 'Publitio', 'manage_options', 'publitio-settings', array($this, 'display_plugin_settings_page'), plugin_dir_url( __FILE__ ) . '/images/cloud-icon.png', 12);
	}

	public function display_plugin_settings_page() {
		include_once('partials/publitio-settings-page.php');
	}

	public function update_settings() {
		// Check the nonce
		if (!isset( $_POST['wpnonce']) || !wp_verify_nonce($_POST['wpnonce'], 'publitio_settings_nonce_action')) {
			wp_die(__('Unauthorized request.', 'publitio'));
		}

		// Check user permissions
		if (!current_user_can('manage_options')) {
			wp_die(__('You do not have permission to update settings.', 'publitio'));
		}

		// Sanitize and update settings
		$api_key = sanitize_text_field($_POST['api_key']);
		$api_secret = sanitize_text_field($_POST['api_secret']);
		$default_player_id = sanitize_text_field($_POST['default_player_id']);

		if($default_player_id === '') {
			delete_option(PUBLITIO_DEFAULT_PLAYER);
		} else {
			update_option(PUBLITIO_DEFAULT_PLAYER, $default_player_id);
		}

		$this->publitio->init($api_key, $api_secret);
	}

	public function try_to_get_players() {
		$this->publitio->on_load();
	}

	public function publitio_media_button() {
		include_once('partials/publitio-media-button.php');
	}

	public function publitio_the_content($content) {
		$publitio_shortocode = 'publitio';
		$publitio_regex = '#\[' . $publitio_shortocode . '\].*?\[/' . $publitio_shortocode . '\]#';

		$replaced = preg_replace_callback($publitio_regex, function($matches) {
			
			$match = $matches[0];
			$matched = sanitize_text_field(substr($match, 10, -11));
			if (strpos($matched, 'source') === 0) {
				#source logic
				$parts = explode("|", $matched);
				$id = isset($parts[1]) ? sanitize_text_field($parts[1]) : '';
				$player = isset($parts[2]) ? sanitize_text_field($parts[2]) : '';
				
				// Security: Validate file ID
				if (!$this->validate_file_id($id)) {
					return '[publitio] Invalid file ID [/publitio]';
				}
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
				$id = isset($parts[1]) ? sanitize_text_field($parts[1]) : '';
				$player = isset($parts[2]) ? sanitize_text_field($parts[2]) : '';
				
				// Security: Validate file ID
				if (!$this->validate_file_id($id)) {
					return '[publitio] Invalid file ID [/publitio]';
				}
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
				$id = isset($parts[1]) ? sanitize_text_field($parts[1]) : '';
				$player = isset($parts[2]) ? sanitize_text_field($parts[2]) : '';
				
				// Security: Validate file ID
				if (!$this->validate_file_id($id)) {
					return '[publitio] Invalid file ID [/publitio]';
				}
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
				$id = isset($parts[1]) ? sanitize_text_field($parts[1]) : '';
				$player = isset($parts[2]) ? sanitize_text_field($parts[2]) : '';
				
				// Security: Validate file ID
				if (!$this->validate_file_id($id)) {
					return '[publitio] Invalid file ID [/publitio]';
				}
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
				$id = isset($parts[1]) ? sanitize_text_field($parts[1]) : '';
				$player = isset($parts[2]) ? sanitize_text_field($parts[2]) : '';
				
				// Security: Validate file ID
				if (!$this->validate_file_id($id)) {
					return '[publitio] Invalid file ID [/publitio]';
				}
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
				// Security: Remove old logic to prevent arbitrary file access
				return '[publitio] Invalid shortcode format [/publitio]';
			}			

		}, $content);

		return $replaced;
	}	

	public function publitio_shortcode($atts, $content = null) {
		// Security: Check user capabilities
		if (!current_user_can('edit_posts')) {
			return '[publitio] Insufficient permissions [/publitio]';
		}
		
		if($content) {
			// Security: Sanitize content input
			$content = sanitize_text_field($content);
			$parts = explode("|", $content);
			if($parts[0] == 'source') {
				#source logic
				$id = isset($parts[1]) ? sanitize_text_field($parts[1]) : '';
				$player = isset($parts[2]) ? sanitize_text_field($parts[2]) : '';
				
				// Security: Validate file ID
				if (!$this->validate_file_id($id)) {
					return '[publitio] Invalid file ID [/publitio]';
				}
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
				$id = isset($parts[1]) ? sanitize_text_field($parts[1]) : '';
				$player = isset($parts[2]) ? sanitize_text_field($parts[2]) : '';
				
				// Security: Validate file ID
				if (!$this->validate_file_id($id)) {
					return '[publitio] Invalid file ID [/publitio]';
				}
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
				$id = isset($parts[1]) ? sanitize_text_field($parts[1]) : '';
				$player = isset($parts[2]) ? sanitize_text_field($parts[2]) : '';
				
				// Security: Validate file ID
				if (!$this->validate_file_id($id)) {
					return '[publitio] Invalid file ID [/publitio]';
				}
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
				$id = isset($parts[1]) ? sanitize_text_field($parts[1]) : '';
				$player = isset($parts[2]) ? sanitize_text_field($parts[2]) : '';
				
				// Security: Validate file ID
				if (!$this->validate_file_id($id)) {
					return '[publitio] Invalid file ID [/publitio]';
				}
				$url = 'https://api.publit.io/v1/files/show/'.$id.'?&player='.$player.$this->publitio_api_signature();
				#die($url);
				$response = $this->publitio_curl($url);
				$response = json_decode($response, true);
				$url_preview = @$response['url_embed'];
				if($url_preview==null) {
					$url_preview = @$response['error']['message'];
				}
				return $url_preview;
			} else if($parts[0] == 'download') {
				#download logic
				$id = isset($parts[1]) ? sanitize_text_field($parts[1]) : '';
				$player = isset($parts[2]) ? sanitize_text_field($parts[2]) : '';
				
				// Security: Validate file ID
				if (!$this->validate_file_id($id)) {
					return '[publitio] Invalid file ID [/publitio]';
				}
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
				// Security: Remove old logic to prevent arbitrary file access
				return '[publitio] Invalid shortcode format [/publitio]';
			}
		}
		return $content;
	}

	/**
	 * Do curl with security validations
	 *
	 * @since    1.0.0
	 * @updated  2.2.2 - Added security validations
	 */
	public function publitio_curl($url) {
		// Security: Validate URL format and restrict to Publitio API
		if (!$this->validate_api_url($url)) {
			return json_encode(['error' => ['message' => 'Invalid URL']]);
		}
		
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Security: Add timeout
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false); // Security: Disable redirects
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // Security: Verify SSL
		curl_setopt($ch, CURLOPT_USERAGENT, 'Publitio-WordPress-Plugin/2.2.2'); // Security: Set user agent

		$response = curl_exec($ch);
		curl_close($ch);
		
		return $response;
	}
	/**
	 * Validate API URL to ensure it only accesses Publitio API
	 *
	 * @since    2.2.2
	 */
	private function validate_api_url($url) {
		// Security: Only allow HTTPS Publitio API URLs
		$allowed_hosts = [
			'api.publit.io',
		];
		
		$parsed_url = parse_url($url);
		
		// Check if URL is properly formatted
		if (!$parsed_url || !isset($parsed_url['host'])) {
			return false;
		}
		
		// Check if scheme is HTTPS
		if (!isset($parsed_url['scheme']) || $parsed_url['scheme'] !== 'https') {
			return false;
		}
		
		// Check if host is in allowed list
		if (!in_array($parsed_url['host'], $allowed_hosts, true)) {
			return false;
		}
		
		// Check if path starts with /v1/ (API version)
		if (!isset($parsed_url['path']) || !preg_match('/^\/v1\//', $parsed_url['path'])) {
			return false;
		}
		
		return true;
	}

	/**
	 * Validate Publitio file ID format
	 *
	 * @since    2.2.2
	 */
	private function validate_file_id($id) {
		// Security: Validate file ID format - should be alphanumeric 
		if (empty($id) || !is_string($id)) {
			return false;
		}
		
		// Publitio file IDs are typically alphanumeric with hyphens
		if (!preg_match('/^[a-zA-Z0-9]+$/', $id)) {
			return false;
		}
		
		// Reasonable length check (Publitio IDs are 8 characters)
		if (strlen($id) != 8) {
			return false;
		}
		
		return true;
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
