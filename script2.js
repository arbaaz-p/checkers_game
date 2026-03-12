let hoverPi = null;

function CheckerChip(tileRow, tileCol, pieceColor) {
    this.rowPos = tileRow;
    this.colPos = tileCol;
    this.colorType = pieceColor;
    this.isSelect = false;
    this.isKing = false;

    this.drawChip = function(ctx, size) {
        let posX = this.colPos * size + size / 2;
        let posY = this.rowPos * size + size / 2;
        let baseRad = hoverPi === this ? 40 : 35;

        if (this.isSelect) {
            ctx.shadowColor = "yellow";
            ctx.shadowBlur = 20;
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(posX, posY, baseRad, 0, Math.PI * 2);
        ctx.fillStyle = this.colorType;
        ctx.fill();
        ctx.closePath();

        ctx.shadowBlur = 0;
        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.colorType === "red" ? "◑‿◐" : "◐ω◑", posX, posY + 5);
    };
}

for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
        if (board[r][c] === "red") {
            board[r][c] = new CheckerChip(r, c, "red");
        } else if (board[r][c] === "gray") {
            board[r][c] = new CheckerChip(r, c, "gray");
        }
    }
}

function drawChip() {
    let can = document.getElementById("board");
    let ctx = can.getContext("2d");
    let size = can.width / 8;

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            let chip = board[r][c];
            if (chip instanceof CheckerChip) {
                chip.drawChip(ctx, size);
            }
        }
    }
}

function getActPi() {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            let chip = board[r][c];
            if (chip instanceof CheckerChip && chip.isSelect) {
                return chip;
            }
        }
    }
    return null;
}

function boardCli(e) {
    let can = document.getElementById("board");
    let rect = can.getBoundingClientRect();
    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;

    let size = can.width / 8;
    let col = Math.floor(mx / size);
    let row = Math.floor(my / size);

    let chip = board[row][col];

    if (chip instanceof CheckerChip) {
        let actPi = getActPi();
        if (actPi && actPi !== chip) {
            actPi.isSelect = false;
        }
        chip.isSelect = !chip.isSelect;
    }

    paintBo();
    drawChip();
}

document.addEventListener("mousemove", function(e) {
    let can = document.getElementById("board");
    let rect = can.getBoundingClientRect();
    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;

    let size = can.width / 8;
    let col = Math.floor(mx / size);
    let row = Math.floor(my / size);

    let chip = board[row] ? board[row][col] : null;
    hoverPi = chip instanceof CheckerChip ? chip : null;

    paintBo();
    drawChip();
});

document.addEventListener("DOMContentLoaded", function() {
    let can = document.getElementById("board");
    can.removeEventListener("click", handInitCli);
    can.addEventListener("click", boardCli);

    paintBo();
    drawChip();
});
