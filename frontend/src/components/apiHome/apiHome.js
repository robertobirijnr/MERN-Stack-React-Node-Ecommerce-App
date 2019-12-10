export const getProducts = sortBy => {
  return fetch(
    `http://localhost:8000/api/products?sortBy=${sortBy}&order=desc&limit=6`,
    {
      method: "GET"
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getCategories = () => {
  return fetch(`http://localhost:8000/api/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

