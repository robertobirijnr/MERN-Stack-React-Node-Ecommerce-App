export const createCategory = (userId, token, category) => {
  return fetch(`http://localhost:8000/api/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
  // console.log(name, email, password);
};

export const createProduct = (userId, token, product) => {
  return fetch(`http://localhost:8000/api/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
  // console.log(name, email, password);
};

export const getCatrgories = () => {
  return fetch(`http://localhost:8000/api/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
