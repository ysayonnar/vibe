import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MapPage from './pages/MapPage'
import NewsPage from './pages/NewsPage'
import MainPage from './pages/MainPage'
import RegistrationFormPage from './pages/RegistrationFormPage'
import LoginFormPage from './pages/LoginFormPage'
import UserSettingsPage from './pages/UserSettingsPage'
import FriendsPage from './pages/FriendsPage'
import PlacePage from './pages/PlacePage'
import PlacesPage from './pages/PlacesPage'
import PlaceCreate from './PlaceCreate/PlaceCreate'
import FavouritePage from './pages/FavouritePage'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/registration' element={<RegistrationFormPage />} />
				<Route path='/login' element={<LoginFormPage />} />
				<Route path='/map' element={<MapPage />} />
				<Route path='/news' element={<NewsPage />} />
				<Route path='/user' element={<UserSettingsPage />} />
				<Route path='/friends' element={<FriendsPage />} />
				<Route path='*' element={<h1>not found</h1>} />
				<Route path='/place/:id' element={<PlacePage />} />
				<Route path='/places' element={<PlacesPage />} />
				<Route path='/placeCreate' element={<PlaceCreate />} />
				<Route path='/favourite' element={<FavouritePage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
