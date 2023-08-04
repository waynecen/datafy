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
		const fetchAccessToken = async () => {
			try {
				const authParameters = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
				}

				const response = await fetch(
					'https://accounts.spotify.com/api/token',
					authParameters
				)
				const data = await response.json()
				setAccessToken(data.access_token)
			} catch (error) {
				console.error('Error fetching access token:', error)
			}
		}

		fetchAccessToken()
	}, [])

	// GET req for Artist Data
	useEffect(() => {
		const fetchArtist = async () => {
			try {
				if (!accessToken) return

				const params = {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}

				const artistResponse = await fetch(
					'https://api.spotify.com/v1/artists/7kOrrFIBIBc8uCu2zbxbLv?si=TkQubcPnTF2KrnN6TQdxrw',
					params
				)

				const artistData = await artistResponse.json()
				setArtistData(artistData)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
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
