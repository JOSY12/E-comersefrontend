/* eslint-disable no-unused-vars */
import axios from "axios";
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
  deleteProduct,
  deleteBaneoProduct,
  restoreBanProduct,
  getBanerProd,
  setRelatedProducts,
  deleteRestoreProduct,
  searchByProductBaner,
  sortProductBaner,
} from "../reducers/getProductsSlice";

import {
  getusercart,
  agregaracart,
  limpiarcart,
  quitaritem,
  totalapagar,
  comprartodolink,
  clearlinks,
  info,
  todaslascompras,
  updatecartitem,
  agregarcomprado,
} from "../reducers/Cart";

import {
  getFavorites,
  loggedUser,
  getCountries,
  allUser,
  deleteUser,
  searchByUser,
  sortUser,
  baneoUser,
  restoreBanUser,
  deleteRestoreUser,
  getBanUser,
  createUserAddress,
  deleteUserAddress,
  updateUser,
  searchByUserBaner,
  sortUserBaner,
} from "../reducers/userSlice";

const { REACT_APP_MPAGOTOKEN } = process.env;
export const getProducts = (userId) => async (dispatch) => {
  if (userId)
    axios
      .get(`/products?userId=${userId}`)
      .then((res) => dispatch(allProductsForUser(res.data)))
      .catch((error) => {
        throw new Error(error);
      });
  else
    axios
      .get(`/products`)
      .then((res) => dispatch(allProducts(res.data)))
      .catch((error) => {
        throw new Error(error);
      });
};

export const getCategories = () => async (dispatch) => {
  axios
    .get(`/products/categories`)
    .then((res) => dispatch(allCategories(res.data)))
    .catch((error) => {
      throw new Error(error);
    });
};

export const getBrand = () => async (dispatch) => {
  axios
    .get(`/products/brands`)
    .then((res) => dispatch(allBrands(res.data)))
    .catch((error) => {
      throw new Error(error);
    });
};

export const getCountry = () => async (dispatch) => {
  axios
    .get(`/country`)
    .then((res) => dispatch(getCountries(res.data)))
    .catch((error) => {
      throw new Error(error);
    });
};

export const completeSignUp = (userId, data) => async (dispatch) => {
  await axios({
    method: "PATCH",
    url: `/user/${userId}`,
    data: data,
  }).catch((error) => {
    throw new Error(error);
  });
};

export const getUserFavorites = (userId) => async (dispatch) => {
  axios
    .get(`/user/favorites/${userId}`)
    .then((res) => dispatch(getFavorites(res.data.products)))
    .catch((error) => {
      throw new Error(error);
    });
};

export const addFavorites = (data) => async (dispatch) => {
  await axios({
    method: "POST",
    url: `/user/favorites/`,
    data: data,
  })
    .then(() => dispatch(getProducts(data.userId)))
    .catch((error) => {
      throw new Error(error);
    });
};

