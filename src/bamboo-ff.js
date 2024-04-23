  const pie =
                "https://api.employmenthero.com/ats/api/v1/embedded/organisations/9b75b8b2-a8aa-445f-bd6f-acf6c85ada79/jobs";
            const keylime = "S2z9lR6KiMS1wHuSt4Az5A";
    
            fetch(pie, {
                    headers: {
                        "X_ATS_TOKEN": keylime
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
    
                    const openJobsDiv = document.querySelector('[data-jobs="open"]');
                    const closedJobsDiv = document.querySelector('[data-jobs="closed"]');
    
                    if (data.data && data.data.items && data.data.items.length > 0) {
                        closedJobsDiv.style.display = 'none';
    
    
                        data.data.items.forEach(job => {
                            const jobDiv = document.createElement('div');
                            jobDiv.classList.add('jobposts_wrapper');
                            jobDiv.innerHTML = `
                                
                            
                                <div class="w-layout-hflex jobposts_flex-wrapper is-stretched">
                                    <div class="w-layout-vflex spacing_tiny">
                                        <h5>${job.title}</h5>
                                        <div class="is-faded">${job.department}</div>
                                    </div>
                                    <div class="jobposts_tag">${new Date(job.created_at).toLocaleDateString()}</div>
                                </div>
                                <div class="w-layout-hflex jobposts_flex-wrapper">
                                    <div class="jobposts_tag"><svg class="button_icon" xmlns="http://www.w3.org/2000/svg" width="100%"
                                            viewBox="0 0 8 8" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M1.17157 1.17157C1.92172 0.421427 2.93913 0 4 0C5.06087 0 6.07828 0.421427 6.82843 1.17157C7.57857 1.92172 8 2.93913 8 4C8 4.52529 7.89654 5.04543 7.69552 5.53073C7.4945 6.01604 7.19986 6.45699 6.82843 6.82843C6.45699 7.19986 6.01604 7.4945 5.53073 7.69552C5.04543 7.89654 4.52529 8 4 8C3.47471 8 2.95457 7.89654 2.46927 7.69552C1.98396 7.4945 1.54301 7.19986 1.17157 6.82843C0.800139 6.45699 0.505501 6.01604 0.304482 5.53073C0.103463 5.04543 0 4.52529 0 4C0 2.93913 0.421427 1.92172 1.17157 1.17157ZM4 0.8C3.15131 0.8 2.33737 1.13714 1.73726 1.73726C1.13714 2.33737 0.8 3.15131 0.8 4C0.8 4.42023 0.88277 4.83634 1.04359 5.22459C1.2044 5.61283 1.44011 5.96559 1.73726 6.26274C2.03441 6.55989 2.38717 6.7956 2.77541 6.95642C3.16365 7.11723 3.57977 7.2 4 7.2C4.42023 7.2 4.83635 7.11723 5.22459 6.95642C5.61283 6.7956 5.96559 6.55989 6.26274 6.26274C6.55989 5.96559 6.7956 5.61283 6.95642 5.22459C7.11723 4.83635 7.2 4.42023 7.2 4C7.2 3.15131 6.86286 2.33737 6.26274 1.73726C5.66262 1.13714 4.84869 0.8 4 0.8ZM4 1.6C4.22091 1.6 4.4 1.77909 4.4 2V3.83431L5.48284 4.91716C5.63905 5.07337 5.63905 5.32663 5.48284 5.48284C5.32663 5.63905 5.07337 5.63905 4.91716 5.48284L3.71716 4.28284C3.64214 4.20783 3.6 4.10609 3.6 4V2C3.6 1.77909 3.77909 1.6 4 1.6Z"
                                                fill="currentColor"></path>
                                        </svg>
                                        <div>${job.employment_type_name}</div>
                                    </div>
                                    <div class="jobposts_tag"><svg class="button_icon" xmlns="http://www.w3.org/2000/svg" width="100%"
                                            viewBox="0 0 9 8" fill="none">
                                            <path
                                                d="M7.72967 1.68421H6.44395V0.842105C6.44395 0.377684 6.05952 0 5.58681 0H3.01538C2.54267 0 2.15824 0.377684 2.15824 0.842105V1.68421H0.872524C0.399809 1.68421 0.0153809 2.06189 0.0153809 2.52632V3.78947H8.58681V2.52632C8.58681 2.06189 8.20238 1.68421 7.72967 1.68421ZM3.01538 0.842105H5.58681V1.68421H3.01538V0.842105ZM5.15824 5.05263H3.44395V4.21053H0.0153809V7.15789C0.0153809 7.62232 0.399809 8 0.872524 8H7.72967C8.20238 8 8.58681 7.62232 8.58681 7.15789V4.21053H5.15824V5.05263Z"
                                                fill="currentColor"></path>
                                        </svg>
                                        <div>${job.employment_term_name}</div>
                                    </div>
                                    <div class="jobposts_tag"><svg class="button_icon" xmlns="http://www.w3.org/2000/svg" width="100%"
                                            viewBox="0 0 8 9" fill="none">
                                            <path
                                                d="M4.1742 0.0500488C2.46666 0.0500488 0.921753 1.35916 0.921753 3.38381C0.921753 4.67665 1.91781 6.19717 3.90587 7.94943C4.06036 8.08359 4.2921 8.08359 4.44659 7.94943C6.43058 6.19717 7.42664 4.67665 7.42664 3.38381C7.42664 1.35916 5.88173 0.0500488 4.1742 0.0500488ZM4.1742 4.11561C3.72699 4.11561 3.36109 3.74971 3.36109 3.30249C3.36109 2.85528 3.72699 2.48938 4.1742 2.48938C4.62141 2.48938 4.98731 2.85528 4.98731 3.30249C4.98731 3.74971 4.62141 4.11561 4.1742 4.11561Z"
                                                fill="currentColor"></path>
                                        </svg>
                                        <div>${job.city}</div>
                                    </div>
                                </div>
                                <div data-text="clip" style="margin:1rem 0rem;">
                                    <p>${job.description}</p>
                                </div>
                            
                                <hr style="width:100%;height:2px;background-color:#8982D2;border:none">
                                <div class="w-layout-hflex jobposts_flex-wrapper is-stretched">
                                    <div class="w-layout-hflex jobposts_flex-wrapper">
                                        <div class="is-faded">£<span>${job.salary_min}</span> - £<span>${job.salary_max}</span></div>
                                    </div>
                                    <div class="w-layout-hflex jobposts_flex-wrapper is-stretched"><a href="${job.application_url}"
                                            class="is-faded">More Info</a><a data-fill="white" href="${job.application_url}"
                                            class="button_filled w-button">Apply Now</a></div>
                                </div>
                        
                            
                             
                          
                            `;
                            openJobsDiv.appendChild(jobDiv);
                        });
    
    
    
                    }
                    else {
                        openJobsDiv.style.display = 'none';
                    }
    
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
