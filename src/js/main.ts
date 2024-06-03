document.addEventListener("DOMContentLoaded", () => {
  type Status = "guessing" | "guessed-correctly" | "blank";
  type Square = {
    color: string;
    status: Status;
  };

  const wait = (s: number) =>
    new Promise((resolve) => {
      return setTimeout(resolve, s * 1000);
    });

  const $board = document.querySelector(".board-game");

  if (!$board) throw new Error("could not find board game");

  const squares: Square[] = [
    { color: "blue", status: "blank" },
    { color: "blue", status: "blank" },
    { color: "purple", status: "blank" },
    { color: "tomato", status: "blank" },
    { color: "green", status: "blank" },
    { color: "tomato", status: "blank" },
    { color: "purple", status: "blank" },
    { color: "green", status: "blank" },
  ];

  const buildBlock = ({ color }: Square) => {
    const $block = document.createElement("div");
    $block.classList.add("block", `bg-${color}`);
    $block.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.add("show");
      makeAllBlocksTransparent();
    });

    return $block;
  };

  const populateBoardWithBlocks = () =>
    squares.forEach((square) => {
      const $block = buildBlock(square);
      $board.append($block);
    });

  const makeAllBlocksTransparent = () => {
    wait(3).then(() => {
      const $blocks = document.querySelectorAll(".block").forEach((block) => {
        block.classList.remove("show");
      });
    });
  };

  populateBoardWithBlocks();
});
