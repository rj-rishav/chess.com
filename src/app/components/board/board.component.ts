import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chess, Square, Move } from 'chess.js'; // Added Move type import

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, RouterLink],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  board: string[][] = [];
  runGame = true;
  chess = new Chess();
  selectedSquare: { row: number, col: number } | null = null;
  validMoves: Square[] = [];
  isGameOver = false;

  ngOnInit() {
    this.initializeBoard();
  }

  initializeBoard() {
    const board = this.chess.board();
    this.board = board.map(row => 
      row.map(cell => (cell ? cell.type + cell.color : ''))
    );
  }

  setPiece(piece: string): string | false {
    const pieceMap: { [key: string]: string } = {
      'pb': '../../../assets/bp.png',
      'pw': '../../../assets/wp.png',
      'nb': '../../../assets/bn.png',
      'nw': '../../../assets/wn.png',
      'bb': '../../../assets/bb.png',
      'bw': '../../../assets/wb.png',
      'rb': '../../../assets/br.png',
      'rw': '../../../assets/wr.png',
      'qb': '../../../assets/bq.png',
      'qw': '../../../assets/wq.png',
      'kb': '../../../assets/bk.png',
      'kw': '../../../assets/wk.png'
    };
    return pieceMap[piece] || false;
  }

  isBlackSquare(row: number, col: number): boolean {
    return (row + col) % 2 === 1;
  }

  toSquareNotation(row: number, col: number): Square {
    const files = 'abcdefgh';
    const ranks = '87654321';
    return (files[col] + ranks[row]) as Square;
  }

  onSquareClick(row: number, col: number) {
    const square = this.toSquareNotation(row, col);
    const piece = this.chess.get(square);

    if (!this.selectedSquare) {
      if (piece && piece.color === this.chess.turn()) {
        this.selectedSquare = { row, col };
        // Fixed type for moves
        const moves = this.chess.moves({ 
          square: square,
          verbose: true 
        }) as Move[];
        this.validMoves = moves.map(move => move.to);
      }
    } else {
      if (this.isValidMove(row, col)) {
        const fromSquare = this.toSquareNotation(this.selectedSquare.row, this.selectedSquare.col);
        const toSquare = this.toSquareNotation(row, col);
        
        try {
          this.chess.move({
            from: fromSquare,
            to: toSquare,
            promotion: 'q'
          });
          this.initializeBoard();
        } catch (e) {
          console.error('Invalid move:', e);
        }
      }
      
      this.selectedSquare = null;
      this.validMoves = [];
    }
    if(this.chess.isGameOver()) {
      this.isGameOver = true;
    }
  }

  isValidMove(row: number, col: number): boolean {
    const square = this.toSquareNotation(row, col);
    return this.validMoves.includes(square);
  }

  isSelectedSquare(row: number, col: number): boolean {
    return this.selectedSquare?.row === row && this.selectedSquare?.col === col;
  }

  async randomGame() {
    this.chess.reset();
    this.initializeBoard();
    this.runGame = true;

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    while (!this.chess.isGameOver() && this.runGame) {
      const moves = this.chess.moves();
      const move = moves[Math.floor(Math.random() * moves.length)];
      this.chess.move(move);
      this.initializeBoard();
      await sleep(1000);
    }
  }

  stopGame() {
    this.runGame = false;
  }

  resetBoard() {
    this.chess.reset();
    this.initializeBoard();
    this.runGame = false;
    this.selectedSquare = null;
    this.validMoves = [];
  }
}