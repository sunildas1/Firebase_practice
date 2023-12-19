import { useState } from 'react'
import { getDatabase, ref, set, push } from "firebase/database";


function App() {
  const db = getDatabase();

  let [text, setText] = useState({
    Firstname : "",
    Lastname : "",
    Address : "",
    Phone : "",
    Email : "",
    Note : "",
  })

  let handleForm = (e) =>{
    let {name, value} = e.target
    setText({...text,[name]:value});
  }

  let handleSubmit = () =>{
    set(push(ref(db, "all_data")),{
      User : text
    })
  }

  return (
    <>
      <div className="login-box">
        <h2>Form</h2>
        <form>
          <div className="user-box">
            <input type="text" name="Firstname" required="" onChange={handleForm}/>
            <label>Firstname</label>
          </div>
          <div className="user-box">
            <input type="text" name="Lastname" required="" onChange={handleForm}/>
            <label>Lastname</label>
          </div>
          <div className="user-box">
            <input type="text" name="Address" required="" onChange={handleForm}/>
            <label>Address</label>
          </div>
          <div className="user-box">
            <input type="number" name="Phone" required="" onChange={handleForm}/>
            <label>Phone</label>
          </div>
          <div className="user-box">
            <input type="email" name="Email" required="" onChange={handleForm}/>
            <label>Email</label>
          </div>
          <div className="user-box">
            <textarea name="Note" className='note' placeholder='Notes...' cols="38" rows="7" onChange={handleForm}></textarea>
          </div>
          <button type='submit' onClick={handleSubmit}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default App
