/**
 * Publitio block editor helper (top document).
 *
 * Since WP 6.3+ the block editor canvas renders inside an iframe
 * (iframe[name="editor-canvas"]). Core ThickBox delegates its click handler on
 * the TOP document's body, so the block's <a class="thickbox"> inside the
 * canvas never triggers it — the anchor's default action navigates the canvas
 * iframe straight to the Publitio dashboard instead of opening a modal.
 *
 * This script watches for the canvas iframe and intercepts clicks on the
 * block's "Select file from Publitio" link inside it, opening ThickBox in the
 * top document (where thickbox + the publitio-admin.js onmessage handler live).
 * When the canvas is not iframed, core ThickBox delegation still works and
 * this script stays out of the way.
 */
(function ($) {
  'use strict';

  function bindCanvas() {
    var $iframe = $('iframe[name="editor-canvas"]');
    if (!$iframe.length) {
      return;
    }
    $iframe.each(function () {
      var win;
      try {
        win = this.contentWindow;
        if (!win || win.__publitioTbBound || !win.document) {
          return;
        }
        win.__publitioTbBound = true;
      } catch (e) {
        return; // cross-origin or not ready — skip
      }
      $(win.document).on('click.publitio', '#publitioButtonLink, a.thickbox', function (e) {
        e.preventDefault();
        var href = this.href;
        var title = this.title || 'Publitio';
        if (typeof window.tb_show === 'function') {
          window.tb_show(title, href, false);
        } else {
          window.open(href, '_blank'); // last-resort fallback if thickbox is missing
        }
      });
    });
  }

  $(function () {
    bindCanvas();
    // The canvas iframe appears late and can reload (view switches, patterns);
    // cheap poll keeps the binding alive without depending on editor internals.
    setInterval(bindCanvas, 1000);
  });
})(jQuery);
