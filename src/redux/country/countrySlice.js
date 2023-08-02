import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://restcountries.com/v3.1/all';

const initialState = {
  countryList: [],
  status: 'idle',
  error: null,
};

export const fetchCountryList = createAsyncThunk(
  'fetchCountryList',
  async (thunkAPI) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      const data = result.map((item) => ({
        name: item.name.common,
        capital: item.capital,
        continent: item.continents[0],
        subregion: item.subregion,
        flag: item.flags.png,
        population: item.population,
        map: item.maps.googleMaps,
        area: item.area,
        location: item.latlng,
        timezones: item.timezones[0],
      }));
      return data;
    } catch {
      return thunkAPI.rejectWithValue('Error fetching country list');
    }
  },
);

const countrySlice = createSlice({
  name: 'countryName',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryList.pending, (state) => ({
        ...state,
        status: 'loading',
      }))

      .addCase(fetchCountryList.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        countryList: action.payload,
      }))

      .addCase(fetchCountryList.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload,
      }));
  },
});

export default countrySlice.reducer;
