import { useParams } from "react-router-dom";
import Menu from "../Menu/Menu"; // Ensure the path to Menu is correct

function MenuWrapper() {
  const { restaurantId } = useParams();
  return <Menu restaurantId={restaurantId} />;
}

export default MenuWrapper;
