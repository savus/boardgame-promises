document.addEventListener("DOMContentLoaded", () => {
  type ActiveGuesses = [null | number, null | number];
  type Status = "guessing" | "guessed-correctly" | "blank";
  type Square = {
    color: string;
    status: Status;
  };

  let guesses = [null, null] as ActiveGuesses;

  const wait = (s: number) =>
    new Promise((resolve) => {
      return setTimeout(resolve, s * 1000);
    });

  const $board = document.querySelector(".board-game");

  if (!$board) throw new Error("could not find board game");

  $board.addEventListener("click", () => {
    if (guesses[0] && guesses[1]) {
      guesses = [null, null];
    }
  });

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

  const buildBlock = ({ color }: Square, index: number) => {
    const $block = document.createElement("div");
    $block.classList.add("block", `bg-${color}`);
    $block.addEventListener("click", function (e) {
      e.stopPropagation();
      showBlock(index, true);
      wait(3).then(() => {
        showBlock(index, false);
      });
    });

    return $block;
  };

  const populateBoardWithBlocks = () =>
    squares.forEach((square, index) => {
      const $block = buildBlock(square, index);
      $board.append($block);
    });

  const showBlock = (index: number, show: boolean) => {
    const $blocks = [...document.querySelectorAll(".block")];
    if (show) {
      $blocks[index].classList.add("show");
    } else {
      $blocks[index].classList.remove("show");
    }
  };

  const makeAllBlocksTransparent = () => {
    wait(3).then(() => {
      const $blocks = document.querySelectorAll(".block").forEach((block) => {
        block.classList.remove("show");
      });
    });
  };

  populateBoardWithBlocks();
});
