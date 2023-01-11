/*
 * @Author: vir virs98@outlook.com
 * @Date: 2023-01-09 14:52:55
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2023-01-09 14:53:05
 */

const fs = require("fs");

// 修改plugin.json文件
fs.readFile("plugin.json", "utf8", (err, data) => {
  if (err) throw err;
  let plugin = JSON.parse(data);
  plugin.main = "index.html";
  fs.writeFile("dist/plugin.json", JSON.stringify(plugin), "utf8", (err) => {
    if (err) throw err;
    console.log("plugin.json文件已修改并写入到dist目录");
  });
});

// 复制logo.png文件
fs.createReadStream("logo.png").pipe(fs.createWriteStream("dist/logo.png"));
