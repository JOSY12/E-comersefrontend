import axios from "axios";
import
{
  allProducts,
  allCategories,
  allBrands,
  GetProduct,
  clearproduct,
  searchByName,
  filterByCategory,
  filterByBrand,
  sort,
} from "../reducers/getProductsSlice";

const api = "http://localhost:3001";

export const getProducts = () => async (dispatch) =>
{
  axios
    .get(`${api}/products`)
    .then((res) => dispatch(allProducts(res.data)))
    .catch((e) => console.log(e));
};

export const getCategories = () => async (dispatch) =>
{
  axios
    .get(`${api}/products/categories`)
    .then((res) => dispatch(allCategories(res.data)))
    .catch((e) => console.log(e));
};

export const getBrand = () => async (dispatch) =>
{
  axios
    .get(`${api}/products/brands`)
    .then((res) => dispatch(allBrands(res.data)))
    .catch((e) => console.log(e));
};

export const byCategory = (data) => async (dispatch) =>
{
  dispatch(filterByCategory(data));
};

export const byBrand = (data) => async (dispatch) =>
{
  dispatch(filterByBrand(data));
};

export const byOrderProducts = (data) => async (dispatch) =>
{
  dispatch(sort(data));
};

export const byOrderPrice = (data) => async (dispatch) =>
{
  dispatch(sort(data));
};

export const search = (input) => async (dispatch) =>
{
  dispatch(searchByName(input));
}

export const GetProductById = (id) =>
{
  return async function (dispatch)
  {
    const data = await axios.get(`${api}/products/${id}`);
    console.log(data.data);
    dispatch(GetProduct(data.data));
  };
};
export const Clearproduct = () =>
{
  return async function (dispatch)
  {
    dispatch(clearproduct());
  };
};
export const createNewUser = (data) => async () =>
{
  await axios({
    method: "POST",
    url: `${api}/user/register`,
    data: data,
  }).catch((e) => console.log(e));
};
