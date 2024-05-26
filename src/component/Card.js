import React from 'react';
import './Card.css'

function Card(props) {
  const data = props.data
  const id = data.id
  const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const imgURL = data.sprites.front_default
  
  return (
    <section className='card-container'>
      <div className='card-container-title'>
        <span className='card-title-name' title={name}>
          {name}
        </span>
        <span className='card-title-id'>
          {id}
        </span>
      </div>
      <div className='card-container-img'>
        <img className='card-img-img' loading='lazy' src={imgURL} alt={'Pokemon ' + name}/>
      </div>

      <div className='card-container-stats'>
        <table className='card-stats-table'>
          {data.stats.map(stat_ => {
            let name;
            switch (stat_.stat.name) {
              case 'hp':
                name = 'HP'
                break;
              case 'attack':
                  name = 'ATTACK'
                  break;
              case 'defense':
                  name = 'DEFENSE'
                  break;
              case 'special-attack':
                  name = 'SP. ATK'
                  break;
              case 'special-defense':
                  name = 'SP. DEF'
                  break;
              case 'speed':
                  name = 'SPEED'
                  break;
              default:
                name = 'Undefine'
                break;
            }
            
            const effort = stat_.effort
            return (
              <tr className={"stats-" + stat_.stat.name + " stats-font"}>
                <td>{name}</td>
                <td>{effort}</td>
              </tr>
            )
          })}
        </table>
      </div>

    </section>
  )

}

export default Card;
