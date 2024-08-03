import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MapPage from './pages/MapPage'
import NewsPage from './pages/NewsPage'
import MainPage from './pages/MainPage'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/map' element={<MapPage />} />
				<Route path='/news' element={<NewsPage />} />
				<Route path='*' element={<h1>not found</h1>} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
