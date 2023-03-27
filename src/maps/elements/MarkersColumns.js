import React from 'react';
import DefaultTableView from '../../_components/DefaultTableView';
import  { Type } from '@musicstory/react-bootstrap-table2-editor';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useGridApiContext } from '@mui/x-data-grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const kolumny = {
    KolumnaTitle,
    KolumnaDescription,
    KolumnaPinId
}

function KolumnaTitle(){return{
        dataField: "title",
        text: "Tytuł",
        headerClasses: "header-class",
        editable: true,
        editor: {
            type: Type.TEXTAREA
          }
    }}

function KolumnaDescription(){return{
        dataField: "description",
        text: "Opis",
        headerClasses: "header-class",
        editable: true,
        editor: {
            type: Type.TEXTAREA,

          }
    }}

function KolumnaPinId(options){return{
        dataField: "pinId",
        text: "Pinezka",
        //classes: "height1 pt-3 pb-3",
        headerClasses: "header-class",
        formatter: (cell) => {
            return <img src={options.find(f => f.id == cell)?.pinSrc} width={20} />
        },
        headerStyle: { width: "110px"},
        editable: true,
        editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => {
            return (
                <Select
                name={"mapPins"}
                value={value}
                onChange={(val) => editorProps.onUpdate(val.target.value)}
              >
                {options.map((option) => {
                  return <MenuItem key={option.id} value={option.id}><img src={option.pinSrc} width={20} /></MenuItem>
                })}
              </Select>
            );
        }
        // editor: {
        //     type: Type.SELECT,
        //     options: options.map(m => { return {value: m.id, label: m.name}}) 
        //   }
    }}

    export const kolumnyMui = {
        KolumnaTitleMui,
        KolumnaDescriptionMui,
        KolumnaPinIdMui
    }
    
    function KolumnaTitleMui(){return{
            field: "title",
            headerName: "Tytuł",
            // headerClasses: "header-class",
            editable: true,
            // editor: {
            //     type: Type.TEXTAREA
            //   }
        }}
    
    function KolumnaDescriptionMui(){return{
            field: "description",
            headerName: "Opis",
            editable: true
            // headerClasses: "header-class",
            // editable: true,
            // editor: {
            //     type: Type.TEXTAREA,
    
            //   }
        }}
    
    function KolumnaPinIdMui(options){
        return{
            field: "pinId",
            width: 110,
            headerName: "Pinezka",
            editable: true,
            //classes: "height1 pt-3 pb-3",
            //headerClasses: "header-class",
            renderCell: (params) => {
                return <img src={options.find(f => f.id == params.value)?.pinSrc} width={20} />
            },
            renderEditCell: (params) => {
                const { id, value, field } = params;
                const apiRef = useGridApiContext();
              
                const handleChange = (newValue) => {
                  apiRef.current.setEditCellValue({ id, field, value: newValue });
                };
                return (
                    <Select
                    name={"mapPins"}
                    value={value}
                    onChange={(val) => handleChange(val.target.value)}
                  >
                    {options.map((option) => {
                      return <MenuItem key={option.id} value={option.id}><img src={option.pinSrc} width={20} /></MenuItem>
                    })}
                  </Select>
                );
            },
            //headerStyle: { width: "110px"},
            //editable: true,
            //editor: {
            //    type: Type.SELECT,
            //    options: options.map(m => { return {value: m.id, label: m.name}}) 
            //  }
        }}

        const renderRatingEditInputCell = (params, options) => {
            return RatingEditInputCell(params, options );
          };

        function RatingEditInputCell(props, options) {
            
          }