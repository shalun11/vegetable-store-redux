import { createSlice } from '@reduxjs/toolkit';

interface QuantitiesState {
  quantities: Record<number, number>;
}

const initialState: QuantitiesState = {
  quantities: {},
};

const quantitiesSlice = createSlice({
  name: 'quantities',
  initialState,
  reducers: {
    setQuantity: (state, action: { payload: { productId: number; quantity: number } }) => {
      state.quantities[action.payload.productId] = action.payload.quantity;
    },
    resetQuantity: (state, action: { payload: number }) => {
      state.quantities[action.payload] = 0;
    },
  },
});

export const { setQuantity, resetQuantity } = quantitiesSlice.actions;
export default quantitiesSlice.reducer;