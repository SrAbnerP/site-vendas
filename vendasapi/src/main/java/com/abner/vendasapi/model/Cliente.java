package com.abner.vendasapi.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "cliente")
public class Cliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDate dataNascimento;
	private String cpf;
	private String nome;
	private String endereco;
	private String telefone;
	private String email;

	@OneToMany(mappedBy = "cliente")
	private List<Venda> vendas;

	@Column(name = "data_cadastro")
	private LocalDate dataCadastro;

	public Cliente() {
		super();
	}

	public Cliente(Long id, LocalDate dataNascimento, String cpf, String nome, String endereco, String telefone,
			String email, LocalDate dataCadastro) {
		super();
		this.id = id;
		this.dataNascimento = dataNascimento;
		this.cpf = cpf;
		this.nome = nome;
		this.endereco = endereco;
		this.telefone = telefone;
		this.email = email;
		this.dataCadastro = dataCadastro;
	}

	public Cliente(LocalDate dataNascimento, String cpf, String nome, String endereco, String telefone, String email,
			LocalDate dataCadastro) {
		super();
		this.dataNascimento = dataNascimento;
		this.cpf = cpf;
		this.nome = nome;
		this.endereco = endereco;
		this.telefone = telefone;
		this.email = email;
		this.dataCadastro = dataCadastro;
	}

	@PrePersist
	public void prePersist() {
		setDataCadastro(LocalDate.now());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
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

	public LocalDate getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	@Override
	public String toString() {
		return "Cliente [id=" + id + ", dataNascimento=" + dataNascimento + ", cpf=" + cpf + ", nome=" + nome
				+ ", endereco=" + endereco + ", telefone=" + telefone + ", email=" + email + ", dataCadastro="
				+ dataCadastro + "]";
	}

}
