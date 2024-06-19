import React from 'react'

const BookmarkContext = React.createContext()

const BookmarkProvider = ({children}) => {
    const [bookmark, setBookmark] = React.useState([])
    
    const addBookmark = (item) =>{
        setBookmark((preBookmark) => [...preBookmark,item])
    }

    const removeBookmark = (itemId) =>{
        setBookmark((preBookmark) => preBookmark.filter(bookmark => bookmark.id !== itemId))
    }

  return (
    <BookmarkContext.Provider value={{bookmark, addBookmark, removeBookmark}}>{children}</BookmarkContext.Provider>
  )
}

const useBookmark = () => React.useContext(BookmarkContext)

export  {BookmarkProvider, useBookmark}