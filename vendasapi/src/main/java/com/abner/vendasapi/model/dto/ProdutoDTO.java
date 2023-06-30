package com.abner.vendasapi.model.dto;

import java.math.BigDecimal;

public class ProdutoDTO {

	private String descricao;
	private String nome;
	private BigDecimal preco;
	private String sku;

	public ProdutoDTO() {
		super();
	}

	public ProdutoDTO(String descricao, String nome, BigDecimal preco, String sku) {
		super();
		this.descricao = descricao;
		this.nome = nome;
		this.preco = preco;
		this.sku = sku;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
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

	@Override
	public String toString() {
		return "ProdutoDTO [descricao=" + descricao + ", nome=" + nome + ", preco=" + preco + ", sku=" + sku + "]";
	}

}
