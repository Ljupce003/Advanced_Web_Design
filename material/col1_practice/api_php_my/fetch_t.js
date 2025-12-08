function getFirst(arr) {
    if (arr.length > 0) return arr[0]
    return null;
}

function groupTransactionsUsingMap(transactions = []) {
    return transactions
        .map(tr => {
            tr.dateTimeExecuted = new Date(tr.dateTimeExecuted);
            return tr;
        })
        .sort((t1, t2) => t1.dateTimeExecuted - t2.dateTimeExecuted)
        .reduce((prev, val) => {
            // let tr_date = new Date(val.dateTimeExecuted)
            let tr_date_str = val.dateTimeExecuted.toISOString().slice(0, 10)

            let arr = prev.has(tr_date_str) ? prev.get(tr_date_str) : []

            arr.push(val)

            prev.set(tr_date_str, arr)
            return prev

        }, new Map())
}

function groupTransactionsUsingObject(transactions) {
    return transactions
        .map(tr => {
            tr.dateTimeExecuted = new Date(tr.dateTimeExecuted);
            return tr;
        })
        .sort((t1, t2) => t1.dateTimeExecuted - t2.dateTimeExecuted)
        .reduce((prev, tr) => {
            let tr_date = tr.dateTimeExecuted.toISOString().slice(0, 10)

            let arr = prev[tr_date] ? prev[tr_date] : []

            arr.push(tr)

            arr.sort((t1,t2) => t2.dateTimeExecuted - t1.dateTimeExecuted)
            prev[tr_date] = arr

            return prev
        }, {})
}

function TransactionManager() {
    let transaction_map = {};

    return {
        t_map: transaction_map,
        add: (tr) => {
            let arr = transaction_map[tr.account_id] ? transaction_map[tr.account_id] : []
            arr.push(tr)

            transaction_map[tr.account_id] = arr
        },
        getByAccId: (acc_id) => transaction_map[acc_id] ?? null,
        getByTrId: (tr_id) => getFirst(Object.keys(transaction_map).map(key => transaction_map[key])
            .reduce((prev, curr) => {
                // return [...prev,...curr]
                return prev.concat(curr)
            }, [])
            .filter((tr) => tr.id === tr_id)),
        // getByTrId: (tr_id) => getFirst(Object.keys(transaction_map).map(k => transaction_map[k]).flat().filter((tr) => tr.id === tr_id)),
        getAllTransactions: () => Object.keys(transaction_map).map(key => transaction_map[key]).reduce((prev, curr) => {

            // return [...prev,...curr]
            return prev.concat(curr)
        }, []),
        // getAllTransactions: () => Object.keys(transaction_map).map(key => transaction_map[key]).flat()

    }
}

// let m = new Map()


async function fetchAccount(email, password) {

    let logoutResp = await fetch("http://localhost/project/proj1/my_practice/col_proj/api/logout.php");
    let logoutData = await logoutResp.json();

    if (!logoutData || logoutData['message'] !== "Logged out successfully") {
        console.log("Unable to log out")
        return;
    }

    setTimeout(() => {
    }, 500);

    let loginResp = await fetch("http://localhost/project/proj1/my_practice/col_proj/api/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })

    let loginRespData = await loginResp.json();

    if (!loginRespData || loginRespData['message'] !== "Login successful") {
        console.log("Login was unsuccessful");
        return;
    }

    let accountsResp = await fetch(`http://localhost/project/proj1/my_practice/col_proj/api/accounts.php?email=${email}`)

    let accountsData = await accountsResp.json()


    return accountsData.slice(0, -1)
    // return accountsData;

}


// fetchAccount("peter@finki.com", "password").then((resp) => console.log(resp))


async function fetchTransactions(email, password) {

    let accounts = await fetchAccount(email, password);

    let acc_objs = accounts.map(acc => ({id: acc.id, name: acc.name, balance: acc.balance, createdAt: acc.createdAt}))

    // console.log(acc_nums)

    let transaction_objs = []


    for (let acc of acc_objs) {

        let transactionResp = await fetch(`http://localhost/project/proj1/my_practice/col_proj/api/transactions.php?email=${email}&account_id=${acc.id}`);
        if (transactionResp === null) {
            console.log(`Error fetching transaction for acc: ${acc.id}`);
            return
        }
        let transactionData = await transactionResp.json();

        if (transactionData === null) {
            console.log(`Error parsing transaction for acc ${acc.id} `, transactionResp);
        } else {
            transactionData = transactionData.slice(0, -1)
            for (let transaction of transactionData) {

                transaction_objs.push({...transaction, acc_id: acc.id, u_email: email})
            }
        }


    }

    // return transaction_objs.reduce((prev,transact) => {
    //     let arr = prev[transact.account_id] ? prev[transact.account_id] : []
    //
    //     arr.push(transact)
    //     prev[transact.account_id] = arr;
    //     return prev
    // },{});
    return transaction_objs

}

let transactions = await fetchTransactions("peter@finki.com", "password");


let manager = TransactionManager();

for (let tr of transactions) {
    manager.add(tr)
}

console.log("\nAll transactions\n")
console.log(manager.getAllTransactions())

let reqAcc = 3
console.log(`\nAll transactions from account ${reqAcc}\n`)
// console.log(manager.getByAccId(reqAcc))
let accTransactions = manager.getByAccId(reqAcc);


let reqTr = 19
// console.log(`\nTransaction with id ${reqTr}\n`)
// console.log(manager.getByTrId(reqTr))

let reqTransaction = manager.getByTrId(reqTr);

// console.log(reqTransaction)

// console.log(groupTransactionsUsingMap(accTransactions).keys());


// console.log(groupTransactionsUsingObject(accTransactions));

// console.log(accTransactions)

let filteredTransactions = accTransactions
    .map(t => {t.dateTimeExecuted = new Date(t.dateTimeExecuted); return t})
    .filter(t => t.dateTimeExecuted > new Date())

// console.log(filteredTransactions)

// console.log(new Date())

console.log(groupTransactionsUsingObject(filteredTransactions))



