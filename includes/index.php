<?php

class PublitioService {

    private $publitio_api;
    private $players;

    public function __construct() {
        $piblitio_api = NULL;
        $players = [];
    }

    public function on_load() {
        if (AuthService::is_user_authenticated()) {
            $this->init(AuthService::get_key(), AuthService::get_secret());
        }
    }

    public function init($api_key, $api_secret) {
        $this->publitio_api = new PublitioAPI($api_key, $api_secret);
        AuthService::enter_credentials($api_key, $api_secret);
        $this->check_api_key();
    }

    public function handle_response($response) {
        $json_response = json_decode($response, true);
        if (!$json_response['success'] && $json_response['error']['code'] === ERROR_UNAUTHORIZED) {
            $this->handle_unauthorized();
        } else if (!$json_response['success']) {
            $this->handle_error($json_response['error']['code']);
        }
        $this->handle_success($json_response);
    }

    public function handle_unauthorized() {
        AuthService::remove_credentials();
        wp_send_json(['status' => ERROR_UNAUTHORIZED]);
    }

    public function handle_error($error_code) {
        AuthService::remove_credentials();
        wp_send_json(['status' => ERROR]);
    }

    public function handle_success($json_response) {
        $this->players = $json_response['players'];
        wp_send_json([
            'status' => SUCCESS,
            'players' => $this->players,
            'default_player_id' => get_option('publitio_default_player_id')
        ]);
    }

    public function check_api_key() {
        $response = $this->get_players();
        $this->handle_response($response);
    }

    public function get_players() {
        return $this->publitio_api->call(API_PLAYER_LIST, 'GET');
    }

    public function set_default_player($player_id) {
        if (AuthService::is_user_authenticated()) {
            update_option('publitio_default_player_id', $player_id);
            wp_send_json([
                'status' => SUCCESS,
                'player_id' => $player_id
            ]);
        }
    }
}
