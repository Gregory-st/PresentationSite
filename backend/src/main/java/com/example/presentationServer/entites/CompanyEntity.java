package com.example.presentationServer.entites;

import lombok.Getter;
import lombok.Setter;
import lombok.AccessLevel;
import jakarta.persistence.Id;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "company")
public class CompanyEntity {
  @Id
  @Setter(AccessLevel.PRIVATE)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "address")
  private String address;

  @Column(name = "logo_url")
  private String logoUrl;

  @Column(name = "name", length = 50)
  private String name;

  @Column(name = "email", length = 100)
  private String email;

  @Column(name = "phone", length = 50)
  private String phone;

  @Column(name = "description", columnDefinition = "TEXT")
  private String description;
}
