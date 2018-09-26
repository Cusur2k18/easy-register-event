export default class LocalStore {
  

  static setUser(user = {}) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  static getUser() {
    const user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    }
    return {}
  }

  static setToken(token = '') {
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static clear() {
    localStorage.clear()
  }
}
