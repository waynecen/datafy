const endPoint = 'https://accounts.spotify.com/authorize'
const clientId = import.meta.env.VITE_CLIENT_ID
const token = 'token'

const handleClick = () => {}

const LoginToSpotify = () => (
	<a
		href={`${endPoint}?client_id=${clientId}&redirect_uri=${
			import.meta.env.VITE_REDIRECT_URI
		}&response_type=${token}`}
		onClick={handleClick}
	>
		Login to Spotify
	</a>
)

export default LoginToSpotify
