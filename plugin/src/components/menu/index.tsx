import Item from "./item";
import PrivMenu from "./menu";

type PrivMenu = typeof PrivMenu;

interface MenuInterface extends PrivMenu {
  Item: typeof Item;
}

const Menu = PrivMenu as MenuInterface;

Menu.Item = Item;

export default Menu;
