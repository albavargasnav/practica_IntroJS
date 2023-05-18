const ownAttacks_A = [];

//GENERAL
console.log("¡EMPIEZA EL JUEGO!");

//--------------FASE 1 COLOCACION-------------

let ships = [
  {
    name: "portaaviones",
    size: 5,
    icon: "P",
    coords: [],
    hits: 0,
    status: "floating",
  },
  {
    name: "buque_1",
    size: 4,
    icon: "B1",
    coords: [],
    hits: 0,
    status: "floating",
  },
  {
    name: "submarino_1",
    size: 3,
    icon: "S1",
    coords: [],
    hits: 0,
    status: "floating",
  },
  {
    name: "submarino_2",
    size: 3,
    icon: "S2",
    coords: [],
    hits: 0,
    status: "floating",
  },
  {
    name: "crucero_1",
    size: 2,
    icon: "C1",
    coords: [],
    hits: 0,
    status: "floating",
  },
  {
    name: "crucero_2",
    size: 2,
    icon: "C2",
    coords: [],
    hits: 0,
    status: "floating",
  },
  {
    name: "crucero_3",
    size: 2,
    icon: "C3",
    coords: [],
    hits: 0,
    status: "floating",
  },
  {
    name: "lancha_1",
    size: 1,
    icon: "L1",
    coords: [],
    hits: 0,
    status: "floating",
  },
  {
    name: "lancha_2",
    size: 1,
    icon: "L2",
    coords: [],
    hits: 0,
    status: "floating",
  },
  {
    name: "lancha_3",
    size: 1,
    icon: "L3",
    coords: [],
    hits: 0,
    status: "floating",
  },
];

const ROWS = 10;
const COLS = 10;

// Función para crear un tablero
function createBoard() {
  let board = [];
  for (let x = 0; x < ROWS; x++) {
    board[x] = [];
    for (let y = 0; y < COLS; y++) {
      board[x][y] = 0;
    }
  }
  return board;
}

// Función para colocar los barcos en un tablero
function placeShips(board) {
  let shipsPlaced = 0;

  while (shipsPlaced < ships.length) {
    let ship = ships[shipsPlaced];
    let shipSize = ship.size;
    let shipIcon = ship.icon;
    let orientation = Math.floor(Math.random() * 2); // 0 para horizontal, 1 para vertical
    let startRow = Math.floor(Math.random() * 10); // fila inicial
    let startCol = Math.floor(Math.random() * 10); // columna inicial

    let collision = false;
    let coords = [];
    if (orientation === 0) {
      if (startCol + shipSize > 10) {
        collision = true;
      } else {
        for (let i = startCol; i < startCol + shipSize; i++) {
          if (startRow >= 10 || board[startRow][i] !== 0) {
            collision = true;
            break;
          } else {
            coords.push({
              row: startRow,
              col: i
            }); // añadir las coordenadas de la posición al array
          }
        }
        if (!collision) {
          for (let i = startCol; i < startCol + shipSize; i++) {
            board[startRow][i] = shipIcon;
            ships[shipsPlaced].coords.push({
              row: startRow,
              col: i
            });
          }
        }
      }
    } else {
      if (startRow + shipSize > 10) {
        collision = true;
      } else {
        for (let i = startRow; i < startRow + shipSize; i++) {
          if (startCol >= 10 || board[i][startCol] !== 0) {
            collision = true;
            break;
          } else {
            coords.push({
              row: i,
              col: startCol
            }); // añadir las coordenadas de la posición al array
          }
        }
        if (!collision) {
          for (let i = startRow; i < startRow + shipSize; i++) {
            board[i][startCol] = shipIcon;
          }
        }
      }
    }

    if (!collision) {
      ships[shipsPlaced].coords = coords; // asignar el array de coordenadas al objeto barco
      shipsPlaced++;
    }
  }

  return board;
}

// Crear el tablero para el jugador 1
let board1 = createBoard();
board1 = placeShips(board1);

// Crear el tablero para el jugador 2
let board2 = createBoard();
board2 = placeShips(board2);

// Mostrar los tableros
console.log("Tablero del jugador 1");
console.table(board1);

console.log("Tablero del jugador 2");
console.table(board2);

//console.log("Coordenadas de los barcos:");

// for (let i = 0; i < ships.length; i++) {
//   let ship = ships[i];
//   console.log(`${ship.name}: ${ship.coords}`);
// }

//--------------FASE 2 JUEGO-------------

let winner = false;
let playerTurn = 1;
const readline = require("readline");
let shipsSunk = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt() {
  return new Promise((resolve, reject) => {
    rl.question(
      `El jugador ${playerTurn}, ingrese la fila y columna de la casilla a atacar (fila columna):`,
      (input) => {
        const [row, col] = input.split(" ").map((val) => parseInt(val));
        resolve({ row, col });
      }
    );
  });
}

