import "./header.css";
import logoImage from "/hourglass.png?url";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { useNavigate, Outlet } from "react-router-dom";
import { useRef } from "react";
import NewUserModal from "../modal/NewEmployeeModal";
import { useEffect } from "react";
function Header() {
  const navigate = useNavigate();
  const dialog = useRef<HTMLDialogElement>(null);

  const handleDialogOpen = () => {
    dialog.current?.showModal();
  };
  useEffect(() => {
    const openModalHandler = () => {
      dialog.current?.showModal();
    };
    window.addEventListener("open-employee-modal", openModalHandler);
    return () => {
      window.removeEventListener("open-employee-modal", openModalHandler);
    };
  }, []);

  return (
    <>
      <header>
        <div
          className="header-logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <h1>Momentum</h1>
          <span>
            <img src={logoImage} alt="Hour glass logo" />
          </span>
        </div>
        <div className="header-action-buttons">
          <SecondaryButton
            title="თანამშრომლის შექმნა"
            onClick={handleDialogOpen}
          />
          <PrimaryButton
            title="შექმენი ახალი დავალება"
            onClick={() => {
              navigate("/new-assignment");
            }}
          />
        </div>
      </header>
      <NewUserModal ref={dialog} />
      <Outlet />
    </>
  );
}

export default Header;
