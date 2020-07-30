import React from 'react';

function LetterChoice(props) {

        return (
            <div>
                <p>Do you want to be X or O?</p>
                <button className="choice" onClick={props.setChoice("X")}>X</button>
                <button className="choice" onClick={props.setChoice("O")}>O</button>
            </div>
        );
    }

export default LetterChoice;