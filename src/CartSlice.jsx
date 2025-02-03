import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalItems: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({ name, image, cost, quantity: 1 });
        }
        state.totalItems ++
      },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload)

        state.totalItems --
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
          let changeAmount = quantity - itemToUpdate.quantity

          if (itemToUpdate.quantity == 0 && changeAmount < 0) {
          } else {
            itemToUpdate.quantity = quantity;

            state.totalItems = state.totalItems + changeAmount
          }
          
        }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
