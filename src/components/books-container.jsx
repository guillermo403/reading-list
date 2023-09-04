import * as bookService from '../services/books-service'

export default function BooksContainer({ books, updateReadingList }) {
  const readinglist = bookService.getReadingList()

  return (
    <section>
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
            {!readinglist.some(b => b === book) && (
              <p
                className='addToList'
                onClick={() => updateReadingList({ book })}
              >
                Añadir a lista de lectura
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
