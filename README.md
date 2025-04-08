# EmployManagement

A Spring Boot-based Employee Management System that supports CRUD operations, department integration, pagination, sorting, and search functionality.

---

## 📸 Screenshot

![UI Preview](https://github.com/Jimmyvrushabh/EmployManagement/blob/main/EmployManagement/poto/Screenshot%20(676).png)
![UI Preview](https://github.com/Jimmyvrushabh/EmployManagement/blob/main/EmployManagement/poto/Screenshot%20(677).png)

---

## 📁 Employee API Endpoints

| Method | Endpoint                                     | Description                                 | Query/Path Parameters                                 | Request Body        | Response              |
|--------|----------------------------------------------|---------------------------------------------|-------------------------------------------------------|----------------------|------------------------|
| GET    | `/employees`                                 | Get all employees                           | ❌                                                    | ❌                   | List of employees      |
| GET    | `/employees/{id}`                            | Get employee by ID                          | `id`                                                  | ❌                   | Single employee        |
| POST   | `/employees/department/{departmentId}`       | Create employee under department            | `departmentId`                                        | ✅ Employee JSON      | Created employee       |
| PUT    | `/employees/{id}/department/{departmentId}`  | Update employee and assign new department   | `id`, `departmentId`                                  | ✅ Employee JSON      | Updated employee       |
| DELETE | `/employees/{id}`                            | Delete an employee by ID                    | `id`                                                  | ❌                   | No Content (204)       |
| DELETE | `/employees/all`                             | Delete all employees                        | ❌                                                    | ❌                   | No Content (204)       |
| GET    | `/employees/paginated`                       | Get employees with pagination & sorting     | `page`, `size`, `sortBy`, `sortDirection`             | ❌                   | `Page<Employee>`       |
| GET    | `/employees/search`                          | Search employees with pagination & sorting  | `page`, `size`, `sortBy`, `sortDirection`, `query`    | ❌                   | `Page<Employee>`       |
| GET    | `/employees/sort`                            | Sort all employees by a field (ascending)   | `sortBy` (e.g., name, id, etc.)                       | ❌                   | Sorted employee list   |
