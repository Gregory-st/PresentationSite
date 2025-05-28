package com.example.presentationServer.entites;

import lombok.Setter;
import lombok.Getter;
import lombok.AccessLevel;
import jakarta.persistence.Id;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "links_contact")
public class LinksContactEntity {
  @Id
  @Setter(AccessLevel.PRIVATE)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "url")
  private String url;

  @Column(name = "name")
  private String name;

  @ManyToOne
  @JoinColumn(name = "contact_id")
  private ContactEntity contact;
}
