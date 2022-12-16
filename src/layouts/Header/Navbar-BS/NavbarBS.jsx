import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavbarBS.css'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ButtonNav from '../../../components/ButtonNav/ButtonNav';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import userActions from '../../../redux/actions/userActions';

export default function NavbarBS() {
  let { online, name, photo, token } = useSelector(state => state.user)
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { logout } = userActions;

  useEffect(() => {
    setOpen(false)
    // eslint-disable-next-line
  }, [location])

  function signOut() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!'
    })
        .then((result) => {
            if (result.isConfirmed) {
                dispatch(logout(token))
                Swal.fire(
                    'Logged out!',
                    'You have been logged out',
                    'success'
                )
            }
        })
}

  return (
    <Navbar className='navBar' bg="transparent" expand="lg" variant="dark" >
      <Container className='nav-flex2' style={{ alignItems: 'center', display: 'flex' }}>
        <div>
          <Link className='logo-redirect-nav' to='/'>
            <img className='navbar-logo mr-2' src='../assets/img/logo.png' alt="Logo" />
            <Navbar.Brand style={{ margin: '0' }}>TicketsPass</Navbar.Brand>
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='navColapse'>
          <Nav className="me-auto nav-flex1">
            <Link className='nav-btn' to="/">Home</Link>
            <Link className='nav-btn' to="/artists">Artists</Link>
            <Link className='nav-btn' to="/concerts">Concerts</Link>
            <Link className='nav-btn-cart' to="cart"><img src="../assets/img/cart.png" alt="cart" width='40px' /></Link>
            {!online ? (
              <div>
                <ButtonNav fx={() => setOpen(!open)} />
                {open && (
                  <div className='menu'>
                    <Link className='nav-btn' to="signup">Sign Up</Link>
                    <Link className='nav-btn' to="signin">Sign In</Link>
                  </div>
                )}
              </div>
            ) : (
              <div className='d-flex flex-column align-items-center justify-content-center gap-1 pt-4'>
                <img src={photo} width='40' alt="userLoged" onClick={() => setOpen(!open)} />
                <h5 className='text-white fs-6'>{name}</h5>
                {open && (
                  <div className='menu'>
                    <Link className='nav-btn' to="profile">My Profile</Link>
                    <Link className='nav-btn' onClick={signOut}>Logout</Link>
                  </div>
                )}
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
