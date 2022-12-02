/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewProduct,
  getCategories,
  getProducts,
} from "../../redux/actions/index";

const validationsForms = (form) => {
  let errors = {};

  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  let regexNum = /^[0-9]*$/;
  let regexImage = /.*(png|jpg|jpeg|)$/;
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

  if (!form.stock.trim()) {
    errors.stock = "Ingresa la cantidad de inventario existente";
  } else if (!regexNum.test(form.stock.trim())) {
    errors.stock = "El campo dede contener solo numeros";
  }

  if (!form.unitPrice.trim()) {
    errors.unitPrice = "Ingresa el precio unitario del producto";
  } else if (!regexNum.test(form.unitPrice.trim())) {
    errors.unitPrice = "El campo dede contener solo numeros";
  }

  if (!form.productBrand.trim()) {
    errors.productBrand = "Ingresa el nombre de la marca del producto";
  } else if (!regexName.test(form.productBrand.trim())) {
    errors.productBrand =
      "El campo marca de producto solo acepta letras y espacios en blanco";
  } else if (form.productBrand.length < 4) {
    errors.productBrand =
      "La marca del producto debe contener minimo 4 caracteres";
  } else if (form.productBrand.length > 50) {
    errors.productBrand =
      "La marca del producto debe contener maximo 50 caracteres";
  }

  if (!form.image.trim()) {
    errors.image = "Ingresa un link de la imagen a mostrar para el producto";
  } else if (!regexImage.test(form.image.trim())) {
    errors.image = "El campo imagen solo admite imagenes en formato jpeg y png";
  } else if (!regexUrl.test(form.image.trim())) {
    errors.image = "El campo imagen debe ser una url de una imagen";
  }

  if (form.categories.length === 0) {
    errors.categories = "Agrega un nombre de una categoria";
  } else if (form.categories.length < 2) {
    errors.categories = "Debes ingresar la categoria y el genero del producto";
  }

  if (!form.description.trim()) {
    errors.description = "Ingresa una descripcion del producto";
  } else if (form.description.length < 15) {
    errors.description = "La descripcion debe contener minimo 15 caracteres";
  } else if (form.description.length > 80) {
    errors.description = "La descripcion debe contener maximo 80 caracteres";
  }

  return errors;
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);
  const categDelHM = categories.filter(
    (e) => e.name !== "Hombre" && e.name !== "Mujer"
  );

  const categHM = categories.filter(
    (e) => e.name === "Hombre" || e.name === "Mujer"
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  const category = [...new Set(categDelHM.map((el) => el.name))];
  const gender = [...new Set(categHM.map((el) => el.name))];

  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: undefined,
    unitPrice: undefined,
    productBrand: "",
    image: "",
    categories: [],
    description: "",
  });

  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name) {
      alert("Debes ingresar un nombre para el producto");
    } else if (
      products.find(
        (e) => e.name.toLowerCase() === newProduct.name.toLowerCase()
      )
    ) {
      alert("El nombre del producto ingresado ya existe");
    } else if (!newProduct.stock) {
      alert("Debes ingresar una cantidad de inventario existente");
    } else if (!newProduct.unitPrice) {
      alert("Debes ingresar el valor unitario del producto");
    } else if (!newProduct.productBrand) {
      alert("Debes ingresar el nombre de la marca del producto");
    } else if (!newProduct.image) {
      alert("Debes ingresar un link de una imagen a mostrar para el producto");
    } else if (newProduct.categories.length === 0) {
      alert("Debes agregar una categoria");
    } else if (newProduct.categories.length < 2) {
      alert("Debes agregar una categoria y un genero");
    } else if (!newProduct.description) {
      alert("Debes agregar una descripcion del producto");
    }
    dispatch(createNewProduct(newProduct));
    setError(validationsForms(newProduct));
    setNewProduct({
      name: "",
      stock: undefined,
      unitPrice: undefined,
      productBrand: "",
      image: "",
      categories: [],
      description: "",
    });
    alert("El producto se creo con éxito");
  };

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
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

  return (
    <div className="flex justify-center mt-8">
      <form onSubmit={(e) => handleSubmit(e)} className="w-96">
        <h1 className="font-bold flex justify-center text-lg">
          Agregar Producto
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
              name="productBrand"
              value={newProduct.productBrand}
              onBlur={(e) => handleBlur(e)}
              placeholder="Escribe aquí"
              className="input input-bordered w-full"
              onChange={(e) => handleChange(e)}
            />
            {error.productBrand ? (
              <h4>
                <small>{error.productBrand}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label>Imagen</label>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onBlur={(e) => handleBlur(e)}
              placeholder="Escribe aquí"
              className="input input-bordered w-full"
              onChange={(e) => handleChange(e)}
            />
            {error.image ? (
              <h4>
                <small>{error.image}</small>
              </h4>
            ) : (
              false
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label>Categorias disponibles</label>
            <select
              name="categories"
              value={newProduct.categories}
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
                {newProduct.categories.map((e) => (
                  <p className="btn m-3 ">
                    {e}
                    <button
                      className="ml-3 bg-red-600 h-8 w-8"
                      onClick={() => handleDeleteCategory(e)}
                    >
                      X
                    </button>
                  </p>
                ))}
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
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
