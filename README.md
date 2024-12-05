# Service: MongoDB Connector for Driver Identification

## **Overview**
This service acts as a connector between the application and a MongoDB database. It is designed to manage and retrieve personal information about drivers using their passport ID. The service is particularly useful for tracking and identifying drivers during vehicle entry and exit processes at border crossings.

---

## **Features**
- Connects to a MongoDB database to store and retrieve driver data.
- Provides endpoints to:
  - Retrieve personal information of a driver based on their passport ID.
  - Retrieve all driver data from the database.
- Supports integration with other systems for interpolation, ensuring seamless data management during vehicle movement across borders.

---

## **Usage**
This service is deployed as part of a border management system to:
- **Identify Drivers**: Retrieve driver details based on their passport ID.
- **Track Vehicle Movement**: Maintain a record of drivers entering and leaving the country.
- **Data Management**: Ensure accurate and up-to-date personal information of drivers is stored and accessible.

---

## **Endpoints**
### 1. **`GET /api/details/:visaNumber`**
- **Description**: Retrieve personal information of a driver based on their visa (passport) number.
- **Parameters**:
  - `visaNumber` (path): The passport ID of the driver.
- **Response**:
  - **200 OK**: Returns the driver's personal information.
  - **404 Not Found**: If no driver is found with the provided visa number.
  - **400 Bad Request**: If the visa number is missing.
- **Example Request**:
  ```bash
  curl -X GET http://localhost:3000/api/details/dvrKHKfk
  ```

### 2. **`GET /api/all`**
- **Description**: Retrieve all driver records from the database.
- **Response**:
  - **200 OK**: Returns an array of all driver data.
  - **500 Internal Server Error**: If an error occurs while retrieving data.
- **Example Request**:
  ```bash
  curl -X GET http://localhost:3000/api/all
  ```

---

## **Setup Instructions**
### Prerequisites
- Docker and Docker Compose installed.
- MongoDB running as part of the `docker-compose` setup.

### Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd service
   ```

2. **Environment Variables**:
   Create a `.env` file with the following content:
   ```plaintext
   DATABASE_URL=mongodb://root_odysseus:t3l3sto1@mongodb:27017/odysseus?authSource=admin
   PORT=3000
   ```

3. **Build and Run the Service**:
   Use Docker Compose to build and start the service along with MongoDB:
   ```bash
   docker-compose build
   docker-compose up -d
   ```

4. **Test the Service**:
   Use `curl` or Postman to test the endpoints:
   - Retrieve a driver by passport ID:
     ```bash
     curl -X GET http://localhost:3000/api/details/dvrKHKfk
     ```
   - Retrieve all drivers:
     ```bash
     curl -X GET http://localhost:3000/api/all
     ```

---

## **Technology Stack**
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: Database for storing driver data.
