import { MdMenu, MdClose }from 'react-icons/md';
import styles from '../styles/Home.module.css';
type Props = {
    isOpen: boolean,
    isDesktop: boolean,
}
const Hamburger = ({isOpen, isDesktop}: Props) => {

    const renderHamburger = () => {
        return (
            <div>
              {isOpen ? <MdClose className={styles['mobile-icon-style']}/> : <MdMenu className={styles['mobile-icon-style']}/>}
            </div>
        )
    }

  return (
    <>
    {!isDesktop && renderHamburger()}
    </>
  )
}

export default Hamburger;