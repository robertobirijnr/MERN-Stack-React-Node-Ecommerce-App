import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories } from "./apiHome/apiHome";
import Checkbox from "./checkBox";
// import Card from  './card';

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setErrors] = useState(false);

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setErrors(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  console.log(categories);

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout
      title="Shop"
      description="Search and find book of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter By Id</h4>
          {/* {JSON.stringify(categories)} */}
          <ul>
            <Checkbox categories={categories} />
          </ul>
        </div>
        <div className="col-8">Right side</div>
      </div>
    </Layout>
  );
};

export default Shop;
