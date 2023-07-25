import { redirectToAuthCodeFlow } from '../../auth/authCodeWithPkce'
import { MouseEvent } from 'react'

const clientId = import.meta.env.VITE_CLIENT_ID
const clientSecret = import.meta.env.VITE_CLIENT_SECRET

const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
	e.preventDefault()
	redirectToAuthCodeFlow(clientId)

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
}

const LoginToSpotify = () => <a onClick={handleClick}>Login to Spotify</a>

export default LoginToSpotify
