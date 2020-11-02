const router = require('express').Router();
const { stream } = require('exceljs');
const mysql = require('../database/mysql');
const excel = require('exceljs');
const tempfile = require('tempfile');

// Global functions
const functions = require('../public/js/functions');
const nws = functions.nws;
const isLoggedIn = functions.isLoggedIn;

module.exports = function () {
    ////////////////////////////////////////////
    // Routes
    ////////////////////////////////////////////

    // 404
    router.get('/', isLoggedIn, (req, res) => {
        res.render('404', { req });
    });

    // BluRay: Create
    router.post('/bluray-create', isLoggedIn, (req, res) => {
        submitBluRayCreate(req, res);
    });

    // BluRay: Read
    router.post('/bluray-read', isLoggedIn, (req, res) => {
        submitBluRayRead(req, res);
    });

    // BluRay: Update
    router.post('/bluray-update', isLoggedIn, (req, res) => {
        submitBluRayUpdate(req, res);
    });

    // BluRay: Delete
    router.post('/bluray-delete', isLoggedIn, (req, res) => {
        submitBluRayDelete(req, res);
    });

    // BluRay: Excel Download
    router.get('/bluray-excel', isLoggedIn, (req, res) => {
        submitBluRayExcelDownload(req, res);
    });

    // BluRay: PDF Download
    router.get('/bluray-pdf', isLoggedIn, (req, res) => {
        submitBluRayPdfDownload(req, res);
    });

    // DVD: Create
    router.post('/dvd-create', isLoggedIn, (req, res) => {
        submitDvdCreate(req, res);
    });

    // DVD: Read
    router.post('/dvd-read', isLoggedIn, (req, res) => {
        submitDvdRead(req, res);
    });

    // DVD: Update
    router.post('/dvd-update', isLoggedIn, (req, res) => {
        submitDvdUpdate(req, res);
    });

    // DVD: Delete
    router.post('/dvd-delete', isLoggedIn, (req, res) => {
        submitDvdDelete(req, res);
    });

    // DVD: Excel Download
    router.get('/dvd-excel', isLoggedIn, (req, res) => {
        submitDvdExcelDownload(req, res);
    });

    // DVD: PDF Download
    router.get('/dvd-pdf', isLoggedIn, (req, res) => {
        submitDvdPdfDownload(req, res);
    });

    // CD: Create
    router.post('/cd-create', isLoggedIn, (req, res) => {
        submitCdCreate(req, res);
    });

    // CD: Read
    router.post('/cd-read', isLoggedIn, (req, res) => {
        submitCdRead(req, res);
    });

    // CD: Update
    router.post('/cd-update', isLoggedIn, (req, res) => {
        submitCdUpdate(req, res);
    });

    // CD: Delete
    router.post('/cd-delete', isLoggedIn, (req, res) => {
        submitCdDelete(req, res);
    });

    // CD: Excel Download
    router.get('/cd-excel', isLoggedIn, (req, res) => {
        submitCdExcelDownload(req, res);
    });

    // CD: PDF Download
    router.get('/cd-pdf', isLoggedIn, (req, res) => {
        submitCdPdfDownload(req, res);
    });

    // Vinyl: Create
    router.post('/vinyl-create', isLoggedIn, (req, res) => {
        submitVinylCreate(req, res);
    });

    // Vinyl: Read
    router.post('/vinyl-read', isLoggedIn, (req, res) => {
        submitVinylRead(req, res);
    });

    // Vinyl: Update
    router.post('/vinyl-update', isLoggedIn, (req, res) => {
        submitVinylUpdate(req, res);
    });

    // Vinyl: Delete
    router.post('/vinyl-delete', isLoggedIn, (req, res) => {
        submitVinylDelete(req, res);
    });

    // Vinyl: Excel Download
    router.get('/vinyl-excel', isLoggedIn, (req, res) => {
        submitVinylExcelDownload(req, res);
    });

    // Vinyl: PDF Download
    router.get('/vinyl-pdf', isLoggedIn, (req, res) => {
        submitVinylPdfDownload(req, res);
    });

    // All: Read
    router.post('/all-read', isLoggedIn, (req, res) => {
        submitAllRead(req, res);
    });

    // All: Excel Download
    router.get('/all-excel', isLoggedIn, (req, res) => {
        submitAllExcelDownload(req, res);
    });

    // All: PDF Download
    router.get('/all-pdf', isLoggedIn, (req, res) => {
        submitAllPdfDownload(req, res);
    });

    ////////////////////////////////////////////
    // Async submit-functions
    ////////////////////////////////////////////

    async function submitBluRayCreate(req, res) {
        try {
            const userId = req.user.id;
            const title = req.body.title;
            const actor = req.body.actor;
            const director = req.body.director;
            const genre = req.body.genre;
            const year = req.body.year;
            const lend = req.body.lend;
            const length = req.body.length;
            const note = req.body.note;

            const sql = nws`INSERT INTO bluray (user_id,title,actor,director,genre,year,lend,length,note)
                VALUES (
                    ${mysql.escape(userId)},
                    ${mysql.escape(title)},
                    ${mysql.escape(actor)},
                    ${mysql.escape(director)},
                    ${mysql.escape(genre)},
                    ${mysql.escape(year)},
                    ${mysql.escape(lend)},
                    ${mysql.escape(length)},
                    ${mysql.escape(note)}
                )`;

            await mysql.query(sql);

            res.sendStatus(200)
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitBluRayRead(req, res) {
        try {
            const userId = req.user.id;
            const searchTerm = req.body.searchTerm;

            const sql = nws`SELECT *
                FROM bluray
                WHERE user_id=${mysql.escape(userId)}
                AND (
                   title LIKE '%${searchTerm}%'
                   OR actor LIKE '%${searchTerm}%'
                   OR director LIKE '%${searchTerm}%'
                   OR genre LIKE '%${searchTerm}%'
                   OR year LIKE '%${searchTerm}%'
                   OR lend LIKE '%${searchTerm}%'
                   OR length LIKE '%${searchTerm}%'
                   OR note LIKE '%${searchTerm}%'
                )`;

            let result = await mysql.query(sql);
            result = result[0];

            let json = JSON.stringify(result);
            let obj = JSON.parse(json);
            return res.json(obj);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitBluRayUpdate(req, res) {
        try {
            const bluRayId = req.body.bluRayId;
            const title = req.body.title;
            const actor = req.body.actor;
            const director = req.body.director;
            const genre = req.body.genre;
            const year = req.body.year;
            const lend = req.body.lend;
            const length = req.body.length;
            const note = req.body.note;

            // Check if movie has entry
            const sql = nws`SELECT id
                FROM bluray
                WHERE id=${mysql.escape(bluRayId)}`;

            let result = await mysql.query(sql);
            result = result[0];

            if (result !== undefined && result.length > 0) {
                // Update the movie
                const sql = nws`UPDATE bluray
                    SET title=${mysql.escape(title)},
                        actor=${mysql.escape(actor)},
                        director=${mysql.escape(director)},
                        genre=${mysql.escape(genre)},
                        year=${mysql.escape(year)},
                        lend=${mysql.escape(lend)},
                        length=${mysql.escape(length)},
                        note=${mysql.escape(note)}
                    WHERE id=${mysql.escape(bluRayId)}`;

                await mysql.query(sql);

                res.sendStatus(200);
            } else res.sendStatus(500);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitBluRayDelete(req, res) {
        try {
            const userId = req.user.id;
            const ids = JSON.parse(req.body.idsToDelete);

            for (const i in ids) {
                const id = ids[i];

                const sql = nws`DELETE
                    FROM bluray
                    WHERE id=${mysql.escape(id)}`;

                await mysql.query(sql);
            }

            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitBluRayExcelDownload(req, res) {
        try {
            const userId = req.user.id;

            // Getting all BluRay info from this user
            let sql = nws`
                SELECT *
                FROM bluray
                WHERE user_id=${mysql.escape(userId)}
                `;

            let blurays = await mysql.query(sql);
            blurays = blurays[0];

            for (var i in blurays) {
                let bluray = blurays[i];
                bluray.title = bluray.title.split(" , ").join(", ");
                bluray.actor = bluray.actor.split(" , ").join(", ");
                bluray.director = bluray.director.split(" , ").join(", ");
                bluray.genre = bluray.genre.split(" , ").join(", ");
                bluray.lend = bluray.lend.split(" , ").join(", ");
                bluray.note = bluray.note.split(" , ").join(", ");
            }

            // Setting up the excel file
            let filename = 'BluRays.xlsx';
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('BluRays');

            worksheet.columns = [
                { header: 'Titel', key: 'title', width: 50 },
                { header: 'Schauspieler', key: 'actor', width: 60 },
                { header: 'Regisseur', key: 'director', width: 40 },
                { header: 'Genre', key: 'genre', width: 40 },
                { header: 'Länge (min)', key: 'length', width: 11 },
                { header: 'Erscheinungsjahr', key: 'year', width: 18 },
                { header: 'Verliehen an', key: 'lend', width: 13 },
                { header: 'Notiz', key: 'note', width: 50 }
            ];

            worksheet.addRows(blurays);

            // Formatting the excel file
            worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    cell.font = {
                        name: 'Arial',
                        family: 2,
                        bold: false,
                        size: 10,
                    };

                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'left'
                    };

                    if (rowNumber == 1) {
                        row.height = 20;

                        cell.font = {
                            bold: true
                        };

                        for (let i = 1; i < 9; i++) {
                            row.getCell(i).border = {
                                bottom: { style: 'thin' }
                            }
                        }
                    }

                    if (rowNumber > 1) {
                        for (let i = 1; i < 9; i++) {
                            if (Math.abs(rowNumber % 2) == 1) {
                                // Odd row number
                                row.getCell(i).fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: 'D9D9D9' }
                                };
                            }

                        }
                    }
                });
            });

            // Return the excel file
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader("Content-Disposition", "attachment; filename=" + filename);
            await workbook.xlsx.write(res);
            res.end();
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitBluRayPdfDownload(req, res) {
        try {
            const userId = req.user.id;

            let headerData = ['Titel', 'Schauspieler', 'Regisseur', 'Genre', 'Länge (min)', 'Erscheinungsjahr', 'Verliehen an', 'Notiz'];
            let bodyData = [];

            // Getting all BluRay info from this user
            let sql = nws`
                SELECT *
                FROM bluray
                WHERE user_id=${mysql.escape(userId)}
                `;

            let blurays = await mysql.query(sql);
            blurays = blurays[0];

            for (let i in blurays) {
                const bluray = blurays[i];
                bodyData.push([
                    bluray.title.split(" , ").join(", "),
                    bluray.actor.split(" , ").join(", "),
                    bluray.director.split(" , ").join(", "),
                    bluray.genre.split(" , ").join(", "),
                    bluray.length,
                    bluray.year,
                    bluray.lend.split(" , ").join(", "),
                    bluray.note.split(" , ").join(", ")
                ]);
            }

            let data = {
                head: headerData,
                body: bodyData
            };

            res.send(JSON.stringify(data))
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitDvdCreate(req, res) {
        try {
            const userId = req.user.id;
            const title = req.body.title;
            const actor = req.body.actor;
            const director = req.body.director;
            const genre = req.body.genre;
            const year = req.body.year;
            const lend = req.body.lend;
            const length = req.body.length;
            const note = req.body.note;

            const sql = nws`INSERT INTO dvd (user_id,title,actor,director,genre,year,lend,length,note)
                VALUES (
                    ${mysql.escape(userId)},
                    ${mysql.escape(title)},
                    ${mysql.escape(actor)},
                    ${mysql.escape(director)},
                    ${mysql.escape(genre)},
                    ${mysql.escape(year)},
                    ${mysql.escape(lend)},
                    ${mysql.escape(length)},
                    ${mysql.escape(note)}
                )`;

            await mysql.query(sql);

            res.sendStatus(200)
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitDvdRead(req, res) {
        try {
            const userId = req.user.id;
            const searchTerm = req.body.searchTerm;

            const sql = nws`SELECT *
                FROM dvd
                WHERE user_id=${mysql.escape(userId)}
                AND (
                   title LIKE '%${searchTerm}%'
                   OR actor LIKE '%${searchTerm}%'
                   OR director LIKE '%${searchTerm}%'
                   OR genre LIKE '%${searchTerm}%'
                   OR year LIKE '%${searchTerm}%'
                   OR lend LIKE '%${searchTerm}%'
                   OR length LIKE '%${searchTerm}%'
                   OR note LIKE '%${searchTerm}%'
                )`;

            let result = await mysql.query(sql);
            result = result[0];

            let json = JSON.stringify(result);
            let obj = JSON.parse(json);
            return res.json(obj);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitDvdUpdate(req, res) {
        try {
            const dvdId = req.body.dvdId;
            const title = req.body.title;
            const actor = req.body.actor;
            const director = req.body.director;
            const genre = req.body.genre;
            const year = req.body.year;
            const lend = req.body.lend;
            const length = req.body.length;
            const note = req.body.note;

            // Check if movie has entry
            const sql = nws`SELECT id
                FROM dvd
                WHERE id=${mysql.escape(dvdId)}`;

            let result = await mysql.query(sql);
            result = result[0];

            if (result !== undefined && result.length > 0) {
                // Update the movie
                const sql = nws`UPDATE dvd
                    SET title=${mysql.escape(title)},
                        actor=${mysql.escape(actor)},
                        director=${mysql.escape(director)},
                        genre=${mysql.escape(genre)},
                        year=${mysql.escape(year)},
                        lend=${mysql.escape(lend)},
                        length=${mysql.escape(length)},
                        note=${mysql.escape(note)}
                    WHERE id=${mysql.escape(dvdId)}`;

                await mysql.query(sql);

                res.sendStatus(200);
            } else res.sendStatus(500);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitDvdDelete(req, res) {
        try {
            const userId = req.user.id;
            const ids = JSON.parse(req.body.idsToDelete);

            for (const i in ids) {
                const id = ids[i];

                const sql = nws`DELETE
                    FROM dvd
                    WHERE id=${mysql.escape(id)}`;

                await mysql.query(sql);
            }

            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitDvdExcelDownload(req, res) {
        try {
            const userId = req.user.id;

            // Getting all DVD info from this user
            let sql = nws`
                SELECT *
                FROM dvd
                WHERE user_id=${mysql.escape(userId)}
                `;

            let dvds = await mysql.query(sql);
            dvds = dvds[0];

            for (var i in dvds) {
                let dvd = dvds[i];
                dvd.title = dvd.title.split(" , ").join(", ");
                dvd.actor = dvd.actor.split(" , ").join(", ");
                dvd.director = dvd.director.split(" , ").join(", ");
                dvd.genre = dvd.genre.split(" , ").join(", ");
                dvd.lend = dvd.lend.split(" , ").join(", ");
                dvd.note = dvd.note.split(" , ").join(", ");
            }

            // Setting up the excel file
            let filename = 'DVDs.xlsx';
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('DVDs');

            worksheet.columns = [
                { header: 'Titel', key: 'title', width: 50 },
                { header: 'Schauspieler', key: 'actor', width: 60 },
                { header: 'Regisseur', key: 'director', width: 40 },
                { header: 'Genre', key: 'genre', width: 40 },
                { header: 'Länge (min)', key: 'length', width: 11 },
                { header: 'Erscheinungsjahr', key: 'year', width: 18 },
                { header: 'Verliehen an', key: 'lend', width: 13 },
                { header: 'Notiz', key: 'note', width: 50 }
            ];

            worksheet.addRows(dvds);

            // Formatting the excel file
            worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    cell.font = {
                        name: 'Arial',
                        family: 2,
                        bold: false,
                        size: 10,
                    };

                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'left'
                    };

                    if (rowNumber == 1) {
                        row.height = 20;

                        cell.font = {
                            bold: true
                        };

                        for (let i = 1; i < 9; i++) {
                            row.getCell(i).border = {
                                bottom: { style: 'thin' }
                            }
                        }
                    }

                    if (rowNumber > 1) {
                        for (let i = 1; i < 9; i++) {
                            if (Math.abs(rowNumber % 2) == 1) {
                                // Odd row number
                                row.getCell(i).fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: 'D9D9D9' }
                                };
                            }

                        }
                    }
                });
            });

            // Return the excel file
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader("Content-Disposition", "attachment; filename=" + filename);
            await workbook.xlsx.write(res);
            res.end();
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitDvdPdfDownload(req, res) {
        try {
            const userId = req.user.id;

            let headerData = ['Titel', 'Schauspieler', 'Regisseur', 'Genre', 'Länge (min)', 'Erscheinungsjahr', 'Verliehen an', 'Notiz'];
            let bodyData = [];

            // Getting all DVD info from this user
            let sql = nws`
                SELECT *
                FROM dvd
                WHERE user_id=${mysql.escape(userId)}
                `;

            let dvds = await mysql.query(sql);
            dvds = dvds[0];

            for (let i in dvds) {
                const dvd = dvds[i];
                bodyData.push([
                    dvd.title.split(" , ").join(", "),
                    dvd.actor.split(" , ").join(", "),
                    dvd.director.split(" , ").join(", "),
                    dvd.genre.split(" , ").join(", "),
                    dvd.length,
                    dvd.year,
                    dvd.lend.split(" , ").join(", "),
                    dvd.note.split(" , ").join(", ")
                ]);
            }

            let data = {
                head: headerData,
                body: bodyData
            };

            res.send(JSON.stringify(data))
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitCdCreate(req, res) {
        try {
            const userId = req.user.id;
            const title = req.body.title;
            const band = req.body.band;
            const genre = req.body.genre;
            const year = req.body.year;
            const lend = req.body.lend;
            const length = req.body.length;
            const note = req.body.note;

            const sql = nws`INSERT INTO cd (user_id,title,band,genre,year,lend,length,note)
                VALUES (
                    ${mysql.escape(userId)},
                    ${mysql.escape(title)},
                    ${mysql.escape(band)},
                    ${mysql.escape(genre)},
                    ${mysql.escape(year)},
                    ${mysql.escape(lend)},
                    ${mysql.escape(length)},
                    ${mysql.escape(note)}
                )`;

            await mysql.query(sql);

            res.sendStatus(200)
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitCdRead(req, res) {
        try {
            const userId = req.user.id;
            const searchTerm = req.body.searchTerm;

            const sql = nws`SELECT *
                FROM cd
                WHERE user_id=${mysql.escape(userId)}
                AND (
                   title LIKE '%${searchTerm}%'
                   OR band LIKE '%${searchTerm}%'
                   OR genre LIKE '%${searchTerm}%'
                   OR year LIKE '%${searchTerm}%'
                   OR lend LIKE '%${searchTerm}%'
                   OR length LIKE '%${searchTerm}%'
                   OR note LIKE '%${searchTerm}%'
                )`;

            let result = await mysql.query(sql);
            result = result[0];

            let json = JSON.stringify(result);
            let obj = JSON.parse(json);
            return res.json(obj);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitCdUpdate(req, res) {
        try {
            const cdId = req.body.cdId;
            const title = req.body.title;
            const band = req.body.band;
            const genre = req.body.genre;
            const year = req.body.year;
            const lend = req.body.lend;
            const length = req.body.length;
            const note = req.body.note;

            // Check if movie has entry
            const sql = nws`SELECT id
                FROM cd
                WHERE id=${mysql.escape(cdId)}`;

            let result = await mysql.query(sql);
            result = result[0];

            if (result !== undefined && result.length > 0) {
                // Update the movie
                const sql = nws`UPDATE cd
                    SET title=${mysql.escape(title)},
                        band=${mysql.escape(band)},
                        genre=${mysql.escape(genre)},
                        year=${mysql.escape(year)},
                        lend=${mysql.escape(lend)},
                        length=${mysql.escape(length)},
                        note=${mysql.escape(note)}
                    WHERE id=${mysql.escape(cdId)}`;

                await mysql.query(sql);

                res.sendStatus(200);
            } else res.sendStatus(500);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitCdDelete(req, res) {
        try {
            const userId = req.user.id;
            const ids = JSON.parse(req.body.idsToDelete);

            for (const i in ids) {
                const id = ids[i];

                const sql = nws`DELETE
                    FROM cd
                    WHERE id=${mysql.escape(id)}`;

                await mysql.query(sql);
            }

            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitCdExcelDownload(req, res) {
        try {
            const userId = req.user.id;

            // Getting all CD info from this user
            let sql = nws`
                SELECT *
                FROM cd
                WHERE user_id=${mysql.escape(userId)}
                `;

            let cds = await mysql.query(sql);
            cds = cds[0];

            for (var i in cds) {
                let cd = cds[i];
                cd.title = cd.title.split(" , ").join(", ");
                cd.band = cd.band.split(" , ").join(", ");
                cd.genre = cd.genre.split(" , ").join(", ");
                cd.lend = cd.lend.split(" , ").join(", ");
                cd.note = cd.note.split(" , ").join(", ");
            }

            // Setting up the excel file
            let filename = 'CDs.xlsx';
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('CDs');

            worksheet.columns = [
                { header: 'Titel', key: 'title', width: 50 },
                { header: 'Künstler/Band', key: 'band', width: 60 },
                { header: 'Genre', key: 'genre', width: 40 },
                { header: 'Länge (min)', key: 'length', width: 11 },
                { header: 'Erscheinungsjahr', key: 'year', width: 18 },
                { header: 'Verliehen an', key: 'lend', width: 13 },
                { header: 'Notiz', key: 'note', width: 50 }
            ];

            worksheet.addRows(cds);

            // Formatting the excel file
            worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    cell.font = {
                        name: 'Arial',
                        family: 2,
                        bold: false,
                        size: 10,
                    };

                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'left'
                    };

                    if (rowNumber == 1) {
                        row.height = 20;

                        cell.font = {
                            bold: true
                        };

                        for (let i = 1; i < 8; i++) {
                            row.getCell(i).border = {
                                bottom: { style: 'thin' }
                            }
                        }
                    }

                    if (rowNumber > 1) {
                        for (let i = 1; i < 8; i++) {
                            if (Math.abs(rowNumber % 2) == 1) {
                                // Odd row number
                                row.getCell(i).fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: 'D9D9D9' }
                                };
                            }

                        }
                    }
                });
            });

            // Return the excel file
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader("Content-Disposition", "attachment; filename=" + filename);
            await workbook.xlsx.write(res);
            res.end();
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitCdPdfDownload(req, res) {
        try {
            const userId = req.user.id;

            let headerData = ['Titel', 'Künstler/Band', 'Genre', 'Länge (min)', 'Erscheinungsjahr', 'Verliehen an', 'Notiz'];
            let bodyData = [];

            // Getting all CD info from this user
            let sql = nws`
                SELECT *
                FROM cd
                WHERE user_id=${mysql.escape(userId)}
                `;

            let cds = await mysql.query(sql);
            cds = cds[0];

            for (let i in cds) {
                const cd = cds[i];
                bodyData.push([
                    cd.title.split(" , ").join(", "),
                    cd.band.split(" , ").join(", "),
                    cd.genre.split(" , ").join(", "),
                    cd.length,
                    cd.year,
                    cd.lend.split(" , ").join(", "),
                    cd.note.split(" , ").join(", ")
                ]);
            }

            let data = {
                head: headerData,
                body: bodyData
            };

            res.send(JSON.stringify(data))
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitVinylCreate(req, res) {
        try {
            const userId = req.user.id;
            const title = req.body.title;
            const band = req.body.band;
            const genre = req.body.genre;
            const type = req.body.type;
            const year = req.body.year;
            const lend = req.body.lend;
            const length = req.body.length;
            const note = req.body.note;

            const sql = nws`INSERT INTO vinyl (user_id,title,band,genre,type,year,lend,length,note)
                VALUES (
                    ${mysql.escape(userId)},
                    ${mysql.escape(title)},
                    ${mysql.escape(band)},
                    ${mysql.escape(genre)},
                    ${mysql.escape(type)},
                    ${mysql.escape(year)},
                    ${mysql.escape(lend)},
                    ${mysql.escape(length)},
                    ${mysql.escape(note)}
                )`;

            await mysql.query(sql);

            res.sendStatus(200)
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitVinylRead(req, res) {
        try {
            const userId = req.user.id;
            const searchTerm = req.body.searchTerm;

            const sql = nws`SELECT *
                FROM vinyl
                WHERE user_id=${mysql.escape(userId)}
                AND (
                   title LIKE '%${searchTerm}%'
                   OR band LIKE '%${searchTerm}%'
                   OR genre LIKE '%${searchTerm}%'
                   OR type LIKE '%${searchTerm}%'
                   OR year LIKE '%${searchTerm}%'
                   OR lend LIKE '%${searchTerm}%'
                   OR length LIKE '%${searchTerm}%'
                   OR note LIKE '%${searchTerm}%'
                )`;

            let result = await mysql.query(sql);
            result = result[0];

            let json = JSON.stringify(result);
            let obj = JSON.parse(json);
            return res.json(obj);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitVinylUpdate(req, res) {
        try {
            const vinylId = req.body.vinylId;
            const title = req.body.title;
            const band = req.body.band;
            const genre = req.body.genre;
            const type = req.body.type;
            const year = req.body.year;
            const lend = req.body.lend;
            const length = req.body.length;
            const note = req.body.note;

            // Check if movie has entry
            const sql = nws`SELECT id
                FROM vinyl
                WHERE id=${mysql.escape(vinylId)}`;

            let result = await mysql.query(sql);
            result = result[0];

            if (result !== undefined && result.length > 0) {
                // Update the movie
                const sql = nws`UPDATE vinyl
                    SET title=${mysql.escape(title)},
                        band=${mysql.escape(band)},
                        genre=${mysql.escape(genre)},
                        type=${mysql.escape(type)},
                        year=${mysql.escape(year)},
                        lend=${mysql.escape(lend)},
                        length=${mysql.escape(length)},
                        note=${mysql.escape(note)}
                    WHERE id=${mysql.escape(vinylId)}`;

                await mysql.query(sql);

                res.sendStatus(200);
            } else res.sendStatus(500);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitVinylDelete(req, res) {
        try {
            const userId = req.user.id;
            const ids = JSON.parse(req.body.idsToDelete);

            for (const i in ids) {
                const id = ids[i];

                const sql = nws`DELETE
                    FROM vinyl
                    WHERE id=${mysql.escape(id)}`;

                await mysql.query(sql);
            }

            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitVinylExcelDownload(req, res) {
        try {
            const userId = req.user.id;

            // Getting all vinyl info from this user
            let sql = nws`
                SELECT *
                FROM vinyl
                WHERE user_id=${mysql.escape(userId)}
                `;

            let vinyls = await mysql.query(sql);
            vinyls = vinyls[0];

            for (var i in vinyls) {
                let vinyl = vinyls[i];
                vinyl.title = vinyl.title.split(" , ").join(", ");
                vinyl.band = vinyl.band.split(" , ").join(", ");
                vinyl.genre = vinyl.genre.split(" , ").join(", ");
                vinyl.lend = vinyl.lend.split(" , ").join(", ");
                vinyl.note = vinyl.note.split(" , ").join(", ");
            }

            // Setting up the excel file
            let filename = 'Vinyls.xlsx';
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('Vinyls');

            worksheet.columns = [
                { header: 'Titel', key: 'title', width: 50 },
                { header: 'Künstler/Band', key: 'band', width: 60 },
                { header: 'Genre', key: 'genre', width: 40 },
                { header: 'Typ', key: 'type', width: 10 },
                { header: 'Länge (min)', key: 'length', width: 11 },
                { header: 'Erscheinungsjahr', key: 'year', width: 18 },
                { header: 'Verliehen an', key: 'lend', width: 13 },
                { header: 'Notiz', key: 'note', width: 50 }
            ];

            worksheet.addRows(vinyls);

            // Formatting the excel file
            worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    cell.font = {
                        name: 'Arial',
                        family: 2,
                        bold: false,
                        size: 10,
                    };

                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'left'
                    };

                    if (rowNumber == 1) {
                        row.height = 20;

                        cell.font = {
                            bold: true
                        };

                        for (let i = 1; i < 9; i++) {
                            row.getCell(i).border = {
                                bottom: { style: 'thin' }
                            }
                        }
                    }

                    if (rowNumber > 1) {
                        for (let i = 1; i < 9; i++) {
                            if (Math.abs(rowNumber % 2) == 1) {
                                // Odd row number
                                row.getCell(i).fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: 'D9D9D9' }
                                };
                            }

                        }
                    }
                });
            });

            // Return the excel file
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader("Content-Disposition", "attachment; filename=" + filename);
            await workbook.xlsx.write(res);
            res.end();
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitVinylPdfDownload(req, res) {
        try {
            const userId = req.user.id;

            let headerData = ['Titel', 'Künstler/Band', 'Genre', 'Typ', 'Länge (min)', 'Erscheinungsjahr', 'Verliehen an', 'Notiz'];
            let bodyData = [];

            // Getting all Vinyl info from this user
            let sql = nws`
                SELECT *
                FROM vinyl
                WHERE user_id=${mysql.escape(userId)}
                `;

            let vinyls = await mysql.query(sql);
            vinyls = vinyls[0];

            for (let i in vinyls) {
                const vinyl = vinyls[i];
                bodyData.push([
                    vinyl.title.split(" , ").join(", "),
                    vinyl.band.split(" , ").join(", "),
                    vinyl.genre.split(" , ").join(", "),
                    vinyl.type.split(" , ").join(", "),
                    vinyl.length,
                    vinyl.year,
                    vinyl.lend.split(" , ").join(", "),
                    vinyl.note.split(" , ").join(", ")
                ]);
            }

            let data = {
                head: headerData,
                body: bodyData
            };

            res.send(JSON.stringify(data))
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitAllRead(req, res) {
        try {
            const userId = req.user.id;
            const searchTerm = req.body.searchTerm;

            // BluRay
            let sql = nws`SELECT *
                FROM bluray
                WHERE user_id=${mysql.escape(userId)}
                AND (
                   title LIKE '%${searchTerm}%'
                   OR actor LIKE '%${searchTerm}%'
                   OR director LIKE '%${searchTerm}%'
                   OR genre LIKE '%${searchTerm}%'
                   OR year LIKE '%${searchTerm}%'
                   OR lend LIKE '%${searchTerm}%'
                   OR length LIKE '%${searchTerm}%'
                   OR note LIKE '%${searchTerm}%'
                )`;

            let bluRays = await mysql.query(sql);
            bluRays = bluRays[0];

            let bluRayJson = JSON.stringify(bluRays);
            let bluRayObj = JSON.parse(bluRayJson);

            // DVD
            sql = nws`SELECT *
                FROM dvd
                WHERE user_id=${mysql.escape(userId)}
                AND (
                   title LIKE '%${searchTerm}%'
                   OR actor LIKE '%${searchTerm}%'
                   OR director LIKE '%${searchTerm}%'
                   OR genre LIKE '%${searchTerm}%'
                   OR year LIKE '%${searchTerm}%'
                   OR lend LIKE '%${searchTerm}%'
                   OR length LIKE '%${searchTerm}%'
                   OR note LIKE '%${searchTerm}%'
                )`;

            let dvds = await mysql.query(sql);
            dvds = dvds[0];

            let dvdJson = JSON.stringify(dvds);
            let dvdObj = JSON.parse(dvdJson);

            // CD
            sql = nws`SELECT *
                FROM cd
                WHERE user_id=${mysql.escape(userId)}
                AND (
                   title LIKE '%${searchTerm}%'
                   OR band LIKE '%${searchTerm}%'
                   OR genre LIKE '%${searchTerm}%'
                   OR year LIKE '%${searchTerm}%'
                   OR lend LIKE '%${searchTerm}%'
                   OR length LIKE '%${searchTerm}%'
                   OR note LIKE '%${searchTerm}%'
                )`;

            let cds = await mysql.query(sql);
            cds = cds[0];

            let cdJson = JSON.stringify(cds);
            let cdObj = JSON.parse(cdJson);

            // Vinyl
            sql = nws`SELECT *
                FROM vinyl
                WHERE user_id=${mysql.escape(userId)}
                AND (
                   title LIKE '%${searchTerm}%'
                   OR band LIKE '%${searchTerm}%'
                   OR genre LIKE '%${searchTerm}%'
                   OR type LIKE '%${searchTerm}%'
                   OR year LIKE '%${searchTerm}%'
                   OR lend LIKE '%${searchTerm}%'
                   OR length LIKE '%${searchTerm}%'
                   OR note LIKE '%${searchTerm}%'
                )`;

            let vinyls = await mysql.query(sql);
            vinyls = vinyls[0];

            let vinylJson = JSON.stringify(vinyls);
            let vinylObj = JSON.parse(vinylJson);

            let objArray = [bluRayObj, dvdObj, cdObj, vinylObj];
            return res.json(objArray);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitAllExcelDownload(req, res) {
        try {
            const userId = req.user.id;

            // Setting up the excel file
            let filename = 'CDs.xlsx';
            let workbook = new excel.Workbook();

            ////////////////////////////////////////////
            // BluRay sheet
            ////////////////////////////////////////////

            // Getting all BluRay info from this user
            let sql = nws`
                SELECT *
                FROM bluray
                WHERE user_id=${mysql.escape(userId)}
                `;

            let blurays = await mysql.query(sql);
            blurays = blurays[0];

            for (var i in blurays) {
                let bluray = blurays[i];
                bluray.title = bluray.title.split(" , ").join(", ");
                bluray.actor = bluray.actor.split(" , ").join(", ");
                bluray.director = bluray.director.split(" , ").join(", ");
                bluray.genre = bluray.genre.split(" , ").join(", ");
                bluray.lend = bluray.lend.split(" , ").join(", ");
                bluray.note = bluray.note.split(" , ").join(", ");
            }

            let worksheetBluRays = workbook.addWorksheet('BluRays');

            worksheetBluRays.columns = [
                { header: 'Titel', key: 'title', width: 50 },
                { header: 'Schauspieler', key: 'actor', width: 60 },
                { header: 'Regisseur', key: 'director', width: 40 },
                { header: 'Genre', key: 'genre', width: 40 },
                { header: 'Länge (min)', key: 'length', width: 11 },
                { header: 'Erscheinungsjahr', key: 'year', width: 18 },
                { header: 'Verliehen an', key: 'lend', width: 13 },
                { header: 'Notiz', key: 'note', width: 50 }
            ];

            worksheetBluRays.addRows(blurays);

            // Formatting the excel file
            worksheetBluRays.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    cell.font = {
                        name: 'Arial',
                        family: 2,
                        bold: false,
                        size: 10,
                    };

                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'left'
                    };

                    if (rowNumber == 1) {
                        row.height = 20;

                        cell.font = {
                            bold: true
                        };

                        for (let i = 1; i < 9; i++) {
                            row.getCell(i).border = {
                                bottom: { style: 'thin' }
                            }
                        }
                    }

                    if (rowNumber > 1) {
                        for (let i = 1; i < 9; i++) {
                            if (Math.abs(rowNumber % 2) == 1) {
                                // Odd row number
                                row.getCell(i).fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: 'D9D9D9' }
                                };
                            }

                        }
                    }
                });
            });

            ////////////////////////////////////////////
            // DVD sheet
            ////////////////////////////////////////////

            // Getting all DVD info from this user
            sql = nws`
                SELECT *
                FROM dvd
                WHERE user_id=${mysql.escape(userId)}
                `;

            let dvds = await mysql.query(sql);
            dvds = dvds[0];

            for (var i in dvds) {
                let dvd = dvds[i];
                dvd.title = dvd.title.split(" , ").join(", ");
                dvd.actor = dvd.actor.split(" , ").join(", ");
                dvd.director = dvd.director.split(" , ").join(", ");
                dvd.genre = dvd.genre.split(" , ").join(", ");
                dvd.lend = dvd.lend.split(" , ").join(", ");
                dvd.note = dvd.note.split(" , ").join(", ");
            }

            let worksheetDvds = workbook.addWorksheet('DVDs');

            worksheetDvds.columns = [
                { header: 'Titel', key: 'title', width: 50 },
                { header: 'Schauspieler', key: 'actor', width: 60 },
                { header: 'Regisseur', key: 'director', width: 40 },
                { header: 'Genre', key: 'genre', width: 40 },
                { header: 'Länge (min)', key: 'length', width: 11 },
                { header: 'Erscheinungsjahr', key: 'year', width: 18 },
                { header: 'Verliehen an', key: 'lend', width: 13 },
                { header: 'Notiz', key: 'note', width: 50 }
            ];

            worksheetDvds.addRows(dvds);

            // Formatting the excel file
            worksheetDvds.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    cell.font = {
                        name: 'Arial',
                        family: 2,
                        bold: false,
                        size: 10,
                    };

                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'left'
                    };

                    if (rowNumber == 1) {
                        row.height = 20;

                        cell.font = {
                            bold: true
                        };

                        for (let i = 1; i < 9; i++) {
                            row.getCell(i).border = {
                                bottom: { style: 'thin' }
                            }
                        }
                    }

                    if (rowNumber > 1) {
                        for (let i = 1; i < 9; i++) {
                            if (Math.abs(rowNumber % 2) == 1) {
                                // Odd row number
                                row.getCell(i).fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: 'D9D9D9' }
                                };
                            }

                        }
                    }
                });
            });

            ////////////////////////////////////////////
            // CD sheet
            ////////////////////////////////////////////

            // Getting all CD info from this user
            sql = nws`
                SELECT *
                FROM cd
                WHERE user_id=${mysql.escape(userId)}
                `;

            let cds = await mysql.query(sql);
            cds = cds[0];

            for (var i in cds) {
                let cd = cds[i];
                cd.title = cd.title.split(" , ").join(", ");
                cd.band = cd.band.split(" , ").join(", ");
                cd.genre = cd.genre.split(" , ").join(", ");
                cd.lend = cd.lend.split(" , ").join(", ");
                cd.note = cd.note.split(" , ").join(", ");
            }

            let worksheetCds = workbook.addWorksheet('CDs');

            worksheetCds.columns = [
                { header: 'Titel', key: 'title', width: 50 },
                { header: 'Künstler/Band', key: 'band', width: 60 },
                { header: 'Genre', key: 'genre', width: 40 },
                { header: 'Länge (min)', key: 'length', width: 11 },
                { header: 'Erscheinungsjahr', key: 'year', width: 18 },
                { header: 'Verliehen an', key: 'lend', width: 13 },
                { header: 'Notiz', key: 'note', width: 50 }
            ];

            worksheetCds.addRows(cds);

            // Formatting the excel file
            worksheetCds.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    cell.font = {
                        name: 'Arial',
                        family: 2,
                        bold: false,
                        size: 10,
                    };

                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'left'
                    };

                    if (rowNumber == 1) {
                        row.height = 20;

                        cell.font = {
                            bold: true
                        };

                        for (let i = 1; i < 8; i++) {
                            row.getCell(i).border = {
                                bottom: { style: 'thin' }
                            }
                        }
                    }

                    if (rowNumber > 1) {
                        for (let i = 1; i < 8; i++) {
                            if (Math.abs(rowNumber % 2) == 1) {
                                // Odd row number
                                row.getCell(i).fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: 'D9D9D9' }
                                };
                            }

                        }
                    }
                });
            });

            ////////////////////////////////////////////
            // Vinyl sheet
            ////////////////////////////////////////////

            // Getting all vinyl info from this user
            sql = nws`
                SELECT *
                FROM vinyl
                WHERE user_id=${mysql.escape(userId)}
                `;

            let vinyls = await mysql.query(sql);
            vinyls = vinyls[0];

            for (var i in vinyls) {
                let vinyl = vinyls[i];
                vinyl.title = vinyl.title.split(" , ").join(", ");
                vinyl.band = vinyl.band.split(" , ").join(", ");
                vinyl.genre = vinyl.genre.split(" , ").join(", ");
                vinyl.lend = vinyl.lend.split(" , ").join(", ");
                vinyl.note = vinyl.note.split(" , ").join(", ");
            }

            let worksheetVinyls = workbook.addWorksheet('Vinyls');

            worksheetVinyls.columns = [
                { header: 'Titel', key: 'title', width: 50 },
                { header: 'Künstler/Band', key: 'band', width: 60 },
                { header: 'Genre', key: 'genre', width: 40 },
                { header: 'Typ', key: 'type', width: 10 },
                { header: 'Länge (min)', key: 'length', width: 11 },
                { header: 'Erscheinungsjahr', key: 'year', width: 18 },
                { header: 'Verliehen an', key: 'lend', width: 13 },
                { header: 'Notiz', key: 'note', width: 50 }
            ];

            worksheetVinyls.addRows(vinyls);

            // Formatting the excel file
            worksheetVinyls.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    cell.font = {
                        name: 'Arial',
                        family: 2,
                        bold: false,
                        size: 10,
                    };

                    cell.alignment = {
                        vertical: 'middle',
                        horizontal: 'left'
                    };

                    if (rowNumber == 1) {
                        row.height = 20;

                        cell.font = {
                            bold: true
                        };

                        for (let i = 1; i < 9; i++) {
                            row.getCell(i).border = {
                                bottom: { style: 'thin' }
                            }
                        }
                    }

                    if (rowNumber > 1) {
                        for (let i = 1; i < 9; i++) {
                            if (Math.abs(rowNumber % 2) == 1) {
                                // Odd row number
                                row.getCell(i).fill = {
                                    type: 'pattern',
                                    pattern: 'solid',
                                    fgColor: { argb: 'D9D9D9' }
                                };
                            }

                        }
                    }
                });
            });

            // Return the excel file
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader("Content-Disposition", "attachment; filename=" + filename);
            await workbook.xlsx.write(res);
            res.end();
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async function submitAllPdfDownload(req, res) {
        try {
            const userId = req.user.id;

            ////////////////////////////////////////////
            // Bluray data
            ////////////////////////////////////////////

            let headerDataBluray = ['Titel', 'Schauspieler', 'Regisseur', 'Genre', 'Länge (min)', 'Erscheinungsjahr', 'Verliehen an', 'Notiz'];
            let bodyDataBluray = [];

            // Getting all BluRay info from this user
            let sql = nws`
                SELECT *
                FROM bluray
                WHERE user_id=${mysql.escape(userId)}
                `;

            let blurays = await mysql.query(sql);
            blurays = blurays[0];

            for (let i in blurays) {
                const bluray = blurays[i];
                bodyDataBluray.push([
                    bluray.title.split(" , ").join(", "),
                    bluray.actor.split(" , ").join(", "),
                    bluray.director.split(" , ").join(", "),
                    bluray.genre.split(" , ").join(", "),
                    bluray.length,
                    bluray.year,
                    bluray.lend.split(" , ").join(", "),
                    bluray.note.split(" , ").join(", ")
                ]);
            }

            let dataBluray = {
                head: headerDataBluray,
                body: bodyDataBluray
            };

            ////////////////////////////////////////////
            // DVD data
            ////////////////////////////////////////////

            let headerDataDvd = ['Titel', 'Schauspieler', 'Regisseur', 'Genre', 'Länge (min)', 'Erscheinungsjahr', 'Verliehen an', 'Notiz'];
            let bodyDataDvd = [];

            // Getting all DVD info from this user
            sql = nws`
                SELECT *
                FROM dvd
                WHERE user_id=${mysql.escape(userId)}
                `;

            let dvds = await mysql.query(sql);
            dvds = dvds[0];

            for (let i in dvds) {
                const dvd = dvds[i];
                bodyDataDvd.push([
                    dvd.title.split(" , ").join(", "),
                    dvd.actor.split(" , ").join(", "),
                    dvd.director.split(" , ").join(", "),
                    dvd.genre.split(" , ").join(", "),
                    dvd.length,
                    dvd.year,
                    dvd.lend.split(" , ").join(", "),
                    dvd.note.split(" , ").join(", ")
                ]);
            }

            let dataDvd = {
                head: headerDataDvd,
                body: bodyDataDvd
            };

            ////////////////////////////////////////////
            // CD data
            ////////////////////////////////////////////

            let headerDataCd = ['Titel', 'Künstler/Band', 'Genre', 'Länge (min)', 'Erscheinungsjahr', 'Verliehen an', 'Notiz'];
            let bodyDataCd = [];

            // Getting all Vinyl info from this user
            sql = nws`
                SELECT *
                FROM cd
                WHERE user_id=${mysql.escape(userId)}
                `;

            let cds = await mysql.query(sql);
            cds = cds[0];

            for (let i in cds) {
                const cd = cds[i];
                bodyDataCd.push([
                    cd.title.split(" , ").join(", "),
                    cd.band.split(" , ").join(", "),
                    cd.genre.split(" , ").join(", "),
                    cd.length,
                    cd.year,
                    cd.lend.split(" , ").join(", "),
                    cd.note.split(" , ").join(", ")
                ]);
            }

            let dataCd = {
                head: headerDataCd,
                body: bodyDataCd
            };

            ////////////////////////////////////////////
            // Vinyl data
            ////////////////////////////////////////////

            let headerDataVinyl = ['Titel', 'Künstler/Band', 'Genre', 'Typ', 'Länge (min)', 'Erscheinungsjahr', 'Verliehen an', 'Notiz'];
            let bodyDataVinyl = [];

            // Getting all Vinyl info from this user
            sql = nws`
                SELECT *
                FROM vinyl
                WHERE user_id=${mysql.escape(userId)}
                `;

            let vinyls = await mysql.query(sql);
            vinyls = vinyls[0];

            for (let i in vinyls) {
                const vinyl = vinyls[i];
                bodyDataVinyl.push([
                    vinyl.title.split(" , ").join(", "),
                    vinyl.band.split(" , ").join(", "),
                    vinyl.genre.split(" , ").join(", "),
                    vinyl.type.split(" , ").join(", "),
                    vinyl.length,
                    vinyl.year,
                    vinyl.lend.split(" , ").join(", "),
                    vinyl.note.split(" , ").join(", ")
                ]);
            }

            let dataVinyl = {
                head: headerDataVinyl,
                body: bodyDataVinyl
            };

            let data = {
                bluray: dataBluray,
                dvd: dataDvd,
                cd: dataCd,
                vinyl: dataVinyl
            };

            res.send(JSON.stringify(data))
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    // Return exports
    return router;
}