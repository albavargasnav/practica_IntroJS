# Intro JS - Hundir la flota

Hundir la flota es un juego para dos jugadores en el que se simula una batalla de barcos. El objetivo del juego es hundir los barcos del oponente antes de que lo haga el adversario.

## Caracteristicas generales del juego

- Nº de jugadores: 2 jugadores
- Tableros: Tablero propio y del enemigo
- Nº de filas y columnas de los tableros: 10 filas y 10 columnas
- Nº de disparos permitidos: 100 disparos

# Fase 1: Colocación de naves en el tablero propio

- Los barcos se colocaran aleatoriamente en el tablero, formando un sistema de coordenadas. Si se reinicia el juego, la colocación de los barcos volverá a cambiar aleatoriamente.
- Los barcos se colocaran en posicion vertical u horizontal

## Barcos y representación en el tablero
Los barcos se colocarán ocupando unas casillas determinadas. Se representan en el tablero a traves de letras y numeros (a excepcion del portaaviones). Los barcos son los siguientes:
- "P" -> Portaaviones (5 casillas)
- "B1" -> Buque (4 casillas)
- "S1" -> Submarino 1 (3 casillas)
- "S2" -> Submarino 2 (3 casillas)
- "C1" -> Crucero 1 (2 casillas)
- "C2" -> Crucero 2 (2 casillas)
- "C3" -> Crucero 3 (2 casillas)
- "L1" -> Lancha 1 (1 casilla)
- "L2" -> Lancha 2 (1 casilla)
- "L3" -> Lancha 3 (1 casilla)

# Fase 2: Desarrollo del juego por turnos
- El juego se desarrollara en la terminal de node.js. Utilizaremos el siguiente comando para iniciarlo:

### `node game.js`

- El juego comienza con el turno del jugador 1.

## Interpretación de elementos en el tablero
- 0 -> Casilla vacia
- A -> Disparo fallido al agua 
- T -> Barco tocado
- H -> Barco hundido

## Cómo jugar
Durante el turno del jugador, se pedirá al jugador que ingrese el numero de fila y columna a la que desea atacar, dejando un espacio entre ambos numeros. El mensaje mostrado para pedir el ataque será el siguiente:
 - ### `Jugador 1: Ingresa la fila y columna de la casilla a atacar (fila columna)`
Ejemplo de ataque a la fila 4 y columna 6: 
 - ### `Jugador 1: Ingresa la fila y columna de la casilla a atacar (fila columna): 4 6`

Si el jugador lanza un disparo al agua, ha fallado y se cambiara de turno al siguiente jugador, mostrando "A" en la casilla.

Si el jugador ataca tocando un barco, continuara jugando y se mostrara "T" por cada casilla de barco tocado.

Si el jugador ataca hundiendo un barco, continuara jugando y se mostrara "H" por cada casilla de barco hundido.

## Finalización del juego
El juego finalizará cuando uno de los dos jugadores haya hundido todos los barcos del enemigo o cuando no haya mas disparos.
Si un jugador ha ganado, se mostrará un mensaje en la consola indicando el jugador ganador y finalizando el juego automaticamente.
