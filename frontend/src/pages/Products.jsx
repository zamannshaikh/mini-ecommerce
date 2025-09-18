import React from "react";
import { useSelector } from "react-redux";
import "../styles/Products.css";

const Products = () => {
  const data = useSelector((state) => state.productReducer.products);

  // Example sections for horizontal strips; replace with dynamic sections as needed
  const sections = [
    { title: "Top Deals", products: data.slice(0, 8) },
    { title: "Mobiles", products: data.slice(8, 16) },
    { title: "Life Style", products: data.slice(16, 24) },
  ];

  return (
    <div className="products-container">
      {sections.map((section, idx) => (
        <div key={idx} className="products-section">
          <h3 className="section-title">{section.title}</h3>
          <div className="products-row">
            {section.products.length > 0 ? (
              section.products.map((item) => (
                <div key={item.id} className="product-mini-card">
                  <div className="mini-image-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="mini-product-img"
                    />
                  </div>
                  <div className="mini-details">
                    <span className="mini-title">{item.title}</span>
                    <span className="mini-offer">
                      {item.offer || item.category}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span className="no-products">No products available.</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