export const deleteFavorites = (data) => async (dispatch) => {
  await axios({
    method: "DELETE",
    url: `/user/removeFromFavorites`,
    data: data,
  })
    .then(() => dispatch(getProducts(data.userId)))
    .then(() => dispatch(getUserFavorites(data.userId)))
    .catch((error) => {
      throw new Error(error);
    });
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

export const byOrderProductsBaner = (data) => async (dispatch) => {
  dispatch(sortProductBaner(data));
};

export const byOrderUsers = (data) => async (dispatch) => {
  dispatch(sortUser(data));
};

export const byOrderUsersBaner = (data) => async (dispatch) => {
  dispatch(sortUserBaner(data));
};

export const searchUsers = (input) => async (dispatch) => {
  dispatch(searchByUser(input));
};

export const searchUsersBaner = (input) => async (dispatch) => {
  dispatch(searchByUserBaner(input));
};

export const searchProductsBaner = (input) => async (dispatch) => {
  dispatch(searchByProductBaner(input));
};

export const byOrderPrice = (data) => async (dispatch) => {
  dispatch(sort(data));
};

export const search = (input) => async (dispatch) => {
  dispatch(searchByName(input));
};

export const GetProductById = (id) => {
  return async function(dispatch) {
    const data = await axios.get(`/products/${id}`);
    dispatch(GetProduct(data.data));
  };
};
export const Clearproduct = () => {
  return async function(dispatch) {
    dispatch(clearproduct());
  };
};
export const createNewUser = (data) => async () => {
  await axios({
    method: "POST",
    url: `/user/register`,
    data: data,
  }).catch((error) => {
    throw new Error(error);
  });
};
export const getRelatedProducts = (product) => async (dispatch) => {
  const { tags } = product;
  console.log(product);
  const taggedProducts = [];
  try {
    let productsraw = await axios.get("/products");
    const products = productsraw.data;
    const relatedProducts = products.filter(
      (p) => p.tags !== null && p.id !== product.id
    );
    for (let i = 0; i < relatedProducts.length; i++) {
      let k = Math.floor(Math.random() * relatedProducts.length);
      let temp = relatedProducts[i];
      relatedProducts[i] = relatedProducts[k];
      relatedProducts[k] = temp;
    }

    for (let i = 0; i < tags?.length; i++) {
      for (let j = 0; j < relatedProducts.length; j++) {
        if (
          relatedProducts[j].tags.includes(tags[i]) &&
          !taggedProducts.includes(relatedProducts[j])
        ) {
          taggedProducts.push(relatedProducts[j]);
        }
      }
    }
    dispatch(setRelatedProducts(taggedProducts));
  } catch (error) {
    throw new Error(error);
  }
};
export const currentPagePaginated = (page) => async (dispatch) => {
  dispatch(pagePaginated(page));
};

export const createNewProduct = (data) => async () => {
  await axios({
    method: "POST",
    url: `/products`,
    data: data,
  }).catch((error) => {
    throw new Error(error);
  });
};

export function getCurrentUser(user) {
  // Obtener la info del user loggeado

  return async function(dispatch) {
    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        // "Authorization": "Bearer " + await token()
      },
    };

    let json = await axios.post(`/user/login/`, user);

    if (json.data.created) {
      window.location.replace(
        `${window.location.href}user/${json.data.data.id}`
      );
    }

    dispatch(loggedUser(json.data?.data));
    dispatch(getusercart(json.data?.data.cart.products));
  };
}

export const buyproduct = (
  quantity,
  id,
  userId,
  {
    Apellido,
    Barrio,
    tipoCalle,
    Ciudad,
    Estado,
    Nombre,
    Pais,
    Prefijo,
    Telefono,
    calle1,
    calle2,
    zipcode,
    numerocalle,
  }
) => {
  const getproduct = {
    quantity,
    userId,
    Apellido,
    Barrio,
    tipoCalle,
    numerocalle,
    Ciudad,
    Estado,
    Nombre,
    Pais,
    Prefijo,
    Telefono,
    calle1,
    calle2,
    zipcode,
  };
  console.log(getproduct);
  return async function(dispatch) {
    const url = await axios.post(`/store/${id}`, getproduct);

    dispatch(urlpayment(url.data.init_point));
  };
};

export const addtocart = (userId, productId, qty, product) => {
  const adddingtocart = {
    userId,
    productId,
    qty,
  };
  return async function(dispatch) {
    await axios.post(`/store/add`, adddingtocart);
    dispatch(agregaracart(product));
  };
};

export const addcomprado = (
  userId,
  {
    preference_id,
    status,
    collection_id,
    collection_status,
    payment_type,
    merchant_order_id,
  }
) => async (dispatch) => {
  const compra = {
    userId,
    preference_id,
    status,
    collection_id,
    collection_status,
    payment_type,
    merchant_order_id,
  };
  await axios.post(`/store/paymentcomplete`, compra);
};

export const updatecart = (userId, productId, qty) => {
  const updated = {
    userId,
    productId,
    qty,
  };
  return async function(dispatch) {
    dispatch(updatecartitem(updated));
  };
};

