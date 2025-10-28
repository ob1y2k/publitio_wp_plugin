jQuery(document).ready(function($) {
    // Store the active widget ID
    window.publitioActiveWidgetId = null;
    
    // Function to attach click handlers to preview
    function attachPreviewHandlers() {
        if (typeof elementor === 'undefined' || !elementor.$previewContents) {
            return;
        }
        
        var $previewDoc = $(elementor.$previewContents);
        
        // Remove any existing handlers first
        $previewDoc.off('click.publitio');
        
        // Attach new handler with namespace
        $previewDoc.on('click.publitio', '.publitio-select-button, .publitio-select-button-editor', function(e) {
            var $widget = $(this).closest('.elementor-widget-publitio_media');
            if ($widget.length) {
                window.publitioActiveWidgetId = $widget.attr('data-id');
            }
        });
    }
    
    // Track widget when Elementor panel is focused on it
    if (typeof elementor !== 'undefined') {
        // Listen for when a widget is selected/edited
        elementor.channels.editor.on('change', function() {
            var currentElement = elementor.getCurrentElement();
            if (currentElement && currentElement.model.get('widgetType') === 'publitio_media') {
                window.publitioActiveWidgetId = currentElement.model.get('id');
            }
        });
        
        // Attach handlers when preview loads
        elementor.on('preview:loaded', function() {
            setTimeout(attachPreviewHandlers, 100);
        });
        
        // Also try to attach immediately if preview is already loaded
        if (elementor.$previewContents && elementor.$previewContents.length) {
            attachPreviewHandlers();
        }
    }
    
    /**
     * Override WordPress's default tb_position to set custom ThickBox dimensions
     * for Publitio media modal.
     * 
     * WordPress's media-upload.js sets max width to 833px (resulting in 783px),
     * but we want custom dimensions for the Publitio dashboard.
     */
    window.tb_position = function() {
        var tbWindow = $('#TB_window'),
            width = $(window).width(),
            H = $(window).height(),
            W = width, // Use full width instead of limiting to 833px
            adminbar_height = 0,
            customWidth = 1200,  // Custom width for Publitio modal
            customHeight = 800;   // Custom height for Publitio modal

        if ( $('#wpadminbar').length ) {
            adminbar_height = parseInt( $('#wpadminbar').css('height'), 10 );
        }

        // Apply custom dimensions for Publitio ThickBox
        if ( tbWindow.length ) {
            // Use custom dimensions or fall back to responsive sizing
            var finalWidth = (W > customWidth) ? customWidth : W - 50;
            var finalHeight = (H > customHeight) ? customHeight : H - 45 - adminbar_height;
            
            tbWindow.width( finalWidth ).height( finalHeight );
            $('#TB_iframeContent').width( finalWidth ).height( finalHeight - 30 );
            tbWindow.css({'margin-left': '-' + parseInt( ( finalWidth / 2 ), 10 ) + 'px'});
            
            if ( typeof document.body.style.maxWidth !== 'undefined' ) {
                tbWindow.css({'top': 20 + adminbar_height + 'px', 'margin-top': '0'});
            }
        }

        // Update all ThickBox links with custom dimensions
        return $('a.thickbox').each( function() {
            var href = $(this).attr('href');
            if ( ! href ) return;
            href = href.replace(/&width=[0-9]+/g, '');
            href = href.replace(/&height=[0-9]+/g, '');
            $(this).attr( 'href', href + '&width=' + customWidth + '&height=' + customHeight );
        });
    };

    // Recalculate position on window resize
    $(window).on('resize', function() {
        tb_position();
    });

    /**
     * Handle messages from Publitio iframe
     * Message format: "type|data1|data2|..."
     */
    window.addEventListener('message', function(event) {
        // Verify the message is from a trusted Publitio domain
        if (~event.origin.indexOf('https://publit.io') || 
            ~event.origin.indexOf('https://dashboard.publit.io') || 
            ~event.origin.indexOf('https://dev-dash.publit.io') || 
            ~event.origin.indexOf('http://localhost') || 
            ~event.origin.indexOf('https://dev-www.publit.io')) {
            
            let data = event.data.split('|');
            let messageType = data[0];
            
            // Handle different message types
            switch(messageType) {
                case 'link':
                    // Public media link
                    handleMediaLink(data[1]);
                    break;
                    
                case 'link_private': {
                    // Private media with shortcode
                    let fileId = data[1];
                    let playerId = data[2];
                    playerId = (typeof playerId !== 'undefined' && playerId && playerId !== 'undefined') ? '|' + playerId : '';
                    handleMediaLink(`[publitio]link|${fileId}${playerId}[/publitio]`);
                    break;
                }
                    
                case 'source': {
                    // Source embed code
                    let sourceData = data[1];
                    // Check if it's HTML (starts with '<') or a file ID
                    if (sourceData.startsWith('<')) {
                        // It's HTML, pass directly
                        handleMediaLink(sourceData);
                    } else {
                        // It's a file ID, create shortcode
                        let sourcePlayerId = data[2];
                        sourcePlayerId = (typeof sourcePlayerId !== 'undefined' && sourcePlayerId && sourcePlayerId !== 'undefined') ? '|' + sourcePlayerId : '';
                        handleMediaLink(`[publitio]source|${sourceData}${sourcePlayerId}[/publitio]`);
                    }
                    break;
                }

                case 'source_private': {
                    // Private media with shortcode
                    let fileId = data[1];
                    let playerId = data[2];
                    playerId = (typeof playerId !== 'undefined' && playerId && playerId !== 'undefined') ? '|' + playerId : '';
                    handleMediaLink(`[publitio]source|${fileId}${playerId}[/publitio]`);
                    break;
                }
                    
                case 'iframe': {
                    // Iframe embed code - this is raw HTML, not a file ID
                    let iframeHtml = data[1];
                    // For iframe, the data is already HTML, so pass it directly
                    handleMediaLink(iframeHtml);
                    break;
                }

                case 'iframe_private': {
                    // Private media with shortcode
                    let fileId = data[1];
                    let playerId = data[2];
                    playerId = (typeof playerId !== 'undefined' && playerId && playerId !== 'undefined') ? '|' + playerId : '';
                    handleMediaLink(`[publitio]iframe|${fileId}${playerId}[/publitio]`);
                    break;
                }
                    
                case 'download': {
                    // Download link
                    let downloadFileId = data[1];
                    handleMediaLink(`[publitio]download|${downloadFileId}[/publitio]`);
                    break;
                }
                    
                default:
                    // Unknown message type - ignore
                    break;
            }
        }
        
        // Close ThickBox after receiving a message from Publitio
        if (event.origin.indexOf('publit.io') !== -1 || event.origin.indexOf('localhost') !== -1) {
            setTimeout(function() {
                // Check if ThickBox is in the Elementor preview iframe
                if (typeof elementor !== 'undefined' && elementor.$previewContents) {
                    var previewDoc = elementor.$previewContents[0];
                    if (previewDoc && previewDoc.getElementById('TB_window')) {
                        var previewWindow = previewDoc.defaultView;
                        if (previewWindow && typeof previewWindow.tb_remove === 'function') {
                            previewWindow.tb_remove();
                        } else {
                            $(previewDoc).find('#TB_window, #TB_overlay, #TB_HideSelect').remove();
                        }
                        return;
                    }
                }
                
                // Fallback: try current window
                if (typeof tb_remove === 'function') {
                    tb_remove();
                } else {
                    $('#TB_window, #TB_overlay, #TB_HideSelect').remove();
                }
            }, 100);
        }
    });
    
    /**
     * Find Elementor element view by widget ID
     */
    function getElementView(widgetId) {
        if (!widgetId) {
            return elementor.getCurrentElement();
        }
        
        try {
            var $elementDiv = $(elementor.$previewContents).find('.elementor-element-' + widgetId);
            if (!$elementDiv.length) return elementor.getCurrentElement();
            
            // Try to get view from element data
            var element = $elementDiv.data('view');
            if (element) return element;
            
            // Try to find by model CID
            var modelCID = $elementDiv.attr('data-model-cid');
            if (modelCID && elementor.getPreviewView().children) {
                if (typeof elementor.getPreviewView().children.findByModelCid === 'function') {
                    element = elementor.getPreviewView().children.findByModelCid(modelCID);
                    if (element) return element;
                }
                
                // Recursive search as last resort
                element = findViewRecursive(elementor.getPreviewView(), modelCID, widgetId);
                if (element) return element;
            }
        } catch(e) {
            console.error('Error finding element:', e);
        }
        
        return elementor.getCurrentElement();
    }
    
    /**
     * Recursively search for element view in Elementor tree
     */
    function findViewRecursive(parentView, modelCID, widgetId) {
        var found = null;
        if (parentView.children && parentView.children.each) {
            parentView.children.each(function(childView) {
                if (found) return false;
                if (childView.model && (childView.model.cid === modelCID || childView.model.get('id') === widgetId)) {
                    found = childView;
                    return false;
                }
                found = findViewRecursive(childView, modelCID, widgetId);
                if (found) return false;
            });
        }
        return found;
    }
    
    /**
     * Handle media link selection and update Elementor widget
     */
    function handleMediaLink(mediaContent) {
        // Update Elementor widget using the proper API
        if (typeof elementor === 'undefined') {
            console.error('Elementor API not available!');
            return;
        }
        
        var widgetId = window.publitioActiveWidgetId;
        
        // If no stored ID, try to find it from the DOM
        if (!widgetId && elementor.$previewContents) {
            var $widgets = $(elementor.$previewContents).find('.elementor-widget-publitio_media');
            
            if ($widgets.length === 1) {
                widgetId = $widgets.first().attr('data-id');
            } else if ($widgets.length > 1) {
                // Try active widget first, then empty widget, then first widget
                var $activeWidget = $widgets.filter('.elementor-element--active');
                var $emptyWidget = $widgets.has('.publitio-widget-button-wrapper').first();
                widgetId = ($activeWidget.length ? $activeWidget : ($emptyWidget.length ? $emptyWidget : $widgets.first())).attr('data-id');
            }
        }
        
        var element = getElementView(widgetId);
        
        // Update the widget
        if (element && element.model) {
            element.model.setSetting('media_content', mediaContent);
            element.renderHTML();
            
            // Clear stored ID
            window.publitioActiveWidgetId = null;
        } else {
            console.error('Could not find element to update');
        }
    }
});
