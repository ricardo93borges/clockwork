const fs = require('fs');
const readline = require('readline');
const jsonRegisters = require('./registers.json')

const registers = []

const directoryPath = '/home/ricardo/Documents/registers/'
const jsonFile = './registers.json'


const firebase = require('firebase/app')
require('firebase/firestore')

require('dotenv').config()

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

firebase.initializeApp(config)
const db = firebase.firestore()

async function readCsv() {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(async function (file) {

      const readInterface = readline.createInterface({
        input: fs.createReadStream(`${directoryPath}/${file}`),
      });

      for await (const line of readInterface) {
        const arr = line.split(',').filter(item => !!item)
        if (arr.length >= 6 && arr[0] !== "Dia" && arr[0] !== "In") {
          registers.push({
            date: arr[0],
            registers: [arr[2], arr[3], arr[4], arr[5]]
          })
        }
      }
      await fs.writeFileSync(jsonFile, JSON.stringify(registers))
    });
  });
}

function getDate(dateStr) {
  const dateArr = dateStr.split('/')
  const date = new Date()
  date.setDate(dateArr[0])
  date.setMonth(dateArr[1])
  date.setFullYear(dateArr[2])
  return date
}

function getDatetime(date, timeStr) {
  const timeArr = timeStr.split(':')
  date.setHours(timeArr[0], timeArr[1], 0)
  return date
}

async function importRegisters() {
  try {
    await Promise.all(
      jsonRegisters.map(jsonRegister => {
        const date = getDate(jsonRegister.date)

        const register = {
          date,
          registers: jsonRegister.registers
            .filter(r => r !== '--')
            .map((r) => getDatetime(new Date(date.getTime()), r))
        }

        return db.collection('registers').add(register)
      })
    )
    process.exit(0)
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }

}

// readCsv()
importRegisters()