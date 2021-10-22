import { database } from '../utils/firebase'

export const formatRegister = (register) => {
  const data = register.data()
  return {
    id: register.id,
    date: data.date.toDate(),
    registers: data.registers.map((d) => d.toDate())
  }
}

export const formatRegisters = (registers) => {
  return registers.map((register) => formatRegister(register))
}

export const getRegisters = async (callback) => {
  try {
    database.collection('registers').onSnapshot((snapshot) => {
      const formattedRegisters = formatRegisters(snapshot.docs)
      callback(formattedRegisters)
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const getRegister = async (id) => {
  try {
    const result = await database
      .collection('registers')
      .doc(id)
      .get()

    return formatRegister(result)
  } catch (error) {
    console.log(error.message)
  }
}

export const getRegistersByDate = async (startDate, endDate, callback) => {
  try {
    startDate.setHours(0, 0)
    endDate.setHours(23, 59)

    const { docs } = await database
      .collection('registers')
      .orderBy('date', 'desc')
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)
      .onSnapshot((snapshot) => {
        const formattedRegisters = formatRegisters(snapshot.docs)
        callback(formattedRegisters)
      })

    return formatRegisters(docs)
  } catch (error) {
    console.log(error.message)
  }
}

export const getTodayRegisters = async () => {
  try {
    const start = new Date()
    start.setHours(0, 0, 0)

    const { docs } = await database
      .collection('registers')
      .orderBy('date')
      .where('date', '>=', start)
      .limit(1)
      .get()

    return formatRegisters(docs)
  } catch (error) {
    console.log(error.message)
  }
}

export const register = async () => {
  try {
    const now = new Date()
    const todayRegisters = await getTodayRegisters()
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

export const updateRegister = async (id, data) => {
  try {
    await database
      .collection('registers')
      .doc(id)
      .update({ registers: data.registers })
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteRegister = async (id) => {
  try {
    await database
      .collection('registers')
      .doc(id)
      .delete()
  } catch (error) {
    console.log(error.message)
  }
}
