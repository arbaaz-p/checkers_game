let board = [
    ["", "red", "", "red", "", "red", "", "red"],
    ["red", "", "red", "", "red", "", "red", ""],
    ["", "red", "", "red", "", "red", "", "red"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["gray", "", "gray", "", "gray", "", "gray", ""],
    ["", "gray", "", "gray", "", "gray", "", "gray"],
    ["gray", "", "gray", "", "gray", "", "gray", ""]
];

document.addEventListener("DOMContentLoaded", function() {
    paintBo();
    paintInitPi();
    let can = document.getElementById("board");
    can.addEventListener("click", handInitCli);
});

function paintBo() {
    let can = document.getElementById("board");
    let ctx = can.getContext("2d");
    let sq = can.width / 8;

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            ctx.fillStyle = (r + c) % 2 === 0 ? '#f0f0f0' : '#444';
            ctx.fillRect(c * sq, r * sq, sq, sq);
        }
    }
}



function handInitCli(e) {
    let can = document.getElementById("board");
    let rect = can.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let sq = can.width / 8;
    let col = Math.floor(x / sq);
    let row = Math.floor(y / sq);

    alert(board[row][col]);
}

function resetGa() {
    location.reload();
}
