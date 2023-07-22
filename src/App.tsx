import { useEffect } from 'react'
import './App.css'
import LoginToSpotify from './components/buttons/LoginToSpotify'
import UserProfile from './components/UserProfile'

const clientId = import.meta.env.VITE_CLIENT_ID
const clientSecret = import.meta.env.VITE_CLIENT_SECRET

function App() {
	// const [accessToken, setAccessToken] = useState('')

	useEffect(() => {
		const authParameters = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
		}
		fetch('https://accounts.spotify.com/api/token', authParameters)
			.then(result => result.json())
			.then(data => console.log(data.access_token))
	}, [])

	return (
		<>
			<LoginToSpotify />
			<UserProfile />
		</>
	)
}

export default App
