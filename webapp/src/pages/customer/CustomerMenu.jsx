import MenuBar from "../../components/MenuBar";
import Button from "../../components/Button";


export default function Home(){
    return (
        <MenuBar>
            <Button menuButton label="Home"/>
            <Button menuButton label="Profile Settings"/>
            <Button menuButton label="Order History"/>
            <Button menuButton label="Logout"/>
        </MenuBar>
    );
}