import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    addedToCart: {},
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
          state.addedToCart[name] = true;     //this is not part of the course, but it fixes shopping cart bug where removing items will not re-enable Add to Cart buttons
        }
        state.totalItems ++
      },
    removeItem: (state, action) => {
        let objectRemoved = null

        state.items.map((item) => 
        {if (item.name === action.payload) {
            objectRemoved = item
        }})
        
        let quantityRemoved = objectRemoved.quantity

        state.items = state.items.filter(item => item.name !== action.payload)

        state.totalItems = state.totalItems - quantityRemoved

        state.addedToCart[objectRemoved.name] = false   //this is not part of the course, but it fixes shopping cart bug where removing items will not re-enable Add to Cart buttons
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
