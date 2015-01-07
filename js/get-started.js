(function ($) {
  'use strict';

  var creationUrl = 'https://localdata-sensors.herokuapp.com/api/v1/sources';

  $(document).ready(function () {
    $('#sec-form').submit(function (e) {
      e.preventDefault();
      $('#form-submit').val('Submitting...');

      // Validation
      $('#req-message').hide();
      var valid = true;
      $('input[data-required="true"]').each(function () {
        var val = $(this).val();
        if (!val) {
          $(this).addClass('missing');
          valid = false;
        } else {
          $(this).removeClass('missing');
        }
      });

      if (!valid) {
        $('#req-message').show();
        $('#form-submit').val('Submit');
        $('body').animate({
          scrollTop: 0
        });
        return;
      }
      
      var email = $('#form-email').val();
      var data = {
        name: $('#form-name').val(),
        email: email,
        city: $('#form-city').val()
      };

      $.ajax({
        url: creationUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ data: data })
      }).done(function (data) {
        $('#register').hide(500);

        var id = data.id;
        var token = data.token;
        var bearer = window.btoa(':' + token);
        var $keys = $('#keys');
        $keys.find('#user-id').html(id);
        $keys.find('#bearer-token').html(bearer);
        $keys.find('#access-key').html(token);

        $('#keys').show(500);
      }).fail(function () {
        $('#form-submit').val('Oops! Please try again in a bit.');
        setTimeout(function () {
          $('#form-submit').val('Submit');
        }, 2000);
      });
      
    });
  });
}(window.jQuery));