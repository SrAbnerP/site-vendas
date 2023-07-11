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

import com.abner.vendasapi.model.Cliente;
import com.abner.vendasapi.model.dto.ClienteDTO;
import com.abner.vendasapi.model.repository.ClienteRepository;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin("*")
public class ClienteController {

	@Autowired
	private ClienteRepository clienteRepository;

	@PostMapping
	public ResponseEntity<ClienteDTO> salvar(@RequestBody ClienteDTO dto) {
		Cliente cliente = dto.toModel();
		clienteRepository.save(cliente);
		return ResponseEntity.ok(ClienteDTO.fromModel(cliente));
	}

	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(@PathVariable("id") Long id, @RequestBody ClienteDTO dto) {

		Optional<Cliente> findCliente = clienteRepository.findById(id);

		if (findCliente.isEmpty()) {
			ResponseEntity.notFound().build();
		}

		Cliente cliente = dto.toModel();
		cliente.setId(id);
		clienteRepository.save(cliente);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("{id}")
	public ResponseEntity<ClienteDTO> getById(@PathVariable("id") Long id) {

		return clienteRepository.findById(id).map(cliente -> ClienteDTO.fromModel(cliente))
				.map(clienteDTO -> ResponseEntity.ok(clienteDTO)).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("{id}")
	public ResponseEntity<Object> delete(@PathVariable("id") Long id) {

		return clienteRepository.findById(id).map(cliente -> {
			clienteRepository.delete(cliente);
			return ResponseEntity.noContent().build();
		}).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping
	public List<ClienteDTO> getLista() {
		return clienteRepository.findAll().stream().map(clienteDTO -> ClienteDTO.fromModel(clienteDTO))
				.collect(Collectors.toList());
	}
}
