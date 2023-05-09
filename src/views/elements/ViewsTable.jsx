import React, { useContext, useEffect, useState } from "react";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import cellEditFactory from "@musicstory/react-bootstrap-table2-editor";
import { kolumny } from "./ViewsColumns";
import { Actions } from "./ViewActions";
import { Elements } from "./Elements";
import { AppContext } from "../../_helpers/context";
import MuiButton from "../../_components/MuiButton";
import { MuiBtnType } from "../../_helpers/MuiBtnType";
import { viewsService } from "@/_services";
import { history } from "../../_helpers";

function ViewsTable({ parentViewId, yearId, path, opened }) {
  const { views, elements, updateViews } = useContext(AppContext);
  const [expanded, setExpanded] = useState(opened ? opened : []);
  const [filteredViews, setFilteredViews] = useState(viewFilter(views));
  function viewFilter(e) {
    return e.filter((v) => v.viewId == parentViewId);
  }
  useEffect(() => {
    setFilteredViews(viewFilter(views));
  }, [views]);

  useEffect(() => {
    if (expanded.length > 0 && filteredViews.find((e) => e.id == expanded[0])) {
      setTimeout(function () {
        const element = document.getElementById(`${expanded[0]}`);

        const y = element.getBoundingClientRect().top;
        window.scroll({
          top: y,
          behavior: "smooth",
        });
      }, 1000);
    }
  }, []);
  const akcje = (cell, row, rowIndex) => {
    return (
      <Actions
        cell={cell}
        row={row}
        path={path}
        setExpanded={setExpanded}
        expanded={expanded}
      />
    );
  };

  const columns = [
    kolumny.KolumnaOrder(),
    kolumny.KolumnaWidok(),
    kolumny.KolumnaAkcje(akcje),
  ];

  const rowsNotToExpand = () => {
    let rows = filteredViews
      .filter(
        (r) =>
          (r.type != "Text" &&
            r.type != "Graphic" &&
            r.type != "GraphicWithText") ||
          (elements.filter((e) => e.viewId == r.id).length == 0 &&
            views.filter((v) => v.viewId == r.id).length == 0)
      )
      .map((e) => e.id);
    return rows;
  };

  const handleOnExpand = (row, isExpand, rowIndex, e) => {
    if (isExpand) {
      setExpanded([row.id].concat(expanded));
    } else {
      setExpanded(expanded.filter((x) => x !== row.id));
    }
  };

  const expandRow = {
    expanded: expanded,
    onExpand: handleOnExpand,
    parentClassName: "parent-expand-foo",
    className: "blue-light pt-2 pb-2",
    onlyOneExpanding: true,
    nonExpandable: rowsNotToExpand(),
    showExpandColumn: false,
    expandHeaderColumnRenderer: () => {
      return <p></p>;
    },
    expandColumnRenderer: ({ expanded, rowKey, expandable }) => {
      if (expandable) {
        if (expanded) {
          return <MuiButton icon={MuiBtnType.ArrowUp} />;
        }
        return <MuiButton icon={MuiBtnType.ArrowDown} />;
      }
    },
    renderer: (row) => <Elements view={row} path={path} opened={expanded} />,
  };

  const options = {
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
      {
        text: "25",
        value: 25,
      },
      {
        text: "50",
        value: 50,
      },
    ],
  };

  function beforeSaveCell(oldValue, newValue, row, column, done) {
    setTimeout(() => {
      row.order = newValue;
      oldValue != newValue &&
        viewsService
          .update(row)
          .then(() => {
            setFilteredViews(viewFilter(updateViews(yearId)));
          })
          .then(() => done(true))
          .catch((e) => {
            console.log(e);
            done(false);
          });
    }, 0);
    return { async: true };
  }

  const defaultSorted = [
    {
      dataField: "order",
      order: "asc",
    },
  ];

  return (
    <div id={`${parentViewId}`} className="pt-3">
      {parentViewId && (
        <div className="d-flex justify-content-center">
          <MuiButton
            icon={MuiBtnType.Add}
            text="Dodaj nowy widok"
            className="p-2 pr-4 pl-4"
            onClick={() =>
              history.push({
                pathname: `/views/dodaj`,
                state: {
                  yearId: yearId,
                  parentViewId: parentViewId,
                  opened: expanded,
                },
              })
            }
          />
        </div>
      )}
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={filteredViews}
        columns={columns}
        hover
        condensed
        //pagination={paginationFactory(options)}
        expandRow={expandRow}
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true,
          beforeSaveCell,
        })}
        defaultSorted={defaultSorted}
        rowClasses="rowClasses"
      />
    </div>
  );
}

export { ViewsTable };
