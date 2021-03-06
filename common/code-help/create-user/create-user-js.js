module.exports = (envId, {LIB_NAME, NPM_CLIENT, USER_ID, USER_FEATURE_FUNCTION, USER_FEATURE_NAME},userId) => {
	return `import ${LIB_NAME} from '${NPM_CLIENT}';

/***
Can be called both before or after you're done initialising the project.
Calling identify before will prevent flags being fetched twice.
***/
${LIB_NAME}.identify("${userId||USER_ID}"); // This will create a user in the dashboard if they don't already exist

// Standard project initialisation
${LIB_NAME}.init({
    environmentID: "${envId}",
        onChange: (oldFlags, params) => { // Occurs whenever flags are changed

        const { isFromServer } = params; // Determines if the update came from the server or local cached storage

        // Check for a feature
        if (${LIB_NAME}.hasFeature("${USER_FEATURE_NAME}")) {
            ${USER_FEATURE_FUNCTION}();
        }

        // Or, use the value of a feature
        const ${USER_FEATURE_NAME} = ${LIB_NAME}.getValue("${USER_FEATURE_NAME}");

        // Check whether value has changed
        const ${USER_FEATURE_NAME}Old = oldFlags["${USER_FEATURE_NAME}"] && oldFlags["${USER_FEATURE_NAME}"].value;
        if (${USER_FEATURE_NAME} !== ${USER_FEATURE_NAME}Old) {
            // Value has changed, do something here
        }
    }
});
`
}
