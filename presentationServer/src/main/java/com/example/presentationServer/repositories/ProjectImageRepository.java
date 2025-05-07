package com.example.presentationServer.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.presentationServer.entites.ProjectImageEntity;

public interface ProjectImageRepository extends JpaRepository<ProjectImageEntity, Long> {
  List<ProjectImageEntity> findAllByProjectId(long projectId);
}
