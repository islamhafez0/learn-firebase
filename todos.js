import { collection, getDoc, addDoc, serverTimestamp, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore"
const loader = document.querySelector('.loader');

export const handleTodos = (db) => {
  const collectionReference = collection(db, 'todos');
  onSnapshot(collectionReference, (snapshot) => {
    loader.style.display = 'grid';
    const todos = []
    let todosInnerHtml = ''
    snapshot.docs.forEach((doc) => {
      todos.push({ id: doc.id, title: doc.data().title });
        todosInnerHtml += `
        <div>
        <label>
          <input type="checkbox" data-id="${doc.id}" ${doc.data().checked ? 'checked' : ''} />
          ${doc.data().title}
        </label>
        <span data-id="${doc.id}"> x </span>
      </div>
      `
    })
    loader.style.display = 'none';
    document.getElementById('todos').innerHTML = todosInnerHtml
    deleteTodo(db)
    updataTodo(db)
  })
  addTodo(collectionReference)
  getTodo(db)
}


const addTodo = (ref) => {
  const todosForm = document.querySelector('.todo-form');
  todosForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
      if(!todosForm.todo.value || !todosForm.todo.value.trim()) {
        alert('add something')
        todosForm.reset()
        return
      }
      await addDoc(ref, {
        title: todosForm.todo.value,
        createdAt: serverTimestamp()
      })
      console.log('added')
    } catch (error) {
      console.log(error)
      loader.style.display = 'none';
    }finally {
      loader.style.display = 'none';
    }
    todosForm.reset()
  })
}


const deleteTodo = (db) => {
  const deleteBtns = document.querySelectorAll('#todos span');
  if(!deleteBtns && !deleteBtns.length) return;
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id');
      const docREF = doc(db, 'todos', id);
      try {
        await deleteDoc(docREF)
        console.log('deleted')
      }catch (error) {
        console.log(error)
        loader.style.display = 'none';
      }finally {
        loader.style.display = 'none';
      }
    })
  })
}

const updataTodo = (db) => {
  const checkBoxs = document.querySelectorAll('#todos input');
  checkBoxs.forEach((cbox) => {
    cbox.addEventListener('change', async (e) => {
      if(!checkBoxs && !checkBoxs.length) return;
      console.log('update', e.target.getAttribute('data-id'), e.target.checked)
      const checked = e.target.checked;
      const id = e.target.getAttribute('data-id');
      const docREF = doc(db, 'todos', id)
      try {
        await updateDoc(docREF, { checked })
        console.log('updated')
      }catch(error) {
        console.log(error)
      }finally {
        loader.style.display = 'none';
      }
    })
  })
}

const getTodo = async (db) => {
  const docREF = doc(db, 'todos', 'W2cnRbiwcPYYe68PCj1G');
  const data = await getDoc(docREF);
  console.log(data.data())
  loader.style.display = 'none';
}