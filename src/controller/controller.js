function takeOpponentTurn(opponent, squares, letter) {
        let json = {
            "Opponent": opponent,
            "Board": [
                [squares[0], squares[1], squares[2]],
                [squares[3], squares[4], squares[5]],
                [squares[6], squares[7], squares[8]],
            ],
            "Letter": letter,
        }
        PostRequest(json);
}

export default takeOpponentTurn;

function PostRequest(message) {
    var xhr = new XMLHttpRequest();
    var url = "https://localhost/8080/ai";
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            //TODO use the Json data
            console.log(json)
        }
    };
    var data = JSON.stringify(message);
    xhr.send(data);
}