export const cleancart = (userId) => {
  const borrado = {
    userId,
  };
  return async function(dispatch) {
    await axios.post(`/store/clean`, borrado);
    dispatch(limpiarcart());
  };
};

export const clearlink = () => {
  return async function(dispatch) {
    dispatch(clearlinks());
  };
};

export const comprartodo = (
  Cartitems,
  userId,
  {
    Apellido,
    Barrio,
    Calle,
    Ciudad,
    Estado,
    Nombre,
    Pais,
    Prefijo,
    Telefono,
    calle1,
    calle2,
    zipcode,
    tipoCalle,
    numerocalle,
  }
) => {
  const final = {
    userId,
    Cartitems,
    Apellido,
    Barrio,
    Calle,
    Ciudad,
    Estado,
    Nombre,
    Pais,
    Prefijo,
    Telefono,
    calle1,
    calle2,
    zipcode,
    tipoCalle,
    numerocalle,
  };

  return async function(dispatch) {
    const url = await axios.post(`/store/buyall`, final);

    dispatch(comprartodolink(url.data.init_point));
  };
};

export const getuserpaymets = (userId) => {
  const final = {
    userId,
  };
  return async function(dispatch) {
    const pagos = await axios.post(`/store/payments`, final);

    dispatch(info(pagos.data));
  };
};

export const alldatapagos = (collection_id) => {
  return async function(dispatch) {
    const confimacion = await axios.get(
      `https://api.mercadopago.com/v1/payments/${collection_id}`,
      {
        headers: {
          Authorization: `Bearer ${REACT_APP_MPAGOTOKEN}`,
        },
      }
    );

    for (let e of confimacion.data.additional_info.items) {
      const items = {
        idcompra: confimacion.data.id,
        title: e.title,
        id: e.id,
        quantity: e.quantity,
        picture_url: e.picture_url,
        unit_price: e.unit_price,
      };
      dispatch(agregarcomprado(items));
    }
  };
};

// export const datadecompra = (preference_id) => {
//   return async function (dispatch) {
//     const response = await axios.get(
//       `https://api.mercadopago.com/checkout/preferences/${preference_id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${REACT_APP_MPAGOTOKEN}`,
//         },
//       }
//     );
//     console.log(response);
//   };
// };

