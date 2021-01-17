import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {
  ProductList,
  ProductEdit,
  ProductNew,
  ProductNewCard,
} from '../components/Menu/menu_components';
import {
  handleCreate,
  handleEdit,
  handleRemove,
} from '../components/Menu/menu_methods';
import { useLoad } from '../utils/hooks';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
const EMPTY_PRODUCT_TEMPLATE = {
  name: '',
  description: '',
  price: 10,
  photo: '',
};

// TODO: handle history
// eslint-disable-next-line no-unused-vars
const MenuPage = ({ history }) => {
  // TODO: handle isAuthenticated
  // eslint-disable-next-line no-unused-vars
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [products, setProducts] = useLoad([], `${SERVER_URL}/products`);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [product, setProduct] = useState(EMPTY_PRODUCT_TEMPLATE);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductEditSelect = (e) => {
    const _product = products.filter((i) => i._id === e.target.id);
    setIsModalVisible(true);
    setIsEdit(true);
    setIsNew(false);
    if (_product && _product.length) {
      setSelectedProduct(_product[0]);
    } else {
      setSelectedProduct(null);
    }
  };

  const handleProductNewSelect = () => {
    setIsModalVisible(true);
    setIsEdit(false);
    setIsNew(true);
    setSelectedProduct(EMPTY_PRODUCT_TEMPLATE);
  };

  return (
    <AuthContext.Consumer>
      {() => (
        <div className="row">
          <ProductList
            list={products}
            // onEdit={(e) => handleEdit(e.target.id)}
            performEdit={handleProductEditSelect}
            onRemove={(e) => handleRemove(e.target.id, setProducts)}
          >
            <ProductNewCard onClick={handleProductNewSelect} />
          </ProductList>
          {isModalVisible && isEdit && (
            <ProductEdit
              product={selectedProduct}
              onSave={() => {
                setIsEdit(false);
                setIsModalVisible(false);
                handleEdit(selectedProduct._id, selectedProduct, setProducts);
              }}
              onCancel={() => {
                setIsModalVisible(false);
                setSelectedProduct(null);
              }}
              onChange={(e) => setSelectedProduct({
                ...selectedProduct,
                [e.target.name]: e.target.value,
              })}
            />
          )}
          {isModalVisible && isNew && (
            <ProductNew
              product={product}
              onCancel={() => {
                setIsNew(false);
                setIsModalVisible(false);
                setProduct(EMPTY_PRODUCT_TEMPLATE);
              }}
              onSave={() => handleCreate(product, (data) => {
                setProducts(data);
                setIsNew(false);
                setIsModalVisible(false);
              })}
              onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
            />
          )}
        </div>
      )}
    </AuthContext.Consumer>
  );
};

MenuPage.propTypes = {
  history: PropTypes.any,
};

export default withRouter(MenuPage);
