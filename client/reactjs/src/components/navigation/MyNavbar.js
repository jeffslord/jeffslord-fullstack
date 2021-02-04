import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

function MyNavbar(props) {
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand>Jeffrey Lord</Navbar.Brand>
            <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/games/servers/">Game Servers</Nav.Link>
                <NavDropdown title="Tools" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/tools/cvoptimizer/">HANA Calculation View Optimizer</NavDropdown.Item>
                    {/* <NavDropdown.Item href="">Games</NavDropdown.Item> */}
                </NavDropdown>
            </Nav>
        </Navbar>
    )
}
export default MyNavbar;