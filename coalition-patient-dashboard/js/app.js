async function loadPatient() {

    const loading =
        document.getElementById("loading");


    const patients =
        await getPatients();


    if (!patients.length) {

        if (loading) {
            loading.textContent =
                "Unable to load patient data.";
        }

        return;
    }


    const jessica =
        patients.find(
            patient =>
                patient.name === "Jessica Taylor"
        );


    if (!jessica) {

        if (loading) {
            loading.textContent =
                "Jessica Taylor was not found.";
        }

        return;
    }


    if (loading) {
        loading.remove();
    }


    renderPatient(jessica);
}


/* =========================================================
   RENDER PATIENT
========================================================= */

function renderPatient(patient) {

    setText("profile-name", patient.name);
    setText("gender", patient.gender);
    setText("date-of-birth", patient.date_of_birth);
    setText("phone", patient.phone_number);
    setText("emergency-contact", patient.emergency_contact);
    setText("insurance", patient.insurance_type);


    const profileImage =
        document.getElementById("profile-image");


    if (profileImage && patient.profile_picture) {

        profileImage.src =
            patient.profile_picture;

        profileImage.alt =
            patient.name;
    }


    renderPatientSidebar(patient);

    renderVitals(patient);

    renderDiagnosticList(patient);

    renderLabResults(patient);

    renderBloodPressureChart(patient);
}


/* =========================================================
   HELPER
========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {
        element.textContent =
            value ?? "--";
    }
}


/* =========================================================
   PATIENT SIDEBAR
========================================================= */

function renderPatientSidebar(patient) {

    const patientsList =
        document.getElementById("patients-list");


    if (!patientsList) {
        return;
    }


    patientsList.innerHTML = `

        <div class="patient-item">

            <img
                src="${patient.profile_picture}"
                alt="${patient.name}"
            >

            <div>

                <strong>
                    ${patient.name}
                </strong>

                <span>
                    ${patient.gender}, ${patient.age}
                </span>

            </div>

        </div>

    `;
}


/* =========================================================
   VITALS
========================================================= */

function renderVitals(patient) {

    const history =
        patient.diagnosis_history;


    if (!Array.isArray(history) || !history.length) {
        return;
    }


    const latest =
        history[history.length - 1];


    if (latest.respiratory_rate) {

        setText(
            "respiratory-rate",
            latest.respiratory_rate.value
        );

        setText(
            "respiratory-status",
            latest.respiratory_rate.levels
        );
    }


    if (latest.temperature) {

        setText(
            "temperature",
            latest.temperature.value
        );

        setText(
            "temperature-status",
            latest.temperature.levels
        );
    }


    if (latest.heart_rate) {

        setText(
            "heart-rate",
            latest.heart_rate.value
        );

        setText(
            "heart-status",
            latest.heart_rate.levels
        );
    }
}


/* =========================================================
   DIAGNOSTIC LIST
========================================================= */

function renderDiagnosticList(patient) {

    const container =
        document.getElementById("diagnostic-list");


    if (!container) {
        return;
    }


    const diagnostics =
        patient.diagnostic_list;


    if (!Array.isArray(diagnostics) || !diagnostics.length) {

        container.innerHTML = `
            <p class="empty-message">
                No diagnostic information available.
            </p>
        `;

        return;
    }


    container.innerHTML =
        diagnostics.map(item => `

            <div class="diagnostic-row">

                <span>
                    ${item.name}
                </span>

                <span>
                    ${item.description}
                </span>

                <span>
                    ${item.status}
                </span>

            </div>

        `).join("");
}


/* =========================================================
   LAB RESULTS
========================================================= */

function renderLabResults(patient) {

    const container =
        document.getElementById("lab-results-list");


    if (!container) {
        return;
    }


    const results =
        patient.lab_results;


    if (!Array.isArray(results) || !results.length) {

        container.innerHTML = `
            <p class="empty-message">
                No lab results available.
            </p>
        `;

        return;
    }


    container.innerHTML =
        results.map(result => `

            <div class="lab-result">

                <span>
                    ${result}
                </span>

                <button
                    type="button"
                    class="download-btn"
                    aria-label="Download ${result}"
                >
                    ↓
                </button>

            </div>

        `).join("");
}


/* =========================================================
   START APPLICATION
========================================================= */

loadPatient();