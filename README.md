# MalogicaExam

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.


## How to run
Clone the repository and then run `npm ci` to install all dependencies.

## How to test
Run `ng test`

## Explanation
All instruction were satisified.
1. **Set up Angular Project:** Use Angular CLI to set up a new Angular project.

2. **User Service:** Create a service named `UserService` to fetch user data from the provided mock API endpoint (`https://jsonplaceholder.typicode.com/users`).

3. **User List Component:** Implement a component named `UserListComponent` to display the list of users fetched from the API. Each user item in the list should display the user's name, email, and phone number.

4. **Error Handling:** Implement error handling in case the API request fails. Display an error message to the user and provide a way to retry the request.

5. **Responsive Design:** Ensure that the application is responsive and looks good on both desktop and mobile devices.

6. **User Details Page:** Extend the application to include a `UserDetailsComponent`. When a user item is clicked from the `UserListComponent`, navigate to the UserDetailsComponent to display detailed information about the selected user, including their name, email, phone number, address, and company details.

7. **Lazy Loading:** Implement lazy loading for the UserDetailsComponent to improve the application's performance. Load the UserDetailsComponent only when navigating to the user details page.

8. **Search Functionality:** Add a search bar to the `UserListComponent` to allow users to search for specific users by name. Implement filtering functionality to dynamically update the user list based on the search query.

9. **Pagination:** Implement pagination for the user list to display a limited number of users per page. Allow users to navigate between pages to view more users. Ensure that the pagination controls adjust dynamically based on the number of users and current page.

10. **Authentication Guard:** Create an authentication guard to protect the UserDetailsComponent route. Only authenticated users should be able to access the user details page. Implement a basic authentication mechanism using a hardcoded username and password.

11. **State Management:** Integrate state management using NGXS to manage the application state, including user data and search/filtering criteria.

12. **Unit Testing:** Write unit tests to test the functionality of the `UserService` and `UserListComponent`. Include test cases to verify the search functionality, pagination, and error handling.


## Exemption

As for #11, State Management, the instruction was to use NGXS, I used NGRX / Signal Store. This is because I am more used to using NGRX and not NGXS. Will try to include NGXS within the time limit but if not, in case of getting the position, will surely study NGXS.

## Remarks
Would like to also show the personal project that I am doing at the moment which can be found here:
Repository: https://github.com/moof44/personal-accounting-2
and here
URL: https://personal-accounting-3fbcb.web.app/

This project is just being used for study purposes and is using Angular 18, Angular SSR, PWA and is optimized for mobile and desktop with best practices and performance in mind. 

Kindly review the repository as reference for coding.