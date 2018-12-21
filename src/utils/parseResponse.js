export default response => {
  console.log('res', response)
  switch (response.status) {
    case 200: 
      return {
        statusCode: response.status,
        statusText: response.statusText,
        data: response.data.response || response.data,
        meta: {
          currentPage: response.headers['current-page'],
          perPage: response.headers['per-page'],
          total: response.headers['total']
        },
        error: null
      }
    case 400: {
      return {
        statusCode: response.status,
        statusText: response.statusText,
        data: null,
        meta: null,
        error: 'Datos invalidos! Corrigue los datos e intentalo de nuevo'
      }
    }
    default: 
      return {
        statusCode: response.err.response.status,
        statusText: response.err.response.data.error.name,
        data: null,
        meta: null,
        error: response.err.response.status !== 400 ? 
          response.err.response.data.error.message 
          : 'Datos invalidos! Corrigue los datos e intentalo de nuevo'
      }
  }
}