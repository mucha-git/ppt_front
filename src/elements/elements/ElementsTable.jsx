import React, { useContext, useEffect, useState } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import { NavLink } from "react-router-dom";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import cellEditFactory from "@musicstory/react-bootstrap-table2-editor";
import filterFactory, {
    selectFilter,
  textFilter
} from "@murasoftware/react-bootstrap-table2-filter";
import {kolumny} from './ElementsColumns'
import {Actions} from './ElementActions';
import { Elements } from "../../views/elements/Elements";
import { AppContext } from '../../_helpers/context';
import { elementsService } from "@/_services";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";

function ElementsTable({ parentViewId, yearId, path }) {
    const { elements, views, updateElements, isSet } = useContext(AppContext);
    const [filteredElements, setFilteredElements] = useState(viewFilter(elements))
    //useEffect(() => {
    //    isSet(yearId)
    //}, [])

    useEffect(() => {
      setFilteredElements(viewFilter(elements))
    }, [elements])

    function viewFilter(e) {
        return e.filter(v => v.viewId == parentViewId)
      }
      
const akcje = (cell, row, rowIndex) => {
        return (
          <Actions cell={cell} row={row} path={"/elements"} />
        );
      };

    const columns = [
      kolumny.KolumnaOrder(),
      kolumny.KolumnaElement(),
      kolumny.KolumnaAkcje(akcje)
      ]

    const emptyTable = () => {
        return (
          <div>
              <p>
                Brak elementów
              </p>
          </div>
        );
      };

      const rowsNotToExpand = () => {
        let rows = filteredElements.filter(r => r.type != "Navigation").map(e => e.id)
        return rows
      }

    const expandRowElement = {
        parentClassName: "parent-expand-foo",
        className: "blue-light pt-2 pb-2",
        onlyOneExpanding: true,
        nonExpandable: rowsNotToExpand(),
        renderer: (row) => {
          let view = views.find(v => v.id == row.destinationViewId)
          return <Elements view={view} path={"/elements"} />
        }
      };

      function beforeSaveCell(oldValue, newValue, row, column, done) {
        setTimeout(() => {
          row.order = newValue
          oldValue != newValue && elementsService
            .update(row)
            .then(() => {
              setFilteredElements(viewFilter(updateElements(yearId)))
            }).then(() => done(true))
            .catch((e) => {
              console.log(e)
              done(false)
            })
        }, 0);
        return { async: true };
      }

      const defaultSorted = [{
        dataField: 'order',
        order: 'asc'
      }];

  return (
    <div>
      <div className="d-flex justify-content-center mt-3">
    <NavLink to={{pathname: `/elements/dodaj`, state: {yearId: yearId, parentViewId: parentViewId} }} className="nav-item center-divs">
      <MuiButton icon={MuiBtnType.Add} text="Dodaj nowy element" className="p-2 pr-4 pl-4" />
    </NavLink>
    </div>
    <BootstrapTable
    bootstrap4
    keyField="id"
    data={filteredElements}
    columns={columns}
    filter={filterFactory()}
    filterPosition="top"
    filtersClasses="top-filter-class"
    hover
    condensed
    //noDataIndication={emptyTable}
    pagination={paginationFactory()}
    expandRow={expandRowElement}
    cellEdit={cellEditFactory({
      mode: "click",
      blurToSave: true,
      beforeSaveCell,
    })}
    defaultSorted={ defaultSorted }
    rowClasses="elementClasses blue-light mt-2 mb-2"
  />
  </div>
  );
}

export { ElementsTable };