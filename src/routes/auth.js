require('dotenv').config({ path: '/var/www/vinylbank.de/.env' }); // Linux 
// require('dotenv').config({ path: 'D:/OneDrive/Documents/Programming/vinylbank.de/.env' }); // Windows
const router = require('express').Router();
const mysql = require('../database/mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mail
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Global functions
const functions = require('../public/js/functions');
const isLoggedIn = functions.isLoggedIn;
const nws = functions.nws;

module.exports = function () {
    ////////////////////////////////////////////
    // Routes
    ////////////////////////////////////////////
    router.post('/login', (req, res) => {
        login(req, res);
    });

    router.post('/signup', (req, res) => {
        signup(req, res);
    });

    router.post('/signup-resend', (req, res) => {
        signupResend(req, res);
    });

    router.post('/reset-password', (req, res) => {
        resetPassword(req, res);
    });

    router.post('/logout', isLoggedIn, (req, res) => {
        logout(req, res);
    });

    router.get('/verify/:token', (req, res) => {
        verifyEmail(req, res);
    });

    router.get('/reset-password/:token', (req, res) => {
        resetPasswordToken(req, res);
    });

    router.post('/new-password', (req, res) => {
        newPassword(req, res);
    });

    router.get('*', (req, res) => {
        res.render('404', { req });
    });

    ////////////////////////////////////////////
    // Async auth-functions
    ////////////////////////////////////////////
    async function login(req, res) {
        const { email, password } = req.body;
        let rememberMe = req.body.rememberMe === 'true';

        // Check if email is already registered
        let sql = nws`SELECT id, password, verified_email
            FROM users
            WHERE email=${mysql.escape(email)}`;

        let users = await mysql.query(sql);
        users = users[0];

        if (!users[0].verified_email) {
            // Email not verified
            res.sendStatus(403);
        } else if (users.length > 0 && await bcrypt.compare(password, users[0].password)) {
            // Login successful
            let userId = users[0].id;

            const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
                expiresIn: rememberMe ? '10000d' : '1d'
            });

            const cookieOptions = {
                expires: new Date(Date.now() + (rememberMe ? 10000 : 1) * 24 * 60 * 60 * 1000), // days
                httpOnly: true
            }

            res.cookie('jwt', token, cookieOptions);

            res.sendStatus(200);
        } else {
            // Invalid password
            res.sendStatus(401);
        }
    }

    async function signup(req, res) {
        try {
            const { username, email, password } = req.body;

            // Check if email is already registered
            let sql = nws`SELECT id
                FROM users
                WHERE email=${mysql.escape(email)}`;

            let users = await mysql.query(sql);
            users = users[0];

            if (users.length > 0) {
                // Email is already registered
                res.sendStatus(403);
            } else {
                const hashedPassword = await bcrypt.hash(password, 8);

                sql = nws`INSERT INTO users(username,email,password,verified_email)
                    VALUES(${mysql.escape(username)},${mysql.escape(email)},${mysql.escape(hashedPassword)},${false})`;

                let result = await mysql.query(sql);
                result = result[0];

                let userId = result.insertId;

                // async email
                jwt.sign(
                    {
                        user: userId,
                    },
                    process.env.EMAIL_SECRET,
                    {
                        expiresIn: '1d',
                    },
                    (err, emailToken) => {
                        const url = `${req.get('origin')}/auth/verify/${emailToken}`;

                        transporter.sendMail({
                            to: email,
                            subject: 'Bestätigen Sie Ihre E-Mail Adresse',
                            html: `
                                Guten Tag,<br/>
                                <br/>
                                Bitte bestätigen Sie Ihre E-Mail Adresse indem Sie <a href="${url}">hier klicken</a>.<br/>
                                Wenn Sie dies nicht selbst angefordert haben, können Sie diese E-Mail ignorieren.<br/>
                                <br/>
                                Viele Grüße,<br/>
                                Das VinylBank Team
                                `
                        });
                    },
                );

                res.sendStatus(200);
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function signupResend(req, res) {
        try {
            const { email } = req.body;

            // Check if email is already registered
            let sql = nws`SELECT *
                FROM users
                WHERE email=${mysql.escape(email)}`;

            let users = await mysql.query(sql);
            users = users[0];

            if (users.length > 0 && !users[0].verified_email) {
                // Registered but not verified -> Resend Email
                const userId = users[0].id;

                // async email
                jwt.sign(
                    {
                        user: userId,
                    },
                    process.env.EMAIL_SECRET,
                    {
                        expiresIn: '1d',
                    },
                    (err, emailToken) => {
                        const url = `${req.get('origin')}/auth/verify/${emailToken}`;

                        transporter.sendMail({
                            to: email,
                            subject: 'Bestätigen Sie Ihre E-Mail Adresse',
                            html: `
                                Guten Tag,<br/>
                                <br/>
                                Bitte bestätigen Sie Ihre E-Mail Adresse indem Sie <a href="${url}">hier klicken</a>.<br/>
                                Wenn Sie dies nicht selbst angefordert haben, können Sie diese E-Mail ignorieren.<br/>
                                <br/>
                                Viele Grüße,<br/>
                                Das VinylBank Team
                                `
                        });
                    },
                );

                res.sendStatus(200);
            } else {
                res.sendStatus(403)
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function resetPassword(req, res) {
        const { email } = req.body;

        // Check if email is already registered
        let sql = nws`
            SELECT id
            FROM users
            WHERE email=${mysql.escape(email)}
            `;

        let users = await mysql.query(sql);
        users = users[0];

        if (users.length > 0) {
            // User exists -> send reset password mail
            const userId = users[0].id;

            // async email
            jwt.sign(
                {
                    user: userId,
                },
                process.env.RESET_SECRET,
                {
                    expiresIn: '1d',
                },
                (err, emailToken) => {
                    const url = `${req.get('origin')}/auth/reset-password/${emailToken}`;

                    transporter.sendMail({
                        to: email,
                        subject: 'Passwort zurücksetzen',
                        html: `
                            Guten Tag,<br/>
                            <br/>
                            es wurde angefordert Ihr Passwort zurückzusetzen.<br/>
                            Wenn Sie dies nicht selbst beantragt haben müssen Sie nun nichts weiter tun.<br/>
                            <br/>
                            Wenn Sie dies selbst beantragt haben, können Sie Ihr Password zurücksetzen indem sie <a href="${url}">hier klicken</a>.<br/>
                            <br/>
                            Viele Grüße,<br/>
                            Das VinylBank Team
                            `
                    });
                },
            );

            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    }

    async function logout(req, res) {
        res.clearCookie('jwt');
        res.sendStatus(200);
    }

    async function verifyEmail(req, res) {
        try {
            const user = jwt.verify(req.params.token, process.env.EMAIL_SECRET);

            if (user.user) {
                let sql = nws`
                    UPDATE users
                    SET verified_email=${true}
                    WHERE id=${mysql.escape(user.user)}
                    `;

                await mysql.query(sql);

                res.redirect('/?login=true&verified=true');
            } else res.render('500', { req });


        } catch (err) {
            console.error(err);
            res.render('500', { req });
        }
    }

    async function resetPasswordToken(req, res) {
        try {
            const user = jwt.verify(req.params.token, process.env.RESET_SECRET);

            if (user.user) {
                res.redirect(`/?login=true&password-token=${req.params.token}`);
            } else res.render('500', { req });
        } catch (err) {
            // Token expired
            res.redirect(`/?login=true&password-token-expired=true`);
        }
    }

    async function newPassword(req, res) {
        try {
            const { password, token } = req.body;

            const user = jwt.verify(token, process.env.RESET_SECRET);

            if (user.user) {
                const hashedPassword = await bcrypt.hash(password, 8);
                const userId = user.user;

                let sql = nws`
                    UPDATE users
                    SET password=${mysql.escape(hashedPassword)}
                    WHERE id=${mysql.escape(userId)}
                    `;

                await mysql.query(sql);

                res.sendStatus(200);
            } else res.render('500', { req });
        } catch (err) {
            console.error(err);
            res.render('500', { req });
        }
    }

    // Return exports
    return router;
}