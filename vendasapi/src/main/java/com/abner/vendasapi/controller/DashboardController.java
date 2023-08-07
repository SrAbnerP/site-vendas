package com.abner.vendasapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abner.vendasapi.model.dto.DashboardDTO;
import com.abner.vendasapi.model.repository.ClienteRepository;
import com.abner.vendasapi.model.repository.ProdutoRepository;
import com.abner.vendasapi.model.repository.VendaRepository;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

	@Autowired
	private VendaRepository vendaRepository;

	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private ProdutoRepository produtoRepository;

	@GetMapping
	public DashboardDTO getDashBoard() {
		long vendasCount = vendaRepository.count();
		long clientesCount = clienteRepository.count();
		long produtosCount = produtoRepository.count();

		return new DashboardDTO(produtosCount, clientesCount, vendasCount);
	}
}
