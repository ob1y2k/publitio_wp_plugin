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
            $this->init(PublitioAuthService::get_key(), PublitioAuthService::get_secret());
        }
    }

    public function init($api_key, $api_secret) {
        $this->publitio_api = new PublitioAPI($api_key, $api_secret);
        PublitioAuthService::enter_credentials($api_key, $api_secret);
        $this->check_api_key();
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

    public function check_api_key() {
        $players_response = $this->get_players();
        $wordpress_data_response = $this->get_wordpress_data();
        
        // Check players response first
        $players_json = json_decode($players_response, true);
        if (!$players_json['success'] && $players_json['error']['code'] === PUBLITIO_ERROR_UNAUTHORIZED) {
            $this->handle_unauthorized();
            return;
        } else if (!$players_json['success']) {
            $this->handle_error($players_json['error']['code']);
            return;
        }
        
        // Check wordpress_data response
        $wordpress_data_json = json_decode($wordpress_data_response, true);
        if ($wordpress_data_json['success']) {
            $this->wordpress_data = $wordpress_data_json['message'] ?? [];
        } else {
            // Log error but don't fail the entire request
            error_log('Publitio wordpress_data API call failed: ' . $wordpress_data_response);
            $this->wordpress_data = [];
        }
        
        // Handle successful players response
        $this->handle_success($players_json);
    }

    public function get_players() {
        return $this->publitio_api->call(PUBLITIO_API_PLAYER_LIST, 'GET');
    }

    public function get_wordpress_data() {
        return $this->publitio_api->call(PUBLITIO_API_WORDPRESS_DATA, 'GET');
    }
}