async function play() {
  let shipsPlaced = 0;
  while (!winner) {
    console.log(`Turno del jugador ${playerTurn}`);

    let enemyBoard, ownBoard;
    if (playerTurn === 1) {
      enemyBoard = board2;
      ownBoard = board1;
    } else {
      enemyBoard = board1;
      ownBoard = board2;
    }

    let selectedRow, selectedCol;
    let validSelection = false;
    while (!validSelection) {
      const { row, col } = await prompt();
      console.log(`Jugador ${playerTurn} ataca a (${row}, ${col})`);
      selectedRow = row;
      selectedCol = col;
      validSelection =
        selectedRow >= 0 &&
        selectedRow < ROWS &&
        selectedCol >= 0 &&
        selectedCol < COLS &&
        (enemyBoard[selectedRow][selectedCol] === 0 ||
          enemyBoard[selectedRow][selectedCol] === "X" ||
          enemyBoard[selectedRow][selectedCol] === "P",
        "B1",
        "S1",
        "S2",
        "C1",
        "C2",
        "C3",
        "L1",
        "L2",
        "L3");
      if (!validSelection) {
        console.log("Selección incorrecta, por favor elije una casilla libre.");
      }
    }

    ownAttacks_A.push({
      row: selectedRow,
      col: selectedCol
    })

    function sunkShips(ship, ownAttacks) {
      let hitCoords = 0;
      ship.coords.forEach((coord) => {
        if (
          ownAttacks_A.some(
            (attack) => attack.row === coord.row && attack.col === coord.col
          )
        ) {
          hitCoords++;
        }
      });
      return hitCoords === ship.coords.length;
    }

    function checkIfShipSunk(ships, ownAttacks_A, board) {
      for (let i = 0; i < ships.length; i++) {
        const ship = ships[i];

        console.log(`Barco: ${ship.name}`);
        console.log(`Coordenadas: ${JSON.stringify(ship.coords)}`);

        if (sunkShips(ship, ownAttacks_A)) {
          console.log(
            `¡El jugador ${playerTurn} ha hundido el barco ${ship.name}!`
          );
          ship.status = "sunk";

          // Verificar que el barco hundido sea el esperado
          const expectedShip = ships.find(
            (s) => s.name === ship.name && s.status !== "sunk"
          );
          if (expectedShip) {
            expectedShip.status = "sunk";
          }

          // Actualizar el tablero del jugador
          ship.coords.forEach((coord) => {
            const { row, col } = coord;
            board[row][col] = "H"; // H representa un barco hundido
          });

          break;
        }
      }
    }

    // Comprobar si el ataque acierta
    if (enemyBoard[selectedRow][selectedCol] !== 0) {
      console.log(
        `¡TOCADO! ¡El jugador weones ${playerTurn} ha tocado un barco!`
      );

      // Cambiar la coordenada a "-"
      const hitShip = ships.find((ship) =>
        ship.coords.some(
          (coord) => coord.row === selectedRow && coord.col === selectedCol
        )
      );
      if (hitShip) {
        console.log(`¡TOCADO! ¡El jugador ${playerTurn} ha tocado un barco!`);

        checkIfShipSunk(ships, ownAttacks_A, enemyBoard);

        // Cambiar la coordenada a "-"
        enemyBoard[selectedRow][selectedCol] =
          hitShip.status === "sunk" ? "H" : "-";

        // // verificación de si se ha hundido un barco
        // for (let i = 0; i < ships.length; i++) {
        //   let ship = ships[i];
        //   if (ship.status == "floating" && checkShipStatus(ship)) {
        //     console.log(`¡Barco hundido! ${ship.name}`);
        //     ship.status = "sunk";
        //   }
        // }
      } else {
        enemyBoard[selectedRow][selectedCol] = "X";
      }

      // Comprobar si el jugador ha ganado
      let enemyShips = 0;
      for (let x = 0; x < ROWS; x++) {
        for (let y = 0; y < COLS; y++) {
          if (
            enemyBoard[x][y] !== 0 &&
            enemyBoard[x][y] !== "X" &&
            enemyBoard[x][y] !== "P" &&
            enemyBoard[x][y] !== "-"
          ) {
            enemyShips++;
          }
        }
      }

      if (enemyShips === 0) {
        console.log(`El jugador ${playerTurn} ha ganado!`);
        winner = true;
        break;
      }
    } else {
      console.log(`¡AGUA! El jugador ${playerTurn} ha fallado.`);
      enemyBoard[selectedRow][selectedCol] = "-";
    }
    // Cambiar de turno
    // repetir que el el jugador 1 pueda volver a hacer tiradas, descomentar para jugar al jugador 2
    //playerTurn = playerTurn === 1 ? 2 : 1;

    console.log("Tablero del jugador 1");
    console.table(board1);
    console.log("Tablero del jugador 2");
    console.table(board2);
  }

  // FIN DEL JUEGO
  console.log(`¡El jugador ${playerTurn} ha ganado el juego!`);
  rl.close();
}

play();
