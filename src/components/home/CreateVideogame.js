import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import MY_SERVICES  from '../../services'
import handleAsync from '../../utils/handleAsync';

function CreateVideogame() {
  const history = useHistory()
  const [form, setForm] = useState({});
  const [img, setImg] = useState("")
  const [msg, setMsg] = useState(false)
  const [consoles, setConsoles] = useState(null)
  const [developers, setDevelopers] = useState(null)
  const handleInput = (e) => {
    e.persist();
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(()=>{
    MY_SERVICES.getConsoles()
    .then(({data})=> setConsoles(data.consoles))
    .catch(err => console.log(err))
    MY_SERVICES.getDevelopers()
    .then(({data})=> setDevelopers(data.developers))
    .catch(err => console.log(err))
  },[])
  const handleImage = async e => {
    const formData = new FormData()
    formData.append('photo', e.target.files[0])
    const response = await handleAsync(()=>  MY_SERVICES.upload(formData))
    setImg(response.img)
  }


  const submit = (e) => {
    if(form.developer === undefined || form.console === undefined || img === ""){
      e.preventDefault()
      setMsg(true)
    }
    else{
      e.preventDefault();
      form.isActive === 'on' ? form.isActive = true : form.isActive = false
      const developer = form.developer.split('.')
      const console = form.console.split('.')
      form.developer ={
        _id: developer[1],
        name: developer[0]
      }
      form.console = {
        _id: console[1],
        name: console[0]
      }
      const data = {
        ...form,
        image: img,
      };
      MY_SERVICES.addVideogame(data)
        .then(({ data }) => {
          history.push("/");
        })
        .catch((err) => console.log(err.response));
    }
    
  };

  const goBack = () =>{
    history.push('/')
  }

  if(!consoles || !developers)return <p>Loading</p>
  return (
    <div >
      <div className="header">
        <h2>Add a Videogame</h2>
      </div>
        <div >
        <form className="form" onSubmit={submit}>
        <label htmlFor="name">Name</label>
        <input required type="text" onChange={handleInput} name="name"  />
        <label htmlFor="description">Description</label>
        <textarea required maxLength="300" onChange={handleInput} name="description"/>
        <label htmlFor="developer">Developer</label>
        <select onChange={handleInput} name="developer">
        <option defaultChecked >Selecciona una opción</option>
          {developers.map((e,i)=>{
            return(
              <option key={e._id} value={`${e.name}.${e._id}`}>{e.name}</option>
            )
          })}
        </select>
        <label htmlFor="year">Year</label>
        <input type="number" pattern="/^[0-9]$/" onChange={handleInput} name="year"/>
        <label htmlFor="console">Console</label>
        <select onChange={handleInput} name="console">
        <option defaultChecked >Selecciona una opción</option>
          {consoles.map((e,i)=>{
            return(
              <option key={e._id} value={`${e.name}.${e._id}`}>{e.name}</option>
            )
          })}
        </select>
        <label htmlFor="image">Image</label>
        <input onChange={handleImage} type="file" id="photo" name="photo"/>
        <label htmlFor="isActive">Active</label>
        <input required type="checkbox" onChange={handleInput} name="isActive"/>
        <input type="submit" />
        </form>
        {msg ? <p>Todos los campos son obligatorios</p> : null }
        </div>
        <button onClick={goBack}>Regresar</button>
    
    </div>
  );
}

export default CreateVideogame;
