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
        onClick={() => history.push("/cashier/orders")}
        menuButton
        label="Orders"
      />
      <Button onClick={() => dispatch(signOut())} menuButton label="Logout" />
    </MenuBar>
  );
}
