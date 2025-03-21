import './header.css'
import logoImage from "/hourglass.png?url"
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { useNavigate, Outlet } from 'react-router-dom';
import { useRef } from 'react';
import NewUserModal from '../modal/NewEmployeeModal';

function Header() {
  const navigate = useNavigate()
  const dialog = useRef<HTMLDialogElement>(null)

  const handleDialogOpen = () => {
    dialog.current?.showModal();
  }
  return (
    <>
    <header>
      <div className="header-logo">
        <h1>Momentum</h1>
        <span><img src={logoImage} alt="Hour glass logo" /></span>
      </div>
      <div className="header-action-buttons">
        <SecondaryButton title="თანამშრომლის შექმნა" onClick={handleDialogOpen} />
        <PrimaryButton title="შექმენი ახალი დავალება" onClick={() => {navigate('/new-assignment')}} />
      </div>
    </header>
    <NewUserModal ref={dialog}/>
    <Outlet />
    </>
  )
}

export default Header;