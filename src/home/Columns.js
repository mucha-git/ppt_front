import React from "react";
import Loader from "react-loader-spinner";
import { Status } from '@/_helpers';


export const kolumny = {
    KolumnaIdPozycji,
    KolumnaKupnoSprzedaz,
    KolumnaStatus,
    KolumnaSymbol,
    KolumnaTp,
    KolumnaSl,
    KolumnaVolume,
    KolumnaProwizja,
    KolumnaValue,
    KolumnaRealPips,
    KolumnaZyskStrata,
    KolumnaAkcja,
    KolumnaLikwidacja
}

// function KolumnaKontrakt(t, textFilter) {
//     return {
//         dataField: "kontrakt",
//         text: t("orders.allOrders.contract"),
//         sort: true,
//         filter: textFilter({
//             placeholder: t("bootstrapTable.filterStringPlaceholder"),
//         }),
//         headerClasses: "header-class",
//         headerStyle: { width: "80px" },
//         footer: "",
//     }
// }
// function KolumnaProcedura(t, selectFilter, proceduryList) {
//     return {
//         dataField: "iD_PROCEDURA",
//         text: t("orders.allOrders.procedure"),
//         sort: true,
//         formatter: (cell) => proceduryList[cell],
//         filter: selectFilter({
//             options: proceduryList,
//             placeholder: t("bootstrapTable.selectOptionPlaceholder"),
//         }),
//         headerClasses: "header-class",
//         headerStyle: { width: "100px" },
//         footer: "",
//     }
// }
// function KolumnaTowar(t, selectFilter, towaryList) {
//     return {
//         dataField: "iD_TOWAR",
//         text: t("orders.allOrders.commodity"),
//         sort: true,
//         formatter: (cell) => towaryList[cell],
//         filter: selectFilter({
//             options: towaryList,
//             placeholder: t("bootstrapTable.selectOptionPlaceholder"),
//         }),
//         headerClasses: "header-class",
//         headerStyle: { width: "100px" },
//         footer: "",
//     }
// }
// function KolumnaTerminal(t, selectFilter, terminaleList) {
//     return {
//         dataField: "iD_TERMINAL",
//         text: t("orders.allOrders.terminal"),
//         sort: true,
//         formatter: (cell) => terminaleList[cell],
//         filter: selectFilter({
//             options: terminaleList,
//             placeholder: t("bootstrapTable.selectOptionPlaceholder"),
//         }),
//         headerClasses: "header-class",
//         headerStyle: { width: "150px" },
//         footer: "",
//     }
// }
// function KolumnaIlość(t) {
//     return {
//         dataField: "ilosc",
//         text: t("orders.allOrders.quantity"),
//         sort: true,
//         headerClasses: "header-class",
//         headerStyle: { width: "100px" },
//         formatter: (cell) => {
//             return cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//         },
//         footer: (columnData) => columnData.reduce((acc, item) => acc + item, 0).toFixed(2),
//     }
// }
// function KolumnaIlośćZrealizowana(t) {
//     return {
//         dataField: "ilosC_ZREALIZOWANA",
//         text: t("orders.allOrders.realizedQuantity"),
//         sort: true,
//         headerClasses: "header-class",
//         headerStyle: { width: "100px" },
//         formatter: (cell) => {
//             return cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//         },
//         footer: (columnData) => columnData.reduce((acc, item) => acc + item, 0).toFixed(2),
//     }
// }
// function KolumnaIlośćZatankowana(t) {
//     return {
//         dataField: "ilosC_ZATANKOWANA",
//         text: t("orders.allOrders.refueledQuantity"),
//         sort: true,
//         headerClasses: "header-class",
//         headerStyle: { width: "100px" },
//         formatter: (cell) => {
//             return cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//         },
//         footer: (columnData) => columnData.reduce((acc, item) => acc + item, 0).toFixed(2),
//     }
// }
// function KolumnaIlośćPozostało(t) {
//     return {
//         dataField: "ilosC_POZOSTALO",
//         text: t("orders.allOrders.remainingQuantity"),
//         sort: true,
//         headerClasses: "header-class",
//         headerStyle: { width: "100px" },
//         formatter: (cell) => {
//             return cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//         },
//         footer: (columnData) => columnData.reduce((acc, item) => acc + item, 0).toFixed(2),
//     }
// }
// function KolumnaDatOD(t, dateFilter, Comparator) {
//     return {
//         dataField: "datA_OD_UTC",
//         text: t("orders.allOrders.dateFrom"),
//         sort: true,
//         formatter: (cell, row) => {
//             let dateObj = row.datA_OD;
//             if (typeof row.datA_OD !== "object") {
//                 dateObj = new Date(row.datA_OD);
//             }
//             return `${dateObj.getFullYear()}-${(
//                 "0" +
//                 (dateObj.getMonth() + 1)
//             ).slice(-2)}-${("0" + dateObj.getDate()).slice(-2)}`;
//         },
//         filter: dateFilter({
//             defaultValue: { comparator: Comparator.GE },
//             comparatorStyle: { display: "none" },
//         }),
//         headerClasses: "header-class",
//         headerStyle: { width: "100px" },
//         footer: "",
//     }
// }
// function KolumnaDatDO(t, dateFilter, Comparator) {
//     return {
//         dataField: "datA_DO_UTC",
//         text: t("orders.allOrders.dateTo"),
//         sort: true,
//         formatter: (cell, row) => {
//             let dateObj = row.datA_DO;
//             if (typeof row.datA_DO !== "object") {
//                 dateObj = new Date(row.datA_DO);
//             }
//             return `${dateObj.getFullYear()}-${(
//                 "0" +
//                 (dateObj.getMonth() + 1)
//             ).slice(-2)}-${("0" + dateObj.getDate()).slice(-2)}`;
//         },
//         filter: dateFilter({
//             defaultValue: { comparator: Comparator.LE },
//             comparatorStyle: { display: "none" },
//         }),
//         headerClasses: "header-class",
//         headerStyle: { width: "100px" },
//         footer: "",
//     }
// }
// function KolumnaNrZamówieniKlienta(t, textFilter, popupNrZamKlienta) {
//     return {
//         dataField: "nR_ZAMOWIENIA_KLIENTA",
//         text: t("orders.allOrders.clientOrderNumber"),
//         sort: true,
//         formatter: (cell, row) => {
//             return row.nR_ZAMOWIENIA_KLIENTA == "" ? (
//                 popupNrZamKlienta(row)
//             ) : (
//                 <div>{row.nR_ZAMOWIENIA_KLIENTA}</div>
//             );
//         },
//         headerClasses: "header-class",
//         filter: textFilter({
//             placeholder: t("bootstrapTable.filterStringPlaceholder"),
//         }),
//         headerStyle: { width: "120px" },
//         footer: "",
//     }
// }
// function KolumnaNrZamówieniaPCB(t, textFilter) {
//     return {
//         dataField: "nR_ZAMOWIENIA_PCB",
//         text: t("orders.allOrders.orderNumber"),
//         sort: true,
//         headerClasses: "header-class",
//         filter: textFilter({
//             placeholder: t("bootstrapTable.filterStringPlaceholder"),
//         }),
//         formatter: (cell) => {
//             return cell == null ? (
//               <div className="">
//                 <Loader type="TailSpin" color="#085aaa" height="25" width="25" />
//               </div>
//             ) : (
//               cell
//             );
//           },
//         headerStyle: { width: "120px" },
//         footer: "",
//     }
// }

