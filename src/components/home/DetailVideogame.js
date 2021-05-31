import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import MY_SERVICES from '../../services'

export const DetailVideogame = (props) => {
  const history = useHistory()
  const [videogame, setVideogame] = useState(null)
  useEffect(()=>{
    MY_SERVICES.detailVideogame(props.match.params.id)
    .then(({data})=> setVideogame(data.videogame))
    .catch(err => console.log(err))
  },[])

  const goBack = () =>{
    history.push('/')
  }
  if(!videogame)return <p>Loading...</p>
  return (
    <div className="main">
      <div className="card-detail">
        <img src={videogame.image} width="400px" height="500px"  alt="image-game"/>
        <p>{videogame.name}</p>
        <p>{videogame.description}</p>
        <p>{videogame.year}</p>
        <p>{videogame.developer.name}</p>
        {videogame.console.map((e,i)=>{
          return(   
            <ul>   
            <li>{e.name}</li>
            </ul>
            )
          }
          )}
          <button onClick={goBack}>Regresar</button>

      </div>

    </div>
  )
}
