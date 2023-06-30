package com.abner.vendasapi.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abner.vendasapi.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
