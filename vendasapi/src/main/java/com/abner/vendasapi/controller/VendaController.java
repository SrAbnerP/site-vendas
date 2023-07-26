package com.abner.vendasapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abner.vendasapi.model.Venda;
import com.abner.vendasapi.model.repository.ItemVendaRepository;
import com.abner.vendasapi.model.repository.VendaRepository;

@RestController
@RequestMapping("/api/vendas")
@CrossOrigin("*")
public class VendaController {

	@Autowired
	private VendaRepository vendaRepository;

	@Autowired
	private ItemVendaRepository itemVendaRepository;

	@PostMapping
	@Transactional
	public void realizarVenda(@RequestBody Venda venda) {
		vendaRepository.save(venda);

		venda.getItens().stream().forEach(iv -> iv.setVenda(venda));
		itemVendaRepository.saveAll(venda.getItens());
	}

}
