let startWeight
let targetWeight
let currentWeight
let weights = {}
let steps = {}
let targetStep

const hasUserData =
    localStorage.getItem("stWeigth") &&
    localStorage.getItem("curWeight") &&
    localStorage.getItem("tarWeight") &&
    localStorage.getItem("tarStep") &&
    localStorage.getItem("weightArray") &&
    localStorage.getItem("stepsArray");

if (!hasUserData) {
    document.querySelector(".user-form-container").style.display = "block"

    let mainContent = document.querySelector(".main-content")
    if (mainContent) {
        mainContent.classList.add("blur")
    }

    document.querySelector(".header").classList.add("blur")
}
if (hasUserData) {
    loadData()
}

let entrySaveBtn = document.getElementById("entry-save-btn")

if (entrySaveBtn) {


    entrySaveBtn.addEventListener("click", function (e) {

        startWeight = Number(document.getElementById("entry-start-weight").value)
        targetWeight = Number(document.getElementById("entry-target-weight").value)
        currentWeight = Number(document.getElementById("entry-start-weight").value)
        targetStep = Number(document.getElementById("entry-taget-step").value)


        document.querySelector(".user-form-container").style.display = "none"
        document.querySelector(".main-content").classList.remove("blur")
        document.querySelector(".header").classList.remove("blur")
        saveData()
        loadData()

    })
}

let kgLeft = Number((targetWeight - currentWeight).toFixed(2))
let kgLost = Number((startWeight - currentWeight).toFixed(2))
let weight25 = startWeight - (startWeight - targetWeight) * 0.25
let weight50 = startWeight - (startWeight - targetWeight) * 0.50
let weight75 = startWeight - (startWeight - targetWeight) * 0.75
let streakValue = Object.keys(weights).length

let progressPercentage = ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100
progressPercentage = Number(progressPercentage.toFixed(2))
console.log(progressPercentage)
let displayPercentage = Number(progressPercentage.toFixed(0))

// ------------------------ Saving Data to Local Storage ----------------------------------

function saveData() {
    localStorage.setItem("stWeigth", JSON.stringify(startWeight))
    localStorage.setItem("curWeight", JSON.stringify(currentWeight))
    localStorage.setItem("tarWeight", JSON.stringify(targetWeight))
    localStorage.setItem("tarStep", JSON.stringify(targetStep))
    localStorage.setItem("weightArray", JSON.stringify(weights))
    localStorage.setItem("stepsArray", JSON.stringify(steps))
}

function loadData() {
    startWeight = Number(JSON.parse(localStorage.getItem("stWeigth")));
    currentWeight = Number(JSON.parse(localStorage.getItem("curWeight")));
    targetWeight = Number(JSON.parse(localStorage.getItem("tarWeight")));
    targetStep = Number(JSON.parse(localStorage.getItem("tarStep")));
    weights = JSON.parse(localStorage.getItem("weightArray"));
    steps = JSON.parse(localStorage.getItem("stepsArray"));



}





// ------------------------ DashBoard Data ----------------------------------

let dashboardpercentage = document.querySelector(".dash-h1")
let pinPercentage = document.getElementById("pin-text")
let weightStart = document.getElementById("weight-start")
let weightNow = document.getElementById("weight-now")
let weightTarget = document.getElementById("weight-target")
let changedSofar = document.getElementById("changed-sofar")
let leftKg = document.getElementById("leftkg")
let streak = document.getElementById("streak")


if (weightStart) {


    dashboardpercentage.textContent = `You're ${displayPercentage}% of the way there`
    pinPercentage.textContent = currentWeight + " kg"

    weightStart.textContent = startWeight + " kg"
    weightNow.textContent = currentWeight + " kg"
    weightTarget.textContent = targetWeight + " kg"
    changedSofar.textContent = (-1 * kgLost).toFixed(2) + " Kg"
    leftKg.textContent = (-1 * kgLeft).toFixed(2) + " Kg"
    streak.textContent = streakValue


    document.querySelector(".pin").style.left = `${progressPercentage}%`
    document.querySelector(".fill ").style.width = `${progressPercentage}%`
}

// ------------------------------------- Goals Data --------------------------------------

let progressContent = document.querySelector(".progress-content")

let goalPageGoalSaveBtn = document.getElementById("goalPage-goal-save-btn")

if (goalPageGoalSaveBtn) {

    goalPageGoalSaveBtn.addEventListener("click", function (e) {
        // e.preventDefault()
        startWeight = Number(document.getElementById("goalPage-start-weight").value)
        targetWeight = Number(document.getElementById("goalPage-target-weight").value)
        currentWeight = Number(document.getElementById("goalPage-start-weight").value)
         weights = {}
         steps = {}
        saveData()
        loadData()
    })
}

