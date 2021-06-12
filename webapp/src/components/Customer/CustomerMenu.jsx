import MenuBar from "../../components/MenuBar";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/actions/authAction";
import { useHistory } from "react-router-dom";

export default function Home() {
  let dispatch = useDispatch();
  let history = useHistory();

  return (
    <MenuBar>
      <Button onClick={() => history.push("/")} menuButton label="Home" />
      <Button
        onClick={() => history.push("/customer")}
        menuButton
        label="Order Food"
      />
      <Button
        onClick={() => history.push("/customer/profileSettings")}
        menuButton
        label="Profile Settings"
      />
      <Button
        onClick={() => history.push("/customer/orderHistory")}
        menuButton
        label="Order History"
      />
      <Button onClick={() => dispatch(signOut())} menuButton label="Logout" />
    </MenuBar>
  );
}
