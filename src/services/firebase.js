import { database } from '../utils/firebase'

export default class FirebaseService {
  static getRegisters = (callback) => {
    try {
      database.collection('records').onSnapshot((snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          date: doc.get('date').toDate()
        }))
        callback(items)
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
