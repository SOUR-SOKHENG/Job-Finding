var job = [] 


fetch("https://sour-sokheng.github.io/Work/job.json")
    .then(res => res.json())
    .then(data => {
        job = data 
        console.log("Fetched data:", job)
        DisplayJob(job) 
    })
    .catch(err => console.error("Error fetching data:", err))

// Function to display the jobs
const DisplayJob = (jobsArray) => {
    let show = ``
    
    jobsArray.forEach((Work) => {
        show += `<div class="Companies-and-Jobs col-12 col-sm-5 col-lg-5 mx-1 rounded-3">
                    <div class="job-box">
                        <div class="d-flex">
                        <img src="${Work.company.logo}"  class=" logo-img rounded me-3 ms-3 mt-1 object-fit-cover" alt="Company-logo">
                        <h2 class="mt-3 ms-2 fw-bolder company-name fs-4">${Work.company.name}</h2>
                    </div>
                <div class="job-content mt-3 ms-2 py-0 my-0">
                    <h5>Job: ${Work.job_title}</h5>
                    <h5>Salary: ${Work.salary.min} ${Work.salary.currency} to ${Work.salary.max} ${Work.salary.currency}</h5>
                    <p>Location: ${Work.location.district}, ${Work.location.province}</p>
                    <p class="job-description">Description: ${Work.description.substring(0,45)} </p>
                    <p>Requirements:</p>
                    <ul class="list-group-item">
                        ${Work.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                    <div class="mt-2">
                        <span class="badge bg-primary mt-3 fs-5 me-3">${Work.job_type}</span>
                        <span class="badge bg-secondary">${Work.experience_level}</span>
                        <span class="badge bg-info">${Work.category}</span>
                    </div>
                </div>
            </div>
        </div>`
    })
    document.getElementById('job-show').innerHTML = show;
}