import React, { useState, useContext, useEffect } from "react";
import { mapsService } from "@/_services";
import * as Yup from "yup";
import { MapsTable } from "./elements/MapsTable";
import {AppContext} from '../_helpers/context'
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import SendToApp from "../_components/SendToApp";
import { NavLink } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Overview({ match }) {
  const {isSet, setData, yearId, years} = useContext(AppContext)
  const { path } = match;
  const [year, setYearId] = useState(yearId);

  useEffect(() => {
    isSet()
  }, []);

  const handleChange = (event) => {
    mapsService.getMaps(event.target.value).then(e => {setYearId(event.target.value); setData(event.target.value)});
  };

  return (
    <div className="p-4 box-shadow-main">
      <div className="container">
      <div><h2>Mapy</h2></div>
      <div className="d-flex">
        
        <div className="mr-auto">
        {years.length > 1 && 
        <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-filled-label">Rok</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={year}
          onChange={handleChange}
        >
          {years.map(y => {return <MenuItem key={y.id} value={y.id}>{y.year}</MenuItem>})}
        </Select>
      </FormControl>
        }
        </div>
        <div>
          <NavLink to={{pathname: `${path}/dodaj`, state: {yearId: year } }} className="nav-item center-divs">
            <MuiButton icon={MuiBtnType.Add} text="Dodaj nową mapę" className="p-2 pr-4 pl-4" />
          </NavLink>
        </div>
        <div><SendToApp /></div>
        </div>
        <MapsTable yearId={year} path={path} />
      </div>
    </div>
  );
}

export { Overview };