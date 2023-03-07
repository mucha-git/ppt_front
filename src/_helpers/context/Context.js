import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { viewsService, elementsService, mapsService, mapPinsService, pilgrimagesService, yearsService, accountService } from "../../_services";
import { Role } from "../role";
export const Context = createContext({});

export const Provider = (props) => {
  
  // Initial values are obtained from the props
  const {
    pilgrimages: initialPilgrimages,
    years: initialYears,
    yearId: initialYearId,
    views: initialViews,
    mapPins: initialMapPins,
    maps: initialMaps,
    elements: initialElements,
    set: initialSet,
    children
  } = props;

  // Use State to keep the values
  const [pilgrimages, setPilgrimages] = useState(initialPilgrimages);
  const [years, setYears] = useState(initialYears);
  const [yearId, setYearId] = useState(initialYearId);
  const [views, setViews] = useState(initialViews);
  const [mapPins, setMapPins] = useState(initialMapPins);
  const [maps, setMaps] = useState(initialMaps);
  const [elements, setElements] = useState(initialElements);
  const [set, setSet] = useState(initialSet);

  async function setContext() {
      let id = await updatePilgrimages()
      if(accountService.userValue.role != Role.Admin){
        setData(id)
      }
      setSet(true);
  }

  function setData(a){
        setYearId(a);
        updateViews(a)
        updateElements(a)
        updateMaps(a)
        updateMapPins(a)
  }

  function updateViews(a) {
    viewsService.getViews(a).then(setViews);
  }

  function updateElements(a) {
    elementsService.getElements(a).then(setElements);
  }

  function updateMaps(a) {
    mapsService.getMaps(a).then(setMaps);
  }

  function updateMapPins(a) {
    mapPinsService.getMapPins(a).then(setMapPins);
  }

  function updateYears(a) {
    yearsService.getYears(a).then(setYears);
  }

  async function updatePilgrimages() {
    let ret = 0;
    await pilgrimagesService.getPilgrimages().then(p => {
      setPilgrimages(p);
      if(accountService.userValue.role != Role.Admin){
        setYears(p[0].years);
        ret = p[0].years[p[0].years.length -1].id
      }
    });
    return ret;
  }

  const resetContext = () => {
    setPilgrimages([]);
    setYears([]);
    setYearId(null);
    setViews([]);
    setMapPins([]);
    setMaps([]);
    setElements([]);
    setSet(false);
  };

  function isSet() {
    if (!set) {
      return setContext();
    }
  }

  // Make the context object:
  const appContext = {
    views,
    updateViews,
    mapPins,
    updateMapPins,
    maps,
    updateMaps,
    elements,
    updateElements,
    pilgrimages,
    updatePilgrimages,
    years,
    updateYears,
    yearId,
    setData,
    setContext,
    resetContext,
    isSet,
    set
  };

  // pass the value in provider and return
  return <Context.Provider value={appContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  views: PropTypes.array,
  mapPins: PropTypes.array,
  maps: PropTypes.array,
  elements: PropTypes.array,
  pilgrimages: PropTypes.array,
  years: PropTypes.array
};

Provider.defaultProps = {
  views: [],
  mapPins: [],
  maps: [],
  elements: [],
  pilgrimages: [],
  years: [],
  yearId: null,
  set: false
};
