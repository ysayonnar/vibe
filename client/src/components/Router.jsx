import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MapPage from './pages/MapPage'
import NewsPage from './pages/NewsPage'
import MainPage from './pages/MainPage'
import RegistrationFormPage from './pages/RegistrationFormPage'
import LoginFormPage from './pages/LoginFormPage'
import UserSettingsPage from './pages/UserSettingsPage'

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
				<Route path='*' element={<h1>not found</h1>} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
