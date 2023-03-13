import React, { useState, useContext} from "react";
import { viewsService } from "@/_services";
import { ScreenType } from "../../_helpers/ScreenType";
import { NavLink } from "react-router-dom";
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { ListType } from "../../_helpers/ListType";

function Actions(props) {
    const { updateViews } = useContext(AppContext);
    const addButtonPath = () => {
        switch (props.row.screenType) {
            case ScreenType[1].value: return `${props.path}/dodaj`
            case ScreenType[2].value: return `/elements/dodaj`
        }
    }

    const expandButton = () => {
        let visability = (props.row.type == ListType[0].value || props.row.type == ListType[1].value)? "" : "invisible"
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
                    <NavLink to={{pathname: addButtonPath(), state: {yearId: props.row.yearId, parentViewId: props.row.id} }} className="nav-item center-divs">
                        <MuiButton icon={MuiBtnType.Add} onClick={() => {}} />
                    </NavLink>
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
            
            
            
            {/* <button
                    className="btn m-1 btn-danger"
                    onClick={() => {
                        viewsService._delete(props.cell).then(() => {
                            updateViews(props.row.yearId)
                        });
                    }}
                >
                    Usuń
                </button>
             */}
            
        </div>
    );

}

export { Actions };