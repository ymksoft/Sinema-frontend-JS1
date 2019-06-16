const categories = ['Юмор','Хоррор','Фантастика','Драма','Триллер',];
const films = [];

class Comment {
    constructor( text, author, stars ) {
        this.text = text;
        this.author = author;
        this.stars = stars;
    }
}

class Film {
    constructor( name, cat ) {
        this.name = name;
        this.category = categories[ cat ];
        this.budget = 0;
        this.expertStars = 3;
        this.comments = [];
    }

    addComment( text, author, stars ) {
        this.comments.push( new Comment( text, author, stars ) );
    }

    getAverageStars() {
        let sumStars = this.comments.reduce( function(sum, current) {
            return sum + current.stars;
        }, 0);
        return ( this.comments.length > 0 ) ? sumStars / this.comments.length : 0;
    }
}

films.push( new Film('Титаник', 0 ) );
films[0].addComment('Милый фильм','Петя',4);
films[0].addComment('Почти Милый фильм','Вася',3);
films.push( new Film('Один дома', 0 ) );
films[1].addComment('Очень смешной фильм','Дуся',5);
films[1].addComment('совсем не смешной фильм','Юля',1);

films.push( new Film('Ужас', 1 ) );
films[2].addComment('Ужастный фильм','Игорь',1);

films.push( new Film('Гарри потер', 2 ) );
films.push( new Film('Грусный фильм 1', 3 ) );
films.push( new Film('Грусный фильм 2', 3 ) );
films.push( new Film('Стрелялка', 4 ) );

function getFilmsByCategory( cat ) {
    return films.filter( item => item.category === cat );
}

function getFilmByName( filmName ) {
    return films.filter( film => film.name === filmName )[0];
}

function getFilmsComments( filmName ) {
    return getFilmByName( filmName ).comments;
}

//console.log( 'Avarages 1:', films[1].getAverageStars() );
//console.log( getFilmsByCategory('Хоррор') );
//console.log( getFilmsComments('Один дома') );