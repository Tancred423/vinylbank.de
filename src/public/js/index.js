// Checkboxes
$('#checkbox-header').change(function () {
    if ($(this).is(':checked')) {
        $('.checkbox-row').each(function (i) {
            $(this).prop('checked', true);
        });
        if ($('.checkbox-row').length > 0)
            $('#btn-delete').prop('disabled', false);
    } else {
        $('.checkbox-row').each(function (i) {
            $(this).prop('checked', false);
        });
        if ($('.checkbox-row').length > 0)
            $('#btn-delete').prop('disabled', true);
    }
});

$('.checkbox-row').change(function () {
    let allAreChecked = true;
    let atLeastOneIsChecked = false;

    $('.checkbox-row').each(function (i) {
        if (!$(this).is(':checked')) allAreChecked = false;
        else atLeastOneIsChecked = true;
    });

    $('#checkbox-header').prop('checked', allAreChecked);
    $('#btn-delete').prop('disabled', !atLeastOneIsChecked);
});


// Nav highlights
$(document).ready(function () {
    let parts = window.location.pathname.split('/');
    let lastSegment = parts.pop() || parts.pop();

    switch (lastSegment) {
        case 'all':
            $('#btn-all').addClass('nav-highlight');
            // document.getElementById('search').placeholder = 'Suche BluRay, DVD, CD oder Vinyl...';
            break;

        case 'bluray':
            $('#btn-bluray').addClass('nav-highlight');
            // document.getElementById('search').placeholder = 'Suche BluRay...';
            break;

        case "dvd":
            $('#btn-dvd').addClass('nav-highlight')
            // document.getElementById('search').placeholder = 'Suche DVD...';
            break;

        case "cd":
            $('#btn-cd').addClass('nav-highlight')
            // document.getElementById('search').placeholder = 'Suche CD...';
            break;

        case "vinyl":
            $('#btn-vinyl').addClass('nav-highlight')
            // document.getElementById('search').placeholder = 'Suche Vinyl...';
            break;
    }
});

// Row sub content
$('.data-table-row').on('click', function () {
    let id = $(this).attr('id');

    let subRow = $('#sub_' + id);

    if (subRow.hasClass('hide')) {
        $('.data-table-sub-row').each(function (i) {
            $(this).addClass('hide');
        });
        subRow.removeClass('hide');
    } else subRow.addClass('hide');
});

$('.data-table-row-bluray').on('click', function () {
    let id = $(this).attr('id');

    let subRow = $('#bluray_sub_' + id);

    if (subRow.hasClass('hide')) {
        $('.data-table-sub-row').each(function (i) {
            $(this).addClass('hide');
        });
        subRow.removeClass('hide');
    } else subRow.addClass('hide');
});

$('.data-table-row-dvd').on('click', function () {
    let id = $(this).attr('id');

    let subRow = $('#dvd_sub_' + id);

    if (subRow.hasClass('hide')) {
        $('.data-table-sub-row').each(function (i) {
            $(this).addClass('hide');
        });
        subRow.removeClass('hide');
    } else subRow.addClass('hide');
});

$('.data-table-row-cd').on('click', function () {
    let id = $(this).attr('id');

    let subRow = $('#cd_sub_' + id);

    if (subRow.hasClass('hide')) {
        $('.data-table-sub-row').each(function (i) {
            $(this).addClass('hide');
        });
        subRow.removeClass('hide');
    } else subRow.addClass('hide');
});

$('.data-table-row-vinyl').on('click', function () {
    let id = $(this).attr('id');
    let subRow = $('#vinyl_sub_' + id);

    if (subRow.hasClass('hide')) {
        $('.data-table-sub-row').each(function (i) {
            $(this).addClass('hide');
        });
        subRow.removeClass('hide');
    } else subRow.addClass('hide');
});

