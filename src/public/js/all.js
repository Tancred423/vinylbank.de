/// BluRay
// Create
$('#btn-create-bluray').on('click', function (e) {
    e.preventDefault();

    let html =
        '<div id="modal-create" class="modal">' +
        '   <div class="modal-inner">' +
        '	    <form action="/submit/bluray-create" id="form-create">' +
        '           <div class="modal-header"><img class="medium-logo" src="/img/bluray.svg" alt="BluRay Logo"> BluRay</div>' +
        '	        <div class="modal-content">' +

        '			    <div class="form-group">' +
        '				    <label for="title">Titel</label>' +
        '				    <input type="text" name="title" id="title" placeholder="z. B. James Bond 007: Skyfall" required>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="actor">Schauspieler</label>' +
        '				    <textarea name="actor" id="actor" placeholder="z. B. Daniel Craig, Javier Bardem, Ralph Fiennes, Naomie Harris, Bérénice Marlohe, Albert Finney, Judi Dench"></textarea>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="director">Regisseur</label>' +
        '				    <textarea name="director" id="director" placeholder="z. B. Sam Mendes"></textarea>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="genre">Genre</label>' +
        '				    <input type="text" name="genre" id="genre" placeholder="z. B. Action, Adventure, Crime Fiction, Spy, Thriller">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="year">Erscheinungsjahr</label>' +
        '				    <input type="number" name="year" id="year" placeholder="z. B. 2012">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="lend">Verliehen an</label>' +
        '				    <input type="text" name="lend" id="lend" placeholder="z. B. Max Mustermann am 31.12.2019">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="length">Länge (min)</label>' +
        '				    <input type="number" name="length" id="length" placeholder="z. B. 143">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="note">Notiz</label>' +
        '				    <textarea name="note" id="note" placeholder="z. B. Geschenk von Erika Mustermann"></textarea>' +
        '			    </div>' +

        '           </div>' +
        '           <div class="modal-footer">' +
        '               <div class="text-right">' +
        '                   <button id="btn-create-cancel" class="btn red"><i class="fas fa-times-circle"></i> Abbrechen</button>' +
        '                   <button id="btn-create-submit" class="btn green" type="submit"><i class="fas fa-save"></i> Sichern</button>' +
        '               </div>' +
        '           </div>' +
        '		</form>' +
        '	</div>' +
        '</div>';

    $('#modals').append(html);

    $('#btn-create-cancel').on('click', function (e) {
        e.preventDefault();
        $('#modal-create').remove();
    });

    $('#form-create').submit(function (e) {
        e.preventDefault();

        $.ajax({
            global: false,
            type: 'POST',
            url: '/submit/bluray-create',
            dataType: 'html',
            data: {
                title: $('#title').val(),
                actor: $('#actor').val(),
                director: $('#director').val(),
                genre: $('#genre').val(),
                year: $('#year').val(),
                lend: $('#lend').val(),
                length: $('#length').val(),
                note: $('#note').val()
            },
            success: function () {
                alert("Eintrag erstellt!");
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Eintrag konnte nicht erstellt werden.")
            }
        });
    });
});

// Update
function modal_edit_bluray(bluRayId, title, actor, director, genre, year, lend, length, note) {
    let html =
        '<div id="modal-edit" class="modal">' +
        '	<div class="modal-inner">' +
        '		<form action="/submit/bluray-update" id="form-edit">' +
        '           <div class="modal-header"><img class="medium-logo" src="/img/bluray.svg" alt="BluRay Logo"> BluRay: ' + title + '</div>' +
        '	        <div class="modal-content">' +
        '			    <div class="form-group">' +
        '				    <label for="title">Titel</label>' +
        '				    <input type="text" name="title" id="title" placeholder="z. B. James Bond 007: Skyfall" value="' + title + '" required>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="actor">Schauspieler</label>' +
        '                   <textarea name="actor" id="actor" placeholder="z. B. Daniel Craig, Javier Bardem, Ralph Fiennes, Naomie Harris, Bérénice Marlohe, Albert Finney, Judi Dench">' + actor + '</textarea>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="director">Regisseur</label>' +
        '                   <textarea name="director" id="director" placeholder="z. B. Sam Mendes">' + director + '</textarea>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="genre">Genre</label>' +
        '				    <input type="text" name="genre" id="genre" placeholder="z. B. Action, Adventure, Crime Fiction, Spy, Thriller" value="' + genre + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="year">Erscheinungsjahr</label>' +
        '				    <input type="number" name="year" id="year" placeholder="z. B. 2012" value="' + year + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="lend">Verliehen an</label>' +
        '				    <input type="text" name="lend" id="lend" placeholder="z. B. Max Mustermann am 31.12.2019" value="' + lend + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="length">Länge (min)</label>' +
        '				    <input type="number" name="length" id="length" placeholder="z. B. 143" value="' + length + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="note">Notiz</label>' +
        '                   <textarea name="note" id="note" placeholder="z. B. Geschenk von Erika Mustermann">' + note + '</textarea>' +
        '			    </div>' +

        '			    ' +
        '	        </div>' +
        '           <div class="modal-footer">' +
        '               <div class="text-right">' +
        '                   <button id="btn-edit-cancel" class="btn red"><i class="fas fa-times-circle"></i> Abbrechen</button>' +
        '                   <button id="btn-edit-submit" class="btn green" type="submit"><i class="fas fa-save"></i> Sichern</button>' +
        '               </div>' +
        '           </div>' +
        '	    </form>' +
        '   </div>' +
        '</div>';

    $('#modals').append(html);

    $('#btn-edit-cancel').on('click', function (e) {
        e.preventDefault();
        $('#modal-edit').remove();
    });

    $('#form-edit').submit(function (e) {
        e.preventDefault();

        $.ajax({
            global: false,
            type: 'POST',
            url: '/submit/bluray-update',
            dataType: 'html',
            data: {
                userId: 0,
                bluRayId: bluRayId,
                title: $('#title').val(),
                actor: $('#actor').val(),
                director: $('#director').val(),
                genre: $('#genre').val(),
                year: $('#year').val(),
                lend: $('#lend').val(),
                length: $('#length').val(),
                note: $('#note').val()
            },
            success: function () {
                alert("Eintrag aktualisiert!");
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Eintrag konnte nicht aktualisiert werden.")
            }
        });
    });
}

