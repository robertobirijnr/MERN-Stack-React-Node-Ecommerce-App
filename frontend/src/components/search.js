import React, { useEffect, useState } from "react";
import { getCategories } from "./apiHome/apiHome";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    result: [],
    searched: false
  });

  const { categories, category, search, result, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchSubmit = () => {
    //
  };

 const handleChange = (name) => event => {
    setData({...data,[name]:event.target.value,search:false});
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">Select Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            placeholder="Search by name"
            onChange={handleChange("search")}
            className="form-control"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );
  return (
    <div className="row">
      <div className="container">{searchForm()}</div>
    </div>
  );
};

export default Search;
