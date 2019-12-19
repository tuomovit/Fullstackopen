import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';


const App =() => {

  const [maat, setMaat] = useState([  ])
  const [ newFilter, setNewFilter ] = useState('')
  

  
  

  const handleRajaus = (event) => {
    console.log(event.target.value)

    setNewFilter(event.target.value)
    
    
  }

  const handleNayta = (maa) => {
   
    console.log("joooooooooo", maa.name)

    setNewFilter(maa.name)
    
  }

  const Saa = ({ city }) => {

    var saavalittu;

    console.log("SAATA", city)

    const [ data, setSaa ] = useState('')
    
  
    useEffect(() => {
      axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&apikey=fd1f7db1abbf119638301f20b06ecdd3`)
      .then(response => {
        setSaa(response.data)
        console.log("toimiiko", data)
			})
	}, [])

    
  // JOSTAIN ihmeen syystä apin ns. syvempiä tietoja ei saa millään näkyviin, vaan väittää että semmoista dataa ei ole olemassa.
  // Esim ID tulostuu normaalisti. Googlettelun perusteella saattaa liittyä jotenkin ajoitukseen tai sit APIN ongelma
    return (
      <div>
			<p>
      // JOSTAIN ihmeen syystä apin ns. syvempiä tietoja ei saa millään näkyviin, vaan väittää että semmoista dataa ei ole olemassa.
  // Esim ID tulostuu normaalisti: {data.id} Googlettelun perusteella saattaa liittyä jotenkin ajoitukseen tai sit APIN ongelma
			 </p>
		</div>		
    )
  }

  


  const Maa = ({maa}) => {

    console.log(maa, "NAYTAMAA FUNKTIO")

    const kieli = () => {
      console.log("KIELIFUNKTIO", maa)
            return (
            maa.languages.map ( language =>
              <li>{language.name}</li>
        
            )
            )
          }

    

    console.log("jooooooo", maa)

    return (
          
          
      
        <div key={maa.name}>
          
         
          <h1>{maa.name}</h1> 
          <br></br>
          Pääkaupunki: {maa.capital} 
          <br></br>
          Asukasluku: {maa.population} 
          <br></br>
          <h2>kielet</h2>
          {kieli(maa)}
          <br></br>
          <img width="20%" src={maa.flag} />
          <Saa city={maa.capital}/>

          
          
        </div>
      

      

    )
  }


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setMaat(response.data)
      })
  }, [])
  console.log('render', maat.length, 'notes')

  const rows = () => {
    console.log("jaa", maat)

    var naytettavat = maat;

    
    

    
    
    if (newFilter.length >= 0 ) {

      naytettavat = maat.filter(maa => maa.name.toLowerCase().includes(newFilter.toLowerCase()))
      
      if (naytettavat.length > 10) 
      return (
        <div><p>Liian paljon osumia, tarkenna!</p></div>
      )
        
      

      else if (naytettavat.length === 1 ) {
       console.log("JOOOO", naytettavat); 
       
       return ( <Maa maa={naytettavat[0]}/> )

      }
      
      
      
      
      else return (
        naytettavat.map(maa =>
          <div key={maa.name}>
           
            {maa.name} 
            <button onClick={() => handleNayta(maa)}>
  Show
</button>
            
          </div>
          
          )
        )

    }

   
    
    
  }

  const rajaus = () => {

    return (
    <div>
      rajaus: <input onChange={handleRajaus} />
      </div>
    )
  }


  return (
    <div className="App">
      {rajaus()}
      {rows()}
      
    </div>
  );
}

export default App;
