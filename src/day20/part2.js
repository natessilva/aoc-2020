const fs = require("fs");
const lines = fs.readFileSync("./day20.txt").toString();
const tiles = {};
lines.split("\n\n").forEach((p) => {
  const [header, ...tail] = p.split("\n");
  const tileId = header.split("").slice(5, -1).join("");
  const tile = tail.map((line) => line.split(""));
  tiles[tileId] = tile;
});

const tileEdges = {};
Object.keys(tiles).forEach((tileId) => {
  const tile = tiles[tileId];
  tileEdges[tileId] = permutations(tile).map((t) => t[0].join(""));
});

const edgeTiles = {};
Object.keys(tileEdges).forEach((tileId) => {
  const edges = tileEdges[tileId];
  edges.forEach((edge, edgeIndex) => {
    if (edgeTiles[edge] == null) {
      edgeTiles[edge] = [];
    }
    edgeTiles[edge].push({ edgeIndex, tileId });
  });
});

const neighbors = {};
Object.keys(tileEdges).forEach((tileId) => {
  neighbors[tileId] = [];
  const edges = tileEdges[tileId];
  edges.forEach((edge, edgeIndex) => {
    const flipped = edge.split("").reverse().join("");
    const neighborTiles = edgeTiles[flipped].filter((t) => t.tileId != tileId);
    if (neighborTiles.length == 1) {
      neighbors[tileId].push({
        edgeIndex,
        tile: neighborTiles[0].tileId,
        neighborIndex: neighborTiles[0].edgeIndex,
      });
    }
  });
});

const stack = [
  { tileId: Object.keys(tiles)[0], position: { x: 0, y: 0 }, permutation: 0 },
];
const result = [];
const set = new Set();
while (stack.length > 0) {
  const p = stack.pop();
  set.add(p.tileId);
  result.push(p);
  const n = neighbors[p.tileId]
    .filter((n) => n.edgeIndex < 4 == p.permutation < 4 && !set.has(n.tile))
    .map((n) => {
      const np = neighborPosition(p.permutation, n.edgeIndex, n.neighborIndex);
      return {
        tileId: n.tile,
        position: {
          x: p.position.x + np.position.x,
          y: p.position.y + np.position.y,
        },
        permutation: np.permutation,
      };
    });
  stack.push(...n);
}

const minX = Math.min(...result.map((p) => p.position.x));
const maxX = Math.max(...result.map((p) => p.position.x));
const minY = Math.min(...result.map((p) => p.position.y));
const maxY = Math.max(...result.map((p) => p.position.y));

const board = new Array(8 * (maxY - minY + 1))
  .fill(null)
  .map(() => new Array(8 * (maxX - minX + 1)).fill("X"));

result.forEach(({ tileId, position, permutation }) => {
  const x = 8 * (position.x - minX);
  const y = 8 * (position.y - minY);
  const tile = permutations(tiles[tileId])[permutation];
  for (let i = 1; i < tile.length - 1; i++) {
    const line = tile[i];
    for (let j = 1; j < line.length - 1; j++) {
      board[i + y - 1][j + x - 1] = line[j];
    }
  }
});

const monster = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `
  .split("\n")
  .map((l) => l.split(""));

permutations(board).forEach((p) => {
  const monsters = countMonsters(p);
  const mPounds =
    [].concat(...monster).filter((char) => char == "#").length * monsters;
  const pounds = [].concat(...board).filter((char) => char == "#").length;
  if (monsters > 0) {
    console.log(pounds - mPounds);
  }
});

function countMonsters(board) {
  let count = 0;
  for (let i = 0; i < board.length - 2; i++) {
    for (let j = 0; j < board[i].length - 20; j++) {
      if (hasMonster(board, j, i)) {
        count++;
      }
    }
  }
  return count;
}

function hasMonster(board, x, y) {
  for (let i = 0; i < monster.length; i++) {
    for (let j = 0; j < monster[i].length; j++) {
      if (monster[i][j] == "#" && board[i + y][j + x] != "#") {
        return false;
      }
    }
  }
  return true;
}

function neighborPosition(perm, edgeIndex, neighborEdge) {
  const neighborDir = neighborEdge % 4;
  const flipped = neighborEdge >= 4;
  const direction = (4 + (edgeIndex % 4) - (perm % 4)) % 4;
  switch (direction) {
    case 0:
      return {
        position: { x: 0, y: -1 },
        permutation: ((neighborDir + 2) % 4) + (flipped ? 4 : 0),
      };
    case 1:
      return {
        position: { x: -1, y: 0 },
        permutation: ((neighborDir + 1) % 4) + (flipped ? 4 : 0),
      };
    case 2:
      return { position: { x: 0, y: 1 }, permutation: neighborEdge };
    case 3:
      return {
        position: { x: 1, y: 0 },
        permutation: ((neighborDir + 3) % 4) + (flipped ? 4 : 0),
      };
  }
}

function permutations(tile) {
  return [
    tile,
    rotate(tile),
    rotate(rotate(tile)),
    rotate(rotate(rotate(tile))),
    flip(tile),
    rotate(flip(tile)),
    rotate(rotate(flip(tile))),
    rotate(rotate(rotate(flip(tile)))),
  ];
}

function rotate(tile) {
  return tile.map((line, i) => {
    return line.map((_, j) => {
      return tile[line.length - 1 - j][i];
    });
  });
}

function flip(tile) {
  return tile.map((l) => l.map((i) => i).reverse());
}
