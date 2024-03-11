import { Link, useNavigate } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import "./dashboard.css";
import axios from "axios";
import { Details } from "../details/details";
const menu = createContext();

export function DashBoard() {
  const [active, setActive] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSerach] = useState();
  const [val, setVal] = useState();
  const [user,setUser] = useState({});

  let nevigate = useNavigate();

  function handleMenuClick() {
    setActive((current) => !current);
  }
  function handleClick(e) {
    axios
      .get(
        `https://api.edamam.com/search?q=${e.target.name}&app_id=681295be&app_key=3daddffcdb5a9acd8a5c81cc60270361`
      )
      .then((res) => {
        setData(res.data.hits);
      });
  }
  function handleChange(e) {
    setSerach(e.target.value);
  }
  function handleSearchBtn() {
    axios
      .get(
        `https://api.edamam.com/search?q=${search}&app_id=681295be&app_key=3daddffcdb5a9acd8a5c81cc60270361`
      )
      .then((res) => {
        setData(res.data.hits);
      });
  }

  // retrive payload from jwt token================>
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

  //function for userLogout===============>
    function handleLogout(){
      localStorage.removeItem('token');
      nevigate("/");
    }

    useEffect(()=>{
      const retriveToken = localStorage.getItem('token');
      if(retriveToken==null){
        nevigate("/");
      }else{
        const data = parseJwt(retriveToken);
        console.log(data.isUser);
        setUser(data.isUser);
      }
    },[])

  return (
    <>
      <div id="box-part">
        <header id="header-part">
          <div>
            <p id="brand-name" className="fw-bold">
              The Green Chilli
            </p>
            <img
              id="chilli"
              src="./chilli.png"
              alt=""
              height={50}
              width={150}
            />
          </div>
          <div className={active ? "navBar" : "navBarShow"}>
            <div id="navbar-box">
              <div>
                <Link to="/" className="navMenu-dashboard">
                  HOME
                </Link>
              </div>
              <div>
                <Link className="navMenu-dashboard">ABOUT</Link>
              </div>
              <div>
                <Link className="navMenu-dashboard">CONTECT</Link>
              </div>
            </div>
            <div className="navMenu-dashboard">
                <span>Welcome! {user.name}</span>&nbsp;<button title="logout" className="bi bi-power btn btn-danger" onClick={handleLogout} style={{fontSize:"10px"}}></button>
            </div>
          </div>
          <span
            className="bi bi-list btn"
            id="menuBtn"
            onClick={handleMenuClick}
          ></span>
        </header>
        <div>
          <div id="menu-items">
            <div>
              {" "}
              <img
                onClick={handleClick}
                name="pizza"
                src="./pizza.png"
                alt=""
                height={50}
                width={50}
                title="Pizza"
              />
            </div>
            <div>
              {" "}
              <img
                onClick={handleClick}
                name="pasta"
                src="./pasta.png"
                alt=""
                height={50}
                width={50}
                title="Pasta"
              />
            </div>
            <div>
              {" "}
              <img
                onClick={handleClick}
                name="burger"
                src="./burger.png"
                alt=""
                height={50}
                width={50}
                title="Burger"
              />
            </div>
            <div>
              {" "}
              <img
                onClick={handleClick}
                name="coffee"
                src="./coffee.png"
                alt=""
                height={50}
                width={50}
                title="Coffee"
              />
            </div>
            <div>
              {" "}
              <img
                onClick={handleClick}
                name="ice-cream"
                src="./ice-cream.png"
                alt=""
                height={50}
                width={50}
                title="Ice-Cream"
              />
            </div>
          </div>
          <div id="search-bar">
            <div className="input-group">
              <input
                type="text"
                onChange={handleChange}
                className="form-control border border-success"
                placeholder="Search your recipe..."
                name=""
                id=""
              />
              <button
                className="bi bi-search btn btn-success"
                onClick={handleSearchBtn}
              ></button>
            </div>
          </div>
        </div>
        <div id="foodItems">
          {data.map((item, index) => (
            <div key={index} className="card">
              <div className="card-header fw-semibold text-center">
                {item.recipe.label}
              </div>
              <div className="card-body text-center">
                <img
                  src={item.recipe.image}
                  onClick={async () => {
                    const temp = data[index];
                    await setVal(temp);
                    nevigate("/dashboard/details");
                  }}
                  className="img-thumbnail"
                  alt="pic"
                  width={285}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "none" }}>
          <menu.Provider value={val}>
            <Details />
          </menu.Provider>
        </div>
      </div>
    </>
  );
}

export { menu };
