package com.Spring.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
public class Employee {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;
	    private String email;
	    private String jobTitle;
	    
	    private int salary;

	    @ManyToOne(fetch = FetchType.EAGER) // Ensure department is fetched
	    @JoinColumn(name = "department_id", nullable = false) // Ensure column is set
	    @JsonIgnoreProperties({"hibernateLazyInitializer", "employees"}) // Prevent lazy-loading issues

	    private Department department;
	    
	    public void setDepartment(Department department) {
	        this.department = department;
	    }
	}



