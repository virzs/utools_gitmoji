/*
 * @Author: Vir
 * @Date: 2021-12-04 19:46:16
 * @Last Modified by: Vir
 * @Last Modified time: 2021-12-04 22:16:48
 */

import Item from "./item";
import PrivMenu from "./menu";

type PrivMenu = typeof PrivMenu;

interface MenuInterface extends PrivMenu {
  Item: typeof Item;
}

const Menu = PrivMenu as MenuInterface;

Menu.Item = Item;

export default Menu;
