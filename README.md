# First Assignment API Documentation

Welcome to the First Assignment API documentation. This API allows you to manage and simulate production plans by providing endpoints to work with formulas and plans.

## Table of Contents
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
    - [Add a New Formula](#add-a-new-formula)
    - [See the Inputs and Outputs of a Formula](#see-the-inputs-and-outputs-of-a-formula)
    - [List Plans Containing a Formula](#list-plans-containing-a-formula)
    - [Add a New Plan](#add-a-new-plan)
    - [Append a Formula to the End of a Plan](#append-a-formula-to-the-end-of-a-plan)
    - [Replace a Formula in a Plan](#replace-a-formula-in-a-plan)
    - [List Formulas in a Plan](#list-formulas-in-a-plan)
    - [Delete a Plan](#delete-a-plan)
- [Usage Examples](#usage-examples)
- [Response Codes](#response-codes)

## Getting Started

### Installation

1. Clone this repository to your local machine:

2. Install the required dependencies: 
   cd FirstAssignment,
   npm install

### Running the Server
Start the Express.js server:
#### npm start

The server will be running at `http://localhost:3000` by default.

## API Endpoints

### Add a New Formula

- **Method:** POST
- **Path:** `/formulas`
- **Description:** Adds a new formula to the system.
- **Parameters:**
    - Body (JSON):
        - `inputs`: An array of input resources and quantities.
        - `outputs`: An array of output resources and quantities.
- **Response Codes:**
    - 201 Created: Formula successfully added.
    - 400 Bad Request: Invalid input data.
- **Response Body:** JSON object representing the newly added formula.

### See the Inputs and Outputs of a Formula

- **Method:** GET
- **Path:** `/formulas/:formulaId`
- **Description:** Retrieves the inputs and outputs of a specific formula.
- **Parameters:**
    - URL parameter: `formulaId` (ID of the formula to retrieve).
- **Response Codes:**
    - 200 OK: Formula details successfully retrieved.
    - 404 Not Found: Formula with the specified ID does not exist.
    - 500 Internal Server Error: An internal server error occurred.
- **Response Body:** JSON object containing the inputs and outputs of the formula.

### List Plans Containing a Formula

- **Method:** GET
- **Path:** `/plans/:formulaId`
- **Description:** Lists plans that contain a specific formula.
- **Parameters:**
    - URL parameter: `formulaId` (ID of the formula to search for in plans).
- **Response Codes:**
    - 200 OK: Plans successfully listed.
    - 500 Internal Server Error: An internal server error occurred.
- **Response Body:** JSON array containing the list of plans that contain the specified formula.

### Add a New Plan

- **Method:** POST
- **Path:** `/plans`
- **Description:** Adds a new plan to the system.
- **Parameters:**
    - Body (JSON):
        - `sequence`: An array of formula IDs representing the plan's sequence.
- **Response Codes:**
    - 201 Created: Plan successfully added.
    - 400 Bad Request: Invalid input data.
- **Response Body:** JSON object representing the newly added plan.

### Append a Formula to the End of a Plan

- **Method:** POST
- **Path:** `/plans/:planId/append`
- **Description:** Appends a formula to the end of a plan's sequence.
- **Parameters:**
    - URL parameter: `planId` (ID of the plan to append to).
    - Body (JSON):
        - `formulaId`: ID of the formula to append.
- **Response Codes:**
    - 200 OK: Formula successfully appended to the plan.
    - 400 Bad Request: Invalid input data.
    - 404 Not Found: Plan or formula with the specified ID does not exist.
- **Response Body:** JSON object representing the updated plan.

### Replace a Formula in a Plan

- **Method:** PUT
- **Path:** `/plans/:planId/replace_formula`
- **Description:** Replaces a formula at a specific index in a plan's sequence with a new formula.
- **Parameters:**
    - URL parameter: `planId` (ID of the plan to modify).
    - Body (JSON):
        - `newFormulaId`: ID of the new formula to replace with.
        - `formulaIndex`: (Index of the formula to replace).
- **Response Codes:**
    - 200 OK: Formula successfully replaced in the plan.
    - 400 Bad Request: Invalid input data or formula index.
    - 404 Not Found: Plan or formula with the specified ID does not exist.
- **Response Body:** JSON object representing the updated plan.

### List Formulas in a Plan

- **Method:** GET
- **Path:** `/plans/:planId/formulas`
- **Description:** Lists all the formulas contained in a plan.
- **Parameters:**
    - URL parameter: `planId` (ID of the plan to retrieve formulas from).
- **Response Codes:**
    - 200 OK: Formulas successfully listed.
    - 404 Not Found: Plan with the specified ID does not exist.
    - 500 Internal Server Error: An internal server error occurred.
- **Response Body:** JSON array containing the list of formulas in the plan.

### Delete a Plan

- **Method:** DELETE
- **Path:** `/plans/:planId`
- **Description:** Deletes a plan with the specified ID.
- **Parameters:**
    - URL parameter: `planId` (ID of the plan to delete).
- **Response Codes:**
    - 204 No Content: Plan successfully deleted.
    - 404 Not Found: Plan with the specified ID does not exist.
    - 500 Internal Server Error: An internal server error occurred.

## Usage Examples

Here are some examples of how to use the API endpoints in various scenarios.

### Example 1: Adding a New Formula

```http
POST /formulas

{
  "inputs": [
    {"resource": "iron ore", "quantity": 2},
    {"resource": "coal", "quantity": 1}
  ],
  "outputs": [
    {"resource": "iron bar", "quantity": 1}
  ]
}
```

### Example 2: Retrieving Formula Details

```http
GET /formulas/1
```

### Example 3: Listing Plans Containing a Formula

```http
GET /plans/1
```

### Example 4: Adding a New Plan

```http
POST /plans

{
  "sequence": [1, 2, 3]
}
```

### Example 5: Appending a Formula to a Plan

```http
PUT /plans/1/append

{
  "formulaId": 5
}
```

### Example 6: Replacing a Formula in a Plan

```http
PUT /plans/1/replace_formula

{
  "newFormulaId": 3,
  "formulaIndex": 1
}
```

### Example 7: Listing Formulas in a Plan

```http
GET /plans/formulas
```

### Example 8: Deleting a Plan

```http
DELETE /plans/1
```

### Response Codes

200 OK: The request was successful.

201 Created: The resource was successfully created.

204 No Content: The request was successful, and there is no response body.

400 Bad Request: The request contained invalid data or parameters.

404 Not Found: The requested resource was not found.

500 Internal Server Error: An internal server error occurred.

Please feel free to reach out if you have any questions or need further assistance with using this API.