import MenuBar from "../../components/MenuBar";
import Button from "../../components/Button";


export default function Home(){
    return (
        <MenuBar>
            <Button menuButton label="Home"/>
            <Button menuButton label="Order Food"/>
            <Button menuButton label="Order History"/>
            <Button menuButton label="Logout"/>
        </MenuBar>
    );
}