import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useMediaQuery } from "react-responsive";
import { Menu, LogOut } from "lucide-react";
import Header from "../components/organisems/Header";
import Footer from "../components/organisems/Footer";
import Drop_down_menu from "../components/molecules/Drop_down_menu";
import Logo from "../components/atoms/Logo";
import Profile from "../assets/Profile.png";

const Pesanan_layout = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropDownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(e.target)
            ) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
    return (
        <div>
            <Header>
                <Logo />
                {/* Kategori */}
                <Link
                    to="/kategori"
                    className="hidden font-semibold leading-[140%] tracking-[0.2px] text-dark-secondary sm:inline"
                >
                    Kategori
                </Link>
                {isMobile ? (
                    <Menu
                        color="#4A505C"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    />
                ) : (
                    <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                        <img
                            src={Profile}
                            alt="Profile picture"
                            className="w-11 rounded-[10px]"
                        />
                    </button>
                )}
            </Header>
            {isProfileOpen && (
                // Drop Down Menu
                <Drop_down_menu ref={dropDownRef} />
            )}
            {children}
            <Footer />
        </div>
    );
};

export default Pesanan_layout;
