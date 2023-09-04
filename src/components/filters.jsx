import { useState } from 'react'
import { GENRES } from '../lib/constants'

const Filters = ({ onSelectGenre }) => {
  const [rangeValue, setRangeValue] = useState(2)

  const handleRangeChange = e => {
    setRangeValue(e.target.value)
  }

  const handleSelect = e => {
    const selectedGenre = GENRES[e.target.value]
    onSelectGenre(selectedGenre)
  }

  return (
    <article className='filters'>
      <div>
        <label>Filtrar por páginas</label>
        <div className='ranged-input'>
          <input
            onChange={handleRangeChange}
            type='range'
            value={rangeValue}
            min={1}
            max={10}
          />
          <p className='bubble'>{rangeValue}</p>
        </div>
      </div>

      <div>
        <label>Filtrar por género</label>
        <select onChange={handleSelect}>
          <option value='all'>Todos</option>
          {Object.entries(GENRES).map(genre => (
            <option
              value={genre[0]}
              key={genre[0]}
            >
              {genre[1]}
            </option>
          ))}
        </select>
      </div>
    </article>
  )
}

export default Filters
