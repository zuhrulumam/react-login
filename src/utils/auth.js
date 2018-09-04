import axios from "axios";

const TOKEN_KEY = 'jwtToken';

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {

  isAuthenticated: false,
  username: "",

  checkUser(callback) {
    let token = this.getToken();
    console.log("token", token);
    if (token !== null) {

      return axios.get(
        'http://localhost:4000/api/v1/users/checkUser',
        { headers: { 'Authorization': `Bearer ${token}` } }
      )
        .then((result) => {
          this.isAuthenticated = true;
          this.username = result.data.username;
          console.log('result ', result);
          return callback(null, result.data);
        }).catch(err => {
          this.isAuthenticated = false;
          console.log(err)
          return callback(err);
        });
    }
    this.isAuthenticated = false;
    return callback("error");
  },

  /**
    * Remove an item from the used storage
    * @param  {String} key [description]
    */
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  /**
   * Clear all app storage
   */
  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  clearToken(tokenKey = TOKEN_KEY) {
    return auth.clear(tokenKey);
  },

  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key)) || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return parse(sessionStorage.getItem(key)) || null;
    }

    return null;
  },

  getToken(tokenKey = TOKEN_KEY) {
    return auth.get(tokenKey);
  },

  /**
   * Set data in storage
   * @param {String|Object}  value    The data to store
   * @param {String}  key
   * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
   */
  set(value, key, isLocalStorage) {

    if (isLocalStorage && localStorage) {
      console.log("save to localstorage");
      return localStorage.setItem(key, stringify(value));
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, stringify(value));
    }

    return null;
  },


  setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
    console.log('set token')
    return auth.set(value, tokenKey, isLocalStorage);
  },

};

export default auth;