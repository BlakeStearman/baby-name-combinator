const fs = require("fs");

/**
 * Input
 */
const args = process.argv.splice(2); // retrieve only the arguments passed into the script
const lastName = args.shift() || "Smith";
const firstNamesFile = args.shift() || "./first_names.txt";
const middleNamesFile = args.shift() || "./middle_names.txt";
const badInitialsFile = args.shift() || "./avoid_initials.txt";
const namesFile = args.shift() || "./names.txt";

/**
 * Concatenate the two arrays, filtering out duplicates between the two as well as undefined/null values.
 * @param {Array} a1
 * @param {Array} a2
 * @returns {Array}
 */
function concatUnique (a1, a2) {
  let newA = [].concat(a1 || []);
  let newB = [].concat(a2 || []);
  newB.forEach(function (val) {
    if (val && newA.indexOf(val) === -1) {
      newA.push(val);
    }
  });
  return newA;
}

/**
 * Similar to Ruby chomp string method. Strip of all newline characters from the end of the string.
 * @param {String} string
 * @returns {String}
 */
function chomp(string)  {
  return string.replace(/(\n|\r)+$/, "");
}

/**
 * Async function that loads names from a file.
 * @param {String} fileName
 * @returns {Promise}
 */
async function readNames (fileName) {
  return new Promise(resolve => {
    fs.readFile(fileName, "utf8", function (err, data) {
      if (err) {
        resolve([]);
      }
  
      let names = err ? [] : data.split("\n");
      resolve(names);
    });
  })
}

/**
 * Async function for writing out final names to a file.
 * @param {String} fileName 
 * @param {Array} data 
 * @returns {Promise}
 */
async function writeNames (fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return;
    } else {
      console.log(`Names generated and saved in ${fileName}`);
      return;
    }
  });
}

/**
 * Generate all combinations of names.
 */
async function generateNames() {
  let firstNames = await readNames(firstNamesFile);
  let middleNames = await readNames(middleNamesFile);
  let badInitials = await readNames(badInitialsFile);
  let allNames = [];
  let lines = [];
  let initials = "";

  // combine names as all first names can be middle names
  allNames = concatUnique(await firstNames, await middleNames);

  // generate all permutations
  firstNames.forEach((first) => {
    allNames.forEach((middle) => {
      initials = (first.slice(0, 1) + middle.slice(0, 1) + lastName.slice(0, 1));
  
      if (badInitials.indexOf(initials.toUpperCase()) === -1) {
        var line = `${initials}\t│\t${chomp(first)} ${chomp(middle)} ${chomp(lastName)}`;
        lines.push(line);
      }
    });
  });
  
  let output = lines.join("\r\n");
  return await writeNames(namesFile, output);
}

/** Run Script */
generateNames();