// Pagination
$(function ($) {
    let parts = window.location.pathname.split('/');
    let lastSegment = parts.pop() || parts.pop();

    if (lastSegment !== 'all') {
        let items = $('.data-table-row');
        let itemsLength = items.length;
        let perPage = 15;

        items.slice(perPage).hide();

        $("#pagination").pagination({
            items: itemsLength,
            itemsOnPage: perPage,
            displayedPages: 4,
            edges: 1,
            prevText: '<',
            nextText: '>',
            cssStyle: "light-theme",
            onInit: function () {
                let id = window.location.toString().split('#')[1]; // #page-2
                if (id) {
                    let page = id.split('-')[1]; // 2
                    $("#pagination").pagination('selectPage', page);
                }
            },
            onPageClick: function (pageNumber) {
                let showFrom = perPage * (pageNumber - 1);
                let showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).show();
            }
        });
    }
});

// Login
$(document).ready(function (e) {
    // Open login modal on home page if ?page=true
    if (window.location.pathname === '/') {
        const login = getParam('login');
        const passwordToken = getParam('password-token');
        let tokenExpired = getParam('password-token-expired')
        tokenExpired = tokenExpired == 'true';

        if (login == 'true') openLoginModal(passwordToken, tokenExpired);
    }
});

function closeErrorMessage(el) {
    el.parentElement.remove();
}

