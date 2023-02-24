import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { viewsService, elementsService, mapsService } from "../../_services";
export const Context = createContext({});

export const Provider = (props) => {
  
  // Initial values are obtained from the props
  const {
    views: initialViews,
    mapPins: initialMapPins,
    maps: initialMaps,
    elements: initialElements,
    set: initialSet,
    children
  } = props;

  // Use State to keep the values
  const [views, setViews] = useState(initialViews);
  const [mapPins, setMapPins] = useState(initialMapPins);
  const [maps, setMaps] = useState(initialMaps);
  const [elements, setElements] = useState(initialElements);
  const [set, setSet] = useState(initialSet);

  function addContext(a) {
      viewsService.getViews(a).then(setViews);
      elementsService.getElements(a).then(setElements);
      mapsService.getMaps(a).then(setMaps);
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

  const resetContext = () => {
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
  elements: PropTypes.array
};

Provider.defaultProps = {
  views: [],
  mapPins: [],
  maps: [],
  elements: [],
  set: false
};