if (progressContent) {


    document.querySelector(".pin").style.left = `${progressPercentage}%`
    document.querySelector(".fill ").style.width = `${progressPercentage}%`
    pinPercentage.textContent = currentWeight + " kg"
    let content25 = ""
    let content50 = ""
    let content75 = ""
    let contentTarget = ""
    if (currentWeight < weight25) {
        content25 = "✔"
    }
    if (currentWeight < weight50) {
        content50 = "✔"
    }
    if (currentWeight < weight75) {
        content75 = "✔"
    }
    if (currentWeight < targetWeight) {
        contentTarget = "✔"
    }

    progressContent.innerHTML = `<div class="progress-list">
    <div class="circle">${content25}</div>
    <span>Reach ${weight25} Kg</span>
    <span>25%</span>
    </div>
    <div class="progress-list">
    <div class="circle">${content50}</div>
    <span>Reach ${weight50} Kg</span>
    <span>50%</span>
    </div>
    <div class="progress-list">
    <div class="circle">${content75}</div>
    <span>Reach ${weight75} Kg</span>
    <span>75%</span>
    </div>
    <div class="progress-list">
    <div class="circle">${contentTarget}</div>
    <span>Reach ${targetWeight} Kg</span>
    <span>100%</span>
    </div>`

    document.querySelector(".progress-container-header h1").textContent = displayPercentage + "%"
    document.querySelector(".progress-container-header span").textContent = `${-1 * kgLeft} Kg to go`

}
// ------------------------------------- Weight Data --------------------------------------

let currentDate = new Date()

function getDateKey(currentDate) {
    return currentDate.toISOString().slice(0, 10)
}

function formatDate(dateEntry) {
    return new Date(dateEntry).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit"
    });
}

let logDatabtn = document.getElementById("log-data-btn")


if (logDatabtn) {
    renderWeights()


    logDatabtn.addEventListener("click", function (e) {
        // e.preventDefault()
        let weight = Number(document.getElementById("weight-entry").value)
        let dateEntry = document.getElementById("date").value
        let displayDate = formatDate(dateEntry)
        // console.log(dateEntry)

        if (!weights[dateEntry]) {
            weights[dateEntry] = []
        }

        weights[dateEntry].push({
            weight: weight,
            date: displayDate
        })
        // console.log(weights)
        UpdateReducedvalues()
        console.log(weights)
        renderWeights()
        saveData()
        loadData()


    })

    function UpdateReducedvalues() {

        const sorted = Object.keys(weights).sort()

        let previousWeight = startWeight

        for (let date of sorted) {
            let entries = weights[date]

            let cDate = entries[entries.length - 1]

            cDate.reduced = Number((previousWeight - cDate.weight).toFixed(2))

            previousWeight = cDate.weight;
        }

        currentWeight = previousWeight

    }




}

function renderWeights() {

    let weightList = document.querySelector(".weight-list")

    weightList.innerHTML = ""

    let sorted = Object.keys(weights).sort()

    for (let date of sorted) {

        let entries = weights[date]

        for (let entry of entries) {
            weightList.innerHTML += `<li class="weight-li">
            <span>⬤</span>
            <span class="weight-text">${entry.date}</span>
            <span class="weight-less"> &#9660; ${entry.reduced}</span>
            <span>${entry.weight} kg</span>
            </li>`
        }
    }

}


// ------------------------------------- Daily Log Data --------------------------------------

let saveStepBtn = document.getElementById("save-steps-btn")

if (saveStepBtn) {

    let todayStep = 0

    saveStepBtn.addEventListener("click", function (e) {
        e.preventDefault()
        todayStep = Number(document.getElementById("steps-entry").value)

        let datekey = getDateKey(currentDate)

        if (!steps[datekey]) {
            steps[datekey] = []
        }


        steps[datekey].push({
            steps: todayStep
        })

        let stepCount = document.getElementById("step-count")
        stepCount.innerText = todayStep
        // console.log(steps)
        let stepPercentage = (todayStep / targetStep) * 100
        // console.log(stepPercentage)
        document.querySelector(".progress-ring").style.background = `conic-gradient(#a203ff 0%,
        #04e2a7 ${stepPercentage}%,
        #EDF1EC ${stepPercentage}%,
        #EDF1EC 100%)`
        saveData()




    })

    let stepPercentage = (todayStep / targetStep) * 100
    // console.log(stepPercentage)
    document.querySelector(".progress-ring").style.background = `conic-gradient(#a203ff 0%,
        #04e2a7 ${stepPercentage}%,
        #EDF1EC ${stepPercentage}%,
        #EDF1EC 100%)`
}

// saveData()
