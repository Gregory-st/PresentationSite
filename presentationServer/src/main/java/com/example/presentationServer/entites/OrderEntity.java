package com.example.presentationServer.entites;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;
import lombok.AccessLevel;
import jakarta.persistence.Id;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Temporal;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.TemporalType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class OrderEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Setter(AccessLevel.PRIVATE)
  private long id;

  @Column(name = "description", columnDefinition = "TEXT")
  private String description;

  @Column(name = "price", length = 30)
  private String price;

  @Column(name = "create_at")
  @Temporal(TemporalType.DATE)
  private Date createAt;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserEntity user;
}
