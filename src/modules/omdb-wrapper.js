import axios from "axios";

const APIKEY = "57d564f6";

const OMDBSearchByPage = async (searchText, page = 1) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: []
  };

  try {
    const url = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;
    const response = await axios.get(url);
    const data = response.data;

    if (data.Response === "True") {
      returnObject.respuesta = true;
      returnObject.cantidadTotal = parseInt(data.totalResults);
      returnObject.datos = data.Search;
    }
  } catch (error) {
    console.error(error.message);
  }

  return returnObject;
};

const OMDBSearchComplete = async (searchText) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: []
  };

  try {
    let page = 1;
    let total = 0;
    let allResults = [];

    do {
      const parcial = await OMDBSearchByPage(searchText, page);

      if (!parcial.respuesta) break;

      total = parcial.cantidadTotal;
      allResults = allResults.concat(parcial.datos);

      page++;
    } while (allResults.length < total);

    if (allResults.length > 0) {
      returnObject.respuesta = true;
      returnObject.cantidadTotal = total;
      returnObject.datos = allResults;
    }

  } catch (error) {
    console.error(error.message);
  }

  return returnObject;
};

const OMDBGetByImdbID = async (imdbID) => {
  let returnObject = {
    respuesta: false,
    cantidadTotal: 0,
    datos: {}
  };

  try {
    const url = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`;
    const response = await axios.get(url);
    const data = response.data;

    if (data.Response === "True") {
      returnObject.respuesta = true;
      returnObject.cantidadTotal = 1;
      returnObject.datos = data;
    }
  } catch (error) {
    console.error(error.message);
  }

  return returnObject;
};

export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };