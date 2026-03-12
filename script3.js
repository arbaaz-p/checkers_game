CheckerChip.prototype.chkKing = function() {
    if ((this.colorType === "red" && this.rowPos === 7) ||
        (this.colorType === "gray" && this.rowPos === 0)) {
        this.isKing = true;
    }
};

CheckerChip.prototype.moveChip = function(newR, newC) {
    this.rowPos = newR;
    this.colPos = newC;
    this.chkKing();
};

CheckerChip.prototype.validMv = function(newR, newC) {
    if (newR < 0 || newR > 7 || newC < 0 || newC > 7) return false;
    if (board[newR][newC] instanceof CheckerChip) return false;

    let rd = newR - this.rowPos;
    let cd = newC - this.colPos;

    if (Math.abs(rd) === 1 && Math.abs(cd) === 1) {
        if (this.colorType === "red" || this.isKing) {
            if (rd === 1) return true;
        }
        if (this.colorType === "gray" || this.isKing) {
            if (rd === -1) return true;
        }
    }

    if (Math.abs(rd) === 2 && Math.abs(cd) === 2) {
        let midR = (this.rowPos + newR) / 2;
        let midC = (this.colPos + newC) / 2;
        let midChip = board[midR][midC];

        if (midChip instanceof CheckerChip && midChip.colorType !== this.colorType) {
            board[midR][midC] = "";
            return true;
        }
    }

    return false;
};

CheckerChip.prototype.drawChip = function(ctx, size) {
    let posX = this.colPos * size + size / 2;
    let posY = this.rowPos * size + size / 2;
    let rad = hoverPi === this ? 40 : 35;

    if (this.isSelect) {
        ctx.shadowColor = "yellow";
        ctx.shadowBlur = 20;
    } else {
        ctx.shadowBlur = 0;
    }

    ctx.beginPath();
    ctx.arc(posX, posY, rad, 0, Math.PI * 2);
    ctx.fillStyle = this.colorType;
    ctx.fill();
    ctx.closePath();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.colorType === "red" ? "◑‿◐" : "◐ω◑", posX, posY + 5);

    if (this.isKing) {
        ctx.font = "20px Arial";
        ctx.fillText("👑", posX, posY - 20);
    }
};

function updBoardCli(e) {
    let can = document.getElementById("board");
    let rect = can.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let size = can.width / 8;
    let col = Math.floor(x / size);
    let row = Math.floor(y / size);

    let chip = board[row][col];

    if (chip instanceof CheckerChip) {
        let actPi = getActPi();
        if (actPi && actPi !== chip) {
            actPi.isSelect = false;
        }
        chip.isSelect = !chip.isSelect;
    } else {
        let selPi = getActPi();
        if (selPi && selPi.validMv(row, col)) {
            board[selPi.rowPos][selPi.colPos] = "";
            selPi.moveChip(row, col);
            board[row][col] = selPi;
            selPi.isSelect = false;
        }
    }

    paintBo();
    drawChip();
}

document.addEventListener("DOMContentLoaded", function() {
    let can = document.getElementById("board");
    can.removeEventListener("click", boardCli);
    can.addEventListener("click", updBoardCli);

    paintBo();
    drawChip();
});
