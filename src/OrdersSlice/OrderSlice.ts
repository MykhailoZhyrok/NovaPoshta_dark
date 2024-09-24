import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Order {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  comments: [];
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  comments:[],
  error: null,
};

export const fetchOrders = createAsyncThunk<Order[], void>('orders/fetchOrders', async () => {
  const response = await axios.get<Order[]>('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});


const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
        
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch posts';
      })
  },
});

export default ordersSlice.reducer;