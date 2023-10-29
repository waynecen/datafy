import styles from "../styles/components/AlbumCard.module.scss";

interface AlbumCardProps {
  image: string;
  name: string;
  onClick: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ image, name, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={image} alt="AlbumCover"></img>
      <h3 className={styles.albumTitle}>{name}</h3>
    </div>
  );
};

export default AlbumCard;
