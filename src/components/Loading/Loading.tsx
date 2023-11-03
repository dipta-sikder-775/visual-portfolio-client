import { CgSpinner } from 'react-icons/cg'
import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles["loading-container"]}>
        <CgSpinner className={styles.icon} />
    </div>
  )
}

export default Loading