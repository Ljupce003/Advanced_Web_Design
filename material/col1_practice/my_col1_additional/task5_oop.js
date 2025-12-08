// You are a part of the organisation team of a long-term project, and you need to create a system for running evidence of the partners. For that purpose, you firstly need some base helper classes. Partner is a class in which we keep the name of the partner company, it's field of work, the date when the partnership started and the base yearly fee for the partnership.
//
// In this class you should implement the method toString which will print the following: Partner %name has %value base subscription.
//
//
//
//     The class PremiumPartner extends the Partner class, and it additionally keeps a list of fees for additional services (subscriptions) which the partner company currently uses, and whether the partner is a long-term partner or not (true/false) (in the beginning NONE of the partners is a long-term partner). The methods that you should implement in this class are:
//
//
//
// Status method -> prints what is the status of the partner and how much yearly do they pay in total. The total sum that they pay is calculated so that on the base fee you add the total of the fees for additional services. The status of the partner is determined as following:
//
//
//
//     If it is a long-term partner, and:
// They currently use less than 3 additional services -> bronze partner
// They currently use at lest 3, but less than 5 additional services -> silver partner
// They currently use at least 5 additional services -> gold partner
// If it is not a long-term partner, and:
// They currently use less than 5 additional services -> bronze partner
// They currently use at least 5 additional services, and the total fee for those services is less than 500 -> silver partner
// They currently use at least 5 additional services, and the total fee for those services is at least 500 -> gold partner
//
//
// toString (override) -> it prints the partner in the following format: Premium Partner %name has %value base subscription and is/is not a long-term partner.
//
//
//
//     The class ProjectPartners is a class that contains a list of partners for the project (there can be ordinary and premium partners both), where the following functionalities need to be implemented:
//
//
//
//     add a partner (addPartner): adding a new partner to the list.
//     updating long-term partners (updatePartners()): for each premium partner we check if the partnership was formed at least a year ago, it is set that it is a long-term partner. Additionally, if this condition is met, and it is a gold partner (the determination of the partner status is described above), the base yearly fee should be reduced by 20 %. After the update, you should print the status of the partnership. (as defined above)
// calculating the percent of premium partners in a certain field of work (premiumPercentage): for a given field of work, the percent of partners that are premium partners should be calculated.
// printing (print()): prints all the partners, but the premium partners first and then the ordinary partners.


class Partner {
    //new Partner("BuildBetter", "Civil Engineering", new Date(2022, 9, 20), 400);
    constructor(name, department, datePartnership, cotization) {
        this.name = name
        this.department = department
        this.datePartnership = datePartnership
        this.cotization = cotization
    }

    toString() {
        //Partner BuildBetter has 400 base subscription.
        return `Partner ${this.name} has ${this.cotization} base subscription.`
    }
}

class PremiumPartner extends Partner {
    //new PremiumPartner("Node", "IT", new Date(2023, 0, 10), 1000, [100, 50, 150, 200, 100]);


    constructor(name, department, datePartnership, cotization, fees) {

        super(name, department, datePartnership, cotization);
        this.fees = fees
        this.longTerm = false
    }

    Status() {
        let num_services = this.fees.length
        if (this.longTerm) {
            if (num_services < 3) return "bronze partner"
            if (num_services >= 3 && num_services < 5) return "silver partner"
            else return "gold partner"
        } else {
            let total_fee = this.fees.reduce((prev, fee) => prev += fee, 0)
            if (num_services < 5) return "bronze partner"
            if (num_services >= 5 && total_fee < 500) return "silver partner"
            else return "gold partner"

        }
    }

    toString() {
        //Premium Partner Butterfly has 800 base subscription and is a long-term partner.
        return `Premium Partner ${this.name} has ${this.cotization} base subscription and ${this.longTerm ? "is" : "is not"} a long-term partner.`

    }

}

class ProjectPartners {

    constructor() {
        this.partners = []
    }

    addPartner(partner) {
        this.partners.push(partner)
    }

    updatePartners() {
        let premium = this.partners.filter(p => p instanceof PremiumPartner)

        let yearAgoTime = new Date()
        yearAgoTime.setFullYear(yearAgoTime.getFullYear() - 1)

        premium.forEach(p => {
            p.longTerm = p.datePartnership < yearAgoTime
            if (p.longTerm) {
                if (p.Status() === "gold partner") {
                    p.cotization -= p.cotization * 0.2
                }
            }
            //Premium Partner Link is a bronze partner and is currently paying a total of 1300 yearly fee
            console.log(`Premium Partner ${p.name} is a ${p.Status()} and is currently paying a total of ${p.cotization + p.fees.reduce((prev, curr) => prev += curr, 0)} yearly fee.`)
        })
    }


    premiumPercentage(department) {
        let all_in_dep = this.partners.filter(p => p.department === department)

        let all_pr_dep = this.partners.filter(p => p.department === department && p instanceof PremiumPartner)

        let perc = null

        if (all_in_dep.length === 0 || all_pr_dep.length === 0) {
            perc = 0.0
        }
        else {
            perc = (all_pr_dep.length / all_in_dep.length) * 100.0
        }

        console.log(`${perc.toFixed(2)}% of the partners that are in the ${department} field are premium partners.`)

    }

    print(){
        let regular = this.partners.filter(p => !(p instanceof PremiumPartner))
        let premium = this.partners.filter(p => p instanceof PremiumPartner)

        premium.forEach(p => console.log(p.toString()))
        regular.forEach(p => console.log(p.toString()))
    }


}

