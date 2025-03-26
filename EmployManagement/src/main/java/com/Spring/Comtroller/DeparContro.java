package com.Spring.Comtroller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Spring.Model.Department;
import com.Spring.Service.DepartService;

@RestController
@RequestMapping("/departments")
@CrossOrigin
public class DeparContro {

	@Autowired
	private  DepartService departmentService;

	@GetMapping
	 public List<Department> getAllDepartments() {
	        return departmentService.getAllDepartments().stream()
	                .map(dept -> new Department(dept.getId(), dept.getName(), null))
	                .toList();
	    }


    @GetMapping("/{id}")
    public Optional<Department> getDepartmentById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id);
    }

    @PostMapping
    public Department createDepartment(@RequestBody Department department) {
        return departmentService.createDepartment(department);
    }
}



