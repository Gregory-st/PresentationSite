package com.example.presentationServer.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.presentationServer.entites.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<TagEntity, Long> {
  @Query("SELECT t FROM TagEntity t JOIN t.projects p WHERE p.id = :id")
  List<TagEntity> findByProjectId(@Param("id") Long id);
  Optional<TagEntity> findByTitle(String title);
}
