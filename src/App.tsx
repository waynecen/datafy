import { useEffect, useState } from 'react'
import './App.css'
import LoginToSpotify from './components/buttons/LoginToSpotify'

const clientId = import.meta.env.VITE_CLIENT_ID
const clientSecret = import.meta.env.VITE_CLIENT_SECRET

// Types
interface ArtistData {
	followers: {
		total: number
	}
}

function App() {
	const [accessToken, setAccessToken] = useState<string>('')
	const [artistData, setArtistData] = useState<Partial<ArtistData>>({})

	// POST req for access token
	useEffect(() => {
		const authParameters = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
		}

		fetch('https://accounts.spotify.com/api/token', authParameters)
			.then(res => res.json())
			.then(data => setAccessToken(data.access_token))
			.catch(error => console.error('Cannot fetch access token:', error))

		// GET req for Artist Data
		const params = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}

		const fetchArtist = async () => {
			await fetch(
				'https://api.spotify.com/v1/artists/7kOrrFIBIBc8uCu2zbxbLv?si=TkQubcPnTF2KrnN6TQdxrw',
				params
			)
				.then(res => res.json())
				.then(data => setArtistData(data))
		}
		fetchArtist()
	}, [accessToken])

	return (
		<>
			<LoginToSpotify />
			{artistData ? artistData.followers?.total : ''}
		</>
	)
}

export default App
