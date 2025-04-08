package com.Spring.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Spring.Model.Department;

public interface DepartRepo extends JpaRepository<Department, Long> {

}
