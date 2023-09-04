import './App.scss'
import { useState, useEffect } from 'react'
import BooksContainer from './components/books-container'
import ReadingList from './components/readinglist'
import * as bookService from './services/books-service'
import Filters from './components/filters'

function App() {
  const [filteredBooks, setFilteredBooks] = useState(bookService.getAll())
  const [readinglist, setReadinglist] = useState(bookService.getReadingList())

  const isReadingListEmpty = readinglist.length < 1 ? true : false

  const updateReadingList = ({ book }) => {
    const newReadinglist = structuredClone(readinglist)
    newReadinglist.push(book)
    setReadinglist(newReadinglist)
    bookService.updateReadingList({ readinglist: newReadinglist })
  }

  const handleSelectGenre = selectedGenre => {
    if (selectedGenre === undefined) setFilteredBooks(bookService.getAll())
    else setFilteredBooks(bookService.getFilteredBooks(selectedGenre))
  }

  const handleStorageChange = () => {
    setReadinglist(bookService.getReadingList())
  }

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange)

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          lineHeight: '0'
        }}
      >
        <h1>{filteredBooks.length} libros disponibles</h1>
        {isReadingListEmpty ? undefined : (
          <h2 style={{ fontSize: '1.2em' }}>
            {readinglist.length} libros en la lista de lectura
          </h2>
        )}
      </div>

      <Filters onSelectGenre={handleSelectGenre} />

      <main>
        <BooksContainer
          books={filteredBooks}
          updateReadingList={updateReadingList}
        />
        {isReadingListEmpty ? undefined : (
          <ReadingList
            books={readinglist}
            updateReadingList={setReadinglist}
          />
        )}
      </main>
    </>
  )
}

export default App
