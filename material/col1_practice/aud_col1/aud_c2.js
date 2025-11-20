
class Movie{
    constructor(title,genre, duration,capacity,ticketPrice,lastShowDate) {
        this.title = title;
        this.genre = genre
        this.id = title.substring(0,3).toUpperCase()
        // slice - doesn't return and changes in place
        // splice - returns a changed array
        this.duration = duration
        this.capacity = capacity
        this.lastShowDate = new Date(lastShowDate)
        this.isActive = true
    }

    toString(){
        return `Movie ${this.id} titled \"${this.title}\" with a duration of ${this.duration} minutes, a capacity of ${this.capacity} seats, and a ticket price of ${this.ticketPrice} $.`
    }
}

class InternationalMovie extends Movie{

    constructor(title, genre, duration, capacity, ticketPrice, lastShowDate,requiresSubtitles,isRestricted) {
        super(title, genre, duration, capacity, ticketPrice, lastShowDate);
        this.requiresSubtitles = requiresSubtitles
        this.isRestricted = isRestricted
    }

    getRestrictionLevel(){
        if(this.requiresSubtitles){
            if(this.isRestricted) return "Very High"
            if(this.capacity > 100) return "High"
            else return "Moderate"
        }
        else {
            if(this.capacity > 100) return "Moderate"
            if(this.duration > 150) return "Low"
            else return "Very Low"
        }
    }

    toString() {
        return `Movie ${this.id} titled \"${this.title}\" is an international movie which ${this.requiresSubtitles ? "requires" : "doesn't require"} subtitles and ${this.isRestricted ? "is" : "isn't"} restricted.`
    }

}

class MovieTheater{

    constructor() {
        this.movies = []
    }

    addMovie(movie){
        this.movies.push(movie)
    }

    updateMovies(){
        this.movies = this.movies.map(movie => {
            let dayDiff = (new Date() - movie.lastShowDate) / (1000 * 60 * 60 * 24);
            if(movie instanceof InternationalMovie){
                if(dayDiff > 28){
                    movie.isActive = false
                    console.log(`International ${movie.id} has ${movie.getRestrictionLevel()} restriction level`);
                }
            }else {
                if(dayDiff > 7){
                    movie.isActive = false
                }
            }


            return movie
        })

    }

    internationalPercentage(genre){
        let allMovies = this.movies.filter(movie => movie.genre === genre && movie.isActive);
        let internationalMovies = this.movies.filter(movie => movie.genre === genre && movie instanceof InternationalMovie && movie.isActive);

        if(allMovies.length === 0 || internationalMovies.length === 0) return 0
        return (internationalMovies.length / allMovies.length) * 100
    }

    printMovies(){
        this.movies
            .sort((m1,m2) => m2.duration - m1.duration)
            .forEach(movie => console.log(movie.toString()))
    }
}