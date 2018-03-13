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
      if (~event.origin.indexOf('https://publit.io')) {
        let data = event.data.split('|')
        if (data[0] === 'link') {
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execInstanceCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('mceInsertContent', false, `<a href='${data[1]}'>${data[1]}</a>`)
          } else {
            send_to_editor(data[1])
          }
        } else if (data[0] === 'source') {
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execInstanceCommand !== 'undefined')  {
            tinymce.activeEditor.execCommand('mceInsertContent', false, data[1]);
          } else {
            send_to_editor(data[1])
          }
        } else if (data[0] === 'player') {
          let fileId = data[1];
          let playerId = data[2];
          if (tinymce.activeEditor !== null && typeof window.tinyMCE.execInstanceCommand !== 'undefined') {
            tinymce.activeEditor.execCommand('mceInsertContent', false, `[publitio]https://publit.io/publitio-wordpress/${fileId}/${playerId}/player_html[/publitio]`)
          } else {
            send_to_editor(`[publitio]https://publit.io/publitio-wordpress/${fileId}/${playerId}/player_html[/publitio]`)
          }
        }
        tb_remove();
      }
    }
  });

  function clearFeedbackBlocks() {
    $('#feedback-error-block').empty();
    $('#feedback-success-block').empty();
    $('#feedback-player-success-block').empty();
    $('#feedback-player-error-block').empty();
  }

  function addPlayersToPage(players, defaultPlayerId = '') {
    clearPlayerOptions()
    players.forEach((player) => {
      $('<option value="' + player.id + '">' + assembleOption(player) + '</option>').appendTo($('#default-player'));
    })
    setSelectedPlayer(defaultPlayerId);
  }

  function setSelectedPlayer(id) {
    $('#default-player > option[value="' + id +'"]').attr("selected", "selected");
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
    $('#default-player').empty()
    $('<option selected hidden disabled>None</option>').appendTo($('#default-player'));
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
    $('#default-player').bind('change', function (event) {
      jQuery.post(ajaxurl, {
        action: 'set_default_player',
        default_player_id: event.target.value
      }, function (response) {
        if (response.status === STATUSES.ERROR_UNAUTHORIZED) {
          showFeedbackBlock($('#feedback-player-error-block'), 'Wrong credentials');
        } else if (response.status === STATUSES.SUCCESS) {
          showFeedbackBlock($('#feedback-player-success-block'), 'Great!');
        } else {
          showFeedbackBlock($('#feedback-player-error-block'), 'Something went wrong.');
        }
      });
    });
  }

  function handleSettingsButtonClick() {
    $('#update-settings-button').bind('click', function (event) {
      clearFeedbackBlocks()
      jQuery.post(ajaxurl, {
        action: 'update_settings_action',
        api_secret: $('#api-secret').val(),
        api_key: $('#api-key').val()
      }, function (response) {
        if (response.status === STATUSES.ERROR_UNAUTHORIZED) {
          showFeedbackBlock($('#feedback-error-block'), 'Wrong credentials');
        } else if (response.status === STATUSES.SUCCESS) {
          showFeedbackBlock($('#feedback-success-block'), 'Great!');
          addPlayersToPage(response.players)
        } else {
          showFeedbackBlock($('#feedback-error-block'), 'Something went wrong.');
        }
      });
    });
  }

})(jQuery);
