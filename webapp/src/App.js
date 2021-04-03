import AdminPage from "./pages/admin/";
import CustomerPage from "./pages/customer/";
import DeliveryPage from "./pages/delivery/";

//Routing Logic here

function App() {
  
  let role = "delivery";
  
  
  return (
    <div>
      {role === "admin" ? <AdminPage/> : null}
      {role === "customer" ? <CustomerPage/> : null}
      {role === "delivery" ? <DeliveryPage/> : null}
    </div>
  );
}

export default App;
