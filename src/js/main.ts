document.addEventListener("DOMContentLoaded", () => {
  type Square = {
    color: string;
    status: string;
  };

  const $board = document.querySelector(".board-game");

  if (!$board) throw new Error("could not find board game");

  const squares: Square[] = [{ color: "blue", status: "blank" }];

  const buildBlock = ({ color }: Square) => {
    const $block = document.createElement("div");
    $block.classList.add("block", "show", `bg-${color}`);
    $block.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("clicked");
    });

    return $block;
  };

  const populateBoardWithSquares = () =>
    squares.forEach((square) => {
      const $block = buildBlock(square);
      $board.append($block);
    });

  populateBoardWithSquares();
});
