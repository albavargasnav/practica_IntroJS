//--------------VARIABLES GLOBALES-------------

//Turno para comenzar el juego
let playerTurn = 1;

// Conteo de ataques 
const ownAttacks_A = []; //Jugador 1
const ownAttacks_B = []; //Jugador 2

// Conteo limite de numero de disparos 
let player1Shots = 0; //Jugador 1
let player2Shots = 0; //Jugador 2

// Numero de columnas y filas 
const ROWS = 10;
const COLS = 10;


//--------------FASE 1: COLOCACION DE BARCOS EN EL TABLERO-------------

// Barcos del Jugador 1
let ships_Player1 = [
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

// Barcos del Jugador 2
let ships_Player2 = [
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

// Creacion de tableros
function createBoard_Player1() {
  let board = [];
  for (let x = 0; x < ROWS; x++) {
    board[x] = [];
    for (let y = 0; y < COLS; y++) {
      board[x][y] = 0;
    }
  }
  return board;
}

function createBoard_Player2() {
  let board = [];
  for (let x = 0; x < ROWS; x++) {
    board[x] = [];
    for (let y = 0; y < COLS; y++) {
      board[x][y] = 0;
    }
  }
  return board;
}

// Colocacion aleatoria de barcos en los tableros
function placeShips_Player1(board) {
  let shipsPlaced = 0;

  while (shipsPlaced < ships_Player1.length) {
    let ship = ships_Player1[shipsPlaced];
    let shipSize = ship.size;
    let shipIcon = ship.icon;
    let orientation = Math.floor(Math.random() * 2); 
    let startRow = Math.floor(Math.random() * 10); 
    let startCol = Math.floor(Math.random() * 10); 
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
            });
          }
        }
        if (!collision) {
          for (let i = startCol; i < startCol + shipSize; i++) {
            board[startRow][i] = shipIcon;
            ships_Player1[shipsPlaced].coords.push({
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
            }); 
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
      ships_Player1[shipsPlaced].coords = coords; 
      shipsPlaced++;
    }
  }
  return board;
}

function placeShips_Player2(board) {
  let shipsPlaced = 0;
  while (shipsPlaced < ships_Player2.length) {
    let ship = ships_Player2[shipsPlaced];
    let shipSize = ship.size;
    let shipIcon = ship.icon;
    let orientation = Math.floor(Math.random() * 2); 
    let startRow = Math.floor(Math.random() * 10); 
    let startCol = Math.floor(Math.random() * 10); 

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
            }); 
          }
        }
        if (!collision) {
          for (let i = startCol; i < startCol + shipSize; i++) {
            board[startRow][i] = shipIcon;
            ships_Player2[shipsPlaced].coords.push({
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
            }); 
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
      ships_Player2[shipsPlaced].coords = coords; 
      shipsPlaced++;
    }
  }
  return board;
}

// Asignacion de barcos colocados en sus posiciones correspondientes 
let board1 = createBoard_Player1();
board1 = placeShips_Player1(board1); // Tablero propio del jugador 1
let board2 = createBoard_Player2();
board2 = placeShips_Player2(board2); // Tablero propio del jugador 2

// Asignar tableros enemigos 
let board3 = createBoard_Player2(); // Tablero enemigo (jugador 2)
let board4 = createBoard_Player1(); // Tablero enemigo (jugador 1)



//--------------FASE 2: DESARROLLO DEL JUEGO POR TURNOS-------------

console.log(" _  _ _   _ _  _ ___ ___ ___   _      _     ___ _    ___ _____ _   ");
console.log("| || | | | | \\| |   \\_ _| _ \\ | |    /_\\   | __| |  / _ \\_   _/_\\  ");
console.log("| __ | |_| | .` | |) | ||   / | |__ / _ \\  | _|| |_| (_) || |/ _ \\ ");
console.log("|_||_|\\___/|_|\\_|___/___|_|_\\ |____/_/ \\_\\ |_| |____\\___/ |_/_/ \\_\\");
console.log("----------------------------------------------------------------------");
console.log("                __/___            ");
console.log("          _____/______|           ");
console.log("  _______/_____\\_______\\_____     ");
console.log("  \\              < < <       |    ");
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("-----------------------------------------------------------------------");
console.log("                  ¡E M P I E Z A   E L   J U E G O !");
console.log("-----------------------------------------------------------------------");

let winner = false;
const readline = require("readline");
let shipsSunk = 0;
let round = 1;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let lastHit = false;

