package com.abner.vendasapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abner.vendasapi.model.Produto;
import com.abner.vendasapi.model.dto.ProdutoDTO;
import com.abner.vendasapi.model.repository.ProdutoRepository;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

	@Autowired
	private ProdutoRepository produtoRepository;

	@PostMapping
	public ProdutoDTO salvar(@RequestBody ProdutoDTO dto) {
		Produto produto = new Produto(dto.getNome(), dto.getDescricao(), dto.getPreco(), dto.getSku());
		produtoRepository.save(produto);
		return dto;
	}

}