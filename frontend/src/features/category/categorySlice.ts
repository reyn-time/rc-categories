import { PlainMessage, toPlainMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryService } from "../../gen/proto/category/v1/category_connect";
import { Category } from "../../gen/proto/category/v1/category_pb";

const client = createPromiseClient(
  CategoryService,
  createConnectTransport({
    baseUrl: "http://localhost:8080",
  })
);

interface CategoryState {
  categories: PlainMessage<Category>[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | undefined;
}

const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: undefined,
};

export const listCategory = createAsyncThunk(
  "category/listCategory",
  async () => {
    const response = await client.listCategory({});
    return response.categories.map(toPlainMessage);
  }
);

export const categorySlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(listCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(listCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
