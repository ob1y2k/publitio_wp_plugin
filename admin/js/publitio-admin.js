(function ($) {
  'use strict';

  const STATUSES = {
    ERROR_UNAUTHORIZED: 401,
    ERROR: 500,
    SUCCESS: 200
  }

  let settingsLoading = false

  // WP 6.3+ renders the block editor canvas inside an iframe — the block DOM is
  // no longer reachable from this (top) document. Helpers below work in both worlds.
  function publitioCanvasDoc() {
    try {
      const $iframe = $('iframe[name="editor-canvas"]')
      if ($iframe.length) {
        return $iframe.contents()
      }
    } catch (e) {}
    return null
  }

  function publitioInsertGutenberg(pubCode) {
    window.PublitioSourceHtml = pubCode

    // Preferred: block editor data API — iframe-immune
    try {
      if (window.wp && window.wp.data && window.wp.data.select && window.wp.data.dispatch) {
        const sel = window.wp.data.select('core/block-editor')
        let clientId = sel && sel.getSelectedBlockClientId ? sel.getSelectedBlockClientId() : null
        if (!clientId) {
          const $cdoc = publitioCanvasDoc()
          const $selectedBlock = $cdoc ? $cdoc.find('.wp-block.is-selected') : $('.wp-block.is-selected')
          clientId = $selectedBlock.attr('data-block')
        }
        if (clientId) {
          window.wp.data.dispatch('core/block-editor').updateBlockAttributes(clientId, { content: pubCode })
        }
      }
    } catch (e) {}

    // Legacy: poke the block's hidden input (non-iframed editors) — guarded, never throws
    try {
      let $input = $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]')
      if (!$input.length) {
        const $cdoc = publitioCanvasDoc()
        if ($cdoc) {
          $input = $cdoc.find('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]')
        }
      }
      if ($input.length) {
        $input.val(pubCode)
        $input[0].value = pubCode
        $input[0].dispatchEvent(new Event('input', { bubbles: true, cancelable: true }))
        $input[0].dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
        $input.trigger('input').trigger('change')
        $input.focus()
      }
    } catch (e) {}

    // Clear the global variable after the block has had a chance to read it
    setTimeout(() => {
      window.PublitioSourceHtml = null
    }, 100)
  }

  // Close ThickBox wherever it actually lives (top document or editor canvas iframe)
  function publitioCloseThickbox() {
    try {
      if (typeof tb_remove === 'function') {
        tb_remove()
        return
      }
    } catch (e) {}
    try {
      $('#TB_window, #TB_overlay, #TB_HideSelect').remove()
      const $cdoc = publitioCanvasDoc()
      if ($cdoc) {
        $cdoc.find('#TB_window, #TB_overlay, #TB_HideSelect').remove()
      }
      $('body').removeClass('modal-open')
    } catch (e) {}
  }

  $(function () {
    if ($('#_wpnonce').length) {
      tryToGetPlayers()
    }
    handleSettingsButtonClick()
    window.onmessage = (event) => {
      if (~event.origin.indexOf('https://publit.io') || ~event.origin.indexOf('https://dashboard.publit.io') || ~event.origin.indexOf('https://dev-dash.publit.io') || ~event.origin.indexOf('http://localhost') || ~event.origin.indexOf('https://dev-www.publit.io')) {
        if (typeof event.data !== 'string') {
          return
        }
        let data = event.data.split('|')
        
        //console.log("onmessage received " + data[0])  

        if (data[0] === 'link') {
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('InsertHTML', false, `<a href='${data[1]}'>${data[1]}</a>`)
          } else {
            send_to_editor(data[1])
          }
        } else if (data[0] === 'link_private') {
          let fileId = data[1];
          let playerId = data[2];
          playerId = (typeof playerId !== 'undefined' && playerId && playerId !== 'undefined') ? '|' + playerId : '';
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('InsertHTML', false, `[publitio]link|${fileId}${playerId}[/publitio]`)
          } else {
            send_to_editor(`[publitio]link|${fileId}${playerId}[/publitio]`)
          }
        } else if (data[0] === 'link_gutenberg') {

            publitioInsertGutenberg(data[1]);

        } else if (data[0] === 'link_gutenberg_private') {

          let fileId = data[1];
          let playerId = data[2];
          playerId = (typeof playerId !== 'undefined' && playerId && playerId !== 'undefined') ? '|' + playerId : '';

          publitioInsertGutenberg(`[publitio]link|${fileId}${playerId}[/publitio]`);

        } else if (data[0] === 'download') {

          let fileId = data[1];
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('InsertHTML', false, `[publitio]download|${fileId}[/publitio]`)
          } else {
            send_to_editor(`[publitio]download|${fileId}[/publitio]`)            
          }

        } else if (data[0] === 'download_gutenberg') {

            publitioInsertGutenberg(`[publitio]download|${data[1]}[/publitio]`);

        } else if (data[0] === 'download_gutenberg_private') {

          publitioInsertGutenberg(`[publitio]download|${data[1]}[/publitio]`);

        } else if (data[0] === 'source') {
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('InsertHTML', false, data[1] + '\n');
            // tinymce.activeEditor.execCommand('mceInsertContent', false, data[1]);
          } else { 
            send_to_editor(data[1])
          }
        } else if (data[0] === 'source_private') {
          let fileId = data[1];
          let playerId = data[2];
          playerId = (typeof playerId !== 'undefined' && playerId && playerId !== 'undefined') ? '|' + playerId : '';
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('InsertHTML', false, `[publitio]source|${fileId}${playerId}[/publitio]`);
            // tinymce.activeEditor.execCommand('mceInsertContent', false, `[publitio]source|${fileId}|${playerId}[/publitio]`);
          } else {
            send_to_editor(`[publitio]source|${fileId}${playerId}[/publitio]`)
          }
        } else if (data[0] === 'source_gutenberg') {

            publitioInsertGutenberg(data[1]);

        } else if (data[0] === 'source_gutenberg_private') {

          let fileId = data[1];
          let playerId = data[2];
          playerId = (typeof playerId !== 'undefined' && playerId && playerId !== 'undefined') ? '|' + playerId : '';

          publitioInsertGutenberg(`[publitio]source|${fileId}${playerId}[/publitio]`);

        } else if (data[0] === 'iframe_gutenberg') {

            publitioInsertGutenberg(data[1]);

        } else if (data[0] === 'iframe_gutenberg_private') {

            let fileId = data[1];
            let playerId = data[2];
            playerId = (typeof playerId !== 'undefined' && playerId && playerId !== 'undefined') ? '|' + playerId : '';

            publitioInsertGutenberg(`[publitio]iframe|${fileId}${playerId}[/publitio]`);

        } else if (data[0] === 'iframe') {
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('InsertHTML', false, data[1] + '\n');
            // tinymce.activeEditor.execCommand('mceInsertContent', false, data[1]);
          } else {
            //$("#publitio_block_id").html(data[1]);
            send_to_editor(data[1])
          }
        } else if (data[0] === 'iframe_private') {
          let fileId = data[1];
          let playerId = data[2];
          playerId = (typeof playerId !== 'undefined' && playerId && playerId !== 'undefined') ? '|' + playerId : '';
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('InsertHTML', false, `[publitio]iframe|${fileId}${playerId}[/publitio]`);
            // tinymce.activeEditor.execCommand('mceInsertContent', false, `[publitio]iframe|${fileId}|${playerId}[/publitio]`);
          } else {
            send_to_editor(`[publitio]iframe|${fileId}${playerId}[/publitio]`)
          }
        }  else if (data[0] === 'player') {
          let fileId = data[1];
          let playerId = data[2];
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execInstanceCommand !== 'undefined') {
            //tinymce.activeEditor.execCommand('mceInsertContent', false, `[publitio]https://publit.io/publitio-wordpress/${fileId}/${playerId}/player_html[/publitio]`)
            tinymce.activeEditor.execCommand('mceInsertContent', false, `[publitio]player|${fileId}|${playerId}[/publitio]`)
          } else {
            send_to_editor(`[publitio]player|${fileId}|${playerId}[/publitio]`)
          }
        }
        publitioCloseThickbox();
      }
    }
  });

  function handleWordPressData(wordpressData) {
    updateStorageChart(wordpressData)
  }

  function updateStorageChart(wordpressData) {
    if (!wordpressData) {
      return
    }

    const usedStorage = wordpressData.account_storage ?? '0B'
    const maxStorage = wordpressData.account_max_storage ?? '0B'
    const percentStorage = wordpressData.account_storage_percentage ?? 0
    
    const $chartStorage = $('.publitio-storage-chart')
    const $percentageStorage = $('.publitio-storage-percentage')
    
    if ($chartStorage.length && $percentageStorage.length) {
      $percentageStorage.text(percentStorage + '%')
      $chartStorage.attr('data-percentage', percentStorage)
      
      const degrees = percentStorage * 3.6
      const gradient = `conic-gradient(
        #4099de 0deg,
        #4099de ${degrees}deg,
        #e5e7eb ${degrees}deg,
        #e5e7eb 360deg
      )`
      $chartStorage.css('background', gradient)
            
      $('.publitio-storage-used').text(`Storage used: ${usedStorage}`)
      $('.publitio-storage-limit').text(`Storage limit: ${maxStorage}`)
    }

    const usedBandwidth = wordpressData.account_bandwidth ?? '0B'
    const maxBandwidth = wordpressData.account_max_bandwidth ?? '0B'
    const percentBandwidth = wordpressData.account_bandwidth_percentage ?? 0

    const $chartBandwidth = $('.publitio-bandwidth-chart')
    const $percentageBandwidth = $('.publitio-bandwidth-percentage')
    
    if ($chartBandwidth.length && $percentageBandwidth.length) {
      $percentageBandwidth.text(percentBandwidth + '%')
      $chartBandwidth.attr('data-percentage', percentBandwidth)
      
      const degrees = percentBandwidth * 3.6
      const gradient = `conic-gradient(
        #4099de 0deg,
        #4099de ${degrees}deg,
        #e5e7eb ${degrees}deg,
        #e5e7eb 360deg
      )`
      $chartBandwidth.css('background', gradient)
            
      $('.publitio-bandwidth-used').text(`Bandwidth used: ${usedBandwidth}`)
      $('.publitio-bandwidth-limit').text(`Bandwidth limit: ${maxBandwidth}`)
    }

    const userPlan = wordpressData.account_plan ?? 'None'
    $('#publitio-plan-used').text(userPlan)
  }

  function addPlayersToPage(players, defaultPlayerId = '') {
    clearPlayerOptions()
    $('<option value="" selected disabled>None</option>').appendTo($('#publitio-default-player'));
    if(players != undefined && players.length > 0) {
	    players.forEach((player) => {
	      $('<option value="' + player.id + '">' + assembleOption(player) + '</option>').appendTo($('#publitio-default-player'));
	    })

      if(defaultPlayerId === '' || defaultPlayerId === false) {
        setSelectedPlayer('')
      } else {
        setSelectedPlayer(defaultPlayerId)
      }
    }
  }

  function setSelectedPlayer(id) {
    $('#publitio-default-player').val(id);
  }

  function assembleOption(player) {
    let adtag = player.adtag_id ? ', adtag: ' + player.adtag_id : '';
    let autoplay = getAutoplayTextOption(player.auto_play)
    return player.id + ' (skin: ' + player.skin + adtag + ', autoplay: ' + autoplay + ')';
  }

  function updateUIWithData(response) {
    if(response == 0) {
      $('.publitio-page-warning-message').css('display', 'flex')
      $('#publitio-page-data').css('opacity', 0.5)
      $('#publitio-page-data').css('pointer-events', 'none')
      $('#publitio-default-player-wrapper').css('opacity', 0.5)
      $('#publitio-default-player-wrapper').css('pointer-events', 'none')

      addPlayersToPage([])
    } else {
      addPlayersToPage(response.players, response.default_player_id)
      handleWordPressData(response.wordpress_data)
      $('.publitio-page-warning-message').css('display', 'none')
      $('#publitio-page-data').css('opacity', 1)
      $('#publitio-page-data').css('pointer-events', 'auto')
      $('#publitio-default-player-wrapper').css('opacity', 1)
      $('#publitio-default-player-wrapper').css('pointer-events', 'auto')
    }
  }

  function tryToGetPlayers() {
    jQuery.post(
      ajaxurl,
      {
        action: 'get_players_action',
        wpnonce: $('#_wpnonce').val(),
      },
      function (response) {
        updateUIWithData(response)
      }
    )
  }

  function authError() {
    $('.publitio-page-warning-message').css('display', 'flex')
    $('#publitio-page-data').css('opacity', 0.5)
    $('#publitio-page-data').css('pointer-events', 'none')
    $('#publitio-default-player-wrapper').css('opacity', 0.5)
    $('#publitio-default-player-wrapper').css('pointer-events', 'none')
    addPlayersToPage([])

    const $chartStorage = $('.publitio-storage-chart')
    const $percentageStorage = $('.publitio-storage-percentage')
    $percentageStorage.text('0%')
    $chartStorage.attr('data-percentage', 0)
    $chartStorage.css('background', 'conic-gradient(#e5e7eb 0deg, #e5e7eb 360deg )')
    $('.publitio-storage-used').text(`Storage used: 0B`)
    $('.publitio-storage-limit').text(`Storage limit: 0B`)

    const $chartBandwidth = $('.publitio-bandwidth-chart')
    const $percentageBandwidth = $('.publitio-bandwidth-percentage')
    $percentageBandwidth.text('0%')
    $chartBandwidth.attr('data-percentage', 0)
    $chartBandwidth.css('background', 'conic-gradient(#e5e7eb 0deg, #e5e7eb 360deg )')
    $('.publitio-bandwidth-used').text(`Bandwidth used: 0B`)
    $('.publitio-bandwidth-limit').text(`Bandwidth limit: 0B`)

    $('#publitio-plan-used').text('None')

  }

  function clearPlayerOptions() {
    $('#publitio-default-player').empty()
  }

  function getAutoplayTextOption(autoPlay) {
    if (autoPlay === 0) {
      return 'off';
    } else if (autoPlay === 1) {
      return 'on';
    }
    return 'mouseover';
  }

  function handleSettingsButtonClick() {
    $('#publitio-update-settings-button').on('click', function (event) {
      if(settingsLoading) return
      setLoading(true)

      let api_key = $('#api-key').val()
      let api_secret = $('#api-secret').val()
      let default_player_id = $('#publitio-default-player').val()
      if(api_key === '' || api_secret === '') {
        showToast('⚠ Please fill in all fields', 'error');
        setLoading(false)
        return
      }
      jQuery.post(ajaxurl, {
        action: 'update_settings_action',
        api_secret: api_secret,
        api_key: api_key,
        default_player_id: default_player_id,
        wpnonce: $('#_wpnonce').val()
      }, function (response) {
        if (response.status === STATUSES.ERROR_UNAUTHORIZED) {
          authError()
          showToast('⚠ Bad credentials', 'error');
        } else if (response.status === STATUSES.SUCCESS) {
          showToast('🎉 Great, settings updated!', 'success');
          updateUIWithData(response)
        } else {
          authError()
          showToast('⚠ Something went wrong', 'error');
        }
        setLoading(false)
      });
    });
  }

  function setLoading(loading) {
    if(loading) {
      $('#publitio-update-settings-button').text('Updating Settings...')
      $('#publitio-update-settings-button').css('opacity', 0.5)
      $('#publitio-update-settings-button').css('cursor', 'not-allowed')
    } else {
      $('#publitio-update-settings-button').text('Update Settings')
      $('#publitio-update-settings-button').css('opacity', 1)
      $('#publitio-update-settings-button').css('cursor', 'pointer')
    }
    $('#publitio-update-settings-button').prop('disabled', loading)
  }

  function showToast(content, type) {
    let style = {
      background: "linear-gradient(135deg,#73a5ff,#4099de)",
      borderRadius: "5px",
    }

    if(type === 'error') {
      style = {
        background: "linear-gradient(135deg,#ED775A,#E4004B)",
        borderRadius: "5px",
      }
    }

    Toastify({
      text: content,
      duration: 3000,
      gravity: 'bottom',
      position: 'center',
      style: style,
    }).showToast();
  }

})(jQuery);
