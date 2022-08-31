import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const specificCountry =  response.data.filter((country) => country.name.common.toLowerCase().includes(name))

      if(specificCountry.length === 1) {
        setCountry(specificCountry[0])
      }

      return country
    })
  }, [name, country])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div> 
      <div>capital {country.capital}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  console.log(country)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input type={nameInput.type} value={nameInput.value} onChange={nameInput.onChange} />
        <button type='submit'>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
