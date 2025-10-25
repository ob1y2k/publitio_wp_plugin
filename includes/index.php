<?php

class PublitioService {

    private $publitio_api;
    private $players;
    private $wordpress_data;

    public function __construct() {
        $publitio_api = NULL;
        $players = [];
        $wordpress_data = [];
    }

    public function on_load() {
        if (PublitioAuthService::is_user_authenticated()) {
            $this->publitio_api = new PublitioAPI(PublitioAuthService::get_key(), PublitioAuthService::get_secret());
            $this->check_api_key();
        }
    }

    public function safe_init($clear_cache = false) {
        if (!PublitioAuthService::is_user_authenticated()) {
            return;
        }
        
        // Clear cache if settings page
        if ($clear_cache) {
            $this->clear_wordpress_data_cache();
        }
        
        $cached_data = get_transient('publitio_wordpress_data');
        
        if ($cached_data !== false) {
            $this->wordpress_data = $cached_data;
            return;
        }
        
        $this->publitio_api = new PublitioAPI(PublitioAuthService::get_key(), PublitioAuthService::get_secret());
        $this->load_wordpress_data();
    }

    private function load_wordpress_data() {
        $wordpress_data_response = $this->get_wordpress_data();
        $wordpress_data_json = json_decode($wordpress_data_response, true);
        
        if ($wordpress_data_json && $wordpress_data_json['success']) {
            $this->wordpress_data = $wordpress_data_json['message'] ?? [];
            // Cache for 1 hour (3600 seconds)
            set_transient('publitio_wordpress_data', $this->wordpress_data, 3600);
        } else {
            $this->wordpress_data = [];
        }
    }
    
    public function clear_wordpress_data_cache() {
        delete_transient('publitio_wordpress_data');
        delete_transient('publitio_players');
        
        $this->wordpress_data = [];
        $this->players = [];
    }

    public function init($api_key, $api_secret, $skip_cache = true) {
        $this->publitio_api = new PublitioAPI($api_key, $api_secret);
        PublitioAuthService::enter_credentials($api_key, $api_secret);
        // Clear cache when credentials change
        $this->clear_wordpress_data_cache();
        $this->check_api_key($skip_cache);
    }

    public function handle_response($response) {
        $json_response = json_decode($response, true);
        if (!$json_response['success'] && $json_response['error']['code'] === PUBLITIO_ERROR_UNAUTHORIZED) {
            $this->handle_unauthorized();
        } else if (!$json_response['success']) {
            $this->handle_error($json_response['error']['code']);
        }
        $this->handle_success($json_response);
    }

    public function handle_unauthorized() {
        PublitioAuthService::remove_credentials();
        $this->clear_wordpress_data_cache();
        wp_send_json(['status' => PUBLITIO_ERROR_UNAUTHORIZED]);
    }

    public function handle_error($error_code) {
        PublitioAuthService::remove_credentials();
        wp_send_json(['status' => PUBLITIO_ERROR]);
    }

    public function handle_success($json_response) {
        $this->players = $json_response['players'];
        wp_send_json([
            'status' => PUBLITIO_SUCCESS,
            'players' => $this->players,
            'wordpress_data' => $this->wordpress_data,
            'default_player_id' => get_option('publitio_default_player_id')
        ]);
    }

    public function check_api_key($skip_cache = false) {
        if (!$skip_cache) {
            $cached_players = get_transient('publitio_players');
            $cached_wordpress_data = get_transient('publitio_wordpress_data');
            
            if ($cached_players !== false && $cached_wordpress_data !== false) {
                $this->players = $cached_players;
                $this->wordpress_data = $cached_wordpress_data;
                $this->handle_success(['success' => true, 'players' => $this->players]);
                return;
            }
        }
        
        $players_response = $this->get_players();
        
        // Check players response first
        $players_json = json_decode($players_response, true);
        if (!$players_json['success'] && $players_json['error']['code'] === PUBLITIO_ERROR_UNAUTHORIZED) {
            $this->handle_unauthorized();
            return;
        } else if (!$players_json['success']) {
            $this->handle_error($players_json['error']['code']);
            return;
        }
        
        if (empty($this->wordpress_data)) {
            $wordpress_data_response = $this->get_wordpress_data();
            $wordpress_data_json = json_decode($wordpress_data_response, true);
            if ($wordpress_data_json['success']) {
                $this->wordpress_data = $wordpress_data_json['message'] ?? [];
            } else {
                $this->wordpress_data = [];
            }
        }
        
        $this->players = $players_json['players'];
        set_transient('publitio_players', $this->players, 3600);
        set_transient('publitio_wordpress_data', $this->wordpress_data, 3600);
        
        // Handle successful players response
        $this->handle_success($players_json);
    }

    public function get_players() {
        return $this->publitio_api->call(PUBLITIO_API_PLAYER_LIST, 'GET');
    }

    public function get_wordpress_data() {
        return $this->publitio_api->call(PUBLITIO_API_WORDPRESS_DATA, 'GET');
    }

    public function is_account_plan_free() {
        if (empty($this->wordpress_data) || !isset($this->wordpress_data['account_plan'])) {
            return true;
        }
        return $this->wordpress_data['account_plan'] === 'Free';
    }
}