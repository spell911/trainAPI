import * as ssh2 from "ssh2";
import * as config from "config";

let client = new ssh2.Client();

client.connect(config.get("SFTP"));

client.on("ready", (req, res) => {
  client.sftp((err, _sftp) => {
    _sftp.fastPut(
      "upload/1527051819363_lee.jpg",
      "/home/train/PHICH.jpg",
      err => {
        console.log(err);
        client.end();
      }
    );
  });
});
