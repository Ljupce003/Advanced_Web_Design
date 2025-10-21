
/**
 * /////////////////////////////////////////////////////////////////////////////////
 * 1. Write a function that fetches users and posts from https://jsonplaceholder.typicode.com/users and
 * https://jsonplaceholder.typicode.com/posts. Create a User class that stores each user’s id, name, username
 * and email, and a Post class that stores userId, title and body with an instance method summary() that returns
 * the first 30 characters of the body followed by ... if it is longer. After fetching and building arrays of User
 * and Post objects, filter posts to keep only those whose titles are at least 20 characters long, check whether
 * some posts contain the word “qui” in either the title or body and whether every user has at least one post, map
 * the top authors into readable strings that include the user’s name and post count, and sort those authors by
 * post count in descending order. Print all results in a clean, readable format and handle invalid payloads, empty
 * arrays, and network errors gracefully.
* */

class User{
    constructor(userId, name, username, email) {
        this.userId = userId;
        this.name = name;
        this.username = username;
        this.email = email;
    }
}

class Post {
    constructor(userId, title, body) {
        this.userId = userId;
        this.title = title;
        this.body = body;
    }

    summary(){
        return this.body.length < 31 ? this.body : this.body.slice(0,30)+"..."
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap
    }
    return array;
}

async function ex1func(){

    try{

        const usersResponse = await fetch("https://jsonplaceholder.typicode.com/users")
        const usersJson = await usersResponse.json();
        let usersArr = usersJson.map(jsonUsr => new User(jsonUsr.id, jsonUsr.name, jsonUsr.username, jsonUsr.email))

        const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts")
        const postsJson = await postsResponse.json();
        let postsArr = postsJson.map(jsonPost => new Post(jsonPost.userId,jsonPost.title,jsonPost.body))

        //Print the converted array objects of users and posts
        console.log("Users Array")
        console.log("/////////////////////////////////////////////////////////////////////////////////")
        console.log(usersArr)
        console.log("\nPosts Array")
        console.log("/////////////////////////////////////////////////////////////////////////////////")
        postsArr.forEach(post => console.log(`UserId: ${post.userId}\nTitle: ${post.title}\nSummary: ${post.summary()}`))
        //Filter posts by title length

        let filteredPosts = postsArr.filter(post => post.title.length>=20)
        console.log("\nFiltered posts")
        console.log("/////////////////////////////////////////////////////////////////////////////////")
        filteredPosts.forEach(post => console.log(`UserId: ${post.userId}\nTitle: ${post.title}\nSummary: ${post.summary()}`))

        console.log("\nPost exists bool")
        console.log("/////////////////////////////////////////////////////////////////////////////////")
        let postExistsWithSpecifiedWord = postsArr.some(post => post.title.includes("qui") || post.body.includes("qui"))
        console.log(postExistsWithSpecifiedWord)

        let everyUserHasAtLeastOnePost = usersArr.every(user => postsArr.some(post => post.userId === user.userId))
        console.log("\nEvery User has least one post")
        console.log("/////////////////////////////////////////////////////////////////////////////////")
        console.log(everyUserHasAtLeastOnePost)
        let userPostCountMap = []

        let i = 0
        usersArr.forEach(user => {
            userPostCountMap.push({
                userName: user.name,
                numPosts: postsArr.filter(post => post.userId === user.userId).length - i
            })
            i++
        })

        userPostCountMap = shuffle(userPostCountMap)

        console.log("\nUser Post count Map")
        console.log("/////////////////////////////////////////////////////////////////////////////////")
        console.log(userPostCountMap)

        console.log("\nUser Post count Map SORTED")
        console.log("/////////////////////////////////////////////////////////////////////////////////")
        console.log(userPostCountMap.sort((u1,u2) => u2.numPosts - u1.numPosts))

    } catch (e) {
        console.log("error fetching and transforming resources:",e)
    }


}

// await ex1func();


/**
 * 2.Write an asynchronous JavaScript function that fetches the first 20 characters from
 * https://rickandmortyapi.com/api/character (GET request) and then fetches details for each character’s first
 * episode. Create a Character class that stores id, name, status, species, origin(name only),
 * episodeCount (length of the episode array), and a method firstEpisodecode() that returns the fetched
 * episode’s code (e.g., “S01E01”) or "Unknown" if missing. After building the array of Character objects and
 * fetching their first episode codes, filter to keep only Alive characters, extract the unique set of species
 * and print them alphabetically, sort the full list by episodeCount in descending order and show the top five
 * characters by appearances. Check whether some characters have origin that includes “Earth” and finally print
 * everything in a clean, readable format while handling network errors and empty payloads gracefully.
* */

class Character{
    #episodes = []

    constructor(id, name, status, species, originName, epCount,episodes) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.species = species;
        this.originName = originName;
        this.epCount = epCount;
        this.#episodes = episodes
    }

    async firstEpisodeCode() {
        if(this.#episodes.length<1) return "Unknown"
        try {
            let epResponse =await fetch(this.#episodes[0])
            let epData = await epResponse.json()
            if(epData.episode === undefined || epData.episode.length === 0) return "Unknown"
            else return epData.episode
        } catch (e) {
            return "Unknown"
        }


    }

}

async function ex2func(){

    try{
        console.log("start func")
        const response = await fetch("https://rickandmortyapi.com/api/character")
        const responseData = await response.json()
        console.log("fetched data")
        let objArr = responseData.results.map(jsonObj => new Character(jsonObj.id,jsonObj.name,jsonObj.status,jsonObj.species,jsonObj.origin.name,jsonObj.episode.length,jsonObj.episode))

        console.log("Character data fetched")
        console.log("/////////////////////////////////////////////////////////////////////////////////")
        await Promise.all(objArr.map(async obj =>{
            let objEpCode = await obj.firstEpisodeCode();
            console.log(`{\n\tId: ${obj.id}\n\tName: ${obj.name}\n\tStatus: ${obj.status}\n\tSpecies: ${obj.species}\n\tOrigin Name: ${obj.originName}\n\tepCount: ${obj.epCount}\n\tFirst Episode Code: ${objEpCode}\n}\n`)
        }))

        let aliveCharactersArr = objArr.filter(obj => obj.status === "Alive")
        console.log("\nAlive Characters")
        console.log("/////////////////////////////////////////////////////////////////////////////////")
        console.log(aliveCharactersArr)

        let uniqueSpecies = new Set()
        let uniqueSpeciesAlive = aliveCharactersArr.filter(alive => {
            if(uniqueSpecies.has(alive.species)) return false
            uniqueSpecies.add(alive.species)
            return true
        } ).sort((c1,c2) => {
            if(c1.name < c2.name) return -1
            if(c1.name > c2.name) return 1;
            return 0;
        })
        console.log("\nAlive unique Species Characters")
        console.log("/////////////////////////////////////////////////////////////////////////////////")
        console.log(uniqueSpeciesAlive)


        console.log("\nFull list sorted by desc order of num of Episodes")
        console.log("/////////////////////////////////////////////////////////////////////////////////")
        console.log(objArr.sort((c1,c2) => c2.epCount - c1.epCount).slice(0,Math.min(5,objArr.length)))


        console.log("\nDoes some characters have origin that includes earth")
        console.log("/////////////////////////////////////////////////////////////////////////////////")
        console.log(objArr.some(obj => obj.originName.includes("Earth")))



    }catch (e) {
        console.log("Error fetching and transforming data",e)

    }

}




await ex2func()