(function ($) {
  'use strict';

  const STATUSES = {
    ERROR_UNAUTHORIZED: 401,
    ERROR: 500,
    SUCCESS: 200
  }

  let settingsLoading = false

  $(function () {
    tryToGetPlayers()
    handleSettingsButtonClick()
    window.onmessage = (event) => {
      if (~event.origin.indexOf('https://publit.io') || ~event.origin.indexOf('https://dashboard.publit.io') || ~event.origin.indexOf('https://dev-dash.publit.io') || ~event.origin.indexOf('http://localhost') || ~event.origin.indexOf('https://dev-www.publit.io')) {
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
          
            let pubCode = data[1];
            window.PublitioSourceHtml = pubCode;
            
            const $selectedBlock = $('.wp-block.is-selected');
            const $input = $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]');
            
            // Set the value and trigger all possible events
            $input.val(pubCode);
            $input[0].value = pubCode;
            
            // Create and dispatch native events
            const inputEvent = new Event('input', { bubbles: true, cancelable: true });
            const changeEvent = new Event('change', { bubbles: true, cancelable: true });
            $input[0].dispatchEvent(inputEvent);
            $input[0].dispatchEvent(changeEvent);
            
            // Also trigger jQuery events
            $input.trigger('input').trigger('change');
            
            // Force Gutenberg block update
            if (window.wp && window.wp.data && window.wp.data.dispatch) {
                const { updateBlockAttributes } = window.wp.data.dispatch('core/block-editor');
                const blockClientId = $selectedBlock.attr('data-block');
                if (blockClientId) {
                    updateBlockAttributes(blockClientId, { content: pubCode });
                }
            }
            
            $input.focus();
            // Clear the global variable after use
            setTimeout(() => {
                window.PublitioSourceHtml = null;
            }, 100);
            // let fileId = data[1];
            // //let playerId = data[2];
            // let pubCode = `[publitio]link|${fileId}[/publitio]`;
            // window.PublitioSourceHtml = pubCode; //data[1];
            // $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]').attr('value', pubCode);  // data[1]        
            // $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]').focus();

        } else if (data[0] === 'link_gutenberg_private') {

          let fileId = data[1];
          let playerId = data[2];
          playerId = (typeof playerId !== 'undefined' && playerId && playerId !== 'undefined') ? '|' + playerId : '';

          let pubCode = `[publitio]link|${fileId}${playerId}[/publitio]`;
          window.PublitioSourceHtml = pubCode;
          
          const $selectedBlock = $('.wp-block.is-selected');
          const $input = $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]');
          
          // Set the value and trigger all possible events
          $input.val(pubCode);
          $input[0].value = pubCode;
          
          // Create and dispatch native events
          const inputEvent = new Event('input', { bubbles: true, cancelable: true });
          const changeEvent = new Event('change', { bubbles: true, cancelable: true });
          $input[0].dispatchEvent(inputEvent);
          $input[0].dispatchEvent(changeEvent);
          
          // Also trigger jQuery events
          $input.trigger('input').trigger('change');
          
          // Force Gutenberg block update
          if (window.wp && window.wp.data && window.wp.data.dispatch) {
              const { updateBlockAttributes } = window.wp.data.dispatch('core/block-editor');
              const blockClientId = $selectedBlock.attr('data-block');
              if (blockClientId) {
                  updateBlockAttributes(blockClientId, { content: pubCode });
              }
          }
          
          $input.focus();
          // Clear the global variable after use
          setTimeout(() => {
              window.PublitioSourceHtml = null;
          }, 100);
        } else if (data[0] === 'download') {

          let fileId = data[1];
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('InsertHTML', false, `[publitio]download|${fileId}[/publitio]`)
          } else {
            send_to_editor(`[publitio]download|${fileId}[/publitio]`)            
          }

        } else if (data[0] === 'download_gutenberg') {

            //console.log("download_gutenberg");
            let pubCode = data[1];
            pubCode = `[publitio]download|${pubCode}[/publitio]`;
            window.PublitioSourceHtml = pubCode;
            
            const $selectedBlock = $('.wp-block.is-selected');
            const $input = $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]');
            
            // Set the value and trigger all possible events
            $input.val(pubCode);
            $input[0].value = pubCode;
            
            // Create and dispatch native events
            const inputEvent = new Event('input', { bubbles: true, cancelable: true });
            const changeEvent = new Event('change', { bubbles: true, cancelable: true });
            $input[0].dispatchEvent(inputEvent);
            $input[0].dispatchEvent(changeEvent);
            
            // Also trigger jQuery events
            $input.trigger('input').trigger('change');
            
            // Force Gutenberg block update
            if (window.wp && window.wp.data && window.wp.data.dispatch) {
                const { updateBlockAttributes } = window.wp.data.dispatch('core/block-editor');
                const blockClientId = $selectedBlock.attr('data-block');
                if (blockClientId) {
                    updateBlockAttributes(blockClientId, { content: pubCode });
                }
            }
            
            $input.focus();
            // Clear the global variable after use
            setTimeout(() => {
                window.PublitioSourceHtml = null;
            }, 100);
            // let fileId = data[1];
            // let pubCode = `[publitio]download|${fileId}[/publitio]`;
            // window.PublitioSourceHtml = pubCode; //data[1];
            // $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]').attr('value', pubCode);  // data[1]        
            // $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]').focus();   
        } else if (data[0] === 'download_gutenberg_private') {

          //console.log("download_gutenberg");
          let fileId = data[1];
          let pubCode = `[publitio]download|${fileId}[/publitio]`;
          window.PublitioSourceHtml = pubCode;
          
          const $selectedBlock = $('.wp-block.is-selected');
          const $input = $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]');
          
          // Set the value and trigger all possible events
          $input.val(pubCode);
          $input[0].value = pubCode;
          
          // Create and dispatch native events
          const inputEvent = new Event('input', { bubbles: true, cancelable: true });
          const changeEvent = new Event('change', { bubbles: true, cancelable: true });
          $input[0].dispatchEvent(inputEvent);
          $input[0].dispatchEvent(changeEvent);
          
          // Also trigger jQuery events
          $input.trigger('input').trigger('change');
          
          // Force Gutenberg block update
          if (window.wp && window.wp.data && window.wp.data.dispatch) {
              const { updateBlockAttributes } = window.wp.data.dispatch('core/block-editor');
              const blockClientId = $selectedBlock.attr('data-block');
              if (blockClientId) {
                  updateBlockAttributes(blockClientId, { content: pubCode });
              }
          }
          
          $input.focus();
          // Clear the global variable after use
          setTimeout(() => {
              window.PublitioSourceHtml = null;
          }, 100);

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
          
            //console.log("id je:" + $( ".wp-block.is-selected").prop('id'));
            //console.log("val je:" +$( '.wp-block.is-selected .PublitioBlockContainer :input[type="text"]').val());
            //console.log("date1 je:" +data[1]);
            window.PublitioSourceHtml = data[1];
            
            const $selectedBlock = $('.wp-block.is-selected');
            const $input = $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]');

            // Set the value and trigger all possible events
            $input.val(data[1]);
            $input[0].value = data[1];
            
            // Create and dispatch native events
            const inputEvent = new Event('input', { bubbles: true, cancelable: true });
            const changeEvent = new Event('change', { bubbles: true, cancelable: true });
            $input[0].dispatchEvent(inputEvent);
            $input[0].dispatchEvent(changeEvent);
            
            // Also trigger jQuery events
            $input.trigger('input').trigger('change');
            
            // Force Gutenberg block update
            if (window.wp && window.wp.data && window.wp.data.dispatch) {
                const { updateBlockAttributes } = window.wp.data.dispatch('core/block-editor');
                const blockClientId = $selectedBlock.attr('data-block');
                if (blockClientId) {
                    updateBlockAttributes(blockClientId, { content: data[1] });
                }
            }
            
            $input.focus();
            
            // Clear the global variable after use
            setTimeout(() => {
                window.PublitioSourceHtml = null;
            }, 100);

        } else if (data[0] === 'source_gutenberg_private') {
            
          let fileId = data[1];
          let playerId = data[2];
          playerId = (typeof playerId !== 'undefined' && playerId && playerId !== 'undefined') ? '|' + playerId : '';
          let pubCode = `[publitio]source|${fileId}${playerId}[/publitio]`;
          
          window.PublitioSourceHtml = pubCode;
          
          const $selectedBlock = $('.wp-block.is-selected');
          const $input = $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]');
          
          // Set the value and trigger all possible events
          $input.val(pubCode);
          $input[0].value = pubCode;
          
          // Create and dispatch native events
          const inputEvent = new Event('input', { bubbles: true, cancelable: true });
          const changeEvent = new Event('change', { bubbles: true, cancelable: true });
          $input[0].dispatchEvent(inputEvent);
          $input[0].dispatchEvent(changeEvent);
          
          // Also trigger jQuery events
          $input.trigger('input').trigger('change');
          
          // Force Gutenberg block update
          if (window.wp && window.wp.data && window.wp.data.dispatch) {
              const { updateBlockAttributes } = window.wp.data.dispatch('core/block-editor');
              const blockClientId = $selectedBlock.attr('data-block');
              if (blockClientId) {
                  updateBlockAttributes(blockClientId, { content: pubCode });
              }
          }
          
          $input.focus();
          // Clear the global variable after use
          setTimeout(() => {
              window.PublitioSourceHtml = null;
          }, 100);
          
        } else if (data[0] === 'iframe_gutenberg') {
            
            window.PublitioSourceHtml = data[1];
            
            const $selectedBlock = $('.wp-block.is-selected');
            const $input = $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]');

            // Set the value and trigger all possible events
            $input.val(data[1]);
            $input[0].value = data[1];
            
            // Create and dispatch native events
            const inputEvent = new Event('input', { bubbles: true, cancelable: true });
            const changeEvent = new Event('change', { bubbles: true, cancelable: true });
            $input[0].dispatchEvent(inputEvent);
            $input[0].dispatchEvent(changeEvent);
            
            // Also trigger jQuery events
            $input.trigger('input').trigger('change');
            
            // Force Gutenberg block update
            if (window.wp && window.wp.data && window.wp.data.dispatch) {
                const { updateBlockAttributes } = window.wp.data.dispatch('core/block-editor');
                const blockClientId = $selectedBlock.attr('data-block');
                if (blockClientId) {
                    updateBlockAttributes(blockClientId, { content: data[1] });
                }
            }
            
            $input.focus();
            // Clear the global variable after use
            setTimeout(() => {
                window.PublitioSourceHtml = null;
            }, 100);

        } else if (data[0] === 'iframe_gutenberg_private') {
            
            let fileId = data[1];
            let playerId = data[2];
            playerId = (typeof playerId !== 'undefined' && playerId && playerId !== 'undefined') ? '|' + playerId : '';
            let pubCode = `[publitio]iframe|${fileId}${playerId}[/publitio]`;
            
            window.PublitioSourceHtml = pubCode;
            
            const $selectedBlock = $('.wp-block.is-selected');
            const $input = $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]');
            
            // Set the value and trigger all possible events
            $input.val(pubCode);
            $input[0].value = pubCode;
            
            // Create and dispatch native events
            const inputEvent = new Event('input', { bubbles: true, cancelable: true });
            const changeEvent = new Event('change', { bubbles: true, cancelable: true });
            $input[0].dispatchEvent(inputEvent);
            $input[0].dispatchEvent(changeEvent);
            
            // Also trigger jQuery events
            $input.trigger('input').trigger('change');
            
            // Force Gutenberg block update
            if (window.wp && window.wp.data && window.wp.data.dispatch) {
                const { updateBlockAttributes } = window.wp.data.dispatch('core/block-editor');
                const blockClientId = $selectedBlock.attr('data-block');
                if (blockClientId) {
                    updateBlockAttributes(blockClientId, { content: pubCode });
                }
            }
            
            $input.focus();
            // Clear the global variable after use
            setTimeout(() => {
                window.PublitioSourceHtml = null;
            }, 100);

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
        tb_remove();
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

  function tryToGetPlayers() {
    jQuery.get(ajaxurl, { action: 'get_players_action' }, function(response) {
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
    })
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
          tryToGetPlayers()
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
