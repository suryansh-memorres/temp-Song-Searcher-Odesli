document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchButton").addEventListener("click", fetchSongData);
});

async function fetchSongData() {
    let songUrl = document.getElementById("searchThisSong").value;

    if (!songUrl) {
        document.getElementById("title").innerHTML = "No song URL found.";
        return;
    }

    try {
        let response = await fetch(`https://api.song.link/v1-alpha.1/links?url=${songUrl}`);
        let data = await response.json();
        let links = data.linksByPlatform;
        let songList = "Available on: <ul>";

        for (let platform in links) {
            songList += `<li><a href="${links[platform].url}" target="_blank" >${platform}</a></li>`;
        }

        songList += "</ul>";

        let entityUniqueId = Object.keys(data.entitiesByUniqueId)[0];

        if (!entityUniqueId) {
            document.getElementById("title").innerHTML = "No title found for the song!";
        }

        document.getElementById("title").innerHTML = `Song Title: ${data.entitiesByUniqueId[entityUniqueId].title}`;
        document.getElementById("results").innerHTML = songList;
    } catch (error) {
        console.error("Error fetching song data:", error.message);
    }
}
