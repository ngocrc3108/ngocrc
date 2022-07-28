const urlOfTele = "https://api.telegram.org/bot5431503813:AAEzszlOgw8z3WhbRG8P97V8AH3j2sRt4vU/getUpdates"
const urlOfScipt = "https://script.google.com/macros/s/AKfycbzOIdiDfZnaWV7L_5wz7i3--wH4AWsIeKlC9T403G_1aB2cOnxhE3aj0u4AU5LVeGez7w/exec"
fetch("https://api.telegram.org/bot5431503813:AAEzszlOgw8z3WhbRG8P97V8AH3j2sRt4vU/sendMessage?chat_id=-645439366&text=Server đã được bật");
fetch(urlOfTele)
    .then(update => update.json())
    .then(update => {
        var lengthOfUpdate = update.result.length;
        var preUpdateId = update.result[lengthOfUpdate - 1].update_id;
        return preUpdateId;
    })
    .then(preUpdateId => {
        setInterval(function() {
            fetch(urlOfTele + "?offset=" + preUpdateId)
            .then(update => update.json())
            .then(update => {
                var lengthOfUpdate = update.result.length;
                var newUpdateId = update.result[lengthOfUpdate - 1].update_id;
                if(newUpdateId != preUpdateId) {
                    console.log("Có tin nhắn mới: " + update.result[lengthOfUpdate - 1].message.text);
                    fetch(urlOfScipt)
                    .then(result => result.json())
                    .then(result => {
                        if(result.result == 0)
                            console.log("Thành công");
                        else
                            console.log("Thất bại");
                    })
                    .catch(err => console.log(err));
                    preUpdateId = newUpdateId;
                }
                else
                    console.log("không có tin nhắn");
            })
            .catch(err => console.log(err))
        }, 1*1000, preUpdateId)
    })
    .catch(err => console.log(err))
