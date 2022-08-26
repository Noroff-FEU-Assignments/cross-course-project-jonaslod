export default function writeGenres(genres = []){
    let html = `<span class="bold">Genres: </span>`;
    if(typeof genres === "object" && genres.length>0){
        for(let i = 0; i < genres.length; i++){
            html += genres[i].name;
            if(i<genres.length-1){
                html+=", ";
            }
        }
    }
    else{
        html += "undefined";
    }
    return html;
}