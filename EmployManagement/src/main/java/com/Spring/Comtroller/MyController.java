package com.Spring.Comtroller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Spring.Model.Employee;
import com.Spring.Repo.Repo;
import com.Spring.Service.EmployService.EmployeeService;

@Controller
@RestController
@CrossOrigin
@RequestMapping("/employees")
public class MyController {

	@Autowired
	    private  EmployeeService employeeService;

	@Autowired
	private Repo employeeRepository;

	    @GetMapping
	    public List<Employee> getAllEmployees() {

	        return employeeService.getAllEmployees();
	    }

	    @GetMapping("/employees")
	    public List<Employee> getAllDEmployees() {
	        return employeeRepository.findAllWithDepartment();
	    }

	    @GetMapping("/{id}")
	    public Optional<Employee> getEmployeeById(@PathVariable Long id) {
	        return employeeService.getEmployeeById(id);
	    }

	    @PostMapping("/department/{departmentId}")
	    public Employee createEmployee(@RequestBody Employee employee, @PathVariable Long departmentId) {
	        return employeeService.createEmployee(employee, departmentId);
	    }


	    @PutMapping("/{id}/department/{departmentId}")
	    public ResponseEntity<Employee> updateEmployee(
	            @PathVariable Long id,
	            @PathVariable Long departmentId,
	            @RequestBody Employee employeeDetails) {
	        Employee updatedEmployee = employeeService.updateEmployee(id, departmentId, employeeDetails);
	        return ResponseEntity.ok(updatedEmployee);
	    }


	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
	        employeeService.deleteEmployee(id);
	        return ResponseEntity.noContent().build();
	    }
	}