function openLoginModal(passwordToken, tokenExpired) {
    html = `
    <div class="user-modal" id="login-form">
        <div class="user-modal-container">
            <div id="switcher">
                <div id="switch-login" class="switch-wrapper-1 switch-divider">
                    <div class="switch">Anmelden</div>
                </div>
                <div id="switch-signup" class="switch-wrapper-2 switch-not-selected">
                    <div class="switch">Registrieren</div>
                </div>
            </div>

            <div id="login">
                <form class="form" id="form-login">
                    <div id="login-messages"></div>
                    <p class="fieldset">
                        <label class="image-replace email" for="signin-email">E-mail</label>
                        <input class="full-width has-padding has-border" id="signin-email" type="email" placeholder="E-Mail">
                    </p>

                    <p class="fieldset">
                        <label class="image-replace password" for="signin-password">Password</label>
                        <input class="full-width has-padding has-border" id="signin-password" type="password" placeholder="Passwort">
                        <span id="password-show-hide"><span id="pw-show"><i class="fas fa-eye"></i></span><span id="pw-hide" class="hide"><i class="fas fa-eye-slash"></i></span></span>
                    </p>

                    <p class="fieldset">
                        <input type="checkbox" id="remember-me" checked>
                        <label for="remember-me">Eingeloggt bleiben</label>
                    </p>

                    <p class="fieldset">
                        <input class="full-width" type="submit" value="Anmelden">
                    </p>
                </form>

                <p class="form-bottom-message">
                    <span id="switch-reset-password">
                        Passwort zurücksetzen
                    </span>
                </p>
            </div>

            <div id="signup" class="hide">
                <form class="form" id="form-signup">
                    <div id="signup-messages"></div>
                    <p class="fieldset">
                        <label class="image-replace username" for="signup-username">Username</label>
                        <input class="full-width has-padding has-border" id="signup-username" type="text" placeholder="Nutzername">
                    </p>

                    <p class="fieldset">
                        <label class="image-replace email" for="signup-email">E-mail</label>
                        <input class="full-width has-padding has-border" id="signup-email" type="email" placeholder="E-Mail">
                    </p>

                    <p class="fieldset">
                        <label class="image-replace password" for="signup-password">Password</label>
                        <input class="full-width has-padding has-border" id="signup-password" type="password" placeholder="Passwort">
                        <span id="password-show-hide-signup"><span id="pw-show-signup"><i class="fas fa-eye"></i></span><span id="pw-hide-signup" class="hide"><i class="fas fa-eye-slash"></i></span></span>
                    </p>

                    <p class="fieldset">
                        <label class="image-replace password" for="signup-password">Password</label>
                        <input class="full-width has-padding has-border" id="signup-password-repeat" type="password" placeholder="Passwort wiederholen">
                        <span id="password-show-hide-signup-repeat"><span id="pw-show-signup-repeat"><i class="fas fa-eye"></i></span><span id="pw-hide-signup-repeat" class="hide"><i class="fas fa-eye-slash"></i></span></span>
                    </p>

                    <p class="fieldset">
                        <input class="full-width has-padding" type="submit" value="Registrieren">
                    </p>
                </form>
            </div>

            <div id="reset-password" class="hide">
                <p class="form-message">Passwort verloren? Bitte geben Sie Ihre E-Mail-Adresse ein.</br> Sie werden einen Link erhalten, mit diesem Sie Ihr Passwort zurücksetzen können.</p>

                <form class="form" id="form-reset-password">
                    <div id="reset-password-messages"></div>
                    <p class="fieldset">
                        <label class="image-replace email" for="reset-email">E-mail</label>
                        <input class="full-width has-padding has-border" id="reset-email" type="email" placeholder="E-Mail">
                    </p>

                    <p class="fieldset">
                        <input class="full-width has-padding" type="submit" value="Passwort zurücksetzen">
                    </p>
                </form>

                <p class="form-bottom-message"><span id="switch-back-to-login">Zurück zur Anmeldung</span></p>
            </div>

            <div id="reset-password-token" class="hide">
                <p class="form-message">Geben Sir Ihr neues Password ein.</p>

                <form class="form" id="form-reset-password-token">
                    <div id="reset-token-messages"></div>
                    <p class="fieldset">
                        <label class="image-replace password" for="reset-token-password">Password</label>
                        <input class="full-width has-padding has-border" id="reset-token-password" type="password" placeholder="Passwort">
                        <span id="password-show-hide-reset-token"><span id="pw-show-reset-token"><i class="fas fa-eye"></i></span><span id="pw-hide-reset-token" class="hide"><i class="fas fa-eye-slash"></i></span></span>
                    </p>

                    <p class="fieldset">
                        <label class="image-replace password" for="reset-token-password">Password</label>
                        <input class="full-width has-padding has-border" id="reset-token-password-repeat" type="password" placeholder="Passwort wiederholen">
                        <span id="password-show-hide-reset-token-repeat"><span id="pw-show-reset-token-repeat"><i class="fas fa-eye"></i></span><span id="pw-hide-reset-token-repeat" class="hide"><i class="fas fa-eye-slash"></i></span></span>
                    </p>

                    <p class="fieldset">
                        <input class="full-width has-padding" type="submit" value="Passwort zurücksetzen">
                    </p>
                </form>
            </div>
        </div>
    </div>
    `

    $('#modals').append(html);

    // Login message -> verified
    let verified = getParam('verified');
    if (verified == 'true') {
        html = `
            <div class="message success-message">
                <span>E-Mail wurde bestätigt. Bitte einloggen.</span>
                <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
            </div>`

        $('#login-messages').append(html);
    }

    let newPassword = getParam('new-password');
    if (newPassword == 'true') {
        html = `
            <div class="message success-message">
                <span>Passwort wurde geändert. Bitte einloggen.</span>
                <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
            </div>`

        $('#login-messages').append(html);
    }

    // Form
    $(document).ready(function ($) {
        let formModal = $('#login-form');

        let switchLogin = $('#switch-login');
        let switchSignup = $('#switch-signup');
        let switchPassword = $('#switch-reset-password');
        let switchPasswordBack = $('#switch-back-to-login');

        let login = $('#login');
        let signup = $('#signup');
        let resetPassword = $('#reset-password');
        let resetPasswordToken = $('#reset-password-token');

        let pwField;
        let pwShow = $('#pw-show');
        let pwHide = $('#pw-hide');
        let pwShowSignup = $('#pw-show-signup');
        let pwHideSignup = $('#pw-hide-signup');
        let pwShowSignupRepeat = $('#pw-show-signup-repeat');
        let pwHideSignupRepeat = $('#pw-hide-signup-repeat');
        let pwShowResetToken = $('#pw-show-reset-token');
        let pwHideResetToken = $('#pw-hide-reset-token');
        let pwShowResetTokenRepeat = $('#pw-show-reset-token-repeat');
        let pwHideResetTokenRepeat = $('#pw-hide-reset-token-repeat');

        // Password reset token
        if (passwordToken) {
            // Switch to password reset token
            resetPasswordToken.removeClass('hide');
            if (!switchLogin.hasClass('switch-not-selected')) switchLogin.addClass('switch-not-selected');
            if (!switchSignup.hasClass('switch-not-selected')) switchSignup.addClass('switch-not-selected');

            if (!login.hasClass('hide')) login.addClass('hide');
            if (!signup.hasClass('hide')) signup.addClass('hide');
            if (!resetPassword.hasClass('hide')) resetPassword.addClass('hide');
        } else if (tokenExpired) {
            // Switch to password reset with error
            resetPassword.removeClass('hide');
            if (!switchLogin.hasClass('switch-not-selected')) switchLogin.addClass('switch-not-selected');
            if (!switchSignup.hasClass('switch-not-selected')) switchSignup.addClass('switch-not-selected');

            if (!login.hasClass('hide')) login.addClass('hide');
            if (!signup.hasClass('hide')) signup.addClass('hide');
            if (!resetPasswordToken.hasClass('hide')) resetPasswordToken.addClass('hide');

            html = `
                <div class="message error-message">
                    <span>Der Link ist abgelaufen. Bitte frage einen neuen an.</span>
                    <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                </div>`

            $('#reset-password-messages').append(html);
        }


        // Close modal
        $('.user-modal').on('click', function (event) {
            if ($(event.target).is(formModal) && !getParam('password-token')) {
                formModal.remove();
            }
        });

        // Close modal when clicking the esc keyboard button
        $(document).keyup(function (event) {
            if (event.which == '27') {
                formModal.remove();
            }
        });

        // Switch from a tab to another
        switchLogin.on('click', (e) => {
            e.preventDefault();
            if (switchLogin.hasClass('switch-not-selected')) {
                // Switch to Login
                switchLogin.removeClass('switch-not-selected');
                if (!switchSignup.hasClass('switch-not-selected')) switchSignup.addClass('switch-not-selected');

                if (login.hasClass('hide')) login.removeClass('hide');
                if (!signup.hasClass('hide')) signup.addClass('hide');
                if (!resetPassword.hasClass('hide')) resetPassword.addClass('hide');
                if (!resetPasswordToken.hasClass('hide')) resetPasswordToken.addClass('hide');
            }
        });

        switchSignup.on('click', (e) => {
            e.preventDefault();
            if (switchSignup.hasClass('switch-not-selected')) {
                // Switch to Signup
                switchSignup.removeClass('switch-not-selected');
                if (!switchLogin.hasClass('switch-not-selected')) switchLogin.addClass('switch-not-selected');

                if (signup.hasClass('hide')) signup.removeClass('hide');
                if (!login.hasClass('hide')) login.addClass('hide');
                if (!resetPassword.hasClass('hide')) resetPassword.addClass('hide');
                if (!resetPasswordToken.hasClass('hide')) resetPasswordToken.addClass('hide');
            }
        });

        switchPassword.on('click', (e) => {
            e.preventDefault();
            if (resetPassword.hasClass('hide')) {
                // Switch to password reset
                resetPassword.removeClass('hide');
                if (!switchLogin.hasClass('switch-not-selected')) switchLogin.addClass('switch-not-selected');
                if (!switchSignup.hasClass('switch-not-selected')) switchSignup.addClass('switch-not-selected');

                if (!login.hasClass('hide')) login.addClass('hide');
                if (!signup.hasClass('hide')) signup.addClass('hide');
                if (!resetPasswordToken.hasClass('hide')) resetPasswordToken.addClass('hide');
            }
        });

        switchPasswordBack.on('click', (e) => {
            e.preventDefault();
            if (!resetPassword.hasClass('hide')) {
                // Switch to password reset
                resetPassword.addClass('hide');
                if (switchLogin.hasClass('switch-not-selected')) switchLogin.removeClass('switch-not-selected');
                if (!switchSignup.hasClass('switch-not-selected')) switchSignup.addClass('switch-not-selected');

                if (login.hasClass('hide')) login.removeClass('hide');
                if (!signup.hasClass('hide')) signup.addClass('hide');
                if (!resetPasswordToken.hasClass('hide')) resetPasswordToken.addClass('hide');
            }
        });

        // Hide or show password
        $('#password-show-hide').on('click', function () {
            pwField = $(this).prev('input');

            if (pwField.attr('type') === 'password') pwField.attr('type', 'text');
            else pwField.attr('type', 'password');

            if (pwShow.hasClass('hide')) {
                pwShow.removeClass('hide');
                pwHide.addClass('hide');
            } else {
                pwShow.addClass('hide');
                pwHide.removeClass('hide');
            }
        });

        $('#password-show-hide-signup').on('click', function () {
            pwField = $(this).prev('input');

            if (pwField.attr('type') === 'password') pwField.attr('type', 'text');
            else pwField.attr('type', 'password');

            if (pwShowSignup.hasClass('hide')) {
                pwShowSignup.removeClass('hide');
                pwHideSignup.addClass('hide');
            } else {
                pwShowSignup.addClass('hide');
                pwHideSignup.removeClass('hide');
            }
        });

        $('#password-show-hide-signup-repeat').on('click', function () {
            pwField = $(this).prev('input');

            if (pwField.attr('type') === 'password') pwField.attr('type', 'text');
            else pwField.attr('type', 'password');

            if (pwShowSignupRepeat.hasClass('hide')) {
                pwShowSignupRepeat.removeClass('hide');
                pwHideSignupRepeat.addClass('hide');
            } else {
                pwShowSignupRepeat.addClass('hide');
                pwHideSignupRepeat.removeClass('hide');
            }
        });

        $('#password-show-hide-reset-token').on('click', function () {
            pwField = $(this).prev('input');

            if (pwField.attr('type') === 'password') pwField.attr('type', 'text');
            else pwField.attr('type', 'password');

            if (pwShowResetToken.hasClass('hide')) {
                pwShowResetToken.removeClass('hide');
                pwHideResetToken.addClass('hide');
            } else {
                pwShowResetToken.addClass('hide');
                pwHideResetToken.removeClass('hide');
            }
        });

        $('#password-show-hide-reset-token-repeat').on('click', function () {
            pwField = $(this).prev('input');

            if (pwField.attr('type') === 'password') pwField.attr('type', 'text');
            else pwField.attr('type', 'password');

            if (pwShowResetTokenRepeat.hasClass('hide')) {
                pwShowResetTokenRepeat.removeClass('hide');
                pwHideResetTokenRepeat.addClass('hide');
            } else {
                pwShowResetTokenRepeat.addClass('hide');
                pwHideResetTokenRepeat.removeClass('hide');
            }
        });
    });

    let formLogin = $('#form-login');
    let loginMessages = $('#login-messages');
    let signupMessages = $('#signup-messages');
    let resetPasswordMessages = $('#reset-password-messages');

    $(formLogin).on("submit", function (e) {
        e.preventDefault();

        let loginEmail = $('#signin-email');
        let loginPassword = $('#signin-password');
        let loginRememberMe = $('#remember-me');

        $.ajax({
            global: false,
            type: 'POST',
            url: '/auth/login',
            dataType: 'html',
            data: {
                email: loginEmail.val(),
                password: loginPassword.val(),
                rememberMe: loginRememberMe.is(':checked')
            },
            success: () => {
                // Reload because user is logged in
                // Route '/' will then redirect to '/all'
                window.location.href = '/';
            },
            error: function (xhr, ajaxOptions, thrownError) {
                let html;
                switch (xhr.status) {
                    case 401:
                        // E-Mail or password invalid
                        loginMessages.empty();

                        html = `
                        <div class="message error-message">
                            <span>E-Mail oder Passwort ungültig.</span>
                            <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                        </div>`

                        loginMessages.append(html);
                        break;

                    case 403:
                        // E-Mail not verified
                        loginMessages.empty();

                        html = `
                            <div class="message error-message">
                                <span>E-Mail wurde noch nicht bestätigt.<br/>
                                <a id="resend-mail" class="hyperlink">Bestätigungs-E-Mail erneut senden.</a></span>
                                <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                            </div>`

                        loginMessages.append(html);

                        resendMail();
                        break;

                    case 500:
                        // Internal server error
                        loginMessages.empty();

                        html = `
                        <div class="message error-message">
                            <span>Ups! Ein Fehler ist aufgetreten.</span>
                            <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                        </div>`

                        loginMessages.append(html);
                        break;
                }
            }
        });
    });

    let formSignup = $('#form-signup');

    $(formSignup).on("submit", function (e) {
        e.preventDefault();

        let signupUsername = $('#signup-username');
        let signupEmail = $('#signup-email');
        let signupPassword = $('#signup-password');
        let signupPasswordRepeat = $('#signup-password-repeat');

        if (signupPassword.val() !== signupPasswordRepeat.val()) {
            // Display info passwords not matching
            signupMessages.empty();

            let html = `
             <div class="message error-message">
                 <span>Passwörter stimmen nicht überein.</span>
                 <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
             </div>`

            signupMessages.append(html);
        } else {
            $.ajax({
                global: false,
                type: 'POST',
                url: '/auth/signup',
                dataType: 'html',
                data: {
                    username: signupUsername.val(),
                    email: signupEmail.val(),
                    password: signupPassword.val()
                },
                success: () => {
                    // Display info to check inbox
                    signupMessages.empty();

                    let html = `
                     <div class="message success-message">
                         <span>Erfolgreich registriert. Bitte bestätigen Sie Ihre E-Mail Adresse bevor Sie sich einloggen. Sie erhalten in kürze eine E-Mail mit einem Bestätigungslink.</span>
                         <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                     </div>`

                    signupMessages.append(html);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    let html;

                    switch (xhr.status) {
                        case 403:
                            // E-Mail already used
                            signupMessages.empty();

                            html = `
                            <div class="message error-message">
                                <span>E-Mail existiert bereits. Bitte stattdessen anmelden.</span>
                                <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                            </div>`

                            signupMessages.append(html);
                            break;

                        case 500:
                            // Internal server error
                            signupMessages.empty();

                            html = `
                            <div class="message error-message">
                                <span>Ups! Ein Fehler ist aufgetreten.</span>
                                <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                            </div>`

                            signupMessages.append(html);
                            break;
                    }
                }
            });
        }
    });

    let formResetPassword = $('#form-reset-password');

    $(formResetPassword).on("submit", function (e) {
        e.preventDefault();

        let resetEmail = $('#reset-email');

        $.ajax({
            global: false,
            type: 'POST',
            url: '/auth/reset-password',
            dataType: 'html',
            data: {
                email: resetEmail.val()
            },
            success: () => {
                // Show "Check mail"
                resetPasswordMessages.empty();

                html = `
                <div class="message success-message">
                    <span>Erfolgreich! Bitte überprüfen Sie Ihr Postfach.</span>
                    <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                </div>`

                resetPasswordMessages.append(html);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                switch (xhr.status) {
                    case 403:
                        // Account doesn't exist
                        resetPasswordMessages.empty();

                        html = `
                        <div class="message error-message">
                            <span>Ein Konto mit dieser E-Mail-Adresse existiert nicht.</span>
                            <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                        </div>`

                        resetPasswordMessages.append(html);
                        break;

                    case 500:
                        // Internal server error
                        resetPasswordMessages.empty();

                        html = `
                        <div class="message error-message">
                            <span>Ups! Ein Fehler ist aufgetreten.</span>
                            <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                        </div>`

                        resetPasswordMessages.append(html);
                        break;
                }
            }
        });
    });

    let formResetPasswordToken = $('#form-reset-password-token');
    let resetTokenMessages = $('#reset-token-messages')

    $(formResetPasswordToken).on("submit", function (e) {
        e.preventDefault();

        let resetPassword = $('#reset-token-password');
        let resetPasswordRepeat = $('#reset-token-password-repeat');

        if (resetPassword.val() !== resetPasswordRepeat.val()) {
            // Display info passwords not matching
            resetTokenMessages.empty();

            let html = `
                <div class="message error-message">
                    <span>Passwörter stimmen nicht überein.</span>
                    <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                </div>`

            resetTokenMessages.append(html);
        } else {
            $.ajax({
                global: false,
                type: 'POST',
                url: '/auth/new-password',
                dataType: 'html',
                data: {
                    password: resetPassword.val(),
                    token: getParam('password-token')
                },
                success: () => {
                    // Redirect to login
                    window.location.href = '/?login=true&new-password=true';
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    switch (xhr.status) {
                        case 403:
                            // Account doesn't exist
                            resetPasswordMessages.empty();

                            html = `
                            <div class="message error-message">
                                <span>Ein Konto mit dieser E-Mail-Adresse existiert nicht.</span>
                                <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                            </div>`

                            resetPasswordMessages.append(html);
                            break;

                        case 500:
                            // Internal server error
                            resetPasswordMessages.empty();

                            html = `
                            <div class="message error-message">
                                <span>Ups! Ein Fehler ist aufgetreten.</span>
                                <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                            </div>`

                            resetPasswordMessages.append(html);
                            break;
                    }
                }
            });
        }
    });
}