// Delete
$('#btn-delete-bluray').on('click', function () {
    if (confirm("Bist Du sicher, dass Du die selektierten Einträge löschen willst?")) {
        let idsToDelete = [];
        $('.data-table-row-bluray').each(function (i) {
            if ($(this).find('.checkbox-row-bluray').is(':checked'))
                idsToDelete.push($(this).find('.column-id').text());
        });

        $.ajax({
            global: false,
            type: 'POST',
            url: '/submit/bluray-delete',
            dataType: 'html',
            data: {
                idsToDelete: JSON.stringify(idsToDelete)
            },
            success: function () {
                alert("Einträge gelöscht!");
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Einträge konnten nicht gelöscht werden.")
            }
        });
    }
});

/// DVD
// Create
$('#btn-create-dvd').on('click', function (e) {
    e.preventDefault();

    let html =
        '<div id="modal-create" class="modal">' +
        '   <div class="modal-inner">' +
        '	    <form action="/submit/dvd-create" id="form-create">' +
        '           <div class="modal-header"><img class="medium-logo" src="/img/dvd.svg" alt="DVD Logo"> DVD</div>' +
        '	        <div class="modal-content">' +

        '			    <div class="form-group">' +
        '				    <label for="title">Titel</label>' +
        '				    <input type="text" name="title" id="title" placeholder="z. B. James Bond 007: Skyfall" required>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="actor">Schauspieler</label>' +
        '				    <textarea name="actor" id="actor" placeholder="z. B. Daniel Craig, Javier Bardem, Ralph Fiennes, Naomie Harris, Bérénice Marlohe, Albert Finney, Judi Dench"></textarea>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="director">Regisseur</label>' +
        '				    <textarea name="director" id="director" placeholder="z. B. Sam Mendes"></textarea>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="genre">Genre</label>' +
        '				    <input type="text" name="genre" id="genre" placeholder="z. B. Action, Adventure, Crime Fiction, Spy, Thriller">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="year">Erscheinungsjahr</label>' +
        '				    <input type="number" name="year" id="year" placeholder="z. B. 2012">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="lend">Verliehen an</label>' +
        '				    <input type="text" name="lend" id="lend" placeholder="z. B. Max Mustermann am 31.12.2019">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="length">Länge (min)</label>' +
        '				    <input type="number" name="length" id="length" placeholder="z. B. 143">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="note">Notiz</label>' +
        '				    <textarea name="note" id="note" placeholder="z. B. Geschenk von Erika Mustermann"></textarea>' +
        '			    </div>' +

        '           </div>' +
        '           <div class="modal-footer">' +
        '               <div class="text-right">' +
        '                   <button id="btn-create-cancel" class="btn red"><i class="fas fa-times-circle"></i> Abbrechen</button>' +
        '                   <button id="btn-create-submit" class="btn green" type="submit"><i class="fas fa-save"></i> Sichern</button>' +
        '               </div>' +
        '           </div>' +
        '		</form>' +
        '	</div>' +
        '</div>';

    $('#modals').append(html);

    $('#btn-create-cancel').on('click', function (e) {
        e.preventDefault();
        $('#modal-create').remove();
    });

    $('#form-create').submit(function (e) {
        e.preventDefault();

        $.ajax({
            global: false,
            type: 'POST',
            url: '/submit/dvd-create',
            dataType: 'html',
            data: {
                title: $('#title').val(),
                actor: $('#actor').val(),
                director: $('#director').val(),
                genre: $('#genre').val(),
                year: $('#year').val(),
                lend: $('#lend').val(),
                length: $('#length').val(),
                note: $('#note').val()
            },
            success: function () {
                alert("Eintrag erstellt!");
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Eintrag konnte nicht erstellt werden.")
            }
        });
    });
});

// Update
function modal_edit_dvd(dvdId, title, actor, director, genre, year, lend, length, note) {
    let html =
        '<div id="modal-edit" class="modal">' +
        '	<div class="modal-inner">' +
        '		<form action="/submit/dvd-update" id="form-edit">' +
        '           <div class="modal-header"><img class="medium-logo" src="/img/dvd.svg" alt="DVD Logo"> DVD: ' + title + '</div>' +
        '	        <div class="modal-content">' +
        '			    <div class="form-group">' +
        '				    <label for="title">Titel</label>' +
        '				    <input type="text" name="title" id="title" placeholder="z. B. James Bond 007: Skyfall" value="' + title + '" required>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="actor">Schauspieler</label>' +
        '                   <textarea name="actor" id="actor" placeholder="z. B. Daniel Craig, Javier Bardem, Ralph Fiennes, Naomie Harris, Bérénice Marlohe, Albert Finney, Judi Dench">' + actor + '</textarea>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="director">Regisseur</label>' +
        '                   <textarea name="director" id="director" placeholder="z. B. Sam Mendes">' + director + '</textarea>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="genre">Genre</label>' +
        '				    <input type="text" name="genre" id="genre" placeholder="z. B. Action, Adventure, Crime Fiction, Spy, Thriller" value="' + genre + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="year">Erscheinungsjahr</label>' +
        '				    <input type="number" name="year" id="year" placeholder="z. B. 2012" value="' + year + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="lend">Verliehen an</label>' +
        '				    <input type="text" name="lend" id="lend" placeholder="z. B. Max Mustermann am 31.12.2019" value="' + lend + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="length">Länge (min)</label>' +
        '				    <input type="number" name="length" id="length" placeholder="z. B. 143" value="' + length + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="note">Notiz</label>' +
        '                   <textarea name="note" id="note" placeholder="z. B. Geschenk von Erika Mustermann">' + note + '</textarea>' +
        '			    </div>' +

        '			    ' +
        '	        </div>' +
        '           <div class="modal-footer">' +
        '               <div class="text-right">' +
        '                   <button id="btn-edit-cancel" class="btn red"><i class="fas fa-times-circle"></i> Abbrechen</button>' +
        '                   <button id="btn-edit-submit" class="btn green" type="submit"><i class="fas fa-save"></i> Sichern</button>' +
        '               </div>' +
        '           </div>' +
        '	    </form>' +
        '   </div>' +
        '</div>';

    $('#modals').append(html);

    $('#btn-edit-cancel').on('click', function (e) {
        e.preventDefault();
        $('#modal-edit').remove();
    });

    $('#form-edit').submit(function (e) {
        e.preventDefault();

        $.ajax({
            global: false,
            type: 'POST',
            url: '/submit/dvd-update',
            dataType: 'html',
            data: {
                userId: 0,
                dvdId: dvdId,
                title: $('#title').val(),
                actor: $('#actor').val(),
                director: $('#director').val(),
                genre: $('#genre').val(),
                year: $('#year').val(),
                lend: $('#lend').val(),
                length: $('#length').val(),
                note: $('#note').val()
            },
            success: function () {
                alert("Eintrag aktualisiert!");
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Eintrag konnte nicht aktualisiert werden.")
            }
        });
    });
}