// function KolumnaZamówienie(t, akcje) {
//     return {
//         dataField: "iD_ZAMOWIENIE",
//         text: t("orders.allOrders.actions"),
//         formatter: akcje,
//         align: "left",
//         headerClasses: "header-class",
//         headerStyle: { width: "200px" },
//         events: {
//             onClick: (e, column, columnIndex, row, rowIndex) => {
//               e.stopPropagation();
//             },
//         },
//         footer: "",
//     }
// }
// function KolumnaNazwaKontrah(t, textFilter) {
//     return {
//         dataField: "nazwA_KONTRAH",
//         text: t("orders.allOrders.kontrahName"),
//         sort: true,
//         headerClasses: "header-class",
//         filter: textFilter({
//             placeholder: t("bootstrapTable.filterStringPlaceholder"),
//         }),
//         headerStyle: { width: "120px" },
//         footer: t("footer.sum"),
//     }
// }

// function KolumnaStatus(t, multiSelectFilter, statusyList) {
//     return {
//         dataField: "status",
//         text: t("orders.allOrders.status"),
//         sort: true,
//         formatter: (cell) => statusyList[cell],
//         filter: multiSelectFilter({
//             options: statusyList,
//             placeholder: t("bootstrapTable.selectOptionPlaceholder"),
//             defaultValue: [1, 2],
//             style: {
//                 padding: "6px",
//             },
//         }),
//         headerClasses: "header-class",
//         headerStyle: { width: "150px" },
//         footer: "",
//     }
// }

