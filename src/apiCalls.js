const getData = (url) => {
  return fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error(`Sorry, something went wrong. ${response.status}: ${response.statusText}`)
      }
      return response.json()
    })
    .catch(err => {
      console.log('Fetch Error: ', err)
    })
  }
export default getData;