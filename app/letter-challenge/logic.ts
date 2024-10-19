export type Letter = {
  char: string;
  x: number;
  y: number;
  color: string;
  disappearing: boolean;
};

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD700'];

class LetterGame {
  letters: Letter[] = [];
  score: number = 0;
  _isPaused: boolean = false;
  dropFrequency: number;
  dropSpeed: number;
  dropIntervalId: NodeJS.Timeout | null = null;
  moveIntervalId: NodeJS.Timeout | null = null;
  disappearingIntervalId: NodeJS.Timeout | null = null;
  width: number;
  height: number;

  constructor(dropFrequency: number, dropSpeed: number, width: number, height: number) {
    this.dropFrequency = dropFrequency;
    this.dropSpeed = dropSpeed;
    this.width = width;
    this.height = height;
  }

  start() {
    this.dropIntervalId = setInterval(() => {
      if (!this._isPaused) {
        this.dropLetters();
      }
    }, this.dropFrequency);

    this.moveIntervalId = setInterval(() => {
      if (!this._isPaused) {
        this.moveLetters();
      }
    }, 1000 / 10);

    this.disappearingIntervalId = setInterval(() => {
      if (!this._isPaused) {
        this.removeDisappearedLetters();
      }
    }, 1000);
  }

  pause() {
    this._isPaused = true;
  }

  resume() {
    this._isPaused = false;
  }

  reset() {
    this.letters = [];
    this.score = 0;
    this._isPaused = false;
    if (this.dropFrequency) {
      clearInterval(this.dropFrequency);
    }
    if (this.moveIntervalId) {
      clearInterval(this.moveIntervalId);
    }
    if (this.disappearingIntervalId) {
      clearInterval(this.disappearingIntervalId);
    }
    this.start();
  }

  public isPaused(): boolean {
    return this._isPaused;
  }

  dropLetters() {
    // Add a new letter
    const newChar = this.getRandomChar();
    if (!this.letters.some(letter => letter.char === newChar)) {
      this.letters.push({ char: newChar, x: Math.random() * (this.width - 100), y: 0, color: colors[Math.floor(Math.random() * colors.length)], disappearing: false });
    }
  }

  moveLetters() {
    // Move existing letters down
    this.letters.forEach(letter => {
      letter.y += this.dropSpeed / 10;
      if (letter.y > this.height - 100) {
        this.letters = this.letters.filter(l => l !== letter);
      }
    });
  }

  removeDisappearedLetters() {
    this.letters = this.letters.filter(letter => !letter.disappearing);
  }

  getRandomChar() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  handleKeyPress(key: string) {
    const letter = this.letters.find(letter => letter.char === key.toUpperCase());
    if (letter) {
      letter.disappearing = true;
      this.score += 1;
    }
    return Boolean(letter);
  }
}

export default LetterGame;
