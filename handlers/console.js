module.exports = (client) => {
let prompt = process.openStdin()
prompt.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
        client.channels.cache.get("843522654307876894").send(x.join(" "));
    });
}