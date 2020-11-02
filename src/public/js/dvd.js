// Create
$('#btn-create').on('click', function (e) {
    e.preventDefault();

    const html = `
        <div id="modal-create" class="modal">
            <div class="modal-inner">
        	    <form action="/submit/dvd-create" id="form-create">
                    <div class="modal-header"><img class="medium-logo" src="/img/dvd.svg" alt="DVD Logo"> DVD</div>
        	        <div class="modal-content">

        			    <div class="form-group">
        				    <label for="title">Titel</label>
        				    <input type="text" name="title" id="title" placeholder="z. B. James Bond 007: Skyfall" required>
        			    </div>

        			    <div class="form-group">
        				    <label for="actor">Schauspieler</label>
        				    <textarea name="actor" id="actor" placeholder="z. B. Daniel Craig, Javier Bardem, Ralph Fiennes, Naomie Harris, Bérénice Marlohe, Albert Finney, Judi Dench"></textarea>
        			    </div>

        			    <div class="form-group">
        				    <label for="director">Regisseur</label>
        				    <textarea name="director" id="director" placeholder="z. B. Sam Mendes"></textarea>
        			    </div>

        			    <div class="form-group">
        				    <label for="genre">Genre</label>
        				    <input type="text" name="genre" id="genre" placeholder="z. B. Action, Adventure, Crime Fiction, Spy, Thriller">
        			    </div>

        			    <div class="form-group">
        				    <label for="year">Erscheinungsjahr</label>
        				    <input type="number" name="year" id="year" placeholder="z. B. 2012">
        			    </div>

        			    <div class="form-group">
        				    <label for="lend">Verliehen an</label>
        				    <input type="text" name="lend" id="lend" placeholder="z. B. Max Mustermann am 31.12.2019">
        			    </div>

        			    <div class="form-group">
        				    <label for="length">Länge (min)</label>
        				    <input type="number" name="length" id="length" placeholder="z. B. 143">
        			    </div>

        			    <div class="form-group">
        				    <label for="note">Notiz</label>
        				    <textarea name="note" id="note" placeholder="z. B. Geschenk von Erika Mustermann"></textarea>
        			    </div>

                    </div>
                    <div class="modal-footer">
                        <div class="text-right">
                            <button id="btn-create-cancel" class="btn red"><i class="fas fa-times-circle"></i> Abbrechen</button>
                            <button id="btn-create-submit" class="btn green" type="submit"><i class="fas fa-save"></i> Sichern</button>
                        </div>
                    </div>
        		</form>
        	</div>
        </div>
    `;

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
                alert('Eintrag erstellt!');
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Eintrag konnte nicht erstellt werden.');
            }
        });
    });
});

// Read
$('#search').on('keyup', function (e) {
    e.preventDefault();

    $.ajax({
        global: false,
        type: 'POST',
        url: '/submit/dvd-read',
        dataType: 'html',
        data: {
            searchTerm: $('#search').val()
        }
    }).then(function (response) {
        $('#data-table-content').empty();

        const dvds = JSON.parse(response);

        if (dvds) {
            dvds.forEach(dvd => {
                let html = `
                    <div class="data-table-row" id="row_${dvd.id}">
                        <div class="checkbox">
                            <label class="pure-material-checkbox">
                                <input class="checkbox-row" type="checkbox">
                                <span></span>
                            </label>
                        </div>
                        <div class="column-1">${dvd.title}</div>
                        <div class="column-2">
                `;

                const genres = dvd.genre.split(',');
                genres.forEach(genreEntry => {
                    const genre = genreEntry.trim();
                    html += `
                            <span class="actor">${genre}</span>
                    `;
                });

                html += `
                        </div>
                        <div class="column-3">${dvd.length} min</div>
                        <div class="column-edit"><button id="button_${dvd.id}" class="btn-edit btn orange btn-edit"><i class="fas fa-edit"></i></button></div>
                        <div class="column-id hide">${dvd.id}</div>
                    </div>
                    <div class="data-table-sub-row hide" id="sub_row_${dvd.id}">
                        <div class="sub-row-entry">
                            <span class="sub-title">Genre</span>
                            <span class="sub-content">
                `;

                genres.forEach(genreEntry => {
                    const genre = genreEntry.trim();
                    html += `
                                <span class="actor">${genre}</span>
                    `;
                });

                html += `
                            </span>
                        </div>
                        <div class="sub-row-entry">
                            <span class="sub-title">Schauspieler</span>
                            <span class="sub-content">';
                `;

                const actors = dvd.actor.split(',');
                actors.forEach(actorEntry => {
                    const actor = actorEntry.trim();
                    html += `
                                <span class="actor">${actor}</span>
                    `;
                });

                html += `
                            </span>
                        </div>
                        <div class="sub-row-entry">
                            <span class="sub-title">Regisseur</span>
                            <span class="sub-content">
                `

                const directors = dvd.director.split(',');
                directors.forEach(directorEntry => {
                    const director = directorEntry.trim();
                    html += `
                                <span class="actor">${director}</span>
                    `;
                });

                html += `
                            </span>
                        </div>
                        <div class="sub-row-entry">
                            <span class="sub-title">Länge</span>
                            <span class="sub-content">${dvd.length} min</span>
                        </div>
                        <div class="sub-row-entry">
                            <span class="sub-title">Erscheinungsjahr</span>
                            <span class="sub-content">${dvd.year}</span>
                        </div>
                        <div class="sub-row-entry">
                            <span class="sub-title">Verliehen an</span>
                            <span class="sub-content">${dvd.lend}</span>
                        </div>
                        <div class="sub-row-entry">
                            <span class="sub-title">Notiz</span>
                            <span class="sub-content">${dvd.note}</span>
                        </div>
                    </div>
                `;


                $('#data-table-content').append(html);
                $(`#button_${dvd.id}`).on('click', function () {
                    modal_edit(dvd.id, dvd.title, dvd.actor, dvd.director, dvd.genre, dvd.year, dvd.lend, dvd.length, dvd.note);
                });
            });
        }

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

        // Row sub content
        $('.data-table-row').on('click', function () {
            const id = $(this).attr('id');

            const subRow = $(`#sub_${id}`);

            if (subRow.hasClass('hide')) {
                $('.data-table-sub-row').each(function (i) {
                    $(this).addClass('hide');
                });
                subRow.removeClass('hide');
            } else subRow.addClass('hide');
        });

        // Pagination
        const items = $('.data-table-row');
        const itemsLength = items.length;
        const perPage = 15;

        items.slice(perPage).hide();

        $('#pagination').pagination({
            items: itemsLength,
            itemsOnPage: perPage,
            displayedPages: 4,
            edges: 1,
            prevText: '<',
            nextText: '>',
            cssStyle: 'light-theme',
            onInit: function () {
                const id = window.location.toString().split('#')[1]; // #page-2
                if (id) {
                    const page = id.split('-')[1]; // 2
                    $('#pagination').pagination('selectPage', page);
                }
            },
            onPageClick: function (pageNumber) {
                const showFrom = perPage * (pageNumber - 1);
                const showTo = showFrom + perPage;
                items.hide().slice(showFrom, showTo).show();
            }
        });
    }).catch(function (err) {
        console.error(err);
    });
});

