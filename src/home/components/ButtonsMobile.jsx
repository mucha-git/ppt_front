import 'regenerator-runtime/runtime';

import React from "react";
import { Status } from '@/_helpers';

function ButtonsMobile({updateTradesStatus}) {
    return (
        <div className='row m-2'>
                    <div className="col"><button className="display-4 btn btn-success btn-block btn-lg" onClick={() => updateTradesStatus(Status.Active)} >AKTYWUJ WSZYSTKIE</button></div>
                    <div className="col"><button className="display-4 btn btn-danger btn-block btn-lg" onClick={() => updateTradesStatus(Status.Closed)} >ZAMKNIJ WSZYSTKIE</button></div>
                </div>
    )
}

export { ButtonsMobile }; 