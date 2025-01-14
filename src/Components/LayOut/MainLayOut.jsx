import { Outlet } from "react-router-dom";
import Navber from "../Shared/Navber/Navber";
import Footer from "../Shared/Footer/Footer";


const MainLayOut = () => {
    return (
        <div>
            {/* Navber */}
            <Navber></Navber>
            {/* outlet */}
            <div className="min-h-[calc(100vh-70px)]">
                <Outlet></Outlet>

            </div>
            {/* Footer */}
            <Footer></Footer>
        </div>
    );
};

export default MainLayOut;