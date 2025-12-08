// You are required to create a tool through which a gym can manage its members.
//     The main class is Member, which stores information about each gym member, and a subclass PremiumMember that adds
// specific details for premium clients.
//     Additionally, there is a Gym class that maintains a collection of members, with methods for managing and analyzing the gym’s membership base.
//
//     The Member class should have the following attributes:
//
//     fullname (String) – full name of the member;
//
// membershipType (String) – type of membership, which can be “monthly” оr “yearly”;
//
// startDate (Date) – date when the membership started;
//
// expiryDate (Date) – the date when the membership expires (1 month after start for monthly, 1 year for yearly);
//
// attendance (int) – number of attended sessions;
//
// isActive (boolean) – a membership is currently active if the current date is before the expiry date;
//
// id (String) – unique identifier formed by combining the first letter of the first name and the first two letters of the last name in uppercase (example "John Doe" => "JDO").
//
// The Member class should implement:
//
//     renewMembership() – extends the expiration date depending on the membership type (yearly - extends it for a year, monthly - extends for a month);
//
// attendSession(hours) – increases the attendance count;
//
// toString() – returns a formatted description of the member in the following format:
//     "Member %id ("%fullname") has a %membershipType membership and has attended %attendance sessions. They are currently %activeStatus."
//
// The PremiumMember class extends Member and adds:
//
//     hasTrainer (boolean) – indicates if the member has a personal trainer;
//
// wellnessPoints (int) – calculated score representing wellness progress.
//
//     This class should implement:
//
//     calculateWellnessPoints() – calculates wellness points using the formula:
//     attendance * 12 if the member has a trainer, otherwise attendance * 8;
// if the membership type is yearly, the total is increased by 20%.
//
// getPremiumTier() – determines the member tier based on total wellness points:
//
//     ≥ 2000 → “God Tier Member”
//
// ≥ 1200 → “Top Tier Member”
//
// ≥ 700 → “Distinguished Member”
//
// otherwise → “Advanced Member”
//
// toString() returns a formatted description of the member in the following format:
//     "Premium %baseToString This member %has/doesn't have a personal trainer, has earned %wellnessPoints wellness points and is ranked as %tier."
// The Gym class should have an attribute:
//
//     members (Array) – a list containing all members of the gym.
//
//     This class should implement the following methods:
//
//     addMember(member) – adds a new member to the collection;
//
// updateMembershipStatuses() – updates the isActive status of each member depending on whether their membership has expired;
//
// averageWellnessOfActive() – calculates and returns the average wellness points of all currently active premium members;
//
// printMembers() – prints all members, first premium members sorted in descending order by wellness points, then regular members
// sorted by attendance, using the toString() method for formatting.

class Member{

    constructor(fullname,membershipType,startDate,attendance) {
        this.fullname = fullname
        this.membershipType = membershipType
        this.startDate = new Date(startDate)
        this.expiryDate = new Date(startDate)
        if(membershipType === "monthly"){
            this.expiryDate.setMonth(this.expiryDate.getMonth() + 1)
        }else {
            this.expiryDate.setFullYear(this.expiryDate.getFullYear() + 1)
        }
        this.attendance = attendance
        this.isActive = new Date() < this.expiryDate
        let f_name = fullname.split(" ")[0]
        let l_name = fullname.split(" ")[1]
        this.id = f_name.slice(0,1).toUpperCase() + l_name.slice(0,2).toUpperCase()
    }


    renewMembership(){
        if(this.membershipType === "monthly"){
            this.expiryDate.setMonth(this.expiryDate.getMonth() + 1)
        }else {
            this.expiryDate.setFullYear(this.expiryDate.getFullYear() + 1)
        }
    }
    attendSession(hours){
        this.attendance+= hours
    }

    toString(){
        return `Member ${this.id} ("${this.fullname}") has a ${this.membershipType} membership and has attended ${this.attendance} sessions. They are currently ${this.isActive ? `an active member until ${this.expiryDate.toDateString()}` : 'inactive'}.`
    }


}


class PremiumMember extends Member{

    constructor(fullname, membershipType, startDate, attendance,hasTrainer) {
        super(fullname, membershipType, startDate, attendance);
        this.hasTrainer = hasTrainer
    }

    calculateWellnessPoints(){

        let points = null
        if(this.hasTrainer){
            points =  this.attendance * 12
        }
        else {
            points = this.attendance * 8
        }

        if(this.membershipType === "yearly"){
            points += points * 0.2
        }

        return points
    }

    getPremiumTier(){

        let wellnessPoints = this.calculateWellnessPoints()

        if(wellnessPoints >= 2000){
            return "God Tier Member"
        }
        else if(wellnessPoints >= 1200){
            return "Top Tier Member"
        }
        else if(wellnessPoints >= 700){
            return "Distinguished Member"
        }
        else return "Advanced Member"
    }

    toString() {
        return `Premium ${super.toString()} This member ${this.hasTrainer ? "has a personal trainer" : "trains independently"}, has earned ${this.calculateWellnessPoints()} wellness points and is ranked as ${this.getPremiumTier()}.`
    }
}


class Gym{

    constructor() {
        this.members = []
    }

    addMember(member){
        this.members.push(member)
    }

    updateMembershipStatuses(){
        this.members.forEach(m => {

            m.isActive = new Date() < m.expiryDate
        })
    }

    averageWellnessOfActive(){
        let activeMembers = this.members.filter(m => m.isActive && m instanceof PremiumMember)

        let sum_active = activeMembers.reduce((prev,m) => prev+=m.calculateWellnessPoints(),0)

        return activeMembers.length !== 0 ? sum_active / activeMembers.length : 0

    }

    printMembers(){

        let premium = this.members.filter(m => m.isActive && m instanceof PremiumMember).sort((m1,m2) => m2.calculateWellnessPoints() - m1.calculateWellnessPoints() )

        let regular = this.members.filter(m => m.isActive && !(m instanceof PremiumMember)).sort((m1,m2) => m2.attendance - m1.attendance )


        console.log("Premium Members:")
        premium.forEach(m => console.log(m.toString()))
        console.log("Regular Members:")
        regular.forEach(m => console.log(m.toString()))
        console.log("")



    }
}

const gym = new Gym();

const m1 = new Member('Ana Petrova', 'monthly', '2025-11-01', 30);
const m2 = new PremiumMember('Marko Jovanov', 'yearly', '2025-11-01', 150, true);
const m3 = new PremiumMember('Sara Ilievska', 'monthly', '2025-10-18', 80, false);


gym.addMember(m1);
gym.addMember(m2);
gym.addMember(m3);

gym.updateMembershipStatuses();
gym.printMembers();

console.log(`\nAverage wellness of active premium members: ${gym.averageWellnessOfActive()}`);


