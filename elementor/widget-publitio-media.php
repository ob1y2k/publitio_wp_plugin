<?php
/**
 * Publitio Media Widget for Elementor
 *
 * @link       https://publit.io
 * @since      2.2.4
 *
 * @package    Publitio
 * @subpackage Publitio/elementor
 */

namespace Publitio_Elementor_Widget;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Publitio Media Widget Class
 *
 * Integrates Publitio media management with Elementor page builder
 *
 * @since      2.2.4
 * @package    Publitio
 * @subpackage Publitio/elementor
 * @author     Publitio <info@publit.io>
 */
class Publitio_Media_Widget extends Widget_Base {

    public function get_name() {
        return 'publitio_media';
    }

    public function get_title() {
        return 'Publitio Media';
    }

    public function get_icon() {
        return 'publitio-icon';
    }

    public function get_categories() {
        return [ 'basic' ];
    }

    public function get_script_depends() {
        return [ 'publitio-elementor-widget' ];
    }
    
    public function get_style_depends() {
        return [ 'publitio-elementor-style' ];
    }
    
    public function get_custom_help_url() {
        return 'https://publit.io/';
    }

    protected function register_controls() {
        $this->start_controls_section(
            'content_section',
            [
                'label' => 'Publitio',
            ]
        );

        $this->add_control(
            'media_content',
            [
                'label' => 'Media Content',
                'type' => Controls_Manager::HIDDEN,
                'default' => '',
            ]
        );

        $this->add_control(
            'info',
            [
                'type' => Controls_Manager::RAW_HTML,
                'raw' => '<div class="publitio-info-box">
                    <p><strong>How to use:</strong></p>
                    <p>Click the button in the widget preview to select media from your Publitio account.</p>
                </div>',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $media_content = !empty($settings['media_content']) ? $settings['media_content'] : '';
        
        if (!empty($media_content)) {
            // Display the media content
            if (strpos($media_content, '[publitio]') !== false) {
                // It's a shortcode - process it
                echo do_shortcode($media_content);
            } else {
                // It's HTML - display directly
                echo $media_content;
            }
        } else {
            // Show the button to select media
            $widget_id = $this->get_id();
            ?>
            <div class="publitio-widget-button-wrapper" data-widget-id="<?php echo esc_attr($widget_id); ?>">
                <a title="Select a file from Publitio" 
                   href="https://publit.io/dashboard-wordpress?api_key=<?php echo esc_attr(get_option(PUBLITIO_KEY_FIELD)); ?>&api_secret=<?php echo esc_attr(get_option(PUBLITIO_SECRET_FIELD)); ?>&default_player=<?php echo esc_attr(get_option(PUBLITIO_DEFAULT_PLAYER)); ?>&elementor=true&widget_id=<?php echo esc_attr($widget_id); ?>&TB_iframe=true&width=1200&height=800" 
                   class="thickbox publitio-select-button">
                    <img src="<?php echo plugins_url('/publitio/admin/images/cloud-icon.png'); ?>" alt="Publitio">
                    Select a file from Publitio
                </a>
            </div>
            <?php
        }
    }
    
    protected function content_template() {
        ?>
        <#
        var mediaContent = settings.media_content || '';
        var widgetId = id;
        
        if (mediaContent) {
            if (mediaContent.indexOf('[publitio]') !== -1) {
                // Shortcode - show placeholder
                #>
                <div class="publitio-shortcode-placeholder">
                    <p><strong>✓ Publitio Media Selected</strong></p>
                    <p class="publitio-shortcode-content">{{{ mediaContent }}}</p>
                    <p class="publitio-preview-note">Preview on frontend</p>
                </div>
                <#
            } else {
                // HTML content
                #>
                <div class="publitio-media-preview">
                    {{{ mediaContent }}}
                    <div class="publitio-media-badge">
                        ✓ Publitio Media
                    </div>
                </div>
                <#
            }
        } else {
            #>
            <div class="publitio-widget-button-wrapper" data-widget-id="{{ widgetId }}">
                <a title="Select a file from Publitio" 
                   href="https://publit.io/dashboard-wordpress?api_key=<?php echo esc_attr(get_option(PUBLITIO_KEY_FIELD)); ?>&api_secret=<?php echo esc_attr(get_option(PUBLITIO_SECRET_FIELD)); ?>&default_player=<?php echo esc_attr(get_option(PUBLITIO_DEFAULT_PLAYER)); ?>&elementor=true&TB_iframe=true&width=1200&height=800"
                   class="thickbox publitio-select-button">
                    <img src="<?php echo plugins_url('/publitio/admin/images/cloud-icon.png'); ?>" alt="Publitio">
                    Select a file from Publitio
                </a>
            </div>
            <#
        }
        #>
        <?php
    }
}