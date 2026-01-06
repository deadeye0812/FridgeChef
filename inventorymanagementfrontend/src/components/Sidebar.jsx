import {Link} from "react-router-dom";

export function SideBar() {
    return (
        <div id="mySidenav" className="sidenav">
            <nav>
                <a href={undefined} className="closebtn" onClick={closeNav}>&times;</a>
                <Link to="/">
                    Alle Lebensmittel
                </Link>
                <Link to="/carbohydrates">
                    Kohlenhydrate
                </Link>
                <Link to="/proteins">
                    Proteine
                </Link>
                <Link to="/snacks">
                    Snacks
                </Link>
                <Link to="/drinks">
                    Getränke
                </Link>
            </nav>
        </div>
    );
}

export function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}