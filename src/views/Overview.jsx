import React, { useState, useContext, useEffect } from "react";
import { viewsService } from "@/_services";
import { ViewsTable } from "./elements/ViewsTable";
import { AppContext } from "../_helpers/context";
import SendToApp from "@/_components/SendToApp";
import MuiButton from "@/_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { history } from "../_helpers";

function Overview({ match, location }) {
  const { isSet, setData, yearId, years } = useContext(AppContext);
  const { path } = match;
  const [year, setYearId] = useState(yearId);
  useEffect(() => {
    isSet();
  }, []);
  useEffect(() => {
    setYearId(yearId);
  }, [yearId]);
  const handleChange = (event) => {
    viewsService.getViews(event.target.value).then((e) => {
      setYearId(event.target.value);
      setData(event.target.value);
    });
  };

  return (
    <div className="p-4 box-shadow-main">
      <div className="container ">
        <div>
          <h2>Widoki</h2>
        </div>
        <div className="d-flex">
          <div className="mr-auto d-flex align-items-center">
            {years.length > 1 && (
              <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Rok
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={year}
                  onChange={handleChange}
                >
                  {years.map((y) => {
                    return (
                      <MenuItem key={y.id} value={y.id}>
                        {y.year}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </div>
          <div className="d-flex align-items-center">
            <MuiButton
              icon={MuiBtnType.Add}
              text="Dodaj nowy widok"
              className="p-2 pr-4 pl-4"
              onClick={() =>
                history.push({
                  pathname: `${path}/dodaj`,
                  state: { yearId: year, parentViewId: null, opened: [] },
                })
              }
            />
          </div>
          <div className="d-flex align-items-center">
            <SendToApp />
          </div>
        </div>
        <ViewsTable
          parentViewId={null}
          yearId={year}
          path={path}
          opened={location.state?.opened}
        />
      </div>
    </div>
  );
}

export { Overview };