// Delete
$('#btn-delete-dvd').on('click', function () {
    if (confirm("Bist Du sicher, dass Du die selektierten Einträge löschen willst?")) {
        let idsToDelete = [];
        $('.data-table-row-dvd').each(function (i) {
            if ($(this).find('.checkbox-row-dvd').is(':checked'))
                idsToDelete.push($(this).find('.column-id').text());
        });

        $.ajax({
            global: false,
            type: 'POST',
            url: '/submit/dvd-delete',
            dataType: 'html',
            data: {
                idsToDelete: JSON.stringify(idsToDelete)
            },
            success: function () {
                alert("Einträge gelöscht!");
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Einträge konnten nicht gelöscht werden.")
            }
        });
    }
});

/// CD
// Create
$('#btn-create-cd').on('click', function (e) {
    e.preventDefault();

    let html =
        '<div id="modal-create" class="modal">' +
        '   <div class="modal-inner">' +
        '	    <form action="/submit/cd-create" id="form-create">' +
        '           <div class="modal-header"><img class="medium-logo" src="/img/cd.svg" alt="CD Logo"> CD</div>' +
        '	        <div class="modal-content">' +

        '			    <div class="form-group">' +
        '				    <label for="title">Titel</label>' +
        '				    <input type="text" name="title" id="title" placeholder="z. B. Powerage" required>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="band">Künstler/Band</label>' +
        '				    <textarea name="band" id="band" placeholder="z. B. AC/DC"></textarea>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="genre">Genre</label>' +
        '				    <input type="text" name="genre" id="genre" placeholder="z. B. Hard Rock, Blues Rock">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="length">Länge (min)</label>' +
        '				    <input type="number" name="length" id="length" placeholder="z. B. 40">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="year">Erscheinungsjahr</label>' +
        '				    <input type="number" name="year" id="year" placeholder="z. B. 1978">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="lend">Verliehen an</label>' +
        '				    <input type="text" name="lend" id="lend" placeholder="z. B. Max Mustermann am 31.12.2019">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="note">Notiz</label>' +
        '				    <textarea name="note" id="note" placeholder="z. B. Geschenk von Erika Mustermann"></textarea>' +
        '			    </div>' +

        '           </div>' +
        '           <div class="modal-footer">' +
        '               <div class="text-right">' +
        '                   <button id="btn-create-cancel" class="btn red"><i class="fas fa-times-circle"></i> Abbrechen</button>' +
        '                   <button id="btn-create-submit" class="btn green" type="submit"><i class="fas fa-save"></i> Sichern</button>' +
        '               </div>' +
        '           </div>' +
        '		</form>' +
        '	</div>' +
        '</div>';

    $('#modals').append(html);

    $('#btn-create-cancel').on('click', function (e) {
        e.preventDefault();
        $('#modal-create').remove();
    });

    $('#form-create').submit(function (e) {
        e.preventDefault();

        $.ajax({
            global: false,
            type: 'POST',
            url: '/submit/cd-create',
            dataType: 'html',
            data: {
                title: $('#title').val(),
                band: $('#band').val(),
                genre: $('#genre').val(),
                year: $('#year').val(),
                lend: $('#lend').val(),
                length: $('#length').val(),
                note: $('#note').val()
            },
            success: function () {
                alert("Eintrag erstellt!");
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Eintrag konnte nicht erstellt werden.")
            }
        });
    });
});

// Update
function modal_edit_cd(cdId, title, band, genre, year, lend, length, note) {
    let html =
        '<div id="modal-edit" class="modal">' +
        '	<div class="modal-inner">' +
        '		<form action="/submit/cd-update" id="form-edit">' +
        '           <div class="modal-header"><img class="medium-logo" src="/img/cd.svg" alt="CD Logo"> CD: ' + title + '</div>' +
        '	        <div class="modal-content">' +
        '			    <div class="form-group">' +
        '				    <label for="title">Titel</label>' +
        '				    <input type="text" name="title" id="title" placeholder="z. B. Powerage" value="' + title + '" required>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="band">Künstler/Band</label>' +
        '                   <textarea name="band" id="band" placeholder="z. B. AC/DC">' + band + '</textarea>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="genre">Genre</label>' +
        '				    <input type="text" name="genre" id="genre" placeholder="z. B. Hard Rock, Blues Rock" value="' + genre + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="length">Länge (min)</label>' +
        '				    <input type="number" name="length" id="length" placeholder="z. B. 40" value="' + length + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="year">Erscheinungsjahr</label>' +
        '				    <input type="number" name="year" id="year" placeholder="z. B. 1978" value="' + year + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="lend">Verliehen an</label>' +
        '				    <input type="text" name="lend" id="lend" placeholder="z. B. Max Mustermann am 31.12.2019" value="' + lend + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="note">Notiz</label>' +
        '                   <textarea name="note" id="note" placeholder="z. B. Geschenk von Erika Mustermann">' + note + '</textarea>' +
        '			    </div>' +

        '			    ' +
        '	        </div>' +
        '           <div class="modal-footer">' +
        '               <div class="text-right">' +
        '                   <button id="btn-edit-cancel" class="btn red"><i class="fas fa-times-circle"></i> Abbrechen</button>' +
        '                   <button id="btn-edit-submit" class="btn green" type="submit"><i class="fas fa-save"></i> Sichern</button>' +
        '               </div>' +
        '           </div>' +
        '	    </form>' +
        '   </div>' +
        '</div>';

    $('#modals').append(html);

    $('#btn-edit-cancel').on('click', function (e) {
        e.preventDefault();
        $('#modal-edit').remove();
    });

    $('#form-edit').submit(function (e) {
        e.preventDefault();

        $.ajax({
            global: false,
            type: 'POST',
            url: '/submit/cd-update',
            dataType: 'html',
            data: {
                userId: 0,
                cdId: cdId,
                title: $('#title').val(),
                band: $('#band').val(),
                genre: $('#genre').val(),
                year: $('#year').val(),
                lend: $('#lend').val(),
                length: $('#length').val(),
                note: $('#note').val()
            },
            success: function () {
                alert("Eintrag aktualisiert!");
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Eintrag konnte nicht aktualisiert werden.")
            }
        });
    });
}