// Update
function modal_edit(dvdId, title, actor, director, genre, year, lend, length, note) {
    let html = `
        <div id="modal-edit" class="modal">
         	<div class="modal-inner">
         		<form action="/submit/dvd-update" id="form-edit">
                    <div class="modal-header"><img class="medium-logo" src="/img/dvd.svg" alt="DVD Logo"> DVD: ${title}</div>
         	        <div class="modal-content">
         			    <div class="form-group">
         				    <label for="title">Titel</label>
         				    <input type="text" name="title" id="title" placeholder="z. B. James Bond 007: Skyfall" value="${title}" required>
         			    </div>

         			    <div class="form-group">
         				    <label for="actor">Schauspieler</label>
                            <textarea name="actor" id="actor" placeholder="z. B. Daniel Craig, Javier Bardem, Ralph Fiennes, Naomie Harris, Bérénice Marlohe, Albert Finney, Judi Dench">${actor}</textarea>
         			    </div>

         			    <div class="form-group">
         				    <label for="director">Regisseur</label>
                            <textarea name="director" id="director" placeholder="z. B. Sam Mendes">${director}</textarea>
         			    </div>

         			    <div class="form-group">
         				    <label for="genre">Genre</label>
         				    <input type="text" name="genre" id="genre" placeholder="z. B. Action, Adventure, Crime Fiction, Spy, Thriller" value="${genre}">
         			    </div>

         			    <div class="form-group">
         				    <label for="year">Erscheinungsjahr</label>
         				    <input type="number" name="year" id="year" placeholder="z. B. 2012" value="${year}">
         			    </div>

         			    <div class="form-group">
         				    <label for="lend">Verliehen an</label>
         				    <input type="text" name="lend" id="lend" placeholder="z. B. Max Mustermann am 31.12.2019" value="${lend}">
         			    </div>

         			    <div class="form-group">
         				    <label for="length">Länge (min)</label>
         				    <input type="number" name="length" id="length" placeholder="z. B. 143" value="${length}">
         			    </div>

         			    <div class="form-group">
         				    <label for="note">Notiz</label>
                            <textarea name="note" id="note" placeholder="z. B. Geschenk von Erika Mustermann">${note}</textarea>
         			    </div>

         	        </div>
                    <div class="modal-footer">
                        <div class="text-right">
                            <button id="btn-edit-cancel" class="btn red"><i class="fas fa-times-circle"></i> Abbrechen</button>
                            <button id="btn-edit-submit" class="btn green" type="submit"><i class="fas fa-save"></i> Sichern</button>
                        </div>
                    </div>
         	    </form>
            </div>
        </div>
    `;

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
                alert('Eintrag aktualisiert!');
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Eintrag konnte nicht aktualisiert werden.');
            }
        });
    });
}

// Delete
$('#btn-delete').on('click', function () {
    if (confirm('Bist Du sicher, dass Du die selektierten Einträge löschen willst?')) {
        const idsToDelete = [];
        $('.data-table-row').each(function (i) {
            if ($(this).find('.checkbox-row').is(':checked'))
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
                alert('Einträge gelöscht!');
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Einträge konnten nicht gelöscht werden.');
            }
        });
    }
});

// Excel Download
function downloadExcel() {
    $.ajax({
        type: 'GET',
        url: '/submit/dvd-excel',
        xhrFields: { responseType: "blob" },
        data: {},
        success: function (data) {
            const blob = new Blob([data], { type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
            saveAs(blob, 'DVDs.xlsx');
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
        url: '/submit/dvd-pdf',
        dataType: 'json',
        data: {},
        success: function (data) {
            const doc = new jsPDF('landscape')
            doc.autoTable({
                head: [data.head],
                body: data.body
            });

            doc.save('DVDs.pdf')
        },
        error: function (result) {
            console.log(result);
            alert('Ein Fehler ist aufgetreten. Bitte versuche es erneut oder komme später wieder.');
        }
    });
}
