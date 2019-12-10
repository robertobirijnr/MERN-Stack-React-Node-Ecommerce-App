import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories } from "./apiHome/apiHome";
import Checkbox from "./checkBox";
import { prices } from "./fixedPrices";
import RadioBox from "./radioBox";
// import Card from  './card';

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
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

  // console.log(categories);

  useEffect(() => {
    loadCategories();
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("Shop", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy == "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const loadFilteredResults = newFilters => {
    console.log(newFilters);
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

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
            <Checkbox
              categories={categories}
              handleFilters={filters => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by price range</h4>
          {/* {JSON.stringify(categories)} */}
          <div>
            <RadioBox
              prices={prices}
              handleFilters={filters => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">{JSON.stringify(myFilters)}</div>
      </div>
    </Layout>
  );
};

export default Shop;
