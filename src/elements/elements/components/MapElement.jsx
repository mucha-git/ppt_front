import React, {useContext} from "react";
import { AppContext } from "../../../_helpers/context";

function MapElement({row}){
            const { maps } = useContext(AppContext)
            const map = maps.find(m => m.id = row.mapId)
            return (map?.mapSrc?.startsWith("http"))
                ? <iframe width={600} height={400} src={map.mapSrc}></iframe> :
            "Aby wyświetlić podgląd mapy trzeba podać wartość pola src z udostępnienia mapy na stronie";
        }

export { MapElement }