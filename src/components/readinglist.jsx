import IconClose from './icons/close'
import * as bookService from '../services/books-service'

export default function ReadingList({ books, updateReadingList }) {
  const handleClick = ({ book }) => {
    const newReadingList = bookService.removeFromReadingList({ book })
    updateReadingList(newReadingList)
  }

  return (
    <section className='reading-list'>
      <ul className='books-container'>
        {books.map(book => (
          <li
            key={book.ISBN}
            className='book-card'
          >
            <img
              src={book.cover}
              alt={book.title}
            />
            <div
              className='close'
              onClick={() => handleClick({ book })}
            >
              <IconClose />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
