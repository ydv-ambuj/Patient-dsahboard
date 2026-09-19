const API_URL =
    "https://fedskillstest.coalitiontechnologies.workers.dev/";


async function getPatients() {

    try {

        const response = await fetch(API_URL, {
            method: "GET",

            headers: {
                "Authorization":
                    "Basic " +
                    btoa("coalition:skills-test"),

                "Content-Type":
                    "application/json"
            }
        });


        if (!response.ok) {

            throw new Error(
                `API request failed: ${response.status}`
            );

        }


        const data =
            await response.json();


        if (!Array.isArray(data)) {

            throw new Error(
                "Unexpected API response format."
            );

        }


        return data;

    } catch (error) {

        console.error(
            "Unable to fetch patient data:",
            error
        );

        return [];

    }
}