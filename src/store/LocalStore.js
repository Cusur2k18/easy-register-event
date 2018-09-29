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

  static setEnrollments(enrollments = []) {
    localStorage.setItem('enrollments', JSON.stringify(enrollments))
  }

  static getEnrollments() {
    const enrollments = localStorage.getItem('enrollments')
    if (enrollments) {
      return JSON.parse(enrollments)
    }
    return []
  }

  static clear() {
    localStorage.clear()
  }
}
