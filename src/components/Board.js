import React from "react";
import Square from './Square';
import LetterChoice from "./LetterChoice";
import Error from "./Error";
import takeOpponentTurn from "../controller/controller";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isPlayerTurn: true,
            playerX: false,
            playerO: false,
            errorMessage: null,
            opponent: "ai",
        }
    }

    handleClick(i) {
        if (this.state.isPlayerTurn) {
            const squares = this.state.squares.slice();
            if (this.state.playerX) {
                squares[i] = 'X';
            }
            else {
                squares[i] = "O";
            }
            this.setState({isPlayerTurn: false});
            this.setState({squares: squares});
            let letter = "";
            if (this.state.playerX) {
                letter = "X"
            }
            else {
                letter = 'O'
            }
            takeOpponentTurn(this.state.opponent, this.state.squares, letter)
        }
        else {
            this.setState({errorMessage: "It is not your Turn."});
        }
    }

    setChoice(letter) {
        if (letter === "X"){
            this.setState({playerX: true});
        }
        else if (letter === "Y"){
            this.setState({playerO: true});
        }
    }

    clearError() {
        this.setState({errorMessage: null});
    }

    render () {
        return (
            <div className="game">
                <LetterChoice setChoice={
                    () => this.setChoice()
                }></LetterChoice>
                <div className="board">
                    <div className="row">
                        <Square value={this.state.squares[0]} onClick = {
                            () => this.handleClick(0) }/>
                        <Square value={this.state.squares[1]} onClick={
                            () => this.handleClick(1)
                        }/>
                        <Square value={this.state.squares[2]} onClick={
                            () => this.handleClick(2)
                        }/>
                    </div>
                    <div className="row">
                        <Square value={this.state.squares[3]} onClick={
                            () => this.handleClick(3)
                        }/>
                        <Square value={this.state.squares[4]} onClick={
                            () => this.handleClick(4)
                        }/>
                        <Square value={this.state.squares[5]} onClick={
                            () => this.handleClick(5)
                        }/>
                    </div>
                    <div className="row">
                        <Square value={this.state.squares[6]} onClick={
                            () => this.handleClick(6)
                        }/>
                        <Square value={this.state.squares[7]} onClick={
                            () => this.handleClick(7)
                        }/>
                        <Square value={this.state.squares[8]} onClick={
                            () => this.handleClick(8)
                        }/>
                    </div>
                </div>
                <Error message={this.state.errorMessage} clear={
                    () => this.clearError()}></Error>
            </div>
        )
    }
}

export default Board;