export const signup = user => {
  return fetch(`http://localhost:8000/api/signup`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
  // console.log(name, email, password);
};

export const signin = user => {
  return fetch(`http://localhost:8000/api/signin`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
  // console.log(name, email, password);
};

export const jwtToken =(data,next)=>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()
    }
}

export const signOut =(next)=>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt')
        next()
        return fetch(`http://localhost:8000/api/signout`,{
            method:'Get'
        })
        .then(response=>{
            console.log('signout',response)
        })
        .catch(err=>{
            console.log(err)
        })

    }
}

// checking if user is login or not
export const isAuthenticated =()=>{
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false;
    }
}


