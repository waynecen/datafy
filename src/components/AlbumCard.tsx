import styles from "../styles/components/AlbumCard.module.scss";

interface AlbumCardProps {
  image: string;
  name: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ image, name }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt="AlbumCover"></img>
      <h3 className={styles.albumTitle}>{name}</h3>
    </div>
  );
};

export default AlbumCard;
