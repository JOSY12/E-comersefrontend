import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCategories,
  getProducts,
  editProductId,
  GetProductById,
} from "../../redux/actions/index";
import swal from "sweetalert";
import { RxArrowLeft } from "react-icons/rx";

const validationsForms = (form) => {
  let errors = {};

  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexNum = /^[0-9]*$/;
  let regexphotos = /.*(png|jpg|jpeg|)$/;
  let regexUrl =
    /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;

  if (!form.name.trim()) {
    errors.name = "Ingresa un nombre para el producto";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "El campo de nombre solo acepta letras y espacios en blanco";
  } else if (form.name.length < 4) {
    errors.name = "El nombre debe contener minimo 4 caracteres";
  } else if (form.name.length > 50) {
    errors.name = "El nombre debe contener maximo 50 caracteres";
  }

  if (!form.stock) {
    errors.stock = "Ingresa la cantidad de inventario existente";
  } else if (!regexNum.test(form.stock)) {
    errors.stock = "El campo dede contener solo numeros";
  }

  if (!form.unitPrice) {
    errors.unitPrice = "Ingresa el precio unitario del producto";
  } else if (!regexNum.test(form.unitPrice)) {
    errors.unitPrice = "El campo dede contener solo numeros";
  }

  if (!form.brand) {
    errors.brand = "Ingresa el nombre de la marca del producto";
  } else if (!regexName.test(form.brand)) {
    errors.brand =
      "El campo marca de producto solo acepta letras y espacios en blanco";
  } else if (form.brand.length < 4) {
    errors.brand = "La marca del producto debe contener minimo 4 caracteres";
  } else if (form.brand.length > 50) {
    errors.brand = "La marca del producto debe contener maximo 50 caracteres";
  }

  if (!form.photos) {
    errors.photos = "Ingresa un link de la photosn a mostrar para el producto";
  } else if (!regexphotos.test(form.photos)) {
    errors.photos =
      "El campo photosn solo admite photosnes en formato jpeg y png";
  } else if (!regexUrl.test(form.photos)) {
    errors.photos = "El campo photosn debe ser una url de una photosn";
  }

  if (form.categories.length === 0) {
    errors.categories = "Agrega un nombre de una categoria";
  } else if (form.categories.length < 2) {
    errors.categories = "Debes ingresar la categoria y el genero del producto";
  }

  if (!form.description) {
    errors.description = "Ingresa una descripcion del producto";
  } else if (form.description.length < 15) {
    errors.description = "La descripcion debe contener minimo 15 caracteres";
  } else if (form.description.length > 700) {
    errors.description = "La descripcion debe contener maximo 400 caracteres";
  }

  return errors;
};

const EditProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);
  const { product } = useSelector((state) => state.product);

  const categDelHM = categories.filter(
    (e) => e.name !== "Hombre" && e.name !== "Mujer"
  );

  const categHM = categories.filter(
    (e) => e.name === "Hombre" || e.name === "Mujer"
  );

  const category = [...new Set(categDelHM.map((el) => el.name))];
  const gender = [...new Set(categHM.map((el) => el.name))];

  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    unitPrice: "",
    brand: "",
    photos: "",
    categories: [],
    description: "",
  });

  useEffect(() => {
    if (Object.keys(product).length === 0) {
      dispatch(GetProductById(id));
    }
    setNewProduct({
      name: product.name,
      stock: product.stock,
      unitPrice: product.unitPrice,
      brand: product.brand ? product.brand.name : "",
      photos: product.photos ? product.photos[0].url : "",
      categories: product.categories
        ? product.categories.map((e) => e.name)
        : "",
      description: product.description,
    });
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch, product]);

  const [error, setError] = useState({});

  const handleEdit = (e) => {
    e.preventDefault();
    swal({
      title: "Deseas editar este Usuario?",
      text: "Una vez editado, ¡No podras restaurar sus modificaciones! ¡🖐🖌!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        if (!newProduct.name) {
          alert("Debes ingresar un nombre para el producto");
        } else if (!newProduct.stock) {
          alert("Debes ingresar una cantidad de inventario existente");
        } else if (!newProduct.unitPrice) {
          alert("Debes ingresar el valor unitario del producto");
        } else if (!newProduct.brand) {
          alert("Debes ingresar el nombre de la marca del producto");
        } else if (!newProduct.photos) {
          alert(
            "Debes ingresar un link de una photosn a mostrar para el producto"
          );
        } else if (newProduct.categories.length === 0) {
          alert("Debes agregar una categoria");
        } else if (newProduct.categories.length < 2) {
          alert("Debes agregar una categoria y un genero");
        } else if (!newProduct.description) {
          alert("Debes agregar una descripcion del producto");
        }
        setError(validationsForms(newProduct));
        dispatch(editProductId(newProduct, id));

        swal({
          title: "Deseas volver?",
          buttons: true,
        }).then((res) => {
          if (res) {
            window.location.href = `/dashboard`;
          }
        });
      } else {
        swal("¡👍! ¡El Usuario no sufrio cambios!");
      }
    });
  };

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
   
  };

  const handleBlur = (e) => {
    handleChange(e);
    setError(validationsForms(newProduct));
  };

  const handleSelectCategory = (e) => {
    setNewProduct({
      ...newProduct,
      categories: [...new Set([e.target.value])],
    });
  };

  const handleSelectGender = (e) => {
    setNewProduct({
      ...newProduct,
      categories: [...new Set([...newProduct.categories, e.target.value])],
    });
  };

  const handleDeleteCategory = (e) => {
    setNewProduct({
      ...newProduct,
      categories: newProduct.categories.filter((c) => c !== e),
    });
  };

  const handleBack = () => {
    window.location.href = `/dashboard`;
  };

  return (
    <div className="flex justify-center mt-8 p-4">
      <div className="mr-10">
        <button onClick={handleBack}>
          <RxArrowLeft size={40} />
        </button>
      </div>
      <form onSubmit={(e) => handleEdit(e)} className="w-96">
        <h1 className="font-bold flex justify-center text-lg">
          Editar Producto
        </h1>
        <div>
          <div className="flex flex-col">
            <label>Nombre del Producto</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onBlur={(e) => handleBlur(e)}
              placeholder="Escribe aquí"
              className="input input-bordered w-full"
              onChange={(e) => handleChange(e)}
            />
            {error.name ? (
              <h4>
                <small>{error.name}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label>Disponible en Inventario</label>
            <input
              type="text"
              name="stock"
              value={newProduct.stock}
              onBlur={(e) => handleBlur(e)}
              placeholder="Escribe aquí"
              className="input input-bordered w-full"
              onChange={(e) => handleChange(e)}
            />
            {error.stock ? (
              <h4>
                <small>{error.stock}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label>Precio Unitario</label>
            <input
              type="text"
              name="unitPrice"
              value={newProduct.unitPrice}
              onBlur={(e) => handleBlur(e)}
              placeholder="Escribe aquí"
              className="input input-bordered w-full"
              onChange={(e) => handleChange(e)}
            />
            {error.unitPrice ? (
              <h4>
                <small>{error.unitPrice}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label>Marca del Producto</label>
            <input
              type="text"
              name="brand"
              value={newProduct.brand}
              onBlur={(e) => handleBlur(e)}
              placeholder="Escribe aquí"
              className="input input-bordered w-full"
              onChange={(e) => handleChange(e)}
            />
            {error.brand ? (
              <h4>
                <small>{error.brand}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label>photosn</label>
            <input
              type="text"
              name="photos"
              value={newProduct.photos}
              onBlur={(e) => handleBlur(e)}
              placeholder="Escribe aquí"
              className="input input-bordered w-full"
              onChange={(e) => handleChange(e)}
            />
            {error.photos ? (
              <h4>
                <small>{error.photos}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label>Categorias disponibles</label>
            <select
              name="categories"
              value={
                newProduct.categories
                  ? newProduct.categories.map((e) => e.name)
                  : ""
              }
              /* onBlur={(e) => handleBlur(e)} */
              onChange={(e) => handleSelectCategory(e)}
              className="btn"
            >
              <option>Categorías</option>
              {category.map((el) => (
                <option value={el}>{el}</option>
              ))}
            </select>
            {error.categories ? (
              <h4>
                <small>{error.categories}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label>Generos</label>
            <select
              name="genero"
              value={newProduct.categories}
              /* onBlur={(e) => handleBlur(e)} */
              onChange={(e) => handleSelectGender(e)}
              className="btn"
            >
              <option>Genero</option>
              {gender.map((el) => (
                <option
                  disabled={
                    newProduct.categories.includes("Mujer") ||
                    newProduct.categories.includes("Hombre")
                      ? true
                      : false
                  }
                  value={el}
                >
                  {el}
                </option>
              ))}
            </select>
            {error.categories ? (
              <h4>
                <small>{error.categories}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div>
            <ul>
              <li>
                {newProduct.categories.length > 0
                  ? newProduct.categories.map((e) => (
                      <p className="btn m-3 ">
                        {e}
                        <button
                          className="ml-3 bg-red-600 h-8 w-8"
                          onClick={() => handleDeleteCategory(e)}
                        >
                          X
                        </button>
                      </p>
                    ))
                  : ""}
              </li>
            </ul>
          </div>
          <div className="flex flex-col mt-2">
            <label>Descripcion</label>
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onBlur={(e) => handleBlur(e)}
              placeholder="Escribe aquí"
              className="input input-bordered w-full"
              onChange={(e) => handleChange(e)}
            />
            {error.description ? (
              <h4>
                <small>{error.description}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              disabled={Object.keys(error).length < 1 ? false : true}
              type="submit"
              className="btn"
            >
              Editar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
