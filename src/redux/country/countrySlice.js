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
      return result.data;
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
      .addCase(fetchCountryList.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(fetchCountryList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countryList = action.payload;
      })

      .addCase(fetchCountryList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default countrySlice.reducer;
