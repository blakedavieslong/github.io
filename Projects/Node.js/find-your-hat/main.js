const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor (fieldArray) {
        this.fieldArray = fieldArray;
        this.x = 0;
        this.y = 0;
        this.height = fieldArray.length;
        this.width = fieldArray[0].length;
    }

    print() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                process.stdout.write(this.fieldArray[i][j]);
            }
            process.stdout.write('\n');
        }
    }

    static generateField(height, width, percentOfHoles) {
        const newField = [];
        let x, y;
        let placed = false;

        //initialize the empty field
        for (let i = 0; i < height; i++) {
            newField[i] = [];
            for (let j = 0; j < width; j++) {
                newField[i][j] = fieldCharacter;  
            }
        }
        
        // place the character in 0, 0 to start
        newField[0][0] = pathCharacter;

        // places the hat randomly, at least 80% down the path
        const minHat = Math.floor(height * .8);
        x = Math.floor(Math.random() * (height - minHat + 1)) + minHat - 1;
        y = Math.floor(Math.random() * width);
        newField[x][y] = hat;

        // calculates the number of holes from the percent paramenter then places that many
        const numOfHoles = Math.floor(height * width * (percentOfHoles/100));
        for (let h = 1; h <= numOfHoles; h++){
            placed = false;
            while (placed === false) {
                x = Math.floor(Math.random() * height);
                y = Math.floor(Math.random() * width);
                if ((x === 0 && y === 0) || newField[x][y] === hole || newField[x][y] === hat) {
                    placed === false;
                } else {
                    newField[x][y] = hole;
                    placed = true;
                }
            }
            
        }

        return newField;
    }
}

const myField = new Field(Field.generateField(10, 5, 10));

const takeStep = (userInput) => {
    let input = userInput.toString().trim();
    input = input.toLowerCase()

    switch (input) {
        case 'u':
            myField.x --;
            break;
        case 'd':
            myField.x ++;
            break;
        case 'l':
            myField.y --;
            break;
        case 'r':
            myField.y ++;
            break;
        default:
            console.log('Please enter a direction. u = up, d = down, l = left, r = right.');
            process.stdout.write('Which way?');
            return;
    }

    if (myField.x < 0 || myField.y < 0 || myField.x >= myField.height || myField.y >= myField.width) {
        console.log('You have fallen off the map. Game over.');
        process.exit(0);
    }

    if (myField.fieldArray[myField.x][myField.y] === hole) {
        console.log('Unfortunately you have fallen down a hole. Game over.');
        process.exit(0);
    }

    if (myField.fieldArray[myField.x][myField.y] === hat) {
        console.log('Congratulations, you found your hat!');
        process.exit(0);
    }

    myField.fieldArray[myField.x][myField.y] = pathCharacter;
    myField.print();
    process.stdout.write('Which way?');
};

myField.print();
process.stdout.write('Which way?');
process.stdin.on('data', takeStep); 

