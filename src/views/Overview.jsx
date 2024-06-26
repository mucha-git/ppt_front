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
    <div className="pad-4 box-shadow-main">
      <div className="container ">
        <div className="titleText">
          <h2 data-testid='widoki-title-text'>Widoki</h2>
        </div>
        <div className="d-flex colDirection">
          <div className="mr-auto d-flex align-items-center">
            {years.length > 1 && (
              <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Wydarzenie
                </InputLabel>
                <Select
                  data-testid='widoki-rok-dropdown'
                  value={year}
                  onChange={handleChange}
                >
                  {years.map((y) => {
                    return (
                      <MenuItem data-testid={`widoki-${y.id}-option`} key={y.id} value={y.id}>
                        {y.yearTopic}
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
              data-testid='widoki-dodajWidok-button'
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
