import {
	redirectToAuthCodeFlow,
	getAccessToken,
} from '../../auth/authCodeWithPkce'
import { MouseEvent } from 'react'

const clientId = import.meta.env.VITE_CLIENT_ID
// const clientSecret = import.meta.env.VITE_CLIENT_SECRET
const params = new URLSearchParams(window.location.search)
const code = params.get('code')

const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
	e.preventDefault()
	if (!code) {
		redirectToAuthCodeFlow(clientId)
	} else {
		const accessToken = await getAccessToken(clientId, code)
		console.log(accessToken)
	}
}

const LoginToSpotify = () => <a onClick={handleClick}>Login to Spotify</a>

export default LoginToSpotify
