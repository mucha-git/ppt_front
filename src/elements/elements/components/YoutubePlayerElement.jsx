import React from "react";

function YoutubePlayerElement({row}){
    const playlistSrc = row.playlist.length> 20?
        "https://youtube.com/playlist?list=" + row.playlist 
        : "https://youtu.be/" + row.playlist
    return (
        <div>
            <div className="left w-25">
                Autoodtwarzanie: {row.autoplay? "Tak" : "Nie"}
            </div>
            <div className="left">
                <a href={playlistSrc} target="_blank" >{row.playlist}</a>
            </div>
            <div className="clear" />
        </div>
        )
    }

export { YoutubePlayerElement }