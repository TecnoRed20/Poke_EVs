export const ADD_DATA = 'ADD_DATA';
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const UPDATE_TOTAL_LIMIT = 'UPDATE_TOTAL_LIMIT';

export const addData = (names) => ({
  type: ADD_DATA,
  payload: names
});

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST
});

export const fetchDataSuccess = () => ({
  type: FETCH_DATA_SUCCESS
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error
});

export const updateTotalLimit = (total) => ({
  type: UPDATE_TOTAL_LIMIT,
  payload: total
});

export const fetchData = (limit, offset) => async (dispatch) => {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  dispatch(fetchDataRequest());

  try {
    const response = await fetch(apiUrl);
    const dataURLs = await response.json();
    dispatch(updateTotalLimit(dataURLs.count));

    // data.urls asumiendo que es la lista de URLs devuelta
    const dataRequests = dataURLs.results.map(result =>
      fetch(result.url)
        .then(response => response.json())
        .then(data => data)
    );

    const data = await Promise.all(dataRequests);
    dispatch(addData(data));
    dispatch(fetchDataSuccess());
  } catch (error) {
    console.error('Error fetching data:', error);
    dispatch(fetchDataFailure(error));
  }
};
