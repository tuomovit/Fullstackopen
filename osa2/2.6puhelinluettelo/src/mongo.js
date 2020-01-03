const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personname = process.argv[3]
const personnumber = process.argv[4]

console.log("parametreja", process.argv.length)

const url =
  `mongodb+srv://fullstack:${password}@cluster0-fjqdx.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`
  
mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
  important: Boolean,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: personname,
  number: personnumber,
  date: new Date(),
  important: true,
})

if (process.argv.length > 4) {
person.save().then(response => {
    console.log(`added ${personname} number ${personnumber} to phonebook`);
  mongoose.connection.close();
})
}

if (process.argv.length === 3) {
Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}


