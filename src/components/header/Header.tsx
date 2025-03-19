import './header.css'
import logoImage from "/hourglass.png?url"
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { useNavigate, Outlet } from 'react-router-dom';

/**
 * Still have some things to finish, so this is not completely done yet
 */

function Header() {
  const navigate = useNavigate()
  return (
    <>
    <header>
      <div className="header-logo">
        <h1>Momentum</h1>
        <span><img src={logoImage} alt="Hour glass logo" /></span>
      </div>
      <div className="header-action-buttons">
        <SecondaryButton title="თანამშრომლის შექმნა" onClick={() => {}} />
        <PrimaryButton title="შექმენი ახალი დავალება" onClick={() => {navigate('/new-assignment')}} />
      </div>
    </header>
    <Outlet />
    </>
  )
}

export default Header;