package com.abner.vendasapi.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abner.vendasapi.model.Produto;
import com.abner.vendasapi.model.dto.ProdutoDTO;
import com.abner.vendasapi.model.repository.ProdutoRepository;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

	@Autowired
	private ProdutoRepository produtoRepository;

	@PostMapping
	public ProdutoDTO salvar(@RequestBody ProdutoDTO dto) {
		Produto produto = dto.toModel();
		produtoRepository.save(produto);
		return ProdutoDTO.fromModel(produto);
	}

	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(@PathVariable("id") Long id, @RequestBody ProdutoDTO dto) {
		Optional<Produto> p = produtoRepository.findById(id);

		if (p.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Produto produto = dto.toModel();
		produto.setId(id);
		produtoRepository.save(produto);

		return ResponseEntity.ok().build();
	}

}