export const getdataadmin = () => {
  return async function(dispatch) {
    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=H-COMERSEHENRY`,

      {
        headers: {
          Authorization: `Bearer ${REACT_APP_MPAGOTOKEN}`,
        },
      }
    );

    var Lima = 0;
    var Arequipa = 0;
    var Bogota = 0;
    var Manta = 0;
    var Santo_Domingo = 0;
    var Cuenca = 0;
    var Guayaquil = 0;
    var Quito = 0;
    var Merida = 0;
    var Queretaro = 0;
    var Monterrey = 0;
    var Guadalajara = 0;
    var CDMX = 0;
    var Tucuman = 0;
    var Santa_Fe = 0;
    var Mendoza = 0;
    var Cordoba = 0;
    var Buenos_Aires = 0;
    var Cajamarca = 0;
    var Huancayo = 0;
    var Trujillo = 0;
    var Cali = 0;
    var Barranquilla = 0;
    var Medellin = 0;
    var Cartagena = 0;
    var Montevideo = 0;
    var Canelones = 0;
    var Maldonado = 0;
    var Salto = 0;
    var Rivera = 0;
    var Caracas = 0;
    var Maracaibo = 0;
    var Maracay = 0;
    var Valencia = 0;
    var Guayana = 0;
    var Asuncion = 0;
    var Encarnacion = 0;
    var Ciudad_del_Este = 0;
    var San_Cosme = 0;
    var San_Bernardino = 0;
    var La_Paz = 0;
    var Sucre = 0;
    var Santa_Cruz = 0;
    var Potosi = 0;
    var Cochabamba = 0;
    const usuarios = [];

    if (response.data.results) {
      if (response.data.results !== undefined) {
        for (let e of response.data.results) {
          if (
            e.additional_info.shipments !== undefined &&
            e.additional_info.shipments.receiver_address !== undefined &&
            e.additional_info.shipments.receiver_address.city_name !== undefined
          ) {
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Bogota"
            )
              Bogota += 1;

            if (
              e.additional_info.shipments.receiver_address.city_name === "Lima"
            )
              Lima += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Arequipa"
            )
              Arequipa += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name === "Manta"
            )
              Manta += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Santo Domingo"
            )
              Santo_Domingo += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Guayaquil"
            )
              Guayaquil += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name === "Quito"
            )
              Quito += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Queretaro"
            )
              Queretaro += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Monterrey"
            )
              Monterrey += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Guadalajara"
            )
              Guadalajara += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name === "CDMX"
            )
              CDMX += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Tucuman"
            )
              Tucuman += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Santa Fe"
            )
              Santa_Fe += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Mendoza"
            )
              Mendoza += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Cordoba"
            )
              Cordoba += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Buenos Aires"
            )
              Buenos_Aires += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Cajamarca"
            )
              Cajamarca += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Huancayo"
            )
              Huancayo += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Trujillo"
            )
              Trujillo += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name === "Cali"
            )
              Cali += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Barranquilla"
            )
              Barranquilla += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Medellin"
            )
              Medellin += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Cartagena"
            )
              Cartagena += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Montevideo"
            )
              Montevideo += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Canelones"
            )
              Canelones += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Maldonado"
            )
              Maldonado += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name === "Salto"
            )
              Salto += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Rivera"
            )
              Rivera += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Caracas"
            )
              Caracas += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Maracaibo"
            )
              Maracaibo += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Maracay"
            )
              Maracay += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Valencia"
            )
              Valencia += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Guayana"
            )
              Guayana += 1;

            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Asuncion"
            )
              Asuncion += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Encarnacion"
            )
              Encarnacion += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Ciudad del Este"
            )
              Ciudad_del_Este += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "San Cosme"
            )
              San_Cosme += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "San Bernardino"
            )
              San_Bernardino += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "La Paz"
            )
              La_Paz += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name === "Sucre"
            )
              Sucre += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Santa Cruz"
            )
              Santa_Cruz += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Cuenca"
            )
              Cuenca += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Merida"
            )
              Merida += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Potosi"
            )
              Potosi += 1;
            if (
              e.additional_info.shipments.receiver_address.city_name ===
              "Cochabamba"
            )
              Cochabamba += 1;
            usuarios.push({
              Usuario: e.additional_info.payer.first_name,
              items: e.additional_info.items,
            });
          }
        }
      }
    }

    var ciudades = [
      { Ciudad: "Bogota", Cantidad: Bogota },
      { Ciudad: "Lima", Cantidad: Lima },
      { Ciudad: "Arequipa", Cantidad: Arequipa },
      { Ciudad: "Manta", Cantidad: Manta },
      { Ciudad: "Santo Domingo", Cantidad: Santo_Domingo },
      { Ciudad: "Cuenca", Cantidad: Cuenca },
      { Ciudad: "Guayaquil", Cantidad: Guayaquil },
      { Ciudad: "Quito", Cantidad: Quito },
      { Ciudad: "Merida", Cantidad: Merida },
      { Ciudad: "Queretaro", Cantidad: Queretaro },
      { Ciudad: "Monterrey", Cantidad: Monterrey },
      { Ciudad: "Guadalajara", Cantidad: Guadalajara },
      { Ciudad: "CDMX", Cantidad: CDMX },
      { Ciudad: "Tucuman", Cantidad: Tucuman },
      { Ciudad: "Santa_Fe", Cantidad: Santa_Fe },
      { Ciudad: "Mendoza", Cantidad: Mendoza },
      { Ciudad: "Cordoba", Cantidad: Cordoba },
      { Ciudad: "Buenos Aires", Cantidad: Buenos_Aires },
      { Ciudad: "Cajamarca", Cantidad: Cajamarca },
      { Ciudad: "Huancayo", Cantidad: Huancayo },
      { Ciudad: "Trujillo", Cantidad: Trujillo },
      { Ciudad: "Cali", Cantidad: Cali },
      { Ciudad: "Barranquilla", Cantidad: Barranquilla },
      { Ciudad: "Medellin", Cantidad: Medellin },
      { Ciudad: "Cartagena", Cantidad: Cartagena },
      { Ciudad: "Montevideo", Cantidad: Montevideo },
      { Ciudad: "Canelones", Cantidad: Canelones },
      { Ciudad: "Maldonado", Cantidad: Maldonado },
      { Ciudad: "Salto", Cantidad: Salto },
      { Ciudad: "Rivera", Cantidad: Rivera },
      { Ciudad: "Caracas", Cantidad: Caracas },
      { Ciudad: "Maracaibo", Cantidad: Maracaibo },
      { iudad: "Maracay", Cantidad: Maracay },
      { Ciudad: "Valencia", Cantidad: Valencia },
      { Ciudad: "Guayana", Cantidad: Guayana },
      { Ciudad: "Asuncion", Cantidad: Asuncion },
      { Ciudad: "Encarnacion", Cantidad: Encarnacion },
      { Ciudad: "Ciudad del Este", Cantidad: Ciudad_del_Este },
      { Ciudad: "San Cosme", Cantidad: San_Cosme },
      { Ciudad: "San Bernardino", Cantidad: San_Bernardino },
      { Ciudad: "La Paz", Cantidad: La_Paz },
      { Ciudad: "Sucre", Cantidad: Sucre },
      { Ciudad: "Santa Cruz", Cantidad: Santa_Cruz },
      { Ciudad: "Potosi", Cantidad: Potosi },
      { Ciudad: "Cochabamba", Cantidad: Cochabamba },
    ];

    var Argentina = 0;
    var Brasil = 0;
    var Chile = 0;
    var México = 0;
    var Uruguay = 0;
    var Colombia = 0;
    var Perú = 0;
    var Bolivia = 0;
    var Paraguay = 0;
    var Venezuela = 0;

    for (let e of response.data.results) {
      if (e.currency_id === "COP") {
        Colombia += 1;
      }
      if (e.currency_id === "ARS") {
        Argentina += 1;
      }
      if (e.currency_id === "BRL") {
        Brasil += 1;
      }
      if (e.currency_id === "CLP") {
        Chile += 1;
      }
      if (e.currency_id === "MXN") {
        México += 1;
      }
      if (e.currency_id === "UYU") {
        Uruguay += 1;
      }
      if (e.currency_id === "PEN") {
        Perú += 1;
      }
      if (e.currency_id === "BOB") {
        Bolivia += 1;
      }
      if (e.currency_id === "PYG") {
        Paraguay += 1;
      }
      if (e.currency_id === "VES") {
        Venezuela += 1;
      }
    }

    var listapaises = [
      { Pais: "Colombia", Cantidad: Colombia },
      { Pais: "Argentina", Cantidad: Argentina },
      { Pais: "Brasil", Cantidad: Brasil },
      { Pais: "México ", Cantidad: México },
      { Pais: "Uruguay", Cantidad: Uruguay },
      { Pais: "Chile", Cantidad: Chile },
      { Pais: "Perú ", Cantidad: Perú },
      { Pais: "Bolivia", Cantidad: Bolivia },
      { Pais: "Paraguay", Cantidad: Paraguay },
      { Pais: "Venezuela", Cantidad: Venezuela },
    ];

    const impuestocompra = response.data.results.reduce(
      (ac, e) => ac + e.fee_details[0].amount,
      0
    );

    const totalpagado = response.data.results.reduce(
      (ac, e) => ac + e.transaction_details.total_paid_amount,
      0
    );

    const ventasnetas = response.data.results.reduce(
      (ac, e) => ac + e.transaction_details.net_received_amount,
      0
    );

    const final = [
      ciudades,
      listapaises,
      usuarios,
      impuestocompra,
      totalpagado,
      ventasnetas,
    ];
    dispatch(todaslascompras(final));
  };
};

export const alltopay = (total) => {
  return async function(dispatch) {
    dispatch(totalapagar(total));
  };
};

export const removeritem = (productId, userId) => {
  const removeitem = {
    userId,
    productId,
  };

  return async function(dispatch) {
    await axios.post(`/store/remove`, removeitem);
    dispatch(quitaritem(productId));
  };
};

export const deleteProductId = (id) => async (dispatch) => {
  await dispatch(deleteProduct(id));
  await axios.delete(`/products/${id}`);
};

export const getUser = () => async (dispatch) => {
  axios
    .get(`/user`)
    .then((res) => dispatch(allUser(res.data)))
    .catch((error) => {
      throw new Error(error);
    });
};

export const deleteUserId = (id) => async (dispatch) => {
  await dispatch(deleteUser(id));
  await axios.delete(`/user/delete/${id}`);
};

/* export const updateUser = (data, id) => {
  return async function() {
    const response = await axios.put(`/userData/${id}`, data);

    return response;
  };
}; */

export const banerUserId = (id) => async (dispatch) => {
  dispatch(baneoUser(id));
  await axios.delete(`/user/softDelete/${id}`);
};

export const restoreBanerUserId = (id) => async (dispatch) => {
  dispatch(deleteRestoreUser(id));
  dispatch(restoreBanUser());
  await axios.delete(`/user/softDelete/${id}?restore=true`);
  if (id) {
    await axios
      .get(`/user`)
      .then((res) => dispatch(allUser(res.data)))
      .catch((error) => {
        throw new Error(error);
      });
  }
};

export const banerProductId = (id) => async (dispatch) => {
  dispatch(deleteBaneoProduct(id));
  await axios.delete(`/products/softDelete/${id}`);
};

export const restoreBanerProductId = (id) => async (dispatch) => {
  dispatch(deleteRestoreProduct(id));
  dispatch(restoreBanProduct());
  await axios.delete(`/products/softDelete/${id}?restore=true`);
};

export const editProductId = (data, id) => async () => {
  await axios.put(`/products/update?productId=${id}`, data);
};

export const getBanerProduct = () => async (dispatch) => {
  await axios
    .get("/products/banProducts")
    .then((res) => dispatch(getBanerProd(res.data)))
    .catch((error) => {
      throw new Error(error);
    });
};

export const getBanerUser = () => async (dispatch) => {
  await axios
    .get("/user/banerUsers")
    .then((res) => dispatch(getBanUser(res.data)))
    .catch((error) => {
      throw new Error(error);
    });
};

export const updateUserData = (data, id) => async (dispatch) => {
  await axios
    .put(`user/userData/${id}`, data)
    .then((res) => {
      dispatch(updateUser(res.data));
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const createAddress = (data) => async (dispatch) => {
  await axios
    .post(`/user/address`, data)
    .then((res) => {
      dispatch(createUserAddress(res.data));
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const deleteAddress = (addressId) => async (dispatch) => {
  console.log("ADDRESS ID IN ACTIONS:", addressId);

  await axios
    .delete(`/user/address/${addressId}`)
    .then((res) => {
      dispatch(deleteUserAddress(res.data));
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};

export const addReview = (productId, data) => async (dispatch) => {
  await axios({
    method: "POST",
    url: `/products/${productId}/review`,
    data: data,
  })
    .then(() => dispatch(GetProductById(productId)))
    .catch((error) => {
      throw new Error(error);
    });
};

export const updateReview = (productId, data) => async (dispatch) => {
  await axios({
    method: "PUT",
    url: `/products/${productId}/review`,
    data: data,
  })
    .then(() => dispatch(GetProductById(productId)))
    .catch((error) => {
      throw new Error(error);
    });
};
