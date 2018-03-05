(function ($) {
  'use strict';

  const STATUSES = {
    ERROR_UNAUTHORIZED: 401,
    ERROR: 500,
    SUCCESS: 200
  }

  $(function () {
    $('#update-settings-button').bind('click', function (event) {
      clearFeedbackBlocks()
      jQuery.post(ajaxurl, {
        action: 'update_settings_action',
        api_secret: $('#api-secret').val(),
        api_key: $('#api-key').val()
      }, function (response) {
        console.log(response.status)
        if (response.status === STATUSES.ERROR_UNAUTHORIZED) {
          $('#feedback-error-block').text('Wrong credentials.');
        } else if (response.status === STATUSES.SUCCESS) {
          $('#feedback-success-block').text('Great!');
        } else {
          $('#feedback-error-block').text('Something went wrong.');
        }
      });
    });
  });

  function clearFeedbackBlocks() {
    $('#feedback-error-block').empty();
    $('#feedback-success-block').empty();
  }

})(jQuery);
