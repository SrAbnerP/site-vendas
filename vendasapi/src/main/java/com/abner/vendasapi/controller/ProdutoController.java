package com.abner.vendasapi.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

	@GetMapping
	public List<ProdutoDTO> getLista() {
		return produtoRepository.findAll().stream().map(p -> ProdutoDTO.fromModel(p)).collect(Collectors.toList());
	}

	@GetMapping("{id}")
	public ResponseEntity<ProdutoDTO> getById(@PathVariable("id") Long id) {
		Optional<Produto> produto = produtoRepository.findById(id);
		if (produto.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		var produtoDTO = produto.map(p -> ProdutoDTO.fromModel(p)).get();
		return ResponseEntity.ok(produtoDTO);
	}

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
		produto.setDataCadastro(p.get().getDataCadastro());
		produto.setId(id);
		produtoRepository.save(produto);

		return ResponseEntity.ok().build();
	}

	@DeleteMapping("{id}")
	public ResponseEntity<Void> deletar(@PathVariable("id") Long id) {
		Optional<Produto> p = produtoRepository.findById(id);

		if (p.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		produtoRepository.delete(p.get());
		return ResponseEntity.noContent().build();
	}

}