function prompt() {
  return new Promise((resolve, reject) => {
    rl.question(
      `Jugador ${playerTurn}: Ingresa la fila y columna de la casilla a atacar (fila columna):`,
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
    // MOSTRAR TABLEROS DURANTE EL TURNO
    console.log("***********************************************************************");
    console.log(`                        TURNO DEL JUGADOR ${playerTurn}`);
    console.log("***********************************************************************");
      if (playerTurn === 1) {
        console.log("Tablero del Enemigo (Jugador 2)");
        console.table(board3);
        console.log("Tu tablero (Jugador 1)");
        console.table(board1);
      } else {
        console.log("Tablero del Enemigo (Jugador 1)");
        console.table(board4);
        console.log("Tu tablero (Jugador 2)");
        console.table(board2);
      }

    if (playerTurn === 1 && player1Shots >= 100) {
      console.log("El jugador 1 ha alcanzado el límite de disparos permitidos.");
      return;
    } else if (playerTurn === 2 && player2Shots >= 100) {
      console.log("El jugador 2 ha alcanzado el límite de disparos permitidos.");
      return;
    }
    
    if (playerTurn === 1) {
      player1Shots++;
    } else if (playerTurn === 2) {
      player2Shots++;
    }

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
          enemyBoard[selectedRow][selectedCol] === "P" ||
          enemyBoard[selectedRow][selectedCol] === "B1" ||
          enemyBoard[selectedRow][selectedCol] === "S1" ||
          enemyBoard[selectedRow][selectedCol] === "S2" ||
          enemyBoard[selectedRow][selectedCol] === "C1" ||
          enemyBoard[selectedRow][selectedCol] === "C2" ||
          enemyBoard[selectedRow][selectedCol] === "C3" ||
          enemyBoard[selectedRow][selectedCol] === "L1" ||
          enemyBoard[selectedRow][selectedCol] === "L2" ||
          enemyBoard[selectedRow][selectedCol] === "L3");
      if (!validSelection) {
        console.log("Selección incorrecta, por favor elije una casilla libre.");
      }
    }

    if (playerTurn === 1) {
      ownAttacks_B.push({
        row: selectedRow,
        col: selectedCol,
      });
    } else {
      ownAttacks_A.push({
        row: selectedRow,
        col: selectedCol,
      });
    }

    function allShipsSunk(ships) {
      for (let i = 0; i < ships.length; i++) {
        if (ships[i].status === "floating") {
          return false; 
        }
      }
      return true; 
    }

    function sunkShips(ship, ownAttacks) {
      let hitCoords = 0;
      ship.coords.forEach((coord) => {
        if (
          ownAttacks.some(
            (attack) => attack.row === coord.row && attack.col === coord.col
          )
        ) {
          hitCoords++;
          lastHit = true;
        }
      });
      return hitCoords === ship.coords.length;
    }

    function checkIfShipSunk(ships, ownAttacks, board) {
      for (let i = 0; i < ships.length; i++) {
        const ship = ships[i];
        if (ship.status === "floating" && sunkShips(ship, ownAttacks)) {
          console.log(`¡El jugador ${playerTurn} ha hundido el barco ${ship.name}!`);
          ship.status = "sunk";
          
          ship.coords.forEach((coord) => {
            const { row, col } = coord;
            board[row][col] = "H"; 
            if (playerTurn === 1) {
              board2[row][col] = "H";
              board3[row][col] = "H";
            } else {
              board1[row][col] = "H";
              board4[row][col] = "H";
            }
          });
          return true; 
        }
      }
      return false; 
    }

    if (enemyBoard[selectedRow][selectedCol] !== 0) {
      const hitShip = playerTurn === 1 ? ships_Player2.find((ship) =>
              ship.coords.some(
                (coord) =>
                  coord.row === selectedRow && coord.col === selectedCol
              )
            )
          : ships_Player1.find((ship) =>
              ship.coords.some(
                (coord) =>
                  coord.row === selectedRow && coord.col === selectedCol
              )
            );
      if (hitShip) {
        console.log(`¡Has tocado un barco! ¡Continua jugando Jugador ${playerTurn}!`);
        if (playerTurn === 1) {
          checkIfShipSunk(ships_Player2, ownAttacks_B, board2);
        } else {
          checkIfShipSunk(ships_Player1, ownAttacks_A, board1);
        }

        if (playerTurn === 1) {
          board2[selectedRow][selectedCol] = hitShip.status === "sunk" ? "H" : "T";
          if (board2[selectedRow][selectedCol] === "T") {
            board3[selectedRow][selectedCol] = "T";
          }
        } else {
          board1[selectedRow][selectedCol] = hitShip.status === "sunk" ? "H" : "T";
          if (board1[selectedRow][selectedCol] === "T") {
            board4[selectedRow][selectedCol] = "T";
          }
        }
        
      } else {
        enemyBoard[selectedRow][selectedCol] = "X";
      }

      if (playerTurn === 1 && allShipsSunk(ships_Player2)) {
        console.log("¡El jugador 1 ha ganado!");
        winner = true;
      } else if (playerTurn === 2 && allShipsSunk(ships_Player1)) {
        console.log("¡El jugador 2 ha ganado!");
        winner = true;
      }


    } else {
      console.log(`¡AGUA! Has fallado el disparo.`);
      if (playerTurn === 1) {
        board2[selectedRow][selectedCol] = "A";
        board3[selectedRow][selectedCol] = "A";
      } else {
        board1[selectedRow][selectedCol] = "A";
        board4[selectedRow][selectedCol] = "A";
      }
      playerTurn = playerTurn === 1 ? 2 : 1; 
    }
    round++;
  }

  // Fiin del juego
  console.log(`¡El jugador ${playerTurn} ha ganado el juego!`);
  rl.close();
}

play();
