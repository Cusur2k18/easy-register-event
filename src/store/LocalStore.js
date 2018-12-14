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
