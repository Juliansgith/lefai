// Helper function to parse the JSON data into architecture layers and activities
export function parseJsonData(data) {
    const architectureLayers = {};
    Object.keys(data).forEach((key) => {
        // Split the key into architecture and activity
        const [architecture, ...activityParts] = key.split(" ");
        const activity = activityParts.join(" ");

        if (!architectureLayers[architecture]) {
            architectureLayers[architecture] = [];
        }

        // Avoid duplicates and add the activity to the architecture layer
        if (!architectureLayers[architecture].includes(activity)) {
            architectureLayers[architecture].push(activity);
        }
    });
    return architectureLayers;
}

// Function to get details based on architecture and activity selection
export function getDetailsForSelection(data, architecture, activity) {
    const key = `${architecture} ${activity}`;
    return data[key] || {};
}
