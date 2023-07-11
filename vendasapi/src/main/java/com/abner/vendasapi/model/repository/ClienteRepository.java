package com.abner.vendasapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abner.vendasapi.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}