/* eslint-disable no-unused-vars */
import axios from "axios";
import qs from "qs";
import {
  allProducts,
  allProductsForUser,
  allCategories,
  allBrands,
  GetProduct,
  clearproduct,
  searchByName,
  filterByCategory,
  filterByBrand,
  sort,
  pagePaginated,
  urlpayment,
} from "../reducers/getProductsSlice";

import {
  getusercart,
  agregaracart,
  limpiarcart,
  quitaritem,
  urlcarpayment,
  totalapagar,
  comprartodolink,
  clearlinks,
  info,
} from "../reducers/Cart";

import { getFavorites, loggedUser, getCountries } from "../reducers/userSlice";
export const getProducts = (userId) => async (dispatch) => {
  console.log({ userId });
  if (userId)
    axios
      .get(`/products?userId=${userId}`)
      .then((res) => dispatch(allProductsForUser(res.data)))
      .catch((e) => console.log(e));
  else
    axios
      .get(`/products`)
      .then((res) => dispatch(allProducts(res.data)))
      .catch((e) => console.log(e));
};

export const getCategories = () => async (dispatch) => {
  axios
    .get(`/products/categories`)
    .then((res) => dispatch(allCategories(res.data)))
    .catch((e) => console.log(e));
};

export const getBrand = () => async (dispatch) => {
  axios
    .get(`/products/brands`)
    .then((res) => dispatch(allBrands(res.data)))
    .catch((e) => console.log(e));
};

export const getCountry = () => async (dispatch) => {
  axios
    .get(`/country`)
    .then((res) => dispatch(getCountries(res.data)))
    .catch((e) => console.log(e));
};

export const completeSignUp = (userId, data) => async (dispatch) => {
  await axios({
    method: "PATCH",
    url: `/user/${userId}`,
    data: data,
  }).catch((e) => console.log(e));
};

export const getUserFavorites = (userId) => async (dispatch) => {
  axios
    .get(`/user/favorites/${userId}`)
    .then((res) => dispatch(getFavorites(res.data.products)))
    .catch((e) => console.log(e));
};

export const addFavorites = (data) => async (dispatch) => {
  await axios({
    method: "POST",
    url: `/user/favorites`,
    data: data,
  })
    .then(() => dispatch(getProducts(data.userId)))
    .catch((e) => console.log(e));
};

export const deleteFavorites = (data) => async (dispatch) => {
  await axios({
    method: "DELETE",
    url: `/user/removeFromFavorites`,
    data: data,
  })
    .then(() => dispatch(getProducts(data.userId)))
    .then(() => dispatch(getUserFavorites(data.userId)))
    .catch((e) => console.log(e));
};

export const byCategory = (data) => async (dispatch) => {
  dispatch(filterByCategory(data));
};

export const byBrand = (data) => async (dispatch) => {
  dispatch(filterByBrand(data));
};

export const byOrderProducts = (data) => async (dispatch) => {
  dispatch(sort(data));
};

export const byOrderPrice = (data) => async (dispatch) => {
  dispatch(sort(data));
};

export const search = (input) => async (dispatch) => {
  dispatch(searchByName(input));
};

export const GetProductById = (id) => {
  return async function (dispatch) {
    const data = await axios.get(`/products/${id}`);
    console.log(data.data);
    dispatch(GetProduct(data.data));
  };
};
export const Clearproduct = () => {
  return async function (dispatch) {
    dispatch(clearproduct());
  };
};
export const createNewUser = (data) => async () => {
  await axios({
    method: "POST",
    url: `/user/register`,
    data: data,
  }).catch((e) => console.log(e));
};

export const currentPagePaginated = (page) => async (dispatch) => {
  dispatch(pagePaginated(page));
};

export const createNewProduct = (data) => async () => {
  await axios({
    method: "POST",
    url: `/products`,
    data: data,
  }).catch((e) => console.log(e));
};

// export const currentPagePaginated = (page) => async (dispatch) => {
//   dispatch(pagePaginated(page));
// };

export function getCurrentUser(user) {
  // Obtener la info del user loggeado

  return async function (dispatch) {
    console.log("USER ACTION: ", user);

    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        // "Authorization": "Bearer " + await token()
      },
    };

    let json = await axios.post(`/user/login/`, user);
    dispatch(loggedUser(json.data?.data));
    dispatch(getusercart(json.data?.data.cart.products));
  };
}
export const buyproduct = (quantity, id) => {
  const getproduct = {
    quantity: quantity,
  };
  return async function (dispatch) {
    const url = await axios.post(`/store/${id}`, getproduct);

    dispatch(urlpayment(url.data));
  };
};
export const buyproductcart = (quantity, id) => {
  const getproduct = {
    quantity: quantity,
  };
  return async function (dispatch) {
    const url = await axios.post(`/store/${id}`, getproduct);
    console.log(url.data);
    dispatch(urlcarpayment(url.data));
  };
};

export const addtocart = (userId, productId, qty, product) => {
  const adddingtocart = {
    userId: userId,
    productId: productId,
    qty: qty,
  };
  return async function (dispatch) {
    await axios.post(`/store/add`, adddingtocart);
    dispatch(agregaracart(product));
  };
};

export const cleancart = (userId) => {
  const borrado = {
    userId: userId,
  };
  return async function (dispatch) {
    await axios.post(`/store/clean`, borrado);
    dispatch(limpiarcart());
  };
};

export const clearlink = () => {
  return async function (dispatch) {
    dispatch(clearlinks());
  };
};

export const comprartodo = (userid) => {
  const final = {
    userId: userid,
  };

  return async function (dispatch) {
    const url = await axios.post(`/store/buyall`, final);
    dispatch(comprartodolink(url.data));
  };
};

export const Rectificar = () => {
  return async function (dispatch) {
    const url = await axios.post(`/store/payments`);
    console.log("accion url" + url);
    dispatch(info(url));
  };
};

export const alltopay = (total) => {
  return async function (dispatch) {
    dispatch(totalapagar(total));
  };
};

export const removeritem = (productId, userId) => {
  const removeitem = {
    userId: userId,
    productId: productId,
  };

  return async function (dispatch) {
    await axios.post(`/store/remove`, removeitem);
    dispatch(quitaritem(productId));
  };
};
