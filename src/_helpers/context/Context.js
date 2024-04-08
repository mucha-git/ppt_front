import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import {
  viewsService,
  elementsService,
  mapsService,
  mapPinsService,
  applicationsService,
  yearsService,
  accountService,
} from "../../_services";
import { Role } from "../role";
export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const {
    applications: initialApplications,
    years: initialYears,
    yearId: initialYearId,
    views: initialViews,
    mapPins: initialMapPins,
    maps: initialMaps,
    elements: initialElements,
    set: initialSet,
    children,
  } = props;

  // Use State to keep the values
  const [applications, setApplications] = useState(initialApplications);
  const [years, setYears] = useState(initialYears);
  const [yearId, setYearId] = useState(initialYearId);
  const [views, setViews] = useState(initialViews);
  const [mapPins, setMapPins] = useState(initialMapPins);
  const [maps, setMaps] = useState(initialMaps);
  const [elements, setElements] = useState(initialElements);
  const [set, setSet] = useState(initialSet);

  async function setContext() {
    let id = await updateApplications();
    if (accountService.userValue.role != Role.Admin) {
      setData(id);
    }
    setSet(true);
  }

  function setData(a) {
    setYearId(a);
    updateViews(a);
    updateElements(a);
    updateMaps(a);
    updateMapPins(a);
  }

  function updateViews(a) {
    viewsService.getViews(a).then((a) => {
      setViews(a);
      return a;
    });
  }

  function updateElements(a) {
    elementsService.getElements(a).then((a) => {
      setElements(a);
      return a;
    });
  }

  function updateMaps(a) {
    mapsService.getMaps(a).then(setMaps);
  }

  function updateMapPins(a) {
    mapPinsService.getMapPins(a).then(setMapPins);
  }

  function updateYears() {
    yearsService.getYears().then(setYears);
  }

  async function updateApplications() {
    let ret = 0;
    await applicationsService.getApplications().then((p) => {
      setApplications(p);
      if (accountService.userValue.role != Role.Admin) {
        setYears(p[0].years);
        ret = p[0].years[p[0].years.length - 1].id;
      }
    });
    return ret;
  }

  const resetContext = () => {
    setApplications([]);
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
    applications,
    updateApplications,
    years,
    updateYears,
    yearId,
    setData,
    setContext,
    resetContext,
    isSet,
    set,
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
  applications: PropTypes.array,
  years: PropTypes.array,
};

Provider.defaultProps = {
  views: [],
  mapPins: [],
  maps: [],
  elements: [],
  applications: [],
  years: [],
  yearId: null,
  set: false,
};
