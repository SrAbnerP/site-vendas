package com.abner.vendasapi.model.dto;

import java.time.LocalDate;

import com.abner.vendasapi.model.Cliente;
import com.fasterxml.jackson.annotation.JsonFormat;

public class ClienteDTO {

	private Long id;

	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate nascimento;
	private String cpf;
	private String nome;
	private String endereco;
	private String telefone;
	private String email;

	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate cadastro;

	public ClienteDTO() {
		super();
	}

	public ClienteDTO(Long id, LocalDate nascimento, String cpf, String nome, String endereco, String telefone,
			String email, LocalDate cadastro) {
		super();
		this.id = id;
		this.nascimento = nascimento;
		this.cpf = cpf;
		this.nome = nome;
		this.endereco = endereco;
		this.telefone = telefone;
		this.email = email;
		this.cadastro = cadastro;
	}

	public ClienteDTO(LocalDate nascimento, String cpf, String nome, String endereco, String telefone, String email,
			LocalDate cadastro) {
		super();
		this.nascimento = nascimento;
		this.cpf = cpf;
		this.nome = nome;
		this.endereco = endereco;
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

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
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
		return new Cliente(id, nascimento, cpf, nome, endereco, telefone, email, cadastro);
	}

	public static ClienteDTO fromModel(Cliente cliente) {
		return new ClienteDTO(cliente.getId(), cliente.getDataNascimento(), cliente.getCpf(), cliente.getNome(),
				cliente.getEndereco(), cliente.getTelefone(), cliente.getEmail(), cliente.getDataCadastro());
	}

	@Override
	public String toString() {
		return "ClienteDTO [id=" + id + ", nascimento=" + nascimento + ", cpf=" + cpf + ", nome=" + nome + ", endereco="
				+ endereco + ", telefone=" + telefone + ", email=" + email + ", cadastro=" + cadastro + "]";
	}

}
