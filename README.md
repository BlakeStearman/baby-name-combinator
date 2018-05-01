# Baby Name Combinator
Simple Nodejs script that generates baby name combinations from given file input. This was originally written as a Ruby script years ago as a simple tool to help my wife and I print out a list of names we were considering for our first child. Having the names written out allowed us to quickly eliminate a lot of names from consideration and curate a small list which we ended up using for our first three children.

These days I don't do much Ruby programming, so rewriting this in Java was a useful way to test using the template literal and async / await features of the JavaScript language. I was inspired to refresh this as we have another child on the way.

## Notes
This script considers names in the first names file as acceptable both for first names as well as middle names. Names designated in the middle names file will only be considered for middle names. The avoid initials file allows you to designate initials you want to avoid, such as POS, ASS, etc. I added this as small safety check... kids make fun of each other for everything, so if you can avoid the obvious ones, you may be saving your kid from at least some small torture.

## Usage
Create three files. One file containing first names you are considering, one per line, another containing middle names you are considering, one per line, and the third file containing initials you want to avoid, one set of initials per line. See the sample files (`sample_*.txt`) provided in the repository for examples.

### Using npm
On first run, make sure to execute `npm i`. 

`npm run generate <last_name>`

Using the npm `generate` script assumes the first names are found in `first_names.txt`, the last names in `last_names.txt`, the initials to avoid are in `avoid_initials.txt`, and the output file is `names.txt`.

Sample files for first names, last names, initials to avoid, and last names are provided in the `sample_*.txt` files provided with this project. Names chosen for the sample files have no particular significance and are provided for example solely.

### Example
`npm run generate Smith`

### Using Node
`node bnc.js <last_name> <first_names_file> <middle_names_file> <avoid_initials_file> <output_names_file>`

**Example**
`node bnc.js Smith first_names.txt middle_names.txt avoid_initials.txt names.txt`

## Output
The file output puts each name generated on a single row, with the initials followed by the full name. Sample output is provided in this repository in the `sample_names.txt`.

### Example <output_names_file>

```text
AAS	│	Adalynne Adalynne Smith
ACS	│	Adalynne Clara Smith
ADS	│	Adalynne Dana Smith
AES	│	Adalynne Elise Smith
AGS	│	Adalynne Grace Smith
# ...
```