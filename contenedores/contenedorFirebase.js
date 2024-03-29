import admin from "firebase-admin"
import configs from "../configs.js"

// DEPRECADO -------------------------
admin.initializeApp({
  credential: admin.credential.cert(configs.firestore),
  databaseURL: "https://e-drink-backend.firebaseio.com"
})

export default class ContenedorFirebase {
  constructor(collection) {
    this.db = admin.firestore()
    this.query = this.db.collection(collection)
  }

  async getAll() {
    try {
      const result = []
      const snapshot = await this.query.get()
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() })
      })
      return result
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`)
    }
  }

  async getById(id) {
    try {
      const doc = await this.query.doc(id).get()
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`)
      } else {
        const data = doc.data()
        return { ...data, id }
      }
    } catch (error) {
      throw new Error(`Error al listar por id: ${error}`)
    }
  }

  async deleteById(id) {
    try {
      const doc = this.query.doc(id);
      const item = await doc.delete()
      console.log("el usuario a sido borrado exitosamente", item)
    } catch (e) {
      console.log(e)
    }
  }

  async create(item) {
    try {
      const guardado = await this.query.add(item)
      return { ...item, id: guardado.id }
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`)
    }
  }
}