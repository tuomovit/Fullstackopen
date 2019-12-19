
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons' 

const App = () => {
  const [persons, setPersons] = useState([  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setPhone ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [Message, setMessage] = useState(null)



  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const Onnistui = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="onnistui">
        {message}
      </div>
    )
  }


  



  useEffect(() => {
    personService
      .getAll()
      .then(alkup => setPersons(alkup))
  }, [])

  const deleteName = (person) => {

    if (window.confirm(`Delete ${person.name} ? `)) { 
      personService
    .deletePerson(person.id)
    .then(response => {
      console.log('success!')
      personService
      .getAll()
      .then(nimet => setPersons(nimet))

      setMessage(
        `Poistaminen onnistui!!`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    })
    .catch(error => {
      setErrorMessage(
        `Poistaminen ei onnistunut!`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    }
    
    console.log("iidee on:", person.id)
 
    

    
}

  
  


  const addName = (event) => {
    event.preventDefault()


    if (persons.findIndex(person => person.name === newName) > -1) {
      
      if (window.confirm(`Nimi ${newName} on jo lisätty, vaihdetaanko numero uuteen?`)) { 

        const id = persons.find(person => person.name === newName).id

        console.log("idee", id)

        const nameObject = {
					name: newName,
					number: newPhone,
				}

        personService
          .muuta(id, nameObject)
          .then(response => {
            console.log('muuttaminen onnistui!')
            personService
            .getAll()
            .then(nimet => setPersons(nimet))

            setMessage(
              `Numeron muuttaminen onnistui!!`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)

          })
          .catch(error => {
            setErrorMessage(
              `Numeron muuttaminen ei onnistunut, yhteystietoa ei löydy!!`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)

            setPersons(persons.filter(person => person.id !== id))

          })

      }
    }
    else {

    console.log("button clicked", newName)
    const nameObject = {
      name: newName,
      number: newPhone
    }
    personService
    .create(nameObject)
    .then(data => {
      setPersons(persons.concat(data))

      setMessage(
        `Numeron lisääminen onnistui!`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      
    })
}
  }

  const handleNameChange = (event) => {
    
    
    setNewName(event.target.value)
  }

  const handlePhone = (event) => {
    
    
    setPhone(event.target.value)
  }

  const handleRajaus = (event) => {
    console.log(event.target.value)

    setNewFilter(event.target.value)
    
    
  }

  const rows = () => {
    
    console.log("jaa", persons)
    
    var naytettavat = persons;
    
   if (naytettavat.length < 10) {
    
    if (newFilter.length > 0 ) {

      naytettavat = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
      
      return (
        naytettavat.map(person =>
          <div key={person.name}>
           
            {person.name} {person.number}
            
          </div>
          
          )
        )

    }

    else return (
    persons.map(person =>
      <div key={person.name}>
       
        {person.name} {person.number} <button onClick={() => deleteName(person)}>
  Delete
</button>
        
      </div>
      
      )
    )
   }
  }
  
  const forms = () => {

    return (

    <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} />
          <br></br>
          phone: <input onChange={handlePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )

  }

  const rajaus = () => {

    return (
    <div>
      rajaus: <input onChange={handleRajaus} />
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {rajaus()}

      <h3>Lisää uusi</h3>

      {forms()}

      <Notification message={errorMessage} />
      <Onnistui message={Message} />
      <h3>Numbers</h3>
      {rows()}
    </div>
  )

}

export default App