function KolumnaIdPozycji(columnTitle, textFilter) {
    return {
        dataField: "id",
        text: columnTitle,
        sort: true,
        filter: textFilter({
            placeholder: "Nazwa",
        }),
        headerClasses: "header-class text-center",
        classes: 'width100 text-center'
        // headerStyle: { width: "120px" },
    }
}

function KolumnaKupnoSprzedaz(columnTitle, textFilter, format) {
    return {
        dataField: "isBuying",
        text: columnTitle,
        sort: true,
        formatter: format,
        filter: textFilter({
            placeholder: "Nazwa",
        }),
        headerClasses: "header-class text-center",
        classes: 'width100 text-center',
        style: (cell, row, rowIndex, colIndex) => {
            if (row.isBuying) {
              return {
                //backgroundColor: '#28a74540',
                color: '#28a745'
              };
            }
            return {
              //backgroundColor: '#dc354540',
              color: '#dc3545'
            };
          }
        // headerStyle: { width: "120px" },
    }
}

const statusOptions = {
    0: 'ACTIVE',
    1: 'ON_HOLD',
    2: 'CLOSED'
  };

function KolumnaStatus(columnTitle, filter, format) {
    return {
        dataField: "status",
        text: columnTitle,
        sort: true,
        formatter: format,
        // formatter: (cell) => <b className={cell.status == Status.Closed.id ? "text-danger":cell.status == Status.Active.id ? "text-success" : "text-warning"}>{cell.status == Status.Active.id ? Status.Active.value : cell.status == Status.Closed.id ? Status.Closed.value : Status.OnHold.value}</b>,
        // editCellClasses: (cell) =>{cell.status == Status.Closed.id ? "text-danger":cell.status == Status.Active.id ? "text-success" : "text-warning"},
        // classes: function callback(cell, row, rowIndex, colIndex) {cell.status == Status.Closed.id ? "text-danger":cell.status == Status.Active.id ? "text-success" : "text-warning"},
        // filter: filter({
        //     placeholder: "Nazwa",
        // }),
        filter: filter({
            options: statusOptions
        }),
        headerClasses: "header-class text-center",
        classes: 'width100 text-center',
        style: (cell, row, rowIndex, colIndex) => {
            if (row.status === Status.Active.id) {
              return {
                //backgroundColor: '#28a74540',
                color: '#28a745'
              };
            }
            if (row.status === Status.OnHold.id) {
                return {
                  //backgroundColor: '#d39e0040',
                  color: '#d39e00'
                };
              }
            return {
              //backgroundColor: '#dc354540',
              color: '#dc3545'
            };
          }
        // headerStyle: { width: "80px" },
          // footer: ""
    }
}

const symbolOptions = {
    AUDNZD: 'AUDNZD',
    AUDCAD: 'AUDCAD',
    NZDCAD: 'NZDCAD'
  };

