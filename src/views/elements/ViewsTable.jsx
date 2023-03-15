import React, { useContext, useEffect, useState } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import { NavLink } from "react-router-dom";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import cellEditFactory from "@musicstory/react-bootstrap-table2-editor";
import filterFactory, {
    selectFilter,
  textFilter
} from "@murasoftware/react-bootstrap-table2-filter";
import {kolumny} from './ViewsColumns'
import {Actions} from './ViewActions';
import { Elements } from "./Elements";
import { AppContext } from '../../_helpers/context';
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { viewsService } from "@/_services";

function ViewsTable({ parentViewId, yearId, path }) {
    const { views, elements, updateViews } = useContext(AppContext);
    const [expanded, setExpanded] =useState([]);
    const [filteredViews, setFilteredViews] = useState(viewFilter(views))
    function viewFilter(e) {
        return e.filter(v => v.viewId == parentViewId)
      }

    useEffect(() => {
      setFilteredViews(viewFilter(views))
    }, [views])
    

const akcje = (cell, row, rowIndex) => {
        return (
          <Actions cell={cell} row={row} path={path} setExpanded={setExpanded} expanded={expanded} />
        );
      };

    const columns = [
        kolumny.KolumnaOrder(),
        kolumny.KolumnaWidok(),
        kolumny.KolumnaAkcje(akcje)
      ]

      const rowsNotToExpand = () => {
        console.log(views.filter( v => v.viewId == 112).length)
        let rows = filteredViews.filter(r => 
                                        (r.type != "Text" && 
                                        r.type != "Graphic") ||
                                        (elements.filter(e => e.viewId == r.id).length == 0 &&
                                        views.filter( v => v.viewId == r.id).length == 0)
        ).map(e => e.id)
        return rows
      }

      const handleOnExpand = (row, isExpand, rowIndex, e) => {
        if (isExpand) {
          setExpanded([row.id])
        } else {
          setExpanded(expanded.filter(x => x !== row.id));
        }
      }

    const expandRow = {
        expanded: expanded,
        onExpand: handleOnExpand,
        parentClassName: "parent-expand-foo",
        className: "blue-light pt-5 pb-5",
        onlyOneExpanding: true,
        nonExpandable: rowsNotToExpand(),
        showExpandColumn: false,
        expandHeaderColumnRenderer: () => {
          return <p></p>;
        },
        expandColumnRenderer: ({ expanded, rowKey, expandable }) => {
          if(expandable){
            if (expanded) {
              return <MuiButton icon={MuiBtnType.ArrowUp} />;
            }
            return <MuiButton icon={MuiBtnType.ArrowDown} />;
          }
        },
        renderer: (row) => (
            <Elements view={row} path={path} />
        )
      };

      const options = {
        sizePerPageList: [{
          text: '10', value: 10
        }, {
          text: '25', value: 25
        }, {
          text: '50', value: 50
        }] 
      };

      function beforeSaveCell(oldValue, newValue, row, column, done) {
        setTimeout(() => {
          row.order = newValue
          oldValue != newValue && viewsService
            .update(row)
            .then(() => {
              setFilteredViews(viewFilter(updateViews(yearId)))
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
      {parentViewId && <div class="d-flex justify-content-center mt-3">
        <NavLink to={{pathname: `${path}/dodaj`, state: {yearId: yearId, parentViewId: parentViewId} }} className="nav-item center-divs">
          <MuiButton icon={MuiBtnType.Add} text="Dodaj nowy widok" className="p-2 pr-4 pl-4" />
        </NavLink>
      </div>}
      <BootstrapTable
        bootstrap4
        keyField='id'
        data={filteredViews}
        columns={columns}
        filter={filterFactory()}
        filterPosition="top"
        filtersClasses="top-filter-class"
        hover
        condensed
        pagination={paginationFactory(options)}
        expandRow={expandRow}
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true,
          beforeSaveCell,
        })}
        defaultSorted={ defaultSorted }
        rowClasses="rowClasses"
      />
  </div>
  );
}

export { ViewsTable };