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

  const $gameBoard = document.querySelector(".board-game");

  if (!$gameBoard) throw new Error("could not find board game");

  $gameBoard.addEventListener("click", () => {
    console.log(guesses);
    if (guesses[0] && guesses[1]) {
      guesses = [null, null];
    }
  });

  const board: Square[] = [
    { color: "blue", status: "blank" },
    { color: "blue", status: "blank" },
    { color: "purple", status: "blank" },
    { color: "tomato", status: "blank" },
    { color: "green", status: "blank" },
    { color: "tomato", status: "blank" },
    { color: "purple", status: "blank" },
    { color: "green", status: "blank" },
  ];

  const isCorrect = () => {
    const guess1 = guesses[0];
    const guess2 = guesses[1];
    if (guess1 === null) throw new Error("no guess 1");
    if (guess2 === null) throw new Error("no guess 2");
    return board[guess1].color === board[guess2].color;
  };

  const buildBlock = ({ color }: Square, index: number) => {
    const $block = document.createElement("div");
    $block.classList.add("block", `bg-${color}`);
    $block.addEventListener("click", function (e) {
      e.stopPropagation();
      if (guesses[0] === null) {
        guesses[0] = index;
        showBlock(index, true);
        return;
      }
      if (guesses[1] === null) {
        guesses[1] = index;
        showBlock(index, true);
        if (isCorrect()) {
          wait(0.5)
            .then(() => {
              alert("Success!");
            })
            .then(() => {
              showBlock(guesses[0], false);
              showBlock(guesses[1], false);
              guesses = [null, null];
            });

          return;
        } else {
          wait(0.3).then(() => {
            alert("You fucked up");
          });
          wait(1).then(() => {
            showBlock(guesses[0], false);
            showBlock(guesses[1], false);
            guesses = [null, null];
          });
        }
      }
    });

    return $block;
  };

  const populateBoardWithBlocks = () =>
    board.forEach((square, index) => {
      const $block = buildBlock(square, index);
      $gameBoard.append($block);
    });

  const showBlock = (index: number | null, show: boolean) => {
    const $blocks = [...document.querySelectorAll(".block")];
    if (index !== null) {
      if (show) {
        $blocks[index].classList.add("show");
      } else {
        $blocks[index].classList.remove("show");
      }
    }
  };

  populateBoardWithBlocks();
});
