$(document).ready(function () {

  // Function to toggle error messages
  function toggleError(condition, errorElement) {
    if (condition) {
      errorElement.addClass('show').show();
    } else {
      errorElement.removeClass('show').hide();
    }
  }

// Function to validate password for a specific form
  function validatePassword(form) {
    var passwordInput = form.find('.password-input');
    var validateboder = form.find('.validate');
    var password = passwordInput.val();

    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    var hasNumber = /\d/.test(password);
    var isValidLength = password.length > 10;

    toggleError(hasUpperCase, form.find('.error-uppercase'));
    toggleError(hasLowerCase, form.find('.error-lowercase'));
    toggleError(hasNumber, form.find('.error-number'));
    toggleError(hasSpecialChar, form.find('.error-specialchar'));
    toggleError(isValidLength, form.find('.error-length'));

    if (isValidLength && hasUpperCase && hasSpecialChar && hasNumber && hasLowerCase) {
      validateboder.removeClass('border-red');
      return true;
    } else {
      validateboder.addClass('border-red');
      return false;
    }
  }

// Function to check if password and confirm password match for a specific form
  function checkPasswordMatch(form) {
    var password = form.find('.password-input').val();
    var confirmPassword = form.find('.confirm-password-input').val();

    var errorMatchElement = form.find('.error-match');

    if (password === confirmPassword) {
      errorMatchElement.html('').css('color', 'green').show();
      return true;
    } else {
      errorMatchElement.html('Passwords do not match').css('color', 'red').show();
      return false;
    }
  }

// Attach event listeners for each password block
  $('.password-block').each(function() {
    var form = $(this);

    // Validate password on input change
    form.find('.password-input').on('input', function() {
      validatePassword(form);
    });

    // Match password on input change
    form.find('.password-input, .confirm-password-input').on('input', function() {
      checkPasswordMatch(form);
    });

    // Submit event listener
    form.on('submit', function(e) {
      var isPasswordValid = validatePassword(form);
      var isPasswordMatch = checkPasswordMatch(form);

      if (!isPasswordValid || !isPasswordMatch) {
        e.preventDefault(); // Prevent form submission if validation fails
        form.find('.validation-failure-message').show(); // Show the validation failure message
      } else {
        form.find('.validation-failure-message').hide(); // Hide the validation failure message if all is good
      }
    });
  });

  // Toggle password visibility
  $('.toggle-password').on('click', function () {
    var passwordField = $(this).closest('.input-group').find('.password-field');
    var passwordFieldType = passwordField.attr('type');
    var icon = $(this).find('i');

    if (passwordFieldType === 'password') {
      passwordField.attr('type', 'text');
      icon.removeClass('fa-eye').addClass('fa-eye-slash');
    } else {
      passwordField.attr('type', 'password');
      icon.removeClass('fa-eye-slash').addClass('fa-eye');
    }
  });
});
