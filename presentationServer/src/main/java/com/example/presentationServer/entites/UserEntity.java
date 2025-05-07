package com.example.presentationServer.entites;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import lombok.AccessLevel;
import jakarta.persistence.Id;
import lombok.NoArgsConstructor;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
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
@Table(name = "users")
public class UserEntity {
  @Id
  @Setter(AccessLevel.PRIVATE)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "name", length = 50)
  private String name;

  @Column(name = "phone", length = 20)
  private String phone;

  @Column(name = "email")
  private String email;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
  private List<OrderEntity> orders;
}
