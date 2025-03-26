package com.Spring.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Spring.Model.Department;
import com.Spring.Model.Employee;
import com.Spring.Repo.DepartRepo;
import com.Spring.Repo.Repo;

import lombok.RequiredArgsConstructor;

@Service
public class EmployService {



	@Service
	@RequiredArgsConstructor
	public class EmployeeService {

		@Autowired
	    private  Repo employeeRepository;
		@Autowired
	    private  DepartRepo departmentRepository;

	    public List<Employee> getAllEmployees() {
	        return employeeRepository.findAll();
	    }

	    public Optional<Employee> getEmployeeById(Long id) {
	        return employeeRepository.findById(id);
	    }


	    public Employee createEmployee(Employee employee, Long departmentId) {
	        Department department = departmentRepository.findById(departmentId)
	                .orElseThrow(() -> new RuntimeException("Department not found"));

	      
	        employee.setDepartment(department);

	        return employeeRepository.save(employee);
	    }
	    public Employee updateEmployee(Long id, Long departmentId, Employee employeeDetails) {
	        Employee employee = employeeRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Employee not found"));

	        Department department = departmentRepository.findById(departmentId)
	                .orElseThrow(() -> new RuntimeException("Department not found"));

	        employee.setName(employeeDetails.getName());
	        employee.setEmail(employeeDetails.getEmail());
	        employee.setSalary(employeeDetails.getSalary());
	       
	        employee.setDepartment(department);
	        return employeeRepository.save(employee);
	    }

	    public void deleteEmployee(Long id) {
	        if (!employeeRepository.existsById(id)) {
	            throw new RuntimeException("Employee not found");
	        }
	        employeeRepository.deleteById(id);
	    }
	}
	}


