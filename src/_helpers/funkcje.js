import React from 'react';
import { ListType } from './ListType';
export function isWymagane() {
    return <span className="wymagane">*</span>;
  }

export function showView (row) {
    switch (row.type) {
        case ListType[0].value: 
            return <div>
                {/* <p><strong>Typ: </strong>{ListType[0].key}</p>
                <p><strong>Tekst nagłówka: </strong>{row.headerText}</p> */}
            </div>
        case ListType[1].value: 
            return <img src={row.imgSrc} width={"100%"} />
        case ListType[2].value: 
            return <div>
            <p><strong>Link zewnętrzny: </strong>{row.externalUrl}</p>
        </div>
        case ListType[3].value: 
            return <div>
            <p><strong>Link zewnętrzny: </strong>{row.externalUrl}</p>
            <img src={row.imgSrc} width={"100%"} />
        </div>
        
    }
}