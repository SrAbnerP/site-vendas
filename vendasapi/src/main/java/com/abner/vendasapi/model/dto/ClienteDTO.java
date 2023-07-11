package com.abner.vendasapi.model.dto;

import java.time.LocalDate;

import com.abner.vendasapi.model.Cliente;

public class ClienteDTO {

	private Long id;
	private LocalDate nascimento;
	private String cpf;
	private String nome;
	private String telefone;
	private String email;
	private LocalDate cadastro;

	public ClienteDTO() {
		super();
	}

	public ClienteDTO(Long id, LocalDate nascimento, String cpf, String nome, String telefone, String email,
			LocalDate cadastro) {
		super();
		this.id = id;
		this.nascimento = nascimento;
		this.cpf = cpf;
		this.nome = nome;
		this.telefone = telefone;
		this.email = email;
		this.cadastro = cadastro;
	}

	public ClienteDTO(LocalDate nascimento, String cpf, String nome, String telefone, String email,
			LocalDate cadastro) {
		super();
		this.nascimento = nascimento;
		this.cpf = cpf;
		this.nome = nome;
		this.telefone = telefone;
		this.email = email;
		this.cadastro = cadastro;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getNascimento() {
		return nascimento;
	}

	public void setNascimento(LocalDate nascimento) {
		this.nascimento = nascimento;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getCadastro() {
		return cadastro;
	}

	public void setCadastro(LocalDate cadastro) {
		this.cadastro = cadastro;
	}

	public Cliente toModel() {
		return new Cliente(id, nascimento, cpf, nome, telefone, email, cadastro);
	}

	public static ClienteDTO fromModel(Cliente cliente) {
		return new ClienteDTO(cliente.getId(), cliente.getDataNascimento(), cliente.getCpf(), cliente.getNome(),
				cliente.getTelefone(), cliente.getEmail(), cliente.getDataCadastro());
	}

	@Override
	public String toString() {
		return "ClienteDTO [id=" + id + ", nascimento=" + nascimento + ", cpf=" + cpf + ", nome=" + nome + ", telefone="
				+ telefone + ", email=" + email + ", cadastro=" + cadastro + "]";
	}

}
