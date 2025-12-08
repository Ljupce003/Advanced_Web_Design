let nick = {
    name: "Nick",
    birthday: new Date("2003-11-20 19:00"),
    // get age() {
    //     const millisecond_in_year = 365 * 24 * 60 * 60 * 1000
    //     let currDate = new Date()
    //     let seconds = (currDate - this.birthday) / (1000)
    //     let minutes = (currDate - this.birthday) / (1000 * 60)
    //     let hours = (currDate - this.birthday) / (1000 * 60 * 60)
    //     let days = (currDate - this.birthday) / (1000 * 60 * 60 * 24)
    //     let months = (currDate - this.birthday) / (1000 * 60 * 60 * 24 * 30.4375)
    //     let years = (currDate - this.birthday) / (1000 * 60 * 60 * 24 * 365)
    //
    //     return `Years: ${years.toFixed(0)}
    //             Months: ${months.toFixed(0)}
    //             Days: ${days.toFixed(0)}
    //             Hours: ${hours.toFixed(0)}
    //             Minutes: ${minutes.toFixed(0)}
    //             Seconds: ${seconds.toFixed(2)}`
    //     // return (new Date() - this.birthday) / millisecond_in_year
    //
    // }
    get age() {
        let birthDate = this.birthday
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();
        let hours = today.getHours() - birthDate.getHours()
        let minutes = today.getMinutes() - birthDate.getMinutes();

        if (minutes < 0) {
            hours--
            minutes += 60
        }

        if (hours < 0) {
            days--
            hours += 24
        }

        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return {years, months, days, hours, minutes};
    }
}

console.log(nick.age);