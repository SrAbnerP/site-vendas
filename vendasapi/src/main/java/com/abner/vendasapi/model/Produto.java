package com.abner.vendasapi.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "produto")
public class Produto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nome", length = 100)
	private String nome;

	@Column(name = "descricao", length = 255)
	private String descricao;

	@Column(name = "preco", precision = 16, scale = 2)
	private BigDecimal preco;

	@Column
	private String sku;

	@Column
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dataCadastro;

	@OneToMany(mappedBy = "produto")
	private List<ItemVenda> itens;

	public Produto() {
		super();
	}

	public Produto(String nome, String descricao, BigDecimal preco, String sku, LocalDate dataCadastro) {
		super();
		this.nome = nome;
		this.descricao = descricao;
		this.preco = preco;
		this.sku = sku;
		this.dataCadastro = dataCadastro;
	}

	public Produto(Long id, String nome, String descricao, BigDecimal preco, String sku, LocalDate dataCadastro) {
		super();
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.preco = preco;
		this.sku = sku;
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

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public BigDecimal getPreco() {
		return preco;
	}

	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public LocalDate getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	@Override
	public String toString() {
		return "Produto [id=" + id + ", nome=" + nome + ", descricao=" + descricao + ", preco=" + preco + ", sku=" + sku
				+ ", dataCadastro=" + dataCadastro + "]";
	}

}
