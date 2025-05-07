package com.example.presentationServer.repositories;

import java.util.Date;
import java.util.List;
import com.example.presentationServer.entites.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
  List<ProjectEntity> findByStartAt(Date startAt);
  List<ProjectEntity> findByEndAt(Date endAt);
}
