import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeShowName } from "../../store/profile/actions";
import { ThemeContext } from "../utils/ThemeContext";


export const Profile = () => {
    const { setMessageColor } = useContext(ThemeContext);

    const dispatch = useDispatch();
    const data = useSelector((state) => state);

    const hanleChangeShowName = () => {
        dispatch(changeShowName);
    };

    const handleClick = () => {
        setMessageColor((prevColor) => (prevColor === "red" ? "green" : "red"));
    };

    return (
        <>
            <h3>Profile</h3>
            <div>
                <button onClick={handleClick}>Change theme</button>
            </div>
            <div>
                {data.showName && <span>{data.name}</span>}
                <input type="checkbox" />
                <button onClick={hanleChangeShowName}>Change name</button>
            </div>
        </>
    );
};