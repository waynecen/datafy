interface ArtistProps {
	followers: number
}

const ArtistProfile: React.FC<ArtistProps> = ({ followers }) => {
	return (
		<section>
			<h3>Followers:</h3>
			<span>{followers}</span>
		</section>
	)
}

export default ArtistProfile
