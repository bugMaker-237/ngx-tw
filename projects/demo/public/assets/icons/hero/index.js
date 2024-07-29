const http = require("http");
const readFile = require("fs").readFileSync;
const readDir = require("fs").readdirSync;
const path = require("path");
const cwd = process.cwd();
const encoding = {
  encoding: "utf-8",
};
var port = Number.parseInt(process.argv0);
if (isNaN(port)) port = 9870;

http
  .createServer(function (req, res) {
    try {
      var index = readFile(path.join(__dirname, "./index.html"), encoding);
      var icons = readDir(cwd, encoding).filter((i) => i.endsWith(".svg"));

      var rows = icons.map((file) => {
        var splited = file.split(".");

        return (
          "<tr><td>" +
          splited[0] +
          "</td><td>" +
          readFile(file, encoding) +
          "</td></tr>"
        );
      });
      var realIndex = index.replace("{#replace}", rows.join(""));
      res.write(realIndex);
      res.end();
    } catch (error) {
      console.log(error);
    }
  })
  .listen(port);
console.log("server created at : http://localhost:" + port);
