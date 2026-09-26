import styles from './ShowMoreButton.module.css'

type ShowMoreButtonProps = {
  onClick: () => void
}

function ShowMoreButton({ onClick }: ShowMoreButtonProps) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      Pokaż więcej
    </button>
  )
}

export default ShowMoreButton
