import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MapPage from './pages/MapPage'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/map' element={<MapPage />} />
				<Route path='*' element={<h1>not found</h1>} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
