const { deci } = require("../dist/index");

deci.connect({
  socket: "/tmp/lcp.sock",
  pool: 2
});


const basicCRUDTest = async () => {
  console.log("GET Name");
  const { data: getName } = await deci.get({ key: "Name" });
  console.log(getName);

  console.log("SET Name");
  const { data: setName } = await deci.set({ key: "Name", value: "Amigo" });
  console.log(setName);

  console.log("GET Name Again");
  const { data: getNameAgain } = await deci.get({ key: "Name" });
  console.log(getNameAgain);

  console.log("EXISTS Name");
  const { data: existsName } = await deci.exists({ key: "Name" });
  console.log(existsName);

  console.log("DEL Name");
  const { data: delName } = await deci.del({ key: "Name" });
  console.log(delName);

  console.log("EXISTS Name Again");
  const { data: existsNameAgain } = await deci.exists({ key: "Name" });
  console.log(existsNameAgain);

}

const test = async () => {
  await basicCRUDTest();
  process.exit();
}

test();



