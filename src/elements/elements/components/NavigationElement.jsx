import React, { useContext } from "react";
import { View } from "../../../views/elements/components/View";
import { AppContext } from '../../../_helpers/context'

function NavigationElement({row}){
    const { views } = useContext(AppContext)
    const view = views.find(v => v.id == row.destinationViewId)
    return (
        <View row={view} />
    )
    }

export { NavigationElement }