import { database } from '../utils/firebase'

export default class FirebaseService {
  static getRegisters = async (callback) => {
    try {
      database.collection('registers').onSnapshot((snapshot) => {
        const registers = snapshot.docs.map((doc) => ({
          id: doc.id,
          dates: doc.data().dates.map((d) => d.toDate())
        }))
        callback(registers)
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  static getTodayRegisters = async () => {
    try {
      const start = new Date()
      start.setHours(0, 0, 0)

      const result = await database
        .collection('records')
        .where('date', '>=', start)
        .get()

      const registers = result.docs.map((doc) => ({
        id: doc.id,
        date: doc.get('date').toDate()
      }))

      return registers
    } catch (error) {
      console.log(error.message)
    }
  }

  static getRegister = async (id) => {
    try {
      const result = await database
        .collection('registers')
        .doc(id)
        .get()

      return {
        id: result.id,
        dates: result.get('dates').map((d) => d.toDate())
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  static register = async () => {
    try {
      const date = new Date()
      const registers = await this.getTodayRegisters()

      if (registers.length < 4) {
        database.collection('records').add({ date })
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}
