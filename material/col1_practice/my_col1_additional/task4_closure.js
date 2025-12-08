// Create a function createPlaylist that receives a list of songs and returns a new object that allows managing a music playlist.
// The returned object has the following properties:
//     queue(songs): a function that adds the new songs to the waiting queue.
//     dequeue(n): a function that removes the last n songs from the waiting queue.
//     play(n): a function that removes the first n songs from the waiting queue and adds them to the list of played songs (playlist).
//     skip(song): a function that removes the specified song from the waiting queue.
//     preview(): returns an object containing both the list of played songs (playlist) and the waiting queue.


function createPlaylist(songs){
    let playlist = songs
    let p_queue = []
    return {
        queue: function (songs){
            for (const song of songs) {
                if(song){
                    p_queue.push(song)
                }
            }

        },
        dequeue: function (n){
            for (let i = 0; i < n; i++) {
                p_queue.pop()
            }
        },
        play: function (n) {
            for (let i = 0; i < n; i++) {
                let fromQueue = p_queue.shift()
                if(fromQueue !== undefined){
                    playlist.push(fromQueue)
                }

            }
        },
        skip: function (song){
            p_queue = p_queue.filter(s => s !== song)
        },
        preview: () => ({playlist: playlist,queue: p_queue})

    }
}