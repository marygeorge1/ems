package com.example.emsbackend.service.impl;

import com.example.emsbackend.dto.EmployeeDto;
import com.example.emsbackend.entity.Employee;
import com.example.emsbackend.exception.ResourceNotFound;
import com.example.emsbackend.mapper.EmployeeMapper;
import com.example.emsbackend.repository.EmployeeRepository;
import com.example.emsbackend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee=employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee=employeeRepository
                        .findById(employeeId)
                        .orElseThrow(()->new ResolutionException("Employees with id "+employeeId+"does not exist"));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees=employeeRepository.findAll();
        return employees
                .stream()
                .map((emp)->EmployeeMapper.mapToEmployeeDto(emp)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFound("Employees with id "+employeeId+"does not exist"));
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        Employee updateEmployeeObj=employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updateEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFound("Employees with id "+employeeId+"does not exist"));
        employeeRepository.deleteById(employeeId);
    }
}
