export default request => {;
  switch (request.status) {
    case 200: 
      return {
        statusCode: request.status,
        statusText: request.statusText,
        data: request.data.response || request.data,
        error: null
      }
    case 400: {
      return {
        statusCode: request.status,
        statusText: request.statusText,
        data: null,
        error: 'Datos invalidos! Corrigue los datos e intentalo de nuevo'
      }
    }
    default: 
      return {
        statusCode: request.err.response.status,
        statusText: request.err.response.data.error.name,
        data: null,
        error: request.err.response.status !== 400 ? 
          request.err.response.data.error.message 
          : 'Datos invalidos! Corrigue los datos e intentalo de nuevo'
      }
  }
}