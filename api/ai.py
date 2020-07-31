import time
from flask import Flask, request
import math

app = Flask(__main__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/ai', methods=['GET', 'POST'])
def AI():
    json = request.json
    board = json.board
    letter = json.letter
    move = findBestMove(board, letter)
    newBoard = makeMove(board,letter,move)
    return dict(data=newBoard)

def areMovesLeft(board):
    for i in Range(0,3):
        for j in Range(0,3):
            if board[i][j] == null:
                return True
    return False

def makeMove(board, letter, move):
   for i in range(0,3):
       for j in range(0,3):
           if i == move(0) and j == move(1):
               board[i][j] = letter
               return board

def canWin(board, letter):
    hasWon = False
    if not hasWon and board[0] == letter and board[1] == letter and board[2] == null:
        hasWon = True
        board[2] = letter
    elif not hasWon and board[1] == letter and board[4] == letter and board[7] == null:
        hasWon = True
        board[7] = letter
    elif not hasWon and board[0] == letter and board[3] == letter and board[6] == null:
        hasWon = True
        board[6] = letter
    elif not hasWon and board[2] == letter and board[5] == letter and board[8] == null:
        hasWon = True
        board[8] = letter


    return board

# minimax algorithm in game theory
def minimax(board, depth, isTurn, letter):
    score = evaluateBoard(board)
    
    #max won game
    if (score == 10):
        return score
    
    #min won game
    if (score == -10):
        return 0

    # No moves left is a tie
    if not isMoveLeft(board):
        return 0 
    
    # Maximizer move
    if isTurn:
        best = -1000
        
        #Traverse cells
        for i in Range(0,3):
            for j in Range(0,3):
                # Empty cell
                if board[i][j] == null:
                    board[i][j] = letter
                    
                    #recursive call
                    best = max(best, minimax(board, depth + 1, not isTurn))
                    
                    board[i][j] == null
        return best
    else:
        
        best = 1000
        
        #Traversel
        for i in Range(0,3):
            for j in Range(0,3):
                
                if board[i][j] == null:
                    
                    if letter == "X":
                        board[i][j] = "O"
                    else:
                        board[i][j] = "X"
                        
                        
                    best = min(best, minimax(board, depth + 1, not isTurn))
                    
                    board[i][j] = null
                    
        return best
                
# Return best move for player 
def findBestMove(board, letter):
    best = -1000
    bestMove = [-1,-1]
    
    for i in Range(0,3):
        for j in Range(0,3):
            
            #Check empty
            if board[i][j] == null:
                
                board[i][j] = letter
                
                moveScore = minimax(board, 0, False)
                
                board[i][j] = null
                
                if moveScore > best:
                    bestMove = [i,j]
                    best = moveScore
    
    return bestMove

#determines scores of different board states
# 10 is a ai win -10 is opponent win 0 no win
def evaluateBoard(board, letter):

    for row in range(0, 3):

        # Check rows for win
        if board[row][0] == board[row][1] and board[row][1] == board[row][2]:
            if board[row][0] == 'X':
                if letter == 'X':
                    return 10
                else:
                    return -10
            elif board[row][0] == 'O':
                if letter == 'O':
                    return 10
                else:
                    return -10
        
        # Check Columns for win
        for column in range(0, 3):
            
            if board[0][column] == board[1][column] and board[1][column] == b[2][column]:
                
                if board[0][column] == 'X':
                    if letter == 'X':
                        return 10
                    else:
                        return -10
        
        #Check Diagonals for Win
        if board[0][0] == board[1][1] and board[1][1]  == board[2][2]:
            
            if board[0][0] == 'X':
                if letter == 'X':
                    return 10
                else:
                    return -10
            elif board[0][0] == 'O':
                if letter == "O":
                    return 10
                else:
                    return -10
                
        # No win return 0 score
        return 0
            
app.run(debug=True)