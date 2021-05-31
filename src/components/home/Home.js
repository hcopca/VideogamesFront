import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import MY_SERVICES  from '../../services'

function Home() {
  const [videogames, setVideogames] = useState(null)
  const history = useHistory()
  useEffect(()=>{
    MY_SERVICES.getVideogames()
    .then(({data})=> setVideogames(data.videogames))
    .catch(err => console.log(err))
  },[])

  const goVideogame =()=>{
    history.push('/create-videogame')
  }

  const onDelete =(id)=>{
    MY_SERVICES.deleteVideogame(id)
    .then(({data})=>{
      const newData = videogames.filter(videogame => videogame._id !== data.videogame._id)
      setVideogames(newData)
    })
    .catch(err => console.log(err))
  }

  if(!videogames)return <p>Loading..</p>

  return (
    <div>
    <div className="header">
      <button onClick={goVideogame}>Create Videogame</button>
    </div>
    <div className="main">
      {videogames.map((e,i)=>{
        return(
          <div className="card">
            <img src={e.image} alt="image-game" width="200px" height="300px"/>
            <Link to={`/detail/${e._id}`}><p>{e.name}</p></Link> 
            <p className="paragraph">{e.description}</p>
            <p>{e.developer.name}</p>
            <p>{e.year}</p>
            
              {e.console.map((e,i)=>{
                return(   
                  <ul>   
                  <li>{e.name}</li>
                  </ul>
                  )
                }
                )}
              <button onClick={()=> onDelete(e._id)}>Delete</button>
            
          </div>
        )
      })}
    </div>
    </div>
  );
}

export default Home;
