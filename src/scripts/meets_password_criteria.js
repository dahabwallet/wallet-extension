/**
 * Checks if a provided password meets certain criteria.
 * The criteria include having at least one lowercase letter, one uppercase letter, one digit,
 * one special character, and being at least eight characters long.
 * @param {string} password - The password to check.
 * @returns {boolean} - Returns true if the password meets the criteria, false otherwise.
 */
function meets_password_criteria(password) {
    // Regular expression to define the strong password criteria
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

    // Testing if the provided password matches the strong password criteria
    if (strongPassword.test(password)) {
        return true;
    } else {
        return false;
    }
}

// Exporting the meets_password_criteria function as the default export of the module
export default meets_password_criteria;
