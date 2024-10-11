import logo from './assets/logo.png';

export default function Header() {
    return (
        <nav className='navbar bg-light mb-2 p-0'>
            <div className="container">
                <div className="d-flex align-items-center">
                    <a className="navbar-brand" href="/Home">
                        <div className="d-flex align-items-center">
                            <img src={logo} alt="logo" className="mr-2" />
                            <div>Project Mgmt</div>
                        </div>
                    </a>
                    <a className="navbar-brand navbar-brand-menu" href="/Clients">
                        <div className="d-flex align-items-center">
                            <div>Clients</div>
                        </div>
                    </a>
                    <a className="navbar-brand navbar-brand-menu" href="/Projects">
                        <div className="d-flex align-items-center">
                            <div>Projects</div>
                        </div>
                    </a>
                    <a className="navbar-brand navbar-brand-menu" href="/Movies">
                        <div className="d-flex align-items-center">
                            <div>Movies</div>
                        </div>
                    </a>
                    <a className="navbar-brand navbar-brand-menu" href="/Todos">
                        <div className="d-flex align-items-center">
                            <div>Todos</div>
                        </div>
                    </a>
                </div>
                <div className="nav-item">
                    <a href="https://graphql-20240902.azurewebsites.net/graphql" target="_blank" rel="noopener noreferrer" className="green-bold-link">
                    GraphQL Playground
                    </a>
                </div>
                <div className="navbar-text d-none d-sm-block">
                    <span className="text-primary fw-bold">React</span>: ^18.3.1  
                    <span className="text-primary fw-bold">GraphQL</span>: ^16.9.0
                </div>
            </div>
        </nav>
    )
}

