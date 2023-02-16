/*
 * @Author: Vir
 * @Date: 2021-10-18 22:10:08
 * @Last Modified by: Vir
 * @Last Modified time: 2021-12-05 12:40:36
 */
import { render } from "preact";
import { App } from "./app";
import "./index.css";
import "tailwindcss/tailwind.css";
import "virtual:svg-icons-register";

render(<App />, document.getElementById("app")!);
