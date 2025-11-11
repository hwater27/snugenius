import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../styles/colors";

const MainBar = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
`;

const Logo = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Menu = styled.li`
    width: 200px;
    height: 80px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-align: center;
    z-index: 15;
    & > a {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 80px;
        &:hover + ul {
            display: block;
        }
    }
    &:hover > a, &:hover > span {
        font-weight: 500;
        color: ${colors.main};
    }
    &:hover > ul {
        display: block;
    }
`;

const SubBar = styled.ul`
    margin: 0;
    padding: 0;
    display: none;
    list-style: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: ${colors.main};
`;

const SubMenu = styled.li`
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    text-align: center;
    a {
        color: #FFFFFF;
    }
    &:hover {
        background-color: ${colors.main};
    } 
`;

export default function NavigationBar() {
  return (
    <nav className="navigation">
      <MainBar className="navbar">
        {/* 로고 이미지 */}
        {/* <Link to="/"><Logo className="logo"><img src={} alt="Logo" width={50} height={50}></img></Logo></Link> */}
        
        {/* 상단 메뉴 */}
        <Menu><Link to="/">상단 메뉴</Link>
          <SubBar>
            <SubMenu><Link to="/">하위 메뉴 1</Link></SubMenu>
            <SubMenu><Link to="/">하위 메뉴 2</Link></SubMenu>
          </SubBar>
        </Menu>
      </MainBar>
    </nav>
  );
}