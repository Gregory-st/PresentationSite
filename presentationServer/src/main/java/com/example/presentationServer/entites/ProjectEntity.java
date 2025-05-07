package com.example.presentationServer.entites;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.Date;
import lombok.AccessLevel;
import jakarta.persistence.Id;
import lombok.NoArgsConstructor;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.TemporalType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "projects")
public class ProjectEntity {
  @Id
  @Setter(AccessLevel.PRIVATE)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "title", length = 50)
  private String title;

  @Column(name = "description", columnDefinition = "TEXT")
  private String description;

  @Column(name = "start_at")
  @Temporal(TemporalType.DATE)
  private Date startAt;

  @Column(name = "end_at")
  @Temporal(TemporalType.DATE)
  private Date endAt;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
  private List<ProjectImageEntity> images;
}
