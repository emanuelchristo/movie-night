setInterval(() => {
  console.log("ping");
  fetch(process.env.SERVER_URL + "/ping").catch(err => {
    console.log("ping failed");
    console.error(err);
  });
}, 3000);
