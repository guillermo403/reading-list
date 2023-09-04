import data from '../books.json'
const books = data.library.map(book => book.book)

function getAll() {
  return books
}

function getReadingList() {
  const isbnList = JSON.parse(
    window.localStorage.getItem('reading-list') ?? '[]'
  )
  const readinglist = books.filter(book => isbnList.includes(book.ISBN))
  return readinglist
}

function updateReadingList({ readinglist }) {
  const newReadinglist = readinglist.map(book => book.ISBN)
  window.localStorage.setItem('reading-list', JSON.stringify(newReadinglist))
}

function removeFromReadingList({ book }) {
  const newReadingList = getReadingList()
  const bookIndex = newReadingList.findIndex(b => b.ISBN === book.ISBN)

  if (bookIndex === -1) return newReadingList

  newReadingList.splice(bookIndex, 1)
  updateReadingList({ readinglist: newReadingList })
  return newReadingList
}

function getFilteredBooks(selectedGenre) {
  return books.filter(book => book.genre === selectedGenre)
}

export {
  getAll,
  getReadingList,
  updateReadingList,
  removeFromReadingList,
  getFilteredBooks
}
