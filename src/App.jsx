import Map from './components/Map'
import Search from './components/Search'
import MapProvider from './provider/MapProvider'

function App() {
  return (
    <MapProvider>
      <Search />
      <Map geoLoc={false} style={{
        height: '900px',
        width: '100%'
      }} />
    </MapProvider>
  )
}

export default App
