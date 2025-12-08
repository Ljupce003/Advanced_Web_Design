

function reportFunction(tag,value) {
    return `tag \"${tag}\", value \[${value}\], SIZE: ${value.length}`
}


function reporterClosure(formatFn){

    let private_obj = {}

    return {
        addTag: (tag,value)=> {
            if(private_obj[tag] !== undefined){
                private_obj[tag].push(value)
            }else {
                private_obj[tag] = []
                private_obj[tag].push(value)
            }
        },
        removeTag: (tag) => {
            if(private_obj[tag] !== undefined){
                delete private_obj[tag]
            }
        } ,
        reportTag: (tag) => {
            if(private_obj[tag] !== undefined){
                console.log(formatFn(tag,private_obj[tag]))
            }
        },
        reportAll: () => {
            return Object.keys(private_obj).map(key => formatFn(key,private_obj[key]))
        }
    }

}

const reporter = reporterClosure(reportFunction);

console.log("=== ADD TAG TESTS ===");
reporter.addTag("fruit", "apple");
reporter.addTag("fruit", "banana");
reporter.addTag("color", "red");
reporter.addTag("color", "blue");
reporter.addTag("number", 123);

console.log("Expect fruit: [apple, banana]");
reporter.reportTag("fruit");

console.log("Expect color: [red, blue]");
reporter.reportTag("color");

console.log("Expect number: [123]");
reporter.reportTag("number");


console.log("\n=== REPORT ALL TEST ===");
const allReports = reporter.reportAll();
console.log(allReports);
// Expect 3 formatted strings


console.log("\n=== REMOVE TAG TEST ===");
reporter.removeTag("color");

console.log("Expect no output for 'color':");
reporter.reportTag("color");

console.log("\nExpect only fruit and number:");
console.log(reporter.reportAll());