import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { viewsService, elementsService, mapsService, pilgrimagesService, yearsService, accountService } from "../../_services";
import { Role } from "../role";
export const Context = createContext({});

export const Provider = (props) => {
  
  // Initial values are obtained from the props
  const {
    pilgrimages: initialPilgrimages,
    views: initialViews,
    mapPins: initialMapPins,
    maps: initialMaps,
    elements: initialElements,
    set: initialSet,
    children
  } = props;

  // Use State to keep the values
  const [pilgrimages, setPilgrimages] = useState(initialPilgrimages);
  const [views, setViews] = useState(initialViews);
  const [mapPins, setMapPins] = useState(initialMapPins);
  const [maps, setMaps] = useState(initialMaps);
  const [elements, setElements] = useState(initialElements);
  const [set, setSet] = useState(initialSet);

  function addContext(a) {
      updatePilgrimages()
      if(accountService.userValue.role != Role.Admin){
        updateViews(a)
        updateElements(a)
        updateMaps(a)
      }
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

  function updatePilgrimages() {
    pilgrimagesService.getPilgrimages().then(setPilgrimages);
  }

  const resetContext = () => {
    setPilgrimages([]);
    setViews([]);
    setMapPins([]);
    setMaps([]);
    setElements([]);
    setSet(false);
  };

  function setContext(a) {
    addContext(a);
    setSet(true);
  }

  function isSet(a) {
    if (!set) return setContext(a);
  }

  // Make the context object:
  const appContext = {
    views,
    updateViews,
    mapPins,
    maps,
    updateMaps,
    elements,
    updateElements,
    pilgrimages,
    updatePilgrimages,
    setContext,
    resetContext,
    isSet,
    setSet,
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
  pilgrimages: PropTypes.array
};

Provider.defaultProps = {
  views: [],
  mapPins: [],
  maps: [],
  elements: [],
  pilgrimages: [],
  set: false
};
