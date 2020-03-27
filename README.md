# **Group Project**

## Job Scraper

<ul>
MVP (minimum viable product):
<li>Login/User authentication functionality</li>
<li>Full CRUD</li>
<li>User is able to search by job title keyword and location to return job listings</li>
<li>User can filter search results from different job board websites</li>
<li>User can save a specific listing to their account for future reference</li>
<li>User can delete listings from their account</li>
<li>User can update account settings (email on file, phone number, etc)</li>

</ul>

ICEBOX 
<ul>
<li>User can edit listings or information about listings (maybe have a 'user comments' section for each listing with details that the user wants to remember about that job)</li>
<li>Each saved listing has a "applied" checkbox that you can click to show you've applied to this listing</li>
<li>Website remembers a saved location and auto populates the search with the user's account location setting</li>

</ul>

*routes*

- Route exact path="/" component={SearchPage}
- Route path="/saved" component={SavedJobsPage}
- Route path="/account" component={AccountPage} 
- Route path='/login' component={LoginPage}

*file structure*
- server/
    - controller/
        - authCtrl.js
        - listingCtrl.js
        - scraperCtrl.js
    - index.js
- src/
    - App.js
    - App.css
    - index.js
    - reset.css
    - redux
        - store
        - reducer 
    - Components/
        - SearchPage/
            - SearchPage.js
            - SearchPage.css
        - Header/
            - Header.js
            - Header.css
         - AccountPage/
            - AccountPage.js
            - AccountPage.css
         - LoginPage/
            - LoginPage.js
            - LoginPage.css
         - Footer/
            - Footer.js
            - Footer.css
         - SearchFilter/
            - SearchFilter.js
            - SearchFilter.css
         - JobListing/
            - JobListing.js
            - JobListing.css
         - SavedJobsPage/
            - SavedJobsPage.js
            - SavedJobsPage.css
            
           
        

***Client***
<br/><br/>
*dependencies*
- axios
- react-router-dom
- redux
- react-redux
- redux-promise-middleware
- http-proxy-middleware
<br/>


***Server*** 
<br/>
*dependencies*
- express-session
- massive 
- express
- dotenv
- bcrypt


*endpoints*
<br/>


Authorization Endpoints 

authCtrl:

- app.post('/auth/login', login);
- app.post('/auth/register', registerUser);
- app.get('/auth/userSession', userSession);
- app.get('/auth/logout', logout);
- app.put('/auth/edit_email/:user_id', body, editEmail);
- app.put('/auth/edit_password/:user_id', body, editPassword);



Saved Listing/My Listings Endpoints 

listingCtrl:

- app.get(‘/api/listings/:user_id’, getSavedListings)
- app.post(‘/api/listing/:user_id’, body, saveListing)
- app.delete(‘/api/delete/:listing_id’, deleteListing)
- app.put(‘/api/edit/:listing_id’, body, editListing)



Job Listing Endpoints jobListCtrl:

- app.get(/api/jobs,  body(title, location))
  or possibly structured like this 
  - /api/jobs?title=full+stack+developer&&location=Phoenix+AZ
  
  
Unit Testing

1. We will create a test to validate that the inputs for the login components are storing the correct input (as a string) and sending it into our axios request correctly
 - storing correctly
 - sending correctly

2. We will create a test to validate whether a user's location search input is stored correctly and sent to the scraper functions on the back end correctly. 
 - stored correctly
 - sent correclty

3. We will create a test to validate that the edit account settings function correctly identifies the user_id of the user and stores the user's newly input email/password in state correctly to be send to the back-end
- store email
- pull user_id

4. We will create a test to validate whether a "save this post" button correctly parses the id of that post and references the correct post when sending this information to the back end.
- store job_id
- pull user_id
- sends correctly to the backend

5. We will create a test to determine whether a user's job title input is stored correclty and sent to the back end function that requires it
- user’s job title is stored correctly
- sends to the backend

6. We will create a test to validate whether a delete function for saved job listings correctly identifies the listing and sends it to the back end to be deleted
- pulls job_id to send to the back in
- user_id to send to the back in




***Database***

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(50) NOT NULL,
);

```

```sql
CREATE TABLE jobs (
    jobs_id SERIAL PRIMARY KEY,
    title TEXT,
    company VARCHAR(50),
    description TEXT,
    location TEXT,
    salary INT,
    user_id INT REFERENCES users(user_id)
);
```


