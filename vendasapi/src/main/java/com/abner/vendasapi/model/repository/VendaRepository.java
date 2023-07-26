package com.abner.vendasapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abner.vendasapi.model.Venda;

public interface VendaRepository extends JpaRepository<Venda, Long> {

}
