import { useEffect, useState } from 'react'
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";

function App() {
  const db = getDatabase();

  let formdata = {
    Firstname: "",
    Lastname: "",
    Country: "",
    Phone: "",
    Email: "",
    Password: ""
  }

  let [text, setText] = useState(formdata)
  let [data, setData] = useState([])
  let [toggle, setToggle] = useState(false)
  let [textid, setTextid] = useState()

  let handleForm = (e) =>{
    let {name, value} = e.target
    setText({...text,[name]:value});
  }
 
  // Write operation //

  let handleSubmit = (e) =>{
    e.preventDefault()
    set(push(ref(db, "all_data")),{
      User : text
    })
    setText(formdata)
  }

  // Read operation //

  useEffect(()=>{
    const dataRef = ref(db, 'all_data');
    onValue(dataRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(),id:item.key})
    })
      setData(arr)
    });
  },[])

  // Delete operation //

  let handleDelete = (id) =>{
    remove(ref(db,'all_data/'+ id)).then(()=>(
      console.log("delete done")
    ))
  }

  // Update operation //

  let handleEdit = (item) => {
    setTextid(item.id)
    setText(item.User)
    setToggle(true)
  }
  
  let handleUpdate = (e) => {
    e.preventDefault()
    update(ref(db, 'all_data/'+ textid),{
      User : text,
    }).then(()=>{
      setToggle(false)
      setText(formdata)
    })
  }

  return (
    <>
      <div className="login-box">
        <h2>Form</h2>
        <form action='' method=''>
          <div className="user-box">
            <input type="text"  name="Firstname" required="" value={text.Firstname} onChange={handleForm}/>
            <label>Firstname</label>
          </div>
          <div className="user-box">
            <input type="text" name="Lastname" required="" value={text.Lastname} onChange={handleForm}/>
            <label>Lastname</label>
          </div>
          <div className="user-box">
            <input type="text" name="Country" required="" value={text.Country} onChange={handleForm}/>
            <label>Country</label>
          </div>
          <div className="user-box">
            <input type="number" name="Phone"  required="" value={text.Phone} onChange={handleForm}/>
            <label>Phone</label>
          </div>
          <div className="user-box">
            <input type="email" name="Email"  required="" value={text.Email} onChange={handleForm}/>
            <label>Email</label>
          </div>
          <div className="user-box">
            <input type="password" name="Password" required="" value={text.Password} onChange={handleForm}/>
            <label>Password</label>
          </div>
          {toggle
          ?
          <button type='submit' onClick={handleUpdate}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Update
           </button>
           :
           <button type='submit' onClick={handleSubmit}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
           </button>
          }
             
        </form>
      </div>


      <div className="card">
        <div className="card-header">
          <h1>User List</h1>
        </div>
        <div className="card-body">
          <table className='table table-bordered'>
            <tbody>
              <th>Fisrtname</th>
              <th>Lastname</th>
              <th>Country</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Password</th>
              <th>Action</th>
            </tbody>
            <tr>
              <td>
                {
                  data.map((item,index)=>(
                    <p key={index}>{item.User.Firstname}</p>
                  ))
                }
              </td>
              <td>
                {
                  data.map((item,index)=>(
                    <p key={index}>{item.User.Lastname}</p>
                  ))
                }
              </td>
              <td>
                {
                  data.map((item,index)=>(
                    <p key={index}>{item.User.Country}</p>
                  ))
                }
              </td>
              <td>
                {
                  data.map((item,index)=>(
                    <p key={index}>{item.User.Email}</p>
                  ))
                }
              </td>
              <td>
                {
                  data.map((item,index)=>(
                    <p key={index}>{item.User.Phone}</p>
                  ))
                }
              </td>
              <td>
                {
                  data.map((item,index)=>(
                    <p key={index}>{item.User.Password}</p>
                  ))
                }
              </td>
              <td>
                {
                  data.map((item,index)=>(
                    <div key={index} className='btn'>
                      <button className='edit' onClick={()=>handleEdit(item)}>Edit</button>
                      <button onClick={()=>handleDelete(item.id)}>Delete</button>
                    </div>
                  ))
                }
              </td>
            </tr>
          </table>
        </div>
      </div>

    </>
  )
}

export default App
