import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Container = ({ children }) => <div className="row">{children}</div>;

Container.propTypes = {
  children: PropTypes.any,
};

export const List = ({
  data,
  header,
  onSubmit,
  isModalVisible,
  setIsModalVisible,
}) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    const newOrder = data.filter((i) => i._id === selectedOrderId);
    setSelectedOrder(newOrder[0]);
  }, [selectedOrderId, setSelectedOrderId]);

  const handleModal = (e) => {
    setIsModalVisible(!isModalVisible);
    setSelectedOrderId(e.target.id);
  };

  return (
    <div className="col-12 col-md-6 bg-white">
      <h3 className="py-4 text-center">{header}</h3>
      <ul className="list list-unstyled">
        {data
          && data.map((item, index) => (
            <li className="list-item d-flex mb-4" key={item._id}>
              <span className="text-muted mr-2">
                #
                {index + 1}
              </span>
              <span className="text-muted mr-2">{item.address}</span>
              <button
                id={item._id}
                type="button"
                className="btn btn-sm btn-primary ml-auto"
                onClick={handleModal}
              >
                Pokaż szczegóły
              </button>
            </li>
          ))}
      </ul>
      {isModalVisible && selectedOrder && (
        <div
          className="position-fixed card"
          style={{
            minWidth: '50vw',
            minHeight: '50vh',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: '100000',
            border: '1px solid black',
            boxShadow: '5px 5px rgba(0,0,0,0.3)',
          }}
        >
          <div className="card-header">
            <h3 className="card-title">
              {selectedOrder ? selectedOrder.address : ''}
            </h3>
          </div>
          <div className="card-body">
            <ul className="list list-unstyled">
              <li className="list-item font-weight-bold mb-8">Produkty</li>
              {selectedOrder
                && selectedOrder.products.map((product) => (
                  <li key={product} className="list-item">
                    {product.name}
                    {' '}
                    {product.price ? `${product.price} zł` : ''}
                  </li>
                ))}
              <li className="list-item mt-4" style={{borderTop: '1px solid black'}}>
                <span className="d-block mt-4">Całkowity koszt zamówienia:</span>
                <span className="d-block text-success">
                  {selectedOrder.price}
                  {' '}
                  zł
                </span>
              </li>
            </ul>
          </div>
          <div className="card-footer mt-auto d-flex">
            <button
              type="button"
              className="btn btn-success mr-4"
              onClick={() => onSubmit(selectedOrder._id)}
            >
              Zmień status
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleModal}>
              Zamknij
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

List.propTypes = {
  data: PropTypes.any,
  header: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isModalVisible: PropTypes.any,
  setIsModalVisible: PropTypes.func.isRequired,
};
