import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './Context'
var key = 'LEIdtQ2mxSjNhE5NWnvZ3Ho7rqJgYz7es9w9MKioV5s'
var url = `https://api.unsplash.com/search/photos/?client_id=${key}&query=`

var autoFetch = axios.create({
  baseURL: url,
})
export var useAutoFetch = () => {
  var { searchTerm } = useGlobalContext()
  var myResults = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      var result = await autoFetch(`${searchTerm}`)
      console.log(result)
      return result.data
    },
  })

  return myResults
}
