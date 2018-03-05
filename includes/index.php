<?php

class PublitioService {

    private $publitio_api;

    public function __construct() {
        $piblitio_api = NULL;
    }

    public function init($api_key, $api_secret) {
        $this->publitio_api = new PublitioAPI($api_key, $api_secret);
        $this->enterCredentials($api_key, $api_secret);
        $this->check_api_key();
    }

    public function handle_response($response) {
        $json_response = json_decode($response, true);
        if (!$json_response['success'] && $json_response['error']['code'] === ERROR_UNAUTHORIZED) {
            $this->handle_unauthorized();
        } else if (!$json_response['success']) {
            $this->handle_error($error_code);
        }
        $this->handle_success();
    }

    public function handle_unauthorized() {
        $this->removeCredentials();
        wp_send_json(['status' => ERROR_UNAUTHORIZED]);
    }

    public function handle_error($error_code) {
        $this->removeCredentials();
        wp_send_json(['status' => ERROR]);
    }

    public function handle_success() {
        wp_send_json(['status' => SUCCESS]);
    }

    public function check_api_key() {
        $response = $this->publitio_api->call(API_FILE_LIST, 'GET', array('limit' => 1));
        $this->handle_response($response);
    }

    private function enterCredentials($api_key, $api_secret) {
		update_option(KEY_FIELD, $api_key);
		update_option(SECRET_FIELD, $api_secret);
    }

    private function removeCredentials() {
        delete_option(SECRET_FIELD);
        delete_option(KEY_FIELD);
    }

}
