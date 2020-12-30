import React, { useState, useEffect } from "react";

export const Container = ({ children }) => {
  return <div className="row">{children}</div>;
};

export const Modal = ({ data }) => {};

export const List = ({ data, header }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    const newOrder = data.filter((i) => i._id === selectedOrderId);
    setSelectedOrder(newOrder[0]);
    console.log(newOrder[0]);
  }, [selectedOrderId, setSelectedOrderId]);

  const handleModal = (e) => {
    setIsModalOpen(!isModalOpen);
    setSelectedOrderId(e.target.id);
  };

  return (
    <div className="col-12 col-md-6 bg-white">
      <h3 className="py-4 text-center">{header}</h3>
      <ul className="list list-unstyled">
        {data &&
          data.map((item, index) => {
            return (
              <li className="list-item d-flex mb-4" key={index}>
                <span className="text-muted mr-2">#{index}</span>
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
            );
          })}
      </ul>
      {isModalOpen && (
        <div
          className="position-fixed card"
          style={{
            minWidth: "50vw",
            minHeight: "50vh",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: "100000",
            border: "1px solid black",
            boxShadow: "5px 5px rgba(0,0,0,0.3)",
          }}
        >
          <div className="card-header">
            <h3 className="card-title">
              {selectedOrder ? selectedOrder.address : ""}
            </h3>
          </div>
          <div className="card-body">
            <ul className="list list-unstyled">
              <li className="list-item font-weight-bold mb-8">Produkty</li>
              {selectedOrder &&
                selectedOrder.products.map((product, index) => {
                  return (
                    <li key={index} className="list-item">
                      {product}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="card-footer mt-auto d-flex">
            <button className="btn btn-success mr-4">Zrealizowano</button>
            <button className="btn btn-secondary" onClick={handleModal}>
              Zamknij
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
