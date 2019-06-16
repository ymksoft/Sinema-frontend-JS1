const openedFilms = {};

function onAddCommentClick( filmName ) {
    const authorValue = document.getElementById("author-"+filmName).value;
    const commentValue = document.getElementById("comment-"+filmName).value;
    const film = getFilmByName( filmName );
    film.addComment( commentValue, authorValue, 5);
    openedFilms[film.name] = false;
    onCategoryChoice( film.category );
}

function renderCommentForm( film ) {
    const content = `<div class="from-title">Добавьте отзыв к фильму ${film.name}</div>
    <div class="from-body">
    <input id="author-${film.name}" class="form-author" placeholder="Ваше имя">
    <input id="comment-${film.name}" class="form-comment" placeholder="Ваш отзыв">
    <button onclick="onAddCommentClick(\'${film.name}\')">Отправить</button>
    </div>`;
    const form = document.createElement('div');
    form.classList.add('comment-form');
    form.innerHTML = content;

    form.addEventListener( 'click' , function( event ) {
        event.stopPropagation();
        form.classList.add('chosen');
    });

    return form;
}

function renderFilmCard( film, newEl ) {
    const comments = getFilmsComments( film.name );
    let s = "";
    comments.forEach( c => {
        s += `<div class="film-comment"><span class="comment-author">${c.author}</span> : ${c.text}</div>`
    });
    newEl.innerHTML += `<div class="film-comments">${s}</div>`;

    const addCommentButton = document.createElement('button');
    addCommentButton.innerText = 'Добавить отзыв';
    addCommentButton.addEventListener('click', function( event ) {
        event.stopPropagation();
        const commentForm = renderCommentForm( film );
        newEl.appendChild( commentForm );
        newEl.removeChild( addCommentButton );
    });
    newEl.appendChild( addCommentButton );

}

function onFilmClick( film, newEl ) {
    if( openedFilms.hasOwnProperty( film.name ) && openedFilms[film.name] ) {
        newEl.innerHTML = renderFilmName( film );
        openedFilms[film.name] = false;
    } else {
        renderFilmCard( film, newEl );
        openedFilms[film.name] = true;
    }
}

function renderFilmName( film ) {
    return `<div class="film-name">${film.name}</div>
    <div>
    <p>Бюджет ${film.budget} днег</p>
    <p>Рейтинг экспертов ${film.expertStars}</p>
    <p>Рейтинг пользователей ${film.getAverageStars()}</p>
    <div>`;
}

function renderFilm( film ) {
    const newEl = document.createElement('div');
    newEl.classList.add('film');
    newEl.innerHTML = renderFilmName( film );

    newEl.addEventListener( 'click' , function() {
        onFilmClick( film, newEl );
    });

    document.querySelector('.films').appendChild(newEl);

}
function onCategoryChoice( cat ) {
    document.querySelector('.films').innerHTML = '';
    const films = getFilmsByCategory( cat );
    for( let film of films ) {
        renderFilm( film );
    }
}

function renderCategories() {
    for( let category of categories ) {
        const newEl = document.createElement('div');
        newEl.classList.add( 'category' );
        newEl.innerText = category;
        newEl.addEventListener( 'click', function() {
            onCategoryChoice( category );
        });
        document.querySelector('.categories').appendChild( newEl );
    }
}

function setupView() {
    renderCategories();
    onCategoryChoice('Юмор');
}

document.addEventListener('DOMContentLoaded', setupView);

