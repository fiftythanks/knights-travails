/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
import './style.css';

const board = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 1, 2, 3, 4, 5, 6, 7],
];

const possibleMoves = [];

for (let row = 0; row < board.length; row += 1) {
  const cellsInRow = [];
  for (let col = 0; col < board[row].length; col += 1) {
    const moves = [];
    for (let i = -2; i <= 2; i += 1) {
      if (row + i >= 0 && row + i <= 7) {
        if (Math.abs(i) === 1) {
          const j = 2;
          if (col + j >= 0 && col + j <= 7) moves.push([row + i, col + j]);
          if (col - j >= 0 && col - j <= 7) moves.push([row + i, col - j]);
        } else if (Math.abs(i) === 2) {
          const j = 1;
          if (col + j >= 0 && col + j <= 7) moves.push([row + i, col + j]);
          if (col - j >= 0 && col - j <= 7) moves.push([row + i, col - j]);
        }
      }
    }
    cellsInRow.push(moves);
  }
  possibleMoves.push(cellsInRow);
}

class MoveTreeNode {
  constructor(parent, value) {
    this.parent = parent;
    this.value = value;
    this.children = [];
  }

  addChild(value) {
    this.children.push(new MoveTreeNode(this, value));
  }

  addChildren(childValues) {
    childValues.forEach((childValue) => {
      this.children.push(new MoveTreeNode(this, childValue));
    });
  }
}

function knightMoves(start, finish) {
  const root = new MoveTreeNode(null, start);

  // Breadth-first search
  const queue = [];
  let currentNode = root;
  let currentSquare = currentNode.value;
  let [i, j] = [currentSquare[0], currentSquare[1]];
  let childSquares = possibleMoves[i][j];

  while (i !== finish[0] || j !== finish[1]) {
    currentNode.addChildren(childSquares);
    queue.push(...currentNode.children);
    currentNode = queue.shift();
    currentSquare = currentNode.value;
    [i, j] = [currentSquare[0], currentSquare[1]];
    childSquares = possibleMoves[i][j];
  }

  const shortestPathReversed = [];
  while (currentNode !== null) {
    shortestPathReversed.push(currentNode.value);
    currentNode = currentNode.parent;
  }
  const shortestPath = shortestPathReversed.toReversed();
  const shortestPathString = shortestPath.join(')\n(');

  console.log(
    `The shortest path from (${start}) to (${finish}) is\n(${shortestPathString})`,
  );
}

knightMoves([1, 0], [7, 7]);