// Logout
function logout() {
    $.ajax({
        global: false,
        type: 'POST',
        url: '/auth/logout',
        dataType: 'html',
        success: () => {
            // Redirect to home page
            window.location.href = '/';
        }
    });
}

// Resend Mail
function resendMail() {
    let resendMail = $('#resend-mail');
    let loginMessages = $('#login-messages')

    $(resendMail).on("click", function (e) {
        e.preventDefault();

        $.ajax({
            global: false,
            type: 'POST',
            url: '/auth/signup-resend',
            dataType: 'html',
            data: {
                email: $('#signin-email').val(),
                password: $('#signin-password').val()
            },
            success: () => {
                // E-Mail was resend
                loginMessages.empty();

                html = `
                    <div class="message success-message">
                        <span>E-Mail wurde gesendet. Bitte überprüfen Sie Ihr Postfach.</span>
                        <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                    </div>
                    `;

                loginMessages.append(html);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                let html;

                switch (xhr.status) {
                    case 403:
                        // E-Mail doesn't exist or is already verified
                        loginMessages.empty();

                        html = `
                            <div class="message error-message">
                                <span>E-Mail wurde noch nicht registriert oder wurde bereits bestätigt.</span>
                                <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                            </div>
                            `;

                        loginMessages.append(html);
                        break;

                    case 500:
                        // Internal server error
                        loginMessages.empty();

                        html = `
                            <div class="message error-message">
                                <span>Ups! Ein Fehler ist aufgetreten.</span>
                                <span class="message-close" onclick="closeErrorMessage(this);"><i class="fas fa-times-circle"></i></span>
                            </div>
                            `;

                        loginMessages.append(html);
                        break;
                }
            }
        });
    });
}

// Get param
function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}
