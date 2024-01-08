let myLeads = []

const deleteBtn = document.getElementById("delete-btn")
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

const inputBtn = document.getElementById("input-btn")
const saveBtn = document.getElementById("save-btn")
saveBtn.addEventListener("click", function(){
    myLeads.push(inputBtn.value)
    console.log(myLeads)
    inputBtn.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

const ulEl = document.getElementById("ul-el")
function render(leads){
    let listItems = " "
    for (let i = 0; i <leads.length; i++){
        listItems += `
            <li>
                <a target = '_blank' href = '${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    ulEl.innerHTML = listItems
    }
}

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads") )
if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
} 

const tabBtn = document.getElementById("tab-btn")
tabBtn.addEventListener("click", function(tabs){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})