package com.example.presentationServer.repositories;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.presentationServer.entites.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
  @Query("SELECT p FROM ProjectEntity p JOIN p.tags t WHERE t.title = :title")
  List<ProjectEntity> findAllByTagTitle(@Param("title") String tagTitle);
  List<ProjectEntity> findByStartAt(Date startAt);
  List<ProjectEntity> findByEndAt(Date endAt);
}
