// // createStringBuilder , i treba da vraka object,
// function StringBuilder(string){
//     currentString= string
//     return {
//         getValue:function() {
//             return currentString
//         }
//     }
// }
// // imashe i remove function i append

/**
 * createStringBuilder function that will hold an initial empty string and returns an
 * object that will have functions to remove, append and getValue
* */


function createStringBuilder(){
    let str = ""

    return {
        getValue: () => str,
        append: (strToAppend) => {
            str += strToAppend;
            return str;
        },
        remove: (strToRemove) => {
            str = str.replace(strToRemove,"")
            return str
        }

    }

}

let sb = createStringBuilder();

sb.append("1")
sb.append("2")
sb.append("3")
sb.append("4")

console.log(sb.getValue())

sb.remove("3");

console.log(sb.getValue())

// console.log(sb)





// vtorata so objecti od classa movies edna funkcia(movies, genre),
// trebashe da gi sortirash po rating i potoa da gi printash movie titles ako ima
// od toj genre so highest rating
/**
 * Sort by rating function, and then print titles of the movies that have the given genre
 */

class Movie{

    constructor(title, genre,rating) {
        this.title = title;
        this.genre = genre;
        this.rating = rating;
    }
}

function sortAndPrint(movies,genre){

    let sorted = [...movies]
    sorted.sort((m1,m2) => m2.rating - m1.rating)
    let slicedSorted = sorted.slice(0,5);

    // console.log(sorted)
    // console.log(slicedSorted)

    let filteredMovies = slicedSorted.filter(m => m.genre === genre);

    let titles = filteredMovies.map(m => m.title);

    console.log(titles)

    let concatTitle = filteredMovies.reduce((prev,curr) => prev+=curr.title,"")
    let joinTitle = filteredMovies.map(m => m.title).join("_=_");

    console.log(concatTitle)
    console.log(joinTitle)

}

movies = []
for (let i=0;i<20;i++) {
    let movie = new Movie(`title${i}`,`genre${i % 2}`,Math.round(Math.random() * 100))
    movies.push(movie)

}

sortAndPrint(movies,"genre0")

let grouped = movies.reduce((mat,movie) => {
    let genre_size = movie.genre.length
    let genre_group = parseInt(movie.genre.substring(genre_size-1))
    let arr = mat[genre_group] ? mat[genre_group] : []


    arr.push(movie)
    mat[genre_group] = arr;
    return mat;
},{})


console.log("------------------GROUPED----------------")

console.log(grouped)

// tretata imashe object i type function(logs,type) kade trebashe da
// printash niza od objekti grupirani po tip( tuka imash type, date, module) .