// Delete
$('#btn-delete-cd').on('click', function () {
    if (confirm("Bist Du sicher, dass Du die selektierten Einträge löschen willst?")) {
        let idsToDelete = [];
        $('.data-table-row-cd').each(function (i) {
            if ($(this).find('.checkbox-row-cd').is(':checked'))
                idsToDelete.push($(this).find('.column-id').text());
        });

        $.ajax({
            global: false,
            type: 'POST',
            url: '/submit/cd-delete',
            dataType: 'html',
            data: {
                idsToDelete: JSON.stringify(idsToDelete)
            },
            success: function () {
                alert("Einträge gelöscht!");
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Einträge konnten nicht gelöscht werden.")
            }
        });
    }
});

/// Vinyl
// Create
$('#btn-create-vinyl').on('click', function (e) {
    e.preventDefault();

    let html =
        '<div id="modal-create" class="modal">' +
        '   <div class="modal-inner">' +
        '	    <form action="/submit/vinyl-create" id="form-create">' +
        '           <div class="modal-header"><img class="medium-logo" src="/img/vinyl.svg" alt="Vinyl Logo"> Vinyl</div>' +
        '	        <div class="modal-content">' +

        '			    <div class="form-group">' +
        '				    <label for="title">Titel</label>' +
        '				    <input type="text" name="title" id="title" placeholder="z. B. Powerage" required>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="band">Künstler/Band</label>' +
        '				    <textarea name="band" id="band" placeholder="z. B. AC/DC"></textarea>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="genre">Genre</label>' +
        '				    <input type="text" name="genre" id="genre" placeholder="z. B. Hard Rock, Blues Rock">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="length">Länge (min)</label>' +
        '				    <input type="number" name="length" id="length" placeholder="z. B. 40">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="type">Typ</label>' +
        '				    <input type="text" name="type" id="type" placeholder="z. B. LP">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="year">Erscheinungsjahr</label>' +
        '				    <input type="number" name="year" id="year" placeholder="z. B. 1978">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="lend">Verliehen an</label>' +
        '				    <input type="text" name="lend" id="lend" placeholder="z. B. Max Mustermann am 31.12.2019">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="note">Notiz</label>' +
        '				    <textarea name="note" id="note" placeholder="z. B. Geschenk von Erika Mustermann"></textarea>' +
        '			    </div>' +

        '           </div>' +
        '           <div class="modal-footer">' +
        '               <div class="text-right">' +
        '                   <button id="btn-create-cancel" class="btn red"><i class="fas fa-times-circle"></i> Abbrechen</button>' +
        '                   <button id="btn-create-submit" class="btn green" type="submit"><i class="fas fa-save"></i> Sichern</button>' +
        '               </div>' +
        '           </div>' +
        '		</form>' +
        '	</div>' +
        '</div>';

    $('#modals').append(html);

    $('#btn-create-cancel').on('click', function (e) {
        e.preventDefault();
        $('#modal-create').remove();
    });

    $('#form-create').submit(function (e) {
        e.preventDefault();

        $.ajax({
            global: false,
            type: 'POST',
            url: '/submit/vinyl-create',
            dataType: 'html',
            data: {
                title: $('#title').val(),
                band: $('#band').val(),
                genre: $('#genre').val(),
                type: $('#type').val(),
                year: $('#year').val(),
                lend: $('#lend').val(),
                length: $('#length').val(),
                note: $('#note').val()
            },
            success: function () {
                alert("Eintrag erstellt!");
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Eintrag konnte nicht erstellt werden.")
            }
        });
    });
});

// Update
function modal_edit_vinyl(vinylId, title, band, genre, type, year, lend, length, note) {
    let html =
        '<div id="modal-edit" class="modal">' +
        '	<div class="modal-inner">' +
        '		<form action="/submit/vinyl-update" id="form-edit">' +
        '           <div class="modal-header"><img class="medium-logo" src="/img/vinyl.svg" alt="Vinyl Logo"> Vinyl: ' + title + '</div>' +
        '	        <div class="modal-content">' +
        '			    <div class="form-group">' +
        '				    <label for="title">Titel</label>' +
        '				    <input type="text" name="title" id="title" placeholder="z. B. Powerage" value="' + title + '" required>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="band">Künstler/Band</label>' +
        '                   <textarea name="band" id="band" placeholder="z. B. AC/DC">' + band + '</textarea>' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="genre">Genre</label>' +
        '				    <input type="text" name="genre" id="genre" placeholder="z. B. Hard Rock, Blues Rock" value="' + genre + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="length">Länge (min)</label>' +
        '				    <input type="number" name="length" id="length" placeholder="z. B. 40" value="' + length + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="type">Typ</label>' +
        '				    <input type="text" name="type" id="type" placeholder="z. B. LP" value="' + type + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="year">Erscheinungsjahr</label>' +
        '				    <input type="number" name="year" id="year" placeholder="z. B. 1978" value="' + year + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="lend">Verliehen an</label>' +
        '				    <input type="text" name="lend" id="lend" placeholder="z. B. Max Mustermann am 31.12.2019" value="' + lend + '">' +
        '			    </div>' +

        '			    <div class="form-group">' +
        '				    <label for="note">Notiz</label>' +
        '                   <textarea name="note" id="note" placeholder="z. B. Geschenk von Erika Mustermann">' + note + '</textarea>' +
        '			    </div>' +

        '			    ' +
        '	        </div>' +
        '           <div class="modal-footer">' +
        '               <div class="text-right">' +
        '                   <button id="btn-edit-cancel" class="btn red"><i class="fas fa-times-circle"></i> Abbrechen</button>' +
        '                   <button id="btn-edit-submit" class="btn green" type="submit"><i class="fas fa-save"></i> Sichern</button>' +
        '               </div>' +
        '           </div>' +
        '	    </form>' +
        '   </div>' +
        '</div>';

    $('#modals').append(html);

    $('#btn-edit-cancel').on('click', function (e) {
        e.preventDefault();
        $('#modal-edit').remove();
    });

    $('#form-edit').submit(function (e) {
        e.preventDefault();

        $.ajax({
            global: false,
            type: 'POST',
            url: '/submit/vinyl-update',
            dataType: 'html',
            data: {
                userId: 0,
                vinylId: vinylId,
                title: $('#title').val(),
                band: $('#band').val(),
                genre: $('#genre').val(),
                type: $('#type').val(),
                year: $('#year').val(),
                lend: $('#lend').val(),
                length: $('#length').val(),
                note: $('#note').val()
            },
            success: function () {
                alert("Eintrag aktualisiert!");
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Eintrag konnte nicht aktualisiert werden.")
            }
        });
    });
}

// Delete
$('#btn-delete-vinyl').on('click', function () {
    if (confirm("Bist Du sicher, dass Du die selektierten Einträge löschen willst?")) {
        let idsToDelete = [];
        $('.data-table-row-vinyl').each(function (i) {
            if ($(this).find('.checkbox-row-vinyl').is(':checked'))
                idsToDelete.push($(this).find('.column-id').text());
        });

        $.ajax({
            global: false,
            type: 'POST',
            url: '/submit/vinyl-delete',
            dataType: 'html',
            data: {
                idsToDelete: JSON.stringify(idsToDelete)
            },
            success: function () {
                alert("Einträge gelöscht!");
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Einträge konnten nicht gelöscht werden.")
            }
        });
    }
});

// Read
$('#search').on('keyup', function (e) {
    e.preventDefault();

    $.ajax({
        global: false,
        type: 'POST',
        url: '/submit/all-read',
        dataType: 'html',
        data: {
            searchTerm: $('#search').val()
        }
    }).then(function (objArray) {
        let objArrayParsed = JSON.parse(objArray);
        let blurays = objArrayParsed[0];
        let dvds = objArrayParsed[1];
        let cds = objArrayParsed[2];
        let vinyls = objArrayParsed[3];

        // BluRay
        $('#data-table-content-bluray').empty();

        if (blurays) {
            blurays.forEach(bluray => {
                let html = '';
                html +=
                    '<div class="data-table-row-bluray" id="row_' + bluray.id + '">' +
                    '   <div class="checkbox">' +
                    '       <label class="pure-material-checkbox">' +
                    '            <input class="checkbox-row-bluray" type="checkbox">' +
                    '            <span></span>' +
                    '        </label>' +
                    '    </div>' +
                    '    <div class="column-1">' + bluray.title + '</div>' +
                    '    <div class="column-2">';

                let genres = bluray.genre.split(',');
                genres.forEach(genreEntry => {
                    let genre = genreEntry.trim();
                    html +=
                        '<span class="actor">' + genre + '</span>';
                });

                html +=
                    '   </div>' +
                    '   <div class="column-3">' + bluray.length + ' min</div>' +
                    '   <div class="column-edit"><button id="bluray_button_' + bluray.id + '" class="btn-edit btn orange btn-edit"><i class="fas fa-edit"></i></button></div>' +
                    '   <div class="column-id hide">' + bluray.id + '</div>' +
                    '</div>' +
                    '<div class="data-table-sub-row hide" id="bluray_sub_row_' + bluray.id + '">' +
                    '   <div class="sub-row-entry">' +
                    '        <span class="sub-title">Genre</span>' +
                    '        <span class="sub-content">';

                genres.forEach(genreEntry => {
                    let genre = genreEntry.trim();
                    html +=
                        '    <span class="actor">' + genre + '</span>';
                });

                html +=
                    '       </span>' +
                    '   </div>' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Schauspieler</span>' +
                    '       <span class="sub-content">';


                let actors = bluray.actor.split(',');
                actors.forEach(actorEntry => {
                    let actor = actorEntry.trim();
                    html +=
                        '       <span class="actor">' + actor + '</span>';
                });

                html +=
                    '       </span>' +
                    '   </div>' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Regisseur</span>' +
                    '       <span class="sub-content">';

                let directors = bluray.director.split(',');
                directors.forEach(directorEntry => {
                    let director = directorEntry.trim();
                    html +=
                        '       <span class="actor">' + director + '</span>';
                });

                html +=
                    '       </span>' +
                    '   </div>' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Länge</span>' +
                    '       <span class="sub-content">' + bluray.length + ' min</span>' +
                    '   </div>' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Erscheinungsjahr</span>' +
                    '       <span class="sub-content">' + bluray.year + '</span>' +
                    '   </div>' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Verliehen an</span>' +
                    '       <span class="sub-content">' + bluray.lend + '</span>' +
                    '   </div>' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Notiz</span>' +
                    '       <span class="sub-content">' + bluray.note + '</span>' +
                    '   </div>' +
                    '</div>';


                $('#data-table-content-bluray').append(html);
                $('#bluray_button_' + bluray.id).on('click', function () {
                    modal_edit_bluray(bluray.id, bluray.title, bluray.actor, bluray.director, bluray.genre, bluray.year, bluray.lend, bluray.length, bluray.note);
                });
            });
        }

        $('#checkbox-header-bluray').change(function () {
            if ($(this).is(':checked')) {
                $('.checkbox-row-bluray').each(function (i) {
                    $(this).prop('checked', true);
                });
                if ($('.checkbox-row-bluray').length > 0)
                    $('#btn-delete-bluray').prop('disabled', false);
            } else {
                $('.checkbox-row-bluray').each(function (i) {
                    $(this).prop('checked', false);
                });
                if ($('.checkbox-row-bluray').length > 0)
                    $('#btn-delete-bluray').prop('disabled', true);
            }
        });

        $('.checkbox-row-bluray').change(function () {
            let allAreChecked = true;
            let atLeastOneIsChecked = false;

            $('.checkbox-row-bluray').each(function (i) {
                if (!$(this).is(':checked')) allAreChecked = false;
                else atLeastOneIsChecked = true;
            });

            $('#checkbox-header-bluray').prop('checked', allAreChecked);
            $('#btn-delete-bluray').prop('disabled', !atLeastOneIsChecked);
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

        let bluRayItems = $('.data-table-row-bluray');
        let bluRayItemsLength = bluRayItems.length;
        let bluRayPerPage = 5;

        bluRayItems.slice(bluRayPerPage).hide();

        $("#pagination-bluray").pagination({
            items: bluRayItemsLength,
            itemsOnPage: bluRayPerPage,
            displayedPages: 4,
            edges: 1,
            prevText: '<',
            nextText: '>',
            cssStyle: "light-theme",
            hrefTextPrefix: '#page-bluray-',
            onInit: function () {
                let id = window.location.toString().split('#')[1]; // #page-bluray-2
                if (id) {
                    if (id.split('-')[1] === 'bluray') {
                        let page = id.split('-')[2]; // 2
                        $("#pagination-bluray").pagination('selectPage', page);
                    }
                }
            },
            onPageClick: function (pageNumber) {
                let showFrom = bluRayPerPage * (pageNumber - 1);
                let showTo = showFrom + bluRayPerPage;
                bluRayItems.hide().slice(showFrom, showTo).show();
            }
        });

        // DVD
        $('#data-table-content-dvd').empty();

        if (dvds) {
            dvds.forEach(dvd => {
                let html = '';
                html +=
                    '<div class="data-table-row-dvd" id="row_' + dvd.id + '">' +
                    '   <div class="checkbox">' +
                    '       <label class="pure-material-checkbox">' +
                    '            <input class="checkbox-row-dvd" type="checkbox">' +
                    '            <span></span>' +
                    '        </label>' +
                    '    </div>' +
                    '    <div class="column-1">' + dvd.title + '</div>' +
                    '    <div class="column-2">';

                let genres = dvd.genre.split(',');
                genres.forEach(genreEntry => {
                    let genre = genreEntry.trim();
                    html +=
                        '<span class="actor">' + genre + '</span>';
                });

                html +=
                    '   </div>' +
                    '   <div class="column-3">' + dvd.length + ' min</div>' +
                    '   <div class="column-edit"><button id="dvd_button_' + dvd.id + '" class="btn-edit btn orange btn-edit"><i class="fas fa-edit"></i></button></div>' +
                    '   <div class="column-id hide">' + dvd.id + '</div>' +
                    '</div>' +
                    '<div class="data-table-sub-row hide" id="dvd_sub_row_' + dvd.id + '">' +
                    '   <div class="sub-row-entry">' +
                    '        <span class="sub-title">Genre</span>' +
                    '        <span class="sub-content">';

                genres.forEach(genreEntry => {
                    let genre = genreEntry.trim();
                    html +=
                        '    <span class="actor">' + genre + '</span>';
                });

                html +=
                    '       </span>' +
                    '   </div>' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Schauspieler</span>' +
                    '       <span class="sub-content">';


                let actors = dvd.actor.split(',');
                actors.forEach(actorEntry => {
                    let actor = actorEntry.trim();
                    html +=
                        '       <span class="actor">' + actor + '</span>';
                });

                html +=
                    '       </span>' +
                    '   </div>' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Regisseur</span>' +
                    '       <span class="sub-content">';

                let directors = dvd.director.split(',');
                directors.forEach(directorEntry => {
                    let director = directorEntry.trim();
                    html +=
                        '       <span class="actor">' + director + '</span>';
                });

                html +=
                    '       </span>' +
                    '   </div>' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Länge</span>' +
                    '       <span class="sub-content">' + dvd.length + ' min</span>' +
                    '   </div>' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Erscheinungsjahr</span>' +
                    '       <span class="sub-content">' + dvd.year + '</span>' +
                    '   </div>' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Verliehen an</span>' +
                    '       <span class="sub-content">' + dvd.lend + '</span>' +
                    '   </div>' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Notiz</span>' +
                    '       <span class="sub-content">' + dvd.note + '</span>' +
                    '   </div>' +
                    '</div>';


                $('#data-table-content-dvd').append(html);
                $('#dvd_button_' + dvd.id).on('click', function () {
                    modal_edit_dvd(dvd.id, dvd.title, dvd.actor, dvd.director, dvd.genre, dvd.year, dvd.lend, dvd.length, dvd.note);
                });
            });
        }

        $('#checkbox-header-dvd').change(function () {
            if ($(this).is(':checked')) {
                $('.checkbox-row-dvd').each(function (i) {
                    $(this).prop('checked', true);
                });
                if ($('.checkbox-row-dvd').length > 0)
                    $('#btn-delete-dvd').prop('disabled', false);
            } else {
                $('.checkbox-row-dvd').each(function (i) {
                    $(this).prop('checked', false);
                });
                if ($('.checkbox-row-dvd').length > 0)
                    $('#btn-delete-dvd').prop('disabled', true);
            }
        });

        $('.checkbox-row-dvd').change(function () {
            let allAreChecked = true;
            let atLeastOneIsChecked = false;

            $('.checkbox-row-dvd').each(function (i) {
                if (!$(this).is(':checked')) allAreChecked = false;
                else atLeastOneIsChecked = true;
            });

            $('#checkbox-header-dvd').prop('checked', allAreChecked);
            $('#btn-delete-dvd').prop('disabled', !atLeastOneIsChecked);
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

        let dvdItems = $('.data-table-row-dvd');
        let dvdItemsLength = dvdItems.length;
        let dvdPerPage = 5;

        dvdItems.slice(dvdPerPage).hide();

        $("#pagination-dvd").pagination({
            items: dvdItemsLength,
            itemsOnPage: dvdPerPage,
            displayedPages: 4,
            edges: 1,
            prevText: '<',
            nextText: '>',
            cssStyle: "light-theme",
            hrefTextPrefix: '#page-dvd-',
            onInit: function () {
                let id = window.location.toString().split('#')[1]; // #page-dvd-2
                if (id) {
                    if (id.split('-')[1] === 'dvd') {
                        let page = id.split('-')[2]; // 2
                        $("#pagination-dvd").pagination('selectPage', page);
                    }
                }
            },
            onPageClick: function (pageNumber) {
                let showFrom = dvdPerPage * (pageNumber - 1);
                let showTo = showFrom + dvdPerPage;
                dvdItems.hide().slice(showFrom, showTo).show();
            }
        });

        // CD
        $('#data-table-content-cd').empty();

        if (cds) {
            cds.forEach(cd => {
                let html = '';
                html +=
                    '<div class="data-table-row-cd" id="row_' + cd.id + '">' +
                    '   <div class="checkbox">' +
                    '       <label class="pure-material-checkbox">' +
                    '            <input class="checkbox-row-cd" type="checkbox">' +
                    '            <span></span>' +
                    '        </label>' +
                    '    </div>' +
                    '    <div class="column-1">' + cd.title + '</div>' +

                    '    <div class="column-2">';

                let bands = cd.band.split(',');
                bands.forEach(bandEntry => {
                    let band = bandEntry.trim();
                    html +=
                        '<span class="actor">' + band + '</span>';
                });

                html +=
                    '   </div>' +

                    '    <div class="column-3">';

                let genres = cd.genre.split(',');
                genres.forEach(genreEntry => {
                    let genre = genreEntry.trim();
                    html +=
                        '<span class="actor">' + genre + '</span>';
                });

                html +=
                    '   </div>' +


                    '   <div class="column-edit"><button id="cd_button_' + cd.id + '" class="btn-edit btn orange btn-edit"><i class="fas fa-edit"></i></button></div>' +
                    '   <div class="column-id hide">' + cd.id + '</div>' +
                    '</div>' +
                    '<div class="data-table-sub-row hide" id="cd_sub_row_' + cd.id + '">' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Schauspieler</span>' +
                    '       <span class="sub-content">';

                bands.forEach(bandEntry => {
                    let band = bandEntry.trim();
                    html +=
                        '       <span class="actor">' + band + '</span>';
                });

                html +=
                    '       </span>' +
                    '   </div>' +


                    '   <div class="sub-row-entry">' +
                    '        <span class="sub-title">Genre</span>' +
                    '        <span class="sub-content">';

                genres.forEach(genreEntry => {
                    let genre = genreEntry.trim();
                    html +=
                        '    <span class="actor">' + genre + '</span>';
                });

                html +=
                    '       </span>' +
                    '   </div>' +


                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Länge</span>' +
                    '       <span class="sub-content">' + cd.length + ' min</span>' +
                    '   </div>' +

                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Erscheinungsjahr</span>' +
                    '       <span class="sub-content">' + cd.year + '</span>' +
                    '   </div>' +

                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Verliehen an</span>' +
                    '       <span class="sub-content">' + cd.lend + '</span>' +
                    '   </div>' +

                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Notiz</span>' +
                    '       <span class="sub-content">' + cd.note + '</span>' +
                    '   </div>' +
                    '</div>';


                $('#data-table-content-cd').append(html);
                $('#cd_button_' + cd.id).on('click', function () {
                    modal_edit_cd(cd.id, cd.title, cd.band, cd.genre, cd.year, cd.lend, cd.length, cd.note);
                });
            });
        }

        $('#checkbox-header-cd').change(function () {
            if ($(this).is(':checked')) {
                $('.checkbox-row-cd').each(function (i) {
                    $(this).prop('checked', true);
                });
                if ($('.checkbox-row-cd').length > 0)
                    $('#btn-delete-cd').prop('disabled', false);
            } else {
                $('.checkbox-row-cd').each(function (i) {
                    $(this).prop('checked', false);
                });
                if ($('.checkbox-row-cd').length > 0)
                    $('#btn-delete-cd').prop('disabled', true);
            }
        });

        $('.checkbox-row-cd').change(function () {
            let allAreChecked = true;
            let atLeastOneIsChecked = false;

            $('.checkbox-row-cd').each(function (i) {
                if (!$(this).is(':checked')) allAreChecked = false;
                else atLeastOneIsChecked = true;
            });

            $('#checkbox-header-cd').prop('checked', allAreChecked);
            $('#btn-delete-cd').prop('disabled', !atLeastOneIsChecked);
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

        let cdItems = $('.data-table-row-cd');
        let cdItemsLength = cdItems.length;
        let cdPerPage = 5;

        cdItems.slice(cdPerPage).hide();

        $("#pagination-cd").pagination({
            items: cdItemsLength,
            itemsOnPage: cdPerPage,
            displayedPages: 4,
            edges: 1,
            prevText: '<',
            nextText: '>',
            cssStyle: "light-theme",
            hrefTextPrefix: '#page-cd-',
            onInit: function () {
                let id = window.location.toString().split('#')[1]; // #page-cd-2
                if (id) {
                    if (id.split('-')[1] === 'cd') {
                        let page = id.split('-')[2]; // 2
                        $("#pagination-cd").pagination('selectPage', page);
                    }
                }
            },
            onPageClick: function (pageNumber) {
                let showFrom = cdPerPage * (pageNumber - 1);
                let showTo = showFrom + cdPerPage;
                cdItems.hide().slice(showFrom, showTo).show();
            }
        });

        // Vinyl
        $('#data-table-content-vinyl').empty();

        if (vinyls) {
            vinyls.forEach(vinyl => {
                let html = '';
                html +=
                    '<div class="data-table-row-vinyl" id="row_' + vinyl.id + '">' +
                    '   <div class="checkbox">' +
                    '       <label class="pure-material-checkbox">' +
                    '            <input class="checkbox-row-vinyl" type="checkbox">' +
                    '            <span></span>' +
                    '        </label>' +
                    '    </div>' +
                    '    <div class="column-1">' + vinyl.title + '</div>' +

                    '    <div class="column-2">';

                let bands = vinyl.band.split(',');
                bands.forEach(bandEntry => {
                    let band = bandEntry.trim();
                    html +=
                        '<span class="actor">' + band + '</span>';
                });

                html +=
                    '   </div>' +

                    '    <div class="column-3">';

                let genres = vinyl.genre.split(',');
                genres.forEach(genreEntry => {
                    let genre = genreEntry.trim();
                    html +=
                        '<span class="actor">' + genre + '</span>';
                });

                html +=
                    '   </div>' +


                    '   <div class="column-edit"><button id="vinyl_button_' + vinyl.id + '" class="btn-edit btn orange btn-edit"><i class="fas fa-edit"></i></button></div>' +
                    '   <div class="column-id hide">' + vinyl.id + '</div>' +
                    '</div>' +
                    '<div class="data-table-sub-row hide" id="vinyl_sub_row_' + vinyl.id + '">' +
                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Schauspieler</span>' +
                    '       <span class="sub-content">';

                bands.forEach(bandEntry => {
                    let band = bandEntry.trim();
                    html +=
                        '       <span class="actor">' + band + '</span>';
                });

                html +=
                    '       </span>' +
                    '   </div>' +


                    '   <div class="sub-row-entry">' +
                    '        <span class="sub-title">Genre</span>' +
                    '        <span class="sub-content">';

                genres.forEach(genreEntry => {
                    let genre = genreEntry.trim();
                    html +=
                        '    <span class="actor">' + genre + '</span>';
                });

                html +=
                    '       </span>' +
                    '   </div>' +


                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Länge</span>' +
                    '       <span class="sub-content">' + vinyl.length + ' min</span>' +
                    '   </div>' +


                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Typ</span>' +
                    '       <span class="sub-content">' + vinyl.type + '</span>' +
                    '   </div>' +

                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Erscheinungsjahr</span>' +
                    '       <span class="sub-content">' + vinyl.year + '</span>' +
                    '   </div>' +

                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Verliehen an</span>' +
                    '       <span class="sub-content">' + vinyl.lend + '</span>' +
                    '   </div>' +

                    '   <div class="sub-row-entry">' +
                    '       <span class="sub-title">Notiz</span>' +
                    '       <span class="sub-content">' + vinyl.note + '</span>' +
                    '   </div>' +
                    '</div>';


                $('#data-table-content-vinyl').append(html);
                $('#vinyl_button_' + vinyl.id).on('click', function () {
                    modal_edit_vinyl(vinyl.id, vinyl.title, vinyl.band, vinyl.genre, vinyl.type, vinyl.year, vinyl.lend, vinyl.length, vinyl.note);
                });
            });
        }

        $('#checkbox-header-vinyl').change(function () {
            if ($(this).is(':checked')) {
                $('.checkbox-row-vinyl').each(function (i) {
                    $(this).prop('checked', true);
                });
                if ($('.checkbox-row-vinyl').length > 0)
                    $('#btn-delete-vinyl').prop('disabled', false);
            } else {
                $('.checkbox-row-vinyl').each(function (i) {
                    $(this).prop('checked', false);
                });
                if ($('.checkbox-row-vinyl').length > 0)
                    $('#btn-delete-vinyl').prop('disabled', true);
            }
        });

        $('.checkbox-row-vinyl').change(function () {
            let allAreChecked = true;
            let atLeastOneIsChecked = false;

            $('.checkbox-row-vinyl').each(function (i) {
                if (!$(this).is(':checked')) allAreChecked = false;
                else atLeastOneIsChecked = true;
            });

            $('#checkbox-header-vinyl').prop('checked', allAreChecked);
            $('#btn-delete-vinyl').prop('disabled', !atLeastOneIsChecked);
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

        let vinylItems = $('.data-table-row-vinyl');
        let vinylItemsLength = vinylItems.length;
        let vinylPerPage = 5;

        vinylItems.slice(vinylPerPage).hide();

        $("#pagination-vinyl").pagination({
            items: vinylItemsLength,
            itemsOnPage: vinylPerPage,
            displayedPages: 4,
            edges: 1,
            prevText: '<',
            nextText: '>',
            cssStyle: "light-theme",
            hrefTextPrefix: '#page-vinyl-',
            onInit: function () {
                let id = window.location.toString().split('#')[1]; // #page-vinyl-2
                if (id) {
                    if (id.split('-')[1] === 'vinyl') {
                        let page = id.split('-')[2]; // 2
                        $("#pagination-vinyl").pagination('selectPage', page);
                    }
                }
            },
            onPageClick: function (pageNumber) {
                let showFrom = vinylPerPage * (pageNumber - 1);
                let showTo = showFrom + vinylPerPage;
                vinylItems.hide().slice(showFrom, showTo).show();
            }
        });
    }).catch(function (err) {
        console.error(err);
    });
});

// Excel Download
function downloadExcel() {
    $.ajax({
        type: 'GET',
        url: '/submit/all-excel',
        xhrFields: { responseType: "blob" },
        data: {},
        success: function (data) {
            let blob = new Blob([data], { type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
            saveAs(blob, "VinylBank.xlsx");
        },
        error: function (result) {
            console.log(result);
            alert('Ein Fehler ist aufgetreten. Bitte versuche es erneut oder komme später wieder.');
        }
    });
}

// PDF Download
function downloadPdf() {
    $.ajax({
        type: 'GET',
        url: '/submit/all-pdf',
        dataType: 'json',
        data: {},
        success: function (data) {
            // BluRay
            let dataBluray = data.bluray;

            let docBluray = new jsPDF('landscape')
            docBluray.autoTable({
                head: [dataBluray.head],
                body: dataBluray.body
            });

            // DVD
            let dataDvd = data.dvd;

            let docDvd = new jsPDF('landscape')
            docDvd.autoTable({
                head: [dataDvd.head],
                body: dataDvd.body
            });

            // CD
            let dataCd = data.cd;

            let docCd = new jsPDF('landscape')
            docCd.autoTable({
                head: [dataCd.head],
                body: dataCd.body
            });

            // Vinyl
            let dataViynl = data.vinyl;

            let docVinyl = new jsPDF('landscape')
            docVinyl.autoTable({
                head: [dataViynl.head],
                body: dataViynl.body
            });

            let zip = new JSZip();

            zip.file("BluRays.pdf", docBluray.output('blob'));
            zip.file("DVDs.pdf", docDvd.output('blob'));
            zip.file("CDs.pdf", docCd.output('blob'));
            zip.file("Vinyls.pdf", docVinyl.output('blob'));

            zip.generateAsync({ type: 'blob' }).then(function (content) {
                saveAs(content, 'VinylBank.zip');
            });
        },
        error: function (result) {
            console.log(result);
            alert('Ein Fehler ist aufgetreten. Bitte versuche es erneut oder komme später wieder.');
        }
    });
}
