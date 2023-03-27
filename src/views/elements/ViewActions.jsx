import React, { useState, useContext} from "react";
import { viewsService } from "@/_services";
import { ScreenType } from "../../_helpers/ScreenType";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { ListType } from "../../_helpers/ListType";

function Actions(props) {
    const { updateViews, views, elements } = useContext(AppContext);
    const addButtonPath = () => {
        switch (props.row.screenType) {
            case ScreenType[1].value: return `${props.path}/dodaj`
            case ScreenType[2].value: return `/elements/dodaj`
        }
    }

    const isInternalType = () => {
        return props.row.type == ListType[0].value || 
            props.row.type == ListType[1].value
    }

    const isExpandable = () => {
        return isInternalType() &&
                                        (elements.filter(e => e.viewId == props.row.id).length > 0 ||
                                        views.filter( v => v.viewId == props.row.id).length > 0)
    }

    const expandButton = () => {
        let visability = isExpandable()? "" : "invisible"
        if(props.expanded.find( a => a == props.row.id) != undefined ){
            return <div className={visability}><MuiButton icon={MuiBtnType.ArrowUp} onClick={() => props.setExpanded([])} /></div>
        } else {
            return <div className={visability}><MuiButton icon={MuiBtnType.ArrowDown} onClick={() => props.setExpanded([props.row.id])}/></div>;
        } 
    }

    return (
        <div className={"d-flex align-items-start flex-column h-100"}>
            <div className="d-flex justify-content-end w-100 h-100">
                <div className="">
                    {isInternalType() && <NavLink to={{pathname: addButtonPath(), state: {yearId: props.row.yearId, parentViewId: props.row.id} }} className="nav-item center-divs">
                        <MuiButton icon={MuiBtnType.Add} onClick={() => {}} />
                    </NavLink>}
                    <NavLink
                        to={{
                            pathname: `${props.path}/edytuj`,
                            state: {row: props.row},
                        }}
                    >
                        <MuiButton icon={MuiBtnType.Edit} onClick={() => {}} />
                    </NavLink>
                    <MuiButton icon={MuiBtnType.Delete} onClick={() => {
                        viewsService._delete(props.cell).then(() => {
                            updateViews(props.row.yearId)
                        });
                    }} />
                </div>
                
                <div className="mt-auto">
                    {expandButton()}
                </div>
            </div>
        </div>
    );

}

export { Actions };