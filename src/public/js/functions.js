const jwt = require('jsonwebtoken');

module.exports = {
    ////////////////////////////////////////////
    // Basic js functions
    ////////////////////////////////////////////

    sortMapByValue: (map) => {
        let a = [];
        for (let x of map) a.push(x)
        a.sort((x, y) => (x[1] > y[1]) ? 1 : ((y[1] > x[1]) ? -1 : 0))
        return new Map(a);
    },

    hasDuplicates: (array) => {
        return new Set(array).size !== array.length;
    },

    getBoolean: (string) => {
        return string == 'true';
    },

    getBlank: (string) => {
        return string == undefined ? "" : string;
    },

    // No white space (removes unnecssary whitespaces from multi line template literals)
    nws: (strings, ...placeholders) => {
        let withSpace = strings.reduce((result, string, i) => (result + placeholders[i - 1] + string));
        return withSpace.replace(/$\n^\s*/gm, ' ');
    },

    // Check user login
    isLoggedIn: (req, res, next) => {
        const token = req.cookies['jwt'];
        if (!token) return res.redirect('/?login=true');

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
        } catch (err) {
            return res.redirect('/?login=true');
        }
    },

    // Set user in req, even without auth check
    setReqUser: (req) => {
        const token = req.cookies['jwt'];
        if (token) {
            try {
                const verified = jwt.verify(token, process.env.JWT_SECRET);
                req.user = verified;
            } catch (ignore) { }
        }
    }
}
