import { collection, addDoc, serverTimestamp, onSnapshot, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore'


export const handleTodos = (db) => {

  const colRef = collection(db, 'todos')

  onSnapshot(colRef, (snapshot) => {

    const todos = []
    let todosHtml = ''
    snapshot.docs.forEach(doc => {
      todos.push({ id: doc.id, ...doc.data() })
      todosHtml += `
      <div>
          <label >
            <input type="checkbox" ${doc.data().checked ? 'checked' : ''} data-id="${doc.id}" />
            ${doc.data().title}
          </label>
          <span data-id="${doc.id}"> x </span>
        </div>
      
      `
    })
    console.log('todos', todos)
    const todosEl = document.querySelector('#todos')
    todosEl.innerHTML = todosHtml

    deleteTodo(db)
    updataTodo(db)
  })

  addTodo(colRef)
  getTodo(db)

}


const addTodo = (ref) => {
  const todosForm = document.querySelector('.todo-form')
  todosForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log("ADD_TODO ", todosForm.todo.value)

    try {
      await addDoc(ref, {
        title: todosForm.todo.value,
        createdAt: serverTimestamp()
      })
      todosForm.reset()
    } catch (error) {
      console.log(error.message)
    }

  })
}

const deleteTodo = (db) => {
  const deleteBtns = document.querySelectorAll('#todos span')
  if (!deleteBtns || !deleteBtns.length) return;
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      console.log("DELETE_TODO", e.target.getAttribute('data-id'))
      const id = e.target.getAttribute('data-id')
      const docRef = doc(db, 'todos', id)

      try {
        await deleteDoc(docRef)
        console.log('todo deleted')
      } catch (error) {
        console.log(error.message)
      }
    })
  })

}

const updataTodo = (db) => {

  const cboxes = document.querySelectorAll('#todos input')
  if (!cboxes || !cboxes.length) return;
  cboxes.forEach(cbox => {
    cbox.addEventListener('change', async (e) => {
      console.log("UPDATE_TODO", e.target.getAttribute('data-id'), e.target.checked)

      const id = e.target.getAttribute('data-id')
      const checked = e.target.checked
      const docRef = doc(db, 'todos', id)

      try {
        await updateDoc(docRef, { checked })
        console.log('todo updated')
      } catch (error) {
        console.log(error.message)
      }

    })
  })
}


const getTodo = async (db) => {

  console.log('getTodo ')
  const docRef = doc(db, 'todos', 'EPypTla3ETDnqJhZfrlA')
  const data = await getDoc(docRef)
  console.log('getTodo', data.data())
}



