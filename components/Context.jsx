import React from 'react'

var appContext = React.createContext()
export var useGlobalContext = () => React.useContext(appContext)
var getInitialMode = () => {
  var preferredMode = window.matchMedia('(prefers-color-scheme:dark)').matches
  var localTheme = localStorage.getItem('dark-theme') === 'true'
  return localTheme || preferredMode
}
export var AppProvider = ({ children }) => {
  var [isDarkTheme, setIsDarkTheme] = React.useState(getInitialMode())
  var [searchTerm, setSearchTerm] = React.useState('sword')
  var toggleDarkTheme = () => {
    var reverseDarkTheme = !isDarkTheme
    setIsDarkTheme(reverseDarkTheme)
    var body = document.querySelector('body')
    body.classList.toggle('dark-theme', reverseDarkTheme)
    localStorage.setItem('dark-theme', reverseDarkTheme)
  }
  return (
    <appContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </appContext.Provider>
  )
}
