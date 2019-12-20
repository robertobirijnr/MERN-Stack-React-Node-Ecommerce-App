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

export const getCategories = () => {
  return fetch(`http://localhost:8000/api/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getOrders = (userId,token) => {
  return fetch(`http://localhost:8000/api/order/list/${userId}`, {
    method: "GET", 
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getStatusValues = (userId,token) => {
  return fetch(`http://localhost:8000/api/order/status/${userId}`, {
    method: "GET", 
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateOrderStatus = (userId,token,orderId,status) => {
  return fetch(`http://localhost:8000/api/order/${orderId}/status/${userId}`, {
    method: "PUT", 
    headers: {
      Accept: "Application/json",
      "Content-Type":'application/json',
      Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({status,orderId})
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getProducts = () => {
  return fetch(`http://localhost:8000/api/products?limit=100`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteProduct = (productId,token,userId) => {
  return fetch(`http://localhost:8000/api/product/${productId}/${userId}`, {
    method: "DELETE", 
    headers: {
      Accept: "Application/json",
      "Content-Type":'application/json',
      Authorization: `Bearer ${token}`
    },
  
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getProduct = (productId) => {
  return fetch(`http://localhost:8000/api/product/${productId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateProduct = (productId,token,userId,product) => {
  return fetch(`http://localhost:8000/api/product/${productId}/${userId}`, {
    method: "PUT", 
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`
    },
    body:product
  })
    .then(response => {
      return response.json();
    })
  }
   
