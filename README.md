###Problem
What do users need to achieve in terms of fetching and manipulating JSON data?

###Context
Keep in mind that most APIs (e.g. close.io, Typeform, xero, among others) allow decent queries to be embedded in the query string and / or will return useful data to begin with. The DSL will usually need to only serve the first case, but in certain scenarios, complex post-call queries are useful (e.g. Eventbrite) because the API calls / queries do not suffice.

###Solution

Basic Retrieval:
- I simply want to retrieve a single value retrieved via an API call.
- I want to retrieve a nested value retrieved via an API call.
- I want to retrieve the nth value inside an array

Filters:
- I want to loop through the values that come from an API call and filter through it to find the value of an item that matches some criteria.
- I want to loop through the values that come from an API call and filter through it to find the label (or other property) of an item that matches some criteria.

Arithmetic:
- I want to loop through a dataset, and apply a basic arithmetic operator to a specific field in the dataset.

Accumulation / Reduction:
- I want to accumulate a value in each item in an array dataset and calculate the average, minimum and maximum



