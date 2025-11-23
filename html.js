let jobs = [];

// Fetch job data for main page
fetch("https://sour-sokheng.github.io/Work/job.json")
    .then(res => res.json())
    .then(data => {
        jobs = data;
        console.log("Fetched data:", jobs);
        displayJobListings(jobs);
        displaycompany(jobs);
    })
    .catch(err => console.log(err));

// Function to display job listings on main page
function displayJobListings(jobsArray) {
    let html = '';
    
    jobsArray.forEach((job, index) => {
        html += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="job-card p-3 w-100" data-job-id="${index}">
                <div class="d-flex align-items-start">
                    <img src="${job.company.logo}" class="logo-img rounded me-3" alt="Company logo">
                    <div>
                        <h3 class="company-name fs-5 mb-1">${job.company.name}</h3>
                        <h4 class="job-title fs-6 mb-2">${job.job_title}</h4>
                        <p class="salary mb-1">${job.salary.min} - ${job.salary.max} ${job.salary.currency}</p>
                        <p class="text-muted small mb-2">${job.location.district}, ${job.location.province}</p>
                        <div class="d-flex flex-wrap gap-2 mt-2">
                            <span class="badge bg-primary">${job.job_type}</span>
                            <span class="badge bg-secondary">${job.experience_level}</span>
                            <span class="badge bg-info">${job.category}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });
    
    document.getElementById('job-show').innerHTML = html;
    
    // Add click event listeners to job cards
    document.querySelectorAll('.job-card').forEach(card => {
        card.addEventListener('click', function() {
            const jobId = this.getAttribute('data-job-id');
            // Store the job ID in localStorage to use on details page
            localStorage.setItem('selectedJobId', jobId);
            // Navigate to job details page
            window.location.href = 'Job_details.html';
        });
    });
}

function displaycompany(jobsArray){
    let com = '';

    jobsArray.forEach((job)=>{
        com +=`
                <div class="grid  g-4 justify-content-center align-items-center  col-6 col-sm-4 col-md-3 col-lg-2 text-center"> 
                <div class="company-card">
                    <div class="company-logo-wrapper">
                        <img src=${job.company.logo} 
                             alt="TechCorp" 
                             class="company-logo">
                    </div>
                    <h6 class="company-name mt-3 fw-semibold">${job.company.name}</h6>
                </div>
            </div>`
    })
    document.getElementById('company-show').innerHTML = com;
}




// Combined Search for both Jobs and Companies
document.getElementById('job-search').addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    
    // Filter jobs
    const foundJobs = jobs.filter(work => {
        return work.job_title.toLowerCase().includes(searchTerm) || work.company.name.toLowerCase().includes(searchTerm);
    });
    
    // Filter companies (unique companies only)
    const foundCompanies = jobs.filter(work => {
        return work.company.name.toLowerCase().includes(searchTerm);
    });
    
    // Remove duplicates from companies
    const uniqueCompanies = foundCompanies.filter((company, index, self) => 
        index === self.findIndex(c => c.company.name === company.company.name)
    );
    
    // Display results
    if (foundJobs.length > 0) {
        displayJobListings(foundJobs);
    } else {
        document.getElementById('job-show').innerHTML = `
        <div class="text-center p-3">
            <h5 class="text-danger">No jobs found</h5>
            <p class="text-muted">Please try another search term...</p>
        </div>`;
    }
    
    if (uniqueCompanies.length > 0) {
        displaycompany(uniqueCompanies);
    } else {
        document.getElementById('company-show').innerHTML = `
        <div class="text-center p-3">
            <h5 class="text-danger">No companies found</h5>
            <p class="text-muted">Please try another search term...</p>
        </div>`;
    }
});