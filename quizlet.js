#!/usr/bin/env node

const letters = [ 'A', 'B', 'C', 'D' ];

function printHelp() {
    console.log(`Usage: ${process.argv[0]} ${process.argv[1]} [-s] <filename.json>`);
    console.log("   -s: Make short answers (letter only)");
    process.exit(1);
}

function main() {
    if (process.argv.length != 3 && process.argv.length != 4) {
        printHelp();
    }
    let shortMode, filename;
    if (process.argv.length == 3) {
        shortMode = false;
        filename = process.argv[2];
    } else if (process.argv[2] == "-s") {
        shortMode = true;
        filename = process.argv[3];
    } else if (process.argv[3] == "-s") {
        shortMode = true;
        filename = process.argv[2];
    } else {
        printHelp();
    }
    let json = require(filename);
    json.forEach((q, i) => {
        if (i != 0) {
            console.log("__DELIM__");
        }
        let question = q.question + q.answers.map((a, i) => `\n${letters[i]}) ${a}`).join("");
        if (shortMode) {
            console.log(`${question}\n__DEF__\n${letters[q.correct]}`);
        } else {
            console.log(`${question}\n__DEF__\n${letters[q.correct]}) ${q.answers[q.correct]}`);
        }
    });
}

main();
