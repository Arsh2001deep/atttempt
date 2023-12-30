function getDate(event) {
    event.preventDefault();
    let day = parseInt(document.getElementById('day').value)
    let month = parseInt(document.getElementById('month').value)
    let year = parseInt(document.getElementById('year').value)

    let gradday = parseInt(document.getElementById('gradday').value)
    let gradmonth = parseInt(document.getElementById('gradmonth').value)
    let gradyear = parseInt(document.getElementById('gradyear').value)
    console.log("day is ", day);

    let date = new Date()


    newRows(date.getFullYear(), year, gradyear, month, day, gradmonth, gradday)

}

const newRows = (cyr, byr, gyr, m, d, gm, gd) => {


    data = attemptsChecker(cyr, byr, gyr, m, d, gm, gd)
    let count = 0

    // Get the main element once and use it throughout
    const mainElement = document.getElementById('main');

    // Clear existing content before adding new rows
    mainElement.innerHTML = '';


    data.map(({ year, attempt, grad, timeslot, session }) => {
        if (count == 0) {
            document.getElementById('main').innerHTML += `
            
        
            
                <th>graduation</th>
                <th>year</th>
                <th>attempts</th>
                <th>age limit</th>
                <th>session start</th>
             



                <tr> 
                <td rowspan="2">${grad}</td>
                <td rowspan="2">${year}</td>
                <td>${attempt[0]}</td>
                <td>${timeslot[0]}</td>
                <td>${session[0]}</td>
             

                </tr>

                <tr>
                <td>${attempt[1]}</td>
                <td>${timeslot[1]}</td>
                <td>${session[1]}</td>
              
                 </tr>
        
            
                `
        } else {

            document.getElementById('main').innerHTML += `
            <tr> 
            <td rowspan="2">${grad}</td>
            <td rowspan="2">${year}</td>
            <td>${attempt[0]}</td>
            <td>${timeslot[0]}</td>
            <td>${session[0]}</td>
        

            </tr>

            <tr>
            <td>${attempt[1]}</td>
            <td>${timeslot[1]}</td>
            <td>${session[1]}</td>
          
             </tr>`

        }
        count = 1
    })
}

const attemptsChecker = (cyr, byr, gyr, m, d, gm, gd) => {
    // let date = new Date(byr + '-' + m + '-' + d)

    // console.log("birthdate", date);

    //
    let date = new Date(byr + '-' + m + '-' + d)

    console.log("birthdate", date);
    let gradyearrr = new Date(gyr + '-' + gm + '-' + gd)

    console.log("gradyearrrrr", gradyearrr);


    //

    let session = []
    session[0] = `04-01-${cyr+1}`
    session[1] = `10-01-${cyr+1}`

    // if (gradyearrr >= new Date(session[0])) {
    //     console.log("gr is kesss than", gradyearrr);
    // } else {
    //     console.log("greater", new Date(session[0]));
    // }


    let timeslot = []

    let data = []

    let status

    for (let i = cyr; i <= byr + 25; i++) {
        if (gyr > cyr) {

            status = "doing"

        } else if (gyr < cyr) {

            status = "completed"
        } else {
            status = "passed/appeared/appearing"
        }

        timeslot[0] = `${cyr-24}-01-02 to ${cyr-18}-01-01`
        timeslot[1] = `07-02-${cyr - 24} to 07-01-${cyr - 18}`
        timeslot[2] = `${cyr+1}-04-01`
        timeslot[3] = `${cyr+1}-10-01`


        let attempt = []

        timeArr = timeslot[0].split(" ")

        console.log("time arr", timeArr);
        console.log("time ", timeslot);
        console.log("cyr ", cyr);

        // if (date >= new Date(timeArr[0]) && date <= new Date(timeArr[2])) {
        //     attempt[0] = '1     ✅'

        // } else {
        //     attempt[0] = '1     ❌'
        // }

        console.log("ggggggg", gradyearrr);
        console.log("ssssssssssss", new Date(timeslot[3]));
        console.log(gradyearrr <= new Date(timeslot[3]));
        if (date >= new Date(timeArr[0]) && date <= new Date(timeArr[2])) {
            if (gradyearrr <= new Date(timeslot[2])) {
                attempt[0] = '1     ✅'

            } else {
                attempt[0] = '1     ❌ due to session date'

            }

        } else {
            attempt[0] = '1     ❌ due to age'
        }
        timeArr = timeslot[1].split(" ")
        if (date >= new Date(timeArr[0]) && date <= new Date(timeArr[2])) {
            if (gradyearrr <= new Date(timeslot[3])) {
                attempt[1] = '1     ✅'
                console.log("ooooooooooo", date, new Date(timeArr[0]), new Date(timeArr[2]));

            } else {
                attempt[1] = '1     ❌ due to session date'

            }

        } else {
            attempt[1] = '1     ❌ due to age'
        }
        data.push({
            year: [cyr],
            attempt: attempt,
            grad: status,
            timeslot: [`02-01-${cyr - 24} to 01-01-${cyr - 18} `, `02-07-${cyr - 24} to 02-07-${cyr - 18}`],
            session: [`01-04-${cyr + 1}`, `01-10-${cyr+1}`]
        })

        cyr = cyr + 1
    }
    return data

}