import queryString from "query-string";

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

export const getFilteredproducts = (skip, limit, filters = []) => {
  const data = {
    skip,
    limit,
    filters
  };
  return fetch(`http://localhost:8000/api/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const list = params => {
  const query = queryString.stringify(params);
  console.log("query", query);
  return fetch(`http://localhost:8000/api/products/search?${query}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getSingleProduct = productId => {
  return fetch(`http://localhost:8000/api/product/${productId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getRelatedProduct = productId => {
  return fetch(`http://localhost:8000/api/products/related/${productId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getBraintreeClientToken = (userId, token) => {
  return fetch(`http://localhost:8000/api/braintree/getToken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
  return fetch(`http://localhost:8000/api/braintree/payment/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
  return fetch(`http://localhost:8000/api/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: createOrderData })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
