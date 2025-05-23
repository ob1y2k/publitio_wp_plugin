(function ($) {
  'use strict';

  const STATUSES = {
    ERROR_UNAUTHORIZED: 401,
    ERROR: 500,
    SUCCESS: 200
  }

  $(function () {
    tryToGetPlayers()
    handleSettingsButtonClick()
    handleDefaultPlayerChange()
    window.onmessage = (event) => {
      if (~event.origin.indexOf('https://publit.io') || ~event.origin.indexOf('https://dashboard.publit.io') || ~event.origin.indexOf('https://dev-dash.publit.io') || ~event.origin.indexOf('http://localhost')) {
        let data = event.data.split('|')
        
        //console.log("onmessage received " + data[0])  

        // console.log(data)

        if (data[0] === 'link') {
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execInstanceCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('mceInsertContent', false, `<a href='${data[1]}'>${data[1]}</a>`)
          } else {
            send_to_editor(data[1])
          }
        } else if (data[0] === 'link_private') {
          let fileId = data[1];
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execInstanceCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('mceInsertContent', false, `[publitio]link|${fileId}[/publitio]`)
          } else {
            send_to_editor(`[publitio]link|${fileId}[/publitio]`)
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
          let folderId = data[2];
          folderId = folderId !== 'undefined' ? '|'+folderId : '';
          let pubCode = `[publitio]link|${fileId}${folderId}[/publitio]`;
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
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execInstanceCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('mceInsertContent', false, `[publitio]download|${fileId}[/publitio]`)
          } else {
            send_to_editor(`[publitio]download|${fileId}[/publitio]`)            
          }

        } else if (data[0] === 'download_gutenberg') {

            //console.log("download_gutenberg");
            let fileId = data[1];
            let pubCode = `[publitio]download|${fileId}[/publitio]`;
            window.PublitioSourceHtml = pubCode; //data[1];
            $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]').attr('value', pubCode);  // data[1]        
            $('.wp-block.is-selected .PublitioBlockContainer :input[type="text"]').focus();   

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
          playerId = playerId !== 'undefined' && playerId !== '' ? '|' + playerId : '';
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
          playerId = playerId !== 'undefined' ? '|' + playerId : '';
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
            playerId = playerId !== 'undefined' ? '|' + playerId : '';
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
          playerId = playerId !== 'undefined' && playerId !== '' ? '|' + playerId : '';
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

  function clearFeedbackBlocks() {
    $('#publitio-feedback-error-block').empty();
    $('#publitio-feedback-success-block').empty();
    $('#publitio-feedback-player-success-block').empty();
    $('#publitio-feedback-player-error-block').empty();
  }

  function addPlayersToPage(players, defaultPlayerId = '') {
    clearPlayerOptions()
    if(players != undefined) {
	    players.forEach((player) => {
	      $('<option value="' + player.id + '">' + assembleOption(player) + '</option>').appendTo($('#publitio-default-player'));
	    })
	    setSelectedPlayer(defaultPlayerId);
	}
  }

  function setSelectedPlayer(id) {
    $('#publitio-default-player > option[value="' + id +'"]').attr("selected", "selected");
  }

  function assembleOption(player) {
    let adtag = player.adtag_id ? ', adtag: ' + player.adtag_id : '';
    let autoplay = getAutoplayTextOption(player.auto_play)
    return player.id + ' (skin: ' + player.skin + adtag + ', autoplay: ' + autoplay + ')';
  }

  function tryToGetPlayers() {
    jQuery.get(ajaxurl, { action: 'get_players_action' }, function(response) {
      addPlayersToPage(response.players, response.default_player_id)
    })
  }

  function showFeedbackBlock(elem, content) {
    $(elem).text(content)
    setTimeout(function() {
      clearFeedbackBlocks()
    }, 3000)
  }

  function clearPlayerOptions() {
    $('#publitio-default-player').empty()
    $('<option selected hidden disabled>None</option>').appendTo($('#publitio-default-player'));
  }

  function getAutoplayTextOption(autoPlay) {
    if (autoPlay === 0) {
      return 'off';
    } else if (autoPlay === 1) {
      return 'on';
    }
    return 'mouseover';
  }

  function handleDefaultPlayerChange() {
    $('#publitio-default-player').bind('change', function (event) {
      jQuery.post(ajaxurl, {
        action: 'set_default_player',
        default_player_id: event.target.value,
        wpnonce: $('#_wpnonce').val()
      }, function (response) {
        if (response.status === STATUSES.ERROR_UNAUTHORIZED) {
          showFeedbackBlock($('#publitio-feedback-player-error-block'), 'Wrong credentials');
        } else if (response.status === STATUSES.SUCCESS) {
          showFeedbackBlock($('#publitio-feedback-player-success-block'), 'Great!');
        } else {
          showFeedbackBlock($('#publitio-feedback-player-error-block'), 'Something went wrong.');
        }
      });
    });
  }

  function handleSettingsButtonClick() {
    $('#publitio-update-settings-button').bind('click', function (event) {
      clearFeedbackBlocks()
      jQuery.post(ajaxurl, {
        action: 'update_settings_action',
        api_secret: $('#api-secret').val(),
        api_key: $('#api-key').val(),
        wpnonce: $('#_wpnonce').val()
      }, function (response) {
        if (response.status === STATUSES.ERROR_UNAUTHORIZED) {
          showFeedbackBlock($('#publitio-feedback-error-block'), 'Wrong credentials');
        } else if (response.status === STATUSES.SUCCESS) {
          showFeedbackBlock($('#publitio-feedback-success-block'), 'Great!');
          addPlayersToPage(response.players)
        } else {
          showFeedbackBlock($('#publitio-feedback-error-block'), 'Something went wrong.');
        }
      });
    });
  }

})(jQuery);



