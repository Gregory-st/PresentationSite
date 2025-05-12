package com.example.presentationServer.entites;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import lombok.AccessLevel;
import jakarta.persistence.Id;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "contacts")
public class ContactEntity {
  @Id
  @Setter(AccessLevel.PRIVATE)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "step")
  private Integer step;

  @Column(name = "email")
  private String email;
  @Column(name = "name", length = 50)
  private String name;
  @Column(name = "phone", length = 20)
  private String phone;
  @Column(name = "first_name", length = 50)
  private String firstname;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "contact")
  private List<LinksContactEntity> links;
}
