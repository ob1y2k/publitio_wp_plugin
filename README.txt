=== Publitio ===
Contributors: publitio
Donate link: https://publit.io
Tags: publitio, images, videos, embed, upload
Requires at least: 3.0.1
Tested up to: 6.8
Stable tag: 5.0.3
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Publitio plugin integrates Publitio cloud media into WordPress with a simple block for effortless uploading, browsing, and embedding of image, video, audio, document or archive files right within the editor.

== Description ==

Publitio WordPress Integration Plugin

The [Publitio](https://publit.io) WordPress plugin enables effortless integration with the [Publitio](https://publit.io) cloud media platform, 
providing seamless access and embedding of your media files directly within WordPress editors through a dedicated [Publitio](https://publit.io) block.
[Publitio](https://publit.io) aims to simplify the entire Media Asset Management (MAM) process by streamlining common tasks used by most web and 
mobile publishers, such as uploading, hosting, processing, publishing, monetizing, and managing media files. 
Its cloud-based platform offers secure storage, powerful on-the-fly media transformations, fast global delivery via CDN, 
watermarking, and advanced analytics - helping content creators and businesses save time, reduce costs, 
and focus on their core activities while ensuring efficient, scalable management of all digital assets.

Features:

    - Easy Embedding: Add images, videos, audios, documents, and archives files directly in Gutenberg, Elementor and classic editors using the Publitio block for quick and intuitive embedding.
    - Direct Uploads: Upload new media files to [Publitio](https://publit.io) cloud storage without leaving the WordPress editor.
    - Media Library Browsing: Browse your entire [Publitio](https://publit.io) media library in a popup window, selecting files for instant insertion.
    - Customizable Publitio Player: Embed videos and media with [Publitio](https://publit.io)’s fully customizable HTML5 player supporting VAST/IMA ad tags for monetization and multi-format playback.
    - Optimized Delivery: Responsive images with srcset and multi-format video support for faster, adaptive loading.
    - Secure Media: Utilize [Publitio](https://publit.io)’s domain-level protection and HLS encryption features to safeguard your content.
    - Workflow Enhancement: Streamline content creation with easy access to cloud-hosted media assets, improving site speed and reducing server load.


Learn More & Support:

    - Setup Guide: [How to setup Publitio Wordpress Plugin](https://publit.io/community/blog/integrate-wordpress-site-with-publitio)
    - Video Guide: [How to setup Publitio Wordpress plugin](https://publit.io/community/blog/how-to-setup-publitio-wordpress-plugin)
    - API & Documentation: [Publitio Video & Image API](https://publit.io/docs)
    - Contact Support: support@publit.io, contact us through a support webwidget on our site or write on our [Community Board](https://dashboard.publit.io/app/dashboards/community)
    - Plugin Source: [Publitio Wordpress Plugin Source on Github](https://github.com/ob1y2k/publitio_wp_plugin)


== Installation ==

1. Go to Plugins > Add New in WordPress and search for “Publitio”.
2. Click Install Now and then Activate the plugin.
3. Create a free Publitio account and get your API Key and Secret from your Publitio dashboard.
4. In WordPress, go to Settings > Publitio, enter your API credentials, save, and start embedding media with the Publitio block.

== Frequently Asked Questions ==

= Is the Publitio WordPress plugin free? =

Yes, the plugin is free to use. You will need to create a free Publitio account to obtain API keys for integration.

= What is Publitio? =

Publitio is a cloud-based Media Asset Management (MAM) platform providing secure storage, media processing, delivery, monetization, and management via powerful APIs.

= How do I set up the Publitio plugin? =

Install and activate the plugin, then enter your Publitio API key and Secret key in the plugin settings. You can then upload and embed media directly from the WordPress editor using the Publitio block or button.

= Can I upload and offload all types of media files? =

Yes, the plugin supports images, videos, audios, documents, archives, and more, all managed securely in Publitio’s cloud.

= Does Publitio support video monetization? =

Yes, the customizable Publitio video player supports VAST/IMA ad tags for video monetization.

= Can I transform media on the fly? =

Yes, Publitio supports URL-based transformations including resizing, cropping, watermarking, transcoding, and quality adjustments.

= How does the plugin improve website performance? =

By serving all media files via Publitio’s global CDN and optimizing delivery, the plugin reduces server load and speeds up page load times.

= Is media protected when using Publitio? =

Yes, you can enable domain-level protection and HLS video encryption to secure your files from unauthorized access.

= What if I have issues or need support? =

Support is available by contacting support@publit.io, using on site support webwidget or Publitio community board.

== Screenshots ==

1. Publitio Settings page
2. Publitio block in gutenberg editor
3. Publitio Media Library page
4. Publitio Upload File page
5. Publitio Media Player in post
6. Embedded content in a post
7. Publitio Elementor widget
8. Publitio Elementor Media Library page

== Changelog ==

= 1.0 =
* Initial version of Publitio Wordpress plugin.

= 2.0 =
* Publitio Plugin (Version 2.0.0) is compatible with WP 5.0+ however you will need [Classic Editor Plugin](https://wordpress.org/plugins/classic-editor/) for it to work. We're working on adding block support for new Guttenberg Editor and it will be released in next plugin update (pretty soon).

= 2.0.1 =
* Current Version of Publitio Plugin (2.0.1) has custom block support for Guttenberg editor

= 2.0.3 =
* Tested on WP 5.2.2 all good

= 2.0.4 =
* Small fix for iframe insert

= 2.0.5 =
* Small fix for private files insert via block editor

= 2.0.6 =
* Small updates

= 2.0.7 =
* Small admin part css changes

= 2.0.8 =
* Fixes for gutenberg editor insert source and player functionality

= 2.0.9 =
* Small updates

= 2.1.0 =
* WP 5.6 check OK

= 2.1.1 =
* WP 5.7 check OK

= 2.1.2 =
* WP 5.8 check OK

= 2.1.3 =
* WP 5.9 check OK

= 2.1.4 =
* WP 6.0 check OK

= 2.1.5 =
* WP 6.1 check OK

= 2.1.6 =
* WP 6.2 check OK

= 2.1.7 =
* WP 6.4 check OK + dashboard v2 fix for insert

= 2.1.8 =
* WP 6.5 check OK + publitio short codes

= 2.1.9 =
* WP 6.8 check OK + security fixes

= 2.2.0 =
* publitio block improvements

= 2.2.1 =
* Small fix

= 2.2.2 =
* SECURITY: Fixed arbitrary file read vulnerability (CVE-2025-31800)
* SECURITY: Added input validation and sanitization for shortcode parameters
* SECURITY: Implemented URL whitelist validation for API calls
* SECURITY: Added proper authorization checks for shortcode usage
* SECURITY: Enhanced CURL security with timeout and redirect restrictions

= 2.2.3 =
* Minor fixes

= 2.2.4 =
* Quality of life fixes

= 2.2.5 =
* Added Elementor widget

== Upgrade Notice ==

= 1.0 =
Just install

= 2.0 =
Publitio Plugin (Version 2.0.0) is compatible with WP 5.0+ however you will need [Classic Editor Plugin](https://wordpress.org/plugins/classic-editor/) for it to work. We're working on adding block support for new Guttenberg Editor and it will be released in next plugin update (pretty soon).

= 2.0.1 =
* Current Version of Publitio Plugin (2.0.1) has custom block support for Guttenberg editor

= 2.0.3 =
* Tested on WP 5.2.2 all good

= 2.0.4 =
* Small fix for iframe insert

= 2.0.5 =
* Small fix for private files insert via block editor

= 2.0.6 =
* Small updates

= 2.0.7 =
* Small admin part css changes

= 2.0.8 =
* Fixes for gutenberg editor insert source and player functionality

= 2.0.9 =
* Small updates

= 2.1.0 =
* WP 5.6 check OK

= 2.1.1 =
* WP 5.7 check OK

= 2.1.2 =
* WP 5.8 check OK

= 2.1.3 =
* WP 5.9 check OK

= 2.1.4 =
* WP 6.0 check OK

= 2.1.5 =
* WP 6.1 check OK

= 2.1.6 =
* WP 6.2 check OK

= 2.1.7 =
* WP 6.4 check OK + dashboard v2 fix for insert

= 2.1.8 =
* WP 6.5 check OK + publitio short codes

= 2.1.9 =
* WP 6.8 check OK + security fixes

= 2.2.0 =
* publitio block improvements

= 2.2.1 =
* Small fix

= 2.2.2 =
* SECURITY: Fixed arbitrary file read vulnerability (CVE-2025-31800)
* SECURITY: Added input validation and sanitization for shortcode parameters
* SECURITY: Implemented URL whitelist validation for API calls
* SECURITY: Added proper authorization checks for shortcode usage
* SECURITY: Enhanced CURL security with timeout and redirect restrictions

= 2.2.3 =
* Minor fixes

= 2.2.4 =
* Quality of life fixes

= 2.2.5 =
* Added Elementor widget
