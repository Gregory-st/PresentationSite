package com.example.presentationServer.services;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.presentationServer.entites.TagEntity;
import com.example.presentationServer.model.ProjectModel;
import com.example.presentationServer.entites.ProjectEntity;
import com.example.presentationServer.entites.ProjectImageEntity;
import com.example.presentationServer.repositories.TagRepository;
import com.example.presentationServer.repositories.ProjectRepository;
import com.example.presentationServer.repositories.ProjectImageRepository;

@Service
@RequiredArgsConstructor
public class ProjectsService {
  private final TagRepository tagRepository;
  private final ProjectRepository projectRepository;
  private final ProjectImageRepository projectImageRepository;

  public List<ProjectModel> getAll(){
    List<ProjectEntity> projectEntities = projectRepository.findAll();
    return projectEntities
        .stream()
        .map(entity -> {
          List<ProjectImageEntity> images = projectImageRepository.findAllByProjectId(entity.getId());
          List<TagEntity> tags = tagRepository.findByProjectId(entity.getId());
          return new ProjectModel(entity, images, tags);
        }).toList();
  }
}
