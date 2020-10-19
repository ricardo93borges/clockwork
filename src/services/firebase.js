import { database } from '../utils/firebase'

export default class FirebaseService {
  static getRegisters = async (callback) => {
    try {
      database.collection('registers').onSnapshot((snapshot) => {
        const registers = snapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            date: data.date.toDate(),
            registers: data.registers.map((d) => d.toDate())
          }
        })
        callback(registers)
      })
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

      const data = result.data()
      return {
        id: result.id,
        date: data.date.toDate(),
        registers: data.registers.map((d) => d.toDate())
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  static getRegistersByDate = async (startDate, endDate) => {
    try {
      startDate.setHours(0, 0)
      endDate.setHours(23, 59)

      const result = await database
        .collection('registers')
        .orderBy('date')
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .get()

      const registers = result.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          date: data.date.toDate(),
          registers: data.registers.map((d) => d.toDate())
        }
      })

      return registers
    } catch (error) {
      console.log(error.message)
    }
  }

  static getTodayRegisters = async () => {
    try {
      const start = new Date()
      start.setHours(0, 0, 0)

      const result = await database
        .collection('registers')
        .orderBy('date')
        .where('date', '>=', start)
        .limit(1)
        .get()

      const registers = result.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          date: data.date.toDate(),
          registers: data.registers.map((d) => d.toDate())
        }
      })

      return registers
    } catch (error) {
      console.log(error.message)
    }
  }

  static register = async () => {
    try {
      const now = new Date()
      const todayRegisters = await this.getTodayRegisters()
      const todayRegister = todayRegisters.length > 0 ? todayRegisters[0] : null

      if (!todayRegister || todayRegister.registers.length === 0) {
        database.collection('registers').add({
          date: now,
          registers: [now]
        })
      } else if (todayRegister.registers.length < 4) {
        database
          .collection('registers')
          .doc(todayRegister.id)
          .update({
            registers: [...todayRegister.registers, new Date()]
          })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  static updateRegister = async (id, data) => {
    try {
      await database
        .collection('registers')
        .doc(id)
        .update({ registers: data.registers })
    } catch (error) {
      console.log(error.message)
    }
  }

  static delete = async (id) => {
    try {
      await database
        .collection('registers')
        .doc(id)
        .delete()
    } catch (error) {
      console.log(error.message)
    }
  }
}
