// Create
$('#btn-create').on('click', function (e) {
    e.preventDefault();

    const html = `
        <div id="modal-create" class="modal">
            <div class="modal-inner">
                <form action="/submit/vinyl-create" id="form-create">
                    <div class="modal-header"><img class="medium-logo" src="/img/vinyl.svg" alt="Vinyl Logo"> Vinyl</div>
                    <div class="modal-content">

                        <div class="form-group">
                            <label for="title">Titel</label>
                            <input type="text" name="title" id="title" placeholder="z. B. Powerage" required>
                        </div>

                        <div class="form-group">
                            <label for="band">Künstler/Band</label>
                            <textarea name="band" id="band" placeholder="z. B. AC/DC"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="genre">Genre</label>
                            <input type="text" name="genre" id="genre" placeholder="z. B. Hard Rock, Blues Rock">
                        </div>

                        <div class="form-group">
                            <label for="length">Länge (min)</label>
                            <input type="number" name="length" id="length" placeholder="z. B. 40">
                        </div>

                        <div class="form-group">
                            <label for="type">Typ</label>
                            <input type="text" name="type" id="type" placeholder="z. B. LP">
                        </div>

                        <div class="form-group">
                            <label for="year">Erscheinungsjahr</label>
                            <input type="number" name="year" id="year" placeholder="z. B. 1978">
                        </div>

                        <div class="form-group">
                            <label for="lend">Verliehen an</label>
                            <input type="text" name="lend" id="lend" placeholder="z. B. Max Mustermann am 31.12.2019">
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
        url: '/submit/vinyl-read',
        dataType: 'html',
        data: {
            searchTerm: $('#search').val()
        }
    }).then(function (response) {
        $('#data-table-content').empty();

        const vinyls = JSON.parse(response);

        if (vinyls) {
            vinyls.forEach(vinyl => {
                let html = `
                    <div class="data-table-row" id="row_${vinyl.id}">
                        <div class="checkbox">
                            <label class="pure-material-checkbox">
                                <input class="checkbox-row" type="checkbox">
                                <span></span>
                            </label>
                        </div>
                        <div class="column-1">${vinyl.title}</div>

                        <div class="column-2">
                `;

                const bands = vinyl.band.split(',');
                bands.forEach(bandEntry => {
                    const band = bandEntry.trim();
                    html += `
                            <span class="actor">${band}</span>
                    `;
                });

                html += `
                        </div>

                        <div class="column-3">
                `;

                const genres = vinyl.genre.split(',');
                genres.forEach(genreEntry => {
                    const genre = genreEntry.trim();
                    html += `
                            <span class="actor">${genre}</span>
                    `;
                });

                html += `
                        </div>

                        <div class="column-edit"><button id="button_${vinyl.id}" class="btn-edit btn orange btn-edit"><i class="fas fa-edit"></i></button></div>
                        <div class="column-id hide">${vinyl.id}</div>
                    </div>
                    <div class="data-table-sub-row hide" id="sub_row_${vinyl.id}">
                        <div class="sub-row-entry">
                            <span class="sub-title">Schauspieler</span>
                            <span class="sub-content">
                `;

                bands.forEach(bandEntry => {
                    const band = bandEntry.trim();
                    html += `
                                <span class="actor">${band}</span>
                    `;
                });

                html += `
                            </span>
                        </div>

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
                            <span class="sub-title">Länge</span>
                            <span class="sub-content">${vinyl.length} min</span>
                        </div>

                        <div class="sub-row-entry">
                            <span class="sub-title">Typ</span>
                            <span class="sub-content">${vinyl.type}</span>
                        </div>

                        <div class="sub-row-entry">
                            <span class="sub-title">Erscheinungsjahr</span>
                            <span class="sub-content">${vinyl.year}</span>
                        </div>

                        <div class="sub-row-entry">
                            <span class="sub-title">Verliehen an</span>
                            <span class="sub-content">${vinyl.lend}</span>
                        </div>

                        <div class="sub-row-entry">
                            <span class="sub-title">Notiz</span>
                            <span class="sub-content">${vinyl.note}</span>
                        </div>
                    </div>
                `;


                $('#data-table-content').append(html);
                $(`#button_${vinyl.id}`).on('click', function () {
                    modal_edit(vinyl.id, vinyl.title, vinyl.band, vinyl.genre, vinyl.type, vinyl.year, vinyl.lend, vinyl.length, vinyl.note);
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
function modal_edit(vinylId, title, band, genre, type, year, lend, length, note) {
    band = band.replace(/~n/g, '\n')
    note = note.replace(/~n/g, '\n')

    let html = `
        <div id="modal-edit" class="modal">
        	<div class="modal-inner">
        		<form action="/submit/vinyl-update" id="form-edit">
                    <div class="modal-header"><img class="medium-logo" src="/img/vinyl.svg" alt="Vinyl Logo"> Vinyl: ${title}</div>
         	        <div class="modal-content">
         			    <div class="form-group">
         				    <label for="title">Titel</label>
         				    <input type="text" name="title" id="title" placeholder="z. B. Powerage" value="${title}" required>
         			    </div>

         			    <div class="form-group">
         				    <label for="band">Künstler/Band</label>
                            <textarea name="band" id="band" placeholder="z. B. AC/DC">${band}</textarea>
         			    </div>

         			    <div class="form-group">
         				    <label for="genre">Genre</label>
         				    <input type="text" name="genre" id="genre" placeholder="z. B. Hard Rock, Blues Rock" value="${genre}">
         			    </div>

         			    <div class="form-group">
         				    <label for="length">Länge (min)</label>
         				    <input type="number" name="length" id="length" placeholder="z. B. 40" value="${length}">
         			    </div>

         			    <div class="form-group">
         				    <label for="type">Typ</label>
         				    <input type="text" name="type" id="type" placeholder="z. B. LP" value="${type}">
         			    </div>

         			    <div class="form-group">
         				    <label for="year">Erscheinungsjahr</label>
         				    <input type="number" name="year" id="year" placeholder="z. B. 1978" value="${year}">
         			    </div>

         			    <div class="form-group">
         				    <label for="lend">Verliehen an</label>
         				    <input type="text" name="lend" id="lend" placeholder="z. B. Max Mustermann am 31.12.2019" value="${lend}">
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
            url: '/submit/vinyl-delete',
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
        url: '/submit/vinyl-excel',
        xhrFields: { responseType: "blob" },
        data: {},
        success: function (data) {
            const blob = new Blob([data], { type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
            saveAs(blob, 'Vinyls.xlsx');
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
        url: '/submit/vinyl-pdf',
        dataType: 'json',
        data: {},
        success: function (data) {
            const doc = new jsPDF('landscape')
            doc.autoTable({
                head: [data.head],
                body: data.body
            });

            doc.save('Vinyls.pdf')
        },
        error: function (result) {
            console.log(result);
            alert('Ein Fehler ist aufgetreten. Bitte versuche es erneut oder komme später wieder.');
        }
    });
}
