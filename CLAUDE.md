# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Publitio WordPress Plugin integrates [Publitio](https://publit.io) cloud media storage into WordPress. It supports Gutenberg, Elementor, and the Classic Editor via shortcodes. Current version: 2.2.6.

## Build Commands

The only build step is for the Gutenberg block (React/JSX → compiled JS/CSS):

```bash
cd block
npm install         # install dependencies
npm start           # dev/watch mode
npm run build       # production build → dist/
```

Compiled output lands in `block/dist/` and is committed to the repo. There is no Composer, Makefile, or PHP build step — PHP files are included directly.

There are no automated tests; testing is manual against a live WordPress installation.

## Architecture

### Bootstrap flow

`publitio.php` → instantiates `Publitio` (in `includes/class-publitio.php`) → uses `Publitio_Loader` to register WordPress action/filter hooks → calls `run()` to execute all registered hooks.

`Publitio_Loader` is a simple wrapper: it defers all hook registration and fires them together at `run()`. Admin hooks go through `Publitio_Admin`; frontend hooks go through `Publitio_Public`.

### Core components

| File | Class | Responsibility |
|------|-------|---------------|
| `includes/class-publitio.php` | `Publitio` | Orchestrator; wires admin, public, block, Elementor |
| `includes/class-publitio-loader.php` | `Publitio_Loader` | Deferred hook registration |
| `includes/class-auth-service.php` | `Publitio_Auth_Service` | Read/write API key & secret via `get_option`/`update_option` |
| `includes/publitio_api.php` | `PublitioAPI` | HTTP wrapper for `https://api.publit.io/v1` (cURL with file_get_contents fallback) |
| `includes/index.php` | `PublitioService` | Service layer; wraps PublitioAPI with 1-hour transient caching |
| `includes/constants.php` | — | Shared field name constants (avoid magic strings) |
| `admin/class-publitio-admin.php` | `Publitio_Admin` | Settings page, AJAX handlers, media button, shortcode processing |
| `public/class-publitio-public.php` | `Publitio_Public` | Frontend asset enqueue only |
| `block/src/init.php` | — | Enqueues compiled Gutenberg block assets |
| `elementor/widget-publitio-media.php` | `Publitio_Media_Widget` | Elementor `Widget_Base` subclass; loaded conditionally on `elementor/widgets/widgets_registered` |

### Gutenberg block

The block lives in `block/src/` and is built with `cgb-scripts` (Create Guten Block). The React component in `block/src/block/block.js` renders the media picker UI; `block/src/init.php` enqueues the compiled assets. The block communicates with WordPress via the registered AJAX handlers in `Publitio_Admin`.

### Elementor widget

Only loaded when Elementor is active (conditional check in `class-publitio.php`). `Publitio_Media_Widget` extends `\Elementor\Widget_Base` and renders using the same shortcode system as the classic editor.

**The Elementor widget is intentionally restricted to paid Publitio plans.** Do not remove or loosen this restriction without explicit intent.

### API authentication

Credentials (API key + secret) are stored in WordPress options via `Publitio_Auth_Service`. Signatures for AJAX-exposed API calls are generated server-side using SHA1 (`admin/class-publitio-admin.php`) and passed to the frontend JS to avoid exposing the secret. Direct API calls from PHP use `PublitioAPI` with credentials fetched at call time.

### AJAX handlers

All three AJAX endpoints (`update_settings_action`, `get_players_action`, `publitio_dashboard_redirect`) are registered with `wp_ajax_` only — no `nopriv_` variants. They are admin-only: each handler verifies a nonce and checks `manage_options` capability.

### Shortcodes

The plugin registers `[publitio_media]` and related shortcodes. Processing happens in `Publitio_Admin::process_shortcode()` and validates file IDs against `includes/constants.php` field definitions before rendering embed HTML.

## Releases

### Version bump checklist

Update version in all three places:

1. `publitio.php` line 19 — plugin header: `* Version: X.X.X`
2. `publitio.php` line 38 — PHP constant: `define( 'PUBLITIO_PLUGIN_NAME_VERSION', 'X.X.X' )`
3. `README.txt` line 7 — `Stable tag: X.X.X` (flows into SVN trunk via rsync)

(`block/package.json` version is locked at `1.0.0` and is not part of the plugin version scheme.)

### SVN release workflow

WordPress.org uses SVN for plugin distribution. The `_builds/publitio_plugin_svn/` directory is a local SVN checkout of the plugin's wordpress.org repository.

```bash
# 1. Sync plugin files into SVN trunk (run from repo root)
rsync -av --delete \
  --exclude='.git' \
  --exclude='_builds' \
  --exclude='node_modules' \
  --exclude='CLAUDE.md' \
  --exclude='.claude' \
  --exclude='block/.gitignore' \
  --exclude='block/package.json' \
  --exclude='block/package-lock.json' \
  --exclude='block/.editorconfig' \
  --exclude='block/.eslintignore' \
  --exclude='block/.eslintrc.json' \
  /Users/ob1y2k/Projects/publitio_wp_plugin/ \
  /Users/ob1y2k/Projects/publitio_wp_plugin/_builds/publitio_plugin_svn/trunk/

# 2. Add any new unversioned files
cd _builds/publitio_plugin_svn
svn status | grep '^?' | awk '{print $2}' | xargs -I{} svn add {}

# 3. Tag the release
svn cp trunk tags/X.X.X

# 4. Review, then commit (credentials required)
svn status
svn commit -m "Release X.X.X" --username publitio --password YOUR_SVN_PASSWORD --no-auth-cache
```

The top-level `assets/` directory inside the SVN checkout (not `trunk/assets/`) holds wordpress.org page assets (banners, icons, screenshots for the plugin listing page) — update these separately from the plugin files.

## Key conventions

- No autoloader — all classes are required explicitly in `publitio.php` and `class-publitio.php`.
- Constants for Publitio field names are defined in `includes/constants.php`; use them instead of string literals.
- Transient keys for cached API responses follow the pattern `publitio_*`; cache TTL is 3600 seconds.
- The `_builds/` directory holds SVN release snapshots and is git-ignored.
- `index.php` files in each directory are empty safety files (standard WordPress plugin practice).
