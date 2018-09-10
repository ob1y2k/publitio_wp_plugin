<?php

class PublitioAuthService {

    public static function is_user_authenticated() {
        return get_option(PUBLITIO_KEY_FIELD) && get_option(PUBLITIO_SECRET_FIELD);
    }

    public static function enter_credentials($api_key, $api_secret) {
		update_option(PUBLITIO_KEY_FIELD, $api_key);
		update_option(PUBLITIO_SECRET_FIELD, $api_secret);
    }

    public static function remove_credentials() {
        delete_option(PUBLITIO_SECRET_FIELD);
        delete_option(PUBLITIO_KEY_FIELD);
    }

    public static function get_key() {
        return get_option(PUBLITIO_KEY_FIELD);
    }

    public static function get_secret() {
        return get_option(PUBLITIO_SECRET_FIELD);
    }
}
