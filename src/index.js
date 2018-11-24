//Escribiendo mi primer código en React :D

/*
Aprendizajes nuevos: 

aqui estamos usando JSX
que basicamente es HTML en Javascript

Importar paquetes a traves de packagecontrol.io

Puedo introducir variables dentro del HTML con {}

Aùn no entiendo la funcion flecha pero asumire que entederé como funcion

==========

Componentes

- Square
- Board
- Game

*/


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
	return (
		<button className="square" onClick={props.onClick}>
		{props.value}
		</button>
		);
}

class Board extends React.Component {	

	renderSquare(i) {
		return (
			 <Square value= 
			{this.props.squares[i]} 
			onClick={() => this.props.onClick(i)}
			/>
		);
	}


	render() {
		
		//Recuerda que const es una variable constante que no puedes reusar en bloques de codigo (repasalo)
		const author = "Daniel Páez"

		return (
			// No entiendo porque està el status entre llaves
			
			<div>
				
			<h1 className="header"> Programa hecho por {author}</h1>
			

				<div className="board-row">
				{/* ¿Sobre quien actua ese this */}

				{this.renderSquare(0)}
				{this.renderSquare(1)}
				{this.renderSquare(2)}
				</div>

				<div className="board-row">
				{/* ¿Sobre quien actua ese this */}
				{this.renderSquare(3)}
				{this.renderSquare(4)}
				{this.renderSquare(5)}
				</div>

				<div className="board-row">
				{/* ¿Sobre quien actua ese this */}
				{this.renderSquare(6)}
				{this.renderSquare(7)}
				{this.renderSquare(8)}
				</div>
			</div>
			);
	}
}	

//Class Game ================================

class Game extends React.Component {
	//usaremos el constructor para agregar metodos y atributos a nuestra clase
	constructor(props) {
		//por que usamos super?
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0, //this is the step in the game where we are
			//por què esto esta aca? para que?
			xIsNext: true,
		}};

//este es un manejador de eventos o "handle"
	handleClick(i) {
		const history = this.state.history.slice(0,this.state.stepNumber + 1);
		//que era slice
		const current =
			history[this.state.stepNumber];
		const squares =
			current.squares.slice();

		if (calculateWinner(squares)||squares[i])
		{
			return;
			//Esto hará que acabe la funcion y por tanto acabe el juego
		}


			squares[i] = this.state.xIsNext ? "X" : "O";
			//If xIsNext ,which is an state of this class, is true return "X" Else, return "O"

			this.setState({
				history: history.concat([{
					squares: squares,
				}]),
				
				stepNumber: history.length,
				xIsNext: !this.state.xIsNext
				//Once this method is used, change the actual state of xIsNext
			});
	}

	jumpTo(step) 
	{
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) ===0, //WTF??????? think, understand
		})
	}
	
	render()
	 {
		const history = this.state.history;
		//Por qué menos uno???
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares)
	

			const moves = history.map((step, move) => {
				const desc = move ?
				"Go to move #" + move : "Go to game start";
				return (
					<li key={move/* we use this key because every move in this game is unique*/}>
						<button onClick={() => this.jumpTo(move)}>{desc}</button>
					</li>
					);
				/*For each move in the tic-tac-toes’s game’s history, 
				we create a list item <li> which contains a button <button>. 
				The button has a onClick handler which calls a method called
				 this.jumpTo(). We haven’t implemented the jumpTo() method yet. 
				 For now, we should see a list of the moves that have occurred in 
				 he game and a warning in the developer tools console that says:*/
			})


		//que era let???
		let status;
			if (winner)
			{
				status = "Ganador: " + winner;
			}
			else 
			{
				status = "Siguiente jugador: " + (this.state.xIsNext ? "X":"O");
			}


		return (
			<div className="game">
				<div className="game-board">
					<Board 
						squares={current.squares}
						onClick={(i)=> this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div> {status}  </div>
					<ol>{moves} </ol>
				</div>
			</div>
			);
		}
	}
	

//Calculate Winner

function calculateWinner(squares) {
	//Aqui estamos creando un Array con las linea con formas de victoria
	const lines =
    [	
    //Horizontal lines
    	[0,1,2],
    	[3,4,5],
    	[6,7,8],
	//Vertical lines
		[0,6,3],
    	[1,4,7],
    	[2,5,8],
    //Diagonal lines
    	[0,4,8],
    	[2,4,6]

	];
	/* 
	Para explorar todo el array cada vez que avanzamos de turno verificando
	si alguien ha ganado aplicamos este ciclo
	*/
	for (let i =0; i < lines.length; i++) 
	{
		const [a, b, c] = lines[i];
		//¿Como puedo comprender esto?
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) 
		{
			return squares[a];
		}
	}
	return null;
}

//================== 
//Que es ReactDOM?
ReactDOM.render(
	<Game />, document.getElementById("root")
	);

/*
Control de errores

1. El error que habia cometido era colocar props.value en vez de props.Onclick en las propiedades del compoentes Squaare
esto impedia que se ejecutara el evento Onclick y fluyera la informacion desde el componente funcional Square al componente Board

2. Problemas con las llaves



key is a special and reserved property in React (along with ref, a more advanced feature). When an element is created, React extracts the key property and stores the key directly on the returned element. 

key may look like it belongs in props, key cannot be referenced using this.props.key. R

Keys do not need to be globally unique. Keys only needs to be unique between components and their siblings.

It’s strongly recommended that you assign proper keys whenever you build dynamic lists.

*/
