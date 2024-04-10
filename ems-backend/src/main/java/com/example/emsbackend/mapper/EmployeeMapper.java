package com.example.emsbackend.mapper;

import com.example.emsbackend.dto.EmployeeDto;
import com.example.emsbackend.entity.Employee;

public class EmployeeMapper {
    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getEmail());
    }

    public  static Employee mapToEmployee(EmployeeDto empDto){
        return new Employee(empDto.getId(), empDto.getFirstName(), empDto.getLastName(), empDto.getEmail());
    }
}
