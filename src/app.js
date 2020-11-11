global.devMode = true;

require('dotenv').config({ path: devMode ? 'D:/OneDrive/Documents/Programming/vinylbank.de/.env' : '/var/www/vinylbank.de/.env' });
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const session = require('express-session');
const path = require('path');
const mysql = require('./database/mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

////////////////////////////////////////////
// Global functions
////////////////////////////////////////////
const functions = require('./public/js/functions');
const isLoggedIn = functions.isLoggedIn;
const setReqUser = functions.setReqUser;
const nws = functions.nws;

////////////////////////////////////////////
// Express
////////////////////////////////////////////
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    resave: false,
    name: 'vinylbank.de'
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

////////////////////////////////////////////
// Middleware routes
////////////////////////////////////////////
const authRoute = require('./routes/auth')();
const submitRoute = require('./routes/submit')();

app.use('/auth', authRoute);
app.use('/submit', submitRoute);

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get('/', (req, res) => {
    renderHome(req, res);
});

app.get('/all', isLoggedIn, (req, res) => {
    renderAll(req, res);
});

app.get('/bluray', isLoggedIn, (req, res) => {
    renderBluRay(req, res);
});

app.get('/dvd', isLoggedIn, (req, res) => {
    renderDvd(req, res);
});

app.get('/cd', isLoggedIn, (req, res) => {
    renderCd(req, res);
});

app.get('/vinyl', isLoggedIn, (req, res) => {
    renderVinyl(req, res);
});

// 404
app.get('*', function (req, res) {
    render404(req, res);
});

////////////////////////////////////////////
// General
////////////////////////////////////////////
function getRandomGreeting(username) {
    const i = Math.floor(Math.random() * Math.floor(10)); // 0, 1, 2, ..., 9
    switch (i) {
        case 0:
            return `Hallo ${username}!`;
        case 1:
            return `Willkommen ${username}!`;
        case 2:
            return `Sei gegrüßt, ${username}!`;
        case 3:
            const hg = new Date().getHours();
            if (hg >= 6 && hg < 12) return `Guten Morgen ${username}!`;
            else if (hg >= 12 && hg < 18) return `Guten Tag ${username}!`;
            else if (hg >= 18 && hg < 22) return `Guten Abend ${username}!`;
            else return `Gute Nacht ${username}!`;
        case 4:
            return `Moin ${username}!`;
        case 5:
            return `Grüezi ${username}!`;
        case 6:
            return `Servus ${username}!`;
        case 7:
            const hd = new Date().getHours();
            if (hd >= 6 && hd < 12) return `Goedemorgen ${username}!`;
            else if (hd >= 12 && hd < 18) return `Goedendag ${username}!`;
            else if (hd >= 18 && hd < 22) return `Goedenavond ${username}!`;
            else return `Goedenacht ${username}!`;
        case 8:
            return `Grüß Gott, ${username}!`;
        case 9:
            return `Huhu ${username}!`;
    }
}

////////////////////////////////////////////
// Async render-functions
////////////////////////////////////////////

async function renderHome(req, res) {
    setReqUser(req);
    if (req.user) res.redirect('/all'); // Logged in
    else res.render('home', { req }); // Logged out
}

async function renderAll(req, res) {
    try {
        const userId = req.user.id;

        // Ordering?
        const { orderby, direction } = req.query;

        // BluRay
        let sql = nws`
            SELECT *
            FROM bluray
            WHERE user_id=${mysql.escape(userId)}
        `;

        if ((orderby !== undefined && direction !== undefined) &&
            (orderby === 'title' || orderby === 'genre' || orderby === 'length') &&
            (direction === 'asc') || direction === 'desc') {
            sql += nws`
                ORDER BY ${orderby} ${direction.toUpperCase()}
            `;
        }

        let blurays = await mysql.query(sql);
        blurays = blurays[0];

        // DVD
        sql = nws`
            SELECT *
            FROM dvd
            WHERE user_id=${mysql.escape(userId)}
        `;

        if ((orderby !== undefined && direction !== undefined) &&
            (orderby === 'title' || orderby === 'genre' || orderby === 'length') &&
            (direction === 'asc') || direction === 'desc') {
            sql += nws`
                ORDER BY ${orderby} ${direction.toUpperCase()}
            `;
        }

        let dvds = await mysql.query(sql);
        dvds = dvds[0];

        // CD
        sql = nws`
            SELECT *
            FROM cd
            WHERE user_id=${mysql.escape(userId)}
        `;

        if ((orderby !== undefined && direction !== undefined) &&
            (orderby === 'title' || orderby === 'band' || orderby === 'genre') &&
            (direction === 'asc') || direction === 'desc') {
            sql += nws`
                ORDER BY ${orderby} ${direction.toUpperCase()}
            `;
        }

        let cds = await mysql.query(sql);
        cds = cds[0];

        // Vinyl
        sql = nws`
            SELECT *
            FROM vinyl
            WHERE user_id=${mysql.escape(userId)}
        `;

        if ((orderby !== undefined && direction !== undefined) &&
            (orderby === 'title' || orderby === 'band' || orderby === 'genre') &&
            (direction === 'asc') || direction === 'desc') {
            sql += nws`
                ORDER BY ${orderby} ${direction.toUpperCase()}
            `;
        }

        let vinyls = await mysql.query(sql);
        vinyls = vinyls[0];

        // Username
        sql = nws`
            SELECT username
            FROM users
            WHERE id=${mysql.escape(userId)}
        `;

        let username = await mysql.query(sql);
        username = username[0][0].username;

        const greeting = getRandomGreeting(username);

        res.render('all', { req, blurays, dvds, cds, vinyls, orderby, direction, greeting });
    } catch (err) {
        console.error(err);
        res.render('500', { req });
    }
}

async function renderBluRay(req, res) {
    try {
        const userId = req.user.id;

        let sql = nws`
            SELECT *
            FROM bluray
            WHERE user_id=${mysql.escape(userId)}
        `;

        // Ordering?
        const { orderby, direction } = req.query;

        if ((orderby !== undefined && direction !== undefined) &&
            (orderby === 'title' || orderby === 'director' || orderby === 'genre' || orderby === 'length') &&
            (direction === 'asc') || direction === 'desc') {
            sql += nws`
                ORDER BY ${orderby} ${direction.toUpperCase()}
            `;
        }

        let blurays = await mysql.query(sql);
        blurays = blurays[0];

        res.render('bluray', { req, blurays, orderby, direction });
    } catch (err) {
        console.error(err);
        res.render('500', { req });
    }
}

async function renderDvd(req, res) {
    try {
        const userId = req.user.id;

        let sql = nws`
            SELECT *
            FROM dvd
            WHERE user_id=${mysql.escape(userId)}
        `;

        // Ordering?
        const { orderby, direction } = req.query;

        if ((orderby !== undefined && direction !== undefined) &&
            (orderby === 'title' || orderby === 'director' || orderby === 'genre' || orderby === 'length') &&
            (direction === 'asc') || direction === 'desc') {
            sql += nws`
                ORDER BY ${orderby} ${direction.toUpperCase()}
            `;
        }

        let dvds = await mysql.query(sql);
        dvds = dvds[0];

        res.render('dvd', { req, dvds, orderby, direction });
    } catch (err) {
        console.error(err);
        res.render('500', { req });
    }
}

async function renderCd(req, res) {
    try {
        const userId = req.user.id;

        let sql = nws`SELECT *
            FROM cd
            WHERE user_id=${mysql.escape(userId)}
        `;

        // Ordering?
        const { orderby, direction } = req.query;

        if ((orderby !== undefined && direction !== undefined) &&
            (orderby === 'title' || orderby === 'band' || orderby === 'genre') &&
            (direction === 'asc') || direction === 'desc') {
            sql += nws`
                ORDER BY ${orderby} ${direction.toUpperCase()}
            `;
        }

        let cds = await mysql.query(sql);
        cds = cds[0];

        res.render('cd', { req, cds, orderby, direction });
    } catch (err) {
        console.error(err);
        res.render('500', { req });
    }
}

async function renderVinyl(req, res) {
    try {
        const userId = req.user.id;

        let sql = nws`SELECT *
            FROM vinyl
            WHERE user_id=${mysql.escape(userId)}
        `;

        // Ordering?
        const { orderby, direction } = req.query;

        if ((orderby !== undefined && direction !== undefined) &&
            (orderby === 'title' || orderby === 'band' || orderby === 'genre') &&
            (direction === 'asc') || direction === 'desc') {
            sql += nws`
                ORDER BY ${orderby} ${direction.toUpperCase()}
            `;
        }

        let vinyls = await mysql.query(sql);
        vinyls = vinyls[0];

        res.render('vinyl', { req, vinyls, orderby, direction });
    } catch (err) {
        console.error(err);
        res.render('500', { req });
    }
}

async function render404(req, res) {
    setReqUser(req);
    res.status(404).render('404', { req });
}

////////////////////////////////////////////
// Start
////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Websocket connected on port ${PORT}`);
});
