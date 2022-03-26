import { child, onValue, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeName, changeShowName } from "../../store/profile/actions";
import { selectName, selectShowName } from "../../store/profile/selectors";
import { Form } from "../Form";
import { auth, getprofileNameRef, logout, profileNameRef, profileRef, profileShowNameRef } from "../servises/firebase";
import { ThemeContext } from "../utils/ThemeContext";
import { usePrev } from "../utils/usePrev";


export const Profile = () => {
    const { setMessageColor } = useContext(ThemeContext);

    const dispatch = useDispatch();
    // const data = useSelector((state) => state);
    const showName = useSelector(selectShowName, shallowEqual);
    const name = useSelector(selectName);

    const hanleChangeShowName = () => {
        dispatch(changeShowName);
    };

    const handleClick = () => {
        setMessageColor((prevColor) => (prevColor === "red" ? "green" : "red"));
    };
    const handleChangeName = (text) => {
        dispatch(changeName(text));
    };

    return (
        <>
            <h3>Profile</h3>
            <div>
                <button onClick={handleClick}>Change theme</button>
            </div>
            <div>
                {showName && <span>{name}</span>}
                <input type="checkbox" />
                <button onClick={hanleChangeShowName}>Change name</button>
            </div>
            <Form onSubmit={handleChangeName} />
        </>
    );
};

export const ProfileToConnect = () => {
    const { setMessageColor } = useContext(ThemeContext);
    const [name, setName] = useState("");
    const [showName, setShowName] = useState(false);

    const handleChangeShowName = () => {
        setShowName(profileShowNameRef, !showName);
    };

    const handleClick = () => {
        setMessageColor((prevColor) => (prevColor === "red" ? "blue" : "red"));
    };

    // const prevShowName = usePrev(showName);

    const handleChangeName = (text) => {
        // setName(text);
        set(getprofileNameRef(auth.currentUser.uid), text);
    };

    useEffect(() => {
        const unsubscribeName = onValue(getprofileNameRef, (snapshot) => {
            setName(snapshot.val());
        });
        const unsubscribeShowName = onValue(profileShowNameRef, (snapshot) => {
            setShowName(snapshot.val());
        });
        const unsubscribeProfile = onValue(profileRef, (snapshot) => {
            snapshot.forEach(child.key, child.val());
        });
        return () => {
            unsubscribeName();
            unsubscribeShowName();
            unsubscribeProfile();
        }
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {

        }
    };

    return (
        <>
            <h3>Profile</h3>
            <div>
                <button onClick={handleLogout}>LOGOUT</button>
            </div>
            <div>
                <button onClick={handleClick}>Change theme</button>
            </div>
            <div>
                {showName && <h5>{name}</h5>}
                <input type="checkbox" />
                <button onClick={handleChangeShowName}>Change show name</button>
            </div>
            <Form onSubmit={handleChangeName} />
        </>
    );
};

const mapStateToProps = (state) => ({
    showName: selectShowName(state),
    name: selectName(state),
});

const mapDispatchToProps = {
    setShowName: () => changeShowName,
    setName: changeName,
};

const ConnectedProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileToConnect);

export default ConnectedProfile;