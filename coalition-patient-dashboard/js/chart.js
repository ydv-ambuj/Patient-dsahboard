let bloodPressureChart = null;


/* =========================================================
   BLOOD PRESSURE CHART
========================================================= */

function renderBloodPressureChart(patient) {

    const canvas =
        document.getElementById("bloodPressureChart");

    if (!canvas) {
        console.error("Blood pressure canvas not found.");
        return;
    }


    const history =
        patient.diagnosis_history;


    if (!Array.isArray(history) || history.length === 0) {
        console.error("Diagnosis history is not available.");
        return;
    }


    /*
     * Create a copy so the original API data
     * is not modified.
     */
    const sortedHistory = [...history];


    /*
     * Convert month names into numbers so the
     * records can be sorted correctly.
     */
    const monthNumbers = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11
    };


    /*
     * Sort diagnosis history from oldest
     * to newest.
     */
    sortedHistory.sort((a, b) => {

        const dateA =
            new Date(
                a.year,
                monthNumbers[a.month] ?? 0
            );

        const dateB =
            new Date(
                b.year,
                monthNumbers[b.month] ?? 0
            );

        return dateA - dateB;
    });


    /*
     * Get the latest six months.
     */
    const recentHistory =
        sortedHistory.slice(-6);


    console.log(
        "Chart history:",
        recentHistory
    );


    /*
     * Short month names for the X-axis.
     */
    const shortMonths = {
        January: "Jan",
        February: "Feb",
        March: "Mar",
        April: "Apr",
        May: "May",
        June: "Jun",
        July: "Jul",
        August: "Aug",
        September: "Sep",
        October: "Oct",
        November: "Nov",
        December: "Dec"
    };


    const labels =
        recentHistory.map(item =>
            shortMonths[item.month] || item.month
        );


    /*
     * Systolic values.
     */
    const systolicData =
        recentHistory.map(item =>
            item.blood_pressure?.systolic?.value ?? null
        );


    /*
     * Diastolic values.
     */
    const diastolicData =
        recentHistory.map(item =>
            item.blood_pressure?.diastolic?.value ?? null
        );


    /*
     * Destroy the previous chart if one exists.
     */
    if (bloodPressureChart) {
        bloodPressureChart.destroy();
    }


    /*
     * Create chart.
     */
    bloodPressureChart =
        new Chart(canvas, {

            type: "line",

            data: {

                labels: labels,

                datasets: [

                    /* =========================
                       SYSTOLIC
                    ========================= */

                    {
                        label: "Systolic",

                        data: systolicData,

                        borderColor: "#e66a9a",

                        backgroundColor: "#e66a9a",

                        borderWidth: 2,

                        pointRadius: 5,

                        pointHoverRadius: 7,

                        pointBorderWidth: 0,

                        tension: 0.4
                    },


                    /* =========================
                       DIASTOLIC
                    ========================= */

                    {
                        label: "Diastolic",

                        data: diastolicData,

                        borderColor: "#8066d5",

                        backgroundColor: "#8066d5",

                        borderWidth: 2,

                        pointRadius: 5,

                        pointHoverRadius: 7,

                        pointBorderWidth: 0,

                        tension: 0.4
                    }

                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,


                interaction: {
                    mode: "index",
                    intersect: false
                },


                plugins: {

                    legend: {

                        display: true,

                        position: "top",

                        align: "end",

                        labels: {

                            usePointStyle: true,

                            pointStyle: "circle",

                            padding: 15,

                            boxWidth: 8,

                            boxHeight: 8,

                            font: {
                                size: 11
                            }
                        }
                    },


                    tooltip: {

                        callbacks: {

                            title: function(context) {

                                const index =
                                    context[0].dataIndex;

                                const item =
                                    recentHistory[index];

                                return `${item.month} ${item.year}`;
                            }

                        }

                    }

                },


                scales: {

                    /* =========================
                       X AXIS
                    ========================= */

                    x: {

                        grid: {
                            display: false
                        },

                        border: {
                            display: false
                        },

                        ticks: {

                            color: "#6b7280",

                            font: {
                                size: 11
                            }
                        }

                    },


                    /* =========================
                       Y AXIS
                    ========================= */

                    y: {

                        min: 60,

                        max: 180,

                        ticks: {

                            stepSize: 20,

                            color: "#6b7280",

                            font: {
                                size: 11
                            }
                        },

                        grid: {

                            color: "#e5e7eb",

                            drawBorder: false
                        },

                        border: {
                            display: false
                        }

                    }

                }

            }

        });

}