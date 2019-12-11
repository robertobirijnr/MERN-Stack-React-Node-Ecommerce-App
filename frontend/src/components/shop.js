import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories, getFilteredproducts } from "./apiHome/apiHome";
import Checkbox from "./checkBox";
import { prices } from "./fixedPrices";
import RadioBox from "./radioBox";
import Card from "./card";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setfilteredResults] = useState([]);
  const [size,setSize] = useState(0)

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = newFilters => {
    console.log(newFilters);
    getFilteredproducts(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setfilteredResults(data.data);
        setSize(data.size)
        setSkip(0)
      }
    });
  };

  const loadMore = () =>{
    let toSkip = skip + limit

    getFilteredproducts(toSkip,limit,myFilters.filters).then(data=>{
      if(data.error){
        setError(data.error)
      }else{
        setfilteredResults([...filteredResults,...data.data])
        setSize(data.size)
        setSkip(toSkip)

      }
    })
  }


  const loadMoreButton = () =>{
    return (
      size > 0 && size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
      )
    )
  }

  // console.log(categories);

  useEffect(() => {
    loadCategories();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("Shop", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
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
          <h4>Filter by categories</h4>
          {/* {JSON.stringify(categories)} */}
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={filters => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by price range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={filters => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">
          {/* {JSON.stringify(filteredResults)} */}
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <div  key={i} className="col-4 mb-3">
              <Card product={product} />
              </div>
            ))}
          </div>
          <hr/>
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