function KolumnaSymbol(columnTitle, filter) {
    return {
        dataField: "symbol",
        text: columnTitle,
        sort: true,
        // filter: filter({
            //     placeholder: "Nazwa",
            // }),
            formatter: cell => symbolOptions[cell],
            filter: filter({
                options: symbolOptions
            }),
            headerClasses: "header-class text-center",
            classes: 'width100 text-center'
            
        // headerStyle: { width: "80px" },
        // footer: ""
    }
}

function KolumnaTp(columnTitle, textFilter) {
    return {
        dataField: "tp",
        text: columnTitle,
        sort: true,
        filter: textFilter({
            placeholder: "Nazwa",
        }),
        headerClasses: "header-class text-center",
        classes: 'width100 text-center'
        // headerStyle: { width: "120px" },
        // footer: ""
    }
}


function KolumnaSl(columnTitle, textFilter) {
    return {
        dataField: "sl",
        text: columnTitle,
        sort: true,
        filter: textFilter({
            placeholder: "Nazwa",
        }),
        headerClasses: "header-class text-center",
        classes: 'width100 text-center'
        // headerStyle: { width: "120px" },
        // footer: ""
    }
}

function KolumnaVolume(columnTitle, textFilter) {
    return {
        dataField: "volume",
        text: columnTitle,
        sort: true,
        filter: textFilter({
            placeholder: "Nazwa",
        }),
        formatter: (cell, row, rowIndex) => {
            return (row.volume).toFixed(2)
        },
        headerClasses: "header-class text-center",
        classes: 'width100 text-center'
        // headerStyle: { width: "80px" },
        // footer: ""
    }
}

function KolumnaProwizja(columnTitle, textFilter, format) {
    return {
        dataField: "prowizja",
        text: columnTitle,
        sort: true,
        formatter: format,
        filter: textFilter({
            placeholder: "Nazwa",
        }),
        headerClasses: "header-class text-center",
        classes: 'width100 text-center'
        // headerStyle: { width: "120px" },
        // footer: (columnData) => columnData.reduce((acc, item) => acc + item, 0).toFixed(2),

    }
}

function KolumnaValue(columnTitle, textFilter) {
    return {
        dataField: "value",
        text: columnTitle,
        sort: true,
        filter: textFilter({
            placeholder: "Nazwa",
        }),
        headerClasses: "header-class text-center",
        classes: 'width100 text-center'
        // headerStyle: { width: "120px" },
        // footer: ""
    }
}


function KolumnaRealPips(columnTitle, textFilter, format) {
    return {
        dataField: "realPipsDifference",
        text: columnTitle,
        sort: true,
        formatter: format,
        filter: textFilter({
            placeholder: "Nazwa",
        }),
        headerClasses: "header-class text-center",
        classes: 'width100 text-center'
        // headerStyle: { width: "120px" },
        // footer: ""
    }
}

function KolumnaZyskStrata(columnTitle, textFilter, format) {
    return {
        dataField: "currentAmount",
        text: columnTitle,
        sort: true,
        formatter: format,
        filter: textFilter({
            placeholder: "Nazwa",
        }),
        headerClasses: "header-class text-center",
        classes: 'width100 text-center',
        style: (cell, row, rowIndex, colIndex) => {
            if (row.currentAmount > 0) {
              return {
                backgroundColor: '#28a74540',
                color: '#28a745'
              };
            }
            return {
              backgroundColor: '#dc354540',
              color: '#dc3545'
            };
          }
        // headerStyle: { width: "80px" },
        // headerStyle: { width: "120px" },
        // footer: (columnData) => columnData ? columnData.reduce((acc, item) => acc + item, 0).toFixed(2):"",
    }
}

function KolumnaAkcja(columnTitle, format) {
    return {
        dataField: "buttonAkcjaId",
        text: columnTitle,
        sort: true,
        // formatter: (row) =>action(row),
        formatter: format,
        headerClasses: "header-class text-center",
        style: { width: "200px" },
        //  footer: "",
    }
}

function KolumnaLikwidacja(columnTitle, format) {
    return {
        dataField: "buttonLikwidacjaId",
        text: columnTitle,
        sort: true,
        formatter: format,
        headerClasses: "header-class text-center",
        style: { width: "200px" },
        // footer: "",
    }
}