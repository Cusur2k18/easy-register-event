// TODO: Make this function to parse multiple query params and return on single object
export function getQueryString(query) {
  if (query) {
    return query.split('?')[1].split('=').map( (k, i, arr) => {
      if (arr[i + 1]) {
        return {
          [k]: arr[i + 1]
        }
      }
    }).reduce((acc,cv) => { 
      return {
        ...acc,
        ...cv
      }
    })
  }
  return {}
}
