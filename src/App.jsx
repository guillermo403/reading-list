import './App.scss'
import { useState } from 'react'
import BooksContainer from './components/books-container'
import ReadingList from './components/readinglist'
import * as booksService from './services/books-service'
import Filters from './components/filters'

function App() {
  const [filteredBooks, setFilteredBooks] = useState(booksService.getAll())
  const [readinglist, setReadinglist] = useState(booksService.getReadingList())

  const isReadingListEmpty = readinglist.length < 1 ? true : false

  const updateReadingList = ({ book }) => {
    const newReadinglist = structuredClone(readinglist)
    newReadinglist.push(book)
    setReadinglist(newReadinglist)
    booksService.updateReadingList({ readinglist: newReadinglist })
  }

  const handleSelectGenre = selectedGenre => {
    if (selectedGenre === undefined) setFilteredBooks(booksService.getAll())
    else setFilteredBooks(booksService.getFilteredBooks(selectedGenre))
  }

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
