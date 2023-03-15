import React from "react";

function YoutubePlayerElement({row}){
    const playlistSrc = row.playlist.length> 20?
        "https://www.youtube.com/embed/videoseries?list=" + row.playlist 
        : "https://www.youtube.com/embed/" + row.playlist
    return (
        <div className="d-flex justify-content-start">
            <div className="box-shadow p-2 rounded">
                <iframe width="280" className="rounded" src={playlistSrc} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                
            </div>
            <div className="ml-2">
                <div>
                    <strong>Id filmu/playlisty: </strong><a href={playlistSrc} target="_blank" >{row.playlist}</a>
                </div>
                <div>
                    <strong>Autoodtwarzanie: </strong>{row.autoplay? "Tak" : "Nie"}
                </div>
            </div>
        </div>
        )
    }

export { YoutubePlayerElement